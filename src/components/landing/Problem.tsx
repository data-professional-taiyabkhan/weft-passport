import { AlertTriangle, TrendingDown, Scale } from 'lucide-react'

export function Problem() {
  return (
    <section className="py-24 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="label-mono text-zari mb-4">The Problem</div>
          <h2 className="heading-serif text-4xl text-ink mb-5">
            Fashion’s transparency gap is now a legal liability
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            53.3% of fashion sustainability claims are vague, misleading, or unfounded. The EU’s ECGT Directive enforces from September 2026 — brands without verifiable evidence face fines up to 4% of annual turnover.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: AlertTriangle,
              title: 'Unverifiable Claims',
              desc: 'Machine-made fabrics routinely sold as handwoven. No system exists to distinguish authentic handloom from industrial imitation at SKU level.',
              stat: '53%',
              statLabel: 'of fashion claims unsubstantiated (EU Commission 2020)',
              color: 'text-madder',
              bg: 'bg-madder/5 border-madder/20',
            },
            {
              icon: TrendingDown,
              title: 'Artisan Value Leakage',
              desc: 'Genuine handloom products command 15–20% premiums in international markets, but this value is captured by intermediaries, not creators.',
              stat: '~0%',
              statLabel: 'of premium reaches original artisan without proof',
              color: 'text-amber',
              bg: 'bg-amber-soft border-amber/20',
            },
            {
              icon: Scale,
              title: 'Regulatory Exposure',
              desc: 'EU ECGT (Sep 2026), CSDDD (2027), Digital Product Passport, and UK Green Claims Code create overlapping enforcement frameworks.',
              stat: '4%',
              statLabel: 'of turnover max fine per EU member state',
              color: 'text-indigo',
              bg: 'bg-indigo-soft border-indigo/20',
            },
          ].map(({ icon: Icon, title, desc, stat, statLabel, color, bg }) => (
            <div key={title} className={`card p-6 border ${bg}`}>
              <Icon size={22} className={cn('mb-4', color)} />
              <h3 className="font-semibold text-lg text-ink mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">{desc}</p>
              <div className="pt-4 border-t border-border">
                <div className={`font-fraunces font-semibold text-3xl ${color}`}>{stat}</div>
                <div className="text-xs text-muted-soft mt-1">{statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
