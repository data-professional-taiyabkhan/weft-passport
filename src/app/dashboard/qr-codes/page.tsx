import Link from 'next/link';

export default function QRCodesPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-indigo-900">QR Codes</h1>
          <p className="text-gray-500 text-sm mt-1">Generate and manage QR passport codes for certified SKUs</p>
        </div>
        <Link href="/dashboard/skus" className="btn-primary">Go to SKUs</Link>
      </div>
      <div className="card text-center py-16">
        <div className="text-5xl mb-4">⊞</div>
        <p className="text-gray-500 font-medium">QR codes are generated per SKU</p>
        <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
          Link a SKU to a certified batch, then generate its QR passport code from the SKU management page.
        </p>
        <Link href="/dashboard/skus" className="btn-primary mt-6 inline-flex">Manage SKUs →</Link>
      </div>
    </div>
  );
}
