import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { TrustBar } from '@/components/landing/TrustBar'
import { Problem } from '@/components/landing/Problem'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Features } from '@/components/landing/Features'
import { Pricing } from '@/components/landing/Pricing'
import { Compliance } from '@/components/landing/Compliance'
import { Testimonials } from '@/components/landing/Testimonials'
import { CTA } from '@/components/landing/CTA'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />
      <Hero />
      <TrustBar />
      <Problem />
      <HowItWorks />
      <Features />
      <Compliance />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
