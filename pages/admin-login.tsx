import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Contraseña de administrador (en producción debería ser más segura)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'refut2024'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password === ADMIN_PASSWORD) {
      // Guardar sesión en localStorage
      localStorage.setItem('refut_admin_authenticated', 'true')
      localStorage.setItem('refut_admin_timestamp', Date.now().toString())
      
      // Redirigir al panel de administración
      router.push('/admin')
    } else {
      setError('Contraseña incorrecta')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            🔐 Acceso de Administrador
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa la contraseña para acceder al panel de administración
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Contraseña de administrador"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Acceder al Panel'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            ← Volver al inicio
          </a>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">🔒 Información de Seguridad</h3>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Solo personal autorizado puede acceder</li>
            <li>• La sesión expira automáticamente</li>
            <li>• Los datos están protegidos por contraseña</li>
            <li>• Acceso restringido por IP (en producción)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
