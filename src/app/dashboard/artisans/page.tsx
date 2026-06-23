import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  verified: { label: 'Verified', cls: 'certified' },
  pending: { label: 'Pending', cls: 'allocated' },
  under_review: { label: 'Under review', cls: 'allocated' },
  rejected: { label: 'Rejected', cls: 'draft' },
}

export default async function ArtisansPage() {
  const supabase = createClient()
  const { data: artisans } = await supabase
    .from('artisans')
    .select('id, artisan_id_code, full_name, village, district, state, specialisation, verification_status, years_experience')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <div className="page-head">
        <div className="ey">Registry</div>
        <h1>Artisan Registry</h1>
        <p>{artisans?.length ?? 0} registered artisans across your sourcing clusters.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Link href="/dashboard/artisans/new" className="btn btn-primary btn-sm">+ Register Artisan</Link>
      </div>

      {(!artisans || artisans.length === 0) ? (
        <div className="empty">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🧵</div>
          <p><b>No artisans yet.</b> Register your first artisan to start building provenance records.</p>
          <Link href="/dashboard/artisans/new" className="btn btn-primary" style={{ marginTop: 16 }}>Register First Artisan</Link>
        </div>
      ) : (
        <div className="panel">
          <div className="panel-b" style={{ paddingTop: 6 }}>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Specialisation</th>
                  <th>Experience</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {artisans.map(a => {
                  const st = STATUS_MAP[a.verification_status] || { label: a.verification_status || '—', cls: 'draft' }
                  return (
                    <tr key={a.id} className="clickable">
                      <td>
                        <Link href={`/dashboard/artisans/${a.id}`}>
                          <span className="mono" style={{ fontWeight: 600, color: 'var(--indigo)', background: 'var(--blue-soft)', padding: '3px 8px', borderRadius: 6 }}>
                            {a.artisan_id_code}
                          </span>
                        </Link>
                      </td>
                      <td>
                        <Link href={`/dashboard/artisans/${a.id}`}>
                          <div className="tname">{a.full_name}</div>
                        </Link>
                      </td>
                      <td style={{ color: 'var(--muted)', fontSize: 13 }}>
                        {[a.village, a.district, a.state].filter(Boolean).join(', ') || '—'}
                      </td>
                      <td style={{ color: 'var(--muted)', fontSize: 13 }}>
                        {a.specialisation?.slice(0, 2).join(', ') || '—'}
                      </td>
                      <td className="mono" style={{ color: 'var(--muted)' }}>
                        {a.years_experience ? `${a.years_experience} yrs` : '—'}
                      </td>
                      <td>
                        <span className={`pill ${st.cls}`}>
                          <span className="d" />{st.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
