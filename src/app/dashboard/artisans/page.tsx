import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function ArtisansPage() {
  const supabase = createClient()
  const { data: artisans } = await supabase
    .from('artisans')
    .select('id, artisan_code, full_name, village, district, state, specialisations, status, years_experience')
    .order('created_at', { ascending: false })
    .limit(50)

  const statusColour: Record<string, string> = {
    verified: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    inactive: 'bg-gray-100 text-gray-500',
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Artisan Registry</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">{artisans?.length ?? 0} registered artisans</p>
        </div>
        <Link href="/dashboard/artisans/new"
          className="bg-[#1B1464] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
          + Register Artisan
        </Link>
      </div>

      {(!artisans || artisans.length === 0) ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
          <div className="text-5xl mb-4">🧵</div>
          <h3 className="font-bold text-[#1B1464] text-lg mb-2">No artisans yet</h3>
          <p className="text-[#6B7280] text-sm mb-5">Register your first artisan to start building provenance records.</p>
          <Link href="/dashboard/artisans/new"
            className="inline-flex bg-[#1B1464] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
            Register First Artisan
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FAF7F2] border-b border-[#E5E0D8]">
                <tr>
                  {['Code', 'Name', 'Location', 'Specialisation', 'Experience', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EFE8]">
                {artisans.map(a => (
                  <tr key={a.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="px-5 py-4 text-xs font-mono text-[#1B1464] font-semibold">{a.artisan_code}</td>
                    <td className="px-5 py-4 font-semibold text-[#1A1A2E] text-sm">{a.full_name}</td>
                    <td className="px-5 py-4 text-[#6B7280] text-sm">
                      {[a.village, a.district, a.state].filter(Boolean).join(', ') || '—'}
                    </td>
                    <td className="px-5 py-4 text-[#6B7280] text-sm">
                      {a.specialisations?.slice(0, 2).join(', ') || '—'}
                    </td>
                    <td className="px-5 py-4 text-[#6B7280] text-sm">
                      {a.years_experience ? `${a.years_experience} yrs` : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColour[a.status] || 'bg-gray-100 text-gray-500'}`}>
                        {a.status}
                      </span>
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
