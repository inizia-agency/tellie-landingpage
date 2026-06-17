#!/usr/bin/env python3
from __future__ import annotations

import re
import textwrap
import unicodedata
from pathlib import Path


ROOT = Path("/Users/micaelawork/Documents/Clients/Tellie/Tellie Dev")
SOURCE_MD = ROOT / "tellie-business-plan.md"
OUTPUT_DIR = ROOT / "tellie-landinpage" / "business-plan" / "downloads"
OUTPUT_PDF = OUTPUT_DIR / "tellie-business-plan.pdf"

PAGE_W = 595
PAGE_H = 842
LEFT = 54
RIGHT = 54
TOP = 60
BOTTOM = 56

BODY = 11
SMALL = 9
H1 = 24
H2 = 17
H3 = 13

BRAND = (0.66, 0.42, 0.72)
BRAND_DARK = (0.55, 0.3, 0.64)
TEXT = (0.20, 0.18, 0.28)
MUTED = (0.43, 0.40, 0.49)
BLUSH = (0.95, 0.91, 0.97)


def normalize_text(text: str) -> str:
    replacements = {
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2022": "-",
        "\u00a0": " ",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    return text


def esc(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def wrap_text(text: str, font_size: int, max_width: int, prefix: str = "") -> list[str]:
    text = normalize_text(text).strip()
    if not text:
        return [""]
    approx_chars = max(22, int(max_width / (font_size * 0.54)))
    wrapped = textwrap.wrap(
        text,
        width=max(approx_chars - len(prefix), 12),
        break_long_words=False,
        break_on_hyphens=False,
    )
    if prefix:
        return [prefix + wrapped[0]] + [(" " * len(prefix)) + line for line in wrapped[1:]]
    return wrapped


class PDFBuilder:
    def __init__(self) -> None:
        self.pages: list[str] = []
        self.current: list[str] = []
        self.page_no = 0
        self.y = PAGE_H - TOP
        self.section_title = ""
        self._new_page()

    def _new_page(self) -> None:
        if self.current:
            self._footer()
            self.pages.append("\n".join(self.current))
        self.page_no += 1
        self.current = []
        self.y = PAGE_H - TOP
        self._header()

    def _header(self) -> None:
        self.rect(0, PAGE_H - 48, PAGE_W, 48, BLUSH, fill=True)
        self.text(LEFT, PAGE_H - 28, "Tellie Business Plan", "Helvetica-Bold", 14, BRAND_DARK)
        self.text(PAGE_W - RIGHT - 120, PAGE_H - 28, f"Page {self.page_no}", "Helvetica", 9, MUTED)
        self.y = PAGE_H - 76

    def _footer(self) -> None:
        self.text(LEFT, 26, "Prepared for investors, partners, and potential co-founders", "Helvetica", 8, MUTED)
        self.text(PAGE_W - RIGHT - 138, 26, "tellie.me  |  mica@tellie.me", "Helvetica", 8, MUTED)

    def ensure_space(self, needed: float) -> None:
        if self.y - needed < BOTTOM:
            self._new_page()

    def cmd(self, raw: str) -> None:
        self.current.append(raw)

    def rect(self, x: float, y: float, w: float, h: float, rgb: tuple[float, float, float], fill: bool = False) -> None:
        op = "f" if fill else "S"
        self.cmd(f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} rg")
        self.cmd(f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} RG")
        self.cmd(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re {op}")

    def text(self, x: float, y: float, text: str, font: str, size: int, rgb: tuple[float, float, float]) -> None:
        self.cmd("BT")
        self.cmd(f"/{font} {size} Tf")
        self.cmd(f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} rg")
        self.cmd(f"1 0 0 1 {x:.2f} {y:.2f} Tm")
        self.cmd(f"({esc(text)}) Tj")
        self.cmd("ET")

    def paragraph(self, text: str, font: str = "Helvetica", size: int = BODY, color: tuple[float, float, float] = MUTED,
                  leading: float | None = None, prefix: str = "", gap_after: float = 10) -> None:
        leading = leading or size * 1.55
        max_width = PAGE_W - LEFT - RIGHT
        lines = wrap_text(text, size, max_width, prefix=prefix)
        needed = len(lines) * leading + gap_after
        self.ensure_space(needed)
        for line in lines:
            self.text(LEFT, self.y, line, font, size, color)
            self.y -= leading
        self.y -= gap_after

    def h1(self, text: str) -> None:
        lines = wrap_text(text, H1, PAGE_W - LEFT - RIGHT)
        needed = len(lines) * 30 + 20
        self.ensure_space(needed)
        for line in lines:
            self.text(LEFT, self.y, line, "Helvetica-Bold", H1, BRAND_DARK)
            self.y -= 30
        self.y -= 12

    def h2(self, text: str) -> None:
        self.ensure_space(34)
        self.rect(LEFT, self.y - 8, 18, 18, BLUSH, fill=True)
        self.text(LEFT + 28, self.y, normalize_text(text), "Helvetica-Bold", H2, BRAND_DARK)
        self.y -= 28

    def h3(self, text: str) -> None:
        self.ensure_space(24)
        self.text(LEFT, self.y, normalize_text(text), "Helvetica-Bold", H3, TEXT)
        self.y -= 22

    def cover(self) -> None:
        self.current = []
        self.page_no = 1
        self.y = PAGE_H - TOP
        self.rect(0, 0, PAGE_W, PAGE_H, (0.985, 0.975, 0.965), fill=True)
        self.rect(0, PAGE_H - 220, PAGE_W, 220, BLUSH, fill=True)
        self.text(LEFT, PAGE_H - 118, "Tellie", "Helvetica-Bold", 34, BRAND_DARK)
        self.text(LEFT, PAGE_H - 160, "Business Plan", "Helvetica-Bold", 28, TEXT)
        self.paragraph(
            "A strategic and investor-ready business plan for Tellie, a voice-first companion and healthy-aging platform for older adults.",
            font="Helvetica",
            size=13,
            color=TEXT,
            leading=21,
            gap_after=18,
        )
        self.text(LEFT, PAGE_H - 250, "Prepared for investors, strategic partners, and potential co-founders", "Helvetica", 11, MUTED)
        self.text(LEFT, PAGE_H - 270, "Founder: Micaela Piacenza", "Helvetica", 11, MUTED)
        self.text(LEFT, PAGE_H - 290, "Date: 2026-06-17", "Helvetica", 11, MUTED)
        self.rect(LEFT, 110, PAGE_W - LEFT - RIGHT, 1, (0.87, 0.80, 0.91), fill=True)
        self.text(LEFT, 88, "Tellie | empathy, dignity, and senior-first technology", "Helvetica", 10, BRAND_DARK)
        self.pages = ["\n".join(self.current)]
        self.current = []
        self.page_no = 1
        self._new_page()

    def finish(self) -> bytes:
        if self.current:
            self._footer()
            self.pages.append("\n".join(self.current))
            self.current = []

        objects: list[bytes] = []

        def add(data: str | bytes) -> int:
            payload = data.encode("latin-1") if isinstance(data, str) else data
            objects.append(payload)
            return len(objects)

        catalog_id = add("<< /Type /Catalog /Pages 2 0 R >>")

        kids = []
        page_ids = []
        content_ids = []
        for _ in self.pages:
            page_ids.append(None)
            content_ids.append(None)

        pages_id = add("placeholder")
        font_regular_id = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
        font_bold_id = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

        for idx, content in enumerate(self.pages):
            content_id = add(f"<< /Length {len(content.encode('latin-1'))} >>\nstream\n{content}\nendstream")
            content_ids[idx] = content_id
            page_id = add(
                f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] "
                f"/Resources << /Font << /Helvetica {font_regular_id} 0 R /Helvetica-Bold {font_bold_id} 0 R >> >> "
                f"/Contents {content_id} 0 R >>"
            )
            page_ids[idx] = page_id
            kids.append(f"{page_id} 0 R")

        objects[pages_id - 1] = (
            f"<< /Type /Pages /Count {len(page_ids)} /Kids [{' '.join(kids)}] >>".encode("latin-1")
        )

        xref_positions = []
        out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        for i, obj in enumerate(objects, start=1):
            xref_positions.append(len(out))
            out.extend(f"{i} 0 obj\n".encode("latin-1"))
            out.extend(obj)
            out.extend(b"\nendobj\n")

        xref_start = len(out)
        out.extend(f"xref\n0 {len(objects)+1}\n".encode("latin-1"))
        out.extend(b"0000000000 65535 f \n")
        for pos in xref_positions:
            out.extend(f"{pos:010d} 00000 n \n".encode("latin-1"))
        out.extend(
            f"trailer\n<< /Size {len(objects)+1} /Root {catalog_id} 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode("latin-1")
        )
        return bytes(out)


def parse_markdown(md_text: str) -> list[tuple[str, str]]:
    blocks: list[tuple[str, str]] = []
    paragraph: list[str] = []

    def flush_paragraph() -> None:
        if paragraph:
            blocks.append(("p", " ".join(s.strip() for s in paragraph if s.strip())))
            paragraph.clear()

    for raw in md_text.splitlines():
        line = raw.rstrip()
        if not line.strip():
            flush_paragraph()
            continue

        if line.startswith("# "):
            flush_paragraph()
            blocks.append(("h1", line[2:].strip()))
        elif line.startswith("## "):
            flush_paragraph()
            blocks.append(("h2", line[3:].strip()))
        elif line.startswith("### "):
            flush_paragraph()
            blocks.append(("h3", line[4:].strip()))
        elif re.match(r"^\s*[-*]\s+", line):
            flush_paragraph()
            blocks.append(("li", re.sub(r"^\s*[-*]\s+", "", line).strip()))
        elif re.match(r"^\s*\d+\.\s+", line):
            flush_paragraph()
            blocks.append(("li", re.sub(r"^\s*\d+\.\s+", "", line).strip()))
        else:
            paragraph.append(line)

    flush_paragraph()
    return blocks


def build_pdf() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    md_text = SOURCE_MD.read_text(encoding="utf-8")
    blocks = parse_markdown(md_text)

    pdf = PDFBuilder()
    pdf.cover()

    for kind, text in blocks:
        if kind == "h1":
            pdf.h1(text)
        elif kind == "h2":
            pdf.h2(text)
        elif kind == "h3":
            pdf.h3(text)
        elif kind == "li":
            pdf.paragraph(text, prefix="- ", gap_after=4)
        else:
            pdf.paragraph(text)

    OUTPUT_PDF.write_bytes(pdf.finish())
    print(f"Wrote {OUTPUT_PDF}")


if __name__ == "__main__":
    build_pdf()
