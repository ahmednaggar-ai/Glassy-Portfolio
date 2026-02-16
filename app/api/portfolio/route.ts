import { NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData } from '@/lib/portfolio'
import type { PortfolioData } from '@/lib/types'

// Fix 405 on Vercel: GET+PUT in same route breaks in production without this (Next.js #66647)
export const dynamic = 'force-dynamic'

// Allow CORS preflight (OPTIONS) so PUT from same-origin succeeds
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin') || '*'
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export async function GET() {
  try {
    const data = getPortfolioData()
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load portfolio' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as PortfolioData
    savePortfolioData(body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save portfolio' }, { status: 500 })
  }
}
