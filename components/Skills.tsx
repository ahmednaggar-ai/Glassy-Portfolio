import type { SkillGroup } from '@/lib/types'
import { SkillBar } from './SkillBar'

const colorDot: Record<string, string> = {
  violet: 'bg-violet-500',
  cyan: 'bg-cyan-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
}

export function Skills({ data }: { data: SkillGroup[] }) {
  return (
    <section id="skills" className="section-padding scroll-margin">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title">Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((group) => (
            <div key={group.title} className="glass-card rounded-3xl p-6 skill-card">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${colorDot[group.color] || 'bg-violet-500'}`} />
                {group.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{group.description}</p>
              {group.bars && (
                <div className="space-y-3">
                  {group.bars.map((bar) => (
                    <SkillBar key={bar.name} name={bar.name} level={bar.level} />
                  ))}
                </div>
              )}
              {group.tags && (
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
