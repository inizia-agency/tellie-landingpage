import { Building2, HeartHandshake, Landmark, ShieldCheck, TrendingUp } from 'lucide-react';
import { FaqSearch } from './portal-controls';

const groups = [
  {
    id: 'faq-providers',
    title: 'Residential providers',
    prompt: 'Value, implementation and facility-wide rollout',
    icon: Building2,
    style: 'bg-[#eef8f7] text-[#075e5b]',
    questions: [
      ['Why would a residential provider introduce Tellie?', 'Tellie gives residents familiar, on-demand conversation while helping authorised staff understand interests, routines, changes and connection needs that may otherwise be missed. The aim is better-timed human support—not more technology for residents to learn.'],
      ['What would our staff receive?', 'The residential dashboard organises permissioned, conversation-informed insight into useful resident and facility views. It can surface interests, engagement patterns and changes that help staff personalise activities and support. The dashboard is developed and requires configuration and activation for each provider.'],
      ['Will staff be able to read residents’ conversations?', 'No. Full conversation transcripts are not intended for dashboard use. Tellie extracts relevant, permissioned information through its memory framework and presents it according to the user’s consent and the viewer’s role. Retention and access rules are agreed before deployment.'],
      ['How much work is required from the provider during a pilot?', 'A pilot needs a suitable resident cohort, a named internal lead, support with approvals and recruitment, and participation in onboarding and evaluation. Tellie provides product configuration, staff briefing, participant onboarding support, measurement and outcome reporting.'],
      ['How will a residential pilot be measured?', 'Measures include activation, meaningful conversation, frequency, duration, repeat use, retention, usability and movement across the loneliness spectrum. Provider measures also cover insight usefulness, staff workflow fit, support burden and examples of insight leading to appropriate human action.'],
      ['How does Tellie scale after a successful pilot?', 'The first expansion is from the pilot cohort to all suitable residents within the facility. For providers with multiple locations, the next step is a repeatable site-by-site rollout using agreed onboarding, governance, support and reporting standards.'],
      ['What is the proposed residential commercial model?', 'The working model combines monthly access per licensed resident, a facility dashboard fee, optional Family Connect activations and implementation. Current planning assumptions are A$45 per licensed resident, A$400 per facility dashboard and A$25 per activated family each month; these are hypotheses to validate with providers, not published pricing.'],
      ['Will residents have a conversation limit?', 'Tellie is designed to encourage meaningful conversation, not show residents a countdown. The financial model pools usage across the facility so some residents can talk more while commercial planning follows the average active resident.'],
    ],
  },
  {
    id: 'faq-councils',
    title: 'Councils & communities',
    prompt: 'Participation, public value and community intelligence',
    icon: Landmark,
    style: 'bg-[#f0f7fb] text-[#426b83]',
    questions: [
      ['What problem can Tellie help a council address?', 'Tellie is designed to reduce loneliness and promote connection among older residents. It combines accessible conversation with proactive community activity suggestions, then helps the council understand whether people are becoming more connected to local life.'],
      ['What outcomes would a council pilot measure?', 'The shared outcome is movement across the loneliness spectrum. Council measures also include activity interest, recommendations made, attendance, repeat participation, perceived connection and whether Tellie helped a participant leave home and engage with the community.'],
      ['Can Tellie explain why someone did not attend an activity?', 'Tellie can capture conversation-informed barriers such as transport, accessibility, timing, confidence or lack of awareness. Aggregated insight can help councils see where the city and its services influence participation, without exposing private conversations.'],
      ['What does the council dashboard provide?', 'The developed dashboard is designed to show privacy-safe community patterns: loneliness and connection signals, event interest and attendance, feedback, neighbourhood trends and participation barriers. Each deployment requires council-specific activation and configuration.'],
      ['How would residents access a council program?', 'The program can be council branded and offered free, at cost or at an affordable community price to participating older residents. The council sponsors the program and receives agreed, privacy-safe program intelligence and outcome reporting.'],
      ['How is the council model priced?', 'Council programs are scoped around the participant cohort, geography, implementation, reporting requirements and program term. The appropriate commercial structure would be developed with the council rather than presented as a fixed public rate.'],
      ['Is Family Connect included in the council model?', 'No. Family Connect is planned as an optional residential-provider feature. A council deployment focuses on the older resident, community participation and aggregated place-based insight.'],
    ],
  },
  {
    id: 'faq-investors',
    title: 'Investors',
    prompt: 'Stage, economics, defensibility and the ask',
    icon: TrendingUp,
    style: 'bg-[#f7f3fb] text-[#65558a]',
    questions: [
      ['What stage is Tellie at today?', 'Tellie has an operational iOS and Android product with early production use. The residential and council intelligence dashboards are developed and require partner activation; Family Connect and pilot reporting are in development. Tellie remains pre-revenue and is now seeking structured commercial validation.'],
      ['What traction exists?', 'From 7 May to 31 August 2026, Tellie recorded 29 registered production users, 22 conversation-active users and 601 conversation messages across voice and typed chat. Commercial activity includes pilot conversations with two residential providers, one council pathway and two senior-community organisations, plus participation in two seniors expos. These opportunities are not represented as signed pilots or revenue.'],
      ['What is Tellie asking for now?', 'The immediate ask is a residential validation partner or an aligned sponsor that can fund a structured provider deployment. The objective is to validate resident use, permissioned insight, operational delivery and provider value before raising to scale.'],
      ['Why is Tellie not raising its full round now?', 'The current evidence gate is more valuable than premature scale. A residential validation can replace key assumptions with measured adoption, retention, delivery cost, dashboard usefulness and willingness to progress to a commercial rollout.'],
      ['What happens after successful validation?', 'Tellie intends to pursue a post-validation pre-seed raise for 12 months of commercial launch and go-to-market execution. The current gross planning requirement is approximately A$565,000 before revenue, grants, credits or other funding, and will be revised using validation evidence.'],
      ['How does Tellie make money?', 'The primary route is provider-led B2B2C revenue: recurring resident access, facility intelligence and optional Family Connect. Councils provide a parallel B2G route through sponsored, council-branded community programs. Direct-to-consumer expansion is deliberately later so it does not undermine the provider proposition.'],
      ['What do the current unit economics indicate?', 'The base case models a 200-resident facility, 70% activation, eight monthly conversation hours per active resident and 35% Family Connect adoption. Under the current price and direct-cost assumptions, the model indicates approximately 67% gross margin before fixed company costs. It is a commercial hypothesis to validate, not a forecast.'],
      ['What makes Tellie defensible?', 'Tellie’s advantage is the combination of senior-first familiarity, longitudinal conversation context, permissioned insight and a connected resident–provider–family model. Institutional distribution, implementation learning and an evidence base can deepen that advantage; the defensibility is not the underlying AI model alone.'],
      ['Who is building the company?', 'Founder Micaela Piacenza is a Griffith University software engineering graduate who has built the product and developed relationships across residential care, councils, community, compliance, data, finance, technology, investment and governance. Post-validation funding is designed to add B2B sales, marketing, engineering and specialist support while she retains product and growth direction.'],
    ],
  },
  {
    id: 'faq-product',
    title: 'Product & families',
    prompt: 'The resident experience, family value and boundaries',
    icon: HeartHandshake,
    style: 'bg-[#fff8f0] text-[#9a5b25]',
    questions: [
      ['What is Tellie?', 'Tellie is an AI companion designed to help older adults feel heard and help the people around them provide better support. It is built around a familiar behaviour—answering a phone call and talking—so the technology meets the older adult where they are.'],
      ['What can an older adult do with Tellie today?', 'Current capabilities include real-time voice and text conversation, 10+ language configuration, memory and personalisation, calendars and reminders, cognitive memory games, light web search, community activity discovery, accessibility settings and configurable support-contact alerts.'],
      ['Is the telephone hardware the product?', 'No. Tellie works today as a mobile experience. The working telephone prototype demonstrates the same design thesis in a more familiar physical form: lift the handset, speak naturally and hang up as usual.'],
      ['How will Family Connect work?', 'Family members will use a separate authenticated experience within Tellie to see permissioned updates such as overall mood, recent interests, current stressors and when connection may be especially valuable. It is intended to help families connect at the right moment, not monitor every conversation.'],
      ['Who can offer Family Connect?', 'Family Connect is planned as an optional residential-provider feature. A provider may include it as a service benefit or offer it as a premium family experience; it is not part of the council model.'],
      ['Does Tellie replace family, staff or community connection?', 'No. Tellie provides conversation when people cannot always be present and uses relevant insight to encourage better-timed human connection. It is designed to strengthen the support circle, not replace it.'],
      ['Is Tellie a healthcare product?', 'Tellie is currently a conversational entertainment and digital-engagement app. It does not diagnose, treat, provide clinical judgement, monitor health or replace emergency services. Future health or wearable integrations would add permissioned context without changing that boundary.'],
    ],
  },
  {
    id: 'faq-privacy',
    title: 'Privacy, safety & governance',
    prompt: 'Consent, access, data handling and responsible boundaries',
    icon: ShieldCheck,
    style: 'bg-[#f2f5f3] text-[#48605d]',
    questions: [
      ['What information does Tellie collect?', 'Tellie uses information needed to operate the account and conversation, learn preferences, provide agreed features and support evaluation. Institutional insight is limited to relevant, permissioned information for the authorised audience. A deployment-specific data map is agreed before activation.'],
      ['Does Tellie store full conversations for providers, councils or families?', 'Full conversation transcripts are not intended to become the institutional record or appear in stakeholder dashboards. Tellie’s design extracts and stores relevant, permissioned memories and signals through its memory framework. Final transcript handling and retention rules are confirmed before scaled delivery.'],
      ['How is consent managed?', 'The participant must understand what Tellie does, what information may be used and who can see each type of insight. Consent, role-based access and withdrawal pathways are configured for the deployment and documented before participants begin.'],
      ['Can a participant access or delete their information?', 'Tellie’s intended operating model includes access, correction, withdrawal and deletion pathways. The exact procedure, retention schedule and responsible contact are documented with the partner before scaled delivery.'],
      ['What happens if Tellie detects distress or concern?', 'Tellie can use configured support-contact alerts and agreed escalation rules, but it remains non-clinical and is not an emergency response service. Pilot preparation defines appropriate resources, responsibilities and incident procedures for the setting.'],
      ['Where is data processed and who are the technology providers?', 'Approved processing locations, service providers and data flows form part of the partner diligence pack before activation. Tellie will document the arrangement rather than ask a partner to rely on an assumption.'],
      ['How does Tellie avoid becoming surveillance?', 'Insight is purpose-limited, permissioned and tailored to the recipient. Providers, councils and families receive the minimum relevant view for their role—not unrestricted access to a person’s private conversations.'],
    ],
  },
] as const;

