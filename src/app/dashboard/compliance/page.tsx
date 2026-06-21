import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function CompliancePage() {
  const supabase = createClient();
  const { data: docs } = await supabase
    .from('compliance_docs')
    .select('*, batches(batch_code, textile_type)')
    .order('generated_at', { ascending: false })
    .limit(20);

  const frameworks = [
    {
      id: 'ECGT',
      name: 'EU Green Claims (ECGT)',
      description: 'Empowering Consumers for the Green Transition Directive',
      enforcement: 'September 2026',
      status: 'active',
      statusLabel: 'Enforcement Active',
      color: 'border-red-400',
      badge: 'bg-red-100 text-red-700',
      fields: ['Artisan identity verified', 'Production method documented', 'Third-party co-sign', 'Geo-tagged evidence'],
    },
    {
      id: 'DPP',
      name: 'Digital Product Passport',
      description: 'ESPR Regulation — textiles as priority category',
      enforcement: 'Late 2026 / 2027',
      status: 'upcoming',
      statusLabel: 'Prepare Now',
      color: 'border-amber-400',
      badge: 'bg-amber-100 text-amber-700',
      fields: ['Manufacturing origin', 'Production details', 'Traceability ID', 'QR/NFC access'],
    },
    {
      id: 'CSDDD',
      name: 'Corporate Sustainability Due Diligence',
      description: 'CSDDD — phased from 2027',
      enforcement: '2027 onwards',
      status: 'upcoming',
      statusLabel: 'Upcoming',
      color: 'border-blue-400',
      badge: 'bg-blue-100 text-blue-700',
      fields: ['Tier-1 supplier records', 'Artisan-level due diligence', 'Risk assessment docs'],
    },
    {
      id: 'UK_GREEN',
      name: 'UK Green Claims Code',
      description: 'CMA-administered, active enforcement',
      enforcement: 'Active now',
      status: 'active',
      statusLabel: 'Active',
      color: 'border-green-400',
      badge: 'bg-green-100 text-green-700',
      fields: ['Substantiated artisan claims', 'Evidence trail', 'SKU-level verification'],
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-indigo-900">Compliance Centre</h1>
          <p className="text-gray-500 text-sm mt-1">Regulatory readiness for UK &amp; EU fashion compliance frameworks</p>
        </div>
        <Link href="/dashboard/compliance/export" className="btn-primary">📤 Export Report</Link>
      </div>

      {/* Frameworks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {frameworks.map(fw => (
          <div key={fw.id} className={`card border-l-4 ${fw.color}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-weft-text">{fw.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{fw.description}</p>
              </div>
              <span className={`badge ${fw.badge} ml-3 flex-shrink-0`}>{fw.statusLabel}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">⏰ Enforcement: {fw.enforcement}</p>
            <div className="space-y-1.5">
              {fw.fields.map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="text-green-500">✓</span> {f}
                </div>
              ))}
            </div>
            <button className="btn-outline mt-4 text-xs px-3 py-1.5">Generate {fw.id} Export</button>
          </div>
        ))}
      </div>

      {/* Document history */}
      <div className="card">
        <h3 className="font-serif text-lg text-indigo-900 mb-4">Generated Documents</h3>
        {docs && docs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream-100">
                <tr>
                  {['Document Type','Linked Batch','Generated','Expires','Download'].map(h=>(
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-weft-border">
                {docs.map((d: any) => (
                  <tr key={d.id} className="hover:bg-cream-50">
                    <td className="px-3 py-2"><span className="badge bg-indigo-100 text-indigo-700">{d.doc_type}</span></td>
                    <td className="px-3 py-2 font-mono text-xs text-indigo-600">{d.batches?.batch_code ?? '—'}</td>
                    <td className="px-3 py-2 text-sm text-gray-500">{new Date(d.generated_at).toLocaleDateString('en-GB')}</td>
                    <td className="px-3 py-2 text-sm text-gray-500">{d.expires_at ? new Date(d.expires_at).toLocaleDateString('en-GB') : 'N/A'}</td>
                    <td className="px-3 py-2">{d.doc_url ? <a href={d.doc_url} className="text-xs text-indigo-600 hover:underline">Download PDF</a> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400">No compliance documents generated yet.</p>
            <p className="text-gray-400 text-sm mt-1">Generate your first report by selecting a framework above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
