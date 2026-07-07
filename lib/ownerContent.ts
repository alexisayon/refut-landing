export const ownerFaqs = [
  {
    question: '¿Cuánto cuesta usar ReFut como dueño o organizador?',
    answer:
      'Los planes Socio Cancha, Socio Complejo y Socio Liga / Torneo tienen tarifas mensuales según tu operación. Consulta la sección de Membresías para ver precios de referencia e incluidos. El monto final se confirma contigo según sedes, canchas y competencias activas.',
  },
  {
    question: '¿Puedo crear mi cuenta de socio directamente desde la web?',
    answer:
      'No. El acceso al panel de socio es por invitación: trabajamos con canchas, complejos y organizadores que encajan con nuestra red en la ZMG. Escríbenos, evaluamos tu operación y, si hay fit, te damos de alta con el plan que corresponda.',
  },
  {
    question: '¿Necesito instalar una app?',
    answer:
      'No. ReFut funciona desde el navegador en celular y computadora. Tu equipo puede entrar al panel con su cuenta sin descargar nada.',
  },
  {
    question: '¿Puedo administrar varias sucursales o canchas?',
    answer:
      'Sí. El panel está pensado para dueños con una o varias canchas y para complejos deportivos con múltiples sucursales. Puedes organizar cada espacio por separado.',
  },
  {
    question: '¿Cómo funcionan las inscripciones a ligas y torneos?',
    answer:
      'Puedes abrir inscripciones para equipos, dar seguimiento desde el panel y publicar tu torneo con una página pública para que los equipos se registren. Los pagos en línea están en desarrollo.',
  },
  {
    question: '¿Puedo invitar a mi staff (coorganizadores, anotadores)?',
    answer:
      'Sí. Puedes invitar coorganizadores, anotadores y usuarios de solo lectura para que te ayuden a operar tu liga o torneo sin compartir tu contraseña.',
  },
  {
    question: '¿Mi torneo tiene página pública?',
    answer:
      'Sí. Cada competencia puede tener su micrositio público con branding, tabla de posiciones, resultados y próximos partidos. También puedes embeber la tabla en tu sitio web.',
  },
  {
    question: '¿Qué tan rápido puedo empezar?',
    answer:
      'Primero platicamos contigo para entender tu cancha, complejo o torneo. Si avanzamos, el onboarding suele tomar de uno a tres días hábiles según la complejidad de tu operación.',
  },
  {
    question: '¿ReFut sirve solo para canchas o también para ligas?',
    answer:
      'Para ambos. Dueños de canchas gestionan reservas y operación; organizadores de ligas y torneos manejan equipos, partidos, tabla, árbitros y marketing desde el mismo ecosistema.',
  },
]

export interface OwnerMembershipPlan {
  id: string
  name: string
  tagline: string
  price: string
  priceNote: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

export const ownerMembershipPlans: OwnerMembershipPlan[] = [
  {
    id: 'cancha',
    name: 'Socio Cancha',
    tagline: 'Para dueños de una cancha o espacio deportivo',
    price: '$1,499',
    priceNote: 'MXN / mes · 1 sede',
    badge: 'Operación básica',
    features: [
      'Panel de socio y cuenta de administración',
      'Roles de staff (coorganizador, anotador, lectura)',
      'Centro de notificaciones',
      'Reservas y calendario (en desarrollo)',
      'Check-in y operación del día (en desarrollo)',
      'Perfil público de tu cancha en ReFut',
    ],
  },
  {
    id: 'complejo',
    name: 'Socio Complejo',
    tagline: 'Para complejos con varias sucursales o canchas',
    price: 'Desde $3,999',
    priceNote: 'MXN / mes · según número de sedes',
    highlighted: true,
    badge: 'Más completo',
    features: [
      'Todo lo de Socio Cancha',
      'Multi-sucursal y multi-cancha',
      'Dashboard operativo e ingresos (en desarrollo)',
      'Finanzas y control de adeudos (en desarrollo)',
      'Prioridad en soporte y onboarding',
      'Configuración asistida con el equipo ReFut',
    ],
  },
  {
    id: 'liga',
    name: 'Socio Liga / Torneo',
    tagline: 'Para organizadores de ligas y torneos amateur',
    price: '$2,499',
    priceNote: 'MXN / mes · por competencia activa',
    badge: 'Competencia',
    features: [
      'Gestión de equipos, partidos y tabla en vivo',
      'Árbitros con importación CSV',
      'Micrositio público con tu branding',
      'Widgets embebibles y patrocinadores',
      'Inscripciones y staff de competencia',
      'Llaves y modo presentación (en desarrollo)',
    ],
  },
]

export const ownerDemoSlides = [
  {
    id: 'panel',
    title: 'Panel de control',
    description: 'Resumen operativo de reservas, ocupación e ingresos en un solo lugar.',
    image: '/screenshots/owner/panel.svg',
  },
  {
    id: 'tabla',
    title: 'Tabla y resultados',
    description: 'Tabla en vivo, calendario de partidos y resultados actualizados al instante.',
    image: '/screenshots/owner/tabla.svg',
  },
  {
    id: 'publica',
    title: 'Página pública del torneo',
    description: 'Micrositio con tu branding para compartir inscripciones, tabla y próximos partidos.',
    image: '/screenshots/owner/publica.svg',
  },
  {
    id: 'patrocinadores',
    title: 'Patrocinadores',
    description: 'Monetiza con niveles oro, plata y bronce, y mide clics desde el panel.',
    image: '/screenshots/owner/patrocinadores.svg',
  },
]
