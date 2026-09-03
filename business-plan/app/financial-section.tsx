import { BarChart3, Building2, CheckCircle2, CircleDollarSign, Coins, Landmark, LineChart, Network, ShieldCheck, UsersRound } from 'lucide-react';
import { FinancialCalculator } from './financial-calculator';

const validationQuestions = [
  ['Willingness to pay', 'What providers value, who owns the budget and which package supports a confident purchase.'],
  ['Resident activation', 'The share of suitable residents who onboard, converse meaningfully and continue using Tellie.'],
  ['Usage and delivery cost', 'Conversation frequency, blended cost per hour and the support required per active resident.'],
  ['Intelligence value', 'Whether provider insight improves decisions enough to sustain a facility dashboard licence.'],
  ['Family adoption', 'The proportion of families who activate the experience and the value providers can offer around it.'],
  ['Commercial conversion', 'The route from pilot to facility-wide rollout and from one location to the provider group.'],
];

const costGroups = [
  { icon: Coins, title: 'Service delivery', body: 'Conversational AI, real-time voice, memory, database, hosting, messaging and product support.' },
  { icon: UsersRound, title: 'Customer delivery', body: 'Provider onboarding, resident activation, training, implementation and customer success.' },
  { icon: LineChart, title: 'Product and engineering', body: 'Mobile products, dashboards, accessibility, analytics, reliability and senior engineering.' },
  { icon: ShieldCheck, title: 'Trust and evidence', body: 'Privacy, security, legal, compliance readiness, evaluation and outcome reporting.' },
  { icon: Network, title: 'Commercial growth', body: 'Sales, institutional partnerships, targeted marketing, events and account expansion.' },
  { icon: Building2, title: 'Company operations', body: 'Core team, finance, administration, insurance and the systems required to scale responsibly.' },
];

