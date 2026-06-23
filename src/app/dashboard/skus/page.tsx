import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function SKUsPage() {
  const supabase = createClient()
  const { data: skus } = await supabase
    .from('skus')
    .select('id, sku_code, product_name, product_category, active, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <div className="page-head">
        <div className="ey">Products</div>
        <h1>SKU Registry</h1>
        <p>{skus?.length ?? 0} product SKUs mapped to certified batches.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Link href="/dashboard/skus/new" className="btn btn-primary btn-sm">+ Add SKU</Link>
      </div>

      {(!skus || skus.length === 0) ? (
        <div className="empty">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏷️</div>
          <p><b>No SKUs yet.</b> Add product SKUs to map them to certified batches and generate QR codes.</p>
          <Link href="/dashboard/skus/new" className="btn btn-primary" style={{ marginTop: 16 }}>Add First SKU</Link>
        </div>
      ) : (
        <div className="panel">
          <div className="panel-b" style={{ paddingTop: 6 }}>
            <table>
              <thead>
                <tr>
                  <th>SKU Code</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {skus.map(s => (
                  <tr key={s.id} className="clickable">
                    <td>
                      <Link href={`/dashboard/skus/${s.id}`}>
                        <span className="mono" style={{ fontWeight: 600, color: 'var(--indigo)', background: 'var(--blue-soft)', padding: '3px 8px', borderRadius: 6 }}>
                          {s.sku_code}
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/dashboard/skus/${s.id}`}>
                        <div className="tname">{s.product_name}</div>
                      </Link>
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: 13 }}>{s.product_category || '—'}</td>
                    <td>
                      <span className={`pill ${s.active ? 'certified' : 'draft'}`}>
                        <span className="d" />{s.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: 13 }}>
                      {new Date(s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link href={`/dashboard/qr-codes?sku=${s.id}`} className="btn btn-ghost btn-sm">Generate QR</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
