import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAdminSessionFromRequest,
  isAdminPanelEnabled,
  verifyAdminSessionToken,
} from '../../../lib/adminAuthServer'
import { getAdminFirestore } from '../../../lib/firebaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminPanelEnabled()) {
    return res.status(404).json({ error: 'Not found' })
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = getAdminSessionFromRequest(req)
  if (!verifyAdminSessionToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const db = getAdminFirestore()
  if (!db) {
    return res.status(503).json({
      error: 'Firebase Admin no configurado. Agrega FIREBASE_SERVICE_ACCOUNT_KEY en Vercel.',
    })
  }

  try {
    const snapshot = await db.collection('beta_registrations').orderBy('timestamp', 'desc').get()

    const allRegistrations = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        nombre: data.nombre || '',
        email: data.email || '',
        ubicacion: data.ubicacion || '',
        nivelJuego: data.nivelJuego || '',
        problemasPrincipales: data.problemasPrincipales || [],
        otrasProblematicas: data.otrasProblematicas || '',
        mayorReto: data.mayorReto || '',
        interesEarlyAccess: Boolean(data.interesEarlyAccess),
        selectedProblems: data.selectedProblems || [],
        additionalComment: data.additionalComment || '',
        timestamp: data.timestamp?.toMillis?.() ?? Date.now(),
        source: data.source || 'landing_page',
      }
    })

    const locationStats: Record<string, number> = {}
    const levelStats: Record<string, number> = {}
    const problemCounts: Record<string, number> = {}
    const mayorRetoStats: Record<string, number> = {}
    let earlyAccessInterest = 0

    allRegistrations.forEach((reg) => {
      locationStats[reg.ubicacion] = (locationStats[reg.ubicacion] || 0) + 1
      levelStats[reg.nivelJuego] = (levelStats[reg.nivelJuego] || 0) + 1
      if (reg.interesEarlyAccess) earlyAccessInterest += 1

      reg.problemasPrincipales.forEach((problem: string) => {
        problemCounts[problem] = (problemCounts[problem] || 0) + 1
      })

      if (reg.mayorReto?.trim()) {
        const key = reg.mayorReto.trim().toLowerCase()
        mayorRetoStats[key] = (mayorRetoStats[key] || 0) + 1
      }
    })

    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
    const recentRegistrations = allRegistrations.filter((reg) => reg.timestamp > oneDayAgo).length

    return res.status(200).json({
      totalUsers: allRegistrations.length,
      problemCounts,
      locationStats,
      levelStats,
      earlyAccessInterest,
      recentRegistrations,
      mayorRetoStats,
      allRegistrations,
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return res.status(500).json({ error: 'Error loading registrations' })
  }
}
