import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, QrCode, FileText, MapPin } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700 border-gray-200',
  submitted: 'bg-blue-50 text-blue-700 border-blue-200',
  field_verified: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  certified: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

export default async function BatchDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: batch } = await supabase
    .from('batches')
    .select('*, artisans(*, clusters(name)), looms(*), clusters(name)')
    .eq('id', params.id)
    .single();

  if (!batch) notFound();

  const { data: skus } = await supabase.from('skus').select('*').eq('batch_id', params.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/dashboard/batches" className="p-2 rounded-lg hover:bg-cream-200 transition-all mt-1">
          <ArrowLeft size={18} className="text-gray-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-serif text-indigo-900">{batch.batch_id_code}</h1>
            <span className={`badge border text-sm px-3 py-1 ${STATUS_COLORS[batch.status]}`}>{batch.status?.replace('_',' ')}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">{batch.textile_name} · {batch.technique?.replace('_',' ')} · {batch.clusters?.name ?? 'Unknown cluster'}</p>
        </div>
        <div className="flex gap-2">
          {batch.status === 'certified' && (
            <Link href={`/passport/${batch.id}`} className="btn-secondary">
              <QrCode size={15} /> View Passport
            </Link>
          )}
          <Link href="/dashboard/compliance" className="btn-outline">
            <FileText size={15} /> Export
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card">
            <h3 className="font-serif text-indigo-900 mb-4">Textile Information</h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {[['Textile', batch.textile_name], ['Technique', batch.technique?.replace('_',' ')],
                ['Fibre Content', batch.fibre_content || '—'], ['Colour', batch.colour_palette || '—'],
                ['Quantity', batch.quantity_pieces ? `${batch.quantity_pieces} pcs` : '—'], ['Location', batch.production_location || '—']
              ].map(([k,v]) => (
                <div key={k as string}>
                  <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{k}</dt>
                  <dd className="text-weft-text capitalize">{v as string}</dd>
                </div>
              ))}
            </dl>
          </div>

          {batch.field_notes && (
            <div className="card">
              <h3 className="font-serif text-indigo-900 mb-3">Field Notes</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{batch.field_notes}</p>
            </div>
          )}

          {/* Linked SKUs */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-indigo-900">Linked SKUs</h3>
              <Link href={`/dashboard/skus/new?batch=${params.id}`} className="btn-primary text-xs py-1.5 px-3">+ Link SKU</Link>
            </div>
            {!skus?.length ? (
              <p className="text-sm text-gray-400">No SKUs linked yet.</p>
            ) : (
              <div className="space-y-2">
                {skus.map((s: any) => (
                  <div key={s.id} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                    <div>
                      <div className="font-mono text-xs text-indigo-700">{s.sku_code}</div>
                      <div className="text-sm text-gray-700">{s.product_name}</div>
                    </div>
                    <Link href={`/dashboard/skus/${s.id}`} className="text-xs text-indigo-600 hover:underline">View</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Artisan card */}
          {batch.artisans && (
            <div className="card">
              <h3 className="font-serif text-indigo-900 mb-4">Artisan</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-900 font-bold text-lg">
                  {batch.artisans.full_name?.[0]}
                </div>
                <div>
                  <div className="font-semibold text-weft-text">{batch.artisans.full_name}</div>
                  <div className="text-xs font-mono text-gray-500">{batch.artisans.artisan_id_code}</div>
                </div>
              </div>
              <dl className="space-y-2 text-sm">
                {[['Status', batch.artisans.verification_status?.replace('_',' ')], ['Village', batch.artisans.village || '—'],
                  ['Cooperative', batch.artisans.cooperative_name || '—']
                ].map(([k,v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-gray-500">{k}</dt>
                    <dd className="font-medium capitalize">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/dashboard/artisans/${batch.artisans.id}`} className="mt-4 btn-ghost w-full justify-center border border-weft-border text-xs py-2">
                View Profile
              </Link>
            </div>
          )}

          {/* Certification status */}
          <div className="card">
            <h3 className="font-serif text-indigo-900 mb-4">Certification</h3>
            <div className="space-y-3">
              {['Field captured','Artisan verified','Batch submitted','Certified'].map((step, i) => {
                const statusOrder = ['draft','submitted','field_verified','certified'];
                const currentIdx = statusOrder.indexOf(batch.status);
                const done = i <= currentIdx;
                return (
                  <div key={step} className={`flex items-center gap-3 text-sm ${ done ? 'text-green-700' : 'text-gray-400'}`}>
                    <CheckCircle size={16} className={done ? 'text-green-500' : 'text-gray-300'} />
                    {step}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
