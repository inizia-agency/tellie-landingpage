'use client';

import { useState } from 'react';
import { BarChart3, Building2, HeartHandshake, Landmark, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';

const understanding = [
  ['Identity & life story', 'Preferred identity, background, childhood, work, relationships, milestones, meaningful memories and legacy stories.'],
  ['Family & social world', 'Family structure, important people, visits, friendships, support networks and desired family contact.'],
  ['Culture & communication', 'Culture, language, faith, values, preferred pace and tone, engaging topics and subjects to approach carefully.'],
  ['Interests & daily life', 'Music, entertainment, creativity, movement, food, places, routines, likes, dislikes and sources of enjoyment.'],
  ['Activities & connection', 'Activity preferences, participation barriers, community ties and opportunities aligned with the person’s interests.'],
  ['Mood & engagement', 'Conversational mood, patterns over time, responsiveness, loneliness indicators, withdrawal and sources of comfort.'],
  ['Possible unmet needs', 'Conversation references to pain, sleep, hearing, mobility, social support or another need requiring human review.'],
  ['Change over time', 'Changes in interests, routines, mood, engagement, relationships and concerns across conversations.'],
];

const councilUnderstanding = [
  ['Loneliness spectrum', 'How participants are distributed from feeling connected through mild, moderate or higher loneliness, and how that changes over time.'],
  ['Community interests', 'Activities, subjects and experiences older residents say they would genuinely enjoy.'],
  ['Event awareness', 'Whether residents know what is available locally and where information is being missed.'],
  ['Recommendation response', 'Which personalised suggestions create interest, intention or a request for more information.'],
  ['Participation', 'Whether a resident attended, returned and felt more connected after taking part.'],
  ['Barriers to attendance', 'Transport, mobility, cost, timing, distance, accessibility, confidence, language or lack of companionship.'],
  ['Neighbourhood patterns', 'Aggregated differences in interests, participation and barriers across locations and cohorts.'],
  ['Inclusive access', 'How language, culture, disability and digital confidence affect access to community life.'],
  ['Unmet community need', 'Activities residents want but cannot find, and practical changes that could improve participation.'],
];

const residentialKpis = [
  ['Completion', 'At least 30 residents complete the pilot', 'Enrolment and completion records'],
  ['Retention', 'At least 75% remain active through month three', 'Tellie product analytics'],
  ['Loneliness outcome', 'Participants experiencing loneliness at baseline move toward lower reported loneliness', 'Same agreed measure at baseline, midpoint and final'],
  ['Resident understanding', 'At least 75% of staff report improved understanding', 'Baseline and final staff survey'],
  ['Personalised support', 'At least 70% report better support without increased workload', 'Final staff survey and workload check'],
  ['Actionable insight', 'At least 70% have an insight used in real-world support', 'Short staff action log'],
  ['Dashboard usefulness', 'At least 75% rate it useful or very useful', 'Final staff survey'],
  ['Resident experience', 'At least 70% report a favourable experience', 'Independent resident survey'],
  ['Continued demand', 'At least 70% would like to continue', 'Final resident survey'],
  ['Safety & trust', 'Zero unresolved serious safety, consent or privacy incidents', 'Incident and corrective-action register'],
];

const councilKpis = [
  ['Community reach', 'Eligible residents enrolled across the agreed locations and priority cohorts', 'Program enrolment records'],
  ['Activation', 'Participants complete onboarding and a first meaningful conversation', 'Onboarding and product analytics'],
  ['30/90-day retention', 'Participants return and build sustained use over the program term', 'Tellie product analytics'],
  ['Digital confidence', 'Participants report greater confidence using an accessible digital service', 'Baseline and follow-up survey'],
  ['Loneliness spectrum', 'The cohort shifts toward lower reported loneliness from baseline to completion', 'Same agreed loneliness measure at baseline, midpoint and final'],
  ['Connection outcome', 'Participants report feeling heard, supported and more connected to people and community', 'Baseline, midpoint and final survey'],
  ['Inclusive access', 'Reach and experience are understood across languages and priority cohorts', 'Voluntary cohort data and interviews'],
  ['Relevant suggestions', 'Participants receive proactive local-event suggestions matched to their interests', 'Recommendation delivery and response events'],
  ['Participation conversion', 'Suggestions lead to expressed interest, planned attendance or verified attendance', 'Interest, intention and post-event follow-up'],
  ['Participation barriers', 'Non-attendance reasons reveal practical barriers the council can address', 'Participant follow-up and barrier categories'],
  ['Community involvement', 'Participants increase involvement in suitable local activities during the pilot', 'Baseline/final survey and attendance follow-up'],
  ['Community intelligence', 'Council teams use aggregated demand and barrier patterns to improve local programming', 'Dashboard review and stakeholder survey'],
  ['Delivery capability', 'Council and community partners feel confident supporting participants', 'Training records and pre/post survey'],
  ['Safety & trust', 'No unresolved serious safety, consent or privacy incidents', 'Incident and corrective-action register'],
];

function KpiTable({ rows }: { rows: string[][] }) {
  return <div className="mt-7 overflow-x-auto rounded-2xl border border-stone-200"><table className="min-w-[760px] w-full border-collapse text-left text-xs"><thead className="bg-[#eaf5f4] text-[#283c3a]"><tr><th className="px-5 py-4 font-semibold">Measure</th><th className="px-5 py-4 font-semibold">Success criterion</th><th className="px-5 py-4 font-semibold">Evidence</th></tr></thead><tbody>{rows.map(([measure, success, evidence], index) => <tr key={measure} className={index % 2 ? 'bg-stone-50' : 'bg-white'}><td className="border-t border-stone-200 px-5 py-4 font-semibold text-stone-800">{measure}</td><td className="border-t border-stone-200 px-5 py-4 leading-5 text-stone-600">{success}</td><td className="border-t border-stone-200 px-5 py-4 leading-5 text-stone-600">{evidence}</td></tr>)}</tbody></table></div>;
}

export function PilotSection() {
  const [active, setActive] = useState<'residential' | 'council'>('residential');
  const council = active === 'council';
  const steps = council ? ['Agree community and outcomes', 'Confirm partners and governance', 'Recruit and onboard', 'Measure use and connection', 'Report public benefit', 'Decide renewal or expansion'] : ['Agree cohort and outcomes', 'Confirm consent and roles', 'Brief staff and onboard', 'Monitor use and support', 'Measure resident and staff value', 'Decide rollout or refinement'];

  return <>
    <header className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">Pilots & opportunities</p><h1 className="balanced mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">A measurable path from first conversation to confident rollout.</h1><p className="mt-5 text-lg leading-8 text-stone-600">Every Tellie pilot begins with a defined cohort, clear responsibilities and evidence agreed with the partner. Residential and council pilots share the product—but measure success differently.</p></header>

    <section className="mt-10 rounded-[28px] border border-stone-200 bg-white p-5 sm:p-8 lg:p-10">
      <div className="inline-flex max-w-full rounded-2xl bg-stone-100 p-1" role="tablist" aria-label="Pilot type"><button role="tab" aria-selected={!council} onClick={() => setActive('residential')} className={`focus-ring flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${!council ? 'bg-white text-[#075e5b] shadow-sm' : 'text-stone-600'}`}><Building2 className="h-4 w-4" /> Residential care</button><button role="tab" aria-selected={council} onClick={() => setActive('council')} className={`focus-ring flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${council ? 'bg-white text-[#65558a] shadow-sm' : 'text-stone-600'}`}><Landmark className="h-4 w-4" /> Council</button></div>

      <div className={`mt-8 rounded-3xl p-6 sm:p-8 ${council ? 'bg-[#f4f1fa]' : 'bg-[#edf8f7]'}`}><div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><div><p className={`text-xs font-semibold uppercase tracking-[.14em] ${council ? 'text-[#65558a]' : 'text-[#007f7a]'}`}>{council ? 'Council pilot' : 'Residential pilot'}</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{council ? 'Help older residents take part in community life.' : 'Demonstrate resident value and operational value together.'}</h2><p className="mt-4 text-sm leading-7 text-stone-600">{council ? 'Tellie proactively suggests relevant council and community events, follows the journey from interest to attendance and reveals the practical barriers that prevent participation. Success means helping more older residents get involved in their community.' : 'The residential pilot structure includes one preparation month followed by three active months, with up to 36 residents and a target of at least 30 completions. It is designed to be adapted and replicated with other residential providers.'}</p></div><div className="grid gap-3 sm:grid-cols-2">{(council ? [['Participant','Older residents in an agreed place or priority cohort'],['Delivery partners','Council, libraries and trusted community organisations'],['Evidence','Suggestions, attendance follow-up, analytics, surveys and interviews'],['Decision','Improve programming, remove barriers, renew or expand']] : [['Participant','A voluntary, representative resident cohort'],['Delivery partners','Provider lead, authorised staff and Tellie'],['Evidence','Product analytics, surveys, interviews and action logs'],['Decision','Roll out, expand across sites or refine the model']]).map(([label, body]) => <article key={label} className="rounded-2xl bg-white/80 p-4"><p className="text-xs font-semibold text-stone-800">{label}</p><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></article>)}</div></div></div>

      <div className="mt-8"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Pilot journey</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{steps.map((step, index) => <div key={step} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${council ? 'bg-[#eee9f7] text-[#65558a]' : 'bg-[#e1f2f0] text-[#075e5b]'}`}>0{index + 1}</span><p className="text-sm font-semibold">{step}</p></div>)}</div></div>

      <section className="mt-12"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Tellie’s areas of understanding</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{council ? 'Know what the community needs.' : 'Know what your residents need.'}</h2><p className="mt-3 text-sm leading-7 text-stone-600">{council ? 'Tellie aggregates conversation-informed interests, participation and barriers so councils can strengthen how older residents connect with local life.' : 'Information is learned naturally through conversation and shared according to consent and role. It supports human understanding and action; it does not replace professional judgement.'}</p></div><div className="mt-7 grid gap-3 md:grid-cols-2">{(council ? councilUnderstanding : understanding).map(([title, body]) => <article key={title} className="rounded-2xl border border-stone-200 bg-white p-5"><div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#007f7a]" /><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></div></div></article>)}</div></section>

      {council && <section className="mt-12 rounded-3xl bg-[#edf8f7] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">From suggestion to participation</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">See where community connection succeeds—and where the city can help.</h2><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{[['Suggest','A relevant local event'],['Interest','Does it appeal?'],['Plan','Do they intend to go?'],['Attend','Did they participate?'],['Understand','If not, what stopped them?'],['Improve','What can council change?']].map(([title, body], index) => <article key={title} className="rounded-2xl bg-white p-4"><span className="text-[10px] font-semibold text-[#007f7a]">0{index + 1}</span><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></article>)}</div><p className="mt-5 text-xs leading-6 text-stone-600"><strong className="text-stone-800">Barriers become actionable insight:</strong> transport, accessibility, mobility, timing, cost, distance, language, confidence, awareness or not having someone to attend with.</p></section>}


      <section className="mt-12"><div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Success criteria & KPIs</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{council ? 'Measure community reach, inclusion and connection.' : 'Measure resident outcomes and provider value.'}</h2></div><p className="text-sm leading-7 text-stone-600">{council ? 'Council thresholds are agreed against the program’s cohort, locations and public-benefit objectives before launch.' : 'The proposed targets provide a replicable residential starting point. Final definitions and thresholds are adapted and confirmed with each provider before baseline measurement.'}</p></div><KpiTable rows={council ? councilKpis : residentialKpis} /></section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">{[[BarChart3,'Product evidence','Activation, meaningful conversations, frequency, duration, retention and technical performance.'],[UsersRound,'Independent feedback','Resident, staff and optional family surveys and interviews administered outside Tellie.'],[HeartHandshake,'Real-world action','Documented examples of insight leading to a conversation, activity, family contact, review, referral or service.']].map(([Icon, title, body]) => { const C = Icon as typeof BarChart3; return <article key={title as string} className="rounded-2xl border border-stone-200 bg-white p-5"><C className="h-5 w-5 text-[#007f7a]" /><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body as string}</p></article>; })}</section>

      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#fff6ef] p-5"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#a8542c]" /><p className="text-xs leading-6 text-stone-600"><strong className="text-stone-800">A pilot ends with a decision.</strong> The partner receives a clear report covering participation, outcomes, dashboard usefulness, operational fit, actions, risks, limitations and the recommendation to roll out, refine or stop.</p></div>
    </section>

    <section className="mt-10 rounded-3xl border border-[#ddd5eb] bg-[#faf9fc] p-6 sm:p-8"><div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#65558a]">Loneliness measurements</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Measure movement across the loneliness spectrum.</h2></div><p className="text-sm leading-7 text-stone-600">Every pilot uses the same agreed loneliness measure at baseline, midpoint and completion. Residential providers can understand participant and cohort change with appropriate permissions; councils receive aggregated community-level movement.</p></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['Connected','Connection needs are largely being met','bg-[#dff1ef] text-[#075e5b]'],['Mild loneliness','Some connection feels missing','bg-[#eef3df] text-[#5d6d34]'],['Moderate loneliness','Connection is regularly insufficient','bg-[#fff1dd] text-[#9a5b25]'],['Higher loneliness','Connection feels persistently absent','bg-[#f8e5e4] text-[#934d48]']].map(([title, body, style]) => <article key={title} className={`rounded-2xl p-5 ${style}`}><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 opacity-80">{body}</p></article>)}</div><div className="mt-5 grid gap-3 sm:grid-cols-3">{[['Baseline','Where participants begin'],['Midpoint','Whether early movement is emerging'],['Completion','Whether loneliness decreases and connection grows']].map(([title, body]) => <div key={title} className="rounded-2xl bg-white p-4"><p className="text-xs font-semibold text-[#65558a]">{title}</p><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></div>)}</div><p className="mt-5 text-xs leading-6 text-stone-500">The spectrum supports outcome measurement; it is not a clinical diagnosis or permanent label.</p></section>

    <div className="mt-10 rounded-3xl bg-[#eaf5f4] p-7 sm:flex sm:items-center sm:justify-between sm:gap-8"><div><h2 className="text-2xl font-semibold">Could Tellie fit your community?</h2><p className="mt-2 text-sm text-stone-600">Tell us about your participants, setting and the outcome you want to demonstrate.</p></div><a href="mailto:hello@tellie.com.au?subject=Tellie%20pilot%20conversation" className="focus-ring mt-5 inline-block rounded-xl bg-[#007f7a] px-5 py-3 text-sm font-semibold text-white sm:mt-0">Design a pilot together</a></div>
  </>;
}
