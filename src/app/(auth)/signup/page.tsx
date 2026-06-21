'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    fullName: '', email: '', brandName: '', password: '', confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const update = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.'); return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.'); return;
    }
    setLoading(true); setError('');

    const { data, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.fullName, brand_name: formData.brandName, role: 'brand' },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) { setError(authError.message); setLoading(false); return; }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="text-center animate-fade-up">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-weft-moss" />
        </div>
        <h2 className="font-serif text-2xl text-weft-charcoal mb-3">Check your inbox</h2>
        <p className="text-weft-muted text-sm leading-relaxed">
          We’ve sent a verification link to <strong>{formData.email}</strong>.
          Click it to activate your account and start your 60-day trial.
        </p>
        <Link href="/login" className="btn-primary mt-6 justify-center">Back to Sign In</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-weft-charcoal mb-2">Start your free trial</h1>
        <p className="text-weft-muted">60 days free — no credit card required</p>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-lg mb-6">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" required className="input" placeholder="Jane Smith"
              value={formData.fullName} onChange={e => update('fullName', e.target.value)} />
          </div>
          <div>
            <label className="label">Brand Name</label>
            <input type="text" required className="input" placeholder="Your Brand"
              value={formData.brandName} onChange={e => update('brandName', e.target.value)} />
          </div>
        </div>

        <div>
          <label className="label">Work Email</label>
          <input type="email" required className="input" placeholder="you@yourbrand.com"
            value={formData.email} onChange={e => update('email', e.target.value)} />
        </div>

        <div>
          <label className="label">Password</label>
          <div className="relative">
            <input type={showPass ? 'text' : 'password'} required className="input pr-12"
              placeholder="Min. 8 characters" minLength={8}
              value={formData.password} onChange={e => update('password', e.target.value)} />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-weft-muted">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="label">Confirm Password</label>
          <input type="password" required className="input" placeholder="Repeat password"
            value={formData.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
        </div>

        <div className="p-3 bg-weft-indigo bg-opacity-5 rounded-lg border border-weft-indigo border-opacity-20">
          <p className="text-xs text-weft-muted">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="text-weft-indigo hover:underline">Terms of Service</Link>{' '}and{' '}
            <Link href="/privacy" className="text-weft-indigo hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <button type="submit" disabled={loading}
          className="btn-primary w-full justify-center py-3.5 text-base">
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating account...</>
          ) : (
            <><UserPlus size={18} /> Create Account — 60 Days Free</>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-weft-muted mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-weft-indigo font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
