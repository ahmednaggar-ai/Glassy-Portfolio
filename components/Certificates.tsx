import type { CertificateItem } from '@/lib/types'

export function Certificates({ data }: { data: CertificateItem[] }) {
  return (
    <section id="certificates" className="section-padding scroll-margin">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Certificates & Courses</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {data.map((cert) => (
            <div key={cert.provider + cert.name} className="glass-card rounded-3xl p-6 cert-card">
              <h3 className="text-lg font-semibold text-white mb-1">{cert.provider}</h3>
              <p className="text-violet-400 text-sm font-medium">{cert.name}</p>
              {cert.description && <p className="text-slate-400 text-sm mt-1">{cert.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
