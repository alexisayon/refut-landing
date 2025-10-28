import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  where,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'

export interface BetaRegistration {
  id?: string
  nombre: string
  email: string
  ubicacion: string
  nivelJuego: string
  problemasPrincipales: string[]
  otrasProblematicas: string
  mayorReto: string
  interesEarlyAccess: boolean
  selectedProblems?: string[]
  additionalComment?: string
  timestamp: Timestamp
  source: string
}

export interface UserFeedback {
  id?: string
  userId: string
  problems: string[]
  additionalComment: string
  timestamp: Timestamp
}

// Servicio para manejar registros de beta
export class BetaService {
  private static readonly COLLECTION_NAME = 'beta_registrations'
  private static readonly FEEDBACK_COLLECTION = 'user_feedback'

  // Registrar nuevo usuario en beta
  static async registerUser(userData: Omit<BetaRegistration, 'timestamp' | 'source'>): Promise<string> {
    try {
      const registrationData: Omit<BetaRegistration, 'id'> = {
        ...userData,
        timestamp: Timestamp.now(),
        source: 'landing_page'
      }

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), registrationData)
      console.log('✅ Usuario registrado en Firebase:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('❌ Error registrando usuario:', error)
      throw error
    }
  }

  // Obtener estadísticas públicas (solo conteo)
  static async getPublicStats(): Promise<{ totalUsers: number }> {
    try {
      const q = query(collection(db, this.COLLECTION_NAME))
      const snapshot = await getDocs(q)
      return {
        totalUsers: snapshot.size
      }
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error)
      return { totalUsers: 0 }
    }
  }

  // Guardar feedback de problemas (sin datos personales)
  static async saveFeedback(feedback: Omit<UserFeedback, 'timestamp'>): Promise<string> {
    try {
      const feedbackData: Omit<UserFeedback, 'id'> = {
        ...feedback,
        timestamp: Timestamp.now()
      }

      const docRef = await addDoc(collection(db, this.FEEDBACK_COLLECTION), feedbackData)
      console.log('✅ Feedback guardado:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('❌ Error guardando feedback:', error)
      throw error
    }
  }

  // Obtener feedback agregado (para análisis)
  static async getFeedbackStats(): Promise<{ problemCounts: Record<string, number> }> {
    try {
      const q = query(collection(db, this.FEEDBACK_COLLECTION))
      const snapshot = await getDocs(q)
      
      const problemCounts: Record<string, number> = {}
      
      snapshot.forEach(doc => {
        const data = doc.data() as UserFeedback
        data.problems.forEach(problem => {
          problemCounts[problem] = (problemCounts[problem] || 0) + 1
        })
      })

      return { problemCounts }
    } catch (error) {
      console.error('❌ Error obteniendo feedback:', error)
      return { problemCounts: {} }
    }
  }

  // Obtener todos los registros (SOLO PARA ADMINISTRADORES)
  static async getAllRegistrations(): Promise<BetaRegistration[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('timestamp', 'desc')
      )
      const snapshot = await getDocs(q)
      
      const registrations: BetaRegistration[] = []
      snapshot.forEach(doc => {
        registrations.push({
          id: doc.id,
          ...doc.data()
        } as BetaRegistration)
      })

      return registrations
    } catch (error) {
      console.error('❌ Error obteniendo registros:', error)
      return []
    }
  }

  // Obtener estadísticas detalladas
  static async getDetailedStats(): Promise<{
    totalUsers: number
    problemCounts: Record<string, number>
    locationStats: Record<string, number>
    levelStats: Record<string, number>
    earlyAccessInterest: number
    recentRegistrations: number
  }> {
    try {
      const [publicStats, feedbackStats, allRegistrations] = await Promise.all([
        this.getPublicStats(),
        this.getFeedbackStats(),
        this.getAllRegistrations()
      ])

      const locationStats: Record<string, number> = {}
      const levelStats: Record<string, number> = {}
      let earlyAccessInterest = 0
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

      allRegistrations.forEach(reg => {
        // Estadísticas de ubicación
        locationStats[reg.ubicacion] = (locationStats[reg.ubicacion] || 0) + 1
        
        // Estadísticas de nivel
        levelStats[reg.nivelJuego] = (levelStats[reg.nivelJuego] || 0) + 1
        
        // Interés en early access
        if (reg.interesEarlyAccess) earlyAccessInterest++
      })

      const recentRegistrations = allRegistrations.filter(reg => 
        reg.timestamp.toMillis() > oneDayAgo.getTime()
      ).length

      return {
        totalUsers: publicStats.totalUsers,
        problemCounts: feedbackStats.problemCounts,
        locationStats,
        levelStats,
        earlyAccessInterest,
        recentRegistrations
      }
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas detalladas:', error)
      return {
        totalUsers: 0,
        problemCounts: {},
        locationStats: {},
        levelStats: {},
        earlyAccessInterest: 0,
        recentRegistrations: 0
      }
    }
  }
}

// Servicio para migración de datos existentes
export class MigrationService {
  // Migrar datos de localStorage a Firebase
  static async migrateLocalStorageData(): Promise<{ migrated: number, errors: number }> {
    try {
      const existingData = JSON.parse(localStorage.getItem('refut_early_access_list') || '[]')
      let migrated = 0
      let errors = 0

      for (const user of existingData) {
        try {
          await BetaService.registerUser({
            nombre: user.nombre,
            email: user.email,
            ubicacion: user.ubicacion,
            nivelJuego: user.nivelJuego,
            problemasPrincipales: user.problemasPrincipales || [],
            otrasProblematicas: user.otrasProblematicas || '',
            mayorReto: user.mayorReto || '',
            interesEarlyAccess: user.interesEarlyAccess || false,
            selectedProblems: user.selectedProblems || [],
            additionalComment: user.additionalComment || ''
          })
          migrated++
        } catch (error) {
          console.error('Error migrando usuario:', user, error)
          errors++
        }
      }

      console.log(`✅ Migración completada: ${migrated} usuarios migrados, ${errors} errores`)
      return { migrated, errors }
    } catch (error) {
      console.error('❌ Error en migración:', error)
      return { migrated: 0, errors: 1 }
    }
  }

  // Limpiar datos de localStorage después de migración
  static clearLocalStorageData(): void {
    try {
      localStorage.removeItem('refut_early_access_list')
      localStorage.removeItem('refut_simple_list')
      console.log('✅ Datos de localStorage limpiados')
    } catch (error) {
      console.error('❌ Error limpiando localStorage:', error)
    }
  }
}
