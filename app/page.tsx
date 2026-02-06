import { getPortfolioData } from '@/lib/portfolio'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Certificates } from '@/components/Certificates'
import { Contact } from '@/components/Contact'

export default function Home() {
  const data = getPortfolioData()
  return (
    <div className="page-root min-h-screen w-full bg-gray-900 relative">
      <div className="page-bg fixed inset-0 -z-10 bg-gradient-to-b from-gray-900 via-slate-900/95 to-gray-900" aria-hidden />
      <Nav />
      <main className="w-full">
        <Hero data={data.hero} />
        <About data={data.about} />
        <Skills data={data.skills} />
        <Experience data={data.experience} />
        <Projects data={data.projects} />
        <Certificates data={data.certificates} />
        <Contact data={data.contact} />
      </main>
      <footer className="glass-card rounded-t-3xl border-t border-white/10 py-6 text-center text-sm text-slate-400 backdrop-blur-xl">
        <p>© {new Date().getFullYear()} {data.seo.author}. Frontend Developer.</p>
      </footer>
    </div>
  )
}
