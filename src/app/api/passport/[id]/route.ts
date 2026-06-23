import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()

  // Look up the certified batch by UUID id, batch_id_code, or provenance slug.
  let query = supabase
    .from('batches')
    .select(`
      id, batch_id_code, textile_name, technique, fibre_content,
      colour_palette, status, certified_at,
      production_start, production_end,
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

  if (!batch) {
    return NextResponse.json({ error: 'Passport not found' }, { status: 404 })
  }

  return NextResponse.json(batch)
}
