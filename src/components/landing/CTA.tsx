import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 bg-indigo-deep relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(ellipse at 30% 50%, #dcb24c 0%, transparent 60%)`
      }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-zari/20 translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div className="label-mono text-zari mb-5">Get Started</div>
        <h2 className="heading-serif text-4xl md:text-5xl text-white mb-6">
          ECGT enforcement starts
          <br />
          <span className="text-zari-bright">27 September 2026</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          Brands without verified provenance infrastructure face penalties, reputational damage, and premium market exclusion. Start your 60-day free trial today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary text-base px-8 py-3.5">
            Start Free Trial <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn flex items-center gap-2 text-white/80 border border-white/20 hover:bg-white/10 px-8 py-3.5 rounded-full text-base font-semibold">
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  )
}
