import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Compliance & Regulations — Weft Passport',
  description:
    'Weft Passport converts artisan-level production data into the evidentiary formats required by UK and EU frameworks: ECGT, the Digital Product Passport, CSDDD and the UK Green Claims Code.',
};

const FRAMEWORKS = [
  {
    code: 'EC', color: 'linear-gradient(150deg,var(--indigo),var(--indigo-deep))',
    title: 'Empowering Consumers for the Green Transition', date: 'Applies 27 September 2026',
    body: 'Adopted by the EU in February 2024. Generic environmental claims such as "eco-friendly," "sustainable," or "artisan-made" are prohibited unless substantiated by recognised excellent environmental performance, based on third-party certification schemes meeting the directive’s verification requirements.',
    meta: [['Maximum penalty', '4% of annual turnover'], ['What you need', 'Product-level evidence']],
    cta: ['See compliance pack in dashboard', '/dashboard'],
  },
  {
    code: 'DP', color: 'linear-gradient(150deg,var(--madder),#7a2e1e)',
    title: 'Digital Product Passport — ESPR', date: 'Delegated act late 2026 / early 2027',
    body: 'Established under the Ecodesign for Sustainable Products Regulation (EU 2024/1781), with textiles confirmed as a priority category. Required data fields include manufacturing origin, production details, traceability identifiers, and QR or NFC access. Mandatory compliance ~18 months after the act.',
    meta: [['Mandatory', '~18 months after act'], ['What you need', 'Machine-readable record']],
    cta: ['See DPP export in dashboard', '/dashboard'],
  },
  {
    code: 'CS', color: 'linear-gradient(150deg,var(--green),#2c5e3d)',
    title: 'Corporate Sustainability Due Diligence Directive', date: 'Phased application from 2027',
    body: 'Entered force in July 2024. Extends due diligence responsibility beyond tier-one suppliers into the artisan households and cooperative structures where handloom production actually happens. Brands must demonstrate traceability through the full supply chain, not just the first exporter.',
    meta: [['Scope', 'Beyond tier-one suppliers'], ['What you need', 'Household-level verification']],
    cta: ['See field capture methodology', '/dashboard/field'],
  },
  {
    code: 'UK', color: 'linear-gradient(150deg,#b08327,#946c14)',
    title: 'UK Green Claims Code', date: 'Active enforcement now',
    body: 'Administered by the Competition and Markets Authority (CMA), which has moved from guidance into active enforcement, with investigations underway across the fashion sector. Claims must be truthful, clear, and substantiated with robust, credible, and up-to-date evidence.',
    meta: [['Status', 'Active enforcement'], ['What you need', 'Audit-ready substantiation']],
    cta: ['See CMA pack in dashboard', '/dashboard'],
  },
];

const PACKS = [
  { title: 'ECGT substantiation pack', items: ['Product-level artisan attribution with verified batch ID', 'Third-party certification scheme alignment statement', 'Geo-tagged production evidence and cooperative co-signature', 'Controlled claim language with governed usage terms', 'Annual re-certification schedule and audit trail'] },
  { title: 'CMA Green Claims pack', items: ['Truthful and accurate claim substantiation', 'Clear and unambiguous claim language', 'Robust, credible, and up-to-date evidence', 'Claims presented clearly and visibly', 'Consideration of full lifecycle where relevant'] },
  { title: 'Digital Product Passport export', items: ['Machine-readable JSON/XML record', 'Manufacturing origin and production details', 'Traceability identifiers (Weft Passport batch ID)', 'QR-linked consumer access point', 'Regulatory update feed as delegated acts evolve'] },
  { title: 'CSDDD due diligence pack', items: ['Supply chain mapping beyond tier-one', 'Artisan household verification records', 'Cooperative co-signing and community attestation', 'Periodic spot-check documentation', 'Risk assessment and mitigation records'] },
];

const TIMELINE = [
  { dot: 'var(--green)', period: 'Now — 2026', title: 'Prepare your evidence chain', body: 'UK CMA Green Claims Code is already under active enforcement. EU ECGT applies 27 September 2026. Brands need product-level verification in place before the products they certify enter the 2026 trading cycle.' },
  { dot: 'var(--zari)', period: '2027', title: 'CSDDD phased application begins', body: 'Corporate Sustainability Due Diligence Directive extends responsibility beyond tier-one suppliers. Household-level verification becomes mandatory for brands in scope.' },
  { dot: 'var(--madder)', period: '2027 — 2028', title: 'Digital Product Passport mandatory', body: 'Textile DPP delegated act expected late 2026 / early 2027, with mandatory compliance ~18 months later. Every textile product sold in the EU will need a machine-readable traceability record with QR access.' },
  { dot: 'var(--indigo)', period: '2028+', title: 'Embedded sector standard', body: 'Systems that established themselves during the 2026–2028 enforcement ramp-up become the recognised infrastructure. Late entrants face the combined barrier of methodology, dataset, and regulatory calibration.' },
];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);

export default function CompliancePage() {
  return (
    <>
      <SiteNav />

      <section className="hero">
        <div className="container">
          <span className="eyebrow">Compliance</span>
          <h1 className="h1" style={{ maxWidth: '760px' }}>Regulatory alignment is not optional. It is the product.</h1>
          <p className="p-lead" style={{ marginTop: '16px', maxWidth: '680px' }}>
            Weft Passport converts artisan-level production data into the specific evidentiary formats required
            by UK and EU regulatory frameworks. We do not retrofit. We build from the regulation forward.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Frameworks</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>The regulatory landscape</h2>
          {FRAMEWORKS.map((f) => (
            <div className="framework-card" key={f.title}>
              <div className="fc-head">
                <div className="fc-icon" style={{ background: f.color }}>{f.code}</div>
                <div>
                  <h3>{f.title}</h3>
                  <div className="date">{f.date}</div>
                </div>
              </div>
              <p>{f.body}</p>
              <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', margin: '16px 0' }}>
                {f.meta.map(([k, v]) => (
                  <div key={k} style={{ fontSize: '12px', color: 'var(--muted-soft)' }}>
                    <b style={{ color: 'var(--ink)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>{k}</b>{v}
                  </div>
                ))}
              </div>
              <Link href={f.cta[1]} className="link">{f.cta[0]} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="eyebrow">What we deliver</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>Compliance outputs from every certified SKU</h2>
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {PACKS.map((p) => (
              <div className="card" key={p.title} style={{ padding: '24px 28px' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>{p.title}</h3>
                <ul className="features">
                  {p.items.map((it) => (
                    <li key={it} style={{ alignItems: 'flex-start' }}><Check /> <span style={{ lineHeight: 1.5 }}>{it}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Why this matters now</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>The enforcement timeline</h2>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div className="timeline-item" key={t.period} style={{ ['--dot']: t.dot } as CSSProperties}>
                <div className="year">{t.period}</div>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="h2">Need a compliance readiness assessment?</h2>
          <p className="p-lead">
            We can review your current claims, identify gaps against ECGT, CSDDD, DPP, and UK Green Claims
            requirements, and build a certification roadmap for your next collection.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-gold" style={{ fontSize: '15px', padding: '15px 28px' }}>Request assessment</Link>
            <Link href="/login" className="btn btn-outline" style={{ fontSize: '15px', padding: '15px 28px' }}>Sign in to dashboard</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
