'use client';
import { Package, CheckCircle, QrCode, Shield, TrendingUp, Clock } from 'lucide-react';

interface Props {
  stats: {
    totalBatches: number;
    certified: number;
    activeSKUs: number;
    complianceScore: number;
    trialEndsAt: string | null;
    tier: string;
  };
}

export default function DashboardStats({ stats }: Props) {
  const trialDays = stats.trialEndsAt
    ? Math.max(0, Math.ceil((new Date(stats.trialEndsAt).getTime() - Date.now()) / 86400000))
    : null;

  const STAT_CARDS = [
    {
      icon: Package,
      label: 'Total Batches',
      value: stats.totalBatches,
      sublabel: 'submitted for certification',
      color: 'text-weft-indigo',
      bg: 'bg-blue-50',
    },
    {
      icon: CheckCircle,
      label: 'Certified',
      value: stats.certified,
      sublabel: `${stats.totalBatches > 0 ? Math.round((stats.certified / stats.totalBatches) * 100) : 0}% certification rate`,
      color: 'text-weft-moss',
      bg: 'bg-green-50',
    },
    {
      icon: QrCode,
      label: 'Active SKUs',
      value: stats.activeSKUs,
      sublabel: 'with live provenance pages',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      icon: Shield,
      label: 'Compliance Score',
      value: `${stats.complianceScore.toFixed(0)}%`,
      sublabel: 'regulatory readiness',
      color: stats.complianceScore >= 80 ? 'text-weft-moss' : 'text-weft-gold',
      bg: stats.complianceScore >= 80 ? 'bg-green-50' : 'bg-yellow-50',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Trial banner */}
      {stats.tier === 'trial' && trialDays !== null && (
        <div className="flex items-center justify-between p-4 bg-weft-indigo bg-opacity-5 border border-weft-indigo border-opacity-20 rounded-xl">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-weft-indigo" />
            <div>
              <p className="text-sm font-medium text-weft-indigo">
                {trialDays > 0 ? `${trialDays} days remaining in your free trial` : 'Your trial has ended'}
              </p>
              <p className="text-xs text-weft-muted">Upgrade to continue certifying after trial</p>
            </div>
          </div>
          <a href="/#pricing" className="text-xs btn-primary py-2 px-4">Upgrade Plan</a>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ icon: Icon, label, value, sublabel, color, bg }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-weft-muted">{label}</p>
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className={`font-serif text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-weft-muted mt-1">{sublabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
