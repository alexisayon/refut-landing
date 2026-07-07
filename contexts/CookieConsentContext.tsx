import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  getStoredAnalyticsConsent,
  setStoredAnalyticsConsent,
  type AnalyticsConsent,
} from '../lib/cookieConsent'

type ConsentState = AnalyticsConsent | null | 'loading'

interface CookieConsentContextValue {
  consent: ConsentState
  hasAnalyticsConsent: boolean
  acceptAnalytics: () => void
  rejectAnalytics: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined)

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentState>('loading')

  useEffect(() => {
    setConsent(getStoredAnalyticsConsent())
  }, [])

  const acceptAnalytics = useCallback(() => {
    setStoredAnalyticsConsent('granted')
    setConsent('granted')
  }, [])

  const rejectAnalytics = useCallback(() => {
    setStoredAnalyticsConsent('denied')
    setConsent('denied')
  }, [])

  const value = useMemo(
    () => ({
      consent,
      hasAnalyticsConsent: consent === 'granted',
      acceptAnalytics,
      rejectAnalytics,
    }),
    [acceptAnalytics, consent, rejectAnalytics]
  )

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }
  return context
}
