import { createHash } from 'crypto'
import type { NextRequest, NextResponse } from 'next/server'

export const STAGING_COOKIE = 'refut_staging_access'

export const STAGING_PUBLIC_PATHS = ['/staging-access', '/api/staging-auth']

export function isStagingDeploy(): boolean {
  return process.env.NEXT_PUBLIC_DEPLOY_ENV === 'staging'
}

export function getStagingSecret(): string | undefined {
  return process.env.STAGING_ACCESS_SECRET
}

export function getStagingCookieValue(secret: string): string {
  return createHash('sha256').update(`refut-staging:${secret}`).digest('hex')
}

export function isStagingPublicPath(pathname: string): boolean {
  return STAGING_PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

export function isStagingConfigured(): boolean {
  return !isStagingDeploy() || Boolean(getStagingSecret())
}

export function isStagingAuthorized(req: NextRequest): boolean {
  if (!isStagingDeploy()) return true

  const secret = getStagingSecret()
  if (!secret) return false

  const vercelBypass = req.headers.get('x-vercel-protection-bypass')
  const automationSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  if (vercelBypass && automationSecret && vercelBypass === automationSecret) {
    return true
  }

  const expectedCookie = getStagingCookieValue(secret)
  if (req.cookies.get(STAGING_COOKIE)?.value === expectedCookie) return true
  if (req.nextUrl.searchParams.get('access') === secret) return true

  return false
}

export function applyStagingAccessCookie(req: NextRequest, res: NextResponse): NextResponse {
  const secret = getStagingSecret()
  if (!secret) return res
  if (req.nextUrl.searchParams.get('access') !== secret) return res

  res.cookies.set(STAGING_COOKIE, getStagingCookieValue(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 14,
    path: '/',
  })
  return res
}

export function withStagingHeaders(res: NextResponse): NextResponse {
  if (isStagingDeploy()) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  }
  return res
}
