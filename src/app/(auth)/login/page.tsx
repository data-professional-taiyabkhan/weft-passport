'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Fetch profile role to redirect correctly
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, onboarding_complete')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin') router.push('/admin');
      else if (profile?.role === 'coordinator') router.push('/coordinator');
      else if (!profile?.onboarding_complete) router.push('/onboarding');
      else router.push('/dashboard');
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-weft-charcoal mb-2">Welcome back</h1>
        <p className="text-weft-muted">Sign in to your Weft Passport account</p>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-lg mb-6">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="label">Email address</label>
          <input
            type="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="hello@yourbrand.com"
            className="input"
          />
        </div>

        <div>
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input pr-12"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-weft-muted hover:text-weft-charcoal">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-end mt-1.5">
            <Link href="/forgot-password" className="text-xs text-weft-indigo hover:underline">Forgot password?</Link>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="btn-primary w-full justify-center py-3.5 text-base">
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</>
          ) : (
            <><LogIn size={18} /> Sign In</>
          )}
        </button>
      </form>

      <div className="heritage-divider"><span className="text-weft-muted text-xs">or</span></div>

      <p className="text-center text-sm text-weft-muted">
        New to Weft Passport?{' '}
        <Link href="/signup" className="text-weft-indigo font-medium hover:underline">Request access</Link>
      </p>
    </div>
  );
}
