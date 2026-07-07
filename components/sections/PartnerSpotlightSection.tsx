import React from 'react'
import Image from 'next/image'
import { OWNER_CONTACT_URL } from '../../lib/constants'
import { partnerSpotlight } from '../../lib/landingContent'
import { event } from '../../lib/gtag'

const PartnerSpotlightSection: React.FC = () => {
  const trackContact = () => {
    event({ action: 'owner_cta_click', category: 'conversion', label: 'partner_spotlight' })
  }

  return (
    <section id="socios-destacados" className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden border border-dark-border">
            <Image
              src={partnerSpotlight.photoUrl}
              alt="Socios ReFut en operación"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-refut-black/80 text-white text-xs font-semibold uppercase tracking-wide">
              Referencia de red
            </span>
          </div>

          <div>
            <p className="text-refut-green font-medium text-sm uppercase tracking-wide mb-3">
              Socios ReFut
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {partnerSpotlight.name}
            </h2>
            <p className="text-lg text-refut-green font-medium mb-4">{partnerSpotlight.tagline}</p>
            <p className="text-white/70 mb-8 leading-relaxed">{partnerSpotlight.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {partnerSpotlight.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-dark-surface border border-dark-border rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-white">{m.value}</p>
                  <p className="text-xs text-white/60 mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-white/50 mb-6">
              Operando con ReFut desde {partnerSpotlight.since}.
            </p>

            <a
              href={OWNER_CONTACT_URL}
              onClick={trackContact}
              className="inline-flex items-center justify-center bg-refut-green text-white px-8 py-3 rounded-xl font-semibold hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green"
            >
              Quiero sumar mi cancha o torneo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnerSpotlightSection
