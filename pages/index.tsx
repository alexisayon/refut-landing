import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
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
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])
  const [additionalComment, setAdditionalComment] = useState('')

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

  const problemasOrganizadores = [
    'Dificultad para llenar canchas',
    'Gestión manual de reservas',
    'Problemas con pagos y cobros',
    'Falta de visibilidad de la cancha',
    'Cancelaciones de último momento',
    'Dificultad para encontrar árbitros',
    'Gestión de equipos y ligas',
    'Falta de datos sobre uso'
  ]

  // Función para obtener el número de usuarios registrados
  const obtenerUsuariosRegistrados = () => {
    if (typeof window !== 'undefined') {
      const existingData = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
      return existingData.length
    }
    return 0
  }

  // Cargar contador al montar el componente
  useEffect(() => {
    setUsuariosRegistrados(obtenerUsuariosRegistrados())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Guardar datos en localStorage
    const formDataKey = `refut_early_access_${Date.now()}`
    const formDataWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: formDataKey,
      source: 'landing_page',
      selectedProblems: selectedProblems,
      additionalComment: additionalComment
    }
    
    // Guardar registro individual
    localStorage.setItem(formDataKey, JSON.stringify(formDataWithTimestamp))
    
    // Guardar en lista de registros
    const existingData = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
    existingData.push(formDataWithTimestamp)
    localStorage.setItem('refut_early_access_list', JSON.stringify(existingData))
    
    console.log('📊 Datos guardados:', {
      individual: formDataWithTimestamp,
      totalRegistros: existingData.length
    })
    
    // Actualizar contador de usuarios registrados
    setUsuariosRegistrados(existingData.length)
    
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
      setSelectedProblems([])
      setAdditionalComment('')
    }, 3000)
  }

  const toggleProblema = (problema: string) => {
    const currentProblems: string[] = formData.problemasPrincipales as string[]
    const nuevosProblemas: string[] = currentProblems.includes(problema)
      ? currentProblems.filter((p: string) => p !== problema)
      : [...currentProblems, problema]
    setFormData({...formData, problemasPrincipales: nuevosProblemas})
  }

  const toggleProblemChecklist = (problema: string) => {
    setSelectedProblems(prev => 
      prev.includes(problema) 
        ? prev.filter(p => p !== problema)
        : [...prev, problema]
    )
  }

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  return (
    <>
      <Head>
        <title>ReFut - Construyamos Juntos la Comunidad del Fútbol Amateur en México</title>
        <meta name="description" content="Únete a la beta de ReFut y ayúdanos a crear la comunidad que el fútbol amateur necesita en México. Estamos construyendo la plataforma contigo." />
        <meta name="keywords" content="fútbol amateur México, validación mercado, beta testing, comunidad futbolística, cocreación producto" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ReFut - Construyamos Juntos la Comunidad del Fútbol Amateur" />
        <meta property="og:description" content="Únete a la beta de ReFut y ayúdanos a crear la comunidad que el fútbol amateur necesita en México." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReFut - Construyamos Juntos la Comunidad del Fútbol Amateur" />
        <meta name="twitter:description" content="Únete a la beta de ReFut y ayúdanos a crear la comunidad que el fútbol amateur necesita en México." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-green-600">ReFut</h1>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#proposito" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Propósito</a>
                  <a href="#problemas" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Problemas</a>
                  <a href="#estado" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Estado</a>
                  <a href="#faq" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
                  <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Únete a la Beta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <HeroSection usuariosRegistrados={usuariosRegistrados} onShowForm={() => setMostrarFormulario(true)} />

        {/* Purpose Section */}
        <PurposeSection />

        {/* Problems Checklist */}
        <ProblemsChecklist 
          problemasPrincipales={problemasPrincipales}
          problemasOrganizadores={problemasOrganizadores}
          selectedProblems={selectedProblems}
          toggleProblemChecklist={toggleProblemChecklist}
          additionalComment={additionalComment}
          setAdditionalComment={setAdditionalComment}
        />

        {/* Project Status */}
        <ProjectStatus />

        {/* Early Benefits */}
        <EarlyBenefits />

        {/* Honest Testimonials */}
        <HonestTestimonials />

        {/* Cocreation Call */}
        <CocreationCall />

        {/* Early Access Form */}
        <EarlyAccessForm 
          formData={formData}
          setFormData={setFormData}
          mostrarFormulario={mostrarFormulario}
          setMostrarFormulario={setMostrarFormulario}
          formularioEnviado={formularioEnviado}
          problemasPrincipales={problemasPrincipales}
          toggleProblema={toggleProblema}
          handleSubmit={handleSubmit}
        />

        {/* FAQ Section */}
        <FAQSection faqOpen={faqOpen} toggleFaq={toggleFaq} />

        {/* Direct Contact */}
        <DirectContact />

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

// ===== COMPONENTES MODULARES =====

// Hero Section Component
const HeroSection = ({ usuariosRegistrados, onShowForm }: { usuariosRegistrados: number, onShowForm: () => void }) => {
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
          Únete a la beta de ReFut y ayúdanos a crear la plataforma que el fútbol amateur necesita. 
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

        {/* Banner de Validación */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-orange-800">
                <strong>🔍 Fase de Validación:</strong> Estamos buscando los primeros usuarios para construir ReFut junto a ellos. 
                Tu opinión y experiencia son fundamentales para crear la solución ideal.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contador de Usuarios Registrados */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">
                <strong>👥 {usuariosRegistrados} personas</strong> ya se unieron a nuestra comunidad beta
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onShowForm}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            🚀 Únete a la Beta Gratuita
          </button>
          <a 
            href="#problemas"
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            📋 Cuéntanos tus Problemas
          </a>
        </div>
      </div>
    </section>
  )
}

