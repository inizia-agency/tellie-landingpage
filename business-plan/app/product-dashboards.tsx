'use client';

import { useState } from 'react';
import { BarChart3, BellRing, Building2, CalendarDays, HeartHandshake, HeartPulse, Home, Landmark, LockKeyhole, Sparkles, UsersRound } from 'lucide-react';

function Laptop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-[18px] border-[7px] border-[#252525] bg-[#252525] p-1 shadow-[0_24px_65px_rgba(34,34,34,.16)] sm:rounded-[24px] sm:border-[10px]"><div className="overflow-hidden rounded-[8px] bg-white sm:rounded-[11px]"><img src={src} alt={alt} className="aspect-[3/2] h-auto w-full object-cover" /></div></div>
      <div className="mx-auto h-3 w-[78%] rounded-b-[50%] bg-gradient-to-b from-stone-300 to-stone-400 shadow-md sm:h-4" />
    </div>
  );
}

function FamilyPhone() {
  const nav = [[Home,'Home'],[BarChart3,'Insights'],[CalendarDays,'Calendar'],[UsersRound,'Family']] as const;
  return <div className="relative mx-auto w-[min(300px,78vw)] rounded-[3.1rem] border-[9px] border-[#242424] bg-[#242424] p-1 shadow-[0_28px_70px_rgba(34,34,34,.2)]"><div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[#242424]"/><div className="overflow-hidden rounded-[2.5rem] bg-white"><img src="/tellie-family-app.png" alt="Concept for the Tellie family app showing Margaret’s wellbeing, a suggested time to call and recent interests" className="h-auto w-full object-contain" /><nav aria-label="Family app concept navigation" className="grid grid-cols-4 border-t border-stone-200 bg-white px-2 pb-4 pt-3">{nav.map(([Icon,label],index)=><div key={label} className={`flex flex-col items-center gap-1 text-[9px] font-semibold ${index === 0 ? 'text-[#007f7a]' : 'text-stone-400'}`}><Icon className="h-4 w-4"/><span>{label}</span></div>)}</nav></div></div>;
}

export function ProductDashboards({ councilSrc, residentialSrc }: { councilSrc: string; residentialSrc: string }) {
  const [active, setActive] = useState<'residential' | 'council'>('residential');
  const residential = active === 'residential';
  return (
    <section className="mt-16 rounded-[28px] border border-stone-200 bg-white p-5 sm:p-8 lg:p-12">
      <div className="grid gap-7 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Partner data portals · Developed</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">The right insight for each setting.</h2></div><p className="text-sm leading-7 text-stone-600">Tellie turns privacy-safe, conversation-informed signals into useful views for the people supporting older adults. Council sees community patterns; residential care sees person-centred insights. Each deployment requires partner activation and configuration.</p></div>
      <div className="mt-8 inline-flex rounded-2xl bg-stone-100 p-1" role="tablist" aria-label="Dashboard type">
        <button role="tab" aria-selected={residential} onClick={() => setActive('residential')} className={`focus-ring flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${residential ? 'bg-white text-[#075e5b] shadow-sm' : 'text-stone-600'}`}><Building2 className="h-4 w-4" /> Residential care</button>
        <button role="tab" aria-selected={!residential} onClick={() => setActive('council')} className={`focus-ring flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${!residential ? 'bg-white text-[#075e5b] shadow-sm' : 'text-stone-600'}`}><Landmark className="h-4 w-4" /> Council</button>
      </div>
      <div className="mt-9"><Laptop src={residential ? residentialSrc : councilSrc} alt={residential ? 'Concept for the Tellie residential care dashboard' : 'Concept for the Tellie council community connection dashboard'} /></div>
      <div className="mx-auto mt-9 grid max-w-5xl gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div><span className="inline-flex rounded-full bg-[#eaf5f4] px-3 py-1 text-xs font-semibold text-[#075e5b]">{residential ? 'Resident-level support' : 'Community-level insight'}</span><h3 className="mt-4 text-2xl font-semibold">{residential ? 'Help staff know the person—not only the room number.' : 'Help councils understand connection across the community.'}</h3></div>
        <div className="grid gap-3 sm:grid-cols-2">{(residential ? ['Preferences, routines and interests','Mood and loneliness signals','Family and support context','Themes that support person-centred care'] : ['Community connection and loneliness trends','Event interest, attendance and feedback','Neighbourhood-level patterns','Opportunities to improve local programming']).map(item => <div key={item} className="rounded-2xl bg-[#f7f7f5] p-4 text-sm font-medium leading-6">{item}</div>)}</div>
      </div>
      {residential && <section className="mt-12 overflow-hidden rounded-[26px] border border-[#d9d1ea] bg-gradient-to-br from-[#f6f3fb] via-white to-[#edf8f7] p-6 sm:p-9 lg:p-11">
        <div className="grid gap-10 lg:grid-cols-[1fr_.72fr] lg:items-center">
          <div><span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#65558a] shadow-sm">Included with residential care</span><h3 className="mt-5 text-3xl font-semibold tracking-[-.04em]">A family view inside the Tellie app.</h3><p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">A separate family-member sign-in gives relatives a gentle, permissioned view of how their loved one is doing—and helps them understand when connection may matter most.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">{[[HeartPulse,'Overall wellbeing','Recent emotional patterns and meaningful change.'],[BellRing,'When to connect','A thoughtful signal when a call or visit may help.'],[HeartHandshake,'What is affecting them','Themes that may be causing worry or disconnection.'],[Sparkles,'What they are enjoying','Recent interests, activities and positive moments.']].map(([Icon,title,body])=>{const C=Icon as typeof HeartPulse;return <article key={title as string} className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm"><C className="h-5 w-5 text-[#75629f]"/><h4 className="mt-3 text-sm font-semibold text-stone-800">{title as string}</h4><p className="mt-1 text-xs leading-5 text-stone-600">{body as string}</p></article>})}</div>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#ddd5eb] bg-white/70 p-4"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#65558a]"/><p className="text-xs leading-5 text-stone-600">Available only in residential-provider deployments. Elder consent and granular sharing permissions remain central to the experience.</p></div>
          </div>
          <FamilyPhone />
        </div>
      </section>}
    </section>
  );
}
