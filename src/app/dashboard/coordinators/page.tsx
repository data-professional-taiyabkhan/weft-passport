import { createClient } from '@/lib/supabase/server'
import { verifyCoordinator, assignCoordinatorCluster } from '@/app/actions/coordinators'

export default async function CoordinatorsPage({ searchParams }: { searchParams: { message?: string; error?: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: me } = await supabase.from('profiles').select('role').eq('id', user?.id ?? '').maybeSingle()

  if (me?.role !== 'admin') {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-10 text-center">
          <h1 className="text-xl font-bold text-[#1B1464]">Admins only</h1>
          <p className="text-[#6B7280] text-sm mt-2">This page is restricted to platform administrators.</p>
        </div>
      </div>
    )
  }

  const [{ data: coordinators }, { data: clusters }] = await Promise.all([
    supabase
      .from('coordinators')
      .select('id, full_name, verified, active, cluster_id, clusters(name), profiles(email)')
      .order('created_at', { ascending: false }),
    supabase.from('clusters').select('id, name').eq('active', true).order('name'),
  ])

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Field Coordinators</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Verify coordinators and assign them to artisan clusters</p>
      </div>

      {searchParams.message && <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm">{decodeURIComponent(searchParams.message)}</div>}
      {searchParams.error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">{decodeURIComponent(searchParams.error)}</div>}

      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
        {!coordinators?.length ? (
          <p className="px-6 py-10 text-center text-[#6B7280] text-sm">No coordinators registered yet.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-[#FAF7F2] border-b border-[#E5E0D8]">
              <tr>
                {['Coordinator', 'Cluster', 'Status', 'Assign Cluster', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EFE8]">
              {coordinators.map((c: any) => (
                <tr key={c.id} className="hover:bg-[#FAF7F2]">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[#1A1A2E] text-sm">{c.full_name}</div>
                    <div className="text-xs text-[#6B7280]">{c.profiles?.email}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#6B7280]">{c.clusters?.name ?? '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${c.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {c.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <form action={assignCoordinatorCluster} className="flex items-center gap-2">
                      <input type="hidden" name="coordinator_id" value={c.id} />
                      <select name="cluster_id" defaultValue={c.cluster_id ?? ''}
                        className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] text-xs focus:outline-none focus:ring-2 focus:ring-[#1B1464]">
                        <option value="">— Unassigned —</option>
                        {clusters?.map(cl => <option key={cl.id} value={cl.id}>{cl.name}</option>)}
                      </select>
                      <button type="submit" className="text-[#1B1464] text-xs font-semibold hover:underline">Save</button>
                    </form>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {!c.verified && (
                      <form action={verifyCoordinator.bind(null, c.id)}>
                        <button type="submit" className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors">
                          ✓ Verify
                        </button>
                      </form>
                    )}
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
