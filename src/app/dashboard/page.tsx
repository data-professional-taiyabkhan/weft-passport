import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  const [{ count: batchCount }, { count: artisanCount }, { count: skuCount }, { count: complianceCount }] = await Promise.all([
    supabase.from('batches').select('*', { count: 'exact', head: true }),
    supabase.from('artisans').select('*', { count: 'exact', head: true }),
    supabase.from('skus').select('*', { count: 'exact', head: true }),
    supabase.from('compliance_documents').select('*', { count: 'exact', head: true }),
  ]);

  // Get recent batches for activity feed
  const { data: recentBatches } = await supabase
    .from('batches')
    .select('batch_id_code, textile_name, status, certified_at, created_at, artisans(full_name)')
    .order('created_at', { ascending: false })
    .limit(5);

  // Get first certified batch for passport preview link
  const { data: certifiedBatch } = await supabase
    .from('batches')
    .select('id, provenance_page_slug')
    .eq('status', 'certified')
    .limit(1)
    .maybeSingle();

  // Days to ECGT
  const ecgtDate = new Date('2026-09-27');
  const daysToECGT = Math.max(0, Math.round((ecgtDate.getTime() - Date.now()) / 86400000));

  const firstName = profile?.full_name?.split(' ')[0] ?? 'there';

  return (
    <div>
      {/* Page head */}
      <div className="page-head">
        <div className="ey">Certification workspace</div>
        <h1>Welcome back, {firstName}</h1>
        <p>Map your verified handloom batches to product SKUs, generate compliance evidence, and publish consumer provenance.</p>
      </div>

      {/* ECGT Ribbon */}
      <div className="ribbon">
        <div className="cd">
          <div className="n">{daysToECGT}</div>
          <div className="l">days to ECGT</div>
        </div>
        <div className="tx">
          <h3>Get your evidence chain in place before 27 September 2026</h3>
          <p>From that date, &ldquo;handwoven&rdquo; and &ldquo;artisan-made&rdquo; claims to EU consumers need product-level substantiation.</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <Link href="/dashboard/batches" className="card statcard" style={{ textDecoration: 'none' }}>
          <div className="lab">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3.3 7 12 12l8.7-5M12 22V12"/><path d="m3.3 7 8.7-5 8.7 5v10l-8.7 5-8.7-5Z"/></svg>
            Verified batches
          </div>
          <div className="big">{batchCount ?? 0}</div>
          <div className="sub">available to map</div>
        </Link>
        <Link href="/dashboard/artisans" className="card statcard" style={{ textDecoration: 'none' }}>
          <div className="lab">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Verified artisans
          </div>
          <div className="big green">{artisanCount ?? 0}</div>
          <div className="sub">in registry</div>
        </Link>
        <Link href="/dashboard/skus" className="card statcard" style={{ textDecoration: 'none' }}>
          <div className="lab">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 12h7M3 6h11M3 18h6"/><path d="m14 16 3 3 4-5"/></svg>
            Active SKUs
          </div>
          <div className="big gold">{skuCount ?? 0}</div>
          <div className="sub">mapped or certified</div>
        </Link>
        <Link href="/dashboard/compliance" className="card statcard" style={{ textDecoration: 'none' }}>
          <div className="lab">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>
            Compliance packs
          </div>
          <div className="big">{complianceCount ?? 0}</div>
          <div className="sub">ready to download</div>
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="two">
        {/* Continue certifying */}
        <div className="panel">
          <div className="panel-h">
            <h2>Recent activity</h2>
            <Link href="/dashboard/batches" className="btn btn-primary btn-sm">View all batches</Link>
          </div>
          <div className="panel-b">
            <table>
              <thead>
                <tr><th>Batch</th><th>Status</th><th>Artisan</th></tr>
              </thead>
              <tbody>
                {(recentBatches || []).map((batch: any, i: number) => {
                  const artisan = batch.artisans as any;
                  const statusMap: Record<string, { label: string; cls: string }> = {
                    certified: { label: 'Certified', cls: 'certified' },
                    field_verified: { label: 'Verified', cls: 'available' },
                    submitted: { label: 'Submitted', cls: 'allocated' },
                    draft: { label: 'Draft', cls: 'draft' },
                  };
                  const st = statusMap[batch.status] || { label: batch.status, cls: 'draft' };
                  return (
                    <tr key={i} className="clickable">
                      <td>
                        <div className="tname">{batch.textile_name || batch.batch_id_code}</div>
                        <div className="tsub mono">{batch.batch_id_code}</div>
                      </td>
                      <td><span className={`pill ${st.cls}`}><span className="d" />{st.label}</span></td>
                      <td style={{ color: 'var(--muted)', fontSize: 13 }}>{artisan?.full_name || '—'}</td>
                    </tr>
                  );
                })}
                {(!recentBatches || recentBatches.length === 0) && (
                  <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--muted-soft)', padding: 32 }}>No batches yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regulatory readiness */}
        <div className="panel">
          <div className="panel-h"><h2>Regulatory readiness</h2></div>
          <div className="panel-b">
            {[
              { label: 'EU Green Claims (ECGT)', status: 'Ready', date: 'Effective Sep 2026', color: 'var(--green)', bg: 'var(--green-soft)' },
              { label: 'Digital Product Passport', status: 'In Progress', date: 'Expected 2027', color: 'var(--amber)', bg: 'var(--amber-soft)' },
              { label: 'CSDDD Due Diligence', status: 'Pending', date: 'From 2027', color: 'var(--amber)', bg: 'var(--amber-soft)' },
              { label: 'UK Green Claims Code', status: 'Ready', date: 'Active now', color: 'var(--green)', bg: 'var(--green-soft)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{item.date}</div>
                </div>
                <span className="badge" style={{ background: item.bg, color: item.color }}>{item.status}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <Link href="/dashboard/compliance" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}>View compliance centre →</Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="panel" style={{ marginTop: 24 }}>
        <div className="panel-h"><h2>Quick actions</h2></div>
        <div className="panel-b" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, paddingTop: 12 }}>
          {[
            { label: 'New Batch', href: '/dashboard/batches/new', icon: '➕' },
            { label: 'Add SKU', href: '/dashboard/skus/new', icon: '🏷️' },
            { label: 'Generate QR', href: '/dashboard/qr-codes', icon: '📱' },
            { label: 'View Passport', href: certifiedBatch ? `/passport/${certifiedBatch.provenance_page_slug || certifiedBatch.id}` : '/dashboard/qr-codes', icon: '🔍' },
          ].map(a => (
            <Link key={a.label} href={a.href}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '16px 12px', borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-2)', border: '1px solid var(--line)',
                fontSize: 13, fontWeight: 600, color: 'var(--ink)',
                transition: 'all .12s', textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 24 }}>{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
