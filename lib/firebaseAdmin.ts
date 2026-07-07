import admin from 'firebase-admin'

function initializeAdmin(): admin.app.App | null {
  if (admin.apps.length > 0) {
    return admin.app()
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (!raw) return null

  try {
    const serviceAccount = JSON.parse(raw) as admin.ServiceAccount
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error)
    return null
  }
}

export function getAdminFirestore(): admin.firestore.Firestore | null {
  const app = initializeAdmin()
  if (!app) return null
  return admin.firestore(app)
}
