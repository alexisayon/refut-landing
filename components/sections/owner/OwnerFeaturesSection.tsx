import React from 'react'
import {
  FaBuilding,
  FaCalendarAlt,
  FaTrophy,
  FaBullhorn,
  FaUserCog,
  FaUsers,
  FaGavel,
  FaSitemap,
  FaGlobe,
  FaCode,
  FaHandshake,
  FaBell,
  FaIdCard,
} from 'react-icons/fa'

type FeatureStatus = 'Disponible' | 'En desarrollo'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  lead: string
  status: FeatureStatus
}

interface Category {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  features: FeatureItem[]
}

const categories: Category[] = [
  {
    id: 'canchas',
    title: 'Gestión de canchas',
    description: 'Opera reservas, ocupación y finanzas de tu espacio deportivo.',
    icon: <FaBuilding className="w-7 h-7 text-refut-green" />,
    features: [
      {
        icon: <FaCalendarAlt className="w-5 h-5 text-refut-green" />,
        title: 'Dashboard operativo',
        lead: 'Reservas del día, ocupación e ingresos en un vistazo.',
        status: 'En desarrollo',
      },
      {
        icon: <FaCalendarAlt className="w-5 h-5 text-refut-green" />,
        title: 'Reservas y calendario',
        lead: 'Agenda multi-cancha sin choques de horario.',
        status: 'En desarrollo',
      },
      {
        icon: <FaUsers className="w-5 h-5 text-refut-green" />,
        title: 'Check-in y operación',
        lead: 'Confirma llegadas y controla el día en cancha.',
        status: 'En desarrollo',
      },
      {
        icon: <FaSitemap className="w-5 h-5 text-refut-green" />,
        title: 'Multi-sucursal',
        lead: 'Administra varias sedes, fotos y amenidades.',
        status: 'En desarrollo',
      },
      {
        icon: <FaIdCard className="w-5 h-5 text-refut-green" />,
        title: 'Finanzas y adeudos',
        lead: 'Seguimiento de pagos pendientes y vencidos.',
        status: 'En desarrollo',
      },
    ],
  },
  {
    id: 'ligas',
    title: 'Ligas y torneos',
    description: 'Organiza competencias sin planillas ni grupos de WhatsApp.',
    icon: <FaTrophy className="w-7 h-7 text-refut-green" />,
    features: [
      {
        icon: <FaTrophy className="w-5 h-5 text-refut-green" />,
        title: 'Ligas, torneos e inscripciones',
        lead: 'Crea competencias y recibe equipos desde el panel.',
        status: 'En desarrollo',
      },
      {
        icon: <FaCalendarAlt className="w-5 h-5 text-refut-green" />,
        title: 'Partidos y tabla en vivo',
        lead: 'Calendario, resultados y posiciones actualizadas.',
        status: 'En desarrollo',
      },
      {
        icon: <FaUsers className="w-5 h-5 text-refut-green" />,
        title: 'Roles de staff',
        lead: 'Invita coorganizadores, anotadores y lectura.',
        status: 'Disponible',
      },
      {
        icon: <FaGavel className="w-5 h-5 text-refut-green" />,
        title: 'Árbitros con import CSV',
        lead: 'Registra y asigna árbitros en lote.',
        status: 'Disponible',
      },
      {
        icon: <FaSitemap className="w-5 h-5 text-refut-green" />,
        title: 'Llaves y presentación',
        lead: 'Brackets y modo presentación para el día del torneo.',
        status: 'En desarrollo',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing y visibilidad',
    description: 'Dale presencia profesional a tu torneo o complejo.',
    icon: <FaBullhorn className="w-7 h-7 text-refut-green" />,
    features: [
      {
        icon: <FaGlobe className="w-5 h-5 text-refut-green" />,
        title: 'Micrositio público',
        lead: 'Tu torneo con URL propia, branding y tabla.',
        status: 'Disponible',
      },
      {
        icon: <FaCode className="w-5 h-5 text-refut-green" />,
        title: 'Widgets embebibles',
        lead: 'Inserta tabla y próximos partidos en tu web.',
        status: 'Disponible',
      },
      {
        icon: <FaHandshake className="w-5 h-5 text-refut-green" />,
        title: 'Patrocinadores',
        lead: 'Niveles oro, plata y bronce con analítica de clics.',
        status: 'Disponible',
      },
    ],
  },
  {
    id: 'cuenta',
    title: 'Cuenta y configuración',
    description: 'Tu membresía de socio y notificaciones centralizadas.',
    icon: <FaUserCog className="w-7 h-7 text-refut-green" />,
    features: [
      {
        icon: <FaIdCard className="w-5 h-5 text-refut-green" />,
        title: 'Membresía de socio',
        lead: 'Gestiona tu cuenta y acceso al panel.',
        status: 'Disponible',
      },
      {
        icon: <FaBell className="w-5 h-5 text-refut-green" />,
        title: 'Centro de notificaciones',
        lead: 'Alertas de reservas, partidos y actividad.',
        status: 'Disponible',
      },
    ],
  },
]

const statusClass = (status: FeatureStatus) =>
  status === 'Disponible'
    ? 'bg-refut-green/20 text-refut-green'
    : 'bg-white/10 text-white/70'

const OwnerFeaturesSection: React.FC = () => {
  return (
    <section id="funciones-duenos" className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Todo lo que puedes hacer como socio ReFut
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Herramientas para dueños de cancha, complejos deportivos y organizadores de ligas y torneos.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.id} className="bg-dark-surface border border-dark-border rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                {category.icon}
                <div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <p className="text-white/70 mt-1">{category.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-refut-green/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      {feature.icon}
                      <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${statusClass(feature.status)}`}>
                        {feature.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.lead}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OwnerFeaturesSection
