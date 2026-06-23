import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { verifyArtisan } from '@/app/actions/artisans'

const statusColour: Record<string, string> = {
  verified: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  under_review: 'bg-purple-100 text-purple-700',
  rejected: 'bg-red-100 text-red-700',
}

export default async function ArtisanDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: artisan } = await supabase
    .from('artisans')
    .select('*, clusters(name, region), coordinators!coordinator_id(full_name)')
    .eq('id', params.id)
    .maybeSingle()

  if (!artisan) notFound()

  const { data: batches } = await supabase
    .from('batches')
    .select('id, batch_id_code, textile_name, status, created_at')
    .eq('artisan_id', params.id)
    .order('created_at', { ascending: false })

  const { data: { user } } = await supabase.auth.getUser()
  const { data: me } = await supabase.from('profiles').select('role').eq('id', user?.id ?? '').maybeSingle()
  const canVerify = (me?.role === 'admin' || me?.role === 'coordinator')
    && ['pending', 'under_review'].includes(artisan.verification_status)

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <Link href="/dashboard/artisans" className="text-[#1B1464] text-sm hover:underline">← Artisan Registry</Link>
      </div>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {artisan.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={artisan.photo_url} alt={artisan.full_name} className="w-16 h-16 rounded-xl object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-[#1B1464] flex items-center justify-center text-white text-2xl font-bold">
                {artisan.full_name?.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-[#1B1464] font-serif">{artisan.full_name}</h1>
              <p className="text-[#1B1464] text-xs font-mono mt-0.5">{artisan.artisan_id_code}</p>
              <span className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColour[artisan.verification_status] || 'bg-gray-100 text-gray-500'}`}>
                {artisan.verification_status?.replace('_', ' ')}
              </span>
            </div>
          </div>
          {canVerify && (
            <form action={verifyArtisan.bind(null, artisan.id)}>
              <button type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                ✓ Verify Artisan
              </button>
            </form>
          )}
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">
          {[
            ['Location', [artisan.village, artisan.district, artisan.state].filter(Boolean).join(', ') || '—'],
            ['Cluster', artisan.clusters?.name ? `${artisan.clusters.name}${artisan.clusters.region ? ` · ${artisan.clusters.region}` : ''}` : '—'],
            ['Coordinator', artisan.coordinators?.full_name || '—'],
            ['Specialisation', artisan.specialisation?.length ? artisan.specialisation.join(', ') : '—'],
            ['Experience', artisan.years_experience ? `${artisan.years_experience} years` : '—'],
            ['Cooperative', artisan.cooperative_name ? `${artisan.cooperative_name}${artisan.cooperative_member ? ' ✓' : ''}` : '—'],
            ['Gender', artisan.gender || '—'],
            ['Phone', artisan.phone || '—'],
            ['Verified', artisan.verified_at ? new Date(artisan.verified_at).toLocaleDateString('en-GB') : '—'],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="text-[#9CA3AF] text-xs uppercase tracking-wide font-medium mb-0.5">{k}</dt>
              <dd className="text-[#1A1A2E] font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        {artisan.bio && (
          <div className="mt-5 pt-5 border-t border-[#F3EFE8]">
            <p className="text-[#9CA3AF] text-xs uppercase tracking-wide font-medium mb-1">Field Notes</p>
            <p className="text-[#1A1A2E] text-sm leading-relaxed">{artisan.bio}</p>
          </div>
        )}
      </div>

      {/* Batches by this artisan */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E0D8]">
          <h2 className="font-bold text-[#1B1464]">Batches ({batches?.length ?? 0})</h2>
        </div>
        {!batches?.length ? (
          <p className="px-6 py-8 text-center text-[#6B7280] text-sm">No batches recorded for this artisan yet.</p>
        ) : (
          <table className="w-full">
            <tbody className="divide-y divide-[#F3EFE8]">
              {batches.map(b => (
                <tr key={b.id} className="hover:bg-[#FAF7F2]">
                  <td className="px-6 py-3 text-xs font-mono text-[#1B1464] font-semibold">{b.batch_id_code}</td>
                  <td className="px-6 py-3 text-sm text-[#1A1A2E]">{b.textile_name}</td>
                  <td className="px-6 py-3 text-sm text-[#6B7280] capitalize">{b.status?.replace('_', ' ')}</td>
                  <td className="px-6 py-3 text-right">
                    <Link href={`/dashboard/batches/${b.id}`} className="text-[#1B1464] text-xs font-semibold hover:underline">View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
