import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Our Story — Weft Passport',
  description:
    'Weft Passport began as lived experience — surrounded by handloom weavers in India, and later watching machine-made fabrics sold as handwoven in the UK.',
};

const VALUES = [
  {
    bg: 'linear-gradient(150deg,var(--indigo),var(--indigo-deep))',
    title: 'Radical traceability',
    body: 'Transparency should be granular. We don’t stop at the country of origin — we go to the loom level, ensuring every product has a documented biography.',
    icon: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  },
  {
    bg: 'linear-gradient(150deg,#b08327,#946c14)',
    title: 'Artisan equity',
    body: 'We exist to protect the intellectual and manual property of master weavers. By verifying their craft, we help ensure they receive the premium value their skills deserve.',
    icon: (<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />),
  },
  {
    bg: 'linear-gradient(150deg,#3c7a52,#2c5e3d)',
    title: 'Integrity over hype',
    body: 'We prioritise field-truth photos, logs, and physical evidence over buzzwords. Our system is built on audit-ready documentation that stands up to strict UK and EU scrutiny.',
    icon: (<><circle cx="12" cy="8" r="6" /><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" /></>),
  },
  {
    bg: 'linear-gradient(150deg,#a8412c,#7a2e1e)',
    title: 'Cultural stewardship',
    body: 'We view South Asian textiles not as commodities, but as living history — preserving heritage techniques for future generations through digital preservation.',
    icon: (<><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" /><path d="M12 6v6l4 2" /></>),
  },
  {
    bg: 'linear-gradient(150deg,#5c5c8a,#3a3a5c)',
    title: 'Regulatory reliability',
    body: 'As a UK-based partner, we operate with the precision of a compliance firm — giving fashion brands the data-backed confidence to make bold, honest claims.',
    icon: (<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1.5" strokeDasharray="2 2" /></>),
  },
];

const TIMELINE = [
  { year: '2015 – 2019', title: 'Working in luxury retail and fashion design', body: 'Assistant Merchandiser at Xcess Merchandising Services managing luxury retail accounts for international clients including Restoration Hardware. Assistant Fashion Designer at Anant Fashion House conducting trend research and developing technical sketches.' },
  { year: '2020 – 2022', title: 'MA in Fashion Design at Sheffield Hallam University', body: 'Thesis focused on empowering women artisans in the craft sector, examining how artisan expertise, cultural identity, and design thinking combine to create products carrying meaning beyond material value. This research became the intellectual foundation of Weft Passport.' },
  { year: '2023 – 2024', title: 'Building Silk and Soil in the UK', body: 'Established an ethical fashion label sourcing directly from artisan partners in Varanasi. Built collections based on genuine heritage craftsmanship, documented production, and observed machine-made fabrics routinely sold as handwoven in UK markets.' },
  { year: '2025', title: 'Weft Passport is founded', body: 'Recognised that the gap between artisan production reality and market verification was structural, not anecdotal. Built the certification framework and field methodology, and secured 5+ Letters of Intent from UK and EU ethical fashion brands.' },
];

export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <section className="hero">
        <div className="container">
          <span className="eyebrow">Our story</span>
          <h1 className="h1" style={{ maxWidth: '760px' }}>Built from lived experience on both sides of the supply chain</h1>
          <p className="p-lead" style={{ marginTop: '16px', maxWidth: '680px' }}>
            Weft Passport did not begin as a business idea. It began as lived experience — surrounded by
            handloom weavers in India, and later watching machine-made fabrics sold as handwoven in the UK.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <span className="eyebrow">Founder</span>
              <h2 className="h2" style={{ marginBottom: '16px' }}>Mahjabeen Bano</h2>
              <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--ink)', lineHeight: 1.45, margin: '0 0 20px', fontStyle: 'italic' }}>
                &ldquo;I grew up surrounded by handloom textiles. My family was deeply embedded in the weaving
                trade in India, and from an early age I understood the difference between fabric made by hand
                on a traditional loom and fabric produced by machine.&rdquo;
              </blockquote>
              <p className="p-body" style={{ marginBottom: '12px' }}>
                Mahjabeen holds an MA in Fashion Design from Sheffield Hallam University, where her thesis
                examined how women artisans integrate cultural identity into craft work. Her experience spans
                luxury retail merchandising for international clients, trend research and technical design in
                India, and two years building Silk and Soil in the UK.
              </p>
              <p className="p-body">
                Weft Passport is not a market opportunity she identified from the outside. It grew directly from
                her lived experience on both sides of the provenance problem — the weaving communities of
                Varanasi, and the regulatory and commercial expectations of UK and EU fashion brands.
              </p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, var(--indigo-deep), var(--indigo))', borderRadius: 'var(--radius)', display: 'grid', placeItems: 'center', minHeight: '420px', color: 'var(--zari-bright)', fontFamily: 'var(--font-serif)', fontSize: '64px', fontWeight: 600 }}>MB</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="eyebrow">How it started</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>From Silk and Soil to Weft Passport</h2>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div className="timeline-item" key={t.year}>
                <div className="year">{t.year}</div>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Values</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>What we believe</h2>
          <div className="grid-3">
            {VALUES.map((v) => (
              <div className="output-card" key={v.title}>
                <div className="num" style={{ background: v.bg }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{v.icon}</svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="team" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="eyebrow">Team</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>The founding team</h2>
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              {[
                { initials: 'MB', bg: 'linear-gradient(135deg,var(--indigo-deep),var(--indigo))', name: 'Mahjabeen Bano', role: 'Lead Founder & CEO', bio: 'Principal designer of the Weft Passport certification framework. Lifelong access to Varanasi handloom weaving communities through family background. MA Fashion Design (Sheffield Hallam). Former luxury retail merchandising and fashion design experience across India and Italy.' },
                { initials: 'SC', bg: 'linear-gradient(135deg,#3a5c3a,#2a4a2a)', name: 'Sachin', role: 'Co-Founder & CTO', bio: 'Owns the technical architecture: proprietary relational data schema, mobile-first field capture, anomaly detection, compliance translation layer, and cloud infrastructure. MSc Big Data Analytics (Distinction, Birmingham City University). 3.5+ years of production-scale data systems architecture.' },
              ].map((m) => (
                <div key={m.name} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', marginBottom: '28px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '14px', background: m.bg, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '24px', flexShrink: 0 }}>{m.initials}</div>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 600 }}>{m.name}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--zari)', fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '.5px', marginBottom: '8px' }}>{m.role}</div>
                    <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.6 }}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 600 }}>Why this team cannot be easily replicated</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 14px' }}>
                The founding team combines field-calibrated methodology with production-scale technical
                architecture. The CEO’s multi-decade family relationships in Varanasi reduce trusted onboarding
                time from years to months. The CTO’s data architecture is designed specifically for non-linear,
                household-based artisan production that conventional supply-chain schemas cannot accommodate.
              </p>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                A well-funded competitor could replicate surface software in 4–6 months. They could not replicate
                the verified artisan registry, the proprietary SOPs, the cooperative trust networks, or the
                continuously maintained regulatory translation layer in that timeframe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="h2">Join the team building the verification layer for heritage fashion</h2>
          <p className="p-lead">We are hiring field coordinators, compliance advisors, and brand partnership managers. Get in touch.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-gold" style={{ fontSize: '15px', padding: '15px 28px' }}>Contact us</Link>
            <Link href="/" className="btn btn-outline" style={{ fontSize: '15px', padding: '15px 28px' }}>Back to home</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
