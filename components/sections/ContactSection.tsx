import React from 'react'
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'

const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Dudas o sugerencias?
        </h2>
        <p className="text-lg text-white/70 mb-3">
          Escríbenos por WhatsApp, email o redes. Tu opinión nos importa.
        </p>
        <p className="text-base text-refut-green font-medium mb-12">
          ¿Eres dueño de cancha u organizador? Escríbenos para sumar tu cancha o liga a ReFut.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href="https://wa.me/5213310475942"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-dark-surface border border-dark-border rounded-xl hover:border-refut-green/50 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black"
          >
            <FaWhatsapp className="w-10 h-10 text-refut-green mb-3" />
            <span className="font-medium text-white">WhatsApp</span>
            <span className="text-sm text-white/60 mt-1">Chatea con nosotros</span>
          </a>
          <a
            href="mailto:refutoficial@gmail.com"
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
      </div>
    </section>
  )
}

export default ContactSection
