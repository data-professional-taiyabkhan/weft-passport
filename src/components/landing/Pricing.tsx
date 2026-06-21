import Link from 'next/link'
import { Check } from 'lucide-react'

export function Pricing() {
  const plans = [
    {
      name: 'Trial',
      price: 'Free',
      period: '60 days',
      desc: 'Full platform access to validate the workflow with your first collection.',
      highlight: false,
      features: [
        'Up to 5 certified batches',
        'Brand dashboard access',
        'QR provenance pages',
        'Basic compliance export',
        'Email support',
      ],
      cta: 'Start Free Trial',
      href: '/auth/register?plan=trial',
    },
    {
      name: 'Standard',
      price: '£175',
      period: 'per month',
      desc: 'For growing ethical brands building verified provenance at scale.',
      highlight: true,
      features: [
        'Up to 50 certified batches/year',
        'Full brand dashboard',
        'Unlimited QR generation',
        'ECGT & CSDDD compliance exports',
        'SKU-to-batch mapping',
        'Provenance page analytics',
        'Priority email support',
      ],
      cta: 'Get Started',
      href: '/auth/register?plan=standard',
      badge: 'Most Popular',
    },
    {
      name: 'Premium',
      price: '£325',
      period: 'per month',
      desc: 'For premium and heritage brands with high-volume certification needs.',
      highlight: false,
      features: [
        'Unlimited certified batches',
        'All Standard features',
        'Annual compliance report (£500 value included)',
        'DPP-ready data export',
        'Custom provenance page branding',
        'Dedicated account manager',
        'Quarterly strategy review',
      ],
      cta: 'Get Started',
      href: '/auth/register?plan=premium',
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="label-mono text-zari mb-4">Pricing</div>
          <h2 className="heading-serif text-4xl text-ink mb-5">
            Certification that pays for itself in the first collection
          </h2>
          <p className="text-muted text-lg">
            Brands using Weft Passport see 15–20% price uplifts on certified products. Every plan includes a 60-day trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-7 flex flex-col ${
                plan.highlight
                  ? 'bg-indigo-deep border-indigo ring-2 ring-zari/40 shadow-lg'
                  : ''
              }`}
            >
              {plan.badge && (
                <div className="inline-flex items-center gap-1.5 bg-zari text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 self-start">
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <div className={`font-mono font-semibold text-sm tracking-widest uppercase mb-2 ${
                  plan.highlight ? 'text-zari-bright' : 'text-muted'
                }`}>{plan.name}</div>
                <div className={`font-fraunces font-semibold text-4xl ${
                  plan.highlight ? 'text-white' : 'text-ink'
                }`}>
                  {plan.price}
                  {plan.price !== 'Free' && (
                    <span className={`text-base font-normal ml-1 ${
                      plan.highlight ? 'text-white/50' : 'text-muted'
                    }`}>/{plan.period}</span>
                  )}
                </div>
                <p className={`text-sm mt-2 leading-relaxed ${
                  plan.highlight ? 'text-white/60' : 'text-muted'
                }`}>{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${
                    plan.highlight ? 'text-white/80' : 'text-muted'
                  }`}>
                    <Check size={14} className="text-zari-bright mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={plan.highlight ? 'btn-primary text-center' : 'btn-secondary text-center'}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-muted text-sm mt-8">
          Per-batch certification fees apply: £175–£350 depending on tier. Onboarding fee: £400–£600.
          <Link href="/contact" className="text-zari hover:underline ml-1">Contact us</Link> for enterprise or bespoke pricing.
        </p>
      </div>
    </section>
  )
}
