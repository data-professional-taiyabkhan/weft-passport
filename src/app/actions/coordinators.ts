'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireAdmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: me } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
  if (me?.role !== 'admin') return null
  return supabase
}

export async function verifyCoordinator(coordinatorId: string) {
  const supabase = await requireAdmin()
  if (!supabase) return { error: 'Admins only' }

  const { error } = await supabase
    .from('coordinators')
    .update({ verified: true })
    .eq('id', coordinatorId)
  if (error) return { error: error.message }

  revalidatePath('/dashboard/coordinators')
  return { success: true }
}

export async function assignCoordinatorCluster(formData: FormData) {
  const supabase = await requireAdmin()
  if (!supabase) return redirect('/dashboard/coordinators?error=Admins+only')

  const coordinatorId = formData.get('coordinator_id') as string
  const cluster_id = (formData.get('cluster_id') as string) || null

  const { error } = await supabase
    .from('coordinators')
    .update({ cluster_id })
    .eq('id', coordinatorId)
  if (error) return redirect('/dashboard/coordinators?error=' + encodeURIComponent(error.message))

  revalidatePath('/dashboard/coordinators')
  redirect('/dashboard/coordinators?message=Cluster+updated')
}
