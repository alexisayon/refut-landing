import React from 'react'

interface HeroSectionProps {
  usuariosRegistrados: number
  onShowForm: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ usuariosRegistrados, onShowForm }) => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fadeIn">
          Construyamos Juntos la{' '}
          <span className="text-green-600">Comunidad del Fútbol Amateur</span>{' '}
          en México
        </h1>
        
        {/* Subtítulo */}
        <h2 className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto font-light">
          Únete a la beta de ReFut donde podrás encontrar canchas, organizar partidos y conectarte con otros jugadores.
          Estamos construyendo la solución contigo, no para ti.
        </h2> 

        {/* Imagen/Ilustración */}
        <div className="mb-12 animate-fadeIn">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Jugadores de fútbol amateur disfrutando un partido en cancha"
            className="mx-auto rounded-2xl shadow-2xl w-full max-w-4xl h-64 md:h-96 object-cover"
          />
        </div>
        
        {/* Contador de Usuarios Registrados */}
        {usuariosRegistrados > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  <strong>¡Ya somos {usuariosRegistrados} personas!</strong> Únete a la comunidad que está construyendo el futuro del fútbol amateur.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#formulario"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Únete a la Beta 🚀
          </a>
          <button
            onClick={onShowForm}
            className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Quiero Probar ReFut ⚽
          </button>
        </div>

        {/* Texto de Validación */}
        <div className="mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
          <p>
            <strong>🔍 Fase de Validación:</strong> Estamos buscando los primeros usuarios para construir ReFut junto a ellos. 
            Tu opinión y experiencia son fundamentales para crear la solución ideal.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
