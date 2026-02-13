import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { APP_URL } from '../../lib/constants'

const PurposeSection: React.FC = () => {
  return (
    <section id="que-es" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
          Qué es ReFut
        </h2>
        <p className="text-lg md:text-xl text-white/90 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
          ReFut conecta jugadores, organizadores y canchas en una sola plataforma para que{' '}
          <span className="text-refut-green font-semibold">jugar sea más fácil que coordinar por WhatsApp</span>.
        </p>
        <ul className="space-y-4 text-white/90 text-lg">
          <li className="flex gap-3">
            <span className="text-refut-green shrink-0">·</span>
            <span><strong className="text-white">Si eres jugador:</strong> encuentra canchas y partidos abiertos.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-refut-green shrink-0">·</span>
            <span><strong className="text-white">Si organizas:</strong> arma equipos, confirma asistencia y lleva el rol.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-refut-green shrink-0">·</span>
            <span><strong className="text-white">Si eres dueño de cancha:</strong> muestra horarios libres y recibe reservas.</span>
          </li>
        </ul>
        <div className="mt-12 text-center">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-refut-green text-white px-8 py-3 rounded-xl font-semibold hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-dark-surface"
          >
            Quiero jugar
            <FaExternalLinkAlt className="w-4 h-4 opacity-80" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}

export default PurposeSection
