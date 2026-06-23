'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Batch {
  id: string
  batch_id_code: string
  textile_name: string
  status: string
  provenance_page_slug: string | null
}

export default function QRCodesPage() {
  const [batches, setBatches] = useState<Batch[]>([])
  const [selectedBatch, setSelectedBatch] = useState<string>('')
  const [qrUrl, setQrUrl] = useState('')
  const [passportUrl, setPassportUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const appUrl = typeof window !== 'undefined' ? window.location.origin : ''

  useEffect(() => {
    async function loadBatches() {
      const supabase = createClient()
      const { data } = await supabase
        .from('batches')
        .select('id, batch_id_code, textile_name, status, provenance_page_slug')
        .in('status', ['certified', 'field_verified'])
        .order('certified_at', { ascending: false })
      setBatches(data || [])
      setLoading(false)
    }
    loadBatches()
  }, [])

  const generateQR = (batchId: string) => {
    const batch = batches.find(b => b.id === batchId)
    if (!batch) return
    const slug = batch.provenance_page_slug || batch.id
    const url = `${appUrl}/passport/${slug}`
    setPassportUrl(url)
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}&margin=12&color=243b6b`)
    setSelectedBatch(batchId)
  }

  const certifiedBatches = batches.filter(b => b.status === 'certified')
  const pendingBatches = batches.filter(b => b.status === 'field_verified')

  return (
    <div>
      <div className="page-head">
        <div className="ey">Outputs</div>
        <h1>Provenance pages &amp; QR codes</h1>
        <p>Generate scannable QR codes that link to a product&apos;s public provenance passport. Print on labels, swing tags, or packaging.</p>
      </div>

      <div className="hint-inline">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <div>Only <b>certified batches</b> can generate QR codes. Each QR links to a consumer-facing provenance page showing the artisan, origin, and compliance credentials.</div>
      </div>

      <div className="two">
        {/* Batch list */}
        <div className="panel">
          <div className="panel-h">
            <h2>Certified batches ({certifiedBatches.length})</h2>
          </div>
          <div className="panel-b" style={{ paddingTop: 6 }}>
            {loading ? (
              <div style={{ textAlign: 'center', color: 'var(--muted-soft)', padding: 32 }}>Loading batches…</div>
            ) : certifiedBatches.length === 0 ? (
              <div className="empty">
                <p>No certified batches yet. Certify a batch to generate QR codes.</p>
              </div>
            ) : (
              <table>
                <thead><tr><th>Product</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {certifiedBatches.map(batch => (
                    <tr key={batch.id} className="clickable" onClick={() => generateQR(batch.id)}
                      style={selectedBatch === batch.id ? { background: 'var(--blue-soft)' } : {}}>
                      <td>
                        <div className="tname">{batch.textile_name}</div>
                        <div className="tsub mono">{batch.batch_id_code}</div>
                      </td>
                      <td><span className="pill certified"><span className="d" />Certified</span></td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); generateQR(batch.id); }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h.01M21 21v-3h-3"/></svg>
                          QR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {pendingBatches.length > 0 && (
            <div style={{ borderTop: '1px solid var(--line)', padding: '12px 18px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: 1.6, textTransform: 'uppercase' as const, color: 'var(--amber)', fontWeight: 600, marginBottom: 8 }}>
                Awaiting certification ({pendingBatches.length})
              </div>
              {pendingBatches.map(batch => (
                <div key={batch.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', opacity: 0.6 }}>
                  <div>
                    <div className="tname" style={{ fontSize: 13 }}>{batch.textile_name}</div>
                    <div className="tsub mono">{batch.batch_id_code}</div>
                  </div>
                  <span className="pill allocated"><span className="d" />Pending</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QR Display */}
        <div>
          {qrUrl ? (
            <div className="panel" style={{ position: 'sticky', top: 88 }}>
              <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--line)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase' as const, color: 'var(--zari)', fontWeight: 600 }}>
                  Consumer QR code
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, marginTop: 3 }}>
                  {batches.find(b => b.id === selectedBatch)?.textile_name}
                </div>
              </div>

              <div style={{ padding: 24, textAlign: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrUrl} alt="QR Code"
                  style={{ width: 188, height: 188, margin: '0 auto 16px', background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: 14 }} />

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--indigo)', background: 'var(--blue-soft)', border: '1px solid #d8e1f3', borderRadius: 9, padding: '9px 12px', wordBreak: 'break-all' as const, marginBottom: 6 }}>
                  {passportUrl}
                </div>
              </div>

              <div style={{ padding: '8px 24px 22px', display: 'flex', gap: 10 }}>
                <a href={qrUrl} download={`weft-qr-${batches.find(b => b.id === selectedBatch)?.batch_id_code}.png`}
                  className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Download
                </a>
                <button onClick={() => navigator.clipboard.writeText(passportUrl)}
                  className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                  Copy link
                </button>
              </div>

              <div style={{ padding: '0 24px 22px' }}>
                <a href={passportUrl} target="_blank" rel="noopener noreferrer"
                  className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  Preview provenance page →
                </a>
              </div>
            </div>
          ) : (
            <div className="panel" style={{ padding: 40, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 50, background: 'radial-gradient(circle at 50% 35%, #2c4884, #1b2e58)', display: 'grid', placeItems: 'center', margin: '0 auto 18px', boxShadow: '0 10px 26px rgba(27,46,88,.34)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--zari-bright)" strokeWidth="1.7"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h.01M21 21v-3h-3"/></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, margin: '0 0 8px' }}>Select a batch to generate QR</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, maxWidth: 280, margin: '0 auto' }}>
                Choose a certified batch from the list. The QR code links to the product&apos;s public provenance passport.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
