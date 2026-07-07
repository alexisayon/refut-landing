import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Logo from '../components/Logo'
import { SITE_URL } from '../lib/env'

export default function StagingAccessPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const nextPath = typeof router.query.next === 'string' ? router.query.next : '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/staging-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, next: nextPath }),
      })

      const data = (await res.json()) as { ok?: boolean; redirectTo?: string; error?: string }

      if (!res.ok) {
        setError(data.error || 'No se pudo validar el acceso')
        return
      }

      await router.replace(data.redirectTo || '/')
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Acceso restringido — ReFut</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-refut-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo variant="white" size="md" href="/" />
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-2">Acceso restringido</h1>
            <p className="text-white/60 text-sm text-center mb-6">
              Vista previa de {SITE_URL}. Ingresa el código que te compartió el equipo ReFut.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="token" className="sr-only">
                  Código de acceso
                </label>
                <input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Código de acceso"
                  className="w-full px-4 py-3 rounded-xl bg-refut-black border border-dark-border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-refut-green"
                  required
                  autoComplete="off"
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-refut-green text-white font-semibold hover:bg-accent-greenDark transition-colors disabled:opacity-60"
              >
                {loading ? 'Verificando...' : 'Entrar'}
              </button>
            </form>
            <p className="text-white/40 text-xs text-center mt-6">
              También puedes usar el enlace directo con{' '}
              <code className="text-white/60">?access=TU_CODIGO</code>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
