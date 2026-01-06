import { useState, useEffect } from 'react'
import Head from 'next/head'
import { BetaService } from '../lib/betaService'
import { MigrationService } from '../lib/betaService'

interface Registration {
  id?: string
  nombre: string
  email: string
  ubicacion: string
  nivelJuego: string
  problemasPrincipales?: string[]
  otrasProblematicas?: string
  mayorReto?: string
  interesEarlyAccess?: boolean
  selectedProblems?: string[]
  additionalComment?: string
  timestamp?: string
  source?: string
}

export default function CheckRegistrations() {
  const [listaPrincipal, setListaPrincipal] = useState<Registration[]>([])
  const [registrosIndividuales, setRegistrosIndividuales] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [migrating, setMigrating] = useState(false)
  const [migrationResult, setMigrationResult] = useState<{migrated: number, errors: number} | null>(null)
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'warning' | 'info'} | null>(null)

  const checkRegistrations = () => {
    setLoading(true)
    setMessage(null)
    
    try {
      // Leer lista principal
      let lista: Registration[] = []
      if (typeof window !== 'undefined') {
        const listaData = localStorage.getItem('refut_early_access_list')
        if (listaData) {
          lista = JSON.parse(listaData)
        }
      }
      
      // Leer registros individuales
      const individuales: Registration[] = []
      if (typeof window !== 'undefined') {
        const allKeys = Object.keys(localStorage)
        const registrationKeys = allKeys.filter(key => 
          key.startsWith('refut_early_access_') && 
          key !== 'refut_early_access_list'
        )
        
        registrationKeys.forEach(key => {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '{}')
            individuales.push(data)
          } catch (e) {
            console.error(`Error al parsear ${key}:`, e)
          }
        })
      }
      
      setListaPrincipal(lista)
      setRegistrosIndividuales(individuales)
      
      const total = Math.max(lista.length, individuales.length)
      
      if (total > 0) {
        setMessage({
          text: `✅ Se encontraron ${total} registros en localStorage`,
          type: 'success'
        })
      } else {
        setMessage({
          text: '⚠️ No se encontraron registros en localStorage',
          type: 'warning'
        })
      }
    } catch (error) {
      console.error('Error al revisar registros:', error)
      setMessage({
        text: '❌ Error al revisar registros. Revisa la consola.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const migrateToFirebase = async () => {
    setMigrating(true)
    setMessage(null)
    setMigrationResult(null)
    
    try {
      const result = await MigrationService.migrateLocalStorageData()
      setMigrationResult(result)
      
      if (result.migrated > 0) {
        setMessage({
          text: `✅ ${result.migrated} registros migrados exitosamente`,
          type: 'success'
        })
        
        // Recargar registros
        checkRegistrations()
        
        // Preguntar si desea limpiar localStorage
        if (result.errors === 0 && result.migrated > 0) {
          const confirmClean = window.confirm(
            `¿Deseas limpiar localStorage después de migrar ${result.migrated} registros?`
          )
          if (confirmClean) {
            MigrationService.clearLocalStorageData()
            setMessage({
              text: '✅ Registros migrados y localStorage limpiado',
              type: 'success'
            })
            checkRegistrations()
          }
        }
      } else {
        setMessage({
          text: '⚠️ No se encontraron registros para migrar',
          type: 'warning'
        })
      }
    } catch (error) {
      console.error('Error en la migración:', error)
      setMessage({
        text: '❌ Error al migrar. Revisa la consola.',
        type: 'error'
      })
    } finally {
      setMigrating(false)
    }
  }

  const exportToJSON = () => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        source: 'localStorage',
        totalRegistrations: listaPrincipal.length,
        registrations: listaPrincipal,
        individualRegistrations: registrosIndividuales
      }
      
      const json = JSON.stringify(exportData, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `refut-registros-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setMessage({
        text: '✅ Archivo JSON descargado exitosamente',
        type: 'success'
      })
    } catch (error) {
      console.error('Error al exportar:', error)
      setMessage({
        text: '❌ Error al exportar. Revisa la consola.',
        type: 'error'
      })
    }
  }

  useEffect(() => {
    // Revisar automáticamente al cargar
    checkRegistrations()
  }, [])

  const totalRegistros = Math.max(listaPrincipal.length, registrosIndividuales.length)
  const registrosAMostrar = listaPrincipal.length > 0 ? listaPrincipal : registrosIndividuales

  return (
    <>
      <Head>
        <title>Revisar Registros - ReFut</title>
        <meta name="description" content="Herramienta para revisar registros guardados en localStorage" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🔍 Revisar Registros de ReFut
            </h1>
            <p className="text-gray-600 mb-6">
              Herramienta para verificar registros guardados en localStorage
            </p>

            {/* Mensajes */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                message.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' :
                message.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' :
                message.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' :
                'bg-blue-50 border-blue-500 text-blue-800'
              }`}>
                {message.text}
              </div>
            )}

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-700 mb-1">Lista Principal</div>
                <div className="text-2xl font-bold text-blue-900">{listaPrincipal.length}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-700 mb-1">Registros Individuales</div>
                <div className="text-2xl font-bold text-purple-900">{registrosIndividuales.length}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-700 mb-1">Total Estimado</div>
                <div className="text-2xl font-bold text-green-900">{totalRegistros}</div>
              </div>
            </div>

            {/* Resultado de migración */}
            {migrationResult && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="text-blue-800">
                  <strong>Resultado de migración:</strong>
                  <ul className="mt-2 list-disc list-inside">
                    <li>{migrationResult.migrated} registros migrados</li>
                    <li>{migrationResult.errors} errores</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={checkRegistrations}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🔄 Revisando...' : '🔍 Revisar Registros'}
              </button>
              <button
                onClick={exportToJSON}
                disabled={totalRegistros === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                💾 Exportar a JSON
              </button>
              <button
                onClick={migrateToFirebase}
                disabled={migrating || totalRegistros === 0}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {migrating ? '🔄 Migrando...' : '🔄 Migrar a Firebase'}
              </button>
              <a
                href="/admin"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 inline-block"
              >
                📊 Ver Panel Admin
              </a>
            </div>

            {/* Tabla de registros */}
            {totalRegistros > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrosAMostrar.map((reg, index) => (
                      <tr key={reg.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {reg.nombre || 'Sin nombre'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reg.email || 'Sin email'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reg.ubicacion || 'Sin ubicación'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reg.nivelJuego || 'Sin nivel'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reg.timestamp || 'Sin fecha'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-600 text-lg mb-2">No se encontraron registros</p>
                <p className="text-gray-500 text-sm">
                  Los registros pueden estar solo en Firebase o se perdieron
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-800 mb-2">ℹ️ Información</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Los registros se buscan en localStorage con la clave "refut_early_access_list"</li>
                <li>• También se buscan registros individuales con claves que empiezan con "refut_early_access_"</li>
                <li>• La migración a Firebase requiere que Firebase esté correctamente configurado</li>
                <li>• Los registros exportados se guardan como archivo JSON</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
