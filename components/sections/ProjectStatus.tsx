import React from 'react'

interface StatusItem {
  phase: string
  status: string
  description: string
  progress: number
  color: 'green' | 'blue' | 'purple' | 'orange'
}

const ProjectStatus: React.FC = () => {
  const statusItems: StatusItem[] = [
    {
      phase: "Validación de Necesidades",
      status: "En Progreso",
      description: "Recopilando problemas reales de jugadores y organizadores",
      progress: 80,
      color: "green"
    },
    {
      phase: "Diseño de Solución",
      status: "En Progreso", 
      description: "Definiendo funcionalidades basadas en feedback real",
      progress: 70,
      color: "blue"
    },
    {
      phase: "Desarrollo Técnico",
      status: "Iniciando",
      description: "Programación de la plataforma con enfoque en MVP",
      progress: 60,
      color: "purple"
    },
    {
      phase: "Beta Privada",
      status: "Próximamente",
      description: "Pruebas con usuarios reales en Enero 2026",
      progress: 0,
      color: "orange"
    }
  ]

  const getColorClasses = (color: StatusItem['color']) => {
    const colorMap = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    }
    return colorMap[color]
  }

  const getStatusClasses = (status: string) => {
    if (status === 'En Progreso') return 'bg-green-100 text-green-800'
    if (status === 'Iniciando') return 'bg-blue-100 text-blue-800'
    return 'bg-orange-100 text-orange-800'
  }

  return (
    <section id="estado" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Estado del Proyecto
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparencia total sobre nuestro progreso. Te mantenemos informado de cada paso.
          </p>
        </div>
        
        <div className="space-y-8">
          {statusItems.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${getColorClasses(item.color)}`}></div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.phase}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getColorClasses(item.color)}`}
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{item.progress}% completado</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectStatus
