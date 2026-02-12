import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Nav,
  HeroSection,
  PurposeSection,
  FeaturesSection,
  GeographicContentSection,
  RoadmapSection,
  HowItWorksSection,
  AppAccessSection,
  FAQSection,
  AboutSection,
  ContactSection,
  Footer,
} from '../components'
import StructuredData from '../components/StructuredData'
import StickyCTA from '../components/StickyCTA'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ReFut – Canchas de fútbol en la ZMG, organiza partidos y torneos amateur en Guadalajara</title>
        <meta
          name="description"
          content="Encuentra canchas de fútbol rápido y soccer en la Zona Metropolitana de Guadalajara, organiza partidos, arma equipos y gestiona torneos con ReFut, gratis desde el navegador"
        />
        <meta name="keywords" content="canchas de fútbol rápido Guadalajara, rentar cancha Zapopan, canchas soccer ZMG, partidos fútbol amateur Guadalajara, ligas fútbol ZMG, canchas fútbol 7 Guadalajara, canchas fútbol 11 ZMG" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ReFut – Canchas de fútbol en la ZMG, organiza partidos y torneos amateur en Guadalajara" />
        <meta property="og:description" content="Canchas de fútbol en Guadalajara y la ZMG. Organiza partidos, arma equipos y reserva canchas gratis" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://refut.vercel.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReFut – Canchas de fútbol en la ZMG, organiza partidos y torneos amateur en Guadalajara" />
        <meta name="twitter:description" content="Canchas de fútbol en Guadalajara y la ZMG. Organiza partidos, arma equipos y reserva canchas gratis" />
        <StructuredData />
      </Head>

      <div className="min-h-screen bg-refut-black pb-16 md:pb-0">
        <Nav />
        <HeroSection />
        <PurposeSection />
        <FeaturesSection />
        <GeographicContentSection />
        <RoadmapSection />
        <HowItWorksSection />
        <AppAccessSection />
        <FAQSection />
        <AboutSection />
        <ContactSection />
        <Footer />
        <StickyCTA />
      </div>
    </>
  )
}

export default Home
