'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function DashboardHeader() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/dashboard/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/95 backdrop-blur">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-slate-400 font-medium">Edit profile</span>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-medium text-violet-400 hover:text-violet-300">
            Return to home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-slate-400 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
