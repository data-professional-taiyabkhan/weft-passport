'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const brandNav = [
  { href: '/dashboard', label: 'Overview', section: 'Certify' },
  { href: '/dashboard/batches', label: 'Verified batches', section: 'Certify' },
  { href: '/dashboard/skus', label: 'SKUs', section: 'Certify' },
  { href: '/dashboard/artisans', label: 'Artisans', section: 'Certify' },
  { href: '/dashboard/compliance', label: 'Compliance', section: 'Outputs' },
  { href: '/dashboard/qr-codes', label: 'Provenance & QR', section: 'Outputs' },
  { href: '/dashboard/settings', label: 'Settings', section: null },
];

const fieldNav = [
  { href: '/dashboard', label: 'Overview', section: 'Field' },
  { href: '/dashboard/capture', label: 'Field Capture', section: 'Field' },
  { href: '/dashboard/artisans', label: 'Artisans', section: 'Field' },
  { href: '/dashboard/batches', label: 'Batches', section: 'Field' },
  { href: '/dashboard/settings', label: 'Settings', section: null },
];

const adminNav = [
  { href: '/dashboard', label: 'Overview', section: 'Platform' },
  { href: '/dashboard/brands', label: 'Brands', section: 'Platform' },
  { href: '/dashboard/artisans', label: 'Artisans', section: 'Platform' },
  { href: '/dashboard/batches', label: 'All Batches', section: 'Platform' },
  { href: '/dashboard/clusters', label: 'Clusters', section: 'Platform' },
  { href: '/dashboard/coordinators', label: 'Coordinators', section: 'Platform' },
  { href: '/dashboard/compliance', label: 'Compliance', section: 'Manage' },
  { href: '/dashboard/users', label: 'Users', section: 'Manage' },
  { href: '/dashboard/settings', label: 'Settings', section: null },
];

/* SVG icons matching the client HTML */
const icons: Record<string, string> = {
  Overview: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  'Verified batches': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.3 7 12 12l8.7-5M12 22V12"/><path d="m3.3 7 8.7-5 8.7 5v10l-8.7 5-8.7-5Z"/></svg>',
  'All Batches': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.3 7 12 12l8.7-5M12 22V12"/><path d="m3.3 7 8.7-5 8.7 5v10l-8.7 5-8.7-5Z"/></svg>',
  Batches: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.3 7 12 12l8.7-5M12 22V12"/><path d="m3.3 7 8.7-5 8.7 5v10l-8.7 5-8.7-5Z"/></svg>',
  SKUs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h7M3 6h11M3 18h6"/><path d="m14 16 3 3 4-5"/></svg>',
  Artisans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  Compliance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  'Provenance & QR': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h.01M21 21v-3h-3"/></svg>',
  Settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
  'Field Capture': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/></svg>',
  Brands: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>',
  Clusters: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  Coordinators: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/></svg>',
  Users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
};

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const nav = role === 'admin' ? adminNav : role === 'coordinator' ? fieldNav : brandNav;
  const roleLabel = role === 'admin' ? 'Admin' : role === 'coordinator' ? 'Field Capture' : 'Brand workspace';

  // Group nav items by section
  const sections: { label: string | null; items: typeof nav }[] = [];
  let currentSection: string | null = '__none__';
  for (const item of nav) {
    if (item.section !== currentSection) {
      sections.push({ label: item.section, items: [] });
      currentSection = item.section;
    }
    sections[sections.length - 1].items.push(item);
  }

  return (
    <aside className="side">
      {/* Brandmark */}
      <div className="brandmark">
        <div className="seal">WP</div>
        <div>
          <b>Weft Passport</b>
          <small>{roleLabel}</small>
        </div>
      </div>

      {/* Navigation sections */}
      {sections.map((section, si) => (
        <div key={si}>
          {section.label && <div className="nav-label">{section.label}</div>}
          <nav className="side-nav">
            {section.items.map(item => {
              const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className={active ? 'on' : ''}>
                  <span
                    style={{ width: 18, height: 18, display: 'inline-flex', flexShrink: 0 }}
                    dangerouslySetInnerHTML={{ __html: icons[item.label] || '' }}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}

      {/* Bottom tier card */}
      <div className="side-foot">
        <div className="tiercard">
          <div className="tt">Current plan</div>
          <div className="tn">Premium</div>
          <div className="tp">Full compliance suite</div>
          <div className="help">Audit-ready exports, multi-collection management & consumer provenance pages.</div>
        </div>
      </div>
    </aside>
  );
}
