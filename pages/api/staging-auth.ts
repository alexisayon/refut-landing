import type { NextApiRequest, NextApiResponse } from 'next'
import { STAGING_COOKIE, getStagingCookieValue, getStagingSecret, isStagingDeploy } from '../../lib/stagingAccess'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isStagingDeploy()) {
    return res.status(404).json({ error: 'Not found' })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secret = getStagingSecret()
  if (!secret) {
    return res.status(503).json({ error: 'Staging access is not configured' })
  }

  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : ''
  if (token !== secret) {
    return res.status(401).json({ error: 'Código de acceso incorrecto' })
  }

  const nextPath = typeof req.body?.next === 'string' && req.body.next.startsWith('/') ? req.body.next : '/'

  res.setHeader(
    'Set-Cookie',
    `${STAGING_COOKIE}=${getStagingCookieValue(secret)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 14}`
  )
  return res.status(200).json({ ok: true, redirectTo: nextPath })
}
