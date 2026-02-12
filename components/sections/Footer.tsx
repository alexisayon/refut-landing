import React from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'
import Logo from '../Logo'
import { APP_URL } from '../../lib/constants'

const Footer: React.FC = () => {
  return (
    <footer className="bg-refut-black border-t border-dark-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo variant="white" size="md" href="/" />
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              La plataforma del fútbol amateur en México. Canchas, partidos, equipos y comunidad.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/5213310475942" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-refut-green transition-colors" aria-label="WhatsApp">
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/refut_mx" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-refut-green transition-colors" aria-label="Instagram">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://facebook.com/refutmx" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-refut-green transition-colors" aria-label="Facebook">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com/@refut" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-refut-green transition-colors" aria-label="TikTok">
                <FaTiktok className="w-6 h-6" />
              </a>
              <a href="mailto:refutoficial@gmail.com" className="text-white/60 hover:text-refut-green transition-colors" aria-label="Email">
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green focus:ring-offset-2 focus:ring-offset-refut-black rounded">
                  Entrar a la app
                  <FaExternalLinkAlt className="w-3 h-3 opacity-70" aria-hidden />
                </a>
              </li>
              <li>
                <Link href="/terminos" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">
                  Aviso de privacidad
                </Link>
              </li>
              <li>
                <Link href="/beta" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">
                  ¿Quieres ser early adopter?
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Secciones</h4>
            <ul className="space-y-2">
              <li><a href="#que-es" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">Qué es ReFut</a></li>
              <li><a href="#funciones" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">Funciones</a></li>
              <li><a href="#plan" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">Plan</a></li>
              <li><a href="#como-funciona" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">Cómo funciona</a></li>
              <li><a href="#faq" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">FAQ</a></li>
              <li><a href="#contacto" className="text-white/70 hover:text-refut-green transition-colors focus:outline-none focus:ring-2 focus:ring-refut-green rounded">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-border mt-8 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2026 ReFut. Todos los derechos reservados. Hecho en México.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
