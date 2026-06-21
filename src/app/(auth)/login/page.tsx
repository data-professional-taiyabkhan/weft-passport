'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
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
    <div className="min-h-screen bg-cream-50 flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-weft relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-saffron-400 rounded-lg flex items-center justify-center font-bold text-indigo-950 text-lg">W</div>
            <span className="text-white font-serif text-xl font-bold">Weft Passport</span>
          </div>
          <h1 className="text-4xl font-serif text-white leading-tight mb-6">
            Tracing heritage,<br /><span className="text-saffron-300">thread by thread.</span>
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            The provenance certification platform connecting South Asian master weavers to global fashion markets.
          </p>
        </div>
        <div className="relative z-10 space-y-4">
          {[
            { icon: '🔐', text: 'SKU-level artisan traceability' },
            { icon: '📋', text: 'EU & UK compliance-ready documentation' },
            { icon: '📱', text: 'QR-linked consumer provenance pages' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-indigo-100">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-indigo-900 rounded-lg flex items-center justify-center font-bold text-saffron-400 text-lg">W</div>
            <span className="text-indigo-900 font-serif text-lg font-bold">Weft Passport</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-serif text-indigo-900 mb-2">Welcome back</h2>
            <p className="text-gray-500">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                className="input"
                placeholder="you@brand.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
                <Link href="/auth/reset" className="text-xs text-indigo-700 hover:underline">Forgot password?</Link>
              </div>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-700 font-semibold hover:underline">Request access</Link>
          </p>

          <div className="mt-8 pt-6 border-t border-weft-border text-center">
            <p className="text-xs text-gray-400">Are you a consumer? <Link href="/passport" className="text-indigo-600 hover:underline">Verify a product</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
