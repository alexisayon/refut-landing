import React from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { APP_URL } from '../../lib/constants'

const HeroSection: React.FC = () => {
  return (
    <section id="hero-section" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
          Encuentra canchas y arma tu partido en minutos en la{' '}
          <span className="text-refut-green">ZMG</span>
        </h1>
        <p className="text-xl md:text-2xl text-refut-green mb-4 max-w-2xl mx-auto font-medium">
          Hoy disponible en la Zona Metropolitana de Guadalajara; pronto más ciudades.
        </p>

        <div className="flex justify-center">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-refut-green text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-accent-greenDark transition-colors shadow-lg hover:shadow-refut-green/20 focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black active:scale-[0.98]"
          >
            Entrar a la app
            <FaExternalLinkAlt className="w-4 h-4 opacity-80" aria-hidden />
          </a>
        </div>
        <p className="mt-4 text-sm text-white/60">
          Gratis y sin instalar nada · Ya usada por jugadores en la ZMG
        </p>

        <div className="mt-16 animate-fadeIn relative w-full max-w-3xl mx-auto h-56 md:h-72">
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
