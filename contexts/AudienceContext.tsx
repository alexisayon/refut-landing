import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { AUDIENCE_STORAGE_KEY, type Audience } from '../lib/constants'
import { event } from '../lib/gtag'

interface AudienceContextValue {
  audience: Audience
  setAudience: (next: Audience) => void
  isReady: boolean
}

const AudienceContext = createContext<AudienceContextValue | null>(null)

function parseAudience(value: unknown): Audience | null {
  if (value === 'jugadores' || value === 'duenos') return value
  return null
}

export const AudienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [audience, setAudienceState] = useState<Audience>('duenos')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const fromQuery = parseAudience(router.query.audience)
    if (fromQuery) {
      setAudienceState(fromQuery)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(AUDIENCE_STORAGE_KEY, fromQuery)
      }
      setIsReady(true)
      return
    }

    if (typeof window !== 'undefined') {
      const stored = parseAudience(window.localStorage.getItem(AUDIENCE_STORAGE_KEY))
      if (stored) setAudienceState(stored)
    }
    setIsReady(true)
  }, [router.query.audience])

  const setAudience = useCallback(
    (next: Audience) => {
      setAudienceState(next)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(AUDIENCE_STORAGE_KEY, next)
      }

      event({
        action: 'audience_switch',
        category: 'engagement',
        label: next,
      })

      const query = { ...router.query, audience: next }
      void router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
    },
    [router]
  )

  const value = useMemo(
    () => ({ audience, setAudience, isReady }),
    [audience, setAudience, isReady]
  )

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
}

export function useAudience(): AudienceContextValue {
  const ctx = useContext(AudienceContext)
  if (!ctx) {
    throw new Error('useAudience must be used within AudienceProvider')
  }
  return ctx
}
