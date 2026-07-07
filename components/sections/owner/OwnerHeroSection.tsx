import React from 'react'
import Image from 'next/image'
import { OWNER_CONTACT_URL } from '../../../lib/constants'
import { event } from '../../../lib/gtag'
import PlatformStatsBar from '../../PlatformStatsBar'

const OwnerHeroSection: React.FC = () => {
  const trackContact = () => {
    event({ action: 'owner_cta_click', category: 'conversion', label: 'hero_contact' })
  }

  return (
    <section id="hero-duenos" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-refut-green font-medium mb-4 text-sm uppercase tracking-wide">
            Para dueños, complejos y organizadores · ZMG
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Llena tus horarios y opera torneos desde{' '}
            <span className="text-refut-green">un solo panel</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Reservas, operación diaria, equipos, tabla en vivo, árbitros y página pública de tu torneo.
            Más visibilidad ante la comunidad futbolera de la zona.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={OWNER_CONTACT_URL}
              onClick={trackContact}
              className="inline-flex items-center justify-center gap-2 bg-refut-green text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black active:scale-[0.98]"
            >
              Solicitar acceso
            </a>
            <a
              href="#canchas"
              className="inline-flex items-center justify-center gap-2 border border-dark-border text-white px-10 py-4 rounded-xl text-lg font-semibold hover:border-refut-green/50 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
            >
              Ver red de canchas
            </a>
          </div>
          <PlatformStatsBar className="mb-8 max-w-3xl mx-auto" />
          <p className="text-sm text-white/60">
            Acceso por invitación · Operación, ligas, torneos y marketing en un solo ecosistema ReFut
          </p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto h-56 md:h-80 animate-fadeIn">
          <Image
            src="/screenshots/owner/panel.svg"
            alt="Vista previa del panel de administración ReFut"
            fill
            className="rounded-2xl object-cover border border-dark-border bg-dark-surface"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default OwnerHeroSection
