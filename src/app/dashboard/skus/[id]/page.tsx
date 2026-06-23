import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function SKUDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: sku } = await supabase
    .from('skus')
    .select('*, batches(id, batch_id_code, textile_name, status)')
    .eq('id', params.id)
    .maybeSingle()

  if (!sku) notFound()

  const batch = sku.batches as any

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <Link href="/dashboard/skus" className="text-[#1B1464] text-sm hover:underline">← SKU Registry</Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1B1464] font-serif">{sku.product_name}</h1>
            <p className="text-[#1B1464] text-xs font-mono mt-0.5">{sku.sku_code}</p>
          </div>
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${sku.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {sku.active ? 'Active' : 'Inactive'}
          </span>
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">
          {[
            ['Category', sku.product_category || '—'],
            ['Price', sku.price_gbp != null ? `£${Number(sku.price_gbp).toFixed(2)}` : '—'],
            ['Created', new Date(sku.created_at).toLocaleDateString('en-GB')],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="text-[#9CA3AF] text-xs uppercase tracking-wide font-medium mb-0.5">{k}</dt>
              <dd className="text-[#1A1A2E] font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        {sku.product_description && (
          <div className="mt-5 pt-5 border-t border-[#F3EFE8]">
            <p className="text-[#9CA3AF] text-xs uppercase tracking-wide font-medium mb-1">Description</p>
            <p className="text-[#1A1A2E] text-sm leading-relaxed">{sku.product_description}</p>
          </div>
        )}
      </div>

      {/* Linked batch */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        <h2 className="font-bold text-[#1B1464] mb-4">Linked Batch</h2>
        {!batch ? (
          <p className="text-[#6B7280] text-sm">No batch linked to this SKU yet.</p>
        ) : (
          <div className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-lg">
            <div>
              <div className="font-mono text-xs text-[#1B1464] font-semibold">{batch.batch_id_code}</div>
              <div className="text-sm text-[#1A1A2E] mt-0.5">{batch.textile_name} · <span className="capitalize">{batch.status?.replace('_', ' ')}</span></div>
            </div>
            <Link href={`/dashboard/batches/${batch.id}`} className="text-[#1B1464] text-xs font-semibold hover:underline">View batch →</Link>
          </div>
        )}
      </div>

      {/* QR */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        <h2 className="font-bold text-[#1B1464] mb-2">QR Passport</h2>
        <p className="text-[#6B7280] text-sm mb-4">
          {batch?.status === 'certified'
            ? 'This SKU is linked to a certified batch — generate a QR code for its public passport.'
            : 'A QR passport becomes available once the linked batch is certified.'}
        </p>
        <Link href={`/dashboard/qr-codes${batch ? `?batch=${batch.id}` : ''}`}
          className="inline-flex bg-[#1B1464] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
          Generate QR Code
        </Link>
      </div>
    </div>
  )
}
