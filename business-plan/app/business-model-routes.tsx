'use client';

import { useState } from 'react';
import { ArrowRight, Building2, Check, Landmark, LayoutDashboard, Smartphone, UsersRound } from 'lucide-react';

const providerFlow = [
  ['Residential provider', 'Defines a pilot cohort and success measures'],
  ['Older residents', 'Use Tellie for conversation and connection'],
  ['Provider dashboard', 'Turns permissioned signals into useful staff context'],
  ['Family Connect', 'Adds reassurance and better-timed connection'],
  ['Multi-site rollout', 'Expands after agreed pilot outcomes'],
];

const councilFlow = [
  ['Council', 'Defines a place-based pilot and desired outcomes'],
  ['Community partners', 'Recruit eligible older residents'],
  ['Older residents', 'Access a council-branded program free, at cost or at a subsidised price'],
  ['Council dashboard', 'Shows council-branded, aggregated reach, connection and local patterns'],
  ['Renew or expand', 'Scale by cohort, suburb or program term'],
];

function Flow({ steps, council }: { steps: string[][]; council: boolean }) {
  return <div className="mt-8 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">{steps.map(([title, body], index) => <div key={title} className="contents"><article className={`rounded-2xl p-5 ${index === 0 ? (council ? 'bg-[#f4f1fa]' : 'bg-[#edf8f7]') : 'border border-stone-200 bg-white'}`}><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#007f7a]">0{index + 1}</span><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></article>{index < steps.length - 1 && <ArrowRight className="mx-auto h-5 w-5 rotate-90 self-center text-[#68aaa6] lg:rotate-0" />}</div>)}</div>;
}

export function BusinessModelRoutes() {
  const [active, setActive] = useState<'provider' | 'council'>('provider');
  const council = active === 'council';

  return <section className="mt-12 overflow-hidden rounded-[28px] border border-stone-200 bg-white p-5 sm:p-8 lg:p-11">
    <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Commercial pathways</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Two buyers. Two packages. One connection platform.</h2></div><p className="text-sm leading-7 text-stone-600">Both pathways begin with a measurable pilot. Residential providers purchase a resident-centred service ecosystem; councils sponsor access as a place-based public-benefit program.</p></div>

    <div className="mt-8 inline-flex max-w-full rounded-2xl bg-stone-100 p-1" role="tablist" aria-label="Business model pathway">
      <button role="tab" aria-selected={!council} onClick={() => setActive('provider')} className={`focus-ring flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${!council ? 'bg-white text-[#075e5b] shadow-sm' : 'text-stone-600'}`}><Building2 className="h-4 w-4" /> Residential providers</button>
      <button role="tab" aria-selected={council} onClick={() => setActive('council')} className={`focus-ring flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${council ? 'bg-white text-[#65558a] shadow-sm' : 'text-stone-600'}`}><Landmark className="h-4 w-4" /> Councils</button>
    </div>

    <div className="mt-8 rounded-3xl bg-[#f8f8f6] p-5 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div className="max-w-3xl"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${council ? 'bg-[#eee9f7] text-[#65558a]' : 'bg-[#e1f2f0] text-[#075e5b]'}`}>Pilot-led · happening now</span><h3 className="mt-4 text-2xl font-semibold tracking-[-.03em]">{council ? 'Council-branded community access' : 'Provider-led resident ecosystem'}</h3><p className="mt-3 text-sm leading-7 text-stone-600">{council ? 'The council begins with a defined community cohort and chooses whether participating older residents access Tellie free, at cost or at an affordable subsidised community price. The council-branded program includes privacy-safe intelligence and outcome reporting.' : 'The provider begins with a defined resident cohort. A successful pilot creates the pathway to recurring resident access, facility intelligence and optional Family Connect.'}</p></div>{council ? <Landmark className="h-8 w-8 shrink-0 text-[#65558a]" /> : <Building2 className="h-8 w-8 shrink-0 text-[#007f7a]" />}</div>
      <Flow steps={council ? councilFlow : providerFlow} council={council} />
    </div>

    <div className="mt-10 grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">{council ? 'Council commercial package' : 'Residential commercial package'}</p><h3 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{council ? 'Sponsor community access. Make public benefit visible.' : 'Land with the companion. Expand through insight and family value.'}</h3></div><p className="text-sm leading-7 text-stone-600">{council ? 'A council purchases one branded program that combines implementation, flexible participant access and privacy-safe community intelligence.' : 'A provider purchases the complete ecosystem, then chooses whether Family Connect is included in its service or offered as a paid premium feature.'}</p></div>

    <div className="mt-8 grid gap-4 lg:grid-cols-3">{(council ? [
      [Landmark, 'Pilot design and delivery', 'The initial program covers co-design, governance, configuration, partner onboarding and launch.', 'Scope agreed with the council'],
      [Smartphone, 'Flexible community access', 'The council purchases a defined allocation and chooses free, at-cost or affordable subsidised access for eligible residents.', 'Per participant, cohort or funded usage band'],
      [LayoutDashboard, 'Branded insight and evaluation', 'The council receives a branded, aggregated dashboard, program reporting and an evidence base for renewal.', 'Program licence · evaluation can be added'],
    ] : [
      [Smartphone, 'Tellie Companion', 'Conversation, games, discovery, memory and connection for each participating resident.', 'Working model · A$20 per resident monthly'],
      [LayoutDashboard, 'Provider Intelligence', 'Permissioned resident insight and facility trends support more person-centred engagement.', 'Working model · A$150 per facility monthly'],
      [UsersRound, 'Family Connect', 'Relatives receive reassurance, relevant context and prompts for better-timed connection.', 'Working model · A$25 per enabled family monthly'],
    ]).map(([Icon, title, body, price]) => { const C = Icon as typeof Smartphone; return <article key={title as string} className="rounded-2xl border border-stone-200 bg-white p-6"><C className={`h-6 w-6 ${council ? 'text-[#65558a]' : 'text-[#007f7a]'}`} /><h3 className="mt-5 text-lg font-semibold">{title as string}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{body as string}</p><p className={`mt-5 text-xs font-semibold ${council ? 'text-[#65558a]' : 'text-[#075e5b]'}`}>{price as string}</p></article>; })}</div>

    <div className="mt-6 grid gap-4 lg:grid-cols-2">{(council ? [
      ['One branded program', 'Tellie can carry the council identity across participant onboarding, access and reporting, creating a visible community initiative.'],
      ['Flexible local delivery', 'The council can recruit through libraries, community centres, neighbourhood programs and trusted local partners.'],
    ] : [
      ['Bundle for simpler purchasing', 'The provider can purchase all three layers under one agreement, simplifying procurement, rollout and account management.'],
      ['Create value for the provider', 'Family Connect can be included as a service differentiator or offered by the provider as a premium family benefit.'],
    ]).map(([title, body]) => <article key={title} className={`rounded-2xl border p-5 ${council ? 'border-[#ddd5eb] bg-[#faf9fc]' : 'border-[#cfe7e5] bg-[#f7fbfa]'}`}><div className="flex items-start gap-3"><Check className={`mt-0.5 h-5 w-5 shrink-0 ${council ? 'text-[#65558a]' : 'text-[#007f7a]'}`} /><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{body}</p></div></div></article>)}</div>

    {!council && <div className="mt-6 rounded-2xl bg-[#edf8f7] p-5"><div className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#007f7a]" /><div><h3 className="font-semibold">How the provider account grows</h3><p className="mt-2 text-sm leading-6 text-stone-600">Begin with a defined pilot cohort. After the pilot decision, convert to the recurring package: resident access, facility dashboard, Family Connect and eventual multi-site expansion.</p></div></div></div>}
  </section>;
}
