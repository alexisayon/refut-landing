import React from 'react'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { APP_URL } from '../../lib/constants'

const AppAccessSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-refut-black">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Usa ReFut ya
        </h2>
        <p className="text-lg text-white/70 mb-4">
          Entra desde el navegador en tu celular o computadora. No necesitas instalar nada.
        </p>
        <p className="text-sm text-white/80 mb-10">
          Empezamos en la ZMG; si quieres ReFut en tu ciudad,{' '}
          <a
            href="https://wa.me/5213310475942"
            target="_blank"
            rel="noopener noreferrer"
            className="text-refut-green font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black rounded"
          >
            escríbenos
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-refut-green text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-accent-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black active:scale-[0.98]"
          >
            Entrar a la app
            <FaExternalLinkAlt className="w-4 h-4 opacity-80" aria-hidden />
          </a>
          <Link
            href="/beta"
            className="inline-flex items-center border border-dark-border text-white/90 px-8 py-4 rounded-xl text-lg font-medium hover:border-refut-green/50 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black rounded-xl active:scale-[0.98]"
          >
            ¿Quieres ser early adopter?
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AppAccessSection
