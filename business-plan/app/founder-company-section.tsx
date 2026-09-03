import { Building2, Compass, GraduationCap, HandHeart, Heart, Lightbulb, Network, Rocket, Users } from 'lucide-react';

const direction = [
  { label: 'Today', title: 'Conversation that creates connection', body: 'A familiar phone-call experience gives older adults companionship and creates the trust to understand what matters.' },
  { label: 'Next', title: 'Insight that enables better support', body: 'Permissioned insights help families, providers and councils recognise when and how meaningful connection can be strengthened.' },
  { label: 'Long term', title: 'The global standard for connected ageing', body: 'Tellie helps define a new standard for healthy ageing—where older adults remain connected to the people, services and communities that enrich their lives.' },
];

const perspective = [
  ['Older adults', 'Familiarity, dignity and the confidence to connect without learning an unfamiliar interface.'],
  ['Families', 'Reassurance, greater understanding and better timing for meaningful involvement.'],
  ['Providers', 'Resident insight that can strengthen personalised support, engagement and family value.'],
  ['Councils', 'Privacy-safe community intelligence and measurable progress toward participation and connection.'],
];

export function FounderCompanySection() {
  return <>
    <header>
      <h1 className="text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Founder & company</h1>
    </header>

    <section className="mt-10 grid overflow-hidden rounded-3xl border border-stone-200 bg-white lg:grid-cols-[1.02fr_.98fr]">
      <figure className="flex flex-col bg-[#f4f0f8]">
        <img src="/internal-app/micaela-founder-community.jpg" alt="Tellie founder Micaela Piacenza presenting Tellie at a community event" className="aspect-[1.08/1] h-full min-h-[440px] w-full object-cover object-center" />
        <figcaption className="px-6 py-4 text-xs leading-5 text-stone-600">Micaela introducing Tellie and inviting the community to explore what meaningful connection looks like.</figcaption>
      </figure>
      <div className="p-7 sm:p-10 lg:p-12">
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">Micaela Piacenza · Founder & software engineer</p>
        <h2 className="balanced mt-4 text-3xl font-semibold tracking-[-.04em]">Tellie began with a truth she understood personally.</h2>
        <div className="mt-6 space-y-4 text-sm leading-7 text-stone-600">
          <p>Migrating to Australia gave Micaela a firsthand understanding of distance, loneliness and the tension between building a life and wanting to be present for the people you love.</p>
          <p>Her close relationship with her grandparents also showed her how ageing, the loss of friends and family, and changing family dynamics can gradually narrow a person’s world—and how much guilt distance can create for those who care.</p>
          <p>She turned that insight into Tellie: technology designed to meet older adults where they are, using an interaction they already know and trust—a phone call.</p>
        </div>
        <div className="mt-7 rounded-2xl bg-[#eef8f7] p-5"><p className="text-sm font-semibold text-[#075e5b]">Founder thesis</p><p className="mt-2 text-sm leading-6 text-stone-600">When technology excludes the people it is meant to help, the technology has failed—not the person.</p></div>
      </div>
    </section>

    <section className="mt-14">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Founder–market fit</p>
      <h2 className="balanced mt-3 max-w-3xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Understanding the person—and the ecosystem around them.</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">Tellie reflects both lived experience and sustained learning from users, families, residential providers, councils and prospective partners.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{perspective.map(([title, body], index) => <article key={title} className={`rounded-3xl border p-6 ${index === 0 ? 'border-[#b9deda] bg-[#eef8f7]' : index === 1 ? 'border-[#eadbc9] bg-[#fff8f0]' : index === 2 ? 'border-[#ded5ec] bg-[#f7f3fb]' : 'border-[#cddfeb] bg-[#f0f7fb]'}`}><h3 className="font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{body}</p></article>)}</div>
    </section>

    <section className="mt-14 rounded-3xl border border-stone-200 bg-white p-7 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Evidence of execution</p>
      <h2 className="balanced mt-3 max-w-3xl text-3xl font-semibold tracking-[-.04em]">Building the product—and the conditions for a company to grow.</h2>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl bg-[#eef8f7] p-7"><Rocket className="h-5 w-5 text-[#007f7a]" /><h3 className="mt-4 text-xl font-semibold">Technical execution</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-stone-600"><li>Operational iOS and Android product</li><li>Multilingual voice and text conversations</li><li>Residential and council intelligence portals</li><li>Family Connect experience and institutional pilot structures</li><li>Continued capital-efficient development before institutional funding</li></ul></article>
        <article className="rounded-3xl bg-[#f7f3fb] p-7"><Network className="h-5 w-5 text-[#65558a]" /><h3 className="mt-4 text-xl font-semibold">Commercial momentum</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-stone-600"><li>Initiated opportunities with residential providers and councils</li><li>Built relationships with prospective investors and board contributors</li><li>Engaged expertise across Australian compliance, data, finance and technology</li><li>Created a professional network in a new country without inherited industry connections</li><li>Preparing the building blocks to recruit effectively when funding is secured</li></ul></article>
      </div>
    </section>

    <section className="mt-10 grid gap-4 md:grid-cols-3">
      <article className="rounded-3xl border border-stone-200 bg-white p-7"><GraduationCap className="h-5 w-5 text-[#007f7a]" /><h2 className="mt-4 text-lg font-semibold">Technical foundation</h2><p className="mt-3 text-sm leading-6 text-stone-600">Software engineer and 2023 Griffith University graduate, informed by human–computer interaction and the belief that useful technology must reduce friction.</p></article>
      <article className="rounded-3xl border border-stone-200 bg-white p-7"><HandHeart className="h-5 w-5 text-[#007f7a]" /><h2 className="mt-4 text-lg font-semibold">Service orientation</h2><p className="mt-3 text-sm leading-6 text-stone-600">Community service includes volunteering in the Dominican Republic in 2024 and ongoing volunteering in support of older people.</p></article>
      <article className="rounded-3xl border border-stone-200 bg-white p-7"><Users className="h-5 w-5 text-[#007f7a]" /><h2 className="mt-4 text-lg font-semibold">Team leadership</h2><p className="mt-3 text-sm leading-6 text-stone-600">A lifelong field-hockey player and multiple-time captain, Micaela brings resilience, shared accountability and experience leading while remaining part of the team.</p></article>
    </section>

    <section className="mt-14">
      <h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">What guides Tellie</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-3">{[
        { icon: Heart, label: 'Mission', title: 'End loneliness in later life', body: 'Help every older adult feel heard, valued and meaningfully connected.' },
        { icon: Compass, label: 'Vision', title: 'Connection on familiar terms', body: 'A world where older adults stay connected with loved ones and their community with dignity—through inclusive technology that meets them where they are.' },
        { icon: Users, label: 'Values', title: 'Empathy · Simplicity · Dignity', body: 'Warmth, clarity, independence and respect guide every company and product decision.' },
      ].map(({ icon: Icon, label, title, body }) => <article key={label} className="rounded-3xl border border-stone-200 bg-white p-7"><Icon className="h-5 w-5 text-[#007f7a]" /><p className="mt-5 text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">{label}</p><h3 className="mt-2 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{body}</p></article>)}</div>
    </section>

    <section className="mt-14">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Where Tellie is going</p>
      <h2 className="balanced mt-3 max-w-3xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Connection begins with a conversation—and grows into better support.</h2>
      <div className="mt-7 grid gap-4 lg:grid-cols-3">{direction.map((item, index) => <article key={item.label} className={`rounded-3xl border p-7 ${index === 0 ? 'border-[#b9deda] bg-[#eef8f7]' : index === 1 ? 'border-[#ded5ec] bg-[#f7f3fb]' : 'border-[#eadbc9] bg-[#fff8f0]'}`}><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#007f7a]">{item.label}</p><h3 className="mt-3 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{item.body}</p></article>)}</div>
    </section>

    <section className="mt-10 grid gap-4 md:grid-cols-2">
      <article className="rounded-3xl border border-stone-200 bg-white p-7 sm:p-8"><Building2 className="h-5 w-5 text-[#007f7a]" /><h2 className="mt-4 text-xl font-semibold">The company today</h2><p className="mt-3 text-sm leading-6 text-stone-600">Tech For Good Group Pty Ltd trades as Tellie. ABN 47 700 660 064 · ACN 700 660 064. Australia is the launch market, with an operational product and institutional validation underway.</p></article>
      <article className="rounded-3xl border border-stone-200 bg-white p-7 sm:p-8"><Lightbulb className="h-5 w-5 text-[#007f7a]" /><h2 className="mt-4 text-xl font-semibold">The team being built</h2><p className="mt-3 text-sm leading-6 text-stone-600">Micaela currently brings product, engineering and strategy together. Funding enables focused capability in pilot delivery, senior engineering, evaluation, privacy, marketing, customer success and institutional partnerships.</p></article>
    </section>

  </>;
}
