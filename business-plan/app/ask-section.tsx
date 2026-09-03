import { ArrowRight, BriefcaseBusiness, Calculator, CheckCircle2, Clock3, Code2, Handshake, Landmark, Megaphone, Scale, ShieldCheck, Target, UserRound } from 'lucide-react';

const validationEvidence = [
  'Residents can activate and use Tellie confidently',
  'Residents return and converse meaningfully',
  'Conversation depth produces useful, permissioned insight',
  'Providers find the dashboard relevant to resident support',
  'Delivery, consent and privacy processes work in practice',
  'The provider can make an informed commercial rollout decision',
];

const teamBudget = [
  ['Founder & CEO', 'A$66,000', 'A$7,920', 'A$73,920', 'Product decisions, growth strategy and company direction'],
  ['Backend engineer · offshore', 'A$48,000', '—', 'A$48,000', 'AI orchestration, memory, data and infrastructure'],
  ['Frontend engineer · offshore', 'A$48,000', '—', 'A$48,000', 'Resident, provider and family product experiences'],
  ['B2B sales · Australia', 'A$110,000', 'A$13,200', 'A$143,200', 'Includes A$20,000 performance allowance; also supports rollout'],
  ['Marketing · Australia · 0.5 FTE', 'A$45,000', 'A$5,400', 'A$50,400', 'Positioning, content, events and sales enablement'],
];

const operatingBudget = [
  ['Team', 'A$363,520'],
  ['Legal, privacy and contracting', 'A$30,000'],
  ['External accounting and tax', 'A$12,000'],
  ['Infrastructure and product tools', 'A$40,000'],
  ['Sales tools, travel and industry activity', 'A$30,000'],
  ['Insurance and company administration', 'A$15,000'],
];

