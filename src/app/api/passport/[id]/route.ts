import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()

  const { data: batch, error } = await supabase
    .from('batches')
    .select(`
      id, batch_code, textile_type, weave_type, fibre_content,
      colour, pattern_name, status, certified_at,
      production_started_at, production_completed_at,
      artisans (
        artisan_code, full_name, village, district, state,
        photo_url, specialisations, years_experience,
        cooperative_name, cooperative_verified
      ),
      looms ( loom_code, loom_type, weave_type, width_cm ),
      clusters ( name, region, country )
    `)
    .or(`id.eq.${params.id},batch_code.eq.${params.id}`)
    .eq('status', 'certified')
    .single()

  if (error || !batch) {
    return NextResponse.json({ error: 'Passport not found' }, { status: 404 })
  }

  return NextResponse.json(batch)
}
