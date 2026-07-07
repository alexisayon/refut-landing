import type { NextPage } from 'next'
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
  CourtsCatalogSection,
  CommunityGallerySection,
  PartnerSpotlightSection,
} from '../components'
import {
  OwnerHeroSection,
  OwnerFeaturesSection,
  OwnerPersonasSection,
  OwnerHowItWorksSection,
  OwnerDemoSection,
  OwnerFAQSection,
  OwnerMembershipSection,
  OwnerCTASection,
} from '../components/sections/owner'
import LandingHead from '../components/LandingHead'
import StickyCTA from '../components/StickyCTA'
import { useAudience } from '../hooks/useAudience'

const PlayersView: React.FC = () => (
  <>
    <HeroSection />
    <CourtsCatalogSection />
    <PurposeSection />
    <FeaturesSection />
    <CommunityGallerySection />
    <GeographicContentSection />
    <RoadmapSection />
    <HowItWorksSection />
    <AppAccessSection />
    <FAQSection />
    <AboutSection />
  </>
)

const OwnersView: React.FC = () => (
  <>
    <OwnerHeroSection />
    <CourtsCatalogSection />
    <OwnerFeaturesSection />
    <PartnerSpotlightSection />
    <OwnerPersonasSection />
    <OwnerDemoSection />
    <CommunityGallerySection />
    <OwnerHowItWorksSection />
    <OwnerMembershipSection />
    <OwnerFAQSection />
    <OwnerCTASection />
  </>
)

const Home: NextPage = () => {
  const { audience, isReady } = useAudience()

  return (
    <>
      <LandingHead />
      <div className="min-h-screen bg-refut-black pb-16 md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-refut-green focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Saltar al contenido
        </a>
        <Nav />
        <main id="main-content">
        {!isReady ? (
          <div className="py-32 text-center text-white/60" aria-live="polite">
            Cargando...
          </div>
        ) : audience === 'duenos' ? (
          <OwnersView />
        ) : (
          <PlayersView />
        )}
        <ContactSection />
        </main>
        <Footer />
        <StickyCTA />
      </div>
    </>
  )
}

export default Home
