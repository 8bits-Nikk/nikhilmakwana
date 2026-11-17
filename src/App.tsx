import BackToTop from '@/components/general/back-to-top'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import AboutMeSection from '@/components/sections/about-me'
import ContactSection from '@/components/sections/contact'
import ExperienceSection from '@/components/sections/experiences'
import HeroSection from '@/components/sections/hero'
import SkillsSection from '@/components/sections/skills'
import TestimonialsSection from '@/components/sections/testimonials'
import WorkSection from '@/components/sections/work'
import ThemeProvider from '@/components/theme-provider'
import useHashScroll from '@/hooks/use-hash-scroll'

const App = () => {
  useHashScroll()

  return (
  <ThemeProvider>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-gray-50"
    >
      Skip to content
    </a>

    <Header />

    <main id="main" className="flex min-h-screen w-full flex-col">
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <ExperienceSection />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
    </main>

    <Footer />
    <BackToTop />
  </ThemeProvider>
  )
}

export default App
