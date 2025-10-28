import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const isAuth = localStorage.getItem('refut_admin_authenticated') === 'true'
      const timestamp = localStorage.getItem('refut_admin_timestamp')
      
      if (isAuth && timestamp) {
        // Verificar que la sesión no haya expirado (24 horas)
        const sessionTime = parseInt(timestamp)
        const now = Date.now()
        const twentyFourHours = 24 * 60 * 60 * 1000
        
        if (now - sessionTime < twentyFourHours) {
          setIsAuthenticated(true)
        } else {
          // Sesión expirada
          localStorage.removeItem('refut_admin_authenticated')
          localStorage.removeItem('refut_admin_timestamp')
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('refut_admin_authenticated')
    localStorage.removeItem('refut_admin_timestamp')
    setIsAuthenticated(false)
    router.push('/admin-login')
  }

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin-login')
    }
  }

  return {
    isAuthenticated,
    isLoading,
    logout,
    requireAuth
  }
}
