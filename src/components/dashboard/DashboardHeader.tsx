'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DashboardHeader({ profile }: { profile: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  /* Build breadcrumb from pathname */
  const pageName = (() => {
    const seg = pathname.split('/').filter(Boolean);
    if (seg.length <= 1) return 'Overview';
    const last = seg[seg.length - 1];
    return last.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  })();

  const initials = (profile?.full_name || 'U')
    .split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <header className="topbar">
      <div className="crumb">
        {profile?.organisation || 'Weft Passport'} · <b>{pageName}</b>
      </div>

      {/* ECGT readiness chip */}
      <div className="ecgt-chip">
        <span className="ring" />
        ECGT-ready · applies <b>27 Sep 2026</b>
      </div>

      {/* User */}
      <div className="who">
        <div className="av">{initials}</div>
        <div>
          <div className="nm">{profile?.full_name ?? 'User'}</div>
          <div className="rl">{profile?.email}</div>
        </div>
      </div>

      <button type="button" onClick={handleSignOut} className="btn btn-ghost btn-sm">Sign out</button>
    </header>
  );
}
