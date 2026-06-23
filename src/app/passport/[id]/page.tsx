import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const techniqueLabels: Record<string, string> = {
  banarasi_silk: 'Banarasi Silk',
  kantha: 'Kantha',
  ikat: 'Ikat',
  block_print: 'Block Print',
  embroidery: 'Hand Embroidery',
  jamdani: 'Jamdani',
  chanderi: 'Chanderi',
  other: 'Traditional Craft',
}
const loomTypeLabels: Record<string, string> = {
  pit_loom: 'Pit Loom',
  frame_loom: 'Frame Loom',
  jacquard: 'Jacquard',
  dobby: 'Dobby',
  fly_shuttle: 'Fly Shuttle',
  handloom_other: 'Handloom',
}

export async function generateMetadata(_props: Props): Promise<Metadata> {
  return {
    title: 'Weft Passport — Verified Textile Provenance',
    description: 'Scan to verify the origin and artisan story behind this handwoven textile.',
  }
}

export default async function PassportPage({ params }: Props) {
  const supabase = createClient()

  // Look up the certified batch by UUID id, batch_id_code, or provenance slug.
  let query = supabase
    .from('batches')
    .select(`
      *,
      artisans (
        artisan_id_code, full_name, village, district, state,
        photo_url, specialisation, years_experience,
        cooperative_name, cooperative_member,
        clusters ( name, region, country )
      ),
      looms ( loom_id_code, loom_type, width_cm, age_years )
    `)
    .eq('status', 'certified')

  query = UUID_RE.test(params.id)
    ? query.eq('id', params.id)
    : query.or(`batch_id_code.eq.${params.id},provenance_page_slug.eq.${params.id}`)

  const { data: batch } = await query.limit(1).maybeSingle()

  if (!batch) notFound()

  const artisan = batch.artisans as any
  const loom = batch.looms as any
  const cluster = artisan?.clusters as any

  const certDate = batch.certified_at
    ? new Date(batch.certified_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const techniqueLabel = techniqueLabels[batch.technique] || batch.technique

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-[#1B1464] text-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[#F4A300] text-xs font-semibold tracking-widest uppercase">Weft Passport</p>
            <p className="text-white/70 text-xs mt-0.5">Verified Heritage Textile Provenance</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">Certified</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Hero cert card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#E5E0D8]">
          <div className="bg-gradient-to-r from-[#1B1464] to-[#2D2196] px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-white text-xl font-bold font-serif">{batch.textile_name}</h1>
                <p className="text-white/70 text-sm mt-0.5">{techniqueLabel}</p>
              </div>
              <div className="text-right">
                <p className="text-[#F4A300] text-xs font-mono font-bold">{batch.batch_id_code}</p>
                {certDate && <p className="text-white/60 text-xs mt-0.5">Certified {certDate}</p>}
              </div>
            </div>

            {/* Certification badge row */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-green-500/20 border border-green-400/40 text-green-300 text-xs px-3 py-1 rounded-full font-semibold">
                ✓ Artisan Verified
              </span>
              <span className="bg-[#F4A300]/20 border border-[#F4A300]/40 text-[#F4A300] text-xs px-3 py-1 rounded-full font-semibold">
                ✓ {techniqueLabel}
              </span>
              <span className="bg-white/10 border border-white/20 text-white/80 text-xs px-3 py-1 rounded-full">
                ✓ Loom Recorded
              </span>
              {artisan?.cooperative_member && (
                <span className="bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs px-3 py-1 rounded-full">
                  ✓ Co-op Member
                </span>
              )}
            </div>
          </div>

          {/* Textile details */}
          <div className="px-6 py-5 grid grid-cols-2 gap-4 border-b border-[#E5E0D8]">
            {[
              { label: 'Textile', value: batch.textile_name },
              { label: 'Technique', value: techniqueLabel },
              { label: 'Fibre Content', value: batch.fibre_content },
              { label: 'Colour', value: batch.colour_palette },
            ].filter(i => i.value).map(item => (
              <div key={item.label}>
                <p className="text-[#6B7280] text-xs uppercase tracking-wide font-medium">{item.label}</p>
                <p className="text-[#1A1A2E] text-sm font-semibold mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Artisan card */}
        {artisan && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E0D8] flex items-center gap-2">
              <span className="text-[#F4A300]">🧵</span>
              <h2 className="font-bold text-[#1B1464] text-sm uppercase tracking-wide">The Artisan</h2>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-start gap-4">
                {artisan.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={artisan.photo_url} alt={artisan.full_name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-[#F4A300]/30" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1B1464] to-[#F4A300] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {artisan.full_name?.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-[#1A1A2E] font-bold text-lg">{artisan.full_name}</h3>
                  <p className="text-[#6B7280] text-sm">
                    {[artisan.village, artisan.district, artisan.state].filter(Boolean).join(', ')}
                  </p>
                  <p className="text-[#1B1464] text-xs font-mono mt-1">{artisan.artisan_id_code}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {artisan.specialisation?.length > 0 && (
                  <div>
                    <p className="text-[#6B7280] text-xs uppercase tracking-wide font-medium">Craft Specialisation</p>
                    <p className="text-[#1A1A2E] text-sm font-semibold mt-0.5">{artisan.specialisation.join(', ')}</p>
                  </div>
                )}
                {artisan.years_experience && (
                  <div>
                    <p className="text-[#6B7280] text-xs uppercase tracking-wide font-medium">Experience</p>
                    <p className="text-[#1A1A2E] text-sm font-semibold mt-0.5">{artisan.years_experience} years</p>
                  </div>
                )}
                {artisan.cooperative_name && (
                  <div className="col-span-2">
                    <p className="text-[#6B7280] text-xs uppercase tracking-wide font-medium">Cooperative</p>
                    <p className="text-[#1A1A2E] text-sm font-semibold mt-0.5">
                      {artisan.cooperative_name}
                      {artisan.cooperative_member && (
                        <span className="ml-2 text-green-600 text-xs">✓ Member</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cluster / Origin card */}
        {cluster && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E0D8] flex items-center gap-2">
              <span className="text-[#F4A300]">📍</span>
              <h2 className="font-bold text-[#1B1464] text-sm uppercase tracking-wide">Origin</h2>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1B1464]/10 flex items-center justify-center text-lg">🗺️</div>
                <div>
                  <p className="font-bold text-[#1A1A2E]">{cluster.name}</p>
                  <p className="text-[#6B7280] text-sm">{cluster.region}, {cluster.country}</p>
                </div>
              </div>
              {batch.production_start && (
                <div className="mt-4 flex gap-6">
                  <div>
                    <p className="text-[#6B7280] text-xs uppercase tracking-wide font-medium">Production Started</p>
                    <p className="text-[#1A1A2E] text-sm font-semibold mt-0.5">
                      {new Date(batch.production_start).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  {batch.production_end && (
                    <div>
                      <p className="text-[#6B7280] text-xs uppercase tracking-wide font-medium">Completed</p>
                      <p className="text-[#1A1A2E] text-sm font-semibold mt-0.5">
                        {new Date(batch.production_end).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loom card */}
        {loom && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E0D8] flex items-center gap-2">
              <span className="text-[#F4A300]">⚙️</span>
              <h2 className="font-bold text-[#1B1464] text-sm uppercase tracking-wide">Loom Record</h2>
            </div>
            <div className="px-6 py-5 grid grid-cols-2 gap-3">
              {[
                { label: 'Loom Code', value: loom.loom_id_code },
                { label: 'Loom Type', value: loomTypeLabels[loom.loom_type] || loom.loom_type },
                { label: 'Width', value: loom.width_cm ? `${loom.width_cm} cm` : null },
                { label: 'Age', value: loom.age_years ? `${loom.age_years} years` : null },
              ].filter(i => i.value).map(item => (
                <div key={item.label}>
                  <p className="text-[#6B7280] text-xs uppercase tracking-wide font-medium">{item.label}</p>
                  <p className="text-[#1A1A2E] text-sm font-semibold mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance notice */}
        <div className="bg-[#1B1464]/5 border border-[#1B1464]/15 rounded-xl px-5 py-4">
          <p className="text-[#1B1464] text-xs font-semibold uppercase tracking-wide mb-1">Compliance</p>
          <p className="text-[#1A1A2E] text-sm">
            This provenance record has been independently verified by Weft Passport and is structured for compliance with the
            EU Empowering Consumers for the Green Transition Directive (effective Sep 2026), CSDDD, and Digital Product Passport requirements.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pb-4">
          <p className="text-[#6B7280] text-xs">Verified by <span className="font-semibold text-[#1B1464]">Weft Passport</span> · Silk and Soil Ltd, Sheffield, UK</p>
          <p className="text-[#9CA3AF] text-xs mt-1">weftpassport.com</p>
        </div>
      </main>
    </div>
  )
}
