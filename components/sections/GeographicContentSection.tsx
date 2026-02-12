import React from 'react'
import { APP_URL } from '../../lib/constants'

const GeographicContentSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Canchas de fútbol rápido en Guadalajara
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Encuentra canchas de fútbol rápido en Guadalajara y toda la ZMG. Filtra por zona, precio y horario para encontrar la mejor opción cerca de ti.
            </p>
            <p className="text-white/70 text-sm">
              Disponible en colonias como Chapalita, Oblatos, Atemajac, Providencia y más.
            </p>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Rentar cancha en Zapopan, Tlaquepaque y Tonalá
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              ReFut cubre toda la Zona Metropolitana de Guadalajara. Busca y reserva canchas en Zapopan, Tlaquepaque, Tonalá y municipios cercanos.
            </p>
            <p className="text-white/70 text-sm">
              Canchas de fútbol 7, fútbol rápido y fútbol 11 disponibles.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              Cómo encontrar la mejor cancha para tu equipo en la ZMG
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Usa el mapa interactivo de ReFut para buscar canchas de fútbol en Guadalajara y la ZMG. Filtra por ubicación, precio, horarios disponibles y tipo de cancha (fútbol rápido, fútbol 7, fútbol 11). Revisa reseñas de otros jugadores y reserva directamente desde la app.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              Consejos para organizar tu liga amateur en Guadalajara
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Con ReFut puedes crear partidos, invitar jugadores y gestionar equipos sin depender de grupos de WhatsApp. Confirma asistencia, lleva el rol y organiza torneos locales. Todo desde una sola plataforma diseñada para el fútbol amateur en la ZMG.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-refut-green hover:text-accent-greenLight font-medium"
          >
            Ver canchas en Guadalajara →
          </a>
        </div>
      </div>
    </section>
  )
}

export default GeographicContentSection
