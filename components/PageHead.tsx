import React from 'react'
import Head from 'next/head'
import { IS_STAGING, SITE_URL } from '../lib/env'

const OG_IMAGE = `${SITE_URL}/og/refut-og.png`

interface PageHeadProps {
  title: string
  description: string
  path?: string
  noindex?: boolean
}

const PageHead: React.FC<PageHeadProps> = ({ title, description, path = '', noindex }) => {
  const canonical = `${SITE_URL}${path}`
  const shouldNoindex = noindex ?? IS_STAGING

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/logo/favicon.svg" type="image/svg+xml" />
      {shouldNoindex && <meta name="robots" content="noindex, nofollow, noarchive" />}
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1376" />
      <meta property="og:image:height" content="768" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  )
}

export default PageHead
