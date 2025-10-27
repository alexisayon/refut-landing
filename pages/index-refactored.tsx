import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { BetaService } from '../lib/betaService'

// Importar componentes refactorizados
import {
  HeroSection,
  PurposeSection,
  ProjectStatus,
  EarlyBenefits,
  EarlyAccessForm,
  Footer
} from '../components'

// Importar hook personalizado
import { useForm } from '../hooks/useForm'

const Home: NextPage = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  
  // Usar el hook personalizado para el formulario
  const {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    isSubmitting,
    setIsSubmitting,
    formularioEnviado,
    setFormularioEnviado,
    usuariosRegistrados,
    setUsuariosRegistrados,
    selectedProblems,
    setSelectedProblems,
    additionalComment,
    setAdditionalComment,
    privacyAccepted,
    setPrivacyAccepted,
    termsAccepted,
    setTermsAccepted,
    honeypot,
    setHoneypot,
    formProgress,
    achievements,
    showAchievement,
    handleSubmit,
    resetForm
  } = useForm()

  // Lista de problemas principales
  const problemasPrincipales = [
    'Dificultad para encontrar canchas disponibles',
    'Falta de organización en los partidos',
    'Problemas con el pago y división de costos',
    'Dificultad para encontrar jugadores',
    'Falta de transparencia en resultados',
    'Problemas con árbitros no capacitados',
    'Falta de comunicación entre jugadores',
    'Dificultad para reservar canchas',
    'Falta de estadísticas y seguimiento',
    'Problemas con el clima y cancelaciones'
  ]

  const problemasOrganizadores = [
    'Dificultad para gestionar reservas',
    'Falta de herramientas de organización',
    'Problemas con pagos y cobros',
    'Dificultad para encontrar árbitros',
    'Falta de comunicación con jugadores',
    'Problemas con el mantenimiento de canchas',
    'Falta de promoción y marketing',
    'Dificultad para organizar torneos',
    'Problemas con la gestión de equipos',
    'Falta de herramientas de análisis'
  ]

  // Cargar estadísticas iniciales
  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await BetaService.getPublicStats()
        setUsuariosRegistrados(stats.totalUsers)
      } catch (error) {
        console.error('Error cargando estadísticas:', error)
        // Cargar desde localStorage como respaldo
        if (typeof window !== 'undefined') {
          const existingData = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
          setUsuariosRegistrados(existingData.length)
        }
      }
    }
    loadStats()
  }, [setUsuariosRegistrados])

  const toggleProblemChecklist = (problema: string) => {
    const nuevosProblemas = selectedProblems.includes(problema)
      ? selectedProblems.filter(p => p !== problema)
      : [...selectedProblems, problema]
    setSelectedProblems(nuevosProblemas)
  }

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  return (
    <>
      <Head>
        <title>ReFut - Construyendo la Comunidad del Fútbol Amateur en México</title>
        <meta name="description" content="Únete a la beta de ReFut y ayúdanos a crear la comunidad que el fútbol amateur necesita en México. Encuentra canchas, organiza partidos y conecta con otros jugadores." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/favicon.svg" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ReFut - Construyendo la Comunidad del Fútbol Amateur" />
        <meta property="og:description" content="Únete a la beta de ReFut y ayúdanos a crear la comunidad que el fútbol amateur necesita en México." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReFut - Construyendo la Comunidad del Fútbol Amateur" />
        <meta name="twitter:description" content="Únete a la beta de ReFut y ayúdanos a crear la comunidad que el fútbol amateur necesita en México." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/logo/logorefut3.svg" alt="ReFut" className="h-8 w-auto" />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#proposito" className="text-gray-600 hover:text-green-600 transition-colors">Propósito</a>
              <a href="#problemas" className="text-gray-600 hover:text-green-600 transition-colors">Problemas</a>
              <a href="#estado" className="text-gray-600 hover:text-green-600 transition-colors">Estado</a>
              <a href="#faq" className="text-gray-600 hover:text-green-600 transition-colors">FAQ</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a
                href="#formulario"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Únete a la Beta
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection 
        usuariosRegistrados={usuariosRegistrados}
        onShowForm={() => setMostrarFormulario(true)}
      />

      {/* Purpose Section */}
      <PurposeSection />

      {/* Project Status */}
      <ProjectStatus />

      {/* Early Benefits */}
      <EarlyBenefits />

      {/* Early Access Form */}
      <EarlyAccessForm
        formData={formData}
        setFormData={setFormData}
        mostrarFormulario={mostrarFormulario}
        setMostrarFormulario={setMostrarFormulario}
        formularioEnviado={formularioEnviado}
        problemasPrincipales={problemasPrincipales}
        toggleProblemChecklist={toggleProblemChecklist}
        handleSubmit={handleSubmit}
        privacyAccepted={privacyAccepted}
        setPrivacyAccepted={setPrivacyAccepted}
        termsAccepted={termsAccepted}
        setTermsAccepted={setTermsAccepted}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        honeypot={honeypot}
        setHoneypot={setHoneypot}
        selectedProblems={selectedProblems}
        additionalComment={additionalComment}
        setAdditionalComment={setAdditionalComment}
        formProgress={formProgress}
        achievements={achievements}
        showAchievement={showAchievement}
      />

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Resolvemos las dudas más comunes sobre ReFut y nuestro proceso de desarrollo
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "¿Qué es ReFut y por qué estamos construyéndolo?",
                answer: "ReFut es una plataforma que estamos desarrollando para resolver los problemas reales del fútbol amateur en México. Nace de nuestra propia frustración como jugadores y queremos construir la solución junto a la comunidad."
              },
              {
                question: "¿Cuándo estará disponible ReFut?",
                answer: "Estamos en fase de validación y desarrollo. Nuestro objetivo es lanzar una beta privada en Enero 2025, pero las fechas pueden ajustarse según el feedback de la comunidad."
              },
              {
                question: "¿Cómo puedo participar en el desarrollo?",
                answer: "Al registrarte en nuestra beta, recibirás acceso prioritario, podrás participar en encuestas de diseño, probar funcionalidades antes que nadie y tener influencia directa en las decisiones de desarrollo."
              },
              {
                question: "¿Qué beneficios obtengo al registrarme temprano?",
                answer: "Acceso prioritario, participación directa en el desarrollo, beneficios exclusivos, sorteos especiales, descuentos en funciones premium y ser parte de la comunidad fundadora de ReFut."
              },
              {
                question: "¿Mis datos están seguros?",
                answer: "Sí, cumplimos con todas las regulaciones de protección de datos. Tus datos se almacenan de forma segura y solo los usamos para mejorar ReFut y mantenerte informado sobre el progreso."
              },
              {
                question: "¿ReFut será gratuito?",
                answer: "Sí, ReFut tendrá una versión gratuita con funciones básicas. También habrá funciones premium para usuarios que quieran características avanzadas como estadísticas detalladas y funciones de organización avanzadas."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className={`text-gray-500 transition-transform ${faqOpen === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
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

      {/* Footer */}
      <Footer />
    </>
  )
}

export default Home
