import React from 'react'

const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Cómo funciona ReFut
        </h2>
        <div className="space-y-6">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-refut-green rounded-full flex items-center justify-center text-white font-bold">
                1
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Busca cancha</h3>
                <p className="text-white/70 text-sm">
                  Usa el mapa para encontrar canchas de fútbol en Guadalajara y la ZMG. Filtra por ubicación, precio y horario disponible.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-refut-green rounded-full flex items-center justify-center text-white font-bold">
                2
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Crea partido</h3>
                <p className="text-white/70 text-sm">
                  Publica un partido con fecha, hora y cancha. Los jugadores pueden apuntarse directamente desde su celular.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-refut-green rounded-full flex items-center justify-center text-white font-bold">
                3
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Invita jugadores</h3>
                <p className="text-white/70 text-sm">
                  Comparte el partido con tu equipo o busca jugadores cercanos. Confirma asistencia y arma los equipos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
