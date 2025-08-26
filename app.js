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
    const saved = localStorage.getItem('lang');
    if (saved) return mapToSupported(saved);
    const hint = getServerHint();
    if (hint) return mapToSupported(hint);
    return mapToSupported(navigator.language || navigator.userLanguage || 'en');
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
    toggle.addEventListener('click', () => menu.classList.toggle('hidden'));
}

// ---------- Analytics core ----------
function _payloadBase() {
    return { userAgent: navigator.userAgent || '', page: location.href, lang: getCurrentLang() };
}

// CORS -> beacon -> fail (no "no-cors" success for signups; we need confirmation)
async function postWithConfirmation(data) {
    if (!ANALYTICS_URL) return { ok: false, method: 'none' };
    const body = JSON.stringify(data);

    // 1) CORS (readable)
    try {
        const res = await fetch(ANALYTICS_URL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body
        });
        return { ok: res.ok, method: 'cors', status: res.status };
    } catch (_) {}

    // 2) sendBeacon
    try {
        if (navigator.sendBeacon) {
            const ok = navigator.sendBeacon(ANALYTICS_URL, new Blob([body], { type: 'text/plain;charset=utf-8' }));
            if (ok) return { ok: true, method: 'beacon' };
        }
    } catch (_) {}

    // If we got here, we couldn't confirm delivery
    return { ok: false, method: 'unconfirmed' };
}

// Fire-and-forget (events) + GET pixel fallback (hits doGet)
function trackEvent({ event, label = '', section = '', href = '', extra = {} }) {
    const payload = { ..._payloadBase(), type: 'event', event, label, section, href, extra };

    // Try POST (beacon if possible)
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

    // Guaranteed fallback (GET pixel -> doGet)
    try {
        const p = _payloadBase();
        const url =
            `${ANALYTICS_URL}?t=event&event=${enc(event || '')}` +
            `&label=${enc(label || '')}&section=${enc(section || '')}` +
            `&href=${enc(href || '')}&lang=${enc(p.lang || '')}` +
            `&ua=${enc(p.userAgent || '')}&page=${enc(p.page || '')}` +
            `&extra=${enc(JSON.stringify(extra || {}))}&ts=${Date.now()}`;
        const img = new Image();
        img.src = url;
    } catch (_) {}
}

// ---------- Form feedback (single message) ----------
function getFeedbackEl() {
    // Use the existing #success-message container for both success and errors
    let el = $('#success-message');
    if (!el) {
        const form = $('#signup-form');
        if (!form) return null;
        el = document.createElement('div');
        el.id = 'success-message';
        el.className = 'mt-4 text-sm hidden';
        form.insertAdjacentElement('afterend', el);
    }
    return el;
}
function setFeedback(text, ok) {
    const el = getFeedbackEl();
    if (!el) return;
    el.textContent = text;
    el.classList.remove('hidden', 'text-red-600', 'text-green-600');
    el.classList.add(ok ? 'text-green-600' : 'text-red-600');
}
function clearFeedback() {
    const el = getFeedbackEl();
    if (!el) return;
    el.textContent = '';
    el.classList.add('hidden');
}
function isLikelyEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function localiseFormSending(dict) {
    const sendingText = dict?.signup?.form?.sending || 'Sending...';
    const successText = dict?.signup?.success || `Thank you! We'll be in touch soon.`;
    const genericError = dict?.signup?.form?.error || 'Something went wrong. Please try again.';
    const emailError = dict?.signup?.form?.emailError || 'Please enter a valid email address.';

    const form = $('#signup-form');
    if (!form) return;

    // Remove existing listeners by cloning
    form.replaceWith(form.cloneNode(true));
    const freshForm = $('#signup-form');

    // Clear any stale feedback on load
    clearFeedback();

    freshForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const button = freshForm.querySelector('button');
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = sendingText;

        const formData = new FormData(freshForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();

        if (!isLikelyEmail(email)) {
            setFeedback(emailError, false);
            button.disabled = false;
            button.textContent = originalText;
            return;
        }

        const extras = { referrer: document.referrer || '', ts: Date.now() };

        // Netlify in background (optional)
        const netlifyPromise = fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        }).catch(() => null);

        // Confirmed Apps Script POST
        const result = await postWithConfirmation({
            ..._payloadBase(),
            type: 'signup',
            name,
            email,
            extra: extras
        });

        // Track outcome as an event (with GET pixel fallback too)
        trackEvent({
            event: result.ok ? 'signup_success' : 'signup_failed',
            label: email,
            extra: extras
        });

        if (result.ok) {
            setFeedback(successText, true);
            freshForm.reset();
        } else {
            setFeedback(genericError, false);
            console.debug('Signup not confirmed. Check Web App access (must be "Anyone").', result);
        }

        try { await netlifyPromise; } catch (_) {}
        button.disabled = false;
        button.textContent = originalText;
    });
}

// ---------- Floating Language Button ----------
function setupLangWidget(currentLang, dict) {
    const widget = $('#lang-widget');
    const trigger = $('#lang-trigger');
    const menu = $('#lang-menu');
    if (!widget || !trigger || !menu) return;

    trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
            trigger.setAttribute('aria-expanded', 'false');
            menu.classList.add('hidden');
        }
    });

    $$('.lang-item', menu).forEach(btn => {
        btn.addEventListener('click', async () => {
            const lang = btn.dataset.lang;
            if (!lang || lang === currentLang) {
                widget.classList.add('hidden');
                return;
            }
            try {
                const newDict = await loadLang(lang);
                localiseFormSending(newDict);
                localStorage.setItem('lang', lang);
                trackEvent({ event: 'language_change', label: lang });
            } catch (e) {
                console.error('Language load error:', e);
            } finally {
                widget.classList.add('hidden');
            }
        });
    });
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
        const dict = await loadLang(lang);
        localiseFormSending(dict);
        setupLangWidget(lang, dict);
    } catch (e) {
        console.error('Failed to init i18n:', e);
        localiseFormSending({});
        setupLangWidget('en', {});
    }
})();
