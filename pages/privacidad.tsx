import Head from 'next/head'
import Link from 'next/link'
import Logo from '../components/Logo'

const Privacidad = () => {
  return (
    <>
      <Head>
        <title>Aviso de Privacidad - ReFut</title>
        <meta name="description" content="Aviso de privacidad y protección de datos de ReFut" />
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
              Aviso de Privacidad y Protección de Datos
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> Octubre 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Información General
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  En ReFut, nos comprometemos a proteger tu privacidad y datos personales. 
                  Este aviso explica cómo recopilamos, usamos, almacenamos y protegemos tu información 
                  cuando utilizas nuestros servicios.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Datos que Recopilamos
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Información Personal Básica
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Nombre completo</li>
                      <li>Dirección de correo electrónico</li>
                      <li>Ubicación geográfica (ciudad/estado)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Información de Uso
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Problemas identificados en el fútbol amateur</li>
                      <li>Comentarios y sugerencias</li>
                      <li>Preferencias de comunicación</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Datos Técnicos
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Dirección IP</li>
                      <li>Tipo de navegador y dispositivo</li>
                      <li>Fecha y hora de acceso</li>
                      <li>Páginas visitadas</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Cómo Usamos tu Información
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Utilizamos tus datos para los siguientes propósitos:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Desarrollo del producto:</strong> Mejorar ReFut basándonos en tus necesidades reales</li>
                  <li><strong>Comunicación:</strong> Enviarte actualizaciones sobre la beta y el desarrollo</li>
                  <li><strong>Validación:</strong> Confirmar que eres un usuario real y no un bot</li>
                  <li><strong>Análisis:</strong> Entender patrones de uso para mejorar la experiencia</li>
                  <li><strong>Soporte:</strong> Responder a tus consultas y brindar asistencia</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Almacenamiento y Seguridad
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Ubicación de los Datos
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Tus datos se almacenan en servidores seguros de Firebase (Google Cloud Platform) 
                      ubicados en centros de datos con certificaciones de seguridad internacionales.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Medidas de Seguridad
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Encriptación SSL/TLS en todas las comunicaciones</li>
                      <li>Encriptación de datos en reposo</li>
                      <li>Acceso restringido solo al equipo autorizado</li>
                      <li>Monitoreo continuo de seguridad</li>
                      <li>Actualizaciones regulares de seguridad</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Compartir Información
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>No vendemos, alquilamos ni compartimos tu información personal con terceros</strong>, 
                  excepto en las siguientes circunstancias:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Con tu consentimiento explícito</li>
                  <li>Para cumplir con obligaciones legales</li>
                  <li>Para proteger nuestros derechos y seguridad</li>
                  <li>Con proveedores de servicios que nos ayudan a operar (bajo acuerdos de confidencialidad)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Tus Derechos
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Tienes los siguientes derechos sobre tus datos personales:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Acceso:</strong> Solicitar una copia de tus datos</li>
                  <li><strong>Rectificación:</strong> Corregir información inexacta</li>
                  <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos</li>
                  <li><strong>Limitación:</strong> Restringir el procesamiento de tus datos</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Cookies y Tecnologías Similares
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia, 
                  analizar el uso del sitio y personalizar el contenido. Puedes controlar 
                  el uso de cookies a través de la configuración de tu navegador.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Retención de Datos
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Conservamos tus datos personales solo durante el tiempo necesario para 
                  cumplir con los propósitos descritos en este aviso, o según lo requiera 
                  la ley. Los datos de usuarios inactivos se eliminan después de 2 años.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Menores de Edad
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Nuestros servicios están dirigidos a personas mayores de 13 años. 
                  No recopilamos intencionalmente información de menores de 13 años. 
                  Si descubrimos que hemos recopilado datos de un menor, los eliminaremos inmediatamente.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Cambios a este Aviso
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Podemos actualizar este aviso de privacidad ocasionalmente. 
                  Te notificaremos sobre cambios significativos por correo electrónico 
                  o mediante un aviso en nuestro sitio web.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Contacto
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Si tienes preguntas sobre este aviso de privacidad o deseas ejercer 
                  tus derechos, puedes contactarnos:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Email:</strong> refutoficial@gmail.com
                  </p>
                  <p className="text-gray-700">
                    <strong>WhatsApp:</strong> +52 33 1047 5942
                  </p>
                  <p className="text-gray-700">
                    <strong>Asunto:</strong> "Consulta sobre Privacidad"
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

export default Privacidad
