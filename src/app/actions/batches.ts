'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBatch(formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get brand for this user
  const { data: brand } = await supabase
    .from('brands')
    .select('id')
    .eq('profile_id', user.id)
    .single()

  const year = new Date().getFullYear()
  const num = Math.floor(Math.random() * 9000) + 1000
  const batch_code = `WP-BTH-${year}-${num}`

  const { error } = await supabase.from('batches').insert({
    batch_code,
    brand_id: brand?.id,
    artisan_id: formData.get('artisan_id') as string || null,
    loom_id: formData.get('loom_id') as string || null,
    textile_type: formData.get('textile_type') as string,
    weave_type: formData.get('weave_type') as string,
    fibre_content: formData.get('fibre_content') as string || null,
    colour: formData.get('colour') as string || null,
    pattern_name: formData.get('pattern_name') as string || null,
    production_started_at: formData.get('production_started_at') as string || null,
    field_notes: formData.get('field_notes') as string || null,
    status: 'draft',
    created_by: user.id,
  })

  if (error) {
    return redirect('/dashboard/batches/new?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/dashboard/batches')
  redirect('/dashboard/batches')
}

export async function submitBatch(batchId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase
    .from('batches')
    .update({ status: 'submitted' })
    .eq('id', batchId)

  revalidatePath('/dashboard/batches')
  revalidatePath(`/dashboard/batches/${batchId}`)
}

export async function certifyBatch(batchId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Check admin/coordinator role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'coordinator'].includes(profile.role)) {
    return { error: 'Unauthorized' }
  }

  const year = new Date().getFullYear()
  const num = Math.floor(Math.random() * 9000) + 1000
  const batch_code_suffix = `${year}-${num}`

  await supabase
    .from('batches')
    .update({
      status: 'certified',
      certified_at: new Date().toISOString(),
      certified_by: user.id,
      passport_url: `/passport/${batchId}`,
    })
    .eq('id', batchId)

  revalidatePath('/dashboard/batches')
  revalidatePath(`/dashboard/batches/${batchId}`)
  revalidatePath(`/passport/${batchId}`)
  return { success: true }
}
