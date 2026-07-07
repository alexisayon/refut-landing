import React, { useState, useEffect } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { APP_URL, OWNER_CONTACT_URL } from '../lib/constants'
import { useAudience } from '../hooks/useAudience'
import { event } from '../lib/gtag'

const PLAYER_HERO_ID = 'hero-section'
const OWNER_HERO_ID = 'hero-duenos'

const StickyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { audience } = useAudience()
  const isOwner = audience === 'duenos'
  const heroId = isOwner ? OWNER_HERO_ID : PLAYER_HERO_ID
  const href = isOwner ? OWNER_CONTACT_URL : APP_URL
  const label = isOwner ? 'Solicitar acceso' : 'Quiero jugar'
  const external = !isOwner

  useEffect(() => {
    setMounted(true)
    const hero = document.getElementById(heroId)
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-10px 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [heroId])

  if (!mounted || !visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-refut-black/95 backdrop-blur border-t border-dark-border py-3 px-4 safe-area-pb md:hidden">
      <div className="max-w-7xl mx-auto flex justify-center">
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          onClick={() => {
            if (isOwner) {
              event({ action: 'owner_cta_click', category: 'conversion', label: 'sticky_cta' })
            }
          }}
          className="inline-flex items-center gap-2 bg-refut-green text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black active:scale-[0.98]"
        >
          {label}
          {external && <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-80" aria-hidden />}
        </a>
      </div>
    </div>
  )
}

export default StickyCTA
