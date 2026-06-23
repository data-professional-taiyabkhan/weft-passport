'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateAccount(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const full_name = (formData.get('full_name') as string)?.trim() || null
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name })
    .eq('id', user.id)

  if (profileError) {
    return redirect('/dashboard/settings?error=' + encodeURIComponent(profileError.message))
  }

  // Brand fields are only present for brand users (the brand workspace is
  // provisioned at signup). Update it when a brand name was submitted.
  const brand_name = (formData.get('brand_name') as string)?.trim()
  if (brand_name) {
    const website = (formData.get('website') as string)?.trim() || null
    const city = (formData.get('city') as string)?.trim() || null

    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('profile_id', user.id)
      .maybeSingle()

    if (brand) {
      const { error } = await supabase
        .from('brands')
        .update({ brand_name, website, city })
        .eq('id', brand.id)
      if (error) return redirect('/dashboard/settings?error=' + encodeURIComponent(error.message))
    } else {
      const base = brand_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'brand'
      const brand_slug = `${base}-${Math.random().toString(36).slice(2, 8)}`
      const { error } = await supabase
        .from('brands')
        .insert({ profile_id: user.id, brand_name, brand_slug, website, city })
      if (error) return redirect('/dashboard/settings?error=' + encodeURIComponent(error.message))
    }
  }

  revalidatePath('/dashboard/settings')
  revalidatePath('/', 'layout')
  redirect('/dashboard/settings?message=Saved')
}
