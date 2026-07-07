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
        <Nav />
        {!isReady ? (
          <div className="py-32 text-center text-white/60">Cargando...</div>
        ) : audience === 'duenos' ? (
          <OwnersView />
        ) : (
          <PlayersView />
        )}
        <ContactSection />
        <Footer />
        <StickyCTA />
      </div>
    </>
  )
}

export default Home
