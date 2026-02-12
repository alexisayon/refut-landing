import React from 'react'

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Sobre ReFut
        </h2>
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <p className="text-white/90 text-base leading-relaxed">
            ReFut es una plataforma web para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara. Funciona en navegador, sin instalar app, y está pensada para jugadores, organizadores y dueños de canchas. Puedes buscar canchas de fútbol rápido, fútbol 7 y fútbol 11 en Guadalajara, Zapopan, Tlaquepaque y Tonalá, crear partidos, invitar jugadores y hacer reservas desde el navegador.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
