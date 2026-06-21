import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, AlertCircle, Package } from 'lucide-react';
import type { Batch } from '@/types/database';

const STATUS_CONFIG = {
  certified:      { icon: CheckCircle, color: 'text-weft-moss',       bg: 'bg-green-50',  label: 'Certified' },
  field_verified: { icon: CheckCircle, color: 'text-blue-500',        bg: 'bg-blue-50',   label: 'Field Verified' },
  submitted:      { icon: Clock,       color: 'text-weft-gold',       bg: 'bg-yellow-50', label: 'Submitted' },
  draft:          { icon: Package,     color: 'text-weft-muted',      bg: 'bg-gray-50',   label: 'Draft' },
  rejected:       { icon: AlertCircle, color: 'text-weft-terracotta', bg: 'bg-red-50',    label: 'Rejected' },
};

interface Props { batches: Partial<Batch>[] }

export default function RecentBatches({ batches }: Props) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-weft-charcoal">Recent Batches</h3>
        <Link href="/dashboard/batches" className="text-sm text-weft-indigo hover:underline flex items-center gap-1">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {batches.length === 0 ? (
        <div className="text-center py-12">
          <Package size={40} className="text-weft-muted opacity-30 mx-auto mb-3" />
          <p className="text-sm text-weft-muted">No batches yet</p>
          <Link href="/dashboard/batches/new" className="btn-primary mt-4 text-sm py-2">Submit First Batch</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {batches.map(batch => {
            const cfg = STATUS_CONFIG[batch.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.draft;
            const Icon = cfg.icon;
            return (
              <div key={batch.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-weft-ivory transition-colors">
                <div className={`w-10 h-10 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-weft-charcoal truncate">{batch.textile_name}</p>
                  <p className="text-xs text-weft-muted">{batch.batch_id_code}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  {batch.qr_scans !== undefined && batch.qr_scans > 0 && (
                    <span className="text-xs text-weft-muted">{batch.qr_scans} scans</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
