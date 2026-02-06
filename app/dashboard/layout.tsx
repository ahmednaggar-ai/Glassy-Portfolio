import { DashboardShell } from '@/components/DashboardShell'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <DashboardShell>{children}</DashboardShell>
    </div>
  )
}
