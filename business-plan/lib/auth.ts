import { cookies } from 'next/headers';
import { CONFIDENTIALITY_VERSION } from './constants';

export const SESSION_COOKIE = 'tellie_portal_session';
const SESSION_SECONDS = 60 * 60 * 8;

type PortalSession = {
  accepted: string;
  exp: number;
  iat: number;
};

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function secret() {
  const configured = process.env.PORTAL_SESSION_SECRET;
  if (configured && configured.length >= 32) return configured;
  if (process.env.NODE_ENV !== 'production') return 'tellie-local-session-secret-change-before-production';
  throw new Error('PORTAL_SESSION_SECRET must contain at least 32 characters.');
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return bytesToBase64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))));
}

export async function makeSessionToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: PortalSession = { accepted: CONFIDENTIALITY_VERSION, iat: now, exp: now + SESSION_SECONDS };
  const encoded = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  return `${encoded}.${await sign(encoded)}`;
}

export async function verifySessionToken(token?: string): Promise<boolean> {
  if (!token || token.length > 2048) return false;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return false;
  try {
    const expected = await sign(payload);
    const left = new TextEncoder().encode(signature);
    const right = new TextEncoder().encode(expected);
    if (left.length !== right.length) return false;
    let mismatch = 0;
    for (let index = 0; index < left.length; index += 1) mismatch |= left[index] ^ right[index];
    if (mismatch !== 0) return false;
    const session = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as PortalSession;
    return session.accepted === CONFIDENTIALITY_VERSION && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function hasPortalSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function portalPasswordMatches(candidate: string) {
  if (!candidate || candidate.length > 256) return false;
  const configuredHash = process.env.PORTAL_PASSWORD_SHA256?.toLowerCase();
  const expected = process.env.PORTAL_PASSWORD;
  const local = process.env.NODE_ENV !== 'production' ? 'TelliePreview2026!' : undefined;
  const target = expected ?? local;
  const digest = async (value: string) => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  const left = await digest(candidate);
  const candidateHash = Array.from(left, (byte) => byte.toString(16).padStart(2, '0')).join('');
  const expectedHash = configuredHash ?? (target ? Array.from(await digest(target), (byte) => byte.toString(16).padStart(2, '0')).join('') : undefined);
  if (!expectedHash || expectedHash.length !== candidateHash.length) return false;
  let mismatch = 0;
  for (let index = 0; index < candidateHash.length; index += 1) mismatch |= candidateHash.charCodeAt(index) ^ expectedHash.charCodeAt(index);
  return mismatch === 0;
}
