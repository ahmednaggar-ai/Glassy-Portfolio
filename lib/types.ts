export interface HeroData {
  badge: string
  name: string
  title: string
  tagline: string
  cvUrl: string
  buttons: { label: string; href: string; primary?: boolean }[]
  /** Optional image tile URLs or paths (e.g. /images/hero-1.jpg). Shows overlapping glass-style tiles. */
  imageTiles?: string[]
}

export interface AboutData {
  paragraphs: string[]
  tags: string[]
}

export interface SkillItem {
  name: string
  level: number
}

export interface SkillGroup {
  title: string
  color: 'violet' | 'cyan' | 'amber' | 'emerald'
  description: string
  bars?: SkillItem[]
  tags?: string[]
}

export interface ExperienceItem {
  company: string
  period: string
  role: string
  description?: string
}

export interface ProjectItem {
  title: string
  description: string
  tags: string[]
  link: string
}

export interface CertificateItem {
  provider: string
  name: string
  description?: string
}

export interface ContactItem {
  type: 'email' | 'phone' | 'location' | 'github' | 'link'
  label: string
  value: string
  href?: string
}

export interface PortfolioData {
  hero: HeroData
  about: AboutData
  skills: SkillGroup[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  certificates: CertificateItem[]
  contact: ContactItem[]
  seo: {
    title: string
    description: string
    keywords: string
    author: string
  }
}
