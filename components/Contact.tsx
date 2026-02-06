'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useToast } from '@/components/Toast'
import type { ContactItem } from '@/lib/types'

export function Contact({ data }: { data: ContactItem[] }) {
  const { toast } = useToast()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm({ firstName: '', lastName: '', company: '', email: '', phone: '', message: '' })
        toast("Message sent. I'll get back to you soon.", 'success')
      } else {
        toast('Something went wrong. Please try again.', 'error')
      }
    } catch {
      toast('Something went wrong. Please try again.', 'error')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section-padding scroll-margin pb-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="section-title">Contact</h2>
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-slate-400 text-sm font-medium mb-1.5 block">First name</span>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                  placeholder="First name"
                />
              </label>
              <label className="block">
                <span className="text-slate-400 text-sm font-medium mb-1.5 block">Last name</span>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                  placeholder="Last name"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-slate-400 text-sm font-medium mb-1.5 block">Company</span>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                placeholder="Company"
              />
            </label>
            <label className="block">
              <span className="text-slate-400 text-sm font-medium mb-1.5 block">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-slate-400 text-sm font-medium mb-1.5 block">Phone number</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                placeholder="+20 123 456 7890"
              />
            </label>
            <label className="block">
              <span className="text-slate-400 text-sm font-medium mb-1.5 block">Message</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={4}
                className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 resize-none"
                placeholder="Your message..."
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-2xl px-6 py-4 font-semibold text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all shadow-lg shadow-violet-500/20"
            >
              {sending ? 'Sending...' : "Let's talk"}
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link href="#hero" className="text-slate-400 hover:text-white text-sm font-medium">Back to top ↑</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
