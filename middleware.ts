import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOGIN_PATH = '/dashboard/login'
const DASHBOARD_PATH = '/dashboard'

function isAuthenticated(request: NextRequest): boolean {
  const secret = process.env.DASHBOARD_SESSION_SECRET
  if (!secret) return false
  const token = request.cookies.get('dashboard_session')?.value
  return token === secret
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect dashboard (except login)
  if (pathname.startsWith(DASHBOARD_PATH) && pathname !== LOGIN_PATH) {
    if (!isAuthenticated(request)) {
      const loginUrl = new URL(LOGIN_PATH, request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // Protect PUT /api/portfolio
  if (pathname === '/api/portfolio' && request.method === 'PUT') {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.next()
  }

  // Redirect logged-in users away from login page
  if (pathname === LOGIN_PATH && isAuthenticated(request)) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/portfolio'],
}
