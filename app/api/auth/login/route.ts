import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'dashboard_session'
const MAX_AGE = 60 * 60 * 24 // 24 hours

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const username = typeof body.username === 'string' ? body.username.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  const expectedUser = process.env.DASHBOARD_USERNAME
  const expectedPass = process.env.DASHBOARD_PASSWORD
  const sessionSecret = process.env.DASHBOARD_SESSION_SECRET

  if (!expectedUser || !expectedPass || !sessionSecret) {
    return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 })
  }

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  const cookieStore = await cookies()
  const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
  cookieStore.set(SESSION_COOKIE, sessionSecret, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })

  return NextResponse.json({ ok: true })
}
