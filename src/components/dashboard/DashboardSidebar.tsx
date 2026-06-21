'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, QrCode, FileText, BarChart3,
  Users, Settings, LogOut, ChevronRight, Shield
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard',              icon: LayoutDashboard, label: 'Overview',      section: 'main' },
  { href: '/dashboard/batches',      icon: Package,         label: 'Batches',       section: 'main' },
  { href: '/dashboard/skus',         icon: QrCode,          label: 'SKUs & QR',     section: 'main' },
  { href: '/dashboard/artisans',     icon: Users,           label: 'Artisan Registry', section: 'main' },
  { href: '/dashboard/compliance',   icon: Shield,          label: 'Compliance',    section: 'main' },
  { href: '/dashboard/documents',    icon: FileText,        label: 'Documents',     section: 'main' },
  { href: '/dashboard/analytics',    icon: BarChart3,       label: 'Analytics',     section: 'main' },
  { href: '/dashboard/settings',     icon: Settings,        label: 'Settings',      section: 'bottom' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const mainItems   = NAV_ITEMS.filter(i => i.section === 'main');
  const bottomItems = NAV_ITEMS.filter(i => i.section === 'bottom');

  const NavLink = ({ href, icon: Icon, label }: typeof NAV_ITEMS[0]) => {
    const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
    return (
      <Link href={href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
          isActive
            ? 'bg-weft-indigo text-white shadow-heritage'
            : 'text-weft-charcoal hover:bg-weft-sand hover:text-weft-indigo'
        }`}>
        <Icon size={18} className={isActive ? 'text-white' : 'text-weft-muted group-hover:text-weft-indigo'} />
        {label}
        {isActive && <ChevronRight size={14} className="ml-auto opacity-60" />}
      </Link>
    );
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-weft-sand">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-weft-sand">
        <div className="w-9 h-9 rounded-lg bg-weft-indigo flex items-center justify-center">
          <span className="text-white font-serif font-bold">W</span>
        </div>
        <div>
          <p className="font-serif font-semibold text-weft-indigo text-sm">Weft Passport</p>
          <p className="text-xs text-weft-muted">Brand Portal</p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-weft-muted uppercase tracking-wider px-3 mb-2">Platform</p>
        {mainItems.map(item => <NavLink key={item.href} {...item} />)}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-4 border-t border-weft-sand space-y-1">
        {bottomItems.map(item => <NavLink key={item.href} {...item} />)}
        <button onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-colors">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
