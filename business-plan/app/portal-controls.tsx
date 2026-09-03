'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart3, BookOpen, Building2, Calculator, CircleHelp, Compass, HeartCrack, Home, Landmark, LogOut, Menu, Play, Rocket, Search, Smartphone, Target, TrendingUp, UsersRound, X } from 'lucide-react';

export const portalTabs = [
  ['overview', 'Overview'], ['problem', 'Problem'], ['product', 'Product'], ['market', 'Market'],
  ['competitors', 'Competitors'], ['business-model', 'Business model'], ['financials', 'Financials'], ['ask', 'The ask'], ['traction', 'Traction'],
  ['marketing', 'Go-to-market'], ['pilots', 'Pilots'], ['founder', 'Founder & company'],
  ['faqs', 'FAQs'], ['business-plan', 'Full biz plan'],
] as const;

const portalIcons = {
  overview: Home,
  problem: HeartCrack,
  product: Smartphone,
  market: TrendingUp,
  competitors: Target,
  'business-model': Building2,
  financials: Calculator,
  ask: Rocket,
  traction: BarChart3,
  marketing: Compass,
  pilots: Landmark,
  founder: UsersRound,
  faqs: CircleHelp,
  'business-plan': BookOpen,
} as const;

function showPanel(id: string, setActive?: (value: string) => void) {
  document.querySelectorAll<HTMLElement>('[data-portal-panel]').forEach((panel) => {
    panel.hidden = panel.id !== id;
  });
  setActive?.(id);
  window.dispatchEvent(new CustomEvent('tellie-panel', { detail: id }));
  window.history.replaceState(null, '', `#${id}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function PortalControls() {
  const [active, setActive] = useState('overview');
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const sync = (event: Event) => setActive((event as CustomEvent<string>).detail);
    window.addEventListener('tellie-panel', sync);
    const requested = window.location.hash.slice(1);
    if (portalTabs.some(([id]) => id === requested)) showPanel(requested, setActive);
    return () => window.removeEventListener('tellie-panel', sync);
  }, []);

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.assign('/login');
  }

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-xl md:hidden">
        <div className="flex h-16 items-center justify-between gap-5 px-4 sm:px-8">
          <button onClick={() => showPanel('overview', setActive)} className="focus-ring rounded-lg" aria-label="Tellie portal overview"><img src="/tellie-logo.png" alt="Tellie" className="h-12 w-auto" /></button>
          <button onClick={() => setMenu(true)} className="focus-ring rounded-full border border-stone-200 p-2.5" aria-label="Open navigation"><Menu className="h-5 w-5" /></button>
        </div>
      </div>
      <aside className="group/nav fixed inset-y-0 left-0 z-50 hidden w-[76px] flex-col overflow-hidden border-r border-stone-200 bg-white shadow-[8px_0_30px_rgba(34,34,34,.05)] transition-[width] duration-300 hover:w-[270px] focus-within:w-[270px] md:flex">
        <button onClick={() => showPanel('overview', setActive)} className="focus-ring relative mx-2 mt-2 flex h-16 shrink-0 items-center overflow-hidden rounded-2xl px-[11px]" aria-label="Tellie portal overview">
          <img src="/tellie-mark.png" alt="" className="h-10 w-10 shrink-0 rounded-full object-cover transition-opacity group-hover/nav:opacity-0 group-focus-within/nav:opacity-0" />
          <img src="/tellie-wordmark.jpg" alt="Tellie" className="absolute left-4 h-13 w-auto opacity-0 transition-opacity group-hover/nav:opacity-100 group-focus-within/nav:opacity-100" />
        </button>
        <nav aria-label="Portal navigation" className="mt-3 flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 pb-3">
          {portalTabs.map(([id, label]) => { const Icon = portalIcons[id]; return <button title={label} key={id} onClick={() => showPanel(id, setActive)} aria-current={active === id ? 'page' : undefined} className={`focus-ring flex h-11 w-full items-center overflow-hidden rounded-xl px-[14px] text-sm font-medium transition ${active === id ? 'bg-[#f4eef8] text-[#75438a]' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`}><Icon className="h-5 w-5 shrink-0" /><span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/nav:opacity-100 group-focus-within/nav:opacity-100">{label}</span></button>; })}
        </nav>
        <div className="border-t border-stone-200 p-3"><button title="Sign out" onClick={logout} className="focus-ring flex h-11 w-full items-center overflow-hidden rounded-xl px-[14px] text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"><LogOut className="h-5 w-5 shrink-0" /><span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/nav:opacity-100 group-focus-within/nav:opacity-100">Sign out</span></button></div>
      </aside>
      {menu && <div className="fixed inset-0 z-50 overflow-y-auto bg-white p-5 sm:p-8 md:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between"><img src="/tellie-logo.png" alt="Tellie" className="h-13 w-auto" /><button onClick={() => setMenu(false)} className="focus-ring rounded-full border border-stone-200 p-2.5" aria-label="Close navigation"><X className="h-5 w-5" /></button></div>
        <nav className="mx-auto mt-10 grid max-w-2xl gap-2 sm:grid-cols-2" aria-label="Mobile portal navigation">
          {portalTabs.map(([id, label]) => { const Icon = portalIcons[id]; return <button key={id} onClick={() => { showPanel(id, setActive); setMenu(false); }} className={`focus-ring flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-base font-medium ${active === id ? 'border-[#cdb7da] bg-[#f4eef8] text-[#75438a]' : 'border-stone-200'}`}><Icon className="h-5 w-5" />{label}</button>; })}
        </nav>
        <button onClick={logout} className="mx-auto mt-8 flex max-w-2xl items-center gap-2 text-sm font-semibold text-stone-600"><LogOut className="h-4 w-4" /> Sign out</button>
      </div>}
    </>
  );
}

export function BusinessPlanNavigation({ items }: { items: ReadonlyArray<{ id: string; title: string }> }) {
  return <nav aria-label="Business plan contents" className="space-y-1">{items.map((item) => <button key={item.id} onClick={() => document.querySelector<HTMLElement>(`#business-plan .business-plan-content #${CSS.escape(item.id)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="focus-ring block w-full rounded-xl px-3 py-2 text-left text-sm leading-5 text-stone-600 transition hover:bg-[#f4eef8] hover:text-[#75438a]">{item.title}</button>)}</nav>;
}

export function PanelLink({ to, children, primary = false }: { to: string; children: React.ReactNode; primary?: boolean }) {
  return <button onClick={() => showPanel(to)} className={`focus-ring rounded-xl px-5 py-3 text-sm font-semibold transition ${primary ? 'bg-[#007f7a] text-white hover:bg-[#075e5b]' : 'border border-stone-300 bg-white hover:bg-stone-50'}`}>{children}</button>;
}

export function DemoButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openDemo = () => {
    setIsOpen(true);
    dialog.current?.showModal();
  };
  const closeDemo = () => {
    setIsOpen(false);
    dialog.current?.close();
  };
  return <>
    <button onClick={openDemo} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#007f7a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#075e5b]"><Play className="h-4 w-4 fill-current" /> Watch demo</button>
    <dialog ref={dialog} aria-labelledby="demo-title" onClose={() => setIsOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) closeDemo(); }} className="m-auto w-[min(540px,calc(100%-32px))] overflow-hidden rounded-3xl border border-stone-200 bg-white p-0 shadow-2xl backdrop:bg-[#4b3c55]/35">
      <div className="flex items-center justify-between border-b border-stone-200 p-4 sm:px-7 sm:py-5"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Product demonstration</p><h2 id="demo-title" className="mt-1 text-xl font-semibold">See Tellie in action</h2></div><button onClick={closeDemo} aria-label="Close demo" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-[#f4eef8] hover:text-[#75438a]"><X className="h-4 w-4" /></button></div>
      <div className="flex justify-center bg-[#f4eef8] p-2 sm:p-4">{isOpen && <iframe src="https://www.youtube.com/embed/CItIXMic6vg?autoplay=1&amp;rel=0" title="Tellie product demonstration" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="aspect-[9/16] max-h-[72vh] w-full max-w-[405px] rounded-2xl border-0 bg-stone-100" />}</div>
    </dialog>
  </>;
}

export function FaqSearch() {
  const [query, setQuery] = useState('');
  useEffect(() => {
    const value = query.trim().toLowerCase();
    document.querySelectorAll<HTMLElement>('[data-faq]').forEach((item) => {
      item.hidden = Boolean(value) && !item.innerText.toLowerCase().includes(value);
    });
    document.querySelectorAll<HTMLElement>('[data-faq-group]').forEach((group) => {
      const items = Array.from(group.querySelectorAll<HTMLElement>('[data-faq]'));
      group.hidden = Boolean(value) && items.every((item) => item.hidden);
    });
  }, [query]);
  return <label className="relative block"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" /><span className="sr-only">Search frequently asked questions</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pricing, pilots, privacy, investment…" className="focus-ring h-13 w-full rounded-2xl border border-stone-300 bg-white pl-11 pr-4" /></label>;
}
