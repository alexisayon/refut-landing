import React from 'react'
import Link from 'next/link'
import { useCookieConsent } from '../contexts/CookieConsentContext'

const CookieConsent: React.FC = () => {
  const { consent, acceptAnalytics, rejectAnalytics } = useCookieConsent()

  if (consent === 'loading' || consent !== null) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto bg-dark-surface border border-dark-border rounded-2xl shadow-2xl p-5 md:p-6">
        <h2 id="cookie-consent-title" className="text-lg font-semibold text-white mb-2">
          Cookies y analítica
        </h2>
        <p id="cookie-consent-desc" className="text-sm text-white/70 mb-4 leading-relaxed">
          Usamos cookies técnicas para staging y, con tu permiso, Google Analytics y Vercel Analytics
          para entender cómo se usa la landing. Puedes aceptar o rechazar las cookies de analítica.
          {' '}
          <Link href="/privacidad" className="text-refut-green hover:underline">
            Aviso de privacidad
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={rejectAnalytics}
            className="px-5 py-2.5 rounded-xl border border-dark-border text-white/80 hover:text-white hover:border-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green"
          >
            Rechazar analítica
          </button>
          <button
            type="button"
            onClick={acceptAnalytics}
            className="px-5 py-2.5 rounded-xl bg-refut-green text-white font-semibold hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-dark-surface"
          >
            Aceptar analítica
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
