import React from 'react'
import { APP_URL, SITE_URL } from '../lib/constants'
import { ownerFaqs } from '../lib/ownerContent'
import type { Audience } from '../lib/constants'

interface StructuredDataProps {
  audience?: Audience
}

const playerFaqs = [
  {
    question: '¿Qué es ReFut?',
    answer:
      'ReFut es una plataforma web para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara. Funciona en navegador, sin instalar app, y está pensada para jugadores, organizadores y dueños de canchas.',
  },
  {
    question: '¿Dónde está disponible?',
    answer:
      'ReFut está disponible en la Zona Metropolitana de Guadalajara (ZMG), incluyendo Guadalajara, Zapopan, Tlaquepaque, Tonalá y municipios cercanos. Pronto expandiremos a más ciudades.',
  },
  {
    question: '¿Cómo me registro?',
    answer:
      'Entra desde el navegador, crea cuenta con email o redes sociales y empieza a buscar canchas o partidos cerca de ti.',
  },
  {
    question: '¿Es gratis?',
    answer:
      'Sí. Las funciones básicas como buscar canchas, crear partidos, armar equipos y hacer reservas son completamente gratuitas. Algunas funciones premium pueden tener costo en el futuro.',
  },
]

const StructuredData: React.FC<StructuredDataProps> = ({ audience = 'jugadores' }) => {
  const faqs = audience === 'duenos' ? ownerFaqs : playerFaqs

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ReFut',
    description:
      audience === 'duenos'
        ? 'Panel de administración para dueños de canchas, complejos deportivos y organizadores de ligas y torneos en la ZMG'
        : 'Plataforma para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara',
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
    description:
      audience === 'duenos'
        ? 'Herramientas para administrar canchas, ligas y torneos de fútbol amateur en la Zona Metropolitana de Guadalajara'
        : 'Plataforma web para encontrar canchas de fútbol y organizar partidos amateur en la Zona Metropolitana de Guadalajara',
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
    serviceType:
      audience === 'duenos'
        ? 'Administración de canchas, ligas, torneos y reservas deportivas'
        : 'Canchas de fútbol, organización de partidos amateur, reservas de cancha',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
