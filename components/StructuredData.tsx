import React from 'react'
import { APP_URL } from '../lib/constants'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://refut.app'

const StructuredData: React.FC = () => {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ReFut',
    description: 'Plataforma para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${APP_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'ReFut',
    description: 'Plataforma web para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara',
    url: SITE_URL,
    areaServed: {
      '@type': 'City',
      name: 'Zona Metropolitana de Guadalajara',
      containedIn: {
        '@type': 'State',
        name: 'Jalisco',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Guadalajara',
      addressRegion: 'Jalisco',
      addressCountry: 'MX',
    },
    serviceType: 'Canchas de fútbol, organización de partidos amateur, reservas de cancha',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué es ReFut?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ReFut es una plataforma web para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara. Funciona en navegador, sin instalar app, y está pensada para jugadores, organizadores y dueños de canchas.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Dónde está disponible?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ReFut está disponible en la Zona Metropolitana de Guadalajara (ZMG), incluyendo Guadalajara, Zapopan, Tlaquepaque, Tonalá y municipios cercanos. Pronto expandiremos a más ciudades.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Dónde puedo encontrar canchas de fútbol rápido en Guadalajara?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Con ReFut puedes buscar canchas de fútbol rápido en Guadalajara usando el mapa interactivo. Filtra por zona, precio y horario para encontrar la mejor cancha cerca de ti.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo rento una cancha en Zapopan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En ReFut puedes ver canchas disponibles en Zapopan, revisar horarios libres y hacer reservas directamente desde la plataforma. Todo el proceso es gratuito.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo me registro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Entra desde el navegador, crea cuenta con email o redes sociales y empieza a buscar canchas o partidos cerca de ti.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es gratis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Las funciones básicas como buscar canchas, crear partidos, armar equipos y hacer reservas son completamente gratuitas. Algunas funciones premium pueden tener costo en el futuro.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

export default StructuredData
