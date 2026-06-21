'use client';

import { Bell, Search } from 'lucide-react';
import { useState } from 'react';

export default function Topbar({ profile }: { profile: any }) {
  const [search, setSearch] = useState('');

  return (
    <header className="h-16 bg-white border-b border-weft-border flex items-center px-6 gap-4 flex-shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search batches, artisans, SKUs…"
            className="w-full pl-9 pr-4 py-2 text-sm bg-cream-100 border border-weft-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:bg-white transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-cream-100 transition-all">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron-400 rounded-full" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-weft-border">
          <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white text-sm font-semibold">
            {profile?.full_name?.[0] ?? 'U'}
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-weft-text leading-tight">{profile?.full_name ?? 'User'}</div>
            <div className="text-xs text-gray-400 capitalize">{profile?.role?.replace('_', ' ') ?? 'Brand'}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
