import React, { useState } from 'react'
import Logo from './Logo'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { APP_URL } from '../lib/constants'

const navLinks = [
  { href: '#que-es', label: 'Qué es ReFut' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#plan', label: 'Plan' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacto', label: 'Contacto' },
]

const Nav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-refut-black/95 backdrop-blur border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo variant="white" size="md" href="/" />

          <div className="hidden md:flex items-center gap-4">
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
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-refut-green text-white px-4 py-2 rounded-xl font-medium hover:bg-accent-greenDark transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
            >
              Quiero jugar
              <FaExternalLinkAlt className="w-3 h-3 opacity-80" aria-hidden />
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-dark-border text-white/90 px-4 py-2 rounded-xl font-medium hover:border-refut-green/50 hover:text-refut-green transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
            >
              Entrar a la app
              <FaExternalLinkAlt className="w-3 h-3 opacity-80" aria-hidden />
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-white/80 hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
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

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-dark-border">
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
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-refut-green text-white px-4 py-3 rounded-xl font-medium hover:bg-accent-greenDark transition-colors text-sm text-center mt-2 focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
                onClick={() => setMobileOpen(false)}
              >
                Quiero jugar
                <FaExternalLinkAlt className="w-3 h-3 opacity-80" aria-hidden />
              </a>
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
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
