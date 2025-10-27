import { useState } from 'react'
import { BetaService, MigrationService } from '../lib/betaService'

interface MigrationPanelProps {
  onMigrationComplete: (stats: { migrated: number, errors: number }) => void
}

export const MigrationPanel = ({ onMigrationComplete }: MigrationPanelProps) => {
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationStats, setMigrationStats] = useState<{ migrated: number, errors: number } | null>(null)

  const handleMigration = async () => {
    setIsMigrating(true)
    try {
      const stats = await MigrationService.migrateLocalStorageData()
      setMigrationStats(stats)
      onMigrationComplete(stats)
      
      if (stats.errors === 0) {
        // Solo limpiar localStorage si no hubo errores
        MigrationService.clearLocalStorageData()
      }
    } catch (error) {
      console.error('Error en migración:', error)
    } finally {
      setIsMigrating(false)
    }
  }

  const getLocalStorageData = () => {
    if (typeof window === 'undefined') return 0
    try {
      const data = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
      return data.length
    } catch (error) {
      console.error('Error accediendo a localStorage:', error)
      return 0
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        🔄 Migración a Firebase
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Usuarios en localStorage: <strong>{getLocalStorageData()}</strong>
        </p>
        <p className="text-xs text-gray-500">
          Migra los datos existentes a Firebase para mayor seguridad y escalabilidad.
        </p>
      </div>

      {migrationStats && (
        <div className={`p-3 rounded-lg mb-4 ${
          migrationStats.errors === 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`text-sm ${
            migrationStats.errors === 0 ? 'text-green-800' : 'text-yellow-800'
          }`}>
            ✅ {migrationStats.migrated} usuarios migrados
            {migrationStats.errors > 0 && (
              <span className="block">⚠️ {migrationStats.errors} errores</span>
            )}
          </p>
        </div>
      )}

      <button
        onClick={handleMigration}
        disabled={isMigrating || getLocalStorageData() === 0}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isMigrating || getLocalStorageData() === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isMigrating ? '🔄 Migrando...' : '🚀 Iniciar Migración'}
      </button>

      {getLocalStorageData() === 0 && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          No hay datos para migrar
        </p>
      )}
    </div>
  )
}

// Hook para usar Firebase en componentes
export const useFirebaseStats = () => {
  const [stats, setStats] = useState<{ totalUsers: number }>({ totalUsers: 0 })
  const [loading, setLoading] = useState(true)

  const loadStats = async () => {
    try {
      setLoading(true)
      const firebaseStats = await BetaService.getPublicStats()
      setStats(firebaseStats)
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
      // Fallback a localStorage si Firebase falla (solo en cliente)
      if (typeof window !== 'undefined') {
        try {
          const localData = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
          setStats({ totalUsers: localData.length })
        } catch (localError) {
          console.error('Error accediendo a localStorage:', localError)
          setStats({ totalUsers: 0 })
        }
      } else {
        // Durante el build del servidor, usar valor por defecto
        setStats({ totalUsers: 0 })
      }
    } finally {
      setLoading(false)
    }
  }

  return { stats, loading, loadStats }
}
