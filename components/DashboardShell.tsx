'use client'

import { usePathname } from 'next/navigation'
import { DashboardHeader } from './DashboardHeader'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/dashboard/login'

  if (isLogin) {
    return <>{children}</>
  }

  return (
    <>
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </>
  )
}