import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  isAdminPanelEnabled,
  verifyAdminSessionToken,
} from './lib/adminAuthServer'
import {
  applyStagingAccessCookie,
  isStagingAuthorized,
  isStagingConfigured,
  isStagingDeploy,
  isStagingPublicPath,
  withStagingHeaders,
} from './lib/stagingAccess'

const ADMIN_PATH_PREFIXES = ['/admin', '/admin-login', '/check-registrations', '/api/admin']

function isAdminPath(pathname: string): boolean {
  return ADMIN_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function hasValidAdminSession(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value
  return verifyAdminSessionToken(token)
}

function blockAdmin(req: NextRequest): NextResponse | null {
  if (!isAdminPath(req.nextUrl.pathname)) return null

  if (!isAdminPanelEnabled()) {
    return withStagingHeaders(new NextResponse(null, { status: 404 }))
  }

  const { pathname } = req.nextUrl
  const isLoginPath = pathname === '/admin-login' || pathname === '/api/admin/session'

  if (isLoginPath) return null

  if (!hasValidAdminSession(req)) {
    if (pathname.startsWith('/api/admin')) {
      return withStagingHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
    }
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin-login'
    loginUrl.search = ''
    return withStagingHeaders(NextResponse.redirect(loginUrl))
  }

  return null
}

export function middleware(req: NextRequest) {
  const adminBlock = blockAdmin(req)
  if (adminBlock) return adminBlock

  if (!isStagingDeploy()) {
    return NextResponse.next()
  }

  if (!isStagingConfigured()) {
    return withStagingHeaders(
      new NextResponse('Staging misconfigured: set STAGING_ACCESS_SECRET', { status: 503 })
    )
  }

  const { pathname } = req.nextUrl

  if (isStagingPublicPath(pathname)) {
    return withStagingHeaders(NextResponse.next())
  }

  if (!isStagingAuthorized(req)) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/staging-access'
    loginUrl.searchParams.set('next', pathname)
    return withStagingHeaders(NextResponse.redirect(loginUrl))
  }

  let res = NextResponse.next()
  res = applyStagingAccessCookie(req, res)
  return withStagingHeaders(res)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
