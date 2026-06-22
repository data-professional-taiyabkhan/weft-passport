'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Our Story' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/compliance', label: 'Compliance' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="site-nav">
      <div className="container">
        <Link href="/" className="brand">
          <div className="seal">WP</div>
          <div>
            <b>Weft Passport</b>
            <small>Provenance Certification</small>
          </div>
        </Link>
        <div className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'on' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            className="btn btn-sm btn-primary"
            style={{ marginLeft: '8px' }}
            onClick={() => setOpen(false)}
          >
            Sign in
          </Link>
        </div>
        <button className="mobile-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
