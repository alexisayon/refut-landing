import React from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { APP_URL } from '../../lib/constants'
import OwnerAudienceLink from '../OwnerAudienceLink'
import PlatformStatsBar from '../PlatformStatsBar'

const HeroSection: React.FC = () => {
  return (
    <section id="hero-section" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-refut-green font-medium mb-4 text-sm uppercase tracking-wide">
          Marketplace deportivo · ZMG
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
          El fútbol amateur{' '}
          <span className="text-refut-green">vive aquí</span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
          Encuentra cancha, arma partidos y únete a torneos en la Zona Metropolitana de Guadalajara.
          Sin instalar nada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-refut-green text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black active:scale-[0.98]"
          >
            Quiero jugar
            <FaExternalLinkAlt className="w-4 h-4 opacity-80" aria-hidden />
          </a>
          <a
            href="#canchas"
            className="inline-flex items-center justify-center gap-2 border border-dark-border text-white px-10 py-4 rounded-xl text-lg font-semibold hover:border-refut-green/50 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
          >
            Ver canchas
          </a>
          <OwnerAudienceLink variant="button" className="text-base px-8 py-4 border-dark-border">
            Tengo cancha
          </OwnerAudienceLink>
        </div>

        <PlatformStatsBar className="mb-10 max-w-3xl mx-auto" />

        <div className="animate-fadeIn relative w-full max-w-3xl mx-auto h-56 md:h-72">
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Jugadores de fútbol amateur en cancha"
            fill
            className="rounded-2xl object-cover border border-dark-border"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
