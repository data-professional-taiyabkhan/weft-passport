import Link from 'next/link';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export type LegalSection = { heading: string; paras: string[] };

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <SiteNav />

      <section className="hero" style={{ padding: '72px 0 48px' }}>
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1 className="h1">{title}</h1>
          <p className="p-lead" style={{ marginTop: '14px' }}>Last updated {updated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <p className="p-body" style={{ marginBottom: '28px' }}>{intro}</p>

          {sections.map((s) => (
            <div key={s.heading} style={{ marginBottom: '28px' }}>
              <h2 className="h2" style={{ fontSize: '22px', marginBottom: '12px' }}>{s.heading}</h2>
              {s.paras.map((p, i) => (
                <p key={i} className="p-body" style={{ marginBottom: '12px' }}>{p}</p>
              ))}
            </div>
          ))}

          <p style={{ marginTop: '32px', fontSize: '13px', color: 'var(--muted-soft)', lineHeight: 1.6 }}>
            This page is provided for general information and does not constitute legal advice. Questions?{' '}
            <Link href="/contact" style={{ color: 'var(--indigo)', fontWeight: 600 }}>Contact us</Link>.
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
