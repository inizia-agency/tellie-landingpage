import { redirect } from 'next/navigation';
import { HeartHandshake, Languages, MessageCircle, PhoneCall } from 'lucide-react';
import { hasPortalSession } from '@/lib/auth';
import { DemoButton, PanelLink, PortalControls } from './portal-controls';
import { MarketSection, ProblemSection, ProductSection } from './problem-product-sections';
import { BusinessModelSection } from './business-model-section';
import { CompetitorSection } from './competitor-section';
import { PilotSection } from './pilot-section';
import { TractionSection } from './traction-section';
import { FounderCompanySection } from './founder-company-section';
import { GoToMarketSection } from './go-to-market-section';
import { FinancialSection } from './financial-section';
import { AskSection } from './ask-section';
import { FaqSection } from './faq-section';
import fullBusinessPlanSource from '../content/full-business-plan-source.html?raw';
import councilDashboard from '../content/assets/council-dashboard.png?inline';
import residentialDashboard from '../content/assets/residential-dashboard.png?inline';

export const dynamic = 'force-dynamic';
const businessPlanMatch = fullBusinessPlanSource.match(/<article class="document">([\s\S]*?)<\/article>/i);
const fullBusinessPlan = businessPlanMatch?.[1] ?? '<p>The detailed business plan could not be loaded.</p>';

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  const intentionalMessaging: Record<string, [string, string]> = {
    Traction: ['A working product with real-world use—and a clear path to scale evidence.', 'Tellie is live across iOS and Android, supporting multilingual voice and text conversations. The next phase converts early engagement into verified retention, outcomes and commercial proof.'],
    'Pilots & opportunities': ['Turn a defined cohort into a confident scale decision.', 'A Tellie pilot gives partners a practical, measurable way to strengthen connection, understand engagement and establish the operational case for wider deployment.'],
    'Founder & company': ['Founder-built from lived experience to working product.', 'Tellie combines a personal understanding of loneliness with the technical execution to build technology that adapts to older adults—not the other way around.'],
    'Frequently asked questions': ['The answers you need to move forward with confidence.', 'Explore product, investment, pilot, privacy and implementation questions—or contact Tellie directly about your organisation’s requirements.'],
    'Legacy reference': ['The full Tellie business plan.', 'A complete long-form reference covering the strategy, assumptions and foundations behind the focused case presented throughout this portal.'],
  };
  const [resolvedTitle, resolvedIntro] = intentionalMessaging[eyebrow] ?? [title, intro];
  const resolvedEyebrow = eyebrow === 'Legacy reference' ? 'Detailed reference' : eyebrow;
  return <header className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">{resolvedEyebrow}</p><h1 className="balanced mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">{resolvedTitle}</h1><p className="mt-5 text-lg leading-8 text-stone-600">{resolvedIntro}</p></header>;
}
function Panel({ id, children, hidden = true }: { id: string; children: React.ReactNode; hidden?: boolean }) {
  return <section id={id} hidden={hidden} data-portal-panel className="mx-auto min-h-[calc(100vh-72px)] max-w-[1440px] px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">{children}</section>;
}

export default async function Home() {
  if (!(await hasPortalSession())) redirect('/login');
  return <main className="min-h-screen bg-[#fbfbfa] text-[#222]">
    <PortalControls />
    <Panel id="overview" hidden={false}>
      <section className="portal-shadow grid min-h-[620px] overflow-hidden rounded-[28px] border border-stone-200 bg-white lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-between p-7 sm:p-12 lg:p-16"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">Private stakeholder portal</p><h1 className="balanced mt-5 max-w-2xl text-4xl font-semibold tracking-[-.055em] sm:text-6xl">Connection begins with a conversation.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">Tellie is an AI companion that helps older adults feel heard—and helps the people around them provide better support.</p><div className="mt-9 flex flex-wrap gap-3"><DemoButton /><PanelLink to="pilots">Explore a pilot</PanelLink></div></div><div className="mt-14 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4"><div><PhoneCall className="mb-2 h-5 w-5 text-[#007f7a]" /><b>Voice-first</b></div><div><MessageCircle className="mb-2 h-5 w-5 text-[#007f7a]" /><b>Voice + text</b></div><div><Languages className="mb-2 h-5 w-5 text-[#007f7a]" /><b>10+ languages</b></div><div><HeartHandshake className="mb-2 h-5 w-5 text-[#007f7a]" /><b>Senior-first</b></div></div></div>
        <div className="relative min-h-[430px] bg-[#dceae8] lg:min-h-full"><img src="/overview-community-connection.jpg" alt="Tellie founder Micaela Piacenza speaking with an older adult at Seniors Expo Australia" className="absolute inset-0 h-full w-full object-cover object-center" /></div>
      </section>
      <div className="mt-12 grid gap-5 lg:grid-cols-[.75fr_1.25fr]"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Tellie in one view</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Conversation is the experience. Better connection is the outcome.</h2></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#eaf5f4] p-5"><b>Problem</b><p className="mt-2 text-sm leading-6 text-stone-600">Too many older adults feel lonely, while the people around them cannot always see when connection is missing.</p></div><div className="rounded-2xl bg-[#fff2e9] p-5"><b>Solution</b><p className="mt-2 text-sm leading-6 text-stone-600">A companion that feels like a phone call and turns permissioned conversation into better-timed human support.</p></div><div className="rounded-2xl bg-stone-100 p-5"><b>Commercial opportunity</b><p className="mt-2 text-sm leading-6 text-stone-600">One provider relationship unlocks recurring resident, dashboard and family-app revenue across an entire community.</p></div><div className="rounded-2xl bg-[#f0eef7] p-5"><b>Partner with Tellie</b><p className="mt-2 text-sm leading-6 text-stone-600">Run a measurable pilot, strengthen the evidence base or invest in the platform’s next stage of growth.</p></div></div></div>
    </Panel>

    <Panel id="problem"><ProblemSection /></Panel>

    <Panel id="product"><ProductSection councilSrc={councilDashboard} residentialSrc={residentialDashboard} /></Panel>

    <Panel id="market"><MarketSection /></Panel>

    <Panel id="competitors"><CompetitorSection /></Panel>

    <Panel id="business-model"><BusinessModelSection /></Panel>

    <Panel id="traction"><TractionSection /></Panel>

    <Panel id="marketing"><GoToMarketSection /></Panel>

    <Panel id="pilots"><PilotSection /></Panel>

    <Panel id="financials"><FinancialSection /></Panel>

    <Panel id="ask"><AskSection /></Panel>


    <Panel id="founder"><FounderCompanySection /></Panel>


    <Panel id="faqs"><FaqSection /></Panel>

    <Panel id="business-plan"><SectionHeading eyebrow="Legacy reference" title="Tellie’s full business plan." intro="An archived long-form reference for the small number of readers who want the complete underlying document." /><div className="mt-10 rounded-3xl border border-stone-200 bg-white p-5 sm:p-8 lg:p-12"><article className="business-plan-content" dangerouslySetInnerHTML={{ __html: fullBusinessPlan }} /></div></Panel>
  </main>;
}
