import { createHmac, timingSafeEqual } from 'crypto'
import type { NextApiRequest } from 'next'

export const ADMIN_SESSION_COOKIE = 'refut_admin_session'
const SESSION_MS = 24 * 60 * 60 * 1000

export function isAdminPanelEnabled(): boolean {
  return process.env.ADMIN_PANEL_ENABLED === 'true' && Boolean(process.env.ADMIN_API_SECRET)
}

function signPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex')
}

export function createAdminSessionToken(): string {
  const secret = process.env.ADMIN_API_SECRET
  if (!secret) throw new Error('ADMIN_API_SECRET not configured')

  const exp = String(Date.now() + SESSION_MS)
  const sig = signPayload(exp, secret)
  return `${exp}.${sig}`
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  const secret = process.env.ADMIN_API_SECRET
  if (!secret || !token) return false

  const [exp, sig] = token.split('.')
  if (!exp || !sig) return false

  const expMs = Number(exp)
  if (!Number.isFinite(expMs) || Date.now() > expMs) return false

  const expected = signPayload(exp, secret)
  try {
    return timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expected, 'utf8'))
  } catch {
    return false
  }
}

export function verifyAdminPassword(password: string): boolean {
  const secret = process.env.ADMIN_API_SECRET
  if (!secret) return false
  if (password.length !== secret.length) return false
  try {
    return timingSafeEqual(Buffer.from(password, 'utf8'), Buffer.from(secret, 'utf8'))
  } catch {
    return false
  }
}

export function getAdminSessionFromRequest(req: NextApiRequest): string | undefined {
  const cookie = req.headers.cookie
  if (!cookie) return undefined
  const match = cookie.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))
  return match?.[1]
}

export function adminSessionCookieHeader(token: string): string {
  return `${ADMIN_SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.floor(SESSION_MS / 1000)}`
}

export function clearAdminSessionCookieHeader(): string {
  return `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
}
