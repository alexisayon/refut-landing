import type { GetServerSideProps } from 'next'
import { SITE_URL } from '../lib/env'

const STATIC_PATHS = ['/', '/beta', '/terminos', '/privacidad']

function buildSitemap(urls: string[]): string {
  const entries = urls
    .map(
      (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>
    <changefreq>weekly</changefreq>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = buildSitemap(STATIC_PATHS)

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
