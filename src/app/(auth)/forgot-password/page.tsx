'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="text-center animate-fade-up">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-weft-indigo" />
        </div>
        <h2 className="font-serif text-2xl text-weft-charcoal mb-3">Reset link sent</h2>
        <p className="text-weft-muted text-sm">Check your inbox at <strong>{email}</strong>.</p>
        <Link href="/login" className="btn-ghost mt-6 justify-center"><ArrowLeft size={16} /> Back to Sign In</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <Link href="/login" className="flex items-center gap-2 text-sm text-weft-muted hover:text-weft-indigo mb-8">
        <ArrowLeft size={16} /> Back to Sign In
      </Link>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-weft-charcoal mb-2">Reset your password</h1>
        <p className="text-weft-muted">Enter your email and we’ll send a reset link.</p>
      </div>
      <form onSubmit={handleReset} className="space-y-5">
        <div>
          <label className="label">Email address</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="hello@yourbrand.com" className="input" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
          {loading ? 'Sending...' : <><Mail size={18} /> Send Reset Link</>}
        </button>
      </form>
    </div>
  );
}