export function FinancialSection() {
  return <>
    <header className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">Financials</p>
      <h1 className="balanced mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">A recurring-revenue model with value that expands inside every account.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">Resident access establishes the provider relationship. Facility intelligence and Family Connect increase account value, while multi-site rollout creates the path to scale.</p>
    </header>

    <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" aria-label="Residential commercial package">
      {[
        [CircleDollarSign, 'A$45 per licensed resident', 'Monthly access to Tellie, modelled around eight conversation hours per active resident.'],
        [BarChart3, 'A$400 per facility', 'Monthly licence for provider intelligence, permissioned insight and analytics.'],
        [UsersRound, 'A$25 per activated family', 'Monthly Family Connect experience enabled through the residential provider.'],
        [Building2, 'A$2,500–A$5,000 setup', 'One-time implementation covering configuration, governance, training and launch preparation.'],
      ].map(([Icon, title, body], index) => { const C = Icon as typeof CircleDollarSign; return <article key={title as string} className={`rounded-3xl p-6 ${['bg-[#eaf5f4]', 'bg-[#f0f7fb]', 'bg-[#f7f3fb]', 'bg-[#fff8f0]'][index]}`}><C className="h-6 w-6 text-[#007f7a]" /><h2 className="mt-5 text-xl font-semibold">{title as string}</h2><p className="mt-3 text-sm leading-6 text-stone-600">{body as string}</p></article>; })}
    </section>

    <aside className="mt-5 flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-5 text-sm leading-6 text-stone-600"><Landmark className="mt-0.5 h-5 w-5 shrink-0 text-[#007f7a]" /><p><strong className="text-stone-900">Council programs remain a separate revenue pathway.</strong> Program access, delivery and outcome reporting will be scoped and priced around each community initiative rather than forced into the residential package.</p></aside>

    <FinancialCalculator />

    <section className="mt-16" aria-labelledby="usage-title">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Usage economics</p><h2 id="usage-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Allow deep conversation. Model the average responsibly.</h2><p className="mt-3 leading-7 text-stone-600">Tellie should never show an individual resident a countdown. Usage is pooled across the facility, allowing heavy users to talk more while commercial planning follows the average active resident.</p></div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-stone-200 bg-stone-50 px-5 py-4 text-xs font-semibold uppercase tracking-[.12em] text-stone-500 sm:px-7"><span>Planning scenario</span><span>Hours/month</span><span>Conversation cost</span></div>
          {[
            ['Low engagement', '4', 'A$7.52'],
            ['Base case', '8', 'A$15.04'],
            ['High engagement', '12', 'A$22.56'],
            ['Stress case', '20', 'A$37.60'],
            ['Heavy-user edge', '30', 'A$56.40'],
          ].map(([label, hours, cost], index) => <div key={label} className={`grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 text-sm sm:px-7 ${index < 4 ? 'border-b border-stone-200' : ''} ${index === 1 ? 'bg-[#eaf5f4]' : ''}`}><span className="font-semibold">{label}</span><span className="w-20 text-right text-stone-600">{hours}</span><span className="w-28 text-right font-medium">{cost}</span></div>)}
        </div>
        <figure className="rounded-3xl bg-[#f0f7fb] p-6 sm:p-7" aria-labelledby="usage-chart-title">
          <figcaption id="usage-chart-title"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#35739a]">Low · mid · high usage</p><h3 className="mt-3 text-xl font-semibold">How conversation changes margin</h3><p className="mt-2 text-sm leading-6 text-stone-600">Monthly cost per active resident and indicative facility gross margin.</p></figcaption>
          <div className="mt-7 flex h-52 items-end justify-around gap-4 border-b border-[#bfd6e4] px-2" role="img" aria-label="Low usage at four hours costs 7 dollars 52 per active resident with 77 percent margin. Mid usage at eight hours costs 15 dollars 4 with 67 percent margin. High usage at twelve hours costs 22 dollars 56 with 57 percent margin.">
            {[
              ['Low', '4h', 'A$7.52', '77%', 'h-[32%]', 'bg-[#8ed3cf]'],
              ['Mid', '8h', 'A$15.04', '67%', 'h-[62%]', 'bg-[#57aaa6]'],
              ['High', '12h', 'A$22.56', '57%', 'h-[92%]', 'bg-[#007f7a]'],
            ].map(([label, hours, cost, margin, height, colour]) => <div key={label} className="flex h-full min-w-0 flex-1 flex-col justify-end text-center"><div className="mb-2"><p className="text-sm font-semibold">{cost}</p><p className="text-[11px] text-stone-500">{margin} margin</p></div><div className={`mx-auto w-full max-w-20 rounded-t-2xl ${height} ${colour}`}><span className="mt-3 inline-block text-xs font-semibold text-white">{hours}</span></div></div>)}
          </div>
          <div className="mt-3 flex justify-around gap-4 text-center text-xs font-semibold text-stone-600">{['Low', 'Mid · base', 'High'].map((label) => <span key={label} className="min-w-0 flex-1">{label}</span>)}</div>
        </figure>
      </div>
      <p className="mt-4 text-xs leading-5 text-stone-500">Conversation cost uses the conservative A$1.88-per-hour planning assumption. The eight-hour base case is a hypothesis to validate through production analytics.</p>
    </section>

    <section className="mt-16" aria-labelledby="margin-title">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Margin logic</p><h2 id="margin-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Price from customer value. Engineer delivery for margin.</h2><p className="mt-3 leading-7 text-stone-600">Tellie’s commercial model should begin with what providers are willing to pay for stronger resident connection, useful intelligence and family value. Delivery economics then determine the package, usage allowances and operating model required for healthy contribution margins.</p></div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <article className="rounded-3xl border border-stone-200 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Account revenue</p><p className="mt-4 text-xl font-semibold">Resident access + dashboard + Family Connect</p><p className="mt-3 text-sm leading-6 text-stone-600">Three recurring layers make the provider relationship more valuable than a standalone companion subscription.</p></article>
        <article className="rounded-3xl border border-stone-200 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Variable economics</p><p className="mt-4 text-xl font-semibold">Revenue − delivery cost = contribution</p><p className="mt-3 text-sm leading-6 text-stone-600">Conversation intensity must be supported—not discouraged—because richer use creates better insight and greater product value.</p></article>
        <article className="rounded-3xl border border-stone-200 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Operating leverage</p><p className="mt-4 text-xl font-semibold">One integration, more residents and sites</p><p className="mt-3 text-sm leading-6 text-stone-600">Facility-wide activation and provider-group expansion distribute sales, onboarding and governance effort across a larger account.</p></article>
      </div>
    </section>

    <section className="mt-16 rounded-3xl bg-[#f7f3fb] p-7 sm:p-10" aria-labelledby="validation-title">
      <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
        <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#75609a]">Commercial validation</p><h2 id="validation-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">What the first deployments need to prove</h2><p className="mt-3 leading-7 text-stone-600">The financial model becomes investable as these assumptions are replaced with measured customer and product evidence.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">{validationQuestions.map(([title, body]) => <article key={title} className="rounded-2xl bg-white/85 p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{body}</p></article>)}</div>
      </div>
    </section>

    <section className="mt-16 grid gap-5 lg:grid-cols-2">
      <article className="rounded-3xl border border-stone-200 bg-white p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Price validation</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Test value before fixing the rate</h2><p className="mt-3 leading-7 text-stone-600">A$45 is the central commercial hypothesis. Provider conversations should test A$35, A$45 and A$55 while identifying the budget owner, required outcome, preferred package and facility-wide purchasing structure.</p></article>
      <article className="rounded-3xl bg-[#f0f7fb] p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#35739a]">Cost opportunity</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Better infrastructure strengthens margin—not limits conversation</h2><p className="mt-3 leading-7 text-stone-600">At the 200-resident base case, reducing conversation cost from A$1.88 toward A$1.25 per hour lifts indicative gross margin from approximately 67% to 75%. A scaled target near A$1.00 produces approximately 77%, before fixed company costs.</p></article>
    </section>

    <section className="mt-16" aria-labelledby="growth-title">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Growth scenarios</p><h2 id="growth-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Scale through evidence, not unsupported forecasts</h2><p className="mt-3 leading-7 text-stone-600">The model advances through observable commercial stages. Each stage strengthens the assumptions used in the next.</p></div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          ['01 · Commercial validation', 'Defined pilot cohort', 'Validate resident engagement, provider value, delivery effort, willingness to pay and the decision criteria for rollout.'],
          ['02 · Initial commercial scale', 'Facility-wide rollout', 'Activate all suitable residents, establish recurring dashboard and Family Connect adoption, and measure account contribution.'],
          ['03 · Account expansion', 'Multi-site provider agreement', 'Replicate the proven delivery model across locations, increasing recurring revenue without repeating the full acquisition cycle.'],
        ].map(([eyebrow, title, body], index) => <article key={title} className={`rounded-3xl p-7 ${index === 0 ? 'bg-[#fff8f0]' : index === 1 ? 'bg-[#eaf5f4]' : 'bg-[#f0f7fb]'}`}><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">{eyebrow}</p><h3 className="mt-4 text-2xl font-semibold tracking-[-.03em]">{title}</h3><p className="mt-3 text-sm leading-7 text-stone-600">{body}</p></article>)}
      </div>
    </section>

    <section className="mt-16" aria-labelledby="cost-title">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Cost structure</p><h2 id="cost-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">The capabilities required to deliver and scale</h2><p className="mt-3 leading-7 text-stone-600">Financial discipline requires visibility across both resident-level delivery costs and the team required to win, implement and retain institutional accounts.</p></div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{costGroups.map(({ icon: Icon, title, body }) => <article key={title} className="rounded-3xl border border-stone-200 bg-white p-6"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#eaf5f4] text-[#007f7a]"><Icon className="h-5 w-5" /></span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{body}</p></article>)}</div>
    </section>

    <section className="mt-16 rounded-3xl bg-[#eaf5f4] p-7 sm:p-10" aria-labelledby="case-title">
      <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Financial inflection</p><h2 id="case-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Convert an existing foundation into repeatable revenue</h2></div>
        <ul className="grid gap-3 sm:grid-cols-2">{['Operational mobile product', 'Multiple recurring revenue layers', 'Provider and council routes to market', 'Active pilot conversations', 'Clear facility-to-network expansion path', 'Measurable assumptions for commercial validation'].map((point) => <li key={point} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#007f7a]" />{point}</li>)}</ul>
      </div>
    </section>

    <p className="mt-6 text-xs leading-5 text-stone-500">All financial figures on this page are illustrative planning assumptions. Final pricing, margins and projections will be updated as provider research, pilot agreements and measured operating data become available.</p>
  </>;
}
