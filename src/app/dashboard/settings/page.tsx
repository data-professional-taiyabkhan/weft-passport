import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const meta = user?.user_metadata as any

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Account Settings</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Manage your Weft Passport account</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        <h2 className="font-bold text-[#1B1464] mb-4">Profile</h2>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl bg-[#1B1464] flex items-center justify-center text-white text-xl font-bold">
            {meta?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-[#1A1A2E]">{meta?.full_name || 'User'}</p>
            <p className="text-[#6B7280] text-sm">{user?.email}</p>
            <span className="inline-block mt-1 bg-[#1B1464]/10 text-[#1B1464] text-xs px-2 py-0.5 rounded-full font-semibold capitalize">
              {meta?.role || 'brand'}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Full Name</label>
            <input defaultValue={meta?.full_name || ''}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Organisation</label>
            <input defaultValue={meta?.organisation || ''}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" />
          </div>
          <p className="text-[#9CA3AF] text-xs">Profile editing coming in Phase 2. Contact Weft Passport to update your details.</p>
        </div>
      </div>

      {/* Sign out */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        <h2 className="font-bold text-[#1B1464] mb-2">Session</h2>
        <p className="text-[#6B7280] text-sm mb-4">Signed in as <span className="font-medium text-[#1A1A2E]">{user?.email}</span></p>
        <form action={signOut}>
          <button type="submit"
            className="bg-red-50 border border-red-200 text-red-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}
