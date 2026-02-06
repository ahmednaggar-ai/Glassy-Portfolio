'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const STORAGE_KEY = 'portfolio-theme'

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
]

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [light, setLight] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setLight(stored === 'light')
  }, [])

  const toggleTheme = () => {
    const next = !light
    setLight(next)
    localStorage.setItem(STORAGE_KEY, next ? 'light' : 'dark')
    document.documentElement.classList.toggle('light', next)
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4">
      <nav aria-label="Global" className="glass-nav flex items-center justify-between max-w-6xl mx-auto rounded-2xl px-6 py-3">
        <div className="flex lg:flex-1">
          <Link href="#hero" className="-m-1.5 p-1.5">
            <span className="sr-only">Portfolio</span>
            <span className="text-xl font-semibold text-white">AH</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md p-2 text-gray-200 hover:text-white hover:bg-white/5"
            aria-label="Toggle theme"
          >
            {light ? (
              <svg className="size-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.293a8.001 8.001 0 1010.586 10.586z"/></svg>
            ) : (
              <svg className="size-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zM5 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>
            )}
          </button>
          <Link
            href="/dashboard"
            className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
          >
            Dashboard <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900/95 backdrop-blur-xl border-l border-white/10 px-6 py-6 sm:max-w-sm shadow-2xl">
          <div className="flex items-center justify-between">
            <Link href="#hero" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Portfolio</span>
              <span className="text-xl font-semibold text-white">AH</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-200 hover:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-left text-base font-semibold leading-7 text-white hover:bg-white/5"
                >
                  {light ? 'Dark mode' : 'Light mode'}
                </button>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-white/5"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
