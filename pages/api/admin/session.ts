import type { NextApiRequest, NextApiResponse } from 'next'
import {
  adminSessionCookieHeader,
  clearAdminSessionCookieHeader,
  createAdminSessionToken,
  getAdminSessionFromRequest,
  isAdminPanelEnabled,
  verifyAdminPassword,
  verifyAdminSessionToken,
} from '../../../lib/adminAuthServer'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdminPanelEnabled()) {
    return res.status(404).json({ error: 'Not found' })
  }

  if (req.method === 'GET') {
    const token = getAdminSessionFromRequest(req)
    return res.status(200).json({ authenticated: verifyAdminSessionToken(token) })
  }

  if (req.method === 'POST') {
    const password = typeof req.body?.password === 'string' ? req.body.password : ''
    if (!verifyAdminPassword(password)) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    const token = createAdminSessionToken()
    res.setHeader('Set-Cookie', adminSessionCookieHeader(token))
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearAdminSessionCookieHeader())
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', 'GET, POST, DELETE')
  return res.status(405).json({ error: 'Method not allowed' })
}
