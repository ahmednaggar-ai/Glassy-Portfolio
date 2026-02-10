'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/dashboard'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }
      router.push(from)
      router.refresh()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl">
          <h1 className="text-xl font-semibold text-white mb-1">Dashboard</h1>
          <p className="text-slate-400 text-sm mb-6">Sign in with your username and password.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-slate-400 text-sm">Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="mt-1 w-full rounded-xl bg-slate-800 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Username"
              />
            </label>
            <label className="block">
              <span className="text-slate-400 text-sm">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="mt-1 w-full rounded-xl bg-slate-800 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Password"
              />
            </label>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-center">
            <Link href="/" className="text-slate-400 hover:text-white text-sm">← Back to portfolio</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
