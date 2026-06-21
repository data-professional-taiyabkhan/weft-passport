import Link from 'next/link'
import { ArrowRight, ShieldCheck, QrCode, FileCheck } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Decorative circles */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full border border-zari/20 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full border border-zari-bright/15 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute left-1/3 bottom-0 w-[300px] h-[300px] rounded-full bg-zari/5 translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 bg-white/[0.08] border border-white/[0.12] rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-zari-bright" />
            <span className="label-mono text-white/70 text-[10px]">Now live in UK & EU markets</span>
          </div>

          {/* Headline */}
          <h1 className="font-fraunces font-semibold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6">
            Tracing heritage,
            <br />
            <span className="text-zari-bright">thread by thread.</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Weft Passport certifies textiles at the SKU level — connecting South Asian master weavers to fashion markets with verified loom-to-label provenance.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/auth/register" className="btn-primary text-base px-7 py-3">
              Request Access <ArrowRight size={16} />
            </Link>
            <Link href="#how-it-works" className="btn flex items-center gap-2 text-white/80 border border-white/20 hover:bg-white/10 px-7 py-3 rounded-full text-base font-semibold">
              See how it works
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: ShieldCheck, label: 'SKU-level artisan verification' },
              { icon: FileCheck, label: 'EU ECGT & CSDDD compliant' },
              { icon: QrCode, label: 'QR-linked consumer provenance' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon size={15} className="text-zari-bright" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating stat card */}
      <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2">
        <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.12] rounded-2xl p-6 w-64 space-y-5">
          <div className="label-mono text-white/40 text-[9px]">Platform at a glance</div>
          {[
            { val: '100+', label: 'Verified Artisans', color: 'text-zari-bright' },
            { val: '500+', label: 'Certified Batches', color: 'text-white' },
            { val: '15-20%', label: 'Avg. Price Uplift', color: 'text-green-400' },
            { val: '5+', label: 'Brand LOIs Signed', color: 'text-white' },
          ].map(({ val, label, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-white/50 text-xs">{label}</span>
              <span className={`font-fraunces font-semibold text-xl ${color}`}>{val}</span>
            </div>
          ))}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-xs">ECGT enforcement: Sept 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
