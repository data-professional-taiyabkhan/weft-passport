'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Tags, Users, FileCheck,
  Map, Smartphone, ShieldCheck, Settings, LogOut, ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const brandNav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/batches', label: 'Batches', icon: Package },
  { href: '/dashboard/skus', label: 'SKUs', icon: Tags },
  { href: '/dashboard/artisans', label: 'Artisans', icon: Users },
  { href: '/dashboard/compliance', label: 'Compliance', icon: FileCheck },
];

const fieldNav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/capture', label: 'Field Capture', icon: Smartphone },
  { href: '/dashboard/artisans', label: 'Artisans', icon: Users },
  { href: '/dashboard/clusters', label: 'Clusters', icon: Map },
];

const adminNav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/brands', label: 'All Brands', icon: ShieldCheck },
  { href: '/dashboard/artisans', label: 'All Artisans', icon: Users },
  { href: '/dashboard/batches', label: 'All Batches', icon: Package },
  { href: '/dashboard/compliance', label: 'Compliance', icon: FileCheck },
];

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = role === 'admin' ? adminNav : role === 'field_coordinator' ? fieldNav : brandNav;

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-indigo-950 flex flex-col h-full flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-saffron-400 rounded-lg flex items-center justify-center font-bold text-indigo-950 text-base">W</div>
          <div>
            <div className="text-white font-serif font-bold text-sm leading-tight">Weft Passport</div>
            <div className="text-indigo-400 text-xs capitalize">{role.replace('_', ' ')}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? 'bg-saffron-400 text-indigo-950'
                  : 'text-indigo-300 hover:bg-indigo-900 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-indigo-800 space-y-1">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-300 hover:bg-indigo-900 hover:text-white transition-all">
          <Settings size={18} />
          Settings
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-300 hover:bg-red-900/40 hover:text-red-300 transition-all"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
