import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function SKUsPage() {
  const supabase = createClient()
  const { data: skus } = await supabase
    .from('skus')
    .select('id, sku_code, product_name, textile_type, status, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  const statusColour: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    archived: 'bg-gray-100 text-gray-500',
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1464] font-serif">SKU Registry</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">{skus?.length ?? 0} product SKUs</p>
        </div>
        <Link href="/dashboard/skus/new"
          className="bg-[#1B1464] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
          + Add SKU
        </Link>
      </div>

      {(!skus || skus.length === 0) ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
          <div className="text-5xl mb-4">🏷️</div>
          <h3 className="font-bold text-[#1B1464] text-lg mb-2">No SKUs yet</h3>
          <p className="text-[#6B7280] text-sm mb-5">Add product SKUs to map them to certified batches and generate QR codes.</p>
          <Link href="/dashboard/skus/new"
            className="inline-flex bg-[#1B1464] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
            Add First SKU
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FAF7F2] border-b border-[#E5E0D8]">
                <tr>
                  {['SKU Code', 'Product Name', 'Textile Type', 'Status', 'Created', 'QR'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EFE8]">
                {skus.map(s => (
                  <tr key={s.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="px-5 py-4 text-xs font-mono text-[#1B1464] font-semibold">{s.sku_code}</td>
                    <td className="px-5 py-4 font-semibold text-[#1A1A2E] text-sm">{s.product_name}</td>
                    <td className="px-5 py-4 text-[#6B7280] text-sm">{s.textile_type || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColour[s.status] || 'bg-gray-100 text-gray-500'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#6B7280] text-sm">
                      {new Date(s.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/dashboard/qr-codes?sku=${s.id}`} className="text-[#1B1464] text-xs font-semibold hover:underline">Generate QR</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
