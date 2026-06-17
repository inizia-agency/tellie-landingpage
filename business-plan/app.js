const FIXED_PASSWORD = "InvestingInTellie";
const STORAGE_KEY = "tellieBusinessPlanUnlocked";

const gate = document.getElementById("password-gate");
const gateForm = document.getElementById("gate-form");
const gatePassword = document.getElementById("gate-password");
const gateError = document.getElementById("gate-error");

function unlockGate() {
  gate.hidden = true;
  document.body.classList.remove("gate-locked");
}

function lockGate() {
  gate.hidden = false;
  document.body.classList.add("gate-locked");
  gatePassword.focus();
}

try {
  if (window.localStorage.getItem(STORAGE_KEY) === "true") {
    unlockGate();
  } else {
    lockGate();
  }
} catch {
  lockGate();
}

gateForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = gatePassword.value.trim();

  if (value === FIXED_PASSWORD) {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    gateError.hidden = true;
    gatePassword.value = "";
    unlockGate();
    return;
  }

  gateError.hidden = false;
  gatePassword.select();
});

const panes = Array.from(document.querySelectorAll(".toc-inner, .document"));

panes.forEach((pane) => {
  let timer = null;

  const showScrollbar = () => {
    pane.classList.add("is-scrolling");
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      pane.classList.remove("is-scrolling");
    }, 700);
  };

  pane.addEventListener("scroll", showScrollbar, { passive: true });
  pane.addEventListener("wheel", showScrollbar, { passive: true });
  pane.addEventListener("touchmove", showScrollbar, { passive: true });
});
