import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { OWNER_PANEL_URL, OWNER_CONTACT_URL } from '../../../lib/constants'
import { event } from '../../../lib/gtag'

const OwnerCTASection: React.FC = () => {
  const trackContact = () => {
    event({ action: 'owner_cta_click', category: 'conversion', label: 'footer_banner_contact' })
  }

  const trackPanel = () => {
    event({ action: 'owner_cta_click', category: 'conversion', label: 'footer_banner_panel' })
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-4xl mx-auto text-center bg-dark-surface border border-refut-green/30 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Tu cancha o torneo encaja con ReFut?
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Cuéntanos sobre tu operación en la ZMG. Evaluamos cada solicitud y damos acceso a los socios
          que seleccionamos para la red.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={OWNER_CONTACT_URL}
            onClick={trackContact}
            className="inline-flex items-center justify-center gap-2 bg-refut-green text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
          >
            Solicitar acceso
          </a>
          <a
            href={OWNER_PANEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackPanel}
            className="inline-flex items-center justify-center gap-2 border border-dark-border text-white px-10 py-4 rounded-xl text-lg font-semibold hover:border-refut-green/50 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
          >
            Ya soy socio
            <FaExternalLinkAlt className="w-4 h-4 opacity-80" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}

export default OwnerCTASection
