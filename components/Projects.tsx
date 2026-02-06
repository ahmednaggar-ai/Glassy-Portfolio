import type { ProjectItem } from '@/lib/types'

export function Projects({ data }: { data: ProjectItem[] }) {
  return (
    <section id="projects" className="section-padding scroll-margin">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((project) => (
            <article key={project.title} className="glass-card rounded-3xl p-6 project-card group">
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel={project.link.startsWith('http') ? 'noopener' : undefined} className="text-violet-400 text-sm font-medium hover:text-violet-300 inline-flex items-center gap-1">View project →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
