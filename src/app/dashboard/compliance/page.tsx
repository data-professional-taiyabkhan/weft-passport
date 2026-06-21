import { createClient } from '@/lib/supabase/server';
import { Download, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default async function CompliancePage() {
  const supabase = createClient();
  const { data: batches } = await supabase.from('batches').select('id, batch_code, textile_type, status').order('created_at', {ascending: false});
  const certified = batches?.filter(b => b.status === 'certified') ?? [];
  const total = batches?.length ?? 0;
  const certRate = total ? Math.round((certified.length / total) * 100) : 0;

  const frameworks = [
    {
      name: 'EU Green Claims Directive',
      status: certRate >= 80 ? 'compliant' : certRate >= 50 ? 'partial' : 'action',
      deadline: '27 Sep 2026',
      detail: 'All green claims must be substantiated. Weft Passport certificates count as third-party evidence.',
    },
    {
      name: 'CSDDD (Corporate Sustainability Due Diligence)',
      status: certRate >= 70 ? 'compliant' : 'partial',
      deadline: 'Jul 2027',
      detail: 'Artisan working conditions, wages and supply chain documentation required.',
    },
    {
      name: 'EU Digital Product Passport (DPP)',
      status: 'partial',
      deadline: 'Jan 2030',
      detail: 'QR-based provenance data aligns with DPP technical specification. Export ready.',
    },
    {
      name: 'UK Mandatory Reporting',
      status: certRate >= 60 ? 'compliant' : 'action',
      deadline: 'Ongoing',
      detail: 'Modern Slavery Act & supply chain transparency obligations for UK brands.',
    },
  ];

  const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
    compliant: { icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200', label: 'Compliant' },
    partial: { icon: Info, color: 'text-amber-600 bg-amber-50 border-amber-200', label: 'Partial' },
    action: { icon: AlertTriangle, color: 'text-red-600 bg-red-50 border-red-200', label: 'Action Required' },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1>Compliance Centre</h1>
        <p>Monitor your compliance status against EU & UK regulatory frameworks</p>
      </div>

      {/* Score card */}
      <div className="card bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-indigo-200 text-sm mb-1">Overall Certification Rate</div>
            <div className="text-5xl font-bold">{certRate}%</div>
            <div className="text-indigo-200 text-sm mt-1">{certified.length} of {total} batches certified</div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{certified.length}</div>
              <div className="text-indigo-200 text-xs">Certified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{total - certified.length}</div>
              <div className="text-indigo-200 text-xs">Pending</div>
            </div>
          </div>
          <button className="btn bg-white text-indigo-900 hover:bg-cream-100 flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Framework cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {frameworks.map((f) => {
          const cfg = statusConfig[f.status];
          return (
            <div key={f.name} className={`card border-l-4 ${cfg.color.includes('green') ? 'border-l-green-500' : cfg.color.includes('amber') ? 'border-l-amber-400' : 'border-l-red-500'}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-weft-text">{f.name}</h3>
                  <div className="text-xs text-gray-400 mt-0.5">Deadline: {f.deadline}</div>
                </div>
                <span className={`badge border px-2.5 py-1 text-xs flex items-center gap-1.5 ${cfg.color}`}>
                  <cfg.icon size={12} />{cfg.label}
                </span>
              </div>
              <p className="text-sm text-gray-600">{f.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Certified batches table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-indigo-900">Certified Batches</h3>
          <button className="btn-ghost border border-weft-border text-sm flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
        </div>
        {!certified.length ? (
          <p className="text-sm text-gray-400 py-8 text-center">No certified batches yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-weft-border">
                <tr>{['Batch Code','Textile Type','Certificate'].map(h => (
                  <th key={h} className="text-left py-3 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-weft-border">
                {certified.map((b: any) => (
                  <tr key={b.id} className="hover:bg-cream-50">
                    <td className="py-3 pr-4 font-mono text-xs text-indigo-700">{b.batch_code}</td>
                    <td className="py-3 pr-4 text-gray-700">{b.textile_type}</td>
                    <td className="py-3">
                      <a href={`/passport/${b.id}`} target="_blank" className="text-xs text-indigo-600 hover:underline">View Passport ↗</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
