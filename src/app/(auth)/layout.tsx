import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-heritage-gradient relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 loom-pattern opacity-20" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-weft-terracotta opacity-10 blur-3xl" />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xl">W</span>
          </div>
          <div>
            <span className="text-white font-serif font-semibold text-xl">Weft Passport</span>
            <p className="text-white text-opacity-60 text-xs">Loom-to-Label Certification</p>
          </div>
        </Link>

        {/* Brand copy */}
        <div className="relative">
          <blockquote className="font-serif text-3xl text-white leading-relaxed mb-6">
            “Tracing heritage,<br />
            <span className="text-weft-gold italic">thread by thread.”</span>
          </blockquote>
          <p className="text-white text-opacity-70 text-sm leading-relaxed max-w-sm">
            Join ethical fashion brands using verified loom-to-label provenance
            to substantiate artisan claims and stay ahead of EU compliance requirements.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: '5+', label: 'Brand LOIs' },
              { value: '20%', label: 'Price Uplift' },
              { value: '3', label: 'Clusters' },
            ].map(({ value, label }) => (
              <div key={label} className="p-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl">
                <p className="text-white font-serif font-bold text-2xl">{value}</p>
                <p className="text-white text-opacity-60 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-white text-opacity-40 text-xs">
          &copy; {new Date().getFullYear()} Silk and Soil Ltd. Registered in England &amp; Wales.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-weft-ivory">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-weft-indigo flex items-center justify-center">
              <span className="text-white font-serif font-bold">W</span>
            </div>
            <span className="font-serif font-semibold text-weft-indigo text-lg">Weft Passport</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
