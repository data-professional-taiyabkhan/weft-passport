// Seed complete demo data for a client-ready demo
// Run: node src/scripts/seed-demo-data.mjs

const SUPABASE_URL = 'https://psjuehgawhpynvfftibu.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzanVlaGdhd2hweW52ZmZ0aWJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjA0NTU3MSwiZXhwIjoyMDk3NjIxNTcxfQ.m-sXfdTig3lSOZ179QN576K3Oknr3-uUn73I9888Lf4';
const h = { 'Content-Type':'application/json', 'Authorization':`Bearer ${SERVICE_KEY}`, 'apikey':SERVICE_KEY, 'Prefer':'return=representation' };

async function post(table, data) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method:'POST', headers:{...h,'Prefer':'return=representation,resolution=merge-duplicates'}, body:JSON.stringify(data) });
  const t = await r.text(); try { return JSON.parse(t); } catch { console.error(`  ${table} error:`,t); return null; }
}
async function get(table, q='') {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${q}`, { headers:h });
  return r.json();
}
async function patch(table, id, data) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method:'PATCH', headers:h, body:JSON.stringify(data) });
}
async function del(table, q) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?${q}`, { method:'DELETE', headers:h });
}

async function main() {
  console.log('=== Seeding Demo Data ===\n');

  // Clean old test data
  console.log('Cleaning old demo data...');
  await del('skus', 'sku_code=like.SS-*');
  await del('batches', 'batch_id_code=like.WP-BTH-2025-*');
  await del('looms', 'loom_id_code=like.WP-LM-*');
  await del('artisans', 'artisan_id_code=like.WP-ART-*');
  console.log('  Cleaned\n');

  // Brand
  const brands = await get('brands', 'brand_slug=eq.silk-and-soil&select=id');
  if (!brands?.length) { console.error('No brand! Run create-test-users.mjs first'); return; }
  const brandId = brands[0].id;
  console.log(`Brand ID: ${brandId}`);

  // Clusters
  const clusters = await get('clusters', 'select=id,name');
  const cVaranasi = clusters.find(c=>c.name.includes('Varanasi'))?.id;
  const cMurshidabad = clusters.find(c=>c.name.includes('Murshidabad'))?.id;
  const cChanderi = clusters.find(c=>c.name.includes('Chanderi'))?.id;
  console.log(`Clusters: ${clusters.length}\n`);

  // Artisans
  console.log('Creating artisans...');
  const artisanData = [
    { artisan_id_code:'WP-ART-0001', full_name:'Ravi Kumar Vishwakarma', display_name:'Ravi Kumar', gender:'Male', village:'Sarai Mohana', district:'Varanasi', state:'Uttar Pradesh', country:'India', lat:25.3176, lng:82.9739, bio:'Third-generation Banarasi silk weaver specialising in traditional Jangla and Tanchoi patterns. Learned from his father at 12, weaving for 25+ years.', specialisation:'{banarasi_silk,jamdani}', years_experience:25, verification_status:'verified', verified_at:new Date().toISOString(), cooperative_member:true, cooperative_name:'Varanasi Handloom Weavers Cooperative', cluster_id:cVaranasi, total_batches:3, active:true },
    { artisan_id_code:'WP-ART-0002', full_name:'Amina Begum', display_name:'Amina', gender:'Female', village:'Lallapura', district:'Varanasi', state:'Uttar Pradesh', country:'India', lat:25.321, lng:82.978, bio:'Master embroiderer and silk weaver known for intricate Zari work. Leads a women\'s collective of 12 artisans, teaching young women traditional techniques.', specialisation:'{banarasi_silk,embroidery}', years_experience:18, verification_status:'verified', verified_at:new Date().toISOString(), cooperative_member:true, cooperative_name:'Lallapura Women Weavers Collective', cluster_id:cVaranasi, total_batches:2, active:true },
    { artisan_id_code:'WP-ART-0003', full_name:'Mohammad Ansari', display_name:'Mohammad', gender:'Male', village:'Jiaganj', district:'Murshidabad', state:'West Bengal', country:'India', lat:24.22, lng:88.29, bio:'Jamdani weaver from a family of weavers. Delicate muslin work exhibited at national craft fairs.', specialisation:'{jamdani,kantha}', years_experience:20, verification_status:'verified', verified_at:new Date().toISOString(), cooperative_member:true, cooperative_name:'Murshidabad Handloom Society', cluster_id:cMurshidabad, total_batches:1, active:true },
    { artisan_id_code:'WP-ART-0004', full_name:'Sunita Rajput', display_name:'Sunita', gender:'Female', village:'Chanderi', district:'Ashok Nagar', state:'Madhya Pradesh', country:'India', lat:24.715, lng:78.14, bio:'Specialist in Chanderi silk-cotton weaving. Known for lightweight saris with gold and silver Zari borders. Family craft for four generations.', specialisation:'{chanderi,block_print}', years_experience:15, verification_status:'verified', verified_at:new Date().toISOString(), cooperative_member:false, cluster_id:cChanderi, total_batches:1, active:true },
  ];
  const artisans = [];
  for (const a of artisanData) {
    const r = await post('artisans', a);
    if (r?.[0]) { artisans.push(r[0]); console.log(`  ✓ ${a.full_name} (${a.artisan_id_code})`); }
    else { console.error(`  ✗ ${a.artisan_id_code} failed`); return; }
  }

  // Looms
  console.log('\nCreating looms...');
  const loomData = [
    { loom_id_code:'WP-LM-0001', artisan_id:artisans[0].id, loom_type:'pit_loom', width_cm:120, age_years:45, owned_or_leased:'owned', cooperative_registered:true, verified:true, active:true },
    { loom_id_code:'WP-LM-0002', artisan_id:artisans[0].id, loom_type:'jacquard', width_cm:140, age_years:12, owned_or_leased:'owned', cooperative_registered:true, verified:true, active:true },
    { loom_id_code:'WP-LM-0003', artisan_id:artisans[1].id, loom_type:'frame_loom', width_cm:110, age_years:20, owned_or_leased:'owned', cooperative_registered:true, verified:true, active:true },
    { loom_id_code:'WP-LM-0004', artisan_id:artisans[2].id, loom_type:'pit_loom', width_cm:100, age_years:35, owned_or_leased:'owned', cooperative_registered:true, verified:true, active:true },
    { loom_id_code:'WP-LM-0005', artisan_id:artisans[3].id, loom_type:'frame_loom', width_cm:115, age_years:28, owned_or_leased:'owned', verified:true, active:true },
  ];
  const looms = [];
  for (const l of loomData) {
    const r = await post('looms', l);
    if (r?.[0]) { looms.push(r[0]); console.log(`  ✓ ${l.loom_id_code} (${l.loom_type})`); }
    else { console.error(`  ✗ ${l.loom_id_code} failed`); return; }
  }

  // Batches
  console.log('\nCreating batches...');
  const batchData = [
    { batch_id_code:'WP-BTH-2025-0001', brand_id:brandId, artisan_id:artisans[0].id, loom_id:looms[0].id, cluster_id:cVaranasi, textile_name:'Royal Jangla Silk Sari', technique:'banarasi_silk', fibre_content:'100% Mulberry Silk with 24K Gold Zari', colour_palette:'Deep Crimson & Gold', thread_count:120, dimensions_cm:'600 x 115', quantity_pieces:1, production_start:'2025-01-15', production_end:'2025-03-20', production_location:'Sarai Mohana, Varanasi', production_lat:25.3176, production_lng:82.9739, status:'certified', verification_status:'verified', field_verified_at:'2025-03-22T10:00:00Z', certified_at:'2025-03-25T14:00:00Z', field_notes:'Verified on-site at artisan household. Traditional pit loom confirmed. Zari authenticated as real gold-wrapped thread.', provenance_page_slug:'royal-jangla-silk', compliance_frameworks:'{eu_ecgt,uk_green_claims}', consumer_views:47, qr_scans:23 },
    { batch_id_code:'WP-BTH-2025-0002', brand_id:brandId, artisan_id:artisans[1].id, loom_id:looms[2].id, cluster_id:cVaranasi, textile_name:'Tanchoi Brocade Dupatta', technique:'banarasi_silk', fibre_content:'Silk with Silver Zari Thread', colour_palette:'Ivory & Silver', thread_count:100, dimensions_cm:'250 x 90', quantity_pieces:3, production_start:'2025-02-01', production_end:'2025-04-10', production_location:'Lallapura, Varanasi', production_lat:25.321, production_lng:82.978, status:'certified', verification_status:'verified', field_verified_at:'2025-04-12T09:00:00Z', certified_at:'2025-04-15T11:00:00Z', field_notes:'Verified at Women Weavers Collective. Frame loom excellent. Tanchoi pattern authentic.', provenance_page_slug:'tanchoi-brocade-dupatta', compliance_frameworks:'{eu_ecgt,eu_csddd,uk_green_claims}', consumer_views:32, qr_scans:18 },
    { batch_id_code:'WP-BTH-2025-0003', brand_id:brandId, artisan_id:artisans[2].id, loom_id:looms[3].id, cluster_id:cMurshidabad, textile_name:'Heritage Jamdani Muslin', technique:'jamdani', fibre_content:'100% Fine Cotton Muslin', colour_palette:'Natural White & Indigo', thread_count:300, dimensions_cm:'500 x 120', quantity_pieces:2, production_start:'2025-03-01', production_end:'2025-05-15', production_location:'Jiaganj, Murshidabad', production_lat:24.22, production_lng:88.29, status:'certified', verification_status:'verified', field_verified_at:'2025-05-18T10:00:00Z', certified_at:'2025-05-20T16:00:00Z', field_notes:'Extremely fine muslin verified. Extra weft technique confirms authentic Jamdani.', provenance_page_slug:'heritage-jamdani-muslin', compliance_frameworks:'{eu_ecgt,eu_dpp,uk_green_claims}', consumer_views:56, qr_scans:34 },
    { batch_id_code:'WP-BTH-2025-0004', brand_id:brandId, artisan_id:artisans[3].id, loom_id:looms[4].id, cluster_id:cChanderi, textile_name:'Chanderi Silk-Cotton Stole', technique:'chanderi', fibre_content:'Silk-Cotton Blend with Zari Border', colour_palette:'Peacock Blue & Gold', thread_count:80, dimensions_cm:'200 x 70', quantity_pieces:5, production_start:'2025-04-01', production_end:'2025-05-28', production_location:'Chanderi, Ashok Nagar', production_lat:24.715, production_lng:78.14, status:'certified', verification_status:'verified', field_verified_at:'2025-06-01T10:00:00Z', certified_at:'2025-06-05T14:00:00Z', field_notes:'Chanderi weave verified. Traditional gold Zari border pattern.', provenance_page_slug:'chanderi-silk-cotton-stole', compliance_frameworks:'{eu_ecgt,uk_green_claims}', consumer_views:19, qr_scans:12 },
    { batch_id_code:'WP-BTH-2025-0005', brand_id:brandId, artisan_id:artisans[0].id, loom_id:looms[1].id, cluster_id:cVaranasi, textile_name:'Kadhua Sari with Butidar', technique:'banarasi_silk', fibre_content:'100% Pure Silk with Real Zari', colour_palette:'Emerald Green & Antique Gold', quantity_pieces:1, production_start:'2025-05-01', production_end:'2025-06-18', production_location:'Sarai Mohana, Varanasi', status:'field_verified', verification_status:'verified', field_verified_at:'2025-06-20T10:00:00Z', field_notes:'Kadhua technique confirmed. Jacquard loom. Awaiting certification.', compliance_frameworks:'{eu_ecgt,eu_csddd}' },
    { batch_id_code:'WP-BTH-2025-0006', brand_id:brandId, artisan_id:artisans[1].id, loom_id:looms[2].id, cluster_id:cVaranasi, textile_name:'Cutwork Organza Dupatta', technique:'embroidery', fibre_content:'Silk Organza', colour_palette:'Blush Pink', quantity_pieces:2, production_start:'2025-06-01', production_location:'Lallapura, Varanasi', status:'submitted', verification_status:'pending', field_notes:'Submitted for field verification.' },
  ];
  const batches = [];
  for (const b of batchData) {
    const r = await post('batches', b);
    if (r?.[0]) { batches.push(r[0]); console.log(`  ✓ ${b.batch_id_code} — ${b.textile_name} [${b.status}]`); }
    else { console.error(`  ✗ ${b.batch_id_code} failed`); return; }
  }

  // SKUs
  console.log('\nCreating SKUs...');
  const skuData = [
    { sku_code:'SS-SAR-001', brand_id:brandId, batch_id:batches[0].id, product_name:'Royal Jangla Silk Sari', product_category:'Saris', price_gbp:1850, active:true },
    { sku_code:'SS-DUP-001', brand_id:brandId, batch_id:batches[1].id, product_name:'Tanchoi Brocade Dupatta', product_category:'Dupattas', price_gbp:425, active:true },
    { sku_code:'SS-DUP-002', brand_id:brandId, batch_id:batches[1].id, product_name:'Tanchoi Silver Dupatta (Limited)', product_category:'Dupattas', price_gbp:495, active:true },
    { sku_code:'SS-SAR-002', brand_id:brandId, batch_id:batches[2].id, product_name:'Heritage Jamdani Muslin Sari', product_category:'Saris', price_gbp:1200, active:true },
    { sku_code:'SS-STL-001', brand_id:brandId, batch_id:batches[3].id, product_name:'Chanderi Silk-Cotton Stole', product_category:'Stoles', price_gbp:285, active:true },
    { sku_code:'SS-STL-002', brand_id:brandId, batch_id:batches[3].id, product_name:'Chanderi Peacock Stole (Gift)', product_category:'Stoles', price_gbp:310, active:true },
  ];
  for (const s of skuData) {
    const r = await post('skus', s);
    if (r?.[0]) console.log(`  ✓ ${s.sku_code} — ${s.product_name}`);
    else console.error(`  ✗ ${s.sku_code}`);
  }

  // Update brand
  await patch('brands', brandId, { total_batches_certified:4, total_skus_active:6, compliance_score:87.5 });
  console.log('\n  Updated brand stats');

  console.log('\n=== DONE! ===\n');
  console.log('Scannable passport URLs (certified batches):');
  for (const b of batches.filter(b=>b.status==='certified')) {
    console.log(`  ${b.textile_name}`);
    console.log(`    → http://localhost:3000/passport/${b.id}`);
    if (b.provenance_page_slug) console.log(`    → http://localhost:3000/passport/${b.provenance_page_slug}`);
  }
  console.log('\nQR Code page: http://localhost:3000/dashboard/qr-codes');
  console.log('Enter any batch ID (e.g. WP-BTH-2025-0001) or UUID to generate a scannable QR\n');
}

main().catch(console.error);
