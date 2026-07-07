import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/session')
      if (!res.ok) {
        setIsAuthenticated(false)
        return
      }
      const data = (await res.json()) as { authenticated?: boolean }
      setIsAuthenticated(Boolean(data.authenticated))
    } catch {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const logout = async () => {
    await fetch('/api/admin/session', { method: 'DELETE' })
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
    requireAuth,
  }
}
