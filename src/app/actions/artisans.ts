'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createArtisan(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const cluster_id = formData.get('cluster_id') as string
  const clusterCode = 'VNS'
  const num = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')
  const artisan_code = `WP-${clusterCode}-${num}`

  const specialisations = formData.get('specialisations') as string
  const specArray = specialisations ? specialisations.split(',').map(s => s.trim()).filter(Boolean) : []

  const { error } = await supabase.from('artisans').insert({
    artisan_id_code: artisan_code,
    cluster_id: cluster_id || null,
    full_name: formData.get('full_name') as string,
    gender: formData.get('gender') as string || null,
    village: formData.get('village') as string || null,
    district: formData.get('district') as string || null,
    state: formData.get('state') as string || null,
    phone: formData.get('phone') as string || null,
    specialisation: specArray,
    years_experience: formData.get('years_experience') ? Number(formData.get('years_experience')) : null,
    cooperative_name: formData.get('cooperative_name') as string || null,
    cooperative_member: Boolean(formData.get('cooperative_name')),
    bio: formData.get('notes') as string || null,
    verification_status: 'pending',
  })

  if (error) {
    return redirect('/dashboard/artisans/new?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/dashboard/artisans')
  redirect('/dashboard/artisans')
}

export async function verifyArtisan(artisanId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  await supabase
    .from('artisans')
    .update({ verification_status: 'verified', verified_at: new Date().toISOString() })
    .eq('id', artisanId)

  revalidatePath('/dashboard/artisans')
  return { success: true }
}
