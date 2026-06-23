'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const brandNav = [
  { href: '/dashboard', icon: '▦', label: 'Overview' },
  { href: '/dashboard/batches', icon: '⧉', label: 'Batches' },
  { href: '/dashboard/skus', icon: '◈', label: 'SKUs' },
  { href: '/dashboard/artisans', icon: '◎', label: 'Artisans' },
  { href: '/dashboard/compliance', icon: '✦', label: 'Compliance' },
  { href: '/dashboard/qr-codes', icon: '⊞', label: 'QR Codes' },
  { href: '/dashboard/settings', icon: '◌', label: 'Settings' },
];

const fieldNav = [
  { href: '/dashboard', icon: '▦', label: 'Overview' },
  { href: '/dashboard/capture', icon: '⊕', label: 'Field Capture' },
  { href: '/dashboard/artisans', icon: '◎', label: 'Artisans' },
  { href: '/dashboard/looms', icon: '⧈', label: 'Looms' },
  { href: '/dashboard/batches', icon: '⧉', label: 'Batches' },
  { href: '/dashboard/sync', icon: '⟳', label: 'Sync Status' },
];

const adminNav = [
  { href: '/dashboard', icon: '▦', label: 'Overview' },
  { href: '/dashboard/brands', icon: '◈', label: 'Brands' },
  { href: '/dashboard/artisans', icon: '◎', label: 'Artisans' },
  { href: '/dashboard/batches', icon: '⧉', label: 'All Batches' },
  { href: '/dashboard/clusters', icon: '⬡', label: 'Clusters' },
  { href: '/dashboard/coordinators', icon: '◍', label: 'Coordinators' },
  { href: '/dashboard/compliance', icon: '✦', label: 'Compliance' },
  { href: '/dashboard/users', icon: '◌', label: 'Users' },
  { href: '/dashboard/settings', icon: '◌', label: 'Settings' },
];

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const nav = role === 'admin' ? adminNav : role === 'coordinator' ? fieldNav : brandNav;
  const roleLabel = role === 'admin' ? 'Admin' : role === 'coordinator' ? 'Field Coordinator' : 'Brand Portal';
  const roleBadgeColor = role === 'admin' ? 'bg-red-100 text-red-700' : role === 'coordinator' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700';

  return (
    <aside className="w-64 bg-indigo-950 flex flex-col min-h-screen flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-saffron-400 rounded-lg flex items-center justify-center text-indigo-950 font-bold text-sm">WP</div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Weft Passport</div>
            <div className="text-indigo-400 text-xs">Provenance Platform</div>
          </div>
        </div>
        <div className={cn('mt-3 inline-flex px-2 py-0.5 rounded-full text-xs font-semibold', roleBadgeColor)}>
          {roleLabel}
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(item => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-saffron-400 text-indigo-950'
                  : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'
              )}>
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      {/* Footer */}
      <div className="p-4 border-t border-indigo-800">
        <Link href="/" className="flex items-center gap-2 text-indigo-400 hover:text-white text-xs transition-colors">
          <span>←</span> Back to website
        </Link>
        <div className="mt-3 text-indigo-600 text-xs">© 2026 Silk and Soil Ltd</div>
      </div>
    </aside>
  );
}
