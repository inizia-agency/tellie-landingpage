const ACCESS_PASSWORD = 'tellie-investor-2026';
const ACCESS_STORAGE_KEY = 'tellie-business-plan-unlocked';

const track = document.getElementById('bp-track');
const progressBar = document.getElementById('bp-progress-bar');
const lockScreen = document.getElementById('bp-lock');
const lockForm = document.getElementById('bp-lock-form');
const passwordInput = document.getElementById('bp-password');
const lockError = document.getElementById('bp-lock-error');
const relockButton = document.getElementById('bp-relock');
const tooltip = document.getElementById('source-tooltip');
const tocToggle = document.getElementById('bp-toc-toggle');
const tocClose = document.getElementById('bp-toc-close');
const tocDrawer = document.getElementById('bp-toc-drawer');
const tocScrim = document.getElementById('bp-toc-scrim');
const tocLinks = Array.from(document.querySelectorAll('.bp-toc-link'));
const progressPath = document.getElementById('bp-progress-bar');

let isPointerDown = false;
let dragStartX = 0;
let dragStartScroll = 0;
let wheelLock = false;
let tooltipHideTimer = null;
let activeSourceButton = null;
let progressPathLength = 0;

function getDesktopPanels() {
    return Array.from(track.querySelectorAll('.bp-panel'));
}

function getActivePanelIndex() {
    const panels = getDesktopPanels();
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    panels.forEach((panel, index) => {
        const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
        const distance = Math.abs(panelCenter - viewportCenter);
        if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = index;
        }
    });

    return bestIndex;
}

function scrollToPanel(index) {
    const panels = getDesktopPanels();
    const clampedIndex = Math.max(0, Math.min(index, panels.length - 1));
    const targetPanel = panels[clampedIndex];
    if (!targetPanel) return;

    track.scrollTo({
        left: targetPanel.offsetLeft,
        behavior: 'smooth',
    });
}

function setTocOpen(isOpen) {
    tocDrawer.classList.toggle('is-open', isOpen);
    tocDrawer.setAttribute('aria-hidden', String(!isOpen));
    tocToggle.setAttribute('aria-expanded', String(isOpen));
    tocScrim.hidden = !isOpen;
}

function setUnlocked(unlocked) {
    if (unlocked) {
        localStorage.setItem(ACCESS_STORAGE_KEY, 'true');
        lockScreen.classList.add('is-hidden');
        document.body.classList.remove('is-locked');
        passwordInput.value = '';
        lockError.textContent = '';
    } else {
        localStorage.removeItem(ACCESS_STORAGE_KEY);
        lockScreen.classList.remove('is-hidden');
        document.body.classList.add('is-locked');
        passwordInput.focus();
    }
}

function updateProgress() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const ratio = maxScroll <= 0 ? 0 : track.scrollLeft / maxScroll;
    if (progressPathLength > 0) {
        progressPath.style.strokeDashoffset = String(progressPathLength * (1 - Math.min(1, Math.max(0, ratio))));
    }
    const activeIndex = getActivePanelIndex();
    tocLinks.forEach((link) => {
        link.classList.toggle('is-active', Number(link.dataset.panelIndex) === activeIndex);
    });
}

function setupProgressPath() {
    if (!progressPath || typeof progressPath.getTotalLength !== 'function') return;
    progressPathLength = progressPath.getTotalLength();
    progressPath.style.strokeDasharray = String(progressPathLength);
    progressPath.style.strokeDashoffset = String(progressPathLength);
}

function setupWheelScroll() {
    const onWheel = (event) => {
        if (window.innerWidth <= 760) return;
        if (lockScreen && !lockScreen.classList.contains('is-hidden')) return;
        if (event.target.closest('.source-tooltip')) return;
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
        if (wheelLock) {
            event.preventDefault();
            return;
        }

        const verticalIntent = event.deltaY;
        const horizontalIntent = event.deltaX;
        const nextDelta = verticalIntent !== 0 ? verticalIntent : horizontalIntent;

        if (!nextDelta) return;

        event.preventDefault();
        const direction = nextDelta > 0 ? 1 : -1;
        const currentIndex = getActivePanelIndex();
        scrollToPanel(currentIndex + direction);
        wheelLock = true;
        window.setTimeout(() => {
            wheelLock = false;
        }, 650);
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
}

function setupKeyboardScroll() {
    window.addEventListener('keydown', (event) => {
        if (window.innerWidth <= 760) return;
        if (lockScreen && !lockScreen.classList.contains('is-hidden')) return;
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollToPanel(getActivePanelIndex() + 1);
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollToPanel(getActivePanelIndex() - 1);
        }
    });
}

