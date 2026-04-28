// ---------- Config ----------
const SUPPORTED_LANGS = ['en', 'es', 'pt'];
const I18N_PATH = (lang) => `i18n/${lang}.json`;

// Public Apps Script Web App URL
const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbzCLn3KSIAASZ7JYDzA2kN65hcO7UR9JhTNQajfiK2IX_mRgsmh3aYm_EuBm6nFW_dr/exec';

// ---------- Helpers ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const enc = encodeURIComponent;

function mapToSupported(langLike) {
    if (!langLike) return 'en';
    const lower = langLike.toLowerCase();
    if (SUPPORTED_LANGS.includes(lower)) return lower;
    const prefix = lower.split('-')[0];
    return SUPPORTED_LANGS.includes(prefix) ? prefix : 'en';
}
function getServerHint() {
    const htmlHint = document.documentElement.dataset.geoLocale || '';
    if (htmlHint) return htmlHint;
    const meta = document.querySelector('meta[name="x-geo-locale"]');
    return meta?.getAttribute('content') || '';
}
async function fetchJSON(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    return res.json();
}
function setHtmlLang(lang) { document.documentElement.setAttribute('lang', lang); }
function getCurrentLang() { return document.documentElement.getAttribute('lang') || 'en'; }
function applyTranslations(dict) {
    $$('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = key.split('.').reduce((o, k) => (o && o[k] != null) ? o[k] : null, dict);
        if (typeof val === 'string') el.textContent = val;
    });
    $$('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = key.split('.').reduce((o, k) => (o && o[k] != null) ? o[k] : null, dict);
        if (typeof val === 'string') el.setAttribute('placeholder', val);
    });
}

// ---------- Language bootstrap ----------
async function chooseInitialLang() {
    const browserLocales = Array.isArray(navigator.languages) ? navigator.languages : [];
    const browserPreferred = browserLocales.find(langLike => SUPPORTED_LANGS.includes(mapToSupported(langLike)));
    if (browserPreferred) return mapToSupported(browserPreferred);

    const browserFallback = navigator.language || navigator.userLanguage;
    if (browserFallback) return mapToSupported(browserFallback);

    const hint = getServerHint();
    if (hint) return mapToSupported(hint);
    return 'en';
}
async function loadLang(lang) {
    const dict = await fetchJSON(I18N_PATH(lang));
    applyTranslations(dict);
    setHtmlLang(lang);
    return dict;
}

// ---------- UI basics ----------
function setupYear() {
    const y = $('#year');
    if (y) y.textContent = String(new Date().getFullYear());
}
function setupNavToggle() {
    const toggle = $('#nav-toggle');
    const menu = $('#nav-menu');
    if (!toggle || !menu) return;

    const setMenuState = (isOpen) => {
        menu.classList.toggle('hidden', !isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        toggle.textContent = isOpen ? '×' : '☰';
        toggle.classList.toggle('mobile-nav-toggle-close', isOpen);
    };

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('hidden');
        setMenuState(isOpen);
    });

    $$('a[href^="#"]', menu).forEach(link => {
        link.addEventListener('click', () => setMenuState(false));
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) setMenuState(false);
    });
}

// ---------- Analytics core ----------
function _payloadBase() {
    return { userAgent: navigator.userAgent || '', page: location.href, lang: getCurrentLang() };
}

// Fire-and-forget (events) + GET pixel fallback
function trackEvent({ event, label = '', section = '', href = '', extra = {} }) {
    const payload = { ..._payloadBase(), type: 'event', event, label, section, href, extra };

    // Try to POST quickly
    try {
        const body = JSON.stringify(payload);
        if (navigator.sendBeacon) {
            navigator.sendBeacon(ANALYTICS_URL, new Blob([body], { type: 'text/plain;charset=utf-8' }));
        } else {
            fetch(ANALYTICS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body
            }).catch(() => {});
        }
    } catch (_) {}

    // GET pixel fallback (guaranteed server hit)
    try {
        const p = _payloadBase();
        const pixelUrl =
            `${ANALYTICS_URL}?t=event&event=${enc(event || '')}` +
            `&label=${enc(label || '')}&section=${enc(section || '')}` +
            `&href=${enc(href || '')}&lang=${enc(p.lang || '')}` +
            `&ua=${enc(p.userAgent || '')}&page=${enc(p.page || '')}` +
            `&extra=${enc(JSON.stringify(extra || {}))}&ts=${Date.now()}`;
        console.debug('[tellie:event] pixel →', pixelUrl);
        (new Image()).src = pixelUrl;
    } catch (_) {}
}

// ---------- CTA Click Tracking ----------
function setupCtaTracking() {
    document.addEventListener('click', (e) => {
        const el = e.target.closest('[data-evt]');
        if (!el) return;
        const eventName = el.getAttribute('data-evt');
        const label = el.getAttribute('data-label') || '';
        const href = el.getAttribute('href') || '';
        const section = el.closest('section')?.id || '';
        trackEvent({ event: eventName, label, section, href, extra: { ts: Date.now() } });
    });
}

// ---------- Init ----------
(async function init() {
    setupYear();
    setupNavToggle();
    setupCtaTracking();

    const lang = await chooseInitialLang();
    try {
        await loadLang(lang);
    } catch (e) {
        console.error('Failed to init i18n:', e);
    }

    // Optional: one-time health check in console (writes a row)
    const pingUrl = `${ANALYTICS_URL}?t=ping&ts=${Date.now()}`;
    console.debug('[tellie:ping] →', pingUrl);
    (new Image()).src = pingUrl;
})();
