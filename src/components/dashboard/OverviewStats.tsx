import { Package, CheckCircle, Tags, Users } from 'lucide-react';

interface Stats { batches: number; certified: number; skus: number; artisans: number; }

export default function OverviewStats({ stats, role }: { stats: Stats; role?: string }) {
  const cards = [
    {
      label: 'Total Batches',
      value: stats.batches,
      icon: Package,
      bg: 'bg-indigo-50',
      iconColor: 'text-indigo-900',
      change: '+12% this month',
      positive: true,
    },
    {
      label: 'Certified',
      value: stats.certified,
      icon: CheckCircle,
      bg: 'bg-green-50',
      iconColor: 'text-green-700',
      change: `${stats.batches ? Math.round((stats.certified/stats.batches)*100) : 0}% cert rate`,
      positive: true,
    },
    {
      label: 'Active SKUs',
      value: stats.skus,
      icon: Tags,
      bg: 'bg-saffron-100',
      iconColor: 'text-saffron-700',
      change: 'Linked to batches',
      positive: true,
    },
    {
      label: 'Artisans',
      value: stats.artisans,
      icon: Users,
      bg: 'bg-earth-100',
      iconColor: 'text-earth-700',
      change: 'Verified registry',
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="card flex items-start gap-4">
          <div className={`stat-icon ${card.bg}`}>
            <card.icon size={22} className={card.iconColor} />
          </div>
          <div>
            <div className="text-2xl font-bold text-weft-text">{card.value}</div>
            <div className="text-sm font-medium text-gray-600 mt-0.5">{card.label}</div>
            <div className={`text-xs mt-1 ${card.positive ? 'text-green-600' : 'text-red-500'}`}>{card.change}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
