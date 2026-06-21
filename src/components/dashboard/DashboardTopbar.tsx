'use client';
import { Bell, Search } from 'lucide-react';

export default function DashboardTopbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-weft-sand">
      {/* Search */}
      <div className="relative w-80 hidden md:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-weft-muted" />
        <input
          type="text"
          placeholder="Search batches, artisans, SKUs..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-weft-ivory border border-weft-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-weft-indigo"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Compliance countdown */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-lg border border-red-100">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs font-medium text-red-600">EU ECGT: 27 Sept 2026</span>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg bg-weft-ivory border border-weft-sand flex items-center justify-center hover:bg-weft-sand transition-colors">
          <Bell size={16} className="text-weft-charcoal" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-weft-terracotta rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-weft-indigo flex items-center justify-center">
          <span className="text-white font-semibold text-sm">B</span>
        </div>
      </div>
    </header>
  );
}
