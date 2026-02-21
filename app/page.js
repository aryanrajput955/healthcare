import Hero from './components/hero'
import Services from './components/services'
import Features from './components/features'
import About from './components/about'
import ProcessSection from './components/stepper'
import Contact from './components/contact'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Features />
      <About />
      <ProcessSection />
      <Contact />
    </div>
  )
}