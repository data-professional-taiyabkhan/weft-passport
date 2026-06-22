'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DashboardHeader({ profile }: { profile: any }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="h-16 bg-white border-b border-weft-border flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-2">
        <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Dashboard</div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/dashboard/notifications" className="relative p-2 rounded-lg hover:bg-cream-200 transition-colors">
          <span className="text-gray-500">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-saffron-400 rounded-full" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {profile?.full_name?.[0] ?? 'U'}
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-weft-charcoal leading-tight">{profile?.full_name ?? 'User'}</div>
            <div className="text-xs text-gray-400">{profile?.organisation ?? profile?.email}</div>
          </div>
        </div>
        <button type="button" onClick={handleSignOut} className="btn-ghost text-xs px-3 py-1.5">Sign out</button>
      </div>
    </header>
  );
}
