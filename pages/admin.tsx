import { useState, useEffect } from 'react'
import { BetaService, BetaRegistration } from '../lib/betaService'
import { Timestamp } from 'firebase/firestore'
import { useAdminAuth } from '../hooks/useAdminAuth'

interface AdminStats {
  totalUsers: number
  problemCounts: Record<string, number>
  locationStats: Record<string, number>
  levelStats: Record<string, number>
  earlyAccessInterest: number
  recentRegistrations: number
  allRegistrations: BetaRegistration[]
}

export default function Admin() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    problemCounts: {},
    locationStats: {},
    levelStats: {},
    earlyAccessInterest: 0,
    recentRegistrations: 0,
    allRegistrations: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Cargar estadísticas detalladas
      const detailedStats = await BetaService.getDetailedStats()
      
      // Cargar todos los registros (con datos personales)
      const allRegistrations = await BetaService.getAllRegistrations()

      setStats({
        ...detailedStats,
        allRegistrations
      })
    } catch (err) {
      console.error('Error cargando datos:', err)
      setError('Error cargando datos de Firebase')
    } finally {
      setLoading(false)
    }
  }

  const formatTimestamp = (timestamp: Timestamp) => {
    return new Date(timestamp.toMillis()).toLocaleString('es-MX')
  }

  const exportData = () => {
    const data = {
      summary: {
        totalUsers: stats.totalUsers,
        earlyAccessInterest: stats.earlyAccessInterest,
        recentRegistrations: stats.recentRegistrations,
        exportDate: new Date().toISOString()
      },
      problemCounts: stats.problemCounts,
      locationStats: stats.locationStats,
      levelStats: stats.levelStats,
      registrations: stats.allRegistrations.map(reg => ({
        id: reg.id,
        nombre: reg.nombre,
        email: reg.email,
        ubicacion: reg.ubicacion,
        nivelJuego: reg.nivelJuego,
        problemasPrincipales: reg.problemasPrincipales,
        otrasProblematicas: reg.otrasProblematicas,
        mayorReto: reg.mayorReto,
        interesEarlyAccess: reg.interesEarlyAccess,
        selectedProblems: reg.selectedProblems,
        additionalComment: reg.additionalComment,
        timestamp: reg.timestamp.toMillis(),
        source: reg.source
      }))
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `refut-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">🔒 Acceso Denegado</div>
          <p className="text-gray-600 mb-4">Necesitas autenticarte para acceder al panel de administración</p>
          <a
            href="/admin-login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ir al Login
          </a>
        </div>
      </div>
    )
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">📊 ReFut - Panel de Administración</h1>
            <div className="flex space-x-3">
              <button
                onClick={exportData}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                📥 Exportar Datos
              </button>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Estadísticas Generales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">👥 Total de Usuarios</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
              <p className="text-sm text-blue-700 mt-1">Registros en early access</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">🎯 Interés Early Access</h3>
              <p className="text-3xl font-bold text-green-600">{stats.earlyAccessInterest}</p>
              <p className="text-sm text-green-700 mt-1">
                {stats.totalUsers > 0 ? Math.round((stats.earlyAccessInterest / stats.totalUsers) * 100) : 0}% del total
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">📈 Registros Recientes</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.recentRegistrations}</p>
              <p className="text-sm text-purple-700 mt-1">Últimas 24 horas</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">🔥 Problemas Identificados</h3>
              <p className="text-3xl font-bold text-orange-600">{Object.keys(stats.problemCounts).length}</p>
              <p className="text-sm text-orange-700 mt-1">Categorías diferentes</p>
            </div>
          </div>

          {/* Problemas Más Comunes */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔥 Problemas Más Comunes</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              {Object.keys(stats.problemCounts).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay datos de feedback disponibles</p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(stats.problemCounts)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([problem, count]) => (
                      <div key={problem} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                        <span className="text-gray-800 font-medium">{problem}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ 
                                width: `${(count / Math.max(...Object.values(stats.problemCounts))) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-600 w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas de Ubicación */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 Distribución por Ubicación</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              {Object.keys(stats.locationStats).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay datos de ubicación disponibles</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(stats.locationStats)
                    .sort(([,a], [,b]) => b - a)
                    .map(([location, count]) => (
                      <div key={location} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">{location}</span>
                          <span className="text-lg font-bold text-blue-600">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: `${(count / Math.max(...Object.values(stats.locationStats))) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas de Nivel de Juego */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⚽ Nivel de Juego</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              {Object.keys(stats.levelStats).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay datos de nivel disponibles</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(stats.levelStats)
                    .sort(([,a], [,b]) => b - a)
                    .map(([level, count]) => (
                      <div key={level} className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <div className="text-2xl font-bold text-green-600">{count}</div>
                        <div className="text-sm text-gray-600 mt-1">{level}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabla de Registros Recientes */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Registros Recientes</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Early Access</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.allRegistrations.slice(0, 10).map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {reg.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reg.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reg.ubicacion}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reg.nivelJuego}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            reg.interesEarlyAccess 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {reg.interesEarlyAccess ? 'Sí' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTimestamp(reg.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {stats.allRegistrations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No hay registros disponibles
                </div>
              )}
            </div>
          </div>

          {/* Información de Seguridad */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔒 Información de Seguridad</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Los datos están encriptados en Firebase</li>
              <li>• Acceso restringido al equipo autorizado</li>
              <li>• Los datos se exportan de forma segura</li>
              <li>• Cumplimiento con políticas de privacidad</li>
            </ul>
          </div>

          {/* Acciones */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={loadData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🔄 Actualizar Datos
            </button>
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
