import { NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData } from '@/lib/portfolio'
import type { PortfolioData } from '@/lib/types'

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
