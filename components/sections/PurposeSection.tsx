import React from 'react'
import { FaLightbulb, FaCog, FaUsers } from 'react-icons/fa'

const PurposeSection: React.FC = () => {
  return (
    <section id="proposito" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Estamos Construyendo la Plataforma Contigo
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            ReFut nació de nuestra propia frustración como jugadores de fútbol amateur. 
            Sabemos que existen problemas reales, pero queremos entender exactamente cuáles son los tuyos 
            para construir la solución perfecta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLightbulb className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Identificamos Problemas Reales</h3>
            <p className="text-gray-600">
              Queremos conocer los dolores específicos que enfrentas como jugador, organizador o dueño de cancha.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCog className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cocreación Activa</h3>
            <p className="text-gray-600">
              Tu feedback directo influye en cada decisión de diseño y funcionalidad de ReFut.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comunidad Primero</h3>
            <p className="text-gray-600">
              Construimos una comunidad real de personas apasionadas por el fútbol amateur en México.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PurposeSection
