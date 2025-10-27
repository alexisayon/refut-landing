import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import type { FormData } from '../types'

const Home: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    ubicacion: '',
    nivelJuego: '',
    problemasPrincipales: [],
    otrasProblematicas: '',
    interesEarlyAccess: false
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [formularioEnviado, setFormularioEnviado] = useState(false)

  const problemasPrincipales = [
    'Dificultad para encontrar canchas disponibles',
    'Precios muy altos en canchas privadas',
    'Jugadores que no confirman asistencia',
    'Partidos cancelados de último momento',
    'Problemas para dividir costos',
    'Falta de árbitros capacitados',
    'Canchas en mal estado',
    'Horarios limitados'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Guardar datos en localStorage
    const formDataKey = `refut_early_access_${Date.now()}`
    const formDataWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: formDataKey,
      source: 'landing_page'
    }
    
    // Guardar registro individual
    localStorage.setItem(formDataKey, JSON.stringify(formDataWithTimestamp))
    
    // Guardar en lista de registros
    const existingData = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
    existingData.push(formDataWithTimestamp)
    localStorage.setItem('refut_early_access_list', JSON.stringify(existingData))
    
    // También guardar en una lista más simple para análisis
    const simpleData = {
      nombre: formData.nombre,
      email: formData.email,
      ubicacion: formData.ubicacion,
      nivelJuego: formData.nivelJuego,
      problemasCount: formData.problemasPrincipales.length,
      otrasProblematicas: formData.otrasProblematicas,
      interesEarlyAccess: formData.interesEarlyAccess,
      timestamp: new Date().toISOString()
    }
    
    const simpleList = JSON.parse(localStorage.getItem('refut_simple_list') || '[]')
    simpleList.push(simpleData)
    localStorage.setItem('refut_simple_list', JSON.stringify(simpleList))
    
    console.log('📊 Datos guardados:', {
      individual: formDataWithTimestamp,
      totalRegistros: existingData.length,
      simpleList: simpleList.length
    })
    
    setFormularioEnviado(true)
    setTimeout(() => {
      setFormularioEnviado(false)
      setMostrarFormulario(false)
      setFormData({
        nombre: '',
        email: '',
        ubicacion: '',
        nivelJuego: '',
        problemasPrincipales: [],
        otrasProblematicas: '',
        interesEarlyAccess: false
      })
    }, 3000)
  }

  const toggleProblema = (problema: string) => {
    // TypeScript fix: explicitly cast to string array
    const currentProblems: string[] = formData.problemasPrincipales as string[]
    const nuevosProblemas: string[] = currentProblems.includes(problema)
      ? currentProblems.filter((p: string) => p !== problema)
      : [...currentProblems, problema]
    setFormData({...formData, problemasPrincipales: nuevosProblemas})
  }

  return (
    <>
      <Head>
        <title>ReFut - El Futuro del Fútbol Amateur en México</title>
        <meta name="description" content="Únete a ReFut y revoluciona tu experiencia futbolística. Encuentra canchas, organiza partidos y conecta con jugadores en Zapopan y Guadalajara." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-green-600">ReFut</h1>
                <span className="ml-2 text-sm text-gray-500">⚽</span>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  disabled
                  className="text-gray-400 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                  title="En desarrollo - Próximamente disponible"
                >
                  Probar App
                </button>
                <button 
                  onClick={() => setMostrarFormulario(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Acceso Temprano
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              El Futuro del{' '}
              <span className="text-green-600">Fútbol Amateur</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              ReFut está revolucionando cómo los jugadores de fútbol amateur en México 
              encuentran canchas, organizan partidos y se conectan para disfrutar del deporte más hermoso.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    <strong>🚧 En Desarrollo:</strong> La aplicación está siendo construida activamente. 
                    Regístrate para obtener acceso temprano gratuito cuando esté lista.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                disabled
                className="bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-semibold cursor-not-allowed"
                title="En desarrollo - Próximamente disponible"
              >
                Probar App
              </button>
              <button 
                onClick={() => setMostrarFormulario(true)}
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Acceso Temprano Gratuito
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir ReFut?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                La solución integral para todos tus problemas futbolísticos
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mapa de Canchas</h3>
                <p className="text-gray-600">
                  Encuentra canchas públicas y privadas con filtros inteligentes, precios transparentes y disponibilidad en tiempo real.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Reservas Inteligentes</h3>
                <p className="text-gray-600">
                  Sistema de reservas con confirmaciones automáticas, gestión de jugadores y notificaciones inteligentes.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Marcador en Vivo</h3>
                <p className="text-gray-600">
                  Seguimiento en tiempo real con estadísticas, eventos del partido y gestión de árbitros.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comunidad Local</h3>
                <p className="text-gray-600">
                  Conecta con jugadores de Zapopan y Guadalajara. Encuentra equipos, organiza torneos y haz nuevos amigos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problemas Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Te identificas con estos problemas?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Si eres jugador de fútbol amateur, seguramente has enfrentado estas situaciones
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { problema: 'Canchas caras o difíciles de encontrar', icono: '🏟️' },
                { problema: 'Jugadores que no confirman asistencia', icono: '📱' },
                { problema: 'Partidos cancelados de último momento', icono: '❌' },
                { problema: 'Problemas para dividir costos', icono: '💰' },
                { problema: 'Falta de árbitros capacitados', icono: '👨‍⚖️' },
                { problema: 'Canchas en mal estado', icono: '⚠️' },
                { problema: 'Horarios limitados', icono: '⏰' },
                { problema: 'Dificultad para formar equipos', icono: '👥' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-3xl mb-3">{item.icono}</div>
                  <p className="text-gray-700 font-medium">{item.problema}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para Revolucionar tu Fútbol?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Únete a la comunidad de jugadores que ya están transformando su experiencia futbolística con ReFut.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                disabled
                className="bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-semibold cursor-not-allowed"
                title="En desarrollo - Próximamente disponible"
              >
                Probar Ahora
              </button>
              <button 
                onClick={() => setMostrarFormulario(true)}
                className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Acceso Temprano Gratuito
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">ReFut ⚽</h3>
              <p className="text-gray-400 mb-4">
                El futuro del fútbol amateur en México está aquí. ¿Estás listo?
              </p>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">Privacidad</a>
                <a href="#" className="text-gray-400 hover:text-white">Términos</a>
                <a href="#" className="text-gray-400 hover:text-white">Contacto</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Modal de Formulario */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">🎉 Acceso Temprano Gratuito</h2>
                  <button 
                    onClick={() => setMostrarFormulario(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {formularioEnviado ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Gracias por tu interés!</h3>
                    <p className="text-gray-600 mb-4">
                      Te contactaremos pronto con información sobre tu acceso temprano gratuito.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">🎁 Beneficios del Acceso Temprano:</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Acceso gratuito a funciones premium por 6 meses</li>
                        <li>• Descuentos exclusivos en reservas de canchas</li>
                        <li>• Prioridad en soporte técnico</li>
                        <li>• Invitaciones a eventos exclusivos</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <h3 className="font-medium text-green-900 mb-2">🚀 ¿Por qué ReFut?</h3>
                      <p className="text-sm text-green-800">
                        Ayúdanos a entender tus necesidades y obtén acceso gratuito a la plataforma que resolverá 
                        todos tus problemas futbolísticos en Zapopan y Guadalajara.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                        <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación *</label>
                        <select
                          value={formData.ubicacion}
                          onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                          required
                        >
                          <option value="">Selecciona tu ubicación</option>
                          <option value="zapopan">Zapopan</option>
                          <option value="guadalajara">Guadalajara</option>
                          <option value="otro">Otra ciudad</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de juego</label>
                        <select
                          value={formData.nivelJuego}
                          onChange={(e) => setFormData({...formData, nivelJuego: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Selecciona tu nivel</option>
                          <option value="principiante">Principiante</option>
                          <option value="recreativo">Recreativo</option>
                          <option value="intermedio">Intermedio</option>
                          <option value="avanzado">Avanzado</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        ¿Cuáles son tus principales problemas al jugar fútbol? (Selecciona todos los que apliquen)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {problemasPrincipales.map((problema) => (
                          <label key={problema} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.problemasPrincipales.includes(problema)}
                              onChange={() => toggleProblema(problema)}
                              className="mr-3 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{problema}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿Tienes otros problemas específicos que no aparecen arriba?
                      </label>
                      <textarea
                        value={formData.otrasProblematicas}
                        onChange={(e) => setFormData({...formData, otrasProblematicas: e.target.value})}
                        placeholder="Cuéntanos sobre otros problemas que enfrentas al jugar fútbol..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 h-24 resize-none"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tu experiencia nos ayuda a mejorar ReFut para todos los jugadores
                      </p>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interesEarlyAccess}
                        onChange={(e) => setFormData({...formData, interesEarlyAccess: e.target.checked})}
                        className="mr-3 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>Me interesa obtener acceso temprano gratuito</strong> a ReFut con funciones premium
                      </span>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setMostrarFormulario(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-medium"
                      >
                        Obtener Acceso Temprano
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Home
