import React from 'react'
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { useAudience } from '../../hooks/useAudience'
import LeadCaptureForm from './LeadCaptureForm'

const ContactSection: React.FC = () => {
  const { audience } = useAudience()
  const isOwner = audience === 'duenos'
  const sectionId = isOwner ? 'contacto-duenos' : 'contacto'
  const whatsappMessage = isOwner
    ? 'https://wa.me/5213310475942?text=Hola%2C%20soy%20due%C3%B1o%20de%20cancha%2Forganizador%20y%20me%20interesa%20ReFut'
    : 'https://wa.me/5213310475942'
  const mailto = isOwner
    ? 'mailto:refutoficial@gmail.com?subject=Inter%C3%A9s%20como%20socio%20ReFut&body=Hola%2C%20soy%20due%C3%B1o%20de%20cancha%20u%20organizador%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s.'
    : 'mailto:refutoficial@gmail.com'

  return (
    <section id={sectionId} className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {isOwner ? 'Solicita acceso como socio ReFut' : '¿Listo para jugar o sumar tu cancha?'}
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Déjanos tus datos y te contactamos en menos de 24 horas. También puedes escribirnos
          directo por WhatsApp o correo.
        </p>

        <LeadCaptureForm />

        <p className="text-white/40 text-sm mt-10 mb-6">O contáctanos directo</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href={whatsappMessage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-dark-surface border border-dark-border rounded-xl hover:border-refut-green/50 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
          >
            <FaWhatsapp className="w-10 h-10 text-refut-green mb-3" />
            <span className="font-medium text-white">WhatsApp</span>
            <span className="text-sm text-white/60 mt-1">33 1047 5942</span>
          </a>
          <a
            href={mailto}
            className="flex flex-col items-center p-6 bg-dark-surface border border-dark-border rounded-xl hover:border-refut-green/50 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
          >
            <FaEnvelope className="w-10 h-10 text-refut-green mb-3" />
            <span className="font-medium text-white">Email</span>
            <span className="text-sm text-white/60 mt-1">refutoficial@gmail.com</span>
          </a>
          <a
            href="https://instagram.com/refut_mx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-dark-surface border border-dark-border rounded-xl hover:border-refut-green/50 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
          >
            <FaInstagram className="w-10 h-10 text-refut-green mb-3" />
            <span className="font-medium text-white">Instagram</span>
            <span className="text-sm text-white/60 mt-1">@refut_mx</span>
          </a>
        </div>

        {!isOwner && (
          <p className="text-base text-refut-green font-medium mt-10">
            ¿Eres dueño de cancha u organizador? Cambia a la vista Dueños en el menú superior.
          </p>
        )}
      </div>
    </section>
  )
}

export default ContactSection
