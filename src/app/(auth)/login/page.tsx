'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-weft relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} />
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-saffron-400 rounded-lg flex items-center justify-center font-bold text-indigo-950 text-lg">WP</div>
            <span className="text-white font-semibold text-xl tracking-wide">Weft Passport</span>
          </div>
          <h1 className="text-4xl font-serif text-white mb-4 leading-tight">Tracing heritage,<br />thread by thread.</h1>
          <p className="text-indigo-200 text-lg leading-relaxed">The provenance certification platform connecting South Asian master weavers to fashion markets worldwide.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[{n:'5+',l:'Brands onboarded'},{n:'200+',l:'Artisans verified'},{n:'500+',l:'Batches certified'},{n:'100%',l:'Compliance ready'}].map(s=>(
            <div key={s.l} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-saffron-400">{s.n}</div>
              <div className="text-indigo-200 text-sm mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-12 h-12 bg-indigo-900 rounded-xl flex items-center justify-center font-bold text-white text-xl">WP</div>
            </div>
            <h2 className="text-3xl font-serif text-indigo-900 mb-2">Welcome back</h2>
            <p className="text-gray-500">Sign in to your Weft Passport account</p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input" placeholder="you@brand.com" required />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input" placeholder="••••••••" required />
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-600 font-semibold hover:underline">Request access</Link>
          </p>
          <p className="text-center mt-4 text-xs text-gray-400">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="hover:underline">Terms</Link> &amp;{' '}
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
