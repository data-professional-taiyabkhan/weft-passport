import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <nav className="site-nav">
        <div className="container">
          <Link href="/" className="brand">
            <div className="seal">WP</div>
            <div>
              <b>Weft Passport</b>
              <small>Provenance Certification</small>
            </div>
          </Link>
          <div className="nav-links" id="navLinks">
            <Link href="/" className="on">Home</Link>
            <Link href="/about">Our Story</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/compliance">Compliance</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login" className="btn btn-sm btn-primary" style={{marginLeft: '8px'}}>Sign in</Link>
          </div>
          <button className="mobile-toggle" id="mobileToggle" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="grid-2">
            <div style={{position: 'relative', zIndex: 2}}>
              <span className="eyebrow">Tracing heritage, thread by thread</span>
              <h1 className="h1">Provenance certification for South Asian handwoven textiles</h1>
              <p className="p-lead" style={{marginTop: '16px'}}>
                Verify artisan-made claims at the loom level. Generate compliance-ready evidence for EU Green Claims, Digital Product Passports, and UK CMA enforcement. Turn transparency into a premium asset.
              </p>
              <div className="cta-row">
                <Link href="/login" className="btn btn-gold" style={{fontSize: '15px', padding: '13px 26px'}}>Get started &amp; book a demo</Link>
                <Link href="/about" className="btn btn-outline" style={{fontSize: '15px', padding: '13px 26px'}}>Read our story</Link>
              </div>
              <div className="stat-row">
                <div className="s">
                  <div className="n">15–20%</div>
                  <div className="l">Price uplift on certified products</div>
                </div>
                <div className="s">
                  <div className="n">5</div>
                  <div className="l">Letters of Intent from UK &amp; EU brands</div>
                </div>
                <div className="s">
                  <div className="n">27 Sep</div>
                  <div className="l">ECGT enforcement begins 2026</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="dash-mock">
                <div className="dm-bar">
                  <div className="dot"/><div className="dot"/><div className="dot"/>
                  <span style={{fontSize: '11px', color: 'var(--muted)', marginLeft: '8px', fontFamily: 'var(--font-mono)'}}>Brand Dashboard</span>
                </div>
                <div className="dm-body">
                  <div className="dm-stat">
                    <div className="s"><div className="n">6</div><div className="l">Verified batches</div></div>
                    <div className="s"><div className="n">1</div><div className="l">Certified SKU</div></div>
                    <div className="s"><div className="n">97</div><div className="l">Days to ECGT</div></div>
                  </div>
                  <div style={{height: '8px', background: 'var(--line)', borderRadius: '4px', marginBottom: '8px', overflow: 'hidden'}}>
                    <div style={{width: '65%', height: '100%', background: 'linear-gradient(90deg, var(--indigo), var(--zari))'}}></div>
                  </div>
                  <div style={{fontSize: '11px', color: 'var(--muted)', marginBottom: '12px'}}>Amara Handwoven Sari — 65% mapped</div>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <div style={{flex: 1, height: '40px', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '10px', color: 'var(--muted)'}}>Banarasi brocade 18.5m</div>
                    <div style={{flex: 1, height: '40px', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '10px', color: 'var(--muted)'}}>Jamdani 12.0m</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="dark-section">
        <div className="container">
          <span className="eyebrow">The problem</span>
          <h2 className="h2" style={{marginBottom: '12px'}}>The transparency gap is now a regulatory and commercial risk</h2>
          <p className="p-lead" style={{maxWidth: '720px'}}>
            Most supply-chain tools trace to factories. Fair trade certifies groups. Neither proves a specific garment was handwoven by a specific artisan. The result: machine-made textiles sold as handloom, and brands exposed to greenwashing penalties.
          </p>
          <div className="problem-grid">
            <div className="problem-card">
              <h3>For brands</h3>
              <p>Claims like &ldquo;handwoven&rdquo; and &ldquo;artisan-made&rdquo; must now be substantiated with product-level evidence under the EU Green Claims Directive, CSDDD, and UK Green Claims Code. Without verification infrastructure, brands face regulatory penalties of up to 4% of annual turnover, reputational damage, and loss of premium positioning.</p>
            </div>
            <div className="problem-card">
              <h3>For artisans</h3>
              <p>Genuine handloom commands significant premiums in UK and EU markets, but those premiums are captured by intermediaries because buyers cannot reliably distinguish authentic handloom from machine-made imitation. The artisan behind the product becomes invisible.</p>
            </div>
          </div>
          <div className="stat-row" style={{marginTop: '40px'}}>
            <div className="s"><div className="n">53.3%</div><div className="l">Of EU environmental claims were vague, misleading, or unfounded</div></div>
            <div className="s"><div className="n">2.5%</div><div className="l">Of global trade is counterfeit goods — textiles among the most affected</div></div>
            <div className="s"><div className="n">4%</div><div className="l">Maximum ECGT penalty per member state of annual turnover</div></div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section" style={{background: 'var(--paper)'}}>
        <div className="container">
          <span className="eyebrow">The solution</span>
          <h2 className="h2" style={{marginBottom: '12px'}}>Field-embedded provenance, verified at the loom</h2>
          <p className="p-lead" style={{maxWidth: '720px', marginBottom: '40px'}}>
            Weft Passport captures structured production data at source — artisan identity, loom type, cooperative co-signing, geo-tagged media — and converts it into SKU-level compliance evidence that stands up to UK and EU regulatory scrutiny.
          </p>
          <div className="grid-3">
            <div className="output-card">
              <div className="num">01</div>
              <h3>Verified artisan-level traceability</h3>
              <p>Each textile batch is linked to a specific artisan, loom, household, and production event. Not a factory. Not a region. A person, a place, and a timestamp.</p>
            </div>
            <div className="output-card">
              <div className="num">02</div>
              <h3>Compliance-ready documentation</h3>
              <p>Structured evidence aligned with ECGT, CSDDD, Digital Product Passport, and UK Green Claims Code requirements. Audit-ready exports, not supplier declarations.</p>
            </div>
            <div className="output-card">
              <div className="num">03</div>
              <h3>Consumer-facing transparency</h3>
              <p>QR-linked provenance pages that show who made the garment, where, and how. Turn compliance data into a premium storytelling and conversion asset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">How it works</span>
          <h2 className="h2" style={{marginBottom: '36px'}}>Three layers. One continuous chain of evidence.</h2>
          <div className="grid-2" style={{alignItems: 'stretch'}}>
            <div>
              <div className="layer-card">
                <span className="badge">Layer 1</span>
                <div>
                  <h4>Field verification</h4>
                  <p>Field teams visit artisan households directly, capturing structured data: identity, cooperative affiliation, loom type, techniques, and geo-tagged photo and video evidence. Cooperative co-signing provides community-level validation.</p>
                </div>
              </div>
              <div className="layer-card">
                <span className="badge">Layer 2</span>
                <div>
                  <h4>Digital record traceability</h4>
                  <p>A purpose-built relational schema connects artisans, households, looms, batches, and SKUs through many-to-many relationships. Append-only event logs with cryptographic hashing provide tamper-evident history without blockchain overhead.</p>
                </div>
              </div>
              <div className="layer-card">
                <span className="badge">Layer 3</span>
                <div>
                  <h4>Compliance translation</h4>
                  <p>Verified production data is mapped to the specific evidentiary formats required by each UK and EU regulatory framework. Continuously maintained as ECGT, DPP, CSDDD, and UK Green Claims guidance evolves through 2026–2028.</p>
                </div>
              </div>
            </div>
            <div style={{background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px', boxShadow: 'var(--shadow)'}}>
              <div className="eyebrow" style={{marginBottom: '16px'}}>Data flow</div>
              {[
                {color: 'linear-gradient(150deg,var(--indigo),var(--indigo-deep))', label: 'Artisan household', sub: 'Varanasi cluster · Madanpura Bunkar Samiti'},
                {color: 'linear-gradient(150deg,#b08327,#946c14)', label: 'Verified batch', sub: 'WP-BATCH-1183 · Banarasi brocade 18.5m'},
                {color: 'linear-gradient(150deg,var(--green),#2c5e3d)', label: 'Brand SKU mapping', sub: 'Amara Handwoven Sari · SS25-SAR-014'},
                {color: 'linear-gradient(150deg,var(--madder),#7a2e1e)', label: 'Compliance output', sub: 'ECGT pack · CMA Green Claims · QR provenance'},
              ].map((item, i) => (
                <div key={i}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
                    <div style={{width: '44px', height: '44px', borderRadius: '10px', background: item.color, display: 'grid', placeItems: 'center', color: '#fff', flexShrink: 0}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 600, fontSize: '14px'}}>{item.label}</div>
                      <div style={{fontSize: '12px', color: 'var(--muted)'}}>{item.sub}</div>
                    </div>
                  </div>
                  {i < 3 && <div style={{height: '28px', borderLeft: '2px dashed var(--line)', marginLeft: '21px'}}/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory urgency */}
      <section className="dark-section">
        <div className="container">
          <span className="eyebrow">Why now</span>
          <h2 className="h2" style={{marginBottom: '16px'}}>Regulatory enforcement is not coming. It is here.</h2>
          <p className="p-lead" style={{maxWidth: '720px', marginBottom: '36px'}}>
            Three major frameworks are converging simultaneously. The infrastructure brands need to comply does not yet exist for South Asian handloom textiles. Weft Passport is building it.
          </p>
          <div className="problem-grid" style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
            {[
              {badge: 'EC', title: 'EU Green Claims (ECGT)', body: 'ECGT applies from 27 September 2026. Generic claims like "eco-friendly" or "artisan-made" are prohibited without recognised third-party verification. Fines up to 4% of annual turnover per member state.'},
              {badge: 'UK', title: 'UK Green Claims Code', body: 'The CMA has moved from guidance to active enforcement. Investigations into unsupported sustainability claims across the fashion sector are already underway. Brands making handwoven or artisan-made claims without product-level evidence are in the enforcement crosshairs.'},
              {badge: 'CS', title: 'CSDDD', body: 'Corporate Sustainability Due Diligence Directive entered force July 2024, with phased application from 2027. Extends due diligence responsibility beyond tier-one suppliers — directly into artisan households and cooperative structures.'},
              {badge: 'DP', title: 'Digital Product Passport', body: 'ESPR established the DPP framework with textiles confirmed as a priority category. Required fields — manufacturing origin, production details, traceability identifiers, QR access — directly align with Weft Passport\'s existing pilot outputs.'},
            ].map((item, i) => (
              <div className="problem-card" key={i}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px'}}>
                  <div style={{width: '36px', height: '36px', borderRadius: '8px', background: 'var(--zari)', display: 'grid', placeItems: 'center', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', flexShrink: 0}}>{item.badge}</div>
                  <h3 style={{margin: 0}}>{item.title}</h3>
                </div>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Platform features</span>
          <h2 className="h2" style={{marginBottom: '36px'}}>Everything you need to prove what you sell</h2>
          <div className="grid-2" style={{gap: '36px', alignItems: 'start'}}>
            <div className="feature-block">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3>Field verification interface</h3>
              <p>Mobile-first, offline-first capture tool for field coordinators. Onboard artisans through a 5-step wizard: identity, loom &amp; household, evidence, consent, and review. Geo-tagged photos, cooperative co-signing, and automatic sync when connectivity returns.</p>
              <Link href="/dashboard/field" className="link">View demo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg></Link>
            </div>
            <div className="feature-block">
              <div className="ic gold">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3.3 7 12 12l8.7-5M12 22V12"/><path d="m3.3 7 8.7-5 8.7 5v10l-8.7 5-8.7-5Z"/></svg>
              </div>
              <h3>Batch traceability dashboard</h3>
              <p>Manage verified batches, monitor certification status, and link production directly to SKUs. Self-service batch-to-SKU mapping with partial-attribution logic, automatic QR generation, and full audit trails for compliance inspection.</p>
              <Link href="/dashboard" className="link">View demo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg></Link>
            </div>
            <div className="feature-block">
              <div className="ic green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/></svg>
              </div>
              <h3>Certification &amp; compliance engine</h3>
              <p>Automatically convert verified production data into compliance-ready outputs: ECGT substantiation packs, CMA Green Claims documentation, and Digital Product Passport exports. Controlled claim language with governed usage.</p>
            </div>
            <div className="feature-block">
              <div className="ic madder">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h.01M21 21v-3h-3"/></svg>
              </div>
              <h3>Consumer provenance layer</h3>
              <p>QR-accessed product pages showing artisan identity, weaving context, production timelines, and verification media. Embed in Shopify, WooCommerce, or print on swing tags. Turn compliance data into a premium conversion tool.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="section" style={{background: 'var(--paper)'}}>
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h2 className="h2" style={{marginBottom: '12px'}}>Anchored in risk reduction, not software cost</h2>
          <p className="p-lead" style={{maxWidth: '640px', marginBottom: '36px'}}>
            A brand paying £325/month is not paying for dashboard access. They are paying for the audit-ready evidence that protects them when their green claims are scrutinised.
          </p>
          <div className="grid-3">
            {[
              {name: 'Standard', price: '£175', desc: 'For independent ethical brands sourcing their first verified collections.', features: ['Dashboard access', 'Batch tracking & status', 'QR code generation', 'Basic provenance pages', 'Limited compliance exports'], cta: 'See full details', href: '/pricing', style: {}},
              {name: 'Premium', price: '£325', desc: 'For premium-positioned brands with complex compliance needs and multi-collection management.', features: ['Everything in Standard', 'Full compliance pack generator', 'Audit-ready documentation exports', 'Multi-collection management', 'Priority support'], cta: 'See full details', href: '/pricing', popular: true, style: {borderColor: 'var(--zari)'}},
              {name: 'Enterprise', price: 'Custom', desc: 'For luxury houses and multi-brand retailers. Volume pricing, white-label assets, and bespoke compliance formats.', features: ['Volume-based batch pricing', 'Multi-region certification', 'White-label certification assets', 'Bespoke compliance formats', 'Dedicated account manager'], cta: 'Contact us', href: '/contact', style: {}},
            ].map((plan, i) => (
              <div className="pricing-card" key={i} style={plan.style}>
                {plan.popular && <div className="popular">Most popular</div>}
                <div className="tier-name">{plan.name}</div>
                <div className="price">{plan.price}{plan.name !== 'Enterprise' && <span>/month</span>}</div>
                <div className="desc">{plan.desc}</div>
                <ul className="features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`btn ${plan.popular ? 'btn-gold' : 'btn-ghost'}`} style={{width: '100%', justifyContent: 'center'}}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Validation</span>
          <h2 className="h2" style={{marginBottom: '36px'}}>Trusted by brands who take provenance seriously</h2>
          <div className="grid-3">
            {[
              {quote: '"Weft Passport is the first system we\'ve seen that actually verifies at the artisan level, not just the factory gate. For our handwoven collections, that\'s the difference between a claim and a fact."', name: 'Elena Marsh', role: 'Head of Sustainability, Indigo & Ochre', initials: 'EM'},
              {quote: '"The compliance translation layer is what sold us. ECGT is coming in months, not years, and we needed a partner who understands both the artisan reality and the regulatory framework."', name: 'Sasha Khan', role: 'Founder, Loom Loom London', initials: 'SK'},
              {quote: '"Our customers ask about provenance constantly. QR-linked artisan pages have become one of our highest-converting assets. Weft Passport turns compliance into storytelling."', name: 'Ana Ribeiro', role: 'Creative Director, Terra Textile Co.', initials: 'AR'},
            ].map((t, i) => (
              <div className="testimonial" key={i}>
                <p className="quote">{t.quote}</p>
                <div className="author">
                  <div className="av">{t.initials}</div>
                  <div><div className="nm">{t.name}</div><div className="rl">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="hint-inline" style={{marginTop: '32px'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            <div>All testimonials represent real conversations from the current Letter of Intent pipeline. Full evidence and scope documentation available under NDA.</div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section founder-section" style={{background: 'var(--paper)'}}>
        <div className="container">
          <div className="grid-2" style={{gap: '48px'}}>
            <div>
              <span className="eyebrow">Founder</span>
              <h2 className="h2" style={{marginBottom: '16px'}}>Built from lived experience on both sides of the supply chain</h2>
              <blockquote style={{fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--ink)', lineHeight: 1.45, margin: '0 0 20px', fontStyle: 'italic'}}>
                &ldquo;I grew up surrounded by handloom textiles. My family was deeply embedded in the weaving trade in India. When I began building Silk and Soil in the UK, I saw machine-made fabrics sold as handwoven and realised there was no systematic way for buyers to verify the difference.&rdquo;
              </blockquote>
              <p className="p-body" style={{marginBottom: '12px'}}>Mahjabeen Bano is the founder of Weft Passport and Silk and Soil. She holds an MA in Fashion Design from Sheffield Hallam University, where her thesis examined how women artisans integrate cultural identity into craft work.</p>
              <p className="p-body">Her professional experience spans luxury retail merchandising, trend research and technical design in India, and two years building Silk and Soil in the UK — giving her direct fluency in both artisan production realities and UK/EU brand expectations.</p>
              <Link href="/about" className="btn btn-ghost" style={{marginTop: '20px'}}>Read the full story</Link>
            </div>
            <div style={{background: 'linear-gradient(135deg, var(--indigo-deep), var(--indigo))', borderRadius: 'var(--radius)', display: 'grid', placeItems: 'center', minHeight: '380px', color: 'var(--zari-bright)', fontFamily: 'var(--font-serif)', fontSize: '80px', fontWeight: 600}}>MB</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="h2" style={{color: '#fff', marginBottom: '14px'}}>Start certifying before enforcement begins</h2>
          <p className="p-lead" style={{color: '#aab6d6', margin: '0 auto 32px', textAlign: 'center'}}>Book a 30-minute walkthrough of the platform, see a live provenance page, and understand how certification fits your compliance timeline.</p>
          <div style={{display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link href="/login" className="btn btn-gold" style={{fontSize: '15px', padding: '15px 28px'}}>Get started &amp; book a demo</Link>
            <Link href="/contact" className="btn btn-outline" style={{fontSize: '15px', padding: '15px 28px'}}>Contact the team</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="grid-4">
            <div>
              <h4>Weft Passport</h4>
              <p style={{fontSize: '13px', color: '#9fabc e', lineHeight: 1.6, margin: 0}}>Provenance certification for South Asian handwoven textiles. Built in Sheffield, verified in Varanasi.</p>
            </div>
            <div>
              <h4>Product</h4>
              <Link href="/dashboard">Brand dashboard</Link>
              <Link href="/dashboard/field">Field capture</Link>
              <Link href="/compliance">Compliance engine</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div>
              <h4>Company</h4>
              <Link href="/about">Our story</Link>
              <Link href="/about#team">Team</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/login">Sign in</Link>
            </div>
            <div>
              <h4>Legal</h4>
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/terms">Terms of service</Link>
              <Link href="/cookies">Cookie policy</Link>
            </div>
          </div>
          <div className="bottom">
            <div>© 2025 Silk and Soil Ltd. All rights reserved.</div>
            <div>Operated by Silk and Soil, Sheffield, UK</div>
          </div>
        </div>
      </footer>

      {/* Mobile nav script */}
      <script dangerouslySetInnerHTML={{__html: `
        const toggle = document.getElementById('mobileToggle');
        const links = document.getElementById('navLinks');
        if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
      `}} />
    </>
  )
}
