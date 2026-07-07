import React, { useState } from 'react'
import Logo from './Logo'
import AudienceSwitcher from './AudienceSwitcher'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { APP_URL, OWNER_CONTACT_URL } from '../lib/constants'
import { useAudience } from '../hooks/useAudience'
import { event } from '../lib/gtag'

const playerNavLinks = [
  { href: '#canchas', label: 'Canchas' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#comunidad', label: 'Comunidad' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacto', label: 'Contacto' },
]

const ownerNavLinks = [
  { href: '#canchas', label: 'Canchas' },
  { href: '#funciones-duenos', label: 'Funciones' },
  { href: '#membresias-duenos', label: 'Membresías' },
  { href: '#socios-destacados', label: 'Socios' },
  { href: '#demo-duenos', label: 'Demo' },
  { href: '#contacto-duenos', label: 'Contacto' },
]

const Nav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { audience } = useAudience()
  const isOwner = audience === 'duenos'
  const navLinks = isOwner ? ownerNavLinks : playerNavLinks
  const ctaHref = isOwner ? OWNER_CONTACT_URL : APP_URL
  const ctaLabel = isOwner ? 'Solicitar acceso' : 'Quiero jugar'
  const ctaExternal = !isOwner

  const handleCtaClick = () => {
    if (isOwner) {
      event({ action: 'owner_cta_click', category: 'conversion', label: 'nav_cta' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-refut-black/95 backdrop-blur border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2 sm:gap-3">
          <Logo variant="white" size="md" href="/" />

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <AudienceSwitcher />

            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black rounded"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ctaHref}
                {...(ctaExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={handleCtaClick}
                className="inline-flex items-center gap-1.5 bg-refut-green text-white px-4 py-2 rounded-xl font-medium hover:bg-accent-greenDark transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black whitespace-nowrap"
              >
                {ctaLabel}
                {ctaExternal && <FaExternalLinkAlt className="w-3 h-3 opacity-80" aria-hidden />}
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 text-white/80 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-dark-border">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white text-sm font-medium py-2 focus:outline-none focus:ring-2 focus:ring-refut-green rounded"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ctaHref}
                {...(ctaExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => {
                  handleCtaClick()
                  setMobileOpen(false)
                }}
                className="inline-flex items-center justify-center gap-1.5 bg-refut-green text-white px-4 py-3 rounded-xl font-medium hover:bg-accent-greenDark transition-colors text-sm text-center mt-2 focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
              >
                {ctaLabel}
                {ctaExternal && <FaExternalLinkAlt className="w-3 h-3 opacity-80" aria-hidden />}
              </a>
              {!isOwner && (
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 border border-dark-border text-white/90 px-4 py-3 rounded-xl font-medium hover:border-refut-green/50 hover:text-refut-green transition-colors text-sm text-center focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Entrar a la app
                  <FaExternalLinkAlt className="w-3 h-3 opacity-80" aria-hidden />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
