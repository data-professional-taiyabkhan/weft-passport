import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, QrCode } from 'lucide-react';

export default async function SKUsPage() {
  const supabase = createClient();
  const { data: skus } = await supabase
    .from('skus')
    .select('*, batches(batch_code, textile_type, status)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header flex items-start justify-between">
        <div>
          <h1>SKU Manager</h1>
          <p>Map your product SKUs to certified production batches and generate QR codes</p>
        </div>
        <Link href="/dashboard/skus/new" className="btn-primary">
          <Plus size={16} /> Add SKU
        </Link>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-100 border-b border-weft-border">
            <tr>
              {['SKU Code','Product Name','Batch','Textile','Status','QR'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-weft-border">
            {!skus?.length ? (
              <tr><td colSpan={6} className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">🏷️</div>
                <p>No SKUs yet. <Link href="/dashboard/skus/new" className="text-indigo-700 underline">Add your first SKU</Link></p>
              </td></tr>
            ) : skus.map((s: any) => (
              <tr key={s.id} className="hover:bg-cream-50 transition-colors">
                <td className="px-4 py-3.5 font-mono text-xs text-indigo-700">{s.sku_code}</td>
                <td className="px-4 py-3.5 font-medium text-gray-800">{s.product_name}</td>
                <td className="px-4 py-3.5">
                  {s.batches ? <Link href={`/dashboard/batches/${s.batch_id}`} className="font-mono text-xs text-indigo-600 hover:underline">{s.batches.batch_code}</Link> : '—'}
                </td>
                <td className="px-4 py-3.5 text-gray-600">{s.batches?.textile_type ?? '—'}</td>
                <td className="px-4 py-3.5">
                  <span className={`badge ${ s.batches?.status === 'certified' ? 'badge-certified' : 'badge-draft'}`}>
                    {s.batches?.status === 'certified' ? '✅ Certified' : '⏳ Pending'}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  {s.batches?.status === 'certified' ? (
                    <a href={`/passport/${s.batch_id}`} target="_blank"
                      className="flex items-center gap-1.5 text-xs text-indigo-700 hover:underline">
                      <QrCode size={13} /> View
                    </a>
                  ) : <span className="text-xs text-gray-400">Not ready</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
