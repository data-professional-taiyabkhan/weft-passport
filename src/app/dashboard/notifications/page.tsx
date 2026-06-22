export default function NotificationsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-indigo-900">Notifications</h1>
        <p className="text-gray-500 text-sm mt-1">Recent activity and alerts for your account</p>
      </div>
      <div className="card text-center py-16">
        <div className="text-5xl mb-4">🔔</div>
        <p className="text-gray-500 font-medium">All caught up</p>
        <p className="text-gray-400 text-sm mt-2">No new notifications right now.</p>
      </div>
    </div>
  );
}
