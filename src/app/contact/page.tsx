'use client';
import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

const ITEMS = [
  { t: 'Email', d: <a href="mailto:hello@weftpassport.com">hello@weftpassport.com</a>, icon: (<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>) },
  { t: 'Phone', d: '+44 (0) 114 XXX XXXX', icon: (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />) },
  { t: 'Office', d: 'Sheffield, South Yorkshire, UK', icon: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>) },
  { t: 'Field operations', d: 'Varanasi, Uttar Pradesh, India', icon: (<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>) },
  { t: 'LinkedIn', d: <a href="#" target="_blank" rel="noreferrer">linkedin.com/company/weft-passport</a>, icon: (<><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>) },
];

const FAQ = [
  { q: 'How long does certification take?', a: 'From first batch submission to certified SKU, the typical timeline is 2–4 weeks. This includes field verification, cooperative co-signing, batch-to-SKU mapping, and compliance pack generation. The 60-day onboarding trial gives you time to validate the process before committing.' },
  { q: 'Can I use this for non-handloom textiles?', a: 'Weft Passport is purpose-built for South Asian handwoven textiles where artisan-level verification is structurally required and no existing system serves the gap. For other categories, we recommend general-purpose traceability platforms like TrusTrace or Sourcemap.' },
  { q: 'What if I only source one collection per year?', a: 'You can pause your subscription between collections and reactivate when needed. Your certified artisan registry and batch history remain intact. The per-batch certification fee is only charged when you actively certify new production.' },
  { q: 'Do you work with artisan cooperatives directly?', a: 'Yes. We partner with weaving cooperatives in Varanasi and are expanding to additional heritage clusters. If you represent a cooperative and want to join the verified artisan registry, please contact us directly — we provide training, field equipment, and ongoing verification support.' },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <>
      <SiteNav />

      <section className="hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1 className="h1">Get in touch</h1>
          <p className="p-lead" style={{ marginTop: '16px', maxWidth: '680px' }}>
            Book a demo, request a compliance assessment, or ask about partnership opportunities. We respond to
            every enquiry within 24 hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', gap: '48px' }}>
            <div className="contact-info">
              <span className="eyebrow">How to reach us</span>
              <h2 className="h2" style={{ marginBottom: '16px' }}>We’d love to hear from you</h2>
              <p className="p-lead" style={{ marginBottom: '28px' }}>
                Whether you’re a brand founder looking to certify your first collection, a sustainability lead
                mapping compliance timelines, or an artisan cooperative interested in joining the registry.
              </p>
              {ITEMS.map((it) => (
                <div className="item" key={it.t}>
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{it.icon}</svg>
                  </div>
                  <div><div className="t">{it.t}</div><div className="d">{it.d}</div></div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: '32px 28px' }}>
              {sent ? (
                <div className="success-state">
                  <div className="seal">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                  <h3>Message sent</h3>
                  <p>
                    Thank you for reaching out. We’ll get back to you within 24 hours. In the meantime, explore the{' '}
                    <Link href="/dashboard" style={{ color: 'var(--indigo)', fontWeight: 600 }}>brand dashboard</Link> or read more about{' '}
                    <Link href="/compliance" style={{ color: 'var(--indigo)', fontWeight: 600 }}>compliance frameworks</Link>.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>Send a message</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>Tell us what you’re looking for and we’ll get back to you within 24 hours.</p>
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                      <div className="form-group"><label>First name</label><input type="text" placeholder="Elena" required /></div>
                      <div className="form-group"><label>Last name</label><input type="text" placeholder="Marsh" required /></div>
                    </div>
                    <div className="form-group"><label>Email</label><input type="email" placeholder="elena@indigoandochre.com" required /></div>
                    <div className="form-group"><label>Company</label><input type="text" placeholder="Indigo & Ochre Ltd" /></div>
                    <div className="form-group">
                      <label>What are you interested in?</label>
                      <select required defaultValue="">
                        <option value="" disabled>Select an option</option>
                        <option value="demo">Book a demo</option>
                        <option value="assessment">Compliance readiness assessment</option>
                        <option value="certify">Certify my collections</option>
                        <option value="partner">Partnership / press enquiry</option>
                        <option value="career">Careers</option>
                        <option value="other">Something else</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea rows={4} placeholder="Tell us about your brand, your collections, and what compliance timeline you're working towards..." required />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                      <input type="checkbox" required style={{ width: '18px', height: '18px', accentColor: 'var(--indigo)', flexShrink: 0, marginTop: '2px' }} />
                      <span>I agree to be contacted by Weft Passport about my enquiry. See our <a href="#" style={{ color: 'var(--indigo)', fontWeight: 500 }}>Privacy Policy</a> for how we handle your data.</span>
                    </label>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                      {loading ? 'Sending…' : 'Send message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="eyebrow">FAQ</span>
          <h2 className="h2" style={{ marginBottom: '36px' }}>Common questions</h2>
          <div className="grid-2" style={{ alignItems: 'start' }}>
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
          <h2 className="h2">Ready to certify your next collection?</h2>
          <p className="p-lead">Book a 30-minute walkthrough. We’ll show you a live batch-to-SKU mapping, a compliance pack, and a consumer provenance page.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/login" className="btn btn-gold" style={{ fontSize: '15px', padding: '15px 28px' }}>Get started — sign in</Link>
            <Link href="/" className="btn btn-outline" style={{ fontSize: '15px', padding: '15px 28px' }}>Back to home</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
