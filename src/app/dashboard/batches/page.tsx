import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  certified: { label: 'Certified', cls: 'certified' },
  field_verified: { label: 'Field verified', cls: 'available' },
  submitted: { label: 'Submitted', cls: 'allocated' },
  draft: { label: 'Draft', cls: 'draft' },
  rejected: { label: 'Rejected', cls: 'draft' },
};

const FILTERS = [
  { label: 'All', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Field verified', value: 'field_verified' },
  { label: 'Certified', value: 'certified' },
  { label: 'Rejected', value: 'rejected' },
];

export default async function BatchesPage({ searchParams }: { searchParams: { status?: string } }) {
  const supabase = createClient();
  const active = searchParams.status ?? '';

  let query = supabase
    .from('batches')
    .select('*, artisans(full_name, artisan_id_code), clusters(name)')
    .order('created_at', { ascending: false })
    .limit(50);
  if (active) query = query.eq('status', active);
  const { data: batches } = await query;

  return (
    <div>
      <div className="page-head">
        <div className="ey">Supply</div>
        <h1>Production Batches</h1>
        <p>Manage and track all certified textile batches across your supply chain.</p>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {FILTERS.map(f => {
          const isActive = active === f.value;
          return (
            <Link key={f.label}
              href={f.value ? `/dashboard/batches?status=${f.value}` : '/dashboard/batches'}
              className={`pill ${isActive ? 'certified' : 'draft'}`}
              style={isActive ? {} : { cursor: 'pointer' }}>
              <span className="d" />
              {f.label}
            </Link>
          );
        })}
        <Link href="/dashboard/batches/new" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
          + New Batch
        </Link>
      </div>

      {/* Table */}
      <div className="panel">
        <div className="panel-b" style={{ paddingTop: 6 }}>
          <table>
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Textile</th>
                <th>Artisan</th>
                <th>Cluster</th>
                <th>Status</th>
                <th>Certified</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {batches && batches.length > 0 ? batches.map((b: any) => {
                const st = STATUS_MAP[b.status] || { label: b.status, cls: 'draft' };
                return (
                  <tr key={b.id} className="clickable">
                    <td><span className="mono" style={{ fontWeight: 600, color: 'var(--indigo)', background: 'var(--blue-soft)', padding: '3px 8px', borderRadius: 6 }}>{b.batch_id_code}</span></td>
                    <td>
                      <div className="tname">{b.textile_name}</div>
                    </td>
                    <td>
                      <div className="tname">{b.artisans?.full_name ?? '—'}</div>
                      <div className="tsub mono">{b.artisans?.artisan_id_code}</div>
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: 13 }}>{b.clusters?.name ?? '—'}</td>
                    <td><span className={`pill ${st.cls}`}><span className="d" />{st.label}</span></td>
                    <td style={{ color: 'var(--muted)', fontSize: 13 }}>{b.certified_at ? new Date(b.certified_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <Link href={`/dashboard/batches/${b.id}`} className="btn btn-ghost btn-sm">View</Link>
                        {b.status === 'certified' && (
                          <Link href={`/passport/${b.provenance_page_slug || b.id}`} className="btn btn-ghost btn-sm" style={{ color: 'var(--green)' }}>Passport</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 40 }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>No batches yet</div>
                    <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>Create your first production batch to get started</div>
                    <Link href="/dashboard/batches/new" className="btn btn-primary">Create first batch</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
