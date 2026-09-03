import { redirect } from 'next/navigation';
import { hasPortalSession } from '@/lib/auth';
import { LoginForm } from './login-form';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await hasPortalSession()) redirect('/');
  return (
    <main className="min-h-screen bg-[#f7f7f5] p-4 sm:p-8 lg:grid lg:place-items-center lg:p-12">
      <section className="portal-shadow mx-auto grid min-h-[680px] max-w-6xl overflow-hidden rounded-[28px] border border-stone-200 bg-white lg:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col justify-between p-7 sm:p-12">
          <a href="https://tellie.com.au" aria-label="Tellie home" className="focus-ring w-fit"><img src="/tellie-wordmark.jpg" alt="Tellie" className="h-16 w-auto" /></a>
          <div className="py-14">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#007f7a]">Private stakeholder portal</p>
            <h1 className="balanced mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Welcome to Tellie.</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-stone-600">Explore Tellie’s product, opportunity, pilots, evidence and long-term vision.</p>
            <LoginForm />
          </div>
          <p className="text-xs leading-5 text-stone-500">Confidential · Authorised recipients only · Sessions expire after eight hours</p>
        </div>
        <div className="relative hidden bg-[#dceae8] lg:block">
          <img src="/overview-community-connection.jpg" alt="Tellie founder Micaela Piacenza speaking with an older adult at Seniors Expo Australia" className="absolute inset-0 h-full w-full object-cover object-center" />
        </div>
      </section>
    </main>
  );
}
