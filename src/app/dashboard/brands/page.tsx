import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminBrandsPage() {
  const supabase = createClient();
  const { data: brands } = await supabase
    .from('brands')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(50);

  const planBadge: Record<string,string> = {
    trial: 'bg-gray-100 text-gray-700',
    standard: 'bg-blue-100 text-blue-700',
    premium: 'bg-purple-100 text-purple-700',
    enterprise: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-indigo-900">Brand Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">All fashion brands subscribed to Weft Passport</p>
        </div>
        <div className="flex gap-3">
          <span className="badge bg-indigo-100 text-indigo-700">{brands?.length ?? 0} brands</span>
        </div>
      </div>
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream-100 border-b border-weft-border">
              <tr>
                {['Brand','Contact','Plan','Status','Onboarded','Actions'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-weft-border">
              {brands && brands.length > 0 ? brands.map((b: any) => (
                <tr key={b.id} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm">{b.brand_name?.[0]}</div>
                      <div>
                        <p className="text-sm font-semibold text-weft-text">{b.brand_name}</p>
                        <p className="text-xs text-gray-400">{b.website ?? b.brand_slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{b.profiles?.full_name}</p>
                    <p className="text-xs text-gray-400">{b.profiles?.email}</p>
                  </td>
                  <td className="px-4 py-3"><span className={`badge ${planBadge[b.subscription_tier] ?? 'bg-gray-100 text-gray-600'}`}>{b.subscription_tier}</span></td>
                  <td className="px-4 py-3"><span className={`badge ${b.subscription_status==='active' ? 'badge-certified' : 'badge-pending'}`}>{b.subscription_status}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{b.created_at ? new Date(b.created_at).toLocaleDateString('en-GB') : '—'}</td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/brands/${b.id}`} className="text-xs text-indigo-600 hover:underline">Manage</Link>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-4 py-16 text-center">
                  <p className="text-gray-400">No brands registered yet.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
