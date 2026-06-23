import Link from 'next/link'
import { signUp } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/server'

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

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  const supabase = createClient()
  const { data: clusters } = await supabase
    .from('clusters')
    .select('id, name, region')
    .eq('active', true)
    .order('name')

  return (
    <div className="login-wrap">
      <div className="login-card">
        <BrandMark />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, margin: '0 0 4px' }}>Request access</h1>
        <p style={{ color: 'var(--muted)', fontSize: '13.5px', margin: '0 0 22px' }}>Create your account to start a 60-day trial</p>

        {searchParams.error && <Alert kind="error">{decodeURIComponent(searchParams.error)}</Alert>}
        {searchParams.message && <Alert kind="ok">{decodeURIComponent(searchParams.message)}</Alert>}

        <form action={signUp}>
          <div className="field">
            <label>Full name</label>
            <input name="full_name" type="text" required placeholder="Mahjabeen Bano" />
          </div>
          <div className="field">
            <label>Organisation / brand name</label>
            <input name="organisation" type="text" placeholder="Silk and Soil" />
          </div>
          <div className="field">
            <label>Email address</label>
            <input name="email" type="email" required placeholder="you@brand.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <input name="password" type="password" required minLength={8} placeholder="Min. 8 characters" />
          </div>
          <div className="field">
            <label>I am a</label>
            <select name="role" defaultValue="brand">
              <option value="brand">Fashion brand / buyer</option>
              <option value="coordinator">Field coordinator / artisan partner</option>
            </select>
          </div>
          <div className="field">
            <label>Cluster <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(field coordinators only)</span></label>
            <select name="cluster_id" defaultValue="">
              <option value="">— Not applicable —</option>
              {clusters?.map(c => (
                <option key={c.id} value={c.id}>{c.name}{c.region ? ` · ${c.region}` : ''}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Create account</button>
        </form>

        <div className="back-link">
          Already have an account? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
