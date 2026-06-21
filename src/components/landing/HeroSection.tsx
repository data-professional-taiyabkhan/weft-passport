'use client';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Sparkles } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Shield, label: 'EU Green Claims Ready' },
  { icon: CheckCircle, label: 'SKU-Level Verified' },
  { icon: Sparkles, label: 'Artisan-Authenticated' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-heritage-gradient" />
      <div className="absolute inset-0 loom-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-weft-indigo-dark opacity-40" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-weft-terracotta opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-weft-gold opacity-10 blur-3xl" />

      <div className="section-container relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full text-white text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-weft-gold animate-pulse" />
            Now accepting brand pilots — 5 LOIs secured
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Tracing Heritage,
            <br />
            <span className="text-weft-gold italic">Thread by Thread.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white text-opacity-85 max-w-2xl mb-8 leading-relaxed">
            Weft Passport certifies South Asian handwoven textiles at the SKU level — connecting
            master weavers to fashion markets with verified, loom-to-label provenance documentation.
            <span className="text-weft-gold font-medium"> EU Green Claims, CSDDD & DPP compliant.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/signup" className="btn-terracotta text-base px-8 py-4 justify-center">
              Start Your Pilot
              <ArrowRight size={20} />
            </Link>
            <Link href="/#how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white border-opacity-40 text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
              See How It Works
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
                <Icon size={16} className="text-weft-gold" />
                <span className="text-white text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="absolute top-1/3 right-0 hidden xl:flex flex-col gap-4 pr-8">
          <div className="card bg-white bg-opacity-95 backdrop-blur-sm w-52">
            <p className="text-3xl font-serif font-bold text-weft-indigo">15–20%</p>
            <p className="text-sm text-weft-muted mt-1">Price uplift on certified products</p>
          </div>
          <div className="card bg-white bg-opacity-95 backdrop-blur-sm w-52">
            <p className="text-3xl font-serif font-bold text-weft-moss">5+</p>
            <p className="text-sm text-weft-muted mt-1">Letters of Intent secured</p>
          </div>
          <div className="card bg-white bg-opacity-95 backdrop-blur-sm w-52">
            <p className="text-3xl font-serif font-bold text-weft-terracotta">Sept 2026</p>
            <p className="text-sm text-weft-muted mt-1">EU ECGT enforcement starts</p>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 20C1200 80 960 0 720 20C480 40 240 0 0 20L0 80Z" fill="#F9F5EE" />
        </svg>
      </div>
    </section>
  );
}
