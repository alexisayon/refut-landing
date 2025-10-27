import React from 'react'
import { FaBolt, FaComments, FaDollarSign, FaGift, FaUsers, FaChartLine } from 'react-icons/fa'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

const EarlyBenefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: <FaBolt className="w-8 h-8 text-green-600" />,
      title: "Acceso Prioritario",
      description: "Sé de los primeros en probar ReFut cuando esté listo"
    },
    {
      icon: <FaComments className="w-8 h-8 text-green-600" />,
      title: "Participación Directa",
      description: "Influencia real en el desarrollo y diseño de funcionalidades"
    },
    {
      icon: <FaDollarSign className="w-8 h-8 text-green-600" />,
      title: "Beneficios Exclusivos",
      description: "Descuentos especiales y funciones premium gratuitas"
    },
    {
      icon: <FaGift className="w-8 h-8 text-green-600" />,
      title: "Sorteos y Premios",
      description: "Participa en sorteos exclusivos para la comunidad beta"
    },
    {
      icon: <FaUsers className="w-8 h-8 text-green-600" />,
      title: "Red de Contactos",
      description: "Conecta con otros jugadores y organizadores apasionados"
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-green-600" />,
      title: "Reportes de Progreso",
      description: "Recibe actualizaciones exclusivas sobre el desarrollo"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Beneficios Exclusivos del Registro Temprano
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Al unirte a nuestra beta, obtienes acceso a beneficios únicos que no estarán disponibles 
            para usuarios posteriores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EarlyBenefits
