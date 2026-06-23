import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const FRAMEWORKS: Record<string, { name: string; statement: string }> = {
  ECGT: {
    name: 'EU Empowering Consumers for the Green Transition (ECGT)',
    statement: 'Each certified batch below carries a substantiated, independently verified provenance record covering artisan identity, production location and technique — evidence supporting environmental and origin claims under the ECGT Directive.',
  },
  DPP: {
    name: 'EU Digital Product Passport (ESPR)',
    statement: 'The records below are structured as machine-readable product passports (artisan, origin, technique, certification) and are exposed via per-batch QR passports, aligning with Digital Product Passport requirements under the Ecodesign for Sustainable Products Regulation.',
  },
  CSDDD: {
    name: 'Corporate Sustainability Due Diligence Directive (CSDDD)',
    statement: 'Each batch traces to a named, verified artisan within a known production cluster, providing supply-chain visibility to the point of making in support of human-rights and environmental due-diligence obligations.',
  },
  UK_GREEN: {
    name: 'UK Green Claims Code (CMA)',
    statement: 'The provenance evidence below substantiates origin and craft claims with verifiable, batch-level records, consistent with the CMA Green Claims Code requirement that claims be truthful, accurate and substantiated.',
  },
}

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', request.url))

  const key = (new URL(request.url).searchParams.get('framework') || 'ECGT').toUpperCase()
  const fw = FRAMEWORKS[key] ?? FRAMEWORKS.ECGT

  const { data: brand } = await supabase
    .from('brands')
    .select('id, brand_name, country, city, website')
    .eq('profile_id', user.id)
    .maybeSingle()

  let q = supabase
    .from('batches')
    .select('id, batch_id_code, textile_name, technique, fibre_content, colour_palette, certified_at, artisans!artisan_id(full_name, artisan_id_code, village, district, state, clusters(name, region))')
    .eq('status', 'certified')
    .order('certified_at', { ascending: false })
  if (brand?.id) q = q.eq('brand_id', brand.id)
  const { data: batches } = await q

  const origin = new URL(request.url).origin
  const generated = new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })
  const orgLine = brand
    ? `${esc(brand.brand_name)}${brand.city ? ' · ' + esc(brand.city) : ''}${brand.country ? ', ' + esc(brand.country) : ''}`
    : 'All certified batches (administrator export)'

  const rows = (batches ?? []).map((b: any) => {
    const a = b.artisans
    const cluster = a?.clusters
    return `<tr>
      <td class="mono">${esc(b.batch_id_code)}</td>
      <td>${esc(b.textile_name)}<div class="sub">${esc((b.technique || '').replace(/_/g, ' '))}${b.fibre_content ? ' · ' + esc(b.fibre_content) : ''}</div></td>
      <td>${esc(a?.full_name) || '—'}<div class="sub mono">${esc(a?.artisan_id_code) || ''}</div></td>
      <td>${esc([a?.village, a?.district, a?.state].filter(Boolean).join(', ')) || '—'}<div class="sub">${esc(cluster?.name) || ''}</div></td>
      <td>${b.certified_at ? esc(new Date(b.certified_at).toLocaleDateString('en-GB')) : '—'}</td>
      <td class="mono"><a href="${origin}/passport/${esc(b.id)}">${origin}/passport/${esc(b.id)}</a></td>
    </tr>`
  }).join('')

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Weft Passport — ${esc(fw.name)} Report</title>
<style>
  :root { --indigo:#1B1464; --zari:#F4A300; --ink:#1A1A2E; --muted:#6B7280; --line:#E5E0D8; }
  * { box-sizing:border-box; }
  body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:var(--ink); margin:0; padding:40px; background:#fff; }
  .head { border-bottom:3px solid var(--indigo); padding-bottom:18px; margin-bottom:24px; display:flex; justify-content:space-between; align-items:flex-start; gap:24px; }
  .brandmark { font-weight:800; color:var(--indigo); font-size:13px; letter-spacing:.14em; text-transform:uppercase; }
  h1 { font-size:22px; color:var(--indigo); margin:6px 0 2px; }
  .meta { color:var(--muted); font-size:12.5px; }
  .statement { background:#F7F5FF; border:1px solid #E3DEF8; border-radius:10px; padding:14px 16px; font-size:13.5px; line-height:1.55; margin-bottom:22px; }
  table { width:100%; border-collapse:collapse; font-size:12px; }
  th { text-align:left; background:#FAF7F2; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; font-size:10.5px; padding:9px 10px; border-bottom:1px solid var(--line); }
  td { padding:10px; border-bottom:1px solid #F3EFE8; vertical-align:top; }
  .sub { color:var(--muted); font-size:10.5px; margin-top:2px; }
  .mono { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:11px; }
  .mono a { color:var(--indigo); text-decoration:none; }
  .empty { text-align:center; color:var(--muted); padding:40px; border:1px dashed var(--line); border-radius:10px; }
  .foot { margin-top:28px; padding-top:16px; border-top:1px solid var(--line); color:var(--muted); font-size:11px; }
  .toolbar { margin-bottom:20px; }
  .btn { background:var(--indigo); color:#fff; border:none; border-radius:8px; padding:9px 16px; font-size:13px; font-weight:600; cursor:pointer; }
  @media print { .toolbar { display:none; } body { padding:0; } }
</style></head>
<body>
  <div class="toolbar"><button class="btn" onclick="window.print()">⤓ Save as PDF / Print</button></div>
  <div class="head">
    <div>
      <div class="brandmark">Weft Passport · Compliance Evidence Pack</div>
      <h1>${esc(fw.name)}</h1>
      <div class="meta">${orgLine}</div>
    </div>
    <div class="meta" style="text-align:right">Generated ${esc(generated)}<br/>${(batches ?? []).length} certified batch(es)</div>
  </div>
  <div class="statement">${esc(fw.statement)}</div>
  ${(batches ?? []).length === 0
    ? `<div class="empty">No certified batches yet. Certify a batch to generate compliance evidence.</div>`
    : `<table><thead><tr><th>Batch</th><th>Textile</th><th>Artisan</th><th>Origin</th><th>Certified</th><th>Public Passport</th></tr></thead><tbody>${rows}</tbody></table>`}
  <div class="foot">
    This document was generated by Weft Passport from independently verified provenance records. Each public passport URL resolves to a live, scannable
    certificate. Verified by Weft Passport · Silk and Soil Ltd, Sheffield, UK.
  </div>
</body></html>`

  return new NextResponse(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
