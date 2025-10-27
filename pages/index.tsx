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

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  return (
    <>
      <Head>
        <title>ReFut - Tu Comunidad del Fútbol Amateur en México | Reserva Canchas y Organiza Partidos</title>
        <meta name="description" content="ReFut es la plataforma que revoluciona el fútbol amateur en México. Encuentra canchas, organiza partidos, conecta con jugadores y disfruta del deporte más hermoso. ¡Únete a nuestra comunidad!" />
        <meta name="keywords" content="fútbol amateur México, reserva canchas, organizar partidos, comunidad futbolística, ligas locales, torneos amateur, jugadores fútbol, canchas públicas, canchas privadas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ReFut - Tu Comunidad del Fútbol Amateur en México" />
        <meta property="og:description" content="Revoluciona tu experiencia futbolística. Encuentra canchas, organiza partidos y conecta con jugadores en México." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReFut - Tu Comunidad del Fútbol Amateur en México" />
        <meta name="twitter:description" content="Revoluciona tu experiencia futbolística. Encuentra canchas, organiza partidos y conecta con jugadores en México." />
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
                  <a href="#beneficios" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Beneficios</a>
                  <a href="#testimonios" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Testimonios</a>
                  <a href="#faq" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
                  <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Acceso Temprano
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <HeroSection usuariosRegistrados={usuariosRegistrados} onShowForm={() => setMostrarFormulario(true)} />

        {/* Video Demo */}
        <VideoDemo />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Testimonials */}
        <Testimonials />

        {/* Social Proof Banner */}
        <SocialProofBanner usuariosRegistrados={usuariosRegistrados} />

        {/* Partners Section */}
        <PartnersSection />

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

        {/* Contact Section */}
        <ContactSection />

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
          ReFut: Tu{' '}
          <span className="text-green-600">comunidad del fútbol amateur</span>{' '}
          en México
        </h1>
        
        {/* Subtítulo */}
        <h2 className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto font-light">
          Revoluciona tu experiencia futbolística. Encuentra canchas, organiza partidos, 
          conecta con jugadores y disfruta del deporte más hermoso del mundo.
        </h2>

        {/* Imagen/Ilustración */}
        <div className="mb-12 animate-fadeIn">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Jugadores de fútbol amateur disfrutando un partido en cancha"
            className="mx-auto rounded-2xl shadow-2xl w-full max-w-4xl h-64 md:h-96 object-cover"
          />
        </div>

        {/* Banner de Desarrollo */}
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
                <strong>👥 {usuariosRegistrados} jugadores</strong> ya se han registrado para el acceso temprano
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
            🚀 Obtener Acceso Temprano Gratis
          </button>
          <button 
            disabled
            className="bg-gray-400 text-white px-8 py-4 rounded-lg text-lg font-semibold cursor-not-allowed"
            title="En desarrollo - Próximamente disponible"
          >
            📱 Descargar App
          </button>
        </div>
      </div>
    </section>
  )
}

// Video Demo Component
const VideoDemo = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Ve ReFut en Acción
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Descubre cómo ReFut está transformando la experiencia del fútbol amateur en México
        </p>
        
        {/* Video Container */}
        <div className="relative aspect-video bg-gray-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Demo de ReFut</h3>
              <p className="text-gray-600">Próximamente disponible</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Benefits Section Component
