export interface FormData {
  nombre: string
  email: string
  ubicacion: string
  nivelJuego: string
  problemasPrincipales: string[]
  otrasProblematicas: string
  mayorReto: string
  interesEarlyAccess: boolean
}

export interface FormDataWithTimestamp extends FormData {
  timestamp: string
  id: string
  source: string
}
