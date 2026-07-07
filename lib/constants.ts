import { APP_URL, SITE_URL } from './env'

export { APP_URL, SITE_URL }

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

export const OWNER_PANEL_URL = `${APP_URL}/owner`
export const OWNER_CONTACT_URL = '#contacto-duenos'
export const OWNER_WHATSAPP_URL =
  'https://wa.me/5213310475942?text=Hola%2C%20soy%20due%C3%B1o%20de%20cancha%2Forganizador%20y%20me%20interesa%20ReFut'

export type Audience = 'jugadores' | 'duenos'

export const AUDIENCE_STORAGE_KEY = 'refut-audience'
