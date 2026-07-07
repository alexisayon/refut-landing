import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  applyStagingAccessCookie,
  isStagingAuthorized,
  isStagingDeploy,
  isStagingPublicPath,
  withStagingHeaders,
} from './lib/stagingAccess'

export function middleware(req: NextRequest) {
  if (!isStagingDeploy()) {
    return NextResponse.next()
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