function setupDragScroll() {
    track.addEventListener('pointerdown', (event) => {
        if (window.innerWidth <= 760) return;
        isPointerDown = true;
        dragStartX = event.clientX;
        dragStartScroll = track.scrollLeft;
        track.classList.add('is-dragging');
        track.setPointerCapture(event.pointerId);
    });

    track.addEventListener('pointermove', (event) => {
        if (!isPointerDown) return;
        const distance = event.clientX - dragStartX;
        track.scrollLeft = dragStartScroll - distance;
    });

    const release = () => {
        isPointerDown = false;
        track.classList.remove('is-dragging');
    };

    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);
    track.addEventListener('pointerleave', release);
}

function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        {
            root: track,
            threshold: 0.32,
        }
    );

    revealElements.forEach((element) => observer.observe(element));
}

function positionTooltip(button) {
    const rect = button.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const preferredTop = rect.bottom + 12;
    const fallbackTop = rect.top - tooltipRect.height - 12;
    const top = preferredTop + tooltipRect.height + 20 <= window.innerHeight
        ? preferredTop
        : Math.min(window.innerHeight - tooltipRect.height - 20, fallbackTop);
    const left = Math.min(window.innerWidth - tooltipRect.width - 16, Math.max(16, rect.left - 6));
    tooltip.style.top = `${Math.max(16, top)}px`;
    tooltip.style.left = `${left}px`;
}

function showTooltip(button) {
    window.clearTimeout(tooltipHideTimer);
    activeSourceButton = button;
    const title = button.dataset.sourceTitle || '';
    const copy = button.dataset.sourceCopy || '';
    const url = button.dataset.sourceUrl || '#';

    tooltip.querySelector('.source-tooltip-title').textContent = title;
    tooltip.querySelector('.source-tooltip-copy').textContent = copy;
    tooltip.querySelector('.source-tooltip-link').href = url;
    tooltip.classList.add('is-visible');
    tooltip.setAttribute('aria-hidden', 'false');
    positionTooltip(button);
}

function hideTooltip(immediate = false) {
    const hide = () => {
        activeSourceButton = null;
        tooltip.classList.remove('is-visible');
        tooltip.setAttribute('aria-hidden', 'true');
    };

    window.clearTimeout(tooltipHideTimer);
    if (immediate) {
        hide();
        return;
    }

    tooltipHideTimer = window.setTimeout(hide, 180);
}

function keepTooltipOpen() {
    window.clearTimeout(tooltipHideTimer);
}

function setupTooltipHoverPersistence() {
    tooltip.addEventListener('mouseenter', keepTooltipOpen);
    tooltip.addEventListener('mouseleave', () => hideTooltip());
    tooltip.addEventListener('focusin', keepTooltipOpen);
    tooltip.addEventListener('focusout', () => hideTooltip());
}

function setupSourceTooltips() {
    const sourceButtons = document.querySelectorAll('.source-pill');

    sourceButtons.forEach((button) => {
        button.addEventListener('mouseenter', () => showTooltip(button));
        button.addEventListener('focus', () => showTooltip(button));
        button.addEventListener('mouseleave', () => hideTooltip());
        button.addEventListener('blur', () => hideTooltip());
        button.addEventListener('click', (event) => {
            if (window.innerWidth > 760) return;
            event.preventDefault();
            showTooltip(button);
        });
    });

    document.addEventListener('click', (event) => {
        if (!tooltip.contains(event.target) && !event.target.closest('.source-pill')) {
            hideTooltip(true);
        }
    });

    window.addEventListener('resize', () => hideTooltip(true));
    track.addEventListener('scroll', () => hideTooltip(true));
}

function setupLock() {
    const wasUnlocked = localStorage.getItem(ACCESS_STORAGE_KEY) === 'true';
    if (wasUnlocked) {
        setUnlocked(true);
    } else {
        document.body.classList.add('is-locked');
        passwordInput.focus();
    }

    lockForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const attempt = passwordInput.value.trim();
        if (attempt === ACCESS_PASSWORD) {
            setUnlocked(true);
            return;
        }

        lockError.textContent = 'That password does not match.';
        lockScreen.animate(
            [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' },
            ],
            { duration: 280, easing: 'ease-out' }
        );
    });

    relockButton.addEventListener('click', () => {
        setUnlocked(false);
        track.scrollTo({ left: 0, behavior: 'smooth' });
    });
}

function setupToc() {
    tocToggle.addEventListener('click', () => {
        const shouldOpen = !tocDrawer.classList.contains('is-open');
        setTocOpen(shouldOpen);
    });

    tocClose.addEventListener('click', () => setTocOpen(false));
    tocScrim.addEventListener('click', () => setTocOpen(false));

    tocLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const index = Number(link.dataset.panelIndex);
            scrollToPanel(index);
            setTocOpen(false);
        });
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setTocOpen(false);
        }
    });
}

function init() {
    setupProgressPath();
    setupLock();
    setupToc();
    setupWheelScroll();
    setupKeyboardScroll();
    setupDragScroll();
    setupRevealAnimations();
    setupTooltipHoverPersistence();
    setupSourceTooltips();
    updateProgress();
    track.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
}

init();
