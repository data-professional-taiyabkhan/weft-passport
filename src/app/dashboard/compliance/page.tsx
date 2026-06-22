import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function CompliancePage() {
  const supabase = createClient()
  const { data: batches } = await supabase
    .from('batches')
    .select('id, batch_code, textile_type, status, certified_at')
    .in('status', ['certified', 'submitted'])
    .order('certified_at', { ascending: false })
    .limit(20)

  const frameworks = [
    { name: 'EU Green Claims Directive', code: 'EUGCD', status: 'ready', date: 'Sep 2026', icon: '🇪🇺', desc: 'Substantiation requirements for environmental claims on product labels.' },
    { name: 'CSDDD', code: 'CSDDD', status: 'ready', date: 'Jul 2027', icon: '⚖️', desc: 'Corporate Sustainability Due Diligence Directive — supply chain human rights & environment.' },
    { name: 'Digital Product Passport', code: 'DPP', status: 'coming', date: '2027–2030', icon: '📱', desc: 'EU Ecodesign Regulation requiring machine-readable product data at point of sale.' },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Compliance Centre</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Monitor EU regulatory readiness and export compliance documentation</p>
      </div>

      {/* Framework cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {frameworks.map(f => (
          <div key={f.code} className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{f.icon}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                f.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {f.status === 'ready' ? '✓ Ready' : 'Coming'}
              </span>
            </div>
            <h3 className="font-bold text-[#1B1464] text-sm mb-1">{f.name}</h3>
            <p className="text-[#6B7280] text-xs mb-2">{f.desc}</p>
            <p className="text-[#9CA3AF] text-xs">Effective: {f.date}</p>
          </div>
        ))}
      </div>

      {/* Certified batches for export */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E0D8] flex items-center justify-between">
          <h2 className="font-bold text-[#1B1464]">Certified Batches</h2>
          <Link href="/dashboard/compliance/export"
            className="bg-[#1B1464] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#231A7A] transition-colors">
            Export Report
          </Link>
        </div>
        {!batches || batches.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-[#6B7280] text-sm">No certified batches yet. Certify batches to generate compliance documentation.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FAF7F2]">
                <tr>
                  {['Batch Code', 'Textile', 'Status', 'Certified', 'Passport', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EFE8]">
                {batches.map(b => (
                  <tr key={b.id} className="hover:bg-[#FAF7F2]">
                    <td className="px-5 py-4 text-xs font-mono text-[#1B1464] font-semibold">{b.batch_code}</td>
                    <td className="px-5 py-4 text-sm text-[#1A1A2E]">{b.textile_type}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        b.status === 'certified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>{b.status}</span>
                    </td>
                    <td className="px-5 py-4 text-[#6B7280] text-sm">
                      {b.certified_at ? new Date(b.certified_at).toLocaleDateString('en-GB') : '—'}
                    </td>
                    <td className="px-5 py-4">
                      {b.status === 'certified' ? (
                        <Link href={`/passport/${b.id}`} target="_blank" className="text-[#1B1464] text-xs font-semibold hover:underline">
                          View ↗
                        </Link>
                      ) : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/dashboard/qr-codes?batch=${b.id}`} className="text-[#F4A300] text-xs font-semibold hover:underline">QR Code</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
