import Head from 'next/head'
import Link from 'next/link'
import Logo from '../components/Logo'

const Terminos = () => {
  return (
    <>
      <Head>
        <title>Términos y Condiciones - ReFut</title>
        <meta name="description" content="Términos y condiciones de uso de ReFut" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Logo variant="default" size="md" href="/" />
              <Link 
                href="/" 
                className="text-green-600 hover:text-green-800 font-medium"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Términos y Condiciones de Uso
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> Enero 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Aceptación de los Términos
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Al registrarte en ReFut y utilizar nuestros servicios, aceptas estar sujeto a estos 
                  términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, 
                  no debes utilizar nuestros servicios.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Descripción del Servicio
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ReFut es una plataforma en desarrollo que tiene como objetivo facilitar la organización 
                  y participación en partidos de fútbol amateur en México. Nuestros servicios incluyen:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Búsqueda y reserva de canchas</li>
                  <li>Organización de partidos y torneos</li>
                  <li>Seguimiento de marcadores en vivo</li>
                  <li>Sistema de reputación y calificaciones</li>
                  <li>Notificaciones inteligentes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Fase Beta y Desarrollo
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Actualmente ReFut se encuentra en fase beta. Esto significa que:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Las funcionalidades pueden cambiar sin previo aviso</li>
                  <li>Pueden ocurrir interrupciones temporales del servicio</li>
                  <li>Los datos pueden ser modificados durante el desarrollo</li>
                  <li>No garantizamos disponibilidad continua del servicio</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Registro y Cuenta de Usuario
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Para utilizar nuestros servicios, debes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Proporcionar información veraz y actualizada</li>
                  <li>Ser mayor de 13 años</li>
                  <li>Mantener la confidencialidad de tu cuenta</li>
                  <li>Notificarnos inmediatamente cualquier uso no autorizado</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Uso Aceptable
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Te comprometes a utilizar ReFut de manera responsable y legal. Está prohibido:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Usar el servicio para actividades ilegales</li>
                  <li>Harassar, amenazar o intimidar a otros usuarios</li>
                  <li>Intentar acceder a sistemas no autorizados</li>
                  <li>Distribuir malware o contenido malicioso</li>
                  <li>Violar derechos de propiedad intelectual</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Privacidad y Protección de Datos
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  El manejo de tus datos personales se rige por nuestro Aviso de Privacidad. 
                  Al usar nuestros servicios, también aceptas nuestras prácticas de privacidad.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Limitación de Responsabilidad
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  ReFut se proporciona "tal como está". No garantizamos que el servicio sea 
                  ininterrumpido, libre de errores o que satisfaga tus necesidades específicas. 
                  No seremos responsables por daños indirectos, incidentales o consecuenciales.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Modificaciones
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Los cambios entrarán en vigor inmediatamente después de su publicación. 
                  El uso continuado del servicio constituye aceptación de los nuevos términos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Terminación
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Podemos suspender o terminar tu acceso al servicio en cualquier momento, 
                  con o sin causa, con o sin previo aviso. También puedes terminar tu cuenta 
                  en cualquier momento.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Contacto
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Si tienes preguntas sobre estos términos, puedes contactarnos en:
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700">
                    <strong>Email:</strong> refut@gmail.com
                  </p>
                  <p className="text-gray-700">
                    <strong>WhatsApp:</strong> +52 33 1047 5942
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Terminos
