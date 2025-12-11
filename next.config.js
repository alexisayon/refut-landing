/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remover configuración de export estático para Vercel
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true
  // },
  // assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Configuración optimizada para Vercel
  reactStrictMode: true,
  // swcMinify está habilitado por defecto en Next.js 13+ y ya no es necesario especificarlo
  images: {
    domains: [],
  },
}

module.exports = nextConfig
