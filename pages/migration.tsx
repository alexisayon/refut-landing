import { useState, useEffect } from 'react'
import Head from 'next/head'
import { MigrationPanel } from '../components/MigrationPanel'

export default function MigrationPage() {
  const [localStorageCount, setLocalStorageCount] = useState(0)
  const [firebaseStats, setFirebaseStats] = useState({ totalUsers: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      // Contar usuarios en localStorage
      try {
        const localData = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
        setLocalStorageCount(localData.length)
      } catch (error) {
        console.error('Error accediendo a localStorage:', error)
        setLocalStorageCount(0)
      }

      // Cargar estadísticas de Firebase de forma segura
      loadFirebaseStats()
    }
  }, [])

  const loadFirebaseStats = async () => {
    try {
      setLoading(true)
      // Solo cargar Firebase si las variables de entorno están disponibles
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        const { BetaService } = await import('../lib/betaService')
        const stats = await BetaService.getPublicStats()
        setFirebaseStats(stats)
      } else {
        // Fallback cuando no hay variables de entorno
        setFirebaseStats({ totalUsers: 0 })
      }
    } catch (error) {
      console.error('Error cargando estadísticas de Firebase:', error)
      setFirebaseStats({ totalUsers: 0 })
    } finally {
      setLoading(false)
    }
  }

  const handleMigrationComplete = (migrationStats: { migrated: number, errors: number }) => {
    // Recargar estadísticas después de la migración
    loadFirebaseStats()
    setLocalStorageCount(0)
  }

  return (
    <>
      <Head>
        <title>Migración a Firebase - ReFut</title>
        <meta name="description" content="Migración segura de datos a Firebase" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔄 Migración a Firebase
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Migra tus datos de localStorage a Firebase para mayor seguridad, 
              escalabilidad y funcionalidades avanzadas.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* localStorage Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Datos Actuales</h3>
                  <p className="text-sm text-gray-600">Almacenados en localStorage</p>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {localStorageCount}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((localStorageCount / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Capacidad: {localStorageCount}/1000 usuarios
                </p>
              </div>
            </div>

            {/* Firebase Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Firebase</h3>
                  <p className="text-sm text-gray-600">Base de datos segura</p>
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {loading ? '...' : firebaseStats.totalUsers}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((firebaseStats.totalUsers / 10000) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Escalabilidad: Ilimitada
                </p>
              </div>
            </div>
          </div>

          {/* Migration Panel */}
          <div className="flex justify-center">
            <MigrationPanel onMigrationComplete={handleMigrationComplete} />
          </div>

          {/* Benefits */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              🚀 Beneficios de Firebase
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Seguridad</h3>
                <p className="text-gray-600 text-sm">
                  Datos protegidos con reglas de seguridad y autenticación
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Escalabilidad</h3>
                <p className="text-gray-600 text-sm">
                  Soporta millones de usuarios sin problemas de rendimiento
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rendimiento</h3>
                <p className="text-gray-600 text-sm">
                  Acceso rápido a datos desde cualquier lugar del mundo
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              📋 Instrucciones de Migración
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Configura tu proyecto Firebase en la consola</li>
              <li>Crea el archivo <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> con tus credenciales</li>
              <li>Configura Firestore con las reglas de seguridad</li>
              <li>Haz clic en "Iniciar Migración" arriba</li>
              <li>Verifica que los datos se migraron correctamente</li>
            </ol>
          </div>

          {/* Back to Landing */}
          <div className="text-center mt-8">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Volver a la Landing Page
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
