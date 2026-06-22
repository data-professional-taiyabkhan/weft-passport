import Link from 'next/link'
import { resetPassword } from '@/app/actions/auth'

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#1B1464] flex items-center justify-center text-[#F4A300] font-black">W</div>
            <span className="font-bold text-[#1B1464]">Weft Passport</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Reset Password</h1>
          <p className="text-[#6B7280] text-sm mt-1">Enter your email and we'll send a reset link</p>
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

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D8] p-6">
          <form action={resetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Email address</label>
              <input name="email" type="email" required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent"
                placeholder="you@brand.com" />
            </div>
            <button type="submit"
              className="w-full bg-[#1B1464] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#231A7A] transition-colors">
              Send Reset Link
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-[#6B7280]">
          <Link href="/login" className="text-[#1B1464] font-semibold hover:underline">← Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
