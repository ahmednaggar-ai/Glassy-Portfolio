import type { PortfolioData } from './types'
import path from 'path'
import fs from 'fs'

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

export function getPortfolioData(): PortfolioData {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as PortfolioData
}

export function savePortfolioData(data: PortfolioData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}
