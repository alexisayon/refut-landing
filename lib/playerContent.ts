export interface PlayerFaq {
  question: string
  answer: string
}

/** FAQs jugadores — alineadas con RoadmapSection (fuente de verdad de disponibilidad). */
export const playerFaqs: PlayerFaq[] = [
  {
    question: '¿Qué es ReFut?',
    answer:
      'ReFut es una plataforma web para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara. Funciona en navegador, sin instalar app, y está pensada para jugadores, organizadores y dueños de canchas.',
  },
  {
    question: '¿Dónde está disponible?',
    answer:
      'ReFut está disponible en la Zona Metropolitana de Guadalajara (ZMG), incluyendo Guadalajara, Zapopan, Tlaquepaque, Tonalá y municipios cercanos. Pronto expandiremos a más ciudades.',
  },
  {
    question: '¿Dónde puedo encontrar canchas de fútbol rápido en Guadalajara?',
    answer:
      'Con ReFut puedes buscar canchas de fútbol rápido en Guadalajara usando el mapa interactivo. Filtra por zona, precio y horario para encontrar la mejor cancha cerca de ti. Disponible en colonias como Chapalita, Oblatos, Atemajac y más.',
  },
  {
    question: '¿Puedo reservar cancha en Zapopan hoy?',
    answer:
      'Puedes explorar canchas disponibles en Zapopan y la ZMG, ver horarios de referencia y datos de contacto. Las reservas directas en la app están en marcha; mientras tanto puedes publicar partidos y coordinar con la cancha.',
  },
  {
    question: '¿ReFut funciona en Tlaquepaque y Tonalá?',
    answer:
      'Sí, ReFut cubre toda la Zona Metropolitana de Guadalajara, incluyendo Tlaquepaque y Tonalá. Puedes buscar canchas, crear partidos y organizar equipos en estos municipios.',
  },
  {
    question: '¿Cómo me registro?',
    answer:
      'Entra desde el navegador, crea cuenta con email o redes sociales y empieza a buscar canchas o partidos cerca de ti. No necesitas instalar ninguna aplicación.',
  },
  {
    question: '¿Es gratis?',
    answer:
      'Sí. Buscar canchas, crear partidos, armar equipos y confirmar asistencia son gratuitos hoy. Reservas en app, torneos avanzados y pagos en línea pueden tener costo conforme se habiliten.',
  },
]
