import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import CookieConsent from '../components/CookieConsent'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { AudienceProvider } from '../contexts/AudienceContext'
import { CookieConsentProvider, useCookieConsent } from '../contexts/CookieConsentContext'
import { pageview } from '../lib/gtag'
import '../styles/globals.css'

function AnalyticsGate() {
  const { hasAnalyticsConsent } = useCookieConsent()
  if (!hasAnalyticsConsent) return null
  return (
    <>
      <GoogleAnalytics />
      <Analytics />
    </>
  )
}

function RouteAnalytics() {
  const router = useRouter()
  const { hasAnalyticsConsent } = useCookieConsent()

  useEffect(() => {
    if (!hasAnalyticsConsent) return

    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    pageview(router.asPath)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [hasAnalyticsConsent, router.asPath, router.events])

  return null
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AudienceProvider>
      <CookieConsentProvider>
        <RouteAnalytics />
        <AnalyticsGate />
        <Component {...pageProps} />
        <CookieConsent />
      </CookieConsentProvider>
    </AudienceProvider>
  )
}