// Purpose Section Component
const PurposeSection = () => {
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
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Identificamos Problemas Reales</h3>
            <p className="text-gray-600">
              Queremos conocer los dolores específicos que enfrentas como jugador, organizador o dueño de cancha.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cocreación Activa</h3>
            <p className="text-gray-600">
              Tu feedback directo influye en cada decisión de diseño y funcionalidad de ReFut.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
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

// Problems Checklist Component
const ProblemsChecklist = ({ 
  problemasPrincipales, 
  problemasOrganizadores, 
  selectedProblems, 
  toggleProblemChecklist, 
  additionalComment, 
  setAdditionalComment 
}: any) => {
  return (
    <section id="problemas" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ayúdanos a Entender tus Problemas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selecciona los problemas que más te afectan. Esta información es crucial para construir 
            la solución que realmente necesitas.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Problemas de Jugadores */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-green-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Como Jugador
              </h3>
              <div className="space-y-3">
                {problemasPrincipales.map((problema: string, index: number) => (
                  <label key={index} className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedProblems.includes(problema)}
                      onChange={() => toggleProblemChecklist(problema)}
                      className="mt-1 mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{problema}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Problemas de Organizadores */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                Como Organizador/Dueño de Cancha
              </h3>
              <div className="space-y-3">
                {problemasOrganizadores.map((problema: string, index: number) => (
                  <label key={index} className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedProblems.includes(problema)}
                      onChange={() => toggleProblemChecklist(problema)}
                      className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{problema}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Comentario Adicional */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ¿Hay algún problema específico que no aparece arriba? Cuéntanos más detalles:
            </label>
            <textarea
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
              placeholder="Describe cualquier problema adicional que enfrentas en el fútbol amateur..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-2">
              Tu experiencia nos ayuda a crear la solución perfecta para todos
            </p>
          </div>

          {/* Resumen de Selección */}
          {selectedProblems.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Seleccionaste {selectedProblems.length} problema(s):</strong> {selectedProblems.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Project Status Component
const ProjectStatus = () => {
  const statusItems = [
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
      progress: 60,
      color: "blue"
    },
    {
      phase: "Desarrollo Técnico",
      status: "Iniciando",
      description: "Programación de la plataforma con enfoque en MVP",
      progress: 30,
      color: "purple"
    },
    {
      phase: "Beta Privada",
      status: "Próximamente",
      description: "Pruebas con usuarios reales en Enero 2025",
      progress: 0,
      color: "orange"
    }
  ]

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
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    item.color === 'green' ? 'bg-green-500' :
                    item.color === 'blue' ? 'bg-blue-500' :
                    item.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.phase}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'En Progreso' ? 'bg-green-100 text-green-800' :
                  item.status === 'Iniciando' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    item.color === 'green' ? 'bg-green-500' :
                    item.color === 'blue' ? 'bg-blue-500' :
                    item.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}
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

// Early Benefits Component
const EarlyBenefits = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Acceso Prioritario",
      description: "Sé de los primeros en probar ReFut cuando esté listo"
    },
    {
      icon: "💬",
      title: "Participación Directa",
      description: "Influencia real en el desarrollo y diseño de funcionalidades"
    },
    {
      icon: "🎁",
      title: "Beneficios Exclusivos",
      description: "Descuentos especiales y funciones premium gratuitas"
    },
    {
      icon: "🏆",
      title: "Sorteos y Premios",
      description: "Participa en sorteos exclusivos para la comunidad beta"
    },
    {
      icon: "👥",
      title: "Red de Contactos",
      description: "Conecta con otros jugadores y organizadores apasionados"
    },
    {
      icon: "📊",
      title: "Reportes de Progreso",
      description: "Recibe actualizaciones exclusivas sobre el desarrollo"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Honest Testimonials Component
const HonestTestimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pronto Compartiremos Historias Reales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos construyendo relaciones auténticas con nuestra comunidad. 
            Las historias reales llegarán cuando tengamos usuarios usando ReFut.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🚧</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Construyendo Historias Auténticas
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              No queremos inventar testimonios. Preferimos construir relaciones reales 
              y compartir experiencias genuinas cuando tengamos usuarios usando ReFut.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                "¿Quieres ser parte de las primeras historias reales de ReFut? 
                Únete a nuestra beta y ayúdanos a crear experiencias auténticas."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Cocreation Call Component
const CocreationCall = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Construyamos Juntos la Solución Ideal
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Tu experiencia y feedback son la base de ReFut. No estamos construyendo una app más, 
            estamos creando la comunidad que el fútbol amateur necesita en México.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-200 mb-2">Tu Voz</div>
              <div className="text-sm opacity-90">Cuenta Realmente</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-200 mb-2">Tu Experiencia</div>
              <div className="text-sm opacity-90">Moldea el Producto</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-200 mb-2">Tu Comunidad</div>
              <div className="text-sm opacity-90">Crece Contigo</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              🚀 Únete Ahora
            </button>
            <a href="#problemas" className="bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold border border-white/30 hover:bg-white/30 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              📋 Cuéntanos tus Problemas
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Early Access Form Component
const EarlyAccessForm = ({ 
  formData, 
  setFormData, 
  mostrarFormulario, 
  setMostrarFormulario, 
  formularioEnviado, 
  problemasPrincipales, 
  toggleProblema, 
  handleSubmit 
}: any) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Únete a la Beta de ReFut
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Sé parte de los primeros en construir la comunidad del fútbol amateur en México
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Acceso Beta Gratuito
            </h3>
            <p className="text-gray-600">
              Beta privada disponible en <strong>Enero 2025</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tu ubicación (ciudad, estado)"
                value={formData.ubicacion}
                onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <select
                value={formData.nivelJuego}
                onChange={(e) => setFormData({...formData, nivelJuego: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona tu nivel</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Experto">Experto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
                ¿Cuál es tu mayor reto en el fútbol amateur? (Campo obligatorio)
              </label>
              <textarea
                value={formData.otrasProblematicas}
                onChange={(e) => setFormData({...formData, otrasProblematicas: e.target.value})}
                placeholder="Describe el problema más importante que enfrentas al jugar fútbol amateur..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
                rows={3}
                required
              />
              <p className="text-xs text-gray-500 mt-2 text-left">
                Esta información es crucial para construir la solución que necesitas
              </p>
            </div>

            <div className="flex items-center justify-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.interesEarlyAccess}
                  onChange={(e) => setFormData({...formData, interesEarlyAccess: e.target.checked})}
                  className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Quiero recibir actualizaciones sobre el desarrollo y acceso prioritario
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {formularioEnviado ? '✅ ¡Te Uniste a la Beta!' : '🚀 Unirme a la Beta'}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500">
            <p>✅ Acceso gratuito a la beta</p>
            <p>✅ Participación directa en el desarrollo</p>
            <p>✅ Beneficios exclusivos para early adopters</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// FAQ Section Component
const FAQSection = ({ faqOpen, toggleFaq }: { faqOpen: number | null, toggleFaq: (index: number) => void }) => {
  const faqs = [
    {
      question: "¿Cuándo estará disponible ReFut?",
      answer: "ReFut estará disponible en su versión beta privada en Enero 2025. Los usuarios registrados en acceso temprano serán los primeros en probar la aplicación."
    },
    {
      question: "¿Es gratis usar ReFut?",
      answer: "Sí, ReFut será gratuito para funciones básicas como buscar canchas, organizar partidos y conectarse con otros jugadores. Habrá funciones premium opcionales para estadísticas avanzadas y torneos exclusivos."
    },
    {
      question: "¿En qué ciudades estará disponible inicialmente?",
      answer: "ReFut comenzará en la Zona Metropolitana de Guadalajara, Jalisco, con planes de expansión a otras ciudades mexicanas según la demanda y crecimiento de la comunidad."
    },
    {
      question: "¿Cómo puedo influir en el desarrollo de ReFut?",
      answer: "Al unirte a la beta, tu feedback directo influye en cada decisión de diseño y funcionalidad. Recibirás encuestas, podrás probar nuevas características y participar en sesiones de feedback."
    },
    {
      question: "¿Qué beneficios obtengo al unirme temprano?",
      answer: "Acceso prioritario a la beta, participación directa en el desarrollo, descuentos especiales, funciones premium gratuitas y participación en sorteos exclusivos para la comunidad beta."
    }
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Resolvemos las dudas más comunes sobre ReFut y nuestra beta
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${faqOpen === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {faqOpen === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Direct Contact Component
const DirectContact = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ¿Tienes Sugerencias o Dudas?
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Contáctanos directamente. Tu opinión es valiosa para nosotros.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-green-50 p-6 rounded-xl">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Chatea directamente con nosotros</p>
            <a 
              href="https://wa.me/5213310475942" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Enviar Mensaje
            </a>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Escríbenos un correo detallado</p>
            <a 
              href="mailto:refut@gmail.com" 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Enviar Email
            </a>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instagram</h3>
            <p className="text-gray-600 mb-4">Síguenos para actualizaciones</p>
            <a 
              href="https://instagram.com/refut.mx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Seguir
            </a>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">¿Prefieres hablar por teléfono?</h3>
          <p className="text-gray-600 mb-6">
            Si tienes muchas ideas o quieres una conversación más profunda, 
            podemos coordinar una llamada para escuchar tus sugerencias.
          </p>
          <a 
            href="https://wa.me/5213310475942?text=Hola%2C%20me%20gustaría%20coordinar%20una%20llamada%20para%20hablar%20sobre%20ReFut" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Coordinar Llamada
          </a>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-green-400 mb-4">ReFut</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Construyendo la comunidad del fútbol amateur en México. 
              Tu voz, tu experiencia, tu comunidad.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/5213310475942" className="text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
              <a href="https://instagram.com/refut.mx" className="text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-3.323 9.281c-2.448 0-4.448-2-4.448-4.448s2-4.448 4.448-4.448 4.448 2 4.448 4.448-2 4.448-4.448 4.448z"/>
                </svg>
              </a>
              <a href="mailto:refut@gmail.com" className="text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Proyecto</h4>
            <ul className="space-y-2">
              <li><a href="#proposito" className="text-gray-300 hover:text-white transition-colors">Propósito</a></li>
              <li><a href="#problemas" className="text-gray-300 hover:text-white transition-colors">Problemas</a></li>
              <li><a href="#estado" className="text-gray-300 hover:text-white transition-colors">Estado</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Beta Testing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ayuda</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ReFut. Todos los derechos reservados. Hecho con ❤️ en México.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Home