import React, { useState, useEffect } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { APP_URL } from '../lib/constants'

const HERO_ID = 'hero-section' // must match HeroSection section id

const StickyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hero = document.getElementById(HERO_ID)
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-10px 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!mounted || !visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-refut-black/95 backdrop-blur border-t border-dark-border py-3 px-4 safe-area-pb md:hidden">
      <div className="max-w-7xl mx-auto flex justify-center">
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-refut-green text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black active:scale-[0.98]"
        >
          Entrar a la app
          <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-80" aria-hidden />
        </a>
      </div>
    </div>
  )
}

export default StickyCTA
