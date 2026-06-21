import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  const [{ count: batchCount }, { count: artisanCount }, { count: skuCount }] = await Promise.all([
    supabase.from('batches').select('*', { count: 'exact', head: true }),
    supabase.from('artisans').select('*', { count: 'exact', head: true }),
    supabase.from('skus').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    { label: 'Total Batches', value: batchCount ?? 0, icon: '📦', color: 'bg-indigo-50', iconBg: 'bg-indigo-100', href: '/dashboard/batches' },
    { label: 'Verified Artisans', value: artisanCount ?? 0, icon: '🧵', color: 'bg-amber-50', iconBg: 'bg-amber-100', href: '/dashboard/artisans' },
    { label: 'Active SKUs', value: skuCount ?? 0, icon: '🏷️', color: 'bg-emerald-50', iconBg: 'bg-emerald-100', href: '/dashboard/skus' },
    { label: 'Compliance Docs', value: 0, icon: '📋', color: 'bg-violet-50', iconBg: 'bg-violet-100', href: '/dashboard/compliance' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-indigo-900">Good evening, {profile?.full_name?.split(' ')[0] ?? 'there'} 👋</h1>
        <p className="text-gray-500 mt-1">Here&apos;s your Weft Passport overview for today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className={`card hover:shadow-weft-lg transition-all group ${s.color} border-0`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${s.iconBg} rounded-xl flex items-center justify-center text-2xl`}>{s.icon}</div>
              <div>
                <div className="text-3xl font-bold text-indigo-900">{s.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-indigo-600 font-semibold group-hover:underline">View all →</div>
          </Link>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent activity */}
        <div className="card">
          <h3 className="font-serif text-lg text-indigo-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Batch WP-BTH-2026-0001 submitted for review', time: '2h ago', type: 'batch' },
              { action: 'Artisan Ravi Kumar verified in Varanasi cluster', time: '5h ago', type: 'artisan' },
              { action: 'Compliance export generated for ECGT', time: '1d ago', type: 'compliance' },
              { action: 'New SKU SKU-0042 linked to certified batch', time: '2d ago', type: 'sku' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-weft-border last:border-0">
                <div className="w-8 h-8 rounded-lg bg-cream-200 flex items-center justify-center text-sm flex-shrink-0">
                  {item.type==='batch'?'📦':item.type==='artisan'?'🧵':item.type==='compliance'?'📋':'🏷️'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-weft-text truncate">{item.action}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance status */}
        <div className="card">
          <h3 className="font-serif text-lg text-indigo-900 mb-4">Regulatory Readiness</h3>
          <div className="space-y-3">
            {[
              { label: 'EU Green Claims (ECGT)', status: 'Ready', date: 'Effective Sep 2026', color: 'bg-green-100 text-green-700' },
              { label: 'Digital Product Passport', status: 'In Progress', date: 'Expected 2027', color: 'bg-yellow-100 text-yellow-700' },
              { label: 'CSDDD Due Diligence', status: 'Pending', date: 'From 2027', color: 'bg-orange-100 text-orange-700' },
              { label: 'UK Green Claims Code', status: 'Ready', date: 'Active now', color: 'bg-green-100 text-green-700' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-weft-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-weft-text">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
                <span className={`badge ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/compliance" className="btn-outline mt-4 text-xs px-4 py-2 w-full justify-center">View compliance centre →</Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <h3 className="font-serif text-lg text-indigo-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'New Batch', href: '/dashboard/batches/new', icon: '➕' },
            { label: 'Add SKU', href: '/dashboard/skus/new', icon: '🏷️' },
            { label: 'Export Compliance', href: '/dashboard/compliance/export', icon: '📤' },
            { label: 'View Passport', href: '/passport/demo', icon: '🔍' },
          ].map(a => (
            <Link key={a.label} href={a.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-cream-100 hover:bg-indigo-50 border border-weft-border hover:border-indigo-300 transition-all text-sm font-medium text-weft-text">
              <span className="text-2xl">{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
