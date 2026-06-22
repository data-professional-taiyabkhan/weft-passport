export default function SyncStatusPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-indigo-900">Sync Status</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor offline field data sync</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Records Pending Sync', value: 0, icon: '⏳', color: 'bg-amber-50' },
          { label: 'Successfully Synced', value: 0, icon: '✅', color: 'bg-green-50' },
          { label: 'Sync Errors', value: 0, icon: '⚠️', color: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className={`card ${s.color} border-0`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="text-2xl font-bold text-indigo-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card text-center py-10">
        <p className="text-gray-400 text-sm">All field data is up to date. No pending syncs.</p>
      </div>
    </div>
  );
}
