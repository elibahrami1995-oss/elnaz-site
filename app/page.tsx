import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import JourneySection from './components/JourneySection'
import BrandsSection from './components/BrandsSection'
import EducationSection from './components/EducationSection'
import PortfolioSection from './components/PortfolioSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import RevealObserver from './components/RevealObserver'

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <BrandsSection />
        <EducationSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
      <RevealObserver />
    </>
  )
}
