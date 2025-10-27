import { useState } from 'react'

interface PrivacyNoticeProps {
  onAccept: () => void
  onDecline: () => void
}

export const PrivacyNotice = ({ onAccept, onDecline }: PrivacyNoticeProps) => {
  const [showFullText, setShowFullText] = useState(false)

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🔒 Aviso de Privacidad y Protección de Datos
          </h3>
          
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>¿Qué datos recopilamos?</strong> Solo tu nombre, email y comentarios sobre problemas en el fútbol amateur.
            </p>
            
            <p>
              <strong>¿Cómo los usamos?</strong> Para contactarte sobre la beta de ReFut y mejorar la plataforma basándonos en tus necesidades reales.
            </p>
            
            <p>
              <strong>¿Cómo los protegemos?</strong> Tus datos se almacenan de forma segura en Firebase (Google Cloud) con encriptación y acceso restringido.
            </p>
            
            {!showFullText && (
              <button
                onClick={() => setShowFullText(true)}
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Leer aviso completo y términos de uso
              </button>
            )}
            
            {showFullText && (
              <div className="mt-4 space-y-3">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold mb-2">📋 Términos de Uso</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Al registrarte, aceptas participar en la fase beta de ReFut</li>
                    <li>Tu información será usada únicamente para desarrollo del producto</li>
                    <li>No compartiremos tus datos con terceros sin tu consentimiento</li>
                    <li>Puedes solicitar la eliminación de tus datos en cualquier momento</li>
                    <li>ReFut es una plataforma en desarrollo - funcionalidades pueden cambiar</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold mb-2">🛡️ Protección de Datos</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Datos almacenados en servidores seguros con encriptación SSL/TLS</li>
                    <li>Acceso restringido solo al equipo de desarrollo de ReFut</li>
                    <li>Implementamos medidas anti-spam y validación de datos</li>
                    <li>Cumplimos con mejores prácticas de seguridad web</li>
                    <li>Monitoreo continuo de seguridad y actualizaciones regulares</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold mb-2">📞 Comunicación</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Te contactaremos por email sobre actualizaciones de la beta</li>
                    <li>Podrás recibir invitaciones a pruebas y encuestas</li>
                    <li>Respetamos tu privacidad - no spam ni venta de datos</li>
                    <li>Puedes darte de baja en cualquier momento</li>
                  </ul>
                </div>
                
                <button
                  onClick={() => setShowFullText(false)}
                  className="text-blue-600 hover:text-blue-800 underline font-medium text-xs"
                >
                  Ocultar detalles
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onAccept}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              ✅ Acepto y Continuar
            </button>
            <button
              onClick={onDecline}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors"
            >
              ❌ No Acepto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyNotice
