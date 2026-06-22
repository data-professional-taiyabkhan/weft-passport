import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Pricing — Weft Passport',
  description:
    'Transparent pricing for provenance certification. A 60-day trial is included with every brand onboarding; scale with per-batch fees as your certified catalogue grows.',
};

const PLANS = [
  {
    name: 'Standard', price: '£175', per: '/month',
    desc: 'For independent ethical brands sourcing their first verified collections.',
    features: ['Dashboard access', 'Batch tracking & status', 'QR code generation', 'Basic provenance pages', 'EU ECGT & UK GCC reports', 'Email support'],
    cta: 'Get started', href: '/contact', popular: false,
  },
  {
    name: 'Premium', price: '£325', per: '/month',
    desc: 'For premium-positioned brands with complex compliance needs and multi-collection management.',
    features: ['Everything in Standard', 'Full compliance pack generator', 'Audit-ready documentation exports', 'CSDDD & DPP documentation', 'Multi-collection management', 'Priority support'],
    cta: 'Get Premium', href: '/contact', popular: true,
  },
  {
    name: 'Enterprise', price: 'Custom', per: '',
    desc: 'For luxury houses and multi-brand retailers. Volume pricing, white-label assets, and bespoke compliance formats.',
    features: ['Volume-based batch pricing', 'Multi-region certification', 'White-label certification assets', 'Bespoke compliance formats', 'Dedicated account manager', 'Quarterly compliance review'],
    cta: 'Contact us', href: '/contact', popular: false,
  },
];

const BATCH_FEES = [
  ['Standard brand', '£175 – £250 / batch'],
  ['Premium brand', '£250 – £350 / batch'],
  ['Onboarding fee', '£400 – £600 (one-time)'],
  ['Premium provenance add-on', '£300 – £600 / collection'],
];

const FAQ = [
  { q: 'Is the trial really free?', a: 'Yes. Every brand onboarding includes a 60-day trial covering up to five certified batches at no cost, so you can validate the process before committing to a subscription.' },
  { q: 'How are per-batch fees charged?', a: 'Certification fees are charged only when you actively certify new production. Between collections you can pause your subscription while keeping your artisan registry and batch history intact.' },
  { q: 'What is included in compliance packs?', a: 'Every certified SKU produces audit-ready packs for EU ECGT, the UK Green Claims Code, the Digital Product Passport, and CSDDD due diligence — structured for direct regulatory filing.' },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />

      <section className="hero">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1 className="h1" style={{ maxWidth: '720px' }}>Anchored in risk reduction, not software cost</h1>
          <p className="p-lead" style={{ marginTop: '16px', maxWidth: '660px' }}>
            A brand paying £325/month is not paying for dashboard access. They are paying for the audit-ready
            evidence that protects them when their green claims are scrutinised. A 60-day trial is included with
            every onboarding.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="eyebrow">Plans</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>Choose the level of coverage you need</h2>
          <div className="grid-3">
            {PLANS.map((plan) => (
              <div className="pricing-card" key={plan.name} style={plan.popular ? { borderColor: 'var(--zari)' } : undefined}>
                {plan.popular && <div className="popular">Most popular</div>}
                <div className="tier-name">{plan.name}</div>
                <div className="price">{plan.price}{plan.per && <span>{plan.per}</span>}</div>
                <div className="desc">{plan.desc}</div>
                <ul className="features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`btn ${plan.popular ? 'btn-gold' : 'btn-ghost'}`} style={{ width: '100%', justifyContent: 'center' }}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              <span className="eyebrow">Per-batch fees</span>
              <h2 className="h2" style={{ marginBottom: '16px' }}>Certification priced to your production</h2>
              <p className="p-lead">
                Subscriptions cover the platform; per-batch certification fees cover the field verification work
                behind each production event. You only pay when you certify.
              </p>
            </div>
            <div className="card" style={{ padding: '10px 22px' }}>
              {BATCH_FEES.map(([tier, fee], i) => (
                <div key={tier} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '16px 0', borderBottom: i < BATCH_FEES.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <span style={{ fontSize: '14px', color: 'var(--muted)' }}>{tier}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--indigo)', fontFamily: 'var(--font-mono)' }}>{fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="eyebrow">Pricing FAQ</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>Questions about plans</h2>
          <div className="grid-3">
            {FAQ.map((f) => (
              <div className="card" key={f.q} style={{ padding: '24px' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 600 }}>{f.q}</h3>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="h2">Not sure which plan fits?</h2>
          <p className="p-lead">Tell us about your collections and compliance timeline — we’ll recommend the right starting point.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-gold" style={{ fontSize: '15px', padding: '15px 28px' }}>Talk to us</Link>
            <Link href="/compliance" className="btn btn-outline" style={{ fontSize: '15px', padding: '15px 28px' }}>See compliance</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
