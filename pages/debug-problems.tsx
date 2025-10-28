import { useState, useEffect } from 'react'
import { BetaService, BetaRegistration } from '../lib/betaService'

export default function DebugProblems() {
  const [registrations, setRegistrations] = useState<BetaRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await BetaService.getAllRegistrations()
      setRegistrations(data)
    } catch (err: any) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getProblemStats = () => {
    const problemCounts: Record<string, number> = {}
    
    registrations.forEach(reg => {
      // Procesar problemasPrincipales
      if (reg.problemasPrincipales && Array.isArray(reg.problemasPrincipales)) {
        reg.problemasPrincipales.forEach(problem => {
          problemCounts[problem] = (problemCounts[problem] || 0) + 1
        })
      }
      
      // Procesar selectedProblems
      if (reg.selectedProblems && Array.isArray(reg.selectedProblems)) {
        reg.selectedProblems.forEach(problem => {
          problemCounts[problem] = (problemCounts[problem] || 0) + 1
        })
      }
    })
    
    return problemCounts
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const problemStats = getProblemStats()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔍 Debug - Problemas en Firebase
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Estadísticas de Problemas</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {Object.keys(problemStats).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay problemas registrados</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(problemStats)
                    .sort(([,a], [,b]) => b - a)
                    .map(([problem, count]) => (
                      <div key={problem} className="flex justify-between items-center bg-white p-3 rounded border">
                        <span className="text-gray-800">{problem}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                          {count}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Registros Individuales</h2>
            <div className="space-y-4">
              {registrations.slice(0, 5).map((reg, index) => (
                <div key={reg.id || index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{reg.nombre}</h3>
                      <p className="text-sm text-gray-600">{reg.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {reg.timestamp ? new Date(reg.timestamp.toMillis()).toLocaleDateString() : 'Sin fecha'}
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Problemas Principales:</h4>
                    {reg.problemasPrincipales && reg.problemasPrincipales.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {reg.problemasPrincipales.map((problem, i) => (
                          <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {problem}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No hay problemas registrados</p>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Problems:</h4>
                    {reg.selectedProblems && reg.selectedProblems.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {reg.selectedProblems.map((problem, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {problem}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No hay selected problems</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={loadData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🔄 Actualizar Datos
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
        </div>
      </div>
    </div>
  )
}
