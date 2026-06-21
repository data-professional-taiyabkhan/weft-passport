import Link from 'next/link';
import { Plus, FileText, QrCode, Download } from 'lucide-react';

const brandActions = [
  { label: 'New Batch', href: '/dashboard/batches/new', icon: Plus, color: 'bg-indigo-50 text-indigo-900' },
  { label: 'Add SKU', href: '/dashboard/skus/new', icon: Plus, color: 'bg-saffron-100 text-saffron-700' },
  { label: 'Compliance Report', href: '/dashboard/compliance', icon: FileText, color: 'bg-green-50 text-green-700' },
  { label: 'Generate QR', href: '/dashboard/skus', icon: QrCode, color: 'bg-purple-50 text-purple-700' },
  { label: 'Export Data', href: '/dashboard/compliance', icon: Download, color: 'bg-blue-50 text-blue-700' },
];

const fieldActions = [
  { label: 'New Capture', href: '/dashboard/capture/new', icon: Plus, color: 'bg-indigo-50 text-indigo-900' },
  { label: 'Register Artisan', href: '/dashboard/artisans/new', icon: Plus, color: 'bg-saffron-100 text-saffron-700' },
  { label: 'Sync Data', href: '/dashboard/capture', icon: Download, color: 'bg-green-50 text-green-700' },
];

export default function QuickActions({ role }: { role?: string }) {
  const actions = role === 'field_coordinator' ? fieldActions : brandActions;
  return (
    <div className="card">
      <h3 className="font-serif text-lg text-indigo-900 mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((a) => (
          <Link key={a.label} href={a.href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream-100 transition-all group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.color}`}>
              <a.icon size={15} />
            </div>
            <span className="text-sm font-medium text-weft-text group-hover:text-indigo-900">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
