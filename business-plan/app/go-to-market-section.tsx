import {
  ArrowDown,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Handshake,
  Megaphone,
  Network,
  Presentation,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';

const lifecycle = [
  {
    step: '01',
    title: 'Target provider',
    body: 'Prioritise providers with a committed sponsor, a suitable first facility and potential to expand.',
  },
  {
    step: '02',
    title: 'Discovery',
    body: 'Understand resident needs, strategic priorities, approvals, success measures and the buying group.',
  },
  {
    step: '03',
    title: 'Tailored demonstration',
    body: 'Show the resident experience, provider intelligence and Family Connect against their priorities.',
  },
  {
    step: '04',
    title: 'Co-designed pilot',
    body: 'Agree the cohort, responsibilities, consent, implementation plan, KPIs and scale decision.',
  },
  {
    step: '05',
    title: 'Facility-wide rollout',
    body: 'Make Tellie available to all suitable residents at the first facility, with the selected package.',
  },
  {
    step: '06',
    title: 'Provider-wide expansion',
    body: 'Extend the proven model across additional locations and establish a group-wide partnership.',
  },
];

const buyingGroup = [
  ['Economic buyer', 'Executive and operational leaders responsible for resident experience, innovation and sustainable delivery.'],
  ['Internal champion', 'Facility, lifestyle, wellbeing or resident-experience leaders who can turn intent into adoption.'],
  ['Decision partners', 'Privacy, IT, clinical governance, procurement and finance teams who enable safe implementation.'],
  ['People served', 'Residents receive companionship; staff and families receive permissioned, useful insight.'],
];

const salesChannels = [
  { icon: Handshake, title: 'Trusted introductions', body: 'Founder and adviser networks, sector relationships and referrals open high-quality conversations.' },
  { icon: Target, title: 'Account-based outreach', body: 'A focused list of providers, mapped decision-makers and communication tailored to each organisation.' },
  { icon: Presentation, title: 'Industry presence', body: 'Senior expos, aged-care events, demonstrations and targeted speaking create trust and direct access.' },
  { icon: Network, title: 'Strategic pathways', body: 'Councils, community organisations, research partners and advisers strengthen reach and evidence.' },
  { icon: FileCheck2, title: 'Evidence-led content', body: 'Pilot outcomes, case studies and practical insight give buyers confidence to progress and expand.' },
];

const salesAssets = [
  'Provider overview and tailored demonstration',
  'Pilot plan, responsibilities and success measures',
  'Privacy, security and governance pack',
  'Commercial package and rollout pathway',
  'Outcome report and implementation recommendation',
  'Case study for internal and sector-wide proof',
];

const measures = [
  'Qualified provider opportunities',
  'Discovery-to-demonstration conversion',
  'Demonstration-to-pilot conversion',
  'Time from agreement to activation',
  'Pilot-to-facility rollout conversion',
  'Suitable residents activated and retained',
  'Dashboard and Family Connect adoption',
  'Facilities added within each provider group',
];

export function GoToMarketSection() {
  return (
    <>
      <header className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">Go-to-market</p>
        <h1 className="balanced mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
          Win one provider. Prove value. Expand across the organisation.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
          Tellie enters residential aged care through focused, relationship-led sales. A structured pilot creates the evidence for a facility-wide rollout, followed by expansion across the provider’s other locations.
        </p>
      </header>

      <section className="mt-12 grid gap-5 lg:grid-cols-2" aria-labelledby="growth-engines-title">
        <h2 id="growth-engines-title" className="sr-only">Tellie’s growth engines</h2>
        <article className="rounded-3xl bg-[#eaf5f4] p-7 sm:p-9">
          <div className="flex items-center gap-3 text-[#007f7a]"><Building2 className="h-6 w-6" /><p className="text-xs font-semibold uppercase tracking-[.16em]">Primary growth engine</p></div>
          <h3 className="mt-5 text-2xl font-semibold tracking-[-.03em]">Provider acquisition and expansion</h3>
          <p className="mt-3 max-w-xl leading-7 text-stone-600">Founder-led relationships, tailored demonstrations and measurable pilots create a clear route from one cohort to an organisation-wide agreement.</p>
        </article>
        <article className="rounded-3xl bg-[#f7f3fb] p-7 sm:p-9">
          <div className="flex items-center gap-3 text-[#75609a]"><Megaphone className="h-6 w-6" /><p className="text-xs font-semibold uppercase tracking-[.16em]">Supporting growth engine</p></div>
          <h3 className="mt-5 text-2xl font-semibold tracking-[-.03em]">Credibility before mass awareness</h3>
          <p className="mt-3 max-w-xl leading-7 text-stone-600">A focused digital presence, sector conversations and credible evidence support the sales process. Broad consumer acquisition comes after the institutional model is proven.</p>
        </article>
      </section>

      <section className="mt-16" aria-labelledby="lifecycle-title">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Provider lifecycle</p>
          <h2 id="lifecycle-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">From first conversation to provider-wide partnership</h2>
          <p className="mt-3 leading-7 text-stone-600">Each stage answers the next buying question and creates a defined decision to move forward.</p>
        </div>
        <ol className="mt-8 grid gap-3 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] xl:items-stretch">
          {lifecycle.map((item, index) => (
            <li key={item.step} className="contents">
              <article className={`rounded-3xl border border-stone-200 p-5 ${index === 4 ? 'bg-[#fff2e9]' : index === 5 ? 'bg-[#eaf5f4]' : 'bg-white'}`}>
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">{item.step}</p>
                <h3 className="mt-3 text-base font-semibold leading-6">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.body}</p>
              </article>
              {index < lifecycle.length - 1 && <ChevronRight aria-hidden="true" className="mx-auto h-5 w-5 rotate-90 self-center text-[#57aaa6] xl:rotate-0" />}
            </li>
          ))}
        </ol>
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#f0f7fb] p-5 text-sm leading-6 text-stone-700">
          <ArrowDown className="mt-0.5 h-5 w-5 shrink-0 text-[#35739a]" />
          <p><strong>The expansion logic is deliberate:</strong> validate with a defined cohort, roll out to all suitable residents in the first facility, then make the same proven experience accessible across the provider’s full network.</p>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="buying-group-title">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Account strategy</p>
          <h2 id="buying-group-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Sell to the organisation, design for the resident</h2>
          <p className="mt-3 leading-7 text-stone-600">One provider decision involves several stakeholders. Tellie gives each of them a clear reason and a safe path to proceed.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {buyingGroup.map(([title, body], index) => (
            <article key={title} className={`rounded-3xl p-6 ${['bg-[#eaf5f4]', 'bg-[#fff8f0]', 'bg-[#f0f7fb]', 'bg-[#f7f3fb]'][index]}`}>
              <Users className="h-5 w-5 text-[#007f7a]" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[.9fr_1.1fr]" aria-labelledby="channels-title">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Acquisition channels</p>
          <h2 id="channels-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Focused routes into provider conversations</h2>
          <p className="mt-3 leading-7 text-stone-600">Tellie prioritises high-trust, high-context access to decision-makers over high-volume lead generation.</p>
        </div>
        <div className="divide-y divide-stone-200 rounded-3xl border border-stone-200 bg-white px-6 sm:px-8">
          {salesChannels.map(({ icon: Icon, title, body }) => (
            <article key={title} className="grid gap-3 py-5 sm:grid-cols-[auto_1fr]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf5f4] text-[#007f7a]"><Icon className="h-5 w-5" /></span>
              <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-stone-600">{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-stone-200 bg-white p-7 sm:p-9">
          <ShieldCheck className="h-6 w-6 text-[#007f7a]" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Brand position</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Connection begins with a conversation.</h2>
          <p className="mt-3 leading-7 text-stone-600">Tellie stands for familiar technology that helps an older adult feel heard, then turns permissioned insight into better-timed human connection.</p>
          <div className="mt-6 rounded-2xl bg-[#eaf5f4] p-5"><p className="font-semibold">Provider promise</p><p className="mt-1 text-sm leading-6 text-stone-600">Know what your residents need.</p></div>
          <p className="mt-5 text-sm leading-6 text-stone-600">Brand-building stays selective: useful sector content, LinkedIn, senior expos, speaking, media and guest podcast appearances where provider decision-makers already pay attention.</p>
        </article>
        <article className="rounded-3xl bg-[#fff8f0] p-7 sm:p-9">
          <FileCheck2 className="h-6 w-6 text-[#bd7048]" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-[#9a5633]">Sales enablement</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Give every stakeholder what they need to say yes</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {salesAssets.map((asset) => <li key={asset} className="flex items-start gap-2 text-sm leading-6 text-stone-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#c66f45]" />{asset}</li>)}
          </ul>
        </article>
      </section>

      <section className="mt-16 rounded-3xl bg-[#eaf5f4] p-7 sm:p-10" aria-labelledby="measurement-title">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Commercial measurement</p>
            <h2 id="measurement-title" className="mt-3 text-3xl font-semibold tracking-[-.04em]">Measure movement toward durable accounts</h2>
            <p className="mt-3 leading-7 text-stone-600">The go-to-market model is judged by provider progression, resident adoption and account expansion—not audience size alone.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {measures.map((measure) => <li key={measure} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#007f7a]" />{measure}</li>)}
          </ul>
        </div>
      </section>

      <aside className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 text-sm leading-6 text-stone-600">
        <strong className="text-stone-900">Channel discipline:</strong> direct-to-consumer acquisition remains a later path. It should follow institutional validation and preserve a clear commercial advantage for residential partners.
      </aside>
    </>
  );
}
