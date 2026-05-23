import Header from '../components/layout/Header'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Benefits from '../components/landing/Benefits'
import Pricing from '../components/landing/Pricing'
import Testimonials from '../components/landing/Testimonials'
import CTA from '../components/landing/CTA'
import Footer from '../components/layout/Footer'

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-950">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}

export default LandingPage