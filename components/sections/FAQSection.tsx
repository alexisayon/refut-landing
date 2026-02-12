import React, { useState } from 'react'
import Link from 'next/link'
import { FaChevronDown } from 'react-icons/fa'

const faqs = [
  {
    question: '¿Qué es ReFut?',
    answer: 'ReFut es una plataforma web para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara. Funciona en navegador, sin instalar app, y está pensada para jugadores, organizadores y dueños de canchas.',
  },
  {
    question: '¿Dónde está disponible?',
    answer: 'ReFut está disponible en la Zona Metropolitana de Guadalajara (ZMG), incluyendo Guadalajara, Zapopan, Tlaquepaque, Tonalá y municipios cercanos. Pronto expandiremos a más ciudades.',
  },
  {
    question: '¿Dónde puedo encontrar canchas de fútbol rápido en Guadalajara?',
    answer: 'Con ReFut puedes buscar canchas de fútbol rápido en Guadalajara usando el mapa interactivo. Filtra por zona, precio y horario para encontrar la mejor cancha cerca de ti. Disponible en colonias como Chapalita, Oblatos, Atemajac y más.',
  },
  {
    question: '¿Cómo rento una cancha en Zapopan?',
    answer: 'En ReFut puedes ver canchas disponibles en Zapopan, revisar horarios libres y hacer reservas directamente desde la plataforma. Busca por ubicación, tipo de cancha (fútbol rápido, fútbol 7, fútbol 11) y precio. Todo el proceso es gratuito.',
  },
  {
    question: '¿ReFut funciona en Tlaquepaque y Tonalá?',
    answer: 'Sí, ReFut cubre toda la Zona Metropolitana de Guadalajara, incluyendo Tlaquepaque y Tonalá. Puedes buscar canchas, crear partidos y organizar equipos en estos municipios.',
  },
  {
    question: '¿Cómo me registro?',
    answer: 'Entra desde el navegador, crea cuenta con email o redes sociales y empieza a buscar canchas o partidos cerca de ti. No necesitas instalar ninguna aplicación.',
  },
  {
    question: '¿Es gratis?',
    answer: 'Sí. Las funciones básicas como buscar canchas, crear partidos, armar equipos y hacer reservas son completamente gratuitas. Algunas funciones premium pueden tener costo en el futuro.',
  },
]

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas frecuentes
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-card border border-dark-border rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-dark-card/80 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-inset rounded-xl"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <FaChevronDown
                  className={`w-5 h-5 text-white/60 shrink-0 ml-2 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed pt-0">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-white/60 text-sm mt-6">
          <Link href="/terminos" className="text-refut-green hover:underline focus:outline-none focus:ring-2 focus:ring-refut-green rounded">Términos y condiciones</Link>
          {' · '}
          <Link href="/privacidad" className="text-refut-green hover:underline focus:outline-none focus:ring-2 focus:ring-refut-green rounded">Aviso de privacidad</Link>
        </p>
      </div>
    </section>
  )
}

export default FAQSection
