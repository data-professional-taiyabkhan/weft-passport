import Link from 'next/link';

export default function LoomsPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-indigo-900">Loom Registry</h1>
          <p className="text-gray-500 text-sm mt-1">Physical looms registered in the Weft Passport network</p>
        </div>
      </div>
      <div className="card text-center py-16">
        <div className="text-5xl mb-4">⧈</div>
        <p className="text-gray-500 font-medium">No looms registered yet</p>
        <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
          Looms are registered during field capture sessions alongside artisan verification.
        </p>
        <Link href="/dashboard/capture" className="btn-primary mt-6 inline-flex">Go to Field Capture →</Link>
      </div>
    </div>
  );
}
