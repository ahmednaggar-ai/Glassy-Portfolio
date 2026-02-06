import Link from 'next/link'
import type { HeroData } from '@/lib/types'

const blobClipPath =
  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'

const ASSETS_IMAGES = '/assets/images'
const DEFAULT_TILE_IMAGE = `${ASSETS_IMAGES}/sigmund-Fa9b57hffnM-unsplash.jpg`

/** Resolve tile src: if relative (no leading / or http), use assets/images folder */
function resolveTileSrc(src: string): string {
  const s = src.trim()
  if (!s) return DEFAULT_TILE_IMAGE
  if (s.startsWith('http') || s.startsWith('/')) return s
  return `${ASSETS_IMAGES}/${s.replace(/^\//, '')}`
}

function HeroImageTile({ src, alt, index }: { src: string; alt: string; index: number }) {
  return (
    <div
      className="absolute overflow-hidden rounded-2xl border border-white/20 bg-gray-800/80 shadow-xl backdrop-blur-sm ring-1 ring-white/10"
      style={getTileStyle(index)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

function getTileStyle(index: number): React.CSSProperties {
  const base = { width: 'clamp(100px, 14vw, 160px)', height: 'clamp(100px, 14vw, 160px)' }
  // Stagger so all 3 tiles are visible: top-left, top-right, bottom-left
  if (index === 0) return { ...base, left: '0%', top: '0%', zIndex: 3 }
  if (index === 1) return { ...base, left: '55%', top: '5%', zIndex: 2 }
  if (index === 2) return { ...base, left: '20%', top: '52%', zIndex: 1 }
  return { ...base, left: `${(index % 3) * 35}%`, top: `${(index % 2) * 50}%`, zIndex: 4 - index }
}

export function Hero({ data }: { data: HeroData }) {
  const cvHref = data.cvUrl || '#'
  const primaryBtn = data.buttons.find((b) => b.primary)
  const secondaryBtns = data.buttons.filter((b) => !b.primary)
  const rawTiles = Array.isArray(data.imageTiles) ? data.imageTiles.filter(Boolean) : []
  const tileImages =
    rawTiles.length > 0
      ? rawTiles.map((s) => resolveTileSrc(String(s)))
      : [DEFAULT_TILE_IMAGE, DEFAULT_TILE_IMAGE, DEFAULT_TILE_IMAGE]

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-[90vh] flex flex-col justify-center">
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${DEFAULT_TILE_IMAGE})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gray-900/70" aria-hidden />
      {/* Top blur blob */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{ clipPath: blobClipPath }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto w-full max-w-6xl py-24 sm:py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start">
              <div className="relative rounded-full px-3 py-1 text-sm font-medium leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                {data.badge}
              </div>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl text-balance">
              {data.name.includes('\n') ? (
                data.name.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))
              ) : (
                data.name
              )}
            </h1>
            <p className="mt-8 text-lg font-medium leading-8 text-gray-400 sm:text-xl text-pretty">
              {data.title}
            </p>
            <p className="mt-2 text-base font-medium text-gray-500 sm:text-lg text-pretty">
              {data.tagline}
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6 flex-wrap gap-y-3">
              {primaryBtn && (
                <Link
                  href={primaryBtn.href}
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {primaryBtn.label}
                </Link>
              )}
              {secondaryBtns.map((btn) =>
                btn.label === 'Download CV' ? (
                  <a
                    key={btn.label}
                    href={cvHref}
                    target={cvHref.startsWith('http') ? '_blank' : undefined}
                    rel={cvHref.startsWith('http') ? 'noopener' : undefined}
                    className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
                  >
                    {btn.label} <span aria-hidden>&rarr;</span>
                  </a>
                ) : (
                  <Link
                    key={btn.label}
                    href={btn.href}
                    className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
                  >
                    {btn.label} <span aria-hidden>&rarr;</span>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Image tiles - container sized so all 3 staggered tiles fit */}
          <div className="relative flex-shrink-0 w-full max-w-[300px] min-h-[280px] sm:max-w-[360px] sm:min-h-[320px] lg:w-[380px] lg:min-h-[340px]">
            {tileImages.slice(0, 5).map((src, i) => (
              <HeroImageTile key={i} src={src} alt={`Hero tile ${i + 1}`} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom blur blob */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{ clipPath: blobClipPath }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  )
}
