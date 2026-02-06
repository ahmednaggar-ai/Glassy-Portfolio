import type { AboutData } from '@/lib/types'

function renderParagraph(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      const content = p.slice(2, -2)
      if (content.includes('Angular')) return <strong key={i} className="text-violet-400">{content}</strong>
      if (content.includes('React')) return <strong key={i} className="text-cyan-400">{content}</strong>
      return <strong key={i} className="text-white">{content}</strong>
    }
    return <span key={i}>{p}</span>
  })
}

export function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="section-padding scroll-margin">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">About Me</h2>
        <div className="glass-card rounded-3xl p-8 md:p-10">
          {data.paragraphs.map((para, i) => (
            <p key={i} className="text-slate-300 leading-relaxed mb-4">{renderParagraph(para)}</p>
          ))}
          <div className="flex flex-wrap gap-3 mt-6">
            {data.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-sm font-medium">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
