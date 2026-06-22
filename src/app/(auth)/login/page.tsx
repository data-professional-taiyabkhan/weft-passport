import Link from 'next/link'
import { signIn } from '@/app/actions/auth'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1B1464] to-[#2D2196] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#F4A300] flex items-center justify-center text-[#1B1464] font-black text-lg">W</div>
            <div>
              <p className="text-white font-bold text-lg leading-none">Weft Passport</p>
              <p className="text-white/50 text-xs">Verified Heritage Textile Provenance</p>
            </div>
          </div>
          <h2 className="text-white text-4xl font-bold font-serif leading-tight mb-4">
            Tracing heritage,<br />thread by thread.
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            The only platform certifying South Asian handwoven textiles at SKU level — connecting master weavers to global fashion markets.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { icon: '✓', text: 'Artisan-level loom-to-label traceability' },
            { icon: '✓', text: 'EU Green Claims & CSDDD compliance ready' },
            { icon: '✓', text: 'QR-linked consumer provenance pages' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#F4A300]/20 text-[#F4A300] text-xs flex items-center justify-center font-bold">{item.icon}</span>
              <span className="text-white/80 text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Welcome back</h1>
            <p className="text-[#6B7280] text-sm mt-1">Sign in to your Weft Passport account</p>
          </div>

          {searchParams.error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-red-700 text-sm">{decodeURIComponent(searchParams.error)}</p>
            </div>
          )}
          {searchParams.message && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <p className="text-green-700 text-sm">{decodeURIComponent(searchParams.message)}</p>
            </div>
          )}

          <form action={signIn} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Email address</label>
              <input name="email" type="email" required autoComplete="email"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] bg-white text-[#1A1A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent placeholder:text-gray-400"
                placeholder="you@brand.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Password</label>
              <input name="password" type="password" required autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] bg-white text-[#1A1A2E] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent placeholder:text-gray-400"
                placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#E5E0D8]" />
                <span className="text-sm text-[#6B7280]">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-[#1B1464] font-medium hover:underline">Forgot password?</Link>
            </div>
            <button type="submit"
              className="w-full bg-[#1B1464] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#231A7A] transition-colors">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6B7280]">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#1B1464] font-semibold hover:underline">Request access</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
