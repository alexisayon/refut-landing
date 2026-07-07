import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Busca cancha cerca',
    description:
      'Filtra por zona, tipo de cancha y precio. Mira horarios y elige dónde jugar en la ZMG.',
  },
  {
    number: '02',
    title: 'Publica tu partido o explora canchas',
    description:
      'Publica una reta y deja que los jugadores se apunten sin grupos eternos de WhatsApp. Las reservas de cancha en la app están en marcha.',
  },
  {
    number: '03',
    title: 'Juega y compite',
    description:
      'Confirma asistencia, arma equipos y únete a torneos con tabla en vivo y página pública.',
  },
]

const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-refut-green font-medium text-sm uppercase tracking-wide mb-3">
            Menos organizar. Más jugar.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Cómo funciona ReFut</h2>
        </div>
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-dark-surface border border-dark-border rounded-2xl p-6 md:p-8 flex gap-6 items-start"
            >
              <span className="text-4xl md:text-5xl font-bold text-refut-green/30 tabular-nums leading-none shrink-0">
                {step.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
