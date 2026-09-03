import { NextResponse } from 'next/server';
import { makeSessionToken, portalPasswordMatches, SESSION_COOKIE } from '@/lib/auth';
import { CONFIDENTIALITY_VERSION } from '@/lib/constants';

const attempts = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const fetchSite = request.headers.get('sec-fetch-site');
  if (!contentType.startsWith('application/json') || (fetchSite && !['same-origin', 'none'].includes(fetchSite))) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const ip = request.headers.get('cf-connecting-ip') ?? 'local';
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.reset > now && current.count >= 8) {
    return NextResponse.json({ error: 'Too many attempts. Please wait and try again.' }, { status: 429 });
  }

  let payload: { password?: unknown; accepted?: unknown; version?: unknown };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (payload.accepted !== true || payload.version !== CONFIDENTIALITY_VERSION) {
    return NextResponse.json({ error: 'Please accept the confidentiality terms.' }, { status: 400 });
  }
  if (typeof payload.password !== 'string' || payload.password.length < 8 || payload.password.length > 256) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  if (!(await portalPasswordMatches(payload.password))) {
    attempts.set(ip, { count: current?.reset && current.reset > now ? current.count + 1 : 1, reset: now + 10 * 60 * 1000 });
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  attempts.delete(ip);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await makeSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
