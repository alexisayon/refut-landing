import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { FormData } from '../types'
import { Nav, Footer } from '../components'
import EarlyAccessForm from '../components/sections/EarlyAccessForm'
import { FormValidator, AntiSpam } from '../lib/formValidator'
import { BetaService } from '../lib/betaService'

const PROBLEMAS_PRINCIPALES = [
  'Dificultad para encontrar canchas disponibles',
  'Precios muy altos en canchas privadas',
  'Jugadores que no confirman asistencia',
  'Partidos cancelados de último momento',
  'Problemas para dividir costos',
  'Falta de árbitros capacitados',
  'Canchas en mal estado',
  'Horarios limitados',
  'Falta de organización en equipos',
  'Dificultad para encontrar jugadores',
  'Problemas con el transporte a las canchas',
  'Falta de información sobre partidos cercanos',
  'No hay seguimiento de estadísticas',
  'Problemas con el clima y cancelaciones',
  'Falta de torneos locales',
  'Dificultad para reservar horarios específicos',
]

const ACHIEVEMENT_DEFINITIONS: Record<string, { title: string; description: string }> = {
  first_field: { title: 'Primer Paso', description: 'Completaste tu primer campo' },
  half_form: { title: 'A Mitad de Camino', description: 'Completaste la mitad del formulario' },
  problems_selected: { title: 'Analista', description: 'Seleccionaste tus problemas principales' },
  detailed_response: { title: 'Detallista', description: 'Describiste tu mayor reto con detalle' },
  form_complete: { title: 'Completista', description: 'Formulario completado al 100%' },
}

