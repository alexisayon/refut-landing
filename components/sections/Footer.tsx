import React from 'react'
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok, FaEnvelope } from 'react-icons/fa'
import Logo from '../Logo'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo variant="footer" size="md" />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Construyendo la comunidad del fútbol amateur en México. 
              Tu voz, tu experiencia, tu comunidad.
            </p>
            <div className="flex space-x-4">
              {/* WhatsApp */}
              <a href="https://wa.me/5213310475942" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaWhatsapp className="w-6 h-6" />
              </a>
              
              {/* Instagram */}
              <a href="https://instagram.com/refut.mx" className="text-gray-400 hover:text-pink-400 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              
              {/* Facebook */}
              <a href="https://facebook.com/refut.mx" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              
              {/* TikTok */}
              <a href="https://tiktok.com/@refut.mx" className="text-gray-400 hover:text-black transition-colors">
                <FaTiktok className="w-6 h-6" />
              </a>
              
              {/* Email */}
              <a href="mailto:refut@gmail.com" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Proyecto</h4>
            <ul className="space-y-2">
              <li><a href="#proposito" className="text-gray-300 hover:text-white transition-colors">Propósito</a></li>
              <li><a href="#problemas" className="text-gray-300 hover:text-white transition-colors">Problemas</a></li>
              <li><a href="#estado" className="text-gray-300 hover:text-white transition-colors">Estado</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Beta Testing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ayuda</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ReFut. Todos los derechos reservados. Hecho con ❤️ en México.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
