import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, MapPin } from 'lucide-react';

export default async function ArtisansPage() {
  const supabase = createClient();
  const { data: artisans } = await supabase
    .from('artisans')
    .select('*, clusters(name)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header flex items-start justify-between">
        <div>
          <h1>Artisan Registry</h1>
          <p>Verified handloom artisans in the Weft Passport network</p>
        </div>
        <Link href="/dashboard/artisans/new" className="btn-primary">
          <Plus size={16} /> Register Artisan
        </Link>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Artisans', value: artisans?.length ?? 0 },
          { label: 'Verified', value: artisans?.filter(a => a.status === 'verified').length ?? 0 },
          { label: 'Pending', value: artisans?.filter(a => a.status === 'pending').length ?? 0 },
        ].map((s) => (
          <div key={s.label} className="card text-center py-4">
            <div className="text-2xl font-bold text-indigo-900">{s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      {!artisans?.length ? (
        <div className="card text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🧑‍🎨</div>
          <p className="font-medium">No artisans registered yet</p>
          <Link href="/dashboard/artisans/new" className="btn-primary mt-4 inline-flex">Register first artisan</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {artisans.map((a: any) => (
            <Link href={`/dashboard/artisans/${a.id}`} key={a.id}
              className="card hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer block">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-saffron-100 flex items-center justify-center text-indigo-900 font-bold text-xl flex-shrink-0">
                  {a.full_name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-weft-text">{a.full_name}</div>
                  <div className="text-xs font-mono text-gray-400 mt-0.5">{a.artisan_code}</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <MapPin size={11} />
                    {a.village ? `${a.village}, ` : ''}{a.clusters?.name ?? 'Unknown'}
                  </div>
                </div>
                <span className={`badge flex-shrink-0 ${a.status === 'verified' ? 'badge-certified' : a.status === 'pending' ? 'badge-draft' : 'badge bg-blue-100 text-blue-700'}`}>
                  {a.status}
                </span>
              </div>
              {a.specialisation && (
                <div className="mt-3 pt-3 border-t border-weft-border text-xs text-gray-500">
                  {a.specialisation}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
