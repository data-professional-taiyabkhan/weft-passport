import { createClient } from '@/lib/supabase/server';

export default async function SettingsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single();

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-indigo-900">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your profile and account preferences</p>
      </div>

      <div className="card mb-6">
        <h2 className="font-semibold text-indigo-900 mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <p className="input bg-gray-50 text-weft-charcoal">{profile?.full_name ?? '—'}</p>
          </div>
          <div>
            <label className="label">Email</label>
            <p className="input bg-gray-50 text-weft-charcoal">{user?.email ?? '—'}</p>
          </div>
          <div>
            <label className="label">Role</label>
            <p className="input bg-gray-50 text-weft-charcoal capitalize">{profile?.role ?? '—'}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">To update profile details, contact your Weft Passport account manager.</p>
      </div>

      <div className="card">
        <h2 className="font-semibold text-indigo-900 mb-4">Support</h2>
        <p className="text-sm text-gray-500">Need help? Email us at{' '}
          <a href="mailto:hello@weftpassport.com" className="text-indigo-600 hover:underline">hello@weftpassport.com</a>
        </p>
      </div>
    </div>
  );
}
