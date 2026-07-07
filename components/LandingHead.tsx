import React from 'react'
import Head from 'next/head'
import StructuredData from './StructuredData'
import { useAudience } from '../hooks/useAudience'
import { IS_STAGING, SITE_URL } from '../lib/env'

const playerMeta = {
  title: 'ReFut – Canchas de fútbol en la ZMG, organiza partidos y torneos amateur en Guadalajara',
  description:
    'Encuentra canchas de fútbol rápido y soccer en la Zona Metropolitana de Guadalajara, organiza partidos, arma equipos y gestiona torneos con ReFut, gratis desde el navegador',
  keywords:
    'canchas de fútbol rápido Guadalajara, rentar cancha Zapopan, canchas soccer ZMG, partidos fútbol amateur Guadalajara, ligas fútbol ZMG, canchas fútbol 7 Guadalajara, canchas fútbol 11 ZMG',
}

const ownerMeta = {
  title: 'ReFut para dueños – Administra canchas, ligas y torneos en la ZMG',
  description:
    'Panel de administración para dueños de canchas y organizadores de ligas y torneos. Reservas, tabla en vivo, staff, árbitros, página pública y patrocinadores en ReFut.',
  keywords:
    'administrar cancha fútbol Guadalajara, software ligas fútbol amateur, gestión torneos soccer ZMG, reservas canchas Zapopan, panel administración deportiva',
}

const LandingHead: React.FC = () => {
  const { audience } = useAudience()
  const meta = audience === 'duenos' ? ownerMeta : playerMeta
  const canonical = SITE_URL

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/logo/favicon.svg" type="image/svg+xml" />
      {IS_STAGING && <meta name="robots" content="noindex, nofollow, noarchive" />}
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL}/logo/logorefut2.svg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={`${SITE_URL}/logo/logorefut2.svg`} />
      <StructuredData audience={audience} />
    </Head>
  )
}

export default LandingHead
