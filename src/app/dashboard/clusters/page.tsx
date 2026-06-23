import { createClient } from '@/lib/supabase/server';

export default async function ClustersPage() {
  const supabase = createClient();
  const { data: clusters } = await supabase
    .from('clusters')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-indigo-900">Artisan Clusters</h1>
          <p className="text-gray-500 text-sm mt-1">Geographic weaving clusters in the Weft Passport network</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clusters?.map((c: any) => (
          <div key={c.id} className="card hover:shadow-weft-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-weft-text">{c.name}</h3>
              {c.active && <span className="badge badge-certified">Active</span>}
            </div>
            <p className="text-sm text-gray-500">{c.region}, {c.country}</p>
            {c.description && <p className="text-xs text-gray-400 mt-2">{c.description}</p>}
            {c.lat && <p className="text-xs text-indigo-400 mt-2 font-mono">{c.lat}, {c.lng}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
