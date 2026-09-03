import { Building2, CalendarDays, CheckCircle2, FileCheck2, Landmark, MessageCircle, Network, PhoneCall, UserCheck, Users } from 'lucide-react';

const usageSignals = [
  { value: '29', label: 'Registered users', body: 'Registered production accounts, excluding guests and obvious test-pattern accounts.', icon: Users, style: 'border-[#b9deda] bg-[#eef8f7] text-[#075e5b]' },
  { value: '22', label: 'Conversation-active users', body: 'Registered users who initiated at least one voice or typed conversation.', icon: UserCheck, style: 'border-[#cddfeb] bg-[#f0f7fb] text-[#426b83]' },
  { value: '601', label: 'Conversation messages', body: 'Stored across voice calls and typed chat: 268 from users and 333 from Tellie.', icon: MessageCircle, style: 'border-[#ded5ec] bg-[#f7f3fb] text-[#65558a]' },
  { value: '19', label: 'Onboarding completed', body: 'Registered accounts recorded as having completed the onboarding flow.', icon: CheckCircle2, style: 'border-[#eadbc9] bg-[#fff8f0] text-[#9a5b25]' },
];

const commercialSignals = [
  { value: '2', title: 'Residential providers', body: 'Pilot conversations with two residential aged-care organisations.', icon: Building2 },
  { value: '1', title: 'Council pathway', body: 'A pilot conversation with the City of Gold Coast.', icon: Landmark },
  { value: '2', title: 'Community pathways', body: 'Pilot conversations with two established Gold Coast senior-community organisations.', icon: Users },
  { value: '2', title: 'Seniors expos', body: 'Tellie has been presented in person at two dedicated seniors expos.', icon: CalendarDays },
  { value: 'A$15k', title: 'Spark grant application', body: 'Application submitted for grant funding of up to A$15,000.', icon: FileCheck2 },
];

export function TractionSection() {
  return <>
    <header className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">Traction</p>
      <h1 className="balanced mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Production use and active pilot conversations.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">Current activity includes registered-user engagement, discussions with residential providers, council and community organisations, and participation in two seniors expos.</p>
    </header>

    <section className="mt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Production analytics</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Early production usage.</h2></div><p className="text-xs text-stone-500">Activity recorded 7 May–31 August 2026</p></div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{usageSignals.map(({ value, label, body, icon: Icon, style }) => <article key={label} className={`rounded-3xl border p-6 ${style}`}><Icon className="h-5 w-5" /><p className="mt-6 text-4xl font-semibold tracking-[-.05em] text-stone-900">{value}</p><h3 className="mt-3 text-sm font-semibold text-stone-900">{label}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></article>)}</div>
      <div className="mt-5 rounded-3xl border border-stone-200 bg-white p-6 sm:p-7"><div className="flex items-center gap-3"><PhoneCall className="h-5 w-5 text-[#007f7a]" /><h3 className="font-semibold">Tellie responses by conversation surface</h3></div><p className="mt-3 text-sm leading-6 text-stone-600">Of 333 Tellie responses, 291 were generated during real-time voice calls, 35 through typed chat and 7 legacy responses could not be reliably classified.</p><div className="mt-5 flex h-3 overflow-hidden rounded-full bg-stone-100" aria-label="291 voice responses, 35 typed-chat responses and 7 unclassified responses"><div className="w-[87.4%] bg-[#64b8b2]" /><div className="w-[10.5%] bg-[#9b89c2]" /><div className="w-[2.1%] bg-stone-300" /></div><div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-600"><span><b className="text-stone-900">291</b> voice</span><span><b className="text-stone-900">35</b> typed chat</span><span><b className="text-stone-900">7</b> legacy unclassified</span></div></div>
      <p className="mt-4 text-xs leading-5 text-stone-500">Source: aggregated Tellie production database, reviewed 3 September 2026. Figures cover registered accounts, exclude guest sessions and obvious test-pattern accounts, and contain no conversation content or personal information.</p>
    </section>

    <section className="mt-16 rounded-[28px] border border-stone-200 bg-white p-7 sm:p-10">
      <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Commercial traction</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Active channels.</h2></div><p className="text-sm leading-7 text-stone-600">Current conversations span residential care, local government and community organisations already connected to older adults.</p></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{commercialSignals.map(({ value, title, body, icon: Icon }, index) => <article key={title} className={`rounded-3xl p-6 ${['bg-[#eef8f7]', 'bg-[#f0f7fb]', 'bg-[#f7f3fb]', 'bg-[#fff8f0]', 'bg-[#f2f5f3]'][index]}`}><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#007f7a]" /><span className="text-3xl font-semibold tracking-[-.05em]">{value}</span></div><h3 className="mt-6 font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></article>)}</div>
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-stone-50 p-5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#007f7a]" /><p className="text-sm leading-6 text-stone-600"><strong className="text-stone-900">Current commercial stage:</strong> discovery and pilot development. The opportunities shown are not presented as signed pilots or revenue.</p></div>
    </section>

    <section className="mt-10">
      <article className="rounded-3xl border border-[#ded5ec] bg-[#faf9fc] p-7 sm:p-9"><Network className="h-6 w-6 text-[#65558a]" /><p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-[#65558a]">Confidential strategic momentum</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.03em]">Confidential conversations across investment, governance and partnerships.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">Additional discussions include prospective investment, board and advisory participation, partnerships and specialist capability across compliance, data, finance and technology. Names remain private while conversations develop.</p></article>
    </section>

    <section className="mt-16">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">The next evidence threshold</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-.04em]">Convert interest into measurable outcomes and commercial proof.</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
        ['01', 'Activate pilots', 'Convert the strongest residential, council and community pathways into agreed pilot delivery.'],
        ['02', 'Measure sustained use', 'Add reliable session duration and establish 30- and 90-day retention and churn by cohort.'],
        ['03', 'Demonstrate outcomes', 'Measure movement in loneliness, connection, participation and partner usefulness.'],
        ['04', 'Prove expansion', 'Validate willingness to pay and convert successful pilots into commercial or multi-site rollout.'],
      ].map(([number, title, body]) => <article key={number} className="rounded-3xl border border-stone-200 bg-white p-6"><p className="text-xs font-semibold text-[#007f7a]">{number}</p><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></article>)}</div>
    </section>
  </>;
}
