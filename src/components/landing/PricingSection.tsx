import Link from 'next/link';
import { Check, Star } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    tier: 'trial',
    price: '£0',
    period: '60-day trial',
    subtitle: 'Included with brand onboarding',
    description: 'Explore the full platform and certify your first batches at no cost during your 60-day pilot.',
    features: [
      'Up to 5 certified batches',
      'QR provenance pages',
      'Brand dashboard access',
      'Basic compliance reports',
      'Email support',
    ],
    cta: 'Start Free Trial',
    href: '/signup',
    highlight: false,
    badge: null,
  },
  {
    name: 'Standard',
    tier: 'standard',
    price: '£175',
    period: '/month',
    subtitle: '+ per-batch certification fees',
    description: 'For established ethical brands seeking ongoing provenance certification and compliance documentation.',
    features: [
      'Unlimited batch submissions',
      'Full QR + provenance pages',
      'SKU mapping & management',
      'EU ECGT & UK GCC reports',
      'Artisan registry access',
      'QR scan analytics',
      'Priority email support',
    ],
    cta: 'Get Standard',
    href: '/signup?plan=standard',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Premium',
    tier: 'premium',
    price: '£325',
    period: '/month',
    subtitle: '+ per-batch certification fees',
    description: 'For premium and heritage fashion brands requiring deeper documentation and bespoke compliance support.',
    features: [
      'Everything in Standard',
      'Annual compliance packages',
      'CSDDD & DPP documentation',
      'Dedicated account manager',
      'Custom provenance page design',
      'Co-branded certification badge',
      'Quarterly compliance review',
    ],
    cta: 'Get Premium',
    href: '/signup?plan=premium',
    highlight: false,
    badge: null,
  },
];

const BATCH_FEES = [
  { tier: 'Standard Brand', fee: '£175 – £250 / batch' },
  { tier: 'Premium Brand',  fee: '£250 – £350 / batch' },
  { tier: 'Onboarding Fee', fee: '£400 – £600 (one-time)' },
  { tier: 'Premium Provenance Add-on', fee: '£300 – £600 / collection' },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-weft-ivory" id="pricing">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-weft-terracotta font-semibold text-sm uppercase tracking-widest">Pricing</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-weft-charcoal mt-3 mb-6">
            Transparent, Honest Pricing
          </h2>
          <p className="text-lg text-weft-muted">
            Start with a 60-day free trial included in every onboarding. Scale as your certified catalogue grows.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLANS.map(plan => (
            <div key={plan.name} className={`relative rounded-2xl border-2 p-8 flex flex-col ${
              plan.highlight
                ? 'border-weft-indigo bg-weft-indigo text-white shadow-heritage scale-105'
                : 'border-weft-sand bg-white'
            }`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-3 py-1 bg-weft-gold text-white text-xs font-bold rounded-full">
                    <Star size={10} fill="white" /> {plan.badge}
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className={`font-semibold text-lg mb-1 ${plan.highlight ? 'text-white' : 'text-weft-charcoal'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`font-serif text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-weft-indigo'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? 'text-white text-opacity-70' : 'text-weft-muted'}`}>{plan.period}</span>
                </div>
                <p className={`text-xs mb-3 ${plan.highlight ? 'text-white text-opacity-60' : 'text-weft-muted'}`}>{plan.subtitle}</p>
                <p className={`text-sm leading-relaxed ${plan.highlight ? 'text-white text-opacity-80' : 'text-weft-muted'}`}>{plan.description}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-weft-gold' : 'text-weft-moss'}`} />
                    <span className={`text-sm ${plan.highlight ? 'text-white text-opacity-85' : 'text-weft-charcoal'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className={`text-center py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200 ${
                plan.highlight
                  ? 'bg-weft-gold text-white hover:bg-opacity-90'
                  : 'bg-weft-indigo text-white hover:bg-weft-indigo-dark'
              }`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Per-batch fees */}
        <div className="card max-w-2xl mx-auto">
          <h4 className="font-semibold text-weft-charcoal mb-4 text-center">Per-Batch Certification Fees</h4>
          <div className="grid grid-cols-2 gap-3">
            {BATCH_FEES.map(({ tier, fee }) => (
              <div key={tier} className="flex items-center justify-between p-3 bg-weft-ivory rounded-lg">
                <span className="text-sm text-weft-muted">{tier}</span>
                <span className="text-sm font-semibold text-weft-indigo">{fee}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
