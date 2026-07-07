import React from 'react'

const roadmap = [
  {
    label: 'Ya disponible',
    items: [
      'Mapa y búsqueda de canchas en Guadalajara y la ZMG',
      'Crear y publicar partidos de fútbol rápido, fútbol 7 y fútbol 11',
      'Buscar jugadores cercanos y armar equipos',
      'Confirmar asistencia a partidos',
    ],
    chipStyle: 'bg-refut-green/20 text-refut-green',
  },
  {
    label: 'En marcha',
    items: [
      'Reservas de cancha en la app',
      'Notificaciones y recordatorios',
      'Ligas y torneos (tabla, calendario, inscripción)',
      'Marcador en vivo y estadísticas del partido',
      'Reseñas y calificaciones de canchas y árbitros',
    ],
    chipStyle: 'bg-amber-500/20 text-amber-400',
  },
  {
    label: 'Próximamente',
    items: ['Más ciudades', 'Pagos en línea para reservas e inscripciones'],
    chipStyle: 'bg-white/10 text-white/70',
  },
]

const RoadmapSection: React.FC = () => {
  return (
    <section id="plan" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nuestro plan
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Lo que ya puedes probar hoy en la ZMG y lo que estamos terminando.
          </p>
        </div>
        <div className="space-y-6">
          {roadmap.map((group, index) => (
            <div
              key={index}
              className="bg-dark-card border border-dark-border rounded-xl p-5"
            >
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${group.chipStyle}`}>
                {group.label}
              </span>
              <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                {group.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RoadmapSection
