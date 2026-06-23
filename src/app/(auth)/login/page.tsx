import Link from 'next/link'
import { signIn } from '@/app/actions/auth'

function BrandMark() {
  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid var(--zari)', display: 'grid', placeItems: 'center', color: 'var(--indigo-deep)', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13, background: 'rgba(194,147,47,.08)' }}>WP</div>
      <div>
        <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Weft Passport</div>
        <div style={{ fontSize: '9.5px', letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--muted)' }}>Provenance Certification</div>
      </div>
    </Link>
  )
}

function Alert({ kind, children }: { kind: 'error' | 'ok'; children: React.ReactNode }) {
  const style = kind === 'error'
    ? { background: '#f7e9e6', border: '1px solid #e3c0b8', color: '#86392a' }
    : { background: 'var(--green-soft)', border: '1px solid #bfdcc9', color: '#235e3a' }
  return <div style={{ ...style, borderRadius: '10px', padding: '11px 13px', fontSize: '13px', marginBottom: '16px', lineHeight: 1.5 }}>{children}</div>
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  return (
    <div className="login-wrap">
      <div className="login-card">
        <BrandMark />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, margin: '0 0 4px' }}>Welcome back</h1>
        <p style={{ color: 'var(--muted)', fontSize: '13.5px', margin: '0 0 22px' }}>Sign in to your Weft Passport account</p>

        {searchParams.error && <Alert kind="error">{decodeURIComponent(searchParams.error)}</Alert>}
        {searchParams.message && <Alert kind="ok">{decodeURIComponent(searchParams.message)}</Alert>}

        <form action={signIn}>
          <div className="field">
            <label>Email address</label>
            <input name="email" type="email" required autoComplete="email" placeholder="you@brand.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" />
          </div>
          <div className="forgot-row">
            <label><input type="checkbox" /> Remember me</label>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Sign in</button>
        </form>

        <div className="back-link">
          Don&apos;t have an account? <Link href="/register">Request access</Link>
        </div>
      </div>
    </div>
  )
}
