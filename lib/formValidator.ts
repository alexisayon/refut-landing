// Utilidades de validación y sanitización
export class FormValidator {
  // Sanitizar texto para prevenir XSS
  static sanitizeText(text: string): string {
    if (!text) return ''
    
    return text
      .replace(/[<>]/g, '') // Remover < y >
      .replace(/javascript:/gi, '') // Remover javascript:
      .replace(/on\w+=/gi, '') // Remover event handlers
      .trim()
      .substring(0, 1000) // Limitar longitud
  }

  // Validar email
  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email) {
      return { isValid: false, error: 'El email es requerido' }
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Formato de email inválido' }
    }
    
    if (email.length > 254) {
      return { isValid: false, error: 'El email es demasiado largo' }
    }
    
    return { isValid: true }
  }

  // Validar nombre
  static validateName(name: string): { isValid: boolean; error?: string } {
    if (!name) {
      return { isValid: false, error: 'El nombre es requerido' }
    }
    
    const sanitizedName = this.sanitizeText(name)
    if (sanitizedName.length < 2) {
      return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' }
    }
    
    if (sanitizedName.length > 50) {
      return { isValid: false, error: 'El nombre es demasiado largo' }
    }
    
    // Solo letras, espacios, acentos y algunos caracteres especiales
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-\.]+$/
    if (!nameRegex.test(sanitizedName)) {
      return { isValid: false, error: 'El nombre contiene caracteres no válidos' }
    }
    
    return { isValid: true }
  }

  // Validar comentario/retos
  static validateComment(comment: string): { isValid: boolean; error?: string } {
    if (!comment) {
      return { isValid: false, error: 'Este campo es requerido' }
    }
    
    const sanitizedComment = this.sanitizeText(comment)
    if (sanitizedComment.length < 10) {
      return { isValid: false, error: 'Por favor proporciona más detalles (mínimo 10 caracteres)' }
    }
    
    if (sanitizedComment.length > 500) {
      return { isValid: false, error: 'El comentario es demasiado largo (máximo 500 caracteres)' }
    }
    
    return { isValid: true }
  }

  // Validar ubicación
  static validateUbicacion(ubicacion: string): { isValid: boolean; error?: string } {
    if (!ubicacion) {
      return { isValid: false, error: 'La ubicación es requerida' }
    }
    
    const validUbicaciones = [
      'Guadalajara Centro',
      'Zapopan',
      'Tlaquepaque',
      'Tonalá',
      'San Pedro Tlaquepaque',
      'El Salto',
      'Juanacatlán',
      'Ixtlahuacán de los Membrillos',
      'Zapotlanejo',
      'Otra zona'
    ]
    
    if (!validUbicaciones.includes(ubicacion)) {
      return { isValid: false, error: 'Selecciona una ubicación válida' }
    }
    
    return { isValid: true }
  }

  // Validar nivel de juego
  static validateNivelJuego(nivelJuego: string): { isValid: boolean; error?: string } {
    if (!nivelJuego) {
      return { isValid: false, error: 'El nivel de fútbol es requerido' }
    }
    
    const validNiveles = [
      'Principiante',
      'Intermedio',
      'Avanzado',
      'Semi-profesional',
      'Ex-profesional'
    ]
    
    if (!validNiveles.includes(nivelJuego)) {
      return { isValid: false, error: 'Selecciona un nivel válido' }
    }
    
    return { isValid: true }
  }

  // Validar formulario completo
  static validateForm(formData: {
    nombre: string
    email: string
    ubicacion: string
    nivelJuego: string
    mayorReto: string
  }): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {}
    
    const nameValidation = this.validateName(formData.nombre)
    if (!nameValidation.isValid) {
      errors.nombre = nameValidation.error!
    }
    
    const emailValidation = this.validateEmail(formData.email)
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!
    }
    
    const ubicacionValidation = this.validateUbicacion(formData.ubicacion)
    if (!ubicacionValidation.isValid) {
      errors.ubicacion = ubicacionValidation.error!
    }
    
    const nivelJuegoValidation = this.validateNivelJuego(formData.nivelJuego)
    if (!nivelJuegoValidation.isValid) {
      errors.nivelJuego = nivelJuegoValidation.error!
    }
    
    const commentValidation = this.validateComment(formData.mayorReto)
    if (!commentValidation.isValid) {
      errors.mayorReto = commentValidation.error!
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  // Sanitizar datos del formulario
  static sanitizeFormData(formData: any) {
    return {
      nombre: this.sanitizeText(formData.nombre || ''),
      email: this.sanitizeText(formData.email || '').toLowerCase(),
      ubicacion: this.sanitizeText(formData.ubicacion || ''),
      nivelJuego: this.sanitizeText(formData.nivelJuego || ''),
      problemasPrincipales: formData.problemasPrincipales || [],
      otrasProblematicas: this.sanitizeText(formData.otrasProblematicas || ''),
      mayorReto: this.sanitizeText(formData.mayorReto || ''),
      interesEarlyAccess: formData.interesEarlyAccess || false,
      timestamp: new Date().toISOString(),
      source: 'landing_page',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      ip: 'client-side' // Se obtendrá del servidor
    }
  }
}

// Protección anti-spam simple
export class AntiSpam {
  private static readonly RATE_LIMIT_KEY = 'refut_form_submissions'
  private static readonly MAX_SUBMISSIONS_PER_HOUR = 3
  private static readonly MAX_SUBMISSIONS_PER_DAY = 10

  static checkRateLimit(): { allowed: boolean; error?: string } {
    if (typeof window === 'undefined') return { allowed: true }
    
    const now = Date.now()
    const submissions = JSON.parse(
      localStorage.getItem(this.RATE_LIMIT_KEY) || '[]'
    ) as number[]
    
    // Limpiar submissions antiguos (más de 24 horas)
    const oneDayAgo = now - (24 * 60 * 60 * 1000)
    const recentSubmissions = submissions.filter(time => time > oneDayAgo)
    
    // Verificar límite diario
    if (recentSubmissions.length >= this.MAX_SUBMISSIONS_PER_DAY) {
      return { 
        allowed: false, 
        error: 'Has alcanzado el límite de envíos diarios. Intenta mañana.' 
      }
    }
    
    // Verificar límite por hora
    const oneHourAgo = now - (60 * 60 * 1000)
    const hourlySubmissions = recentSubmissions.filter(time => time > oneHourAgo)
    
    if (hourlySubmissions.length >= this.MAX_SUBMISSIONS_PER_HOUR) {
      return { 
        allowed: false, 
        error: 'Has enviado demasiados formularios. Espera una hora antes de intentar nuevamente.' 
      }
    }
    
    return { allowed: true }
  }

  static recordSubmission(): void {
    if (typeof window === 'undefined') return
    
    const now = Date.now()
    const submissions = JSON.parse(
      localStorage.getItem(this.RATE_LIMIT_KEY) || '[]'
    ) as number[]
    
    submissions.push(now)
    localStorage.setItem(this.RATE_LIMIT_KEY, JSON.stringify(submissions))
  }

  // Verificación de honeypot (campo oculto)
  static checkHoneypot(honeypotValue: string): boolean {
    return honeypotValue === ''
  }
}

export default FormValidator
