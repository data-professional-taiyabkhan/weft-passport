import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import OverviewStats from '@/components/dashboard/OverviewStats';
import RecentBatches from '@/components/dashboard/RecentBatches';
import ComplianceAlert from '@/components/dashboard/ComplianceAlert';
import QuickActions from '@/components/dashboard/QuickActions';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  // Fetch stats
  let stats = { batches: 0, certified: 0, skus: 0, artisans: 0 };
  try {
    const [batches, skus, artisans] = await Promise.all([
      supabase.from('batches').select('id, status', { count: 'exact' }),
      supabase.from('skus').select('id', { count: 'exact' }),
      supabase.from('artisans').select('id', { count: 'exact' }),
    ]);
    stats.batches = batches.count ?? 0;
    stats.certified = batches.data?.filter(b => b.status === 'certified').length ?? 0;
    stats.skus = skus.count ?? 0;
    stats.artisans = artisans.count ?? 0;
  } catch {}

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-indigo-900">
          {greeting}, {profile?.full_name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your certifications today.</p>
      </div>

      {/* Compliance Alert */}
      <ComplianceAlert />

      {/* Stats */}
      <OverviewStats stats={stats} role={profile?.role} />

      {/* Quick Actions + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBatches />
        </div>
        <div>
          <QuickActions role={profile?.role} />
        </div>
      </div>
    </div>
  );
}
