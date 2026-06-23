import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import CaptureWizard, { type Assignment } from '@/components/dashboard/CaptureWizard'

export default async function FieldCapturePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: coords } = await supabase
    .from('coordinators')
    .select('id, cluster_id, clusters(name)')
    .eq('profile_id', user?.id ?? '')
    .eq('active', true)

  const assignments: Assignment[] = (coords ?? [])
    .filter((c: any) => c.cluster_id)
    .map((c: any) => ({ coordinatorId: c.id, clusterId: c.cluster_id, clusterName: c.clusters?.name ?? 'Cluster' }))

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Field Data Capture</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Record artisan, loom, and batch data on-site in one pass</p>
      </div>

      {assignments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-10 text-center">
          <div className="text-5xl mb-4">📍</div>
          <h3 className="font-bold text-[#1B1464] text-lg mb-2">No cluster assigned</h3>
          <p className="text-[#6B7280] text-sm max-w-md mx-auto">
            Field capture requires a cluster assignment. Ask a Weft Passport admin to assign you to an
            artisan cluster, then return here to start recording.
          </p>
          <Link href="/dashboard" className="inline-flex mt-5 bg-[#1B1464] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
            Back to Overview
          </Link>
        </div>
      ) : (
        <CaptureWizard assignments={assignments} />
      )}
    </div>
  )
}
