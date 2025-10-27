import { useState, useEffect } from 'react'
import Head from 'next/head'
import { BetaService } from '../lib/betaService'

export default function TestFirebase() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const runTests = async () => {
    setIsLoading(true)
    setTestResults([])
    
    const results: string[] = []
    
    try {
      // Test 1: Verificar configuración
      results.push('🧪 Iniciando pruebas de Firebase...')
      setTestResults([...results])
      
      // Test 2: Probar registro de usuario
      results.push('📝 Probando registro de usuario...')
      setTestResults([...results])
      
      const testUser = {
        nombre: 'Usuario de Prueba',
        email: 'test@refut.com',
        ubicacion: 'Guadalajara',
        nivelJuego: 'Intermedio',
        problemasPrincipales: ['Falta de organización'],
        otrasProblematicas: 'Prueba de conectividad',
        interesEarlyAccess: true
      }
      
      const userId = await BetaService.registerUser(testUser)
      results.push(`✅ Usuario registrado con ID: ${userId}`)
      setTestResults([...results])
      
      // Test 3: Probar estadísticas
      results.push('📊 Probando estadísticas...')
      setTestResults([...results])
      
      const stats = await BetaService.getPublicStats()
      results.push(`✅ Estadísticas obtenidas: ${stats.totalUsers} usuarios`)
      setTestResults([...results])
      
      // Test 4: Probar feedback
      results.push('💬 Probando feedback...')
      setTestResults([...results])
      
      const feedbackId = await BetaService.saveFeedback({
        userId: 'test-user-123',
        problems: ['Falta de organización', 'Dificultad para encontrar jugadores'],
        additionalComment: 'Prueba de feedback desde test'
      })
      
      results.push(`✅ Feedback guardado con ID: ${feedbackId}`)
      setTestResults([...results])
      
      results.push('🎉 ¡Todas las pruebas pasaron exitosamente!')
      setTestResults([...results])
      
    } catch (error) {
      results.push(`❌ Error en las pruebas: ${error.message}`)
      setTestResults([...results])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Prueba de Firebase - ReFut</title>
        <meta name="description" content="Prueba de conectividad con Firebase" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🧪 Prueba de Firebase
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verifica que la conexión con Firebase funciona correctamente
            </p>
          </div>

          {/* Test Button */}
          <div className="text-center mb-8">
            <button
              onClick={runTests}
              disabled={isLoading}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                isLoading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? '🔄 Ejecutando Pruebas...' : '🚀 Ejecutar Pruebas'}
            </button>
          </div>

          {/* Test Results */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📋 Resultados de las Pruebas
            </h2>
            
            {testResults.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Haz clic en "Ejecutar Pruebas" para comenzar
              </p>
            ) : (
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      result.includes('✅') 
                        ? 'bg-green-50 border border-green-200' 
                        : result.includes('❌')
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <p className={`text-sm ${
                      result.includes('✅') 
                        ? 'text-green-800' 
                        : result.includes('❌')
                        ? 'text-red-800'
                        : 'text-blue-800'
                    }`}>
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Firebase Console Link */}
          <div className="mt-8 text-center">
            <a
              href="https://console.firebase.google.com/project/refut-app/firestore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              🔥 Abrir Firebase Console
            </a>
          </div>

          {/* Back to Migration */}
          <div className="text-center mt-4">
            <a 
              href="/migration" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Volver a Migración
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
