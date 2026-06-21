import Link from 'next/link';
import { Plus, Upload, QrCode, FileDown } from 'lucide-react';

const ACTIONS = [
  { icon: Plus,     label: 'New Batch',         href: '/dashboard/batches/new',      color: 'bg-weft-indigo text-white' },
  { icon: Upload,   label: 'Upload Evidence',    href: '/dashboard/batches',          color: 'bg-weft-terracotta text-white' },
  { icon: QrCode,   label: 'Generate QR',        href: '/dashboard/skus',             color: 'bg-weft-moss text-white' },
  { icon: FileDown, label: 'Download Report',    href: '/dashboard/compliance',       color: 'bg-weft-gold text-white' },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {ACTIONS.map(({ icon: Icon, label, href, color }) => (
        <Link key={label} href={href}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:opacity-90 hover:shadow-md ${color}`}>
          <Icon size={16} />
          {label}
        </Link>
      ))}
    </div>
  );
}