const BenefitsSection = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Mapa Interactivo",
      description: "Encuentra canchas cercanas con filtros por precio, disponibilidad y amenidades en tiempo real."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Reserva Online",
      description: "Reserva canchas al instante, confirma jugadores y gestiona pagos de forma segura y transparente."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: "Retas Cerca de Ti",
      description: "Descubre partidos organizados en tu zona y únete a retas con jugadores de tu nivel y ubicación."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Chat en la App",
      description: "Comunícate con tu equipo, organizadores y otros jugadores directamente desde la aplicación."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Marcador en Vivo",
      description: "Sigue el marcador de retas cercanas en tiempo real, con estadísticas y eventos del partido."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Torneos Locales",
      description: "Participa en torneos organizados, ligas locales y eventos especiales de la comunidad futbolística."
    }
  ]

  return (
    <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir ReFut?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ReFut no es solo otra app de deportes. Es tu compañero completo para vivir el fútbol amateur como nunca antes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-green-50 p-3 rounded-lg mr-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      city: "Guadalajara, Jalisco",
      quote: "ReFut cambió completamente cómo organizamos nuestros partidos. Antes era un caos con WhatsApp, ahora todo está centralizado y es súper fácil.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Ana Rodríguez",
      city: "Zapopan, Jalisco", 
      quote: "Finalmente puedo encontrar canchas cerca de mi casa sin tener que llamar a 10 lugares diferentes. La app es intuitiva y siempre encuentro lo que busco.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ]

  return (
    <section id="testimonios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-xl text-gray-600">
            Jugadores reales compartiendo sus experiencias con ReFut
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
              <div className="absolute -top-4 left-8">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <blockquote className="text-lg text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar}
                  alt={`Foto de ${testimonial.name}`}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Social Proof Banner Component
const SocialProofBanner = ({ usuariosRegistrados }: { usuariosRegistrados: number }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Únete a la Revolución del Fútbol Amateur
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-200">+{usuariosRegistrados}</div>
              <div className="text-sm opacity-90">Jugadores Registrados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-200">27</div>
              <div className="text-sm opacity-90">Canchas Activas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-200">150+</div>
              <div className="text-sm opacity-90">Partidos Organizados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Partners Section Component
const PartnersSection = () => {
  const partners = [
    { name: "Canchas El Dorado", logo: "🏟️" },
    { name: "Complejo Deportivo Norte", logo: "⚽" },
    { name: "Campo Deportivo Sur", logo: "🥅" },
    { name: "Canchas Centrales", logo: "🏃" }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Nuestros Aliados
          </h2>
          <p className="text-gray-600">
            Canchas y complejos deportivos que confían en ReFut
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-50 p-6 rounded-xl mb-4">
                <div className="text-4xl mb-2">{partner.logo}</div>
                <div className="text-sm font-medium text-gray-700">{partner.name}</div>
              </div>
            </div>
          ))}
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
          ¿Listo para Revolucionar tu Fútbol?
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Únete a la lista de acceso temprano y sé de los primeros en experimentar ReFut
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Acceso Temprano Gratuito
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
                ¿Qué problemas enfrentas al jugar fútbol? (Selecciona todos los que apliquen)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {problemasPrincipales.map((problema: string, index: number) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.problemasPrincipales.includes(problema)}
                      onChange={() => toggleProblema(problema)}
                      className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{problema}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                ¿Tienes otros problemas específicos?
              </label>
              <textarea
                value={formData.otrasProblematicas}
                onChange={(e) => setFormData({...formData, otrasProblematicas: e.target.value})}
                placeholder="Cuéntanos sobre otros problemas que enfrentas al jugar fútbol..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
                rows={3}
              />
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
                  Quiero recibir notificaciones sobre el lanzamiento y acceso temprano
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {formularioEnviado ? '✅ ¡Registrado Exitosamente!' : '🚀 Obtener Acceso Temprano'}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500">
            <p>✅ Acceso gratuito a la beta</p>
            <p>✅ Notificaciones exclusivas</p>
            <p>✅ Descuentos especiales para early adopters</p>
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
      question: "¿Cómo funciona el sistema de reservas?",
      answer: "Puedes buscar canchas por ubicación, precio y disponibilidad, reservar directamente desde la app, invitar jugadores y gestionar pagos de forma segura. Todo integrado en una sola plataforma."
    },
    {
      question: "¿Qué pasa si cancelo mi reserva?",
      answer: "Las políticas de cancelación dependen de cada cancha, pero ReFut te ayudará a gestionar cancelaciones y reembolsos de forma transparente. Siempre puedes transferir tu reserva a otro jugador."
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
            Resolvemos las dudas más comunes sobre ReFut
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

// Contact Section Component
const ContactSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Mantente Conectado
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Síguenos en redes sociales y mantente al día con las últimas novedades
        </p>

        <div className="flex justify-center space-x-8">
          <a 
            href="https://wa.me/5213310475942" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </a>
          
          <a 
            href="https://instagram.com/refut.mx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-3.323 9.281c-2.448 0-4.448-2-4.448-4.448s2-4.448 4.448-4.448 4.448 2 4.448 4.448-2 4.448-4.448 4.448z"/>
            </svg>
          </a>
          
          <a 
            href="mailto:hola@refut.mx" 
            className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Tienes preguntas?</h3>
          <p className="text-gray-600 mb-4">Contáctanos directamente</p>
          <a 
            href="mailto:refut@gmail.com" 
            className="text-green-600 font-semibold hover:text-green-700"
          >
            refut@gmail.com
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
              Revolucionando el fútbol amateur en México. Conectamos jugadores, canchas y comunidades 
              para crear la mejor experiencia futbolística.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/5213312345678" className="text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
              <a href="https://instagram.com/refut.mx" className="text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-3.323 9.281c-2.448 0-4.448-2-4.448-4.448s2-4.448 4.448-4.448 4.448 2 4.448 4.448-2 4.448-4.448 4.448z"/>
                </svg>
              </a>
              <a href="mailto:hola@refut.mx" className="text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Producto</h4>
            <ul className="space-y-2">
              <li><a href="#beneficios" className="text-gray-300 hover:text-white transition-colors">Beneficios</a></li>
              <li><a href="#testimonios" className="text-gray-300 hover:text-white transition-colors">Testimonios</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookies</a></li>
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