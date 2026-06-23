import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function CompliancePage() {
  const supabase = createClient()
  const { data: batches } = await supabase
    .from('batches')
    .select('id, batch_id_code, textile_name, status, certified_at, provenance_page_slug')
    .in('status', ['certified', 'submitted'])
    .order('certified_at', { ascending: false })
    .limit(20)

  const frameworks = [
    { name: 'EU Green Claims Directive', code: 'ECGT', status: 'ready', date: 'Sep 2026', bg: 'linear-gradient(140deg,#2a4378,#1d3160)', desc: 'Substantiation requirements for environmental claims on product labels.' },
    { name: 'CSDDD Due Diligence', code: 'CSDDD', status: 'ready', date: 'Jul 2027', bg: 'linear-gradient(140deg,#b08327,#946c14)', desc: 'Corporate Sustainability Due Diligence Directive — supply chain human rights & environment.' },
    { name: 'Digital Product Passport', code: 'DPP', status: 'coming', date: '2027–2030', bg: 'linear-gradient(140deg,#3c7a52,#2c5e3d)', desc: 'EU Ecodesign Regulation requiring machine-readable product data.' },
  ]

  return (
    <div>
      <div className="page-head">
        <div className="ey">Output</div>
        <h1>Compliance Centre</h1>
        <p>Monitor EU regulatory readiness and export compliance documentation.</p>
      </div>

      {/* Framework cards — matching client's .pack pattern */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {frameworks.map(f => (
          <div key={f.code} className="card" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: f.bg, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                {f.code.slice(0, 3)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--zari)', fontWeight: 600, marginTop: 2 }}>Effective: {f.date}</div>
              </div>
              <span className={`pill ${f.status === 'ready' ? 'certified' : 'allocated'}`}>
                <span className="d" />{f.status === 'ready' ? 'Ready' : 'Coming'}
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Certified batches */}
      <div className="panel">
        <div className="panel-h">
          <h2>Certified Batches</h2>
          <Link href="/dashboard/compliance/export" className="btn btn-primary btn-sm">Export Report</Link>
        </div>
        {!batches || batches.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
            No certified batches yet. Certify batches to generate compliance documentation.
          </div>
        ) : (
          <div className="panel-b" style={{ paddingTop: 6 }}>
            <table>
              <thead>
                <tr>
                  <th>Batch Code</th>
                  <th>Textile</th>
                  <th>Status</th>
                  <th>Certified</th>
                  <th>Passport</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {batches.map(b => (
                  <tr key={b.id} className="clickable">
                    <td>
                      <span className="mono" style={{ fontWeight: 600, color: 'var(--indigo)', background: 'var(--blue-soft)', padding: '3px 8px', borderRadius: 6 }}>
                        {b.batch_id_code}
                      </span>
                    </td>
                    <td><div className="tname">{b.textile_name}</div></td>
                    <td>
                      <span className={`pill ${b.status === 'certified' ? 'certified' : 'allocated'}`}>
                        <span className="d" />{b.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: 13 }}>
                      {b.certified_at ? new Date(b.certified_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td>
                      {b.status === 'certified' ? (
                        <Link href={`/passport/${b.provenance_page_slug || b.id}`} target="_blank" className="btn btn-ghost btn-sm">View ↗</Link>
                      ) : '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link href={`/dashboard/qr-codes?batch=${b.id}`} className="btn btn-ghost btn-sm" style={{ color: 'var(--zari)' }}>QR Code</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
