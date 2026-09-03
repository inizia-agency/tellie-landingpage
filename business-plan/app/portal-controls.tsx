'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, Menu, Play, Search, X } from 'lucide-react';

export const portalTabs = [
  ['overview', 'Overview'], ['problem', 'Problem'], ['product', 'Product'], ['market', 'Market'],
  ['competitors', 'Competitors'], ['business-model', 'Business model'], ['financials', 'Financials'], ['ask', 'The ask'], ['traction', 'Traction'],
  ['marketing', 'Go-to-market'], ['pilots', 'Pilots'], ['founder', 'Founder & company'],
  ['faqs', 'FAQs'], ['business-plan', 'Legacy business plan'],
] as const;

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
      <div className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-8 lg:px-12">
          <button onClick={() => showPanel('overview', setActive)} className="focus-ring rounded-lg" aria-label="Tellie portal overview"><img src="/tellie-logo.png" alt="Tellie" className="h-12 w-auto" /></button>
          <nav aria-label="Portal navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
            {portalTabs.slice(0, 10).map(([id, label]) => (
              <button key={id} onClick={() => showPanel(id, setActive)} aria-current={active === id ? 'page' : undefined} className={`focus-ring whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition ${active === id ? 'bg-[#222] text-white' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`}>{label}</button>
            ))}
            <div className="group relative">
              <button className="focus-ring flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100">More <ChevronDown className="h-3 w-3" /></button>
              <div className="invisible absolute right-0 top-full mt-2 w-56 rounded-2xl border border-stone-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {portalTabs.slice(10).map(([id, label]) => <button key={id} onClick={() => showPanel(id, setActive)} className="focus-ring block w-full rounded-xl px-3 py-2.5 text-left text-sm hover:bg-stone-50">{label}</button>)}
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={logout} className="focus-ring hidden rounded-full border border-stone-200 p-2.5 text-stone-600 hover:bg-stone-50 sm:block" aria-label="Sign out"><LogOut className="h-4 w-4" /></button>
            <button onClick={() => setMenu(true)} className="focus-ring rounded-full border border-stone-200 p-2.5 xl:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
      {menu && <div className="fixed inset-0 z-50 bg-white p-5 sm:p-8 xl:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between"><img src="/tellie-logo.png" alt="Tellie" className="h-13 w-auto" /><button onClick={() => setMenu(false)} className="focus-ring rounded-full border border-stone-200 p-2.5" aria-label="Close navigation"><X className="h-5 w-5" /></button></div>
        <nav className="mx-auto mt-10 grid max-w-2xl gap-2 sm:grid-cols-2" aria-label="Mobile portal navigation">
          {portalTabs.map(([id, label]) => <button key={id} onClick={() => { showPanel(id, setActive); setMenu(false); }} className={`focus-ring rounded-2xl border px-5 py-4 text-left text-base font-medium ${active === id ? 'border-[#007f7a] bg-[#eaf5f4] text-[#075e5b]' : 'border-stone-200'}`}>{label}</button>)}
        </nav>
        <button onClick={logout} className="mx-auto mt-8 flex max-w-2xl items-center gap-2 text-sm font-semibold text-stone-600"><LogOut className="h-4 w-4" /> Sign out</button>
      </div>}
    </>
  );
}

export function PanelLink({ to, children, primary = false }: { to: string; children: React.ReactNode; primary?: boolean }) {
  return <button onClick={() => showPanel(to)} className={`focus-ring rounded-xl px-5 py-3 text-sm font-semibold transition ${primary ? 'bg-[#007f7a] text-white hover:bg-[#075e5b]' : 'border border-stone-300 bg-white hover:bg-stone-50'}`}>{children}</button>;
}

export function DemoButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button onClick={() => dialog.current?.showModal()} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#007f7a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#075e5b]"><Play className="h-4 w-4 fill-current" /> Watch demo</button>
    <dialog ref={dialog} className="m-auto w-[min(900px,calc(100%-32px))] rounded-3xl border border-stone-200 p-0 shadow-2xl backdrop:bg-black/50">
      <div className="flex items-center justify-between border-b border-stone-200 p-5 sm:px-7"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Product demonstration</p><h2 className="mt-1 text-xl font-semibold">See Tellie in action</h2></div><button onClick={() => dialog.current?.close()} aria-label="Close demo" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-stone-200"><X className="h-4 w-4" /></button></div>
      <div className="grid aspect-video place-items-center bg-[#e7efed] p-8 text-center"><div><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white shadow"><Play className="h-6 w-6 text-[#007f7a]" /></div><p className="mt-5 text-lg font-semibold">Micaela’s guided demo will live here.</p><p className="mt-2 max-w-md text-sm leading-6 text-stone-600">The portal is ready for a captioned product walkthrough whenever the final video is available.</p></div></div>
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
