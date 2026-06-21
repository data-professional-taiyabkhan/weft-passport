import { AlertTriangle, TrendingDown, Eye, Scale } from 'lucide-react';

const PROBLEMS = [
  {
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    title: 'Greenwashing Exposure',
    stat: '53.3%',
    statLabel: 'of environmental claims are misleading (EU Commission)',
    description: 'Brands claiming “handwoven” or “artisan-made” face regulatory penalties without verifiable evidence.',
  },
  {
    icon: TrendingDown,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'Artisan Value Leak',
    stat: '£0',
    statLabel: 'premium reaches the weaver without traceability',
    description: 'Machine-made textiles are routinely sold as handwoven. Genuine weavers lose the premium their craft deserves.',
  },
  {
    icon: Eye,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    title: 'Invisible Supply Chains',
    stat: '0',
    statLabel: 'existing platforms verify at artisan + loom level',
    description: 'Current traceability tools stop at factories or exporters — never reaching the individual artisan.',
  },
  {
    icon: Scale,
    color: 'text-weft-indigo',
    bg: 'bg-blue-50',
    title: 'Regulatory Deadlines',
    stat: 'Sept 26',
    statLabel: 'EU ECGT Directive enforcement date',
    description: 'Four major EU/UK compliance frameworks are now active, requiring third-party verified provenance claims.',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-weft-ivory" id="problem">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-weft-terracotta font-semibold text-sm uppercase tracking-widest">The Problem</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-weft-charcoal mt-3 mb-6">
            Fashion’s Provenance Crisis
          </h2>
          <p className="text-lg text-weft-muted leading-relaxed">
            The global fashion industry has a persistent transparency gap. Brands face regulatory exposure.
            Artisans face economic invisibility. No system bridges the two — until now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROBLEMS.map(({ icon: Icon, color, bg, title, stat, statLabel, description }) => (
            <div key={title} className="card hover:shadow-heritage transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={24} className={color} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-weft-charcoal text-lg mb-1">{title}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`font-serif font-bold text-2xl ${color}`}>{stat}</span>
                    <span className="text-xs text-weft-muted">{statLabel}</span>
                  </div>
                  <p className="text-sm text-weft-muted leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
