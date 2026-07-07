import React, { useState } from 'react'
import Link from 'next/link'
import { FaChevronDown } from 'react-icons/fa'
import { ownerFaqs } from '../../../lib/ownerContent'

const OwnerFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq-duenos" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas frecuentes para dueños y organizadores
          </h2>
        </div>
        <div className="space-y-2">
          {ownerFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-card border border-dark-border rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-dark-card/80 transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-inset rounded-xl"
                aria-expanded={openIndex === index}
                aria-controls={`owner-faq-answer-${index}`}
                id={`owner-faq-question-${index}`}
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <FaChevronDown
                  aria-hidden
                  className={`w-5 h-5 text-white/60 shrink-0 ml-2 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`owner-faq-answer-${index}`}
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-white/60 text-sm mt-6">
          <Link href="/terminos" className="text-refut-green hover:underline focus:outline-none focus:ring-2 focus:ring-refut-green rounded">
            Términos y condiciones
          </Link>
          {' · '}
          <Link href="/privacidad" className="text-refut-green hover:underline focus:outline-none focus:ring-2 focus:ring-refut-green rounded">
            Aviso de privacidad
          </Link>
        </p>
      </div>
    </section>
  )
}

export default OwnerFAQSection
