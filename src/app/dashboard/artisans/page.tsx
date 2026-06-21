import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { getArtisanStatusColor } from '@/lib/utils';

export default async function ArtisansPage() {
  const supabase = createClient();
  const { data: artisans } = await supabase
    .from('artisans')
    .select('*, clusters(name)')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-indigo-900">Artisan Registry</h1>
          <p className="text-gray-500 text-sm mt-1">Verified South Asian master weavers in the Weft Passport network</p>
        </div>
        <Link href="/dashboard/artisans/new" className="btn-primary">➕ Add Artisan</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {artisans && artisans.length > 0 ? artisans.map((a: any) => (
          <Link key={a.id} href={`/dashboard/artisans/${a.id}`}
            className="card hover:shadow-weft-lg transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-earth-100 flex items-center justify-center text-2xl flex-shrink-0">
                {a.photo_url ? <img src={a.photo_url} alt={a.full_name} className="w-full h-full object-cover rounded-xl" /> : '🧵'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-weft-text truncate">{a.full_name}</h3>
                  <span className={`badge ml-2 flex-shrink-0 ${getArtisanStatusColor(a.status)}`}>{a.status}</span>
                </div>
                <p className="text-xs text-indigo-600 font-mono mt-0.5">{a.artisan_code}</p>
                <p className="text-xs text-gray-500 mt-1">{a.clusters?.name ?? 'No cluster'}</p>
                {a.specialisations?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {a.specialisations.slice(0,2).map((s: string) => (
                      <span key={s} className="px-2 py-0.5 bg-cream-200 rounded-full text-xs text-gray-600">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-weft-border flex justify-between text-xs text-gray-400">
              <span>{a.village ? `${a.village}, ${a.state}` : a.state}</span>
              <span className="text-indigo-400 group-hover:underline">View profile →</span>
            </div>
          </Link>
        )) : (
          <div className="col-span-3 card text-center py-16">
            <div className="text-5xl mb-4">🧵</div>
            <p className="text-gray-500 font-medium">No artisans registered yet</p>
            <p className="text-gray-400 text-sm mt-2">Artisans are added by Field Coordinators during on-ground capture sessions</p>
          </div>
        )}
      </div>
    </div>
  );
}