const Beta: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    ubicacion: '',
    nivelJuego: '',
    problemasPrincipales: [],
    otrasProblematicas: '',
    mayorReto: '',
    interesEarlyAccess: false,
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(true)
  const [formularioEnviado, setFormularioEnviado] = useState(false)
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])
  const [additionalComment, setAdditionalComment] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [formProgress, setFormProgress] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])
  const [showAchievement, setShowAchievement] = useState<string | null>(null)

  useEffect(() => {
    setSelectedProblems(formData.problemasPrincipales)
  }, [formData.problemasPrincipales])

  useEffect(() => {
    let progress = 0
    const totalFields = 6
    if (formData.nombre.trim()) progress += 1
    if (formData.email.trim()) progress += 1
    if (formData.ubicacion) progress += 1
    if (formData.nivelJuego) progress += 1
    if (formData.mayorReto.trim()) progress += 1
    if (formData.problemasPrincipales.length > 0) progress += 1
    setFormProgress((progress / totalFields) * 100)

    if (progress >= 1 && !achievements.includes('first_field')) {
      setAchievements((a) => [...a, 'first_field'])
      setShowAchievement(ACHIEVEMENT_DEFINITIONS.first_field?.description ?? 'first_field')
      setTimeout(() => setShowAchievement(null), 3000)
    }
    if (progress >= 3 && !achievements.includes('half_form')) {
      setAchievements((a) => [...a, 'half_form'])
      setShowAchievement(ACHIEVEMENT_DEFINITIONS.half_form?.description ?? 'half_form')
      setTimeout(() => setShowAchievement(null), 3000)
    }
    if (formData.problemasPrincipales.length > 0 && !achievements.includes('problems_selected')) {
      setAchievements((a) => [...a, 'problems_selected'])
      setShowAchievement(ACHIEVEMENT_DEFINITIONS.problems_selected?.description ?? 'problems_selected')
      setTimeout(() => setShowAchievement(null), 3000)
    }
    if (formData.mayorReto.trim().length > 50 && !achievements.includes('detailed_response')) {
      setAchievements((a) => [...a, 'detailed_response'])
      setShowAchievement(ACHIEVEMENT_DEFINITIONS.detailed_response?.description ?? 'detailed_response')
      setTimeout(() => setShowAchievement(null), 3000)
    }
    if (progress === totalFields && !achievements.includes('form_complete')) {
      setAchievements((a) => [...a, 'form_complete'])
      setShowAchievement(ACHIEVEMENT_DEFINITIONS.form_complete?.description ?? 'form_complete')
      setTimeout(() => setShowAchievement(null), 3000)
    }
  }, [formData, achievements])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})
    try {
      if (!AntiSpam.checkHoneypot(honeypot)) {
        setFormErrors({ general: 'Detección de spam. Intenta nuevamente.' })
        return
      }
      const rateLimitCheck = AntiSpam.checkRateLimit()
      if (!rateLimitCheck.allowed) {
        setFormErrors({ general: rateLimitCheck.error ?? 'Demasiados envíos.' })
        return
      }
      if (!privacyAccepted || !termsAccepted) {
        setFormErrors({ terms: 'Debes aceptar los términos y condiciones y el aviso de privacidad' })
        return
      }
      const sanitizedData = FormValidator.sanitizeFormData(formData)
      const validation = FormValidator.validateForm(sanitizedData)
      if (!validation.isValid) {
        setFormErrors(validation.errors)
        return
      }
      try {
        await BetaService.registerUser({
          nombre: (sanitizedData as FormData).nombre,
          email: (sanitizedData as FormData).email,
          ubicacion: (sanitizedData as FormData).ubicacion,
          nivelJuego: (sanitizedData as FormData).nivelJuego,
          problemasPrincipales: selectedProblems,
          otrasProblematicas: (sanitizedData as FormData).otrasProblematicas,
          mayorReto: (sanitizedData as FormData).mayorReto,
          interesEarlyAccess: (sanitizedData as FormData).interesEarlyAccess,
          selectedProblems,
          additionalComment,
        })
      } catch {
        // continue with localStorage fallback
      }
      const formDataWithTimestamp = {
        ...sanitizedData,
        id: `refut_early_access_${Date.now()}`,
        source: 'landing_page',
        selectedProblems,
        additionalComment,
        privacyAccepted: true,
        termsAccepted: true,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        timestamp: new Date().toISOString(),
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          (formDataWithTimestamp as { id: string }).id,
          JSON.stringify(formDataWithTimestamp)
        )
        const existing = JSON.parse(localStorage.getItem('refut_early_access_list') ?? '[]')
        existing.push(formDataWithTimestamp)
        localStorage.setItem('refut_early_access_list', JSON.stringify(existing))
        AntiSpam.recordSubmission()
      }
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
          mayorReto: '',
          interesEarlyAccess: false,
        })
        setSelectedProblems([])
        setAdditionalComment('')
        setPrivacyAccepted(false)
        setTermsAccepted(false)
        setHoneypot('')
      }, 3000)
    } catch {
      setFormErrors({ general: 'Error al enviar. Intenta nuevamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleProblemChecklist = (problema: string) => {
    const next = selectedProblems.includes(problema)
      ? selectedProblems.filter((p) => p !== problema)
      : [...selectedProblems, problema]
    setSelectedProblems(next)
    setFormData((prev) => ({ ...prev, problemasPrincipales: next }))
  }

  return (
    <>
      <Head>
        <title>Únete a la beta – ReFut</title>
        <meta name="description" content="Regístrate para acceso prioritario a ReFut y ayúdanos a mejorar la plataforma del fútbol amateur." />
      </Head>
      <div className="min-h-screen bg-refut-black">
        <Nav />
        <div className="py-12 px-4 text-center">
          <Link href="/" className="text-refut-green hover:underline text-sm">
            ← Volver al inicio
          </Link>
        </div>
        <EarlyAccessForm
          formData={formData}
          setFormData={setFormData}
          mostrarFormulario={mostrarFormulario}
          setMostrarFormulario={setMostrarFormulario}
          formularioEnviado={formularioEnviado}
          problemasPrincipales={PROBLEMAS_PRINCIPALES}
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
        <Footer />
      </div>
    </>
  )
}

export default Beta
