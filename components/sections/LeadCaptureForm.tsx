import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { FormValidator, AntiSpam } from '../../lib/formValidator'
import { LeadService, type LeadContactMethod, type LeadPersona } from '../../lib/leadService'
import { useAudience } from '../../hooks/useAudience'
import { event } from '../../lib/gtag'

interface FormState {
  nombre: string
  email: string
  telefono: string
  mensaje: string
  contactMethod: LeadContactMethod
}

const initialForm: FormState = {
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
  contactMethod: 'whatsapp',
}

const LeadCaptureForm: React.FC = () => {
  const { audience } = useAudience()
  const defaultPersona: LeadPersona = audience === 'duenos' ? 'cancha' : 'jugador'
  const [persona, setPersona] = useState<LeadPersona>(defaultPersona)
  const [form, setForm] = useState<FormState>(initialForm)
  const [honeypot, setHoneypot] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedContactMethod, setSubmittedContactMethod] = useState<LeadContactMethod>('whatsapp')

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!AntiSpam.checkHoneypot(honeypot)) {
      setErrors({ general: 'No se pudo enviar. Intenta de nuevo.' })
      return
    }

    const rateLimit = AntiSpam.checkRateLimit()
    if (!rateLimit.allowed) {
      setErrors({ general: rateLimit.error ?? 'Demasiados envíos. Espera un momento.' })
      return
    }

    const nameCheck = FormValidator.validateName(form.nombre)
    if (!nameCheck.isValid) {
      setErrors({ nombre: nameCheck.error ?? 'Nombre inválido' })
      return
    }

    const emailCheck = FormValidator.validateEmail(form.email)
    if (!emailCheck.isValid) {
      setErrors({ email: emailCheck.error ?? 'Email inválido' })
      return
    }

    if (!privacyAccepted) {
      setErrors({ privacy: 'Debes aceptar el aviso de privacidad' })
      return
    }

    setIsSubmitting(true)

    try {
      await LeadService.submitLead({
        nombre: FormValidator.sanitizeText(form.nombre),
        email: form.email.trim().toLowerCase(),
        telefono: form.telefono.trim() || undefined,
        persona,
        contactMethod: form.contactMethod,
        mensaje: form.mensaje.trim() ? FormValidator.sanitizeText(form.mensaje) : undefined,
        audience,
      })

      event({
        action: 'lead_submit',
        category: 'conversion',
        label: persona === 'cancha' ? 'owner_lead' : 'player_lead',
      })

      setSubmitted(true)
      const method = form.contactMethod
      setForm(initialForm)
      setPrivacyAccepted(false)
      setSubmittedContactMethod(method)
    } catch {
      setErrors({
        general:
          'No pudimos guardar tu solicitud. Escríbenos por WhatsApp al 33 1047 5942.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-dark-surface border border-refut-green/40 rounded-2xl p-8 text-center max-w-xl mx-auto">
        <p className="text-2xl font-bold text-white mb-2">¡Recibimos tus datos!</p>
        <p className="text-white/70">
          Te contactamos en menos de 24 horas por{' '}
          {submittedContactMethod === 'whatsapp'
            ? 'WhatsApp'
            : submittedContactMethod === 'llamada'
              ? 'llamada'
              : 'correo'}
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-refut-green text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-refut-green rounded"
        >
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  return (
    <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 md:p-8 max-w-xl mx-auto text-left">
      <div className="flex rounded-xl bg-refut-black p-1 mb-6" role="tablist">
        {(
          [
            { id: 'jugador' as const, label: 'Soy jugador' },
            { id: 'cancha' as const, label: 'Tengo cancha / torneo' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={persona === tab.id}
            onClick={() => setPersona(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green ${
              persona === tab.id
                ? 'bg-refut-green text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="text-white/60 text-sm mb-6">
        {persona === 'jugador'
          ? 'Cuéntanos qué buscas y te ayudamos a encontrar cancha o partido.'
          : 'Evaluamos cada solicitud de socio. Te respondemos con el plan que aplique.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <div>
          <label htmlFor="lead-nombre" className="block text-sm text-white/80 mb-1">
            Nombre y apellido *
          </label>
          <input
            id="lead-nombre"
            type="text"
            value={form.nombre}
            onChange={(e) => setField('nombre', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-refut-black border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-refut-green ${
              errors.nombre ? 'border-red-500' : 'border-dark-border'
            }`}
            placeholder="Tu nombre"
            maxLength={50}
            required
          />
          {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-sm text-white/80 mb-1">
            Correo *
          </label>
          <input
            id="lead-email"
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-refut-black border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-refut-green ${
              errors.email ? 'border-red-500' : 'border-dark-border'
            }`}
            placeholder="tu@correo.com"
            required
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="lead-telefono" className="block text-sm text-white/80 mb-1">
            Teléfono <span className="text-white/40">(opcional)</span>
          </label>
          <input
            id="lead-telefono"
            type="tel"
            value={form.telefono}
            onChange={(e) => setField('telefono', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-refut-black border border-dark-border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-refut-green"
            placeholder="33 1234 5678"
          />
        </div>

        <fieldset>
          <legend className="text-sm text-white/80 mb-2">¿Por cuál medio te contactamos?</legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'whatsapp' as const, label: 'WhatsApp' },
                { id: 'llamada' as const, label: 'Llamada' },
                { id: 'email' as const, label: 'Correo' },
              ] as const
            ).map((opt) => (
              <label
                key={opt.id}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer text-sm transition-colors ${
                  form.contactMethod === opt.id
                    ? 'border-refut-green bg-refut-green/10 text-refut-green'
                    : 'border-dark-border text-white/70 hover:border-refut-green/40'
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={opt.id}
                  checked={form.contactMethod === opt.id}
                  onChange={() => setField('contactMethod', opt.id)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="lead-mensaje" className="block text-sm text-white/80 mb-1">
            ¿En qué te podemos ayudar? <span className="text-white/40">(opcional)</span>
          </label>
          <textarea
            id="lead-mensaje"
            value={form.mensaje}
            onChange={(e) => setField('mensaje', e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 rounded-xl bg-refut-black border border-dark-border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-refut-green resize-none"
            placeholder={
              persona === 'jugador'
                ? 'Busco cancha los viernes en Zapopan...'
                : 'Tengo 2 canchas y organizo un torneo mixto...'
            }
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-dark-border text-refut-green focus:ring-refut-green"
          />
          <span className="text-xs text-white/60">
            Acepto el{' '}
            <a href="/privacidad" className="text-refut-green hover:underline" target="_blank" rel="noopener noreferrer">
              aviso de privacidad
            </a>
            . *
          </span>
        </label>
        {errors.privacy && <p className="text-red-400 text-xs">{errors.privacy}</p>}
        {errors.general && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            {errors.general}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-refut-green text-white font-semibold hover:bg-accent-greenDark transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-dark-surface"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <FaSpinner className="animate-spin" aria-hidden />
              Enviando...
            </span>
          ) : (
            'Enviar solicitud'
          )}
        </button>
      </form>
    </div>
  )
}

export default LeadCaptureForm
