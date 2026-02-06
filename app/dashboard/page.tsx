'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Toast'
import type { PortfolioData, ContactItem } from '@/lib/types'

export default function DashboardPage() {
  const { toast } = useToast()
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/portfolio')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true)
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) toast('Saved successfully.', 'success')
      else toast('Failed to save.', 'error')
    } catch {
      toast('Failed to save.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-slate-400">Loading...</p>
  if (!data) return <p className="text-red-400">Failed to load data.</p>

  const update = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setData((d) => (d ? { ...d, [key]: value } : d))
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Edit profile</h1>
        <button onClick={save} disabled={saving} className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium">
          {saving ? 'Saving...' : 'Save all'}
        </button>
      </div>

      {/* SEO */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">SEO</h2>
        <div className="grid gap-4">
          <label className="block">
            <span className="text-slate-400 text-sm">Title</span>
            <input type="text" value={data.seo.title} onChange={(e) => update('seo', { ...data.seo, title: e.target.value })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">Description</span>
            <textarea value={data.seo.description} onChange={(e) => update('seo', { ...data.seo, description: e.target.value })} rows={2} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">Keywords</span>
            <input type="text" value={data.seo.keywords} onChange={(e) => update('seo', { ...data.seo, keywords: e.target.value })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">Author</span>
            <input type="text" value={data.seo.author} onChange={(e) => update('seo', { ...data.seo, author: e.target.value })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
        </div>
      </section>

      {/* Hero */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Hero</h2>
        <div className="grid gap-4">
          <label className="block">
            <span className="text-slate-400 text-sm">Badge</span>
            <input type="text" value={data.hero.badge} onChange={(e) => update('hero', { ...data.hero, badge: e.target.value })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">Name (use \n for line break)</span>
            <input type="text" value={data.hero.name} onChange={(e) => update('hero', { ...data.hero, name: e.target.value })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Ahmed Hossam\nAl Naggar" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">Title</span>
            <input type="text" value={data.hero.title} onChange={(e) => update('hero', { ...data.hero, title: e.target.value })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">Tagline</span>
            <input type="text" value={data.hero.tagline} onChange={(e) => update('hero', { ...data.hero, tagline: e.target.value })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">CV URL (leave empty to hide)</span>
            <input type="text" value={data.hero.cvUrl} onChange={(e) => update('hero', { ...data.hero, cvUrl: e.target.value })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="/cv.pdf" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">Image tiles from <code className="text-gray-400">public/assets/images/</code> — one path per line: <code className="text-gray-400">/assets/images/photo.jpg</code> or <code className="text-gray-400">photo.jpg</code></span>
            <textarea value={(data.hero.imageTiles ?? []).join('\n')} onChange={(e) => update('hero', { ...data.hero, imageTiles: e.target.value.split('\n').map((u) => u.trim()).filter(Boolean) })} rows={3} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white font-mono text-sm" placeholder={"/assets/images/sigmund-Fa9b57hffnM-unsplash.jpg"} />
          </label>
        </div>
      </section>

      {/* About */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">About</h2>
        <div className="grid gap-4">
          <label className="block">
            <span className="text-slate-400 text-sm">Paragraphs (one per line, use **text** for bold)</span>
            <textarea value={data.about.paragraphs.join('\n')} onChange={(e) => update('about', { ...data.about, paragraphs: e.target.value.split('\n').filter(Boolean) })} rows={4} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
          <label className="block">
            <span className="text-slate-400 text-sm">Tags (comma-separated)</span>
            <input type="text" value={data.about.tags.join(', ')} onChange={(e) => update('about', { ...data.about, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          </label>
        </div>
      </section>

      {/* Skills */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Skills</h2>
        <p className="text-slate-400 text-sm mb-4">Edit in data/portfolio.json for full control (bars, tags, colors).</p>
        <div className="space-y-6">
          {data.skills.map((group, gi) => (
            <div key={gi} className="rounded-xl bg-slate-800/50 p-4 border border-white/5">
              <input type="text" value={group.title} onChange={(e) => {
                const next = [...data.skills]
                next[gi] = { ...next[gi], title: e.target.value }
                update('skills', next)
              }} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white mb-2" placeholder="Title" />
              <input type="text" value={group.description} onChange={(e) => {
                const next = [...data.skills]
                next[gi] = { ...next[gi], description: e.target.value }
                update('skills', next)
              }} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white text-sm" placeholder="Description" />
              {group.bars?.map((bar, bi) => (
                <div key={bi} className="flex gap-2 mt-2">
                  <input type="text" value={bar.name} onChange={(e) => {
                    const next = [...data.skills]
                    if (!next[gi].bars) return
                    next[gi].bars = [...next[gi].bars!]
                    next[gi].bars![bi] = { ...next[gi].bars![bi], name: e.target.value }
                    update('skills', next)
                  }} className="flex-1 rounded bg-slate-800 border border-white/10 px-2 py-1 text-sm text-white" />
                  <input type="number" min={0} max={100} value={bar.level} onChange={(e) => {
                    const next = [...data.skills]
                    if (!next[gi].bars) return
                    next[gi].bars = [...next[gi].bars!]
                    next[gi].bars![bi] = { ...next[gi].bars![bi], level: +e.target.value }
                    update('skills', next)
                  }} className="w-16 rounded bg-slate-800 border border-white/10 px-2 py-1 text-sm text-white" />
                </div>
              ))}
              {group.tags && (
                <input type="text" value={group.tags.join(', ')} onChange={(e) => {
                  const next = [...data.skills]
                  next[gi] = { ...next[gi], tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) }
                  update('skills', next)
                }} className="w-full mt-2 rounded bg-slate-800 border border-white/10 px-2 py-1 text-sm text-white" placeholder="Tags comma-separated" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Work experience</h2>
        <div className="space-y-4">
          {data.experience.map((job, i) => (
            <div key={i} className="rounded-xl bg-slate-800/50 p-4 border border-white/5 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={job.company} onChange={(e) => {
                  const next = [...data.experience]
                  next[i] = { ...next[i], company: e.target.value }
                  update('experience', next)
                }} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Company" />
                <input type="text" value={job.period} onChange={(e) => {
                  const next = [...data.experience]
                  next[i] = { ...next[i], period: e.target.value }
                  update('experience', next)
                }} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Period" />
              </div>
              <input type="text" value={job.role} onChange={(e) => {
                const next = [...data.experience]
                next[i] = { ...next[i], role: e.target.value }
                update('experience', next)
              }} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Role" />
              <textarea value={job.description || ''} onChange={(e) => {
                const next = [...data.experience]
                next[i] = { ...next[i], description: e.target.value || undefined }
                update('experience', next)
              }} rows={2} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white text-sm" placeholder="Description" />
              <button type="button" onClick={() => update('experience', data.experience.filter((_, j) => j !== i))} className="text-red-400 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => update('experience', [...data.experience, { company: '', period: '', role: '', description: '' }])} className="text-violet-400 text-sm">+ Add job</button>
        </div>
      </section>

      {/* Projects */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Projects</h2>
        <div className="space-y-4">
          {data.projects.map((proj, i) => (
            <div key={i} className="rounded-xl bg-slate-800/50 p-4 border border-white/5 space-y-2">
              <input type="text" value={proj.title} onChange={(e) => {
                const next = [...data.projects]
                next[i] = { ...next[i], title: e.target.value }
                update('projects', next)
              }} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Title" />
              <textarea value={proj.description} onChange={(e) => {
                const next = [...data.projects]
                next[i] = { ...next[i], description: e.target.value }
                update('projects', next)
              }} rows={2} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white text-sm" placeholder="Description" />
              <input type="text" value={proj.tags.join(', ')} onChange={(e) => {
                const next = [...data.projects]
                next[i] = { ...next[i], tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) }
                update('projects', next)
              }} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white text-sm" placeholder="Tags comma-separated" />
              <input type="text" value={proj.link} onChange={(e) => {
                const next = [...data.projects]
                next[i] = { ...next[i], link: e.target.value }
                update('projects', next)
              }} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white text-sm" placeholder="Link" />
              <button type="button" onClick={() => update('projects', data.projects.filter((_, j) => j !== i))} className="text-red-400 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => update('projects', [...data.projects, { title: '', description: '', tags: [], link: '#' }])} className="text-violet-400 text-sm">+ Add project</button>
        </div>
      </section>

      {/* Certificates */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Certificates</h2>
        <div className="space-y-4">
          {data.certificates.map((cert, i) => (
            <div key={i} className="rounded-xl bg-slate-800/50 p-4 border border-white/5 flex gap-2 flex-wrap">
              <input type="text" value={cert.provider} onChange={(e) => {
                const next = [...data.certificates]
                next[i] = { ...next[i], provider: e.target.value }
                update('certificates', next)
              }} className="flex-1 min-w-[120px] rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Provider" />
              <input type="text" value={cert.name} onChange={(e) => {
                const next = [...data.certificates]
                next[i] = { ...next[i], name: e.target.value }
                update('certificates', next)
              }} className="flex-1 min-w-[120px] rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Name" />
              <input type="text" value={cert.description || ''} onChange={(e) => {
                const next = [...data.certificates]
                next[i] = { ...next[i], description: e.target.value || undefined }
                update('certificates', next)
              }} className="flex-1 min-w-[120px] rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white text-sm" placeholder="Description" />
              <button type="button" onClick={() => update('certificates', data.certificates.filter((_, j) => j !== i))} className="text-red-400 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => update('certificates', [...data.certificates, { provider: '', name: '', description: '' }])} className="text-violet-400 text-sm">+ Add certificate</button>
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Contact</h2>
        <div className="space-y-4">
          {data.contact.map((item, i) => (
            <div key={i} className="rounded-xl bg-slate-800/50 p-4 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select value={item.type} onChange={(e) => {
                const next = [...data.contact]
                next[i] = { ...next[i], type: e.target.value as ContactItem['type'] }
                update('contact', next)
              }} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white">
                {['email', 'phone', 'location', 'github', 'link'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <input type="text" value={item.label} onChange={(e) => {
                const next = [...data.contact]
                next[i] = { ...next[i], label: e.target.value }
                update('contact', next)
              }} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Label" />
              <input type="text" value={item.value} onChange={(e) => {
                const next = [...data.contact]
                next[i] = { ...next[i], value: e.target.value }
                update('contact', next)
              }} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" placeholder="Value" />
              <input type="text" value={item.href || ''} onChange={(e) => {
                const next = [...data.contact]
                next[i] = { ...next[i], href: e.target.value || undefined }
                update('contact', next)
              }} className="sm:col-span-2 rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white text-sm" placeholder="href (optional)" />
              <button type="button" onClick={() => update('contact', data.contact.filter((_, j) => j !== i))} className="text-red-400 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => update('contact', [...data.contact, { type: 'email', label: '', value: '', href: '' }])} className="text-violet-400 text-sm">+ Add contact</button>
        </div>
      </section>

      <div className="pb-12">
        <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium">
          {saving ? 'Saving...' : 'Save all'}
        </button>
      </div>
    </div>
  )
}
