'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    fullName: '', email: '', brandName: '', password: '', confirmPassword: '',
  });
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

    const { error: authError } = await supabase.auth.signUp({
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

  return (
    <div className="login-wrap">
      <div className="login-card">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid var(--zari)', display: 'grid', placeItems: 'center', color: 'var(--indigo-deep)', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13, background: 'rgba(194,147,47,.08)' }}>WP</div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Weft Passport</div>
            <div style={{ fontSize: '9.5px', letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--muted)' }}>Provenance Certification</div>
          </div>
        </Link>

        {success ? (
          <div className="success-state">
            <div className="seal">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3>Check your inbox</h3>
            <p>
              We&apos;ve sent a verification link to <strong>{formData.email}</strong>. Click it to activate your
              account and start your 60-day trial.
            </p>
            <Link href="/login" className="btn btn-primary" style={{ marginTop: '20px', justifyContent: 'center' }}>Back to sign in</Link>
          </div>
        ) : (
          <>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, margin: '0 0 4px' }}>Start your free trial</h1>
            <p style={{ color: 'var(--muted)', fontSize: '13.5px', margin: '0 0 22px' }}>60 days free — no credit card required</p>

            {error && (
              <div style={{ background: '#f7e9e6', border: '1px solid #e3c0b8', color: '#86392a', borderRadius: '10px', padding: '11px 13px', fontSize: '13px', marginBottom: '16px', lineHeight: 1.5 }}>{error}</div>
            )}

            <form onSubmit={handleSignup}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
                <div className="field">
                  <label>Full name</label>
                  <input type="text" required placeholder="Jane Smith" value={formData.fullName} onChange={e => update('fullName', e.target.value)} />
                </div>
                <div className="field">
                  <label>Brand name</label>
                  <input type="text" required placeholder="Your Brand" value={formData.brandName} onChange={e => update('brandName', e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label>Work email</label>
                <input type="email" required placeholder="you@yourbrand.com" value={formData.email} onChange={e => update('email', e.target.value)} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" required minLength={8} placeholder="Min. 8 characters" value={formData.password} onChange={e => update('password', e.target.value)} />
              </div>
              <div className="field">
                <label>Confirm password</label>
                <input type="password" required placeholder="Repeat password" value={formData.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
                By creating an account you agree to our{' '}
                <Link href="/terms" style={{ color: 'var(--indigo)', fontWeight: 600 }}>Terms of Service</Link> and{' '}
                <Link href="/privacy" style={{ color: 'var(--indigo)', fontWeight: 600 }}>Privacy Policy</Link>.
              </p>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Creating account…' : 'Create account — 60 days free'}
              </button>
            </form>

            <div className="back-link">
              Already have an account? <Link href="/login">Sign in</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
