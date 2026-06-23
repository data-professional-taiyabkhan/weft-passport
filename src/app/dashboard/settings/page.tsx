import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { updateAccount } from '@/app/actions/account'

export default async function SettingsPage({ searchParams }: { searchParams: { message?: string; error?: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user?.id ?? '')
    .maybeSingle()

  const role = profile?.role ?? 'brand'
  const { data: brand } = role === 'brand'
    ? await supabase
        .from('brands')
        .select('brand_name, website, city')
        .eq('profile_id', user?.id ?? '')
        .maybeSingle()
    : { data: null }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif">Account Settings</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Manage your Weft Passport account</p>
      </div>

      {searchParams.message && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <p className="text-green-700 text-sm">{decodeURIComponent(searchParams.message)}</p>
        </div>
      )}
      {searchParams.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-red-700 text-sm">{decodeURIComponent(searchParams.error)}</p>
        </div>
      )}

      <form action={updateAccount} className="space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
          <h2 className="font-bold text-[#1B1464] mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-xl bg-[#1B1464] flex items-center justify-center text-white text-xl font-bold">
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-[#1A1A2E]">{profile?.full_name || 'User'}</p>
              <p className="text-[#6B7280] text-sm">{user?.email}</p>
              <span className="inline-block mt-1 bg-[#1B1464]/10 text-[#1B1464] text-xs px-2 py-0.5 rounded-full font-semibold capitalize">
                {role}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Full Name</label>
              <input name="full_name" defaultValue={profile?.full_name || ''}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Email</label>
              <input defaultValue={user?.email || ''} readOnly
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] bg-[#FAF7F2] text-sm text-[#6B7280]" />
            </div>
          </div>
        </div>

        {/* Brand profile (brand users only) */}
        {role === 'brand' && (
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
            <h2 className="font-bold text-[#1B1464] mb-4">Brand Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Brand Name</label>
                <input name="brand_name" defaultValue={brand?.brand_name || ''}
                  placeholder="e.g. Silk and Soil"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Website</label>
                  <input name="website" defaultValue={brand?.website || ''}
                    placeholder="https://…"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">City</label>
                  <input name="city" defaultValue={brand?.city || ''}
                    placeholder="e.g. London"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <button type="submit"
          className="bg-[#1B1464] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
          Save Changes
        </button>
      </form>

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
