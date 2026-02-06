export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-fuchsia-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
    </div>
  )
}
