'use client'

import { useEffect, useRef, useState } from 'react'

export function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setAnimated(true),
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-fill" style={{ ['--level' as string]: animated ? `${level}%` : '0%' }} />
      <span>{name}</span>
    </div>
  )
}
