// Google Analytics utility functions
import { GA_MEASUREMENT_ID } from './constants'
import { hasAnalyticsConsent } from './cookieConsent'

export type CtaTrackType = 'player' | 'owner' | 'app' | 'contact' | 'beta' | 'audience'

const CTA_ACTIONS: Record<CtaTrackType, string> = {
  player: 'player_cta_click',
  owner: 'owner_cta_click',
  app: 'app_cta_click',
  contact: 'contact_click',
  beta: 'beta_submit',
  audience: 'owner_audience_link_click',
}

// Log the pageview with their URL
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Log specific events happening (GA4-friendly param names)
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
    window.gtag('event', action, {
      category,
      label,
      value,
    })
  }
}

export const trackCta = (type: CtaTrackType, label: string) => {
  event({
    action: CTA_ACTIONS[type],
    category: 'conversion',
    label,
  })
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}
