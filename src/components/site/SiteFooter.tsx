import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid-4">
          <div>
            <h4>Weft Passport</h4>
            <p style={{ fontSize: '13px', color: '#9fabce', lineHeight: 1.6, margin: 0 }}>
              Provenance certification for South Asian handwoven textiles. Built in Sheffield, verified in Varanasi.
            </p>
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
          <div>© {new Date().getFullYear()} Silk and Soil Ltd. All rights reserved.</div>
          <div>Operated by Silk and Soil, Sheffield, UK</div>
        </div>
      </div>
    </footer>
  );
}