export function AskSection() {
  return <>
    <header className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">The ask</p>
      <h1 className="balanced mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Validate the pilot metrics. Then go to market.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">Tellie’s immediate priority is a residential validation that measures the agreed pilot KPIs. The next step is a pre-seed raise to fund 12 months of commercial launch and go-to-market execution.</p>
    </header>

    <section className="mt-12 rounded-3xl border border-stone-200 bg-white p-6 sm:p-9" aria-label="Validation and funding sequence">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
        <article className="rounded-2xl bg-[#fff8f0] p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#9a5633]">Now</p><h2 className="mt-3 text-xl font-semibold">Validate with a provider</h2><p className="mt-2 text-sm leading-6 text-stone-600">Deploy Tellie with older residents and measure product, provider and operational value.</p></article>
        <ArrowRight className="mx-auto h-5 w-5 rotate-90 self-center text-[#57aaa6] lg:rotate-0" />
        <article className="rounded-2xl bg-[#eaf5f4] p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Evidence gate</p><h2 className="mt-3 text-xl font-semibold">Validate the pilot metrics</h2><p className="mt-2 text-sm leading-6 text-stone-600">Confirm adoption, useful insight, viable delivery and provider willingness to progress.</p></article>
        <ArrowRight className="mx-auto h-5 w-5 rotate-90 self-center text-[#57aaa6] lg:rotate-0" />
        <article className="rounded-2xl bg-[#f7f3fb] p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#75609a]">Then</p><h2 className="mt-3 text-xl font-semibold">Post-validation pre-seed</h2><p className="mt-2 text-sm leading-6 text-stone-600">Fund 12 months of commercial launch and go-to-market execution to convert evidence into recurring provider revenue.</p></article>
      </div>
    </section>

    <section className="mt-16" aria-labelledby="validation-ask-title">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Phase 1 · Pre-validation</p><h2 id="validation-ask-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Help Tellie validate value now</h2><p className="mt-3 leading-7 text-stone-600">Tellie is seeking either a residential validation partner or an aligned sponsor willing to fund a structured deployment with older residents.</p></div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl bg-[#eaf5f4] p-7 sm:p-9">
          <Handshake className="h-7 w-7 text-[#007f7a]" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Pathway A</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Become the validation partner</h3>
          <p className="mt-3 leading-7 text-stone-600">A residential provider enables an agreed cohort, internal champion and operational pathway. Tellie delivers the validation through a negotiated introductory or at-cost structure.</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-stone-700">{['Access to an appropriate resident cohort', 'Recruitment, consent and approval support', 'A named operational lead', 'Participation in evaluation and outcome review', 'A defined decision about wider rollout'].map((point) => <li key={point} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#007f7a]" />{point}</li>)}</ul>
        </article>
        <article className="rounded-3xl bg-[#f7f3fb] p-7 sm:p-9">
          <Landmark className="h-7 w-7 text-[#75609a]" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[.14em] text-[#75609a]">Pathway B</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Fund the validation</h3>
          <p className="mt-3 leading-7 text-stone-600">An investor, grant maker, council or aligned organisation funds delivery so a suitable provider can participate without a software fee.</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-stone-700">{['Product configuration and conversation infrastructure', 'Resident onboarding and facility implementation', 'Documented provider participation costs where appropriate', 'Privacy, legal and governance preparation', 'Measurement, analysis and outcome reporting'].map((point) => <li key={point} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#75609a]" />{point}</li>)}</ul>
        </article>
      </div>
      <aside className="mt-5 flex items-start gap-3 rounded-2xl bg-[#fff8f0] p-5 text-sm leading-6 text-stone-700"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#bd7048]" /><p><strong>Why now:</strong> confirming the validation pathway promptly allows approvals, recruitment and implementation to begin before the late-year operational slowdown. Delay risks moving meaningful validation into the following first quarter.</p></aside>
    </section>

    <section className="mt-16 rounded-3xl border border-stone-200 bg-white p-7 sm:p-10" aria-labelledby="evidence-title">
      <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
        <div><Target className="h-7 w-7 text-[#007f7a]" /><p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Evidence gate</p><h2 id="evidence-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">What must be true before pre-seed</h2><p className="mt-3 leading-7 text-stone-600">The validation replaces assumptions with evidence and establishes whether Tellie is ready to raise for commercial launch.</p></div>
        <ul className="grid gap-3 sm:grid-cols-2">{validationEvidence.map((point) => <li key={point} className="flex items-start gap-3 rounded-2xl bg-[#f7f7f5] p-4 text-sm leading-6"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#007f7a]" />{point}</li>)}</ul>
      </div>
    </section>

    <section className="mt-16" aria-labelledby="raise-title">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#75609a]">Phase 2 · Post-validation pre-seed</p><h2 id="raise-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">A 12-month team for commercial launch and go-to-market</h2><p className="mt-3 leading-7 text-stone-600">With the pilot metrics validated, pre-seed funding adds execution capacity while Micaela retains product decisions, growth strategy and company direction.</p></div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          [UserRound, 'Founder & CEO', 'Product, growth and company direction'],
          [Code2, 'Backend engineer', 'Offshore product execution'],
          [Code2, 'Frontend engineer', 'Offshore product execution'],
          [BriefcaseBusiness, 'B2B sales', 'Full-time Australian hire'],
          [Megaphone, 'Marketing', 'Part-time Australian hire'],
        ].map(([Icon, title, body], index) => { const C = Icon as typeof UserRound; return <article key={title as string} className={`rounded-3xl p-6 ${['bg-[#eaf5f4]', 'bg-[#f0f7fb]', 'bg-[#f0f7fb]', 'bg-[#fff8f0]', 'bg-[#f7f3fb]'][index]}`}><C className="h-5 w-5 text-[#007f7a]" /><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body as string}</p></article>; })}
      </div>
    </section>

    <section className="mt-12 overflow-hidden rounded-3xl border border-stone-200 bg-white" aria-labelledby="team-budget-title">
      <div className="p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Team budget</p><h2 id="team-budget-title" className="mt-3 text-2xl font-semibold tracking-[-.03em]">12-month working assumptions</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">Australian employment assumptions include 12% super. Offshore engineering figures reflect Tellie’s existing team arrangement.</p></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-y border-stone-200 bg-stone-50 text-xs uppercase tracking-[.1em] text-stone-500"><tr><th className="px-6 py-4 sm:px-8">Role</th><th className="px-4 py-4">Base / contract</th><th className="px-4 py-4">Super</th><th className="px-4 py-4">Annual budget</th><th className="px-6 py-4 sm:px-8">Purpose</th></tr></thead>
          <tbody className="divide-y divide-stone-200">{teamBudget.map(([role, base, superAmount, total, purpose]) => <tr key={role}><th className="px-6 py-4 font-semibold sm:px-8">{role}</th><td className="px-4 py-4 text-stone-600">{base}</td><td className="px-4 py-4 text-stone-600">{superAmount}</td><td className="px-4 py-4 font-semibold">{total}</td><td className="px-6 py-4 text-stone-600 sm:px-8">{purpose}</td></tr>)}</tbody>
        </table>
      </div>
    </section>

    <section className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_.95fr]" aria-labelledby="funding-model-title">
      <article className="rounded-3xl bg-[#eaf5f4] p-7 sm:p-9">
        <Calculator className="h-7 w-7 text-[#007f7a]" />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Working pre-seed funding model</p>
        <h2 id="funding-model-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Approximately A$565,000 for 12 months</h2>
        <p className="mt-3 leading-7 text-stone-600">This is a gross planning requirement before deducting commercial revenue, grants, credits or other funding secured after validation.</p>
        <dl className="mt-7 divide-y divide-[#c8e3e0]">{operatingBudget.map(([label, value]) => <div key={label} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-stone-600">{label}</dt><dd className="font-semibold">{value}</dd></div>)}<div className="flex justify-between gap-4 py-3 text-sm"><dt className="text-stone-600">Subtotal</dt><dd className="font-semibold">A$490,520</dd></div><div className="flex justify-between gap-4 py-3 text-sm"><dt className="text-stone-600">15% contingency</dt><dd className="font-semibold">A$73,578</dd></div><div className="flex justify-between gap-4 pt-4"><dt className="font-semibold">Working total</dt><dd className="text-xl font-semibold">A$564,098</dd></div></dl>
      </article>
      <article className="rounded-3xl bg-[#fff8f0] p-7 sm:p-9">
        <ShieldCheck className="h-7 w-7 text-[#bd7048]" />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-[#9a5633]">Use of capital</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Turn validation into repeatable commercial delivery</h2>
        <ul className="mt-6 space-y-4 text-sm leading-6 text-stone-700">{['Build product capabilities directed by the founder', 'Convert provider interest into commercial agreements', 'Support implementation through the B2B sales role', 'Strengthen positioning and sales enablement', 'Complete legal, privacy and accounting foundations', 'Fund infrastructure as resident usage grows', 'Create sufficient resilience for a 12-month execution window'].map((point) => <li key={point} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#bd7048]" />{point}</li>)}</ul>
        <p className="mt-7 rounded-2xl bg-white/80 p-5 text-sm leading-6 text-stone-600"><strong className="text-stone-900">Not the immediate ask.</strong> The final post-validation pre-seed amount and allocation will be revisited using measured delivery costs, provider pricing and expected first-year revenue.</p>
      </article>
    </section>

    <section className="mt-16 rounded-3xl bg-[#f0f7fb] p-7 text-center sm:p-10">
      <Scale className="mx-auto h-7 w-7 text-[#35739a]" />
      <h2 className="mt-5 text-3xl font-semibold tracking-[-.04em]">Help Tellie reach the evidence gate</h2>
      <p className="mx-auto mt-3 max-w-2xl leading-7 text-stone-600">If you can provide a residential cohort, support a funded validation or introduce an aligned partner, Tellie is ready to structure the next conversation.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><a href="mailto:hello@tellie.com.au?subject=Tellie%20residential%20validation" className="focus-ring rounded-xl bg-[#007f7a] px-5 py-3 text-sm font-semibold text-white">Discuss a validation</a><a href="mailto:hello@tellie.com.au?subject=Fund%20Tellie%20validation" className="focus-ring rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold">Fund the validation</a></div>
    </section>

    <p className="mt-6 text-xs leading-5 text-stone-500">Salary basis: Australian sales roles commonly range from A$110,000–A$130,000 for business development leadership; the model uses the lower end plus performance allowance. The part-time marketing assumption represents half of an approximately A$90,000 Brisbane marketing-executive benchmark. Australian employee costs include the current 12% super guarantee. <a href="https://au.seek.com/career-advice/article/highest-paid-sales-representative-roles-australia" target="_blank" rel="noreferrer" className="underline underline-offset-2">SEEK sales benchmark</a> · <a href="https://www.hays.com.au/salary-guide/salary-checker" target="_blank" rel="noreferrer" className="underline underline-offset-2">Hays salary guide</a> · <a href="https://www.ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/super-guarantee" target="_blank" rel="noreferrer" className="underline underline-offset-2">ATO super guarantee</a>. All figures remain planning assumptions.</p>
  </>;
}
