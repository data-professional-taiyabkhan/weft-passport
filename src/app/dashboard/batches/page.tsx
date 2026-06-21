import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Filter, Download } from 'lucide-react';

const STATUS_STYLES: Record<string, string> = {
  draft: 'badge-draft',
  submitted: 'badge bg-blue-100 text-blue-700',
  verified: 'badge-verified',
  certified: 'badge-certified',
  rejected: 'badge bg-red-100 text-red-700',
};

export default async function BatchesPage() {
  const supabase = createClient();
  const { data: batches } = await supabase
    .from('batches')
    .select('*, artisans(full_name, artisan_code), clusters(name)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header flex items-start justify-between">
        <div>
          <h1>Production Batches</h1>
          <p>Track and certify every handloom production batch</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost border border-weft-border">
            <Filter size={15} /> Filter
          </button>
          <button className="btn-ghost border border-weft-border">
            <Download size={15} /> Export
          </button>
          <Link href="/dashboard/batches/new" className="btn-primary">
            <Plus size={16} /> New Batch
          </Link>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-5 gap-3">
        {['draft','submitted','verified','certified','rejected'].map((s) => {
          const count = batches?.filter(b => b.status === s).length ?? 0;
          return (
            <div key={s} className="card-sm text-center">
              <div className="text-xl font-bold text-weft-text">{count}</div>
              <div className="text-xs text-gray-500 capitalize mt-0.5">{s}</div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-100 border-b border-weft-border">
              <tr>
                {['Batch Code','Textile','Weave','Artisan','Cluster','Status','Date','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-weft-border">
              {!batches?.length ? (
                <tr><td colSpan={8} className="text-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">🧵</div>
                  <p>No batches yet. <Link href="/dashboard/batches/new" className="text-indigo-700 underline">Create your first batch</Link></p>
                </td></tr>
              ) : batches.map((b: any) => (
                <tr key={b.id} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-xs text-indigo-700">
                    <Link href={`/dashboard/batches/${b.id}`} className="hover:underline">{b.batch_code}</Link>
                  </td>
                  <td className="px-4 py-3.5 text-gray-800">{b.textile_type}</td>
                  <td className="px-4 py-3.5 text-gray-600 capitalize">{b.weave_type?.replace('_',' ')}</td>
                  <td className="px-4 py-3.5 text-gray-700">{b.artisans?.full_name ?? '—'}</td>
                  <td className="px-4 py-3.5 text-gray-600">{b.clusters?.name ?? '—'}</td>
                  <td className="px-4 py-3.5">
                    <span className={STATUS_STYLES[b.status] ?? 'badge-draft'}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{new Date(b.created_at).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3.5">
                    <Link href={`/dashboard/batches/${b.id}`} className="text-xs text-indigo-700 hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
