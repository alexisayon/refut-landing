import { useEffect, useState } from 'react'
import type { FormData } from '../types'
import { FormValidator, AntiSpam } from '../lib/formValidator'
import { BetaService } from '../lib/betaService'
import { trackCta } from '../lib/gtag'

export const PROBLEMAS_PRINCIPALES = [
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
] as const

const ACHIEVEMENT_DEFINITIONS: Record<string, { title: string; description: string }> = {
  first_field: { title: 'Primer Paso', description: 'Completaste tu primer campo' },
  half_form: { title: 'A Mitad de Camino', description: 'Completaste la mitad del formulario' },
  problems_selected: { title: 'Analista', description: 'Seleccionaste tus problemas principales' },
  detailed_response: { title: 'Detallista', description: 'Describiste tu mayor reto con detalle' },
  form_complete: { title: 'Completista', description: 'Formulario completado al 100%' },
}

const INITIAL_FORM: FormData = {
  nombre: '',
  email: '',
  ubicacion: '',
  nivelJuego: '',
  problemasPrincipales: [],
  otrasProblematicas: '',
  mayorReto: '',
  interesEarlyAccess: false,
}

export function useBetaRegistration() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
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

    const unlock = (id: keyof typeof ACHIEVEMENT_DEFINITIONS) => {
      if (achievements.includes(id)) return
      setAchievements((current) => [...current, id])
      setShowAchievement(ACHIEVEMENT_DEFINITIONS[id]?.description ?? id)
      setTimeout(() => setShowAchievement(null), 3000)
    }

    if (progress >= 1) unlock('first_field')
    if (progress >= 3) unlock('half_form')
    if (formData.problemasPrincipales.length > 0) unlock('problems_selected')
    if (formData.mayorReto.trim().length > 50) unlock('detailed_response')
    if (progress === totalFields) unlock('form_complete')
  }, [achievements, formData])

  const resetForm = () => {
    setFormData(INITIAL_FORM)
    setSelectedProblems([])
    setAdditionalComment('')
    setPrivacyAccepted(false)
    setTermsAccepted(false)
    setHoneypot('')
  }

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
        setFormErrors({
          terms: 'Debes aceptar los términos y condiciones y el aviso de privacidad',
        })
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
        AntiSpam.recordSubmission()
        trackCta('beta', 'beta_form')
        setFormularioEnviado(true)
        setTimeout(() => {
          setFormularioEnviado(false)
          setMostrarFormulario(false)
          resetForm()
        }, 3000)
      } catch {
        setFormErrors({
          general:
            'No pudimos guardar tu registro. Verifica tu conexión o escríbenos por WhatsApp.',
        })
      }
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

  return {
    formData,
    setFormData,
    mostrarFormulario,
    setMostrarFormulario,
    formularioEnviado,
    problemasPrincipales: PROBLEMAS_PRINCIPALES,
    toggleProblemChecklist,
    handleSubmit,
    privacyAccepted,
    setPrivacyAccepted,
    termsAccepted,
    setTermsAccepted,
    formErrors,
    isSubmitting,
    honeypot,
    setHoneypot,
    selectedProblems,
    additionalComment,
    setAdditionalComment,
    formProgress,
    achievements,
    showAchievement,
  }
}
