import React from 'react'
import {
  FaMapMarkedAlt,
  FaUsers,
  FaChartLine,
  FaBell,
  FaStar,
  FaTrophy,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import { APP_URL } from '../../lib/constants'

const features = [
  {
    icon: <FaMapMarkedAlt className="w-8 h-8 text-refut-green" />,
      title: 'Encuentra la mejor cancha cerca de ti',
      lead: 'Busca canchas de fútbol rápido en Guadalajara por zona, precio y horario; ve ubicación y datos de contacto.',
      detail: 'Canchas públicas y privadas en la ZMG (Guadalajara, Zapopan, Tlaquepaque, Tonalá) con filtros y mapa interactivo.',
    status: 'Disponible' as const,
  },
  {
    icon: <FaUsers className="w-8 h-8 text-refut-green" />,
      title: 'Llena tu partido sin andar mensajeando a todos',
      lead: 'Publica un partido en Guadalajara y deja que los jugadores se apunten desde su celular.',
      detail: 'Confirma asistencia, arma equipos y lleva el rol en la app. Ideal para organizar partidos amateur en la ZMG.',
    status: 'Disponible' as const,
  },
  {
    icon: <FaChartLine className="w-8 h-8 text-refut-green" />,
    title: 'Sigue el partido aunque no estés en la cancha',
    lead: 'Marcador en tiempo real y estadísticas desde el celular.',
    detail: 'Historial de goles y eventos para que la mesa tenga todo al día.',
    status: 'En desarrollo' as const,
  },
  {
    icon: <FaBell className="w-8 h-8 text-refut-green" />,
    title: 'Que no se te pase un partido',
    lead: 'Alertas de recordatorio, cambios de horario y cancelaciones.',
    detail: 'Notificaciones para organizadores y jugadores.',
    status: 'Disponible' as const,
  },
  {
    icon: <FaStar className="w-8 h-8 text-refut-green" />,
    title: 'Elige canchas y árbitros con el criterio de la comunidad',
    lead: 'Califica y lee opiniones de otros jugadores.',
    detail: 'Reseñas de canchas, árbitros y organizadores.',
    status: 'En desarrollo' as const,
  },
  {
    icon: <FaTrophy className="w-8 h-8 text-refut-green" />,
    title: 'Organiza o juega torneos sin planillas en Excel',
    lead: 'Tabla, calendario y resultados en un solo lugar.',
    detail: 'Ligas y torneos locales con inscripción y seguimiento.',
    status: 'En desarrollo' as const,
  },
]

const FeaturesSection: React.FC = () => {
  return (
    <section id="funciones" className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Qué puedes hacer con ReFut
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Beneficios concretos para jugadores y organizadores.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-refut-green/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                {feature.icon}
                <span
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'Disponible'
                      ? 'bg-refut-green/20 text-refut-green'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {feature.status}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-2">{feature.lead}</p>
              <p className="text-white/60 text-sm leading-relaxed">{feature.detail}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-refut-green text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black active:scale-[0.98]"
          >
            Entrar a la app
            <FaExternalLinkAlt className="w-4 h-4 opacity-80" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
