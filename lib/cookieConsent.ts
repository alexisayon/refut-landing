export const ANALYTICS_CONSENT_KEY = 'refut_analytics_consent'

export type AnalyticsConsent = 'granted' | 'denied'

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(ANALYTICS_CONSENT_KEY)
  if (value === 'granted' || value === 'denied') return value
  return null
}

export function setStoredAnalyticsConsent(consent: AnalyticsConsent): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ANALYTICS_CONSENT_KEY, consent)
}

export function hasAnalyticsConsent(): boolean {
  return getStoredAnalyticsConsent() === 'granted'
}
