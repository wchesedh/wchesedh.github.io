import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import ContactMe from '@/components/ContactMe'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <Projects />
      <Certifications />
      <ContactMe />
    </main>
  )
}

