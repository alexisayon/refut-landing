import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDb } from './firebase'

export type LeadPersona = 'jugador' | 'cancha'
export type LeadContactMethod = 'whatsapp' | 'llamada' | 'email'

export interface LandingLead {
  nombre: string
  email: string
  telefono?: string
  persona: LeadPersona
  contactMethod?: LeadContactMethod
  mensaje?: string
  audience: 'jugadores' | 'duenos'
  timestamp: Timestamp
  source: string
}

export class LeadService {
  private static readonly COLLECTION = 'landing_leads'

  static async submitLead(
    data: Omit<LandingLead, 'timestamp' | 'source'>
  ): Promise<string> {
    const docRef = await addDoc(collection(getDb(), this.COLLECTION), {
      ...data,
      timestamp: Timestamp.now(),
      source: 'landing_contact_form',
    })
    return docRef.id
  }
}
