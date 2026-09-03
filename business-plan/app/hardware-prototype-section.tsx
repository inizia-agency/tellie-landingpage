import { MessageCircle, PhoneCall, PhoneOff, Sparkles } from 'lucide-react';

const steps = [
  { icon: PhoneCall, title: 'Lift the handset', body: 'Begin in the same familiar way as making a call.' },
  { icon: Sparkles, title: 'Tellie answers', body: 'No menus, passwords or touchscreen navigation.' },
  { icon: MessageCircle, title: 'Talk naturally', body: 'Conversation remains the experience—not the technology.' },
  { icon: PhoneOff, title: 'Hang up', body: 'Finish the conversation exactly as expected.' },
];

export function HardwarePrototypeSection() {
  return <section className="mt-16">
    <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
      <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Hardware prototype</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">A familiar phone. A new kind of connection.</h2></div>
      <p className="text-sm leading-7 text-stone-600">Tellie’s hardware prototype transforms a familiar home telephone into a direct line to companionship. Lift the handset, speak naturally and finish the conversation exactly as you would with any other call.</p>
    </div>

    <div className="mt-8 grid overflow-hidden rounded-[28px] border border-stone-200 bg-white lg:grid-cols-[1.12fr_.88fr]">
      <figure className="relative min-h-[540px] bg-[#f4f0f8]"><img src="/internal-app/hardware-prototype-seniors-expo.jpg" alt="Tellie’s working telephone prototype displayed at Seniors Expo Australia" className="absolute inset-0 h-full w-full object-cover object-center" /><figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-4 py-3 text-xs leading-5 text-stone-600 shadow-sm backdrop-blur">The working prototype presented alongside Tellie at Seniors Expo Australia.</figcaption></figure>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <span className="w-fit rounded-full bg-[#eee8f6] px-3 py-1.5 text-xs font-semibold text-[#65558a]">Working prototype · Not yet a commercial device</span>
        <h3 className="mt-6 text-2xl font-semibold tracking-[-.03em]">Meet older adults where they are technologically.</h3>
        <p className="mt-4 text-sm leading-7 text-stone-600">The prototype is built around something this generation already understands and can use confidently. Its purpose is not to introduce more technology into an older adult’s life, but to make Tellie available through a familiar behaviour: making a phone call.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">{[
          ['Familiar', 'An interaction learned over a lifetime.'],
          ['Low effort', 'No apps, menus or new gestures.'],
          ['Conversation-first', 'The technology recedes into the background.'],
        ].map(([title, body]) => <div key={title} className="rounded-2xl bg-[#eef8f7] p-4"><p className="text-sm font-semibold text-[#075e5b]">{title}</p><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></div>)}</div>
      </div>
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{steps.map(({ icon: Icon, title, body }, index) => <article key={title} className="relative rounded-2xl border border-stone-200 bg-white p-5"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#007f7a]" /><span className="text-xs font-semibold text-stone-400">0{index + 1}</span></div><h3 className="mt-4 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{body}</p></article>)}</div>

    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {[
        ['/internal-app/hardware-prototype-assembled.jpg', 'The assembled prototype', 'A familiar large-button telephone provides the physical interface.'],
        ['/internal-app/hardware-prototype-development.jpg', 'Built, tested and iterated', 'Internal hardware and software integration during development.'],
        ['/internal-app/hardware-prototype-community.jpg', 'Taken into the community', 'The prototype presented as part of the wider Tellie experience.'],
      ].map(([src, title, caption]) => <figure key={src} className="overflow-hidden rounded-3xl border border-stone-200 bg-white"><img src={src} alt={title} className="aspect-[4/3] w-full object-cover" /><figcaption className="p-5"><p className="text-sm font-semibold">{title}</p><p className="mt-2 text-xs leading-5 text-stone-600">{caption}</p></figcaption></figure>)}
    </div>

    <div className="mt-5 rounded-2xl bg-[#fff8f0] p-5 sm:flex sm:items-center sm:justify-between sm:gap-8"><p className="text-sm font-semibold">What the prototype proves</p><p className="mt-2 max-w-4xl text-xs leading-6 text-stone-600 sm:mt-0">Tellie can extend beyond the smartphone and become accessible to people with lower digital confidence. Further user testing, safety review and commercial analysis will determine its path to production.</p></div>
  </section>;
}
