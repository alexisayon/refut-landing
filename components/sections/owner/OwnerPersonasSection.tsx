import React from 'react'
import { FaFutbol, FaBuilding, FaTrophy, FaUsers } from 'react-icons/fa'

const personas = [
  {
    icon: <FaBuilding className="w-8 h-8 text-refut-green" />,
    title: 'Dueño de cancha',
    description:
      'Llena horarios, controla reservas y muestra tu espacio a jugadores de la ZMG.',
  },
  {
    icon: <FaFutbol className="w-8 h-8 text-refut-green" />,
    title: 'Complejo deportivo',
    description:
      'Administra varias sucursales, canchas y operación diaria desde un solo panel.',
  },
  {
    icon: <FaUsers className="w-8 h-8 text-refut-green" />,
    title: 'Organizador de liga',
    description:
      'Temporadas completas con equipos, tabla, staff y comunicación centralizada.',
  },
  {
    icon: <FaTrophy className="w-8 h-8 text-refut-green" />,
    title: 'Organizador de torneo',
    description:
      'Torneos cortos con inscripciones, llaves, árbitros y página pública para promocionar.',
  },
]

const OwnerPersonasSection: React.FC = () => {
  return (
    <section id="personas-duenos" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Para quién es ReFut?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Un panel flexible para distintos tipos de operación deportiva amateur.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona) => (
            <div
              key={persona.title}
              className="bg-dark-card border border-dark-border rounded-xl p-6 text-center hover:border-refut-green/40 transition-colors"
            >
              <div className="flex justify-center mb-4">{persona.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{persona.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{persona.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OwnerPersonasSection
