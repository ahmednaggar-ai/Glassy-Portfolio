'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    const isLight = stored === 'light'
    if (isLight) document.documentElement.classList.add('light')
    else document.documentElement.classList.remove('light')
  }, [])

  if (!mounted) return <>{children}</>
  return <>{children}</>
}
