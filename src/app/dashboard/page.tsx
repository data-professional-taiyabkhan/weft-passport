import { createServerSupabaseClient } from '@/lib/supabase/server';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentBatches from '@/components/dashboard/RecentBatches';
import ComplianceWidget from '@/components/dashboard/ComplianceWidget';
import QuickActions from '@/components/dashboard/QuickActions';

export const metadata = { title: 'Dashboard Overview' };

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: brand } = await supabase
    .from('brands')
    .select('*')
    .eq('profile_id', user?.id)
    .single();

  const { data: batches } = await supabase
    .from('batches')
    .select('id, batch_id_code, textile_name, status, certified_at, artisan_id, qr_scans')
    .eq('brand_id', brand?.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const { count: totalBatches } = await supabase
    .from('batches')
    .select('*', { count: 'exact', head: true })
    .eq('brand_id', brand?.id);

  const { count: certifiedCount } = await supabase
    .from('batches')
    .select('*', { count: 'exact', head: true })
    .eq('brand_id', brand?.id)
    .eq('status', 'certified');

  const { count: activeSKUs } = await supabase
    .from('skus')
    .select('*', { count: 'exact', head: true })
    .eq('brand_id', brand?.id)
    .eq('active', true);

  const stats = {
    totalBatches:   totalBatches || 0,
    certified:      certifiedCount || 0,
    activeSKUs:     activeSKUs || 0,
    complianceScore: brand?.compliance_score || 0,
    trialEndsAt:    brand?.trial_ends_at,
    tier:           brand?.subscription_tier || 'trial',
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-2xl text-weft-charcoal">
          Welcome back{brand?.brand_name ? `, ${brand.brand_name}` : ''} 🧵
        </h1>
        <p className="text-sm text-weft-muted mt-1">
          Your provenance certification overview
        </p>
      </div>

      <QuickActions />
      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentBatches batches={batches || []} />
        </div>
        <div>
          <ComplianceWidget score={stats.complianceScore} tier={stats.tier} />
        </div>
      </div>
    </div>
  );
}
