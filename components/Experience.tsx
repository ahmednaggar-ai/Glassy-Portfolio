import type { ExperienceItem } from '@/lib/types'

export function Experience({ data }: { data: ExperienceItem[] }) {
  return (
    <section id="experience" className="section-padding scroll-margin">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Work Experience</h2>
        <div className="space-y-6">
          {data.map((job) => (
            <article key={job.company} className="glass-card rounded-3xl p-6 md:p-8 experience-card">
              <div className="flex flex-wrap justify-between gap-2 mb-3">
                <h3 className="text-xl font-semibold text-white">{job.company}</h3>
                {job.period && <span className="text-slate-500 text-sm">{job.period}</span>}
              </div>
              <p className="text-violet-400 font-medium mb-2">{job.role}</p>
              {job.description && <p className="text-slate-400 text-sm leading-relaxed">{job.description}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
