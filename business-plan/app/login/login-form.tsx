'use client';

import { useRef, useState } from 'react';
import { Eye, EyeOff, LockKeyhole, X } from 'lucide-react';
import { CONFIDENTIALITY_VERSION } from '@/lib/constants';

export function LoginForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    if (!accepted) { setError('Please accept the confidentiality terms.'); return; }
    setBusy(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, accepted, version: CONFIDENTIALITY_VERSION }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) { setError(data.error ?? 'Access could not be verified.'); return; }
      window.location.assign('/');
    } catch {
      setError('Access could not be verified. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form onSubmit={submit} className="mt-9 space-y-5" noValidate>
        <div>
          <label htmlFor="portal-password" className="mb-2 block text-sm font-medium">Portal password</label>
          <div className="relative">
            <LockKeyhole aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            <input id="portal-password" type={visible ? 'text' : 'password'} value={password} maxLength={256} minLength={8} autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} className="focus-ring h-13 w-full rounded-xl border border-stone-300 bg-white py-3 pl-11 pr-12 text-base" required />
            <button type="button" onClick={() => setVisible((value) => !value)} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} className="focus-ring absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-stone-600 hover:bg-stone-100">
              {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <label className="flex items-start gap-3 text-sm leading-6 text-stone-600">
          <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-[#007f7a]" />
          <span>I have read and agree to the <button type="button" onClick={() => dialog.current?.showModal()} className="focus-ring font-semibold text-[#075e5b] underline underline-offset-4">Confidentiality Terms</button>.</span>
        </label>
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="focus-ring w-full rounded-xl bg-[#9f63b4] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#865097] disabled:cursor-wait disabled:opacity-60">{busy ? 'Verifying…' : 'Enter private portal'}</button>
      </form>

      <dialog ref={dialog} className="m-auto w-[min(620px,calc(100%-32px))] rounded-3xl border border-stone-200 p-0 shadow-2xl backdrop:bg-black/35">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#007f7a]">Private access</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.03em]">Confidentiality terms</h2></div>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close confidentiality terms" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-stone-200 hover:bg-stone-50"><X className="h-4 w-4" /></button>
          </div>
          <div className="mt-6 space-y-4 text-sm leading-6 text-stone-600">
            <p>This portal contains confidential and proprietary information belonging to Tech For Good Group Pty Ltd, trading as Tellie.</p>
            <p>By continuing, you agree to use the information only to evaluate a potential investment, pilot, partnership, research collaboration or other relationship with Tellie. You must not copy, distribute, disclose, publish or use the information for another purpose without Tellie’s prior written permission.</p>
            <p>You may share information only with professional advisers who need it for the same evaluation and who are bound by confidentiality. Access does not grant any licence or right in Tellie’s intellectual property. Tellie may request deletion or return of confidential material.</p>
            <p className="rounded-xl bg-stone-50 p-4 text-xs">These portal terms support preliminary evaluation and do not replace a separately executed NDA where one is required. Final terms remain subject to legal review. Version {CONFIDENTIALITY_VERSION}.</p>
          </div>
          <button type="button" onClick={() => { setAccepted(true); dialog.current?.close(); }} className="focus-ring mt-7 w-full rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white">Accept and continue</button>
        </div>
      </dialog>
    </>
  );
}
