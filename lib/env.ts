export const DEPLOY_ENV = process.env.NEXT_PUBLIC_DEPLOY_ENV || 'development'

export const IS_STAGING = DEPLOY_ENV === 'staging'
export const IS_PRODUCTION = DEPLOY_ENV === 'production'

/** URL pública de esta landing (marketing). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (IS_STAGING ? 'https://landing.refut.app' : 'https://refut.app')

/** URL de la webapp (jugadores + panel /owner). */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (IS_STAGING ? 'https://dev.refut.app' : 'https://app.refut.app')