export function FaqSection() {
  return <>
    <header className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">Frequently asked questions</p>
      <h1 className="balanced mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">The answers you need to move forward with confidence.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">Start with your role or search across product, partnership, investment, implementation, privacy and safety.</p>
    </header>

    <div aria-label="FAQ audiences" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {groups.map(({ id, title, prompt, icon: Icon, style }) => <article key={id} className={`rounded-2xl p-5 ${style}`}><Icon className="h-5 w-5" /><span className="mt-4 block text-sm font-semibold text-stone-900">{title}</span><span className="mt-1 block text-xs leading-5 text-stone-600">{prompt}</span></article>)}
    </div>

    <div className="mt-9 max-w-2xl"><FaqSearch /></div>

    <div className="mt-12 grid gap-x-12 lg:grid-cols-2 lg:items-start">
      {groups.map(({ id, title, prompt, icon: Icon, style, questions }) => <section id={id} data-faq-group key={id} className="mb-12 scroll-mt-28">
        <div className="flex items-center gap-4 border-b border-stone-200 pb-5"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${style}`}><Icon className="h-5 w-5" /></span><div><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 text-xs text-stone-500">{prompt}</p></div></div>
        {questions.map(([question, answer]) => <details data-faq key={question} className="group border-b border-stone-200"><summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 text-sm font-semibold"><span>{question}</span><span aria-hidden="true" className="text-xl font-light text-stone-500 transition group-open:rotate-45">+</span></summary><p className="pb-5 pr-8 text-sm leading-6 text-stone-600">{answer}</p></details>)}
      </section>)}
    </div>

    <div className="rounded-3xl bg-[#eaf5f4] p-7 sm:flex sm:items-center sm:justify-between sm:gap-8"><div><h2 className="text-xl font-semibold">A question specific to your organisation?</h2><p className="mt-2 text-sm leading-6 text-stone-600">Tell us what you need to assess and we’ll answer it directly.</p></div><a href="mailto:hello@tellie.com.au?subject=Tellie%20portal%20question" className="focus-ring mt-5 inline-block shrink-0 rounded-xl bg-[#007f7a] px-5 py-3 text-sm font-semibold text-white sm:mt-0">Ask Tellie</a></div>
  </>;
}
