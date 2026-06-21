import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const STATUS_STYLES: Record<string, string> = {
  draft: 'badge-draft',
  submitted: 'badge bg-blue-100 text-blue-700',
  verified: 'badge-verified',
  certified: 'badge-certified',
  rejected: 'badge bg-red-100 text-red-700',
};

export default async function RecentBatches() {
  const supabase = createClient();
  const { data: batches } = await supabase
    .from('batches')
    .select('id, batch_code, textile_type, weave_type, status, created_at, artisans(full_name)')
    .order('created_at', { ascending: false })
    .limit(6);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif text-lg text-indigo-900">Recent Batches</h3>
        <Link href="/dashboard/batches" className="text-sm text-indigo-700 hover:underline flex items-center gap-1">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {!batches?.length ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">🧵</div>
          <p className="font-medium">No batches yet</p>
          <p className="text-sm mt-1">Add your first production batch to get started</p>
          <Link href="/dashboard/batches/new" className="btn-primary mt-4 inline-flex">Add Batch</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-weft-border">
                <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Textile</th>
                <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Artisan</th>
                <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-weft-border">
              {batches.map((b: any) => (
                <tr key={b.id} className="hover:bg-cream-50 transition-colors">
                  <td className="py-3 pr-4">
                    <Link href={`/dashboard/batches/${b.id}`} className="font-mono text-indigo-700 hover:underline text-xs">{b.batch_code}</Link>
                  </td>
                  <td className="py-3 pr-4 text-gray-700">{b.textile_type}</td>
                  <td className="py-3 pr-4 text-gray-600">{b.artisans?.full_name ?? '—'}</td>
                  <td className="py-3">
                    <span className={STATUS_STYLES[b.status] ?? 'badge-draft'}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
