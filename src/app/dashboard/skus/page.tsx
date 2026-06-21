import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function SKUsPage() {
  const supabase = createClient();
  const { data: skus } = await supabase
    .from('skus')
    .select('*, batches(batch_code, textile_type, status)')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-indigo-900">SKU Management</h1>
          <p className="text-gray-500 text-sm mt-1">Link products to certified batches and generate QR passport codes</p>
        </div>
        <Link href="/dashboard/skus/new" className="btn-primary">➕ Add SKU</Link>
      </div>
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream-100 border-b border-weft-border">
              <tr>
                {['SKU Code','Product Name','Type','Linked Batch','Price','Published','QR Code','Actions'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-weft-border">
              {skus && skus.length > 0 ? skus.map((s: any) => (
                <tr key={s.id} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3"><span className="font-mono text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">{s.sku_code}</span></td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-weft-text">{s.product_name}</p>
                    {s.collection_name && <p className="text-xs text-gray-400">{s.collection_name}</p>}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{s.product_type ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-indigo-600">{s.batches?.batch_code ?? '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">{s.retail_price_gbp ? `£${s.retail_price_gbp}` : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${s.is_published ? 'badge-certified' : 'badge-draft'}`}>{s.is_published ? 'Live' : 'Draft'}</span>
                  </td>
                  <td className="px-4 py-3">
                    {s.qr_code_url ? <Link href={s.qr_code_url} className="text-xs text-green-600 hover:underline">Download</Link> : <span className="text-xs text-gray-400">Not generated</span>}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/skus/${s.id}`} className="text-xs text-indigo-600 hover:underline">Edit</Link>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="px-4 py-16 text-center">
                  <div className="text-4xl mb-3">🏷️</div>
                  <p className="text-gray-500 font-medium">No SKUs created yet</p>
                  <p className="text-gray-400 text-sm mt-1">Add your first product SKU and link it to a certified batch</p>
                  <Link href="/dashboard/skus/new" className="btn-primary mt-4 inline-flex">Add first SKU</Link>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
