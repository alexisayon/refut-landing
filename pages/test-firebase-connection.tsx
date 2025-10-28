import { useState, useEffect } from 'react'
import { BetaService } from '../lib/betaService'

export default function TestFirebaseConnection() {
  const [status, setStatus] = useState<string>('Probando conexión...')
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setStatus('Probando conexión a Firebase...')
      
      // Probar estadísticas públicas
      const stats = await BetaService.getPublicStats()
      setStatus(`✅ Conexión exitosa! Usuarios encontrados: ${stats.totalUsers}`)
      
      // Probar obtener registros
      const registrations = await BetaService.getAllRegistrations()
      setData({
        totalUsers: stats.totalUsers,
        registrations: registrations.slice(0, 5), // Solo primeros 5
        totalRegistrations: registrations.length
      })
      
    } catch (err: any) {
      setError(err.message)
      setStatus('❌ Error de conexión')
      console.error('Error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔥 Test de Conexión Firebase
          </h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Estado de Conexión</h2>
            <div className={`p-4 rounded-lg ${
              error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
            }`}>
              <p className={`font-medium ${
                error ? 'text-red-800' : 'text-green-800'
              }`}>
                {status}
              </p>
              {error && (
                <p className="text-red-600 text-sm mt-2">
                  Error: {error}
                </p>
              )}
            </div>
          </div>

          {data && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">📊 Datos Obtenidos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-700">Total de usuarios:</p>
                    <p className="text-2xl font-bold text-blue-600">{data.totalUsers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Registros cargados:</p>
                    <p className="text-2xl font-bold text-blue-600">{data.totalRegistrations}</p>
                  </div>
                </div>
              </div>

              {data.registrations.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Primeros 5 Registros</h3>
                  <div className="space-y-2">
                    {data.registrations.map((reg: any, index: number) => (
                      <div key={reg.id || index} className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{reg.nombre}</p>
                            <p className="text-sm text-gray-600">{reg.email}</p>
                            <p className="text-sm text-gray-500">{reg.ubicacion} • {reg.nivelJuego}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {reg.timestamp ? new Date(reg.timestamp.toMillis()).toLocaleDateString() : 'Sin fecha'}
                            </p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              reg.interesEarlyAccess 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {reg.interesEarlyAccess ? 'Early Access' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex space-x-4">
            <button
              onClick={testConnection}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🔄 Probar Nuevamente
            </button>
            <a
              href="/admin"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              📊 Ir al Panel de Admin
            </a>
            <a
              href="/"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              🏠 Volver al Inicio
            </a>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔧 Si hay errores:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>1. Verifica que las reglas de Firestore permitan acceso a <code>beta_registrations</code></li>
              <li>2. Asegúrate de que la configuración de Firebase sea correcta</li>
              <li>3. Revisa la consola del navegador para más detalles del error</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
