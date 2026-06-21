import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { getBatchStatusColor } from '@/lib/utils';

export default async function BatchesPage() {
  const supabase = createClient();
  const { data: batches } = await supabase
    .from('batches')
    .select('*, artisans(full_name, artisan_code), clusters(name)')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-indigo-900">Production Batches</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all certified textile batches</p>
        </div>
        <Link href="/dashboard/batches/new" className="btn-primary">➕ New Batch</Link>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-3">
          {['All', 'Draft', 'Submitted', 'Verified', 'Certified', 'Rejected'].map(f => (
            <button key={f} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              f==='All' ? 'bg-indigo-900 text-white' : 'bg-cream-200 text-gray-600 hover:bg-indigo-50'
            }`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream-100 border-b border-weft-border">
              <tr>
                {['Batch Code','Textile Type','Artisan','Cluster','Status','Certified','Actions'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-weft-border">
              {batches && batches.length > 0 ? batches.map((b: any) => (
                <tr key={b.id} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">{b.batch_code}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-weft-text">{b.textile_type}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-weft-text">{b.artisans?.full_name ?? '—'}</div>
                    <div className="text-xs text-gray-400">{b.artisans?.artisan_code}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{b.clusters?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${getBatchStatusColor(b.status)}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{b.certified_at ? new Date(b.certified_at).toLocaleDateString('en-GB') : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/batches/${b.id}`} className="text-xs text-indigo-600 hover:underline">View</Link>
                      {b.qr_code_url && <Link href={`/passport/${b.id}`} className="text-xs text-green-600 hover:underline">Passport</Link>}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} className="px-4 py-16 text-center">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="text-gray-500 font-medium">No batches yet</p>
                  <p className="text-gray-400 text-sm mt-1">Create your first production batch to get started</p>
                  <Link href="/dashboard/batches/new" className="btn-primary mt-4 inline-flex">Create first batch</Link>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
