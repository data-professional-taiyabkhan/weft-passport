import { createClient } from '@/lib/supabase/server';

export default async function UsersPage() {
  const supabase = createClient();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-indigo-900">Users</h1>
        <p className="text-gray-500 text-sm mt-1">All registered users across brands, coordinators and admins</p>
      </div>
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream-100 border-b border-weft-border">
              <tr>
                {['Name', 'Email', 'Role', 'Organisation', 'Joined'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-weft-border">
              {profiles && profiles.length > 0 ? profiles.map((p: any) => (
                <tr key={p.id} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-weft-charcoal">{p.full_name ?? '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{p.email ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className="badge bg-indigo-100 text-indigo-700 capitalize">{p.role}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{p.organisation ?? '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(p.created_at).toLocaleDateString('en-GB')}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="px-4 py-16 text-center">
                  <p className="text-gray-400">No users found.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
