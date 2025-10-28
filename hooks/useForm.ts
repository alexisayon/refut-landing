import { useState, useEffect } from 'react'
import type { FormData } from '../types'
import { FormValidator, AntiSpam } from '../lib/formValidator'
import { BetaService } from '../lib/betaService'

interface FormErrors {
  [key: string]: string
}

interface UseFormReturn {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  formErrors: FormErrors
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  formularioEnviado: boolean
  setFormularioEnviado: React.Dispatch<React.SetStateAction<boolean>>
  usuariosRegistrados: number
  setUsuariosRegistrados: React.Dispatch<React.SetStateAction<number>>
  selectedProblems: string[]
  setSelectedProblems: React.Dispatch<React.SetStateAction<string[]>>
  additionalComment: string
  setAdditionalComment: React.Dispatch<React.SetStateAction<string>>
  privacyAccepted: boolean
  setPrivacyAccepted: React.Dispatch<React.SetStateAction<boolean>>
  termsAccepted: boolean
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>
  honeypot: string
  setHoneypot: React.Dispatch<React.SetStateAction<string>>
  formProgress: number
  achievements: string[]
  showAchievement: string | null
  handleSubmit: (e: React.FormEvent) => Promise<void>
  resetForm: () => void
}

export const useForm = (): UseFormReturn => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    ubicacion: '',
    nivelJuego: '',
    problemasPrincipales: [],
    otrasProblematicas: '',
    mayorReto: '',
    interesEarlyAccess: false
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formularioEnviado, setFormularioEnviado] = useState(false)
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(0)
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])
  const [additionalComment, setAdditionalComment] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [formProgress, setFormProgress] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])
  const [showAchievement, setShowAchievement] = useState<string | null>(null)

  // Calcular progreso del formulario
  useEffect(() => {
    const fields = [
      formData.nombre,
      formData.email,
      formData.ubicacion,
      formData.nivelJuego,
      formData.mayorReto,
      selectedProblems.length > 0,
      privacyAccepted,
      termsAccepted
    ]
    
    const filledFields = fields.filter(Boolean).length
    const progress = Math.round((filledFields / fields.length) * 100)
    setFormProgress(progress)

    // Sistema de logros
    const achievementDefinitions = {
      'first_step': { threshold: 25, message: '¡Primer paso! 🎯' },
      'half_way': { threshold: 50, message: '¡Vas por la mitad! 🚀' },
      'almost_there': { threshold: 75, message: '¡Casi terminamos! ⚡' },
      'complete': { threshold: 100, message: '¡Formulario completo! 🏆' }
    }

    Object.entries(achievementDefinitions).forEach(([key, { threshold, message }]) => {
      if (progress >= threshold && !achievements.includes(key)) {
        setAchievements(prev => [...prev, key])
        setShowAchievement(message)
        setTimeout(() => setShowAchievement(null), 3000)
      }
    })
  }, [formData, selectedProblems, privacyAccepted, termsAccepted, achievements])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})
    
    try {
      // 1. Verificar honeypot (anti-spam)
      if (!AntiSpam.checkHoneypot(honeypot)) {
        setFormErrors({ general: 'Detección de spam. Intenta nuevamente.' })
        return
      }
      
      // 2. Verificar límites de envío (anti-spam)
      const rateLimitCheck = AntiSpam.checkRateLimit()
      if (!rateLimitCheck.allowed) {
        setFormErrors({ general: rateLimitCheck.error! })
        return
      }
      
      // 3. Validar términos y privacidad
      if (!privacyAccepted || !termsAccepted) {
        setFormErrors({ terms: 'Debes aceptar los términos y condiciones y el aviso de privacidad' })
        return
      }
      
      // 4. Sanitizar y validar datos del formulario
      const sanitizedData = FormValidator.sanitizeFormData(formData)
      const validation = FormValidator.validateForm(sanitizedData)
      
      if (!validation.isValid) {
        setFormErrors(validation.errors)
        return
      }
      
      // 5. Enviar datos a Firebase
      try {
        const firebaseId = await BetaService.registerUser({
          nombre: (sanitizedData as any).nombre,
          email: (sanitizedData as any).email,
          ubicacion: (sanitizedData as any).ubicacion,
          nivelJuego: (sanitizedData as any).nivelJuego,
          problemasPrincipales: selectedProblems, // Usar selectedProblems en lugar de problemasPrincipales
          otrasProblematicas: (sanitizedData as any).otrasProblematicas,
          mayorReto: (sanitizedData as any).mayorReto,
          interesEarlyAccess: (sanitizedData as any).interesEarlyAccess,
          selectedProblems: selectedProblems,
          additionalComment: additionalComment
        })
        
        console.log('✅ Usuario registrado en Firebase con ID:', firebaseId)
        
        // Actualizar estadísticas desde Firebase
        const stats = await BetaService.getPublicStats()
        setUsuariosRegistrados(stats.totalUsers)
        
      } catch (firebaseError) {
        console.error('❌ Error enviando a Firebase:', firebaseError)
        // Continuar con localStorage como respaldo
      }
      
      // 6. Guardar datos en localStorage (respaldo)
      const formDataKey = `refut_early_access_${Date.now()}`
      const formDataWithTimestamp = {
        ...sanitizedData,
        id: formDataKey,
        source: 'landing_page',
        selectedProblems: selectedProblems,
        additionalComment: additionalComment,
        privacyAccepted: true,
        termsAccepted: true,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        timestamp: new Date().toISOString()
      }
      
      // Guardar registro individual
      if (typeof window !== 'undefined') {
        localStorage.setItem(formDataKey, JSON.stringify(formDataWithTimestamp))
        
        // Guardar en lista de registros
        const existingData = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
        existingData.push(formDataWithTimestamp)
        localStorage.setItem('refut_early_access_list', JSON.stringify(existingData))
        
        console.log('📊 Datos guardados en localStorage:', {
          individual: formDataWithTimestamp,
          totalRegistros: existingData.length
        })
        
        // Registrar envío para límites
        AntiSpam.recordSubmission()
      }
      
      // 7. Marcar como enviado
      setFormularioEnviado(true)
      setTimeout(() => {
        setFormularioEnviado(false)
        resetForm()
      }, 3000)
        
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      setFormErrors({ general: 'Error al enviar el formulario. Intenta nuevamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      ubicacion: '',
      nivelJuego: '',
      problemasPrincipales: [],
      otrasProblematicas: '',
      mayorReto: '',
      interesEarlyAccess: false
    })
    setSelectedProblems([])
    setAdditionalComment('')
    setPrivacyAccepted(false)
    setTermsAccepted(false)
    setHoneypot('')
    setFormProgress(0)
    setAchievements([])
  }

  return {
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
  }
}
