import { FirebaseApp, initializeApp, getApps } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { Auth, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'refut-app',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let app: FirebaseApp | undefined
let db: Firestore | undefined
let auth: Auth | undefined

if (isConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
} else if (typeof window === 'undefined') {
  console.warn('Firebase configuration incomplete. Skipping initialization during build.')
}

export function getDb(): Firestore {
  if (!db) {
    throw new Error('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables.')
  }
  return db
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    throw new Error('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables.')
  }
  return auth
}

export { db, auth }
export default app
