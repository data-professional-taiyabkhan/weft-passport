-- ============================================================
-- WEFT PASSPORT — Complete Database Schema
-- Supabase PostgreSQL
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";  -- for geo-tagged locations

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('admin', 'brand', 'coordinator', 'consumer');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected', 'under_review');
CREATE TYPE batch_status AS ENUM ('draft', 'submitted', 'field_verified', 'certified', 'rejected');
CREATE TYPE subscription_tier AS ENUM ('trial', 'standard', 'premium', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled', 'trial');
CREATE TYPE loom_type AS ENUM ('pit_loom', 'frame_loom', 'jacquard', 'dobby', 'fly_shuttle', 'handloom_other');
CREATE TYPE textile_technique AS ENUM ('banarasi_silk', 'kantha', 'ikat', 'block_print', 'embroidery', 'jamdani', 'chanderi', 'other');
CREATE TYPE compliance_framework AS ENUM ('eu_ecgt', 'eu_csddd', 'eu_dpp', 'uk_green_claims', 'gots', 'fair_trade');
CREATE TYPE document_type AS ENUM ('compliance_report', 'artisan_certificate', 'batch_certificate', 'audit_trail', 'qr_summary');

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================

CREATE TABLE public.profiles (
  id              UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email           TEXT NOT NULL,
  full_name       TEXT,
  role            user_role NOT NULL DEFAULT 'brand',
  avatar_url      TEXT,
  phone           TEXT,
  timezone        TEXT DEFAULT 'Europe/London',
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BRANDS (Fashion Brand Clients)
-- ============================================================

CREATE TABLE public.brands (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  brand_name        TEXT NOT NULL,
  brand_slug        TEXT UNIQUE NOT NULL,
  logo_url          TEXT,
  website           TEXT,
  description       TEXT,
  country           TEXT DEFAULT 'United Kingdom',
  city              TEXT,
  annual_revenue    TEXT, -- range bracket e.g. '500k-1m'
  subscription_tier subscription_tier DEFAULT 'trial',
  subscription_status subscription_status DEFAULT 'trial',
  subscription_starts_at TIMESTAMPTZ,
  subscription_ends_at   TIMESTAMPTZ,
  trial_ends_at     TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '60 days'),
  onboarding_fee_paid BOOLEAN DEFAULT FALSE,
  total_batches_certified INTEGER DEFAULT 0,
  total_skus_active       INTEGER DEFAULT 0,
  compliance_score        NUMERIC(5,2) DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CLUSTERS (Weaving Regions / Cooperatives)
-- ============================================================

CREATE TABLE public.clusters (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,  -- e.g. 'Varanasi Cluster'
  region      TEXT NOT NULL,  -- e.g. 'Varanasi, Uttar Pradesh'
  country     TEXT DEFAULT 'India',
  lat         NUMERIC(10,7),
  lng         NUMERIC(10,7),
  description TEXT,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COORDINATORS (Field agents embedded in clusters)
-- ============================================================

CREATE TABLE public.coordinators (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id  UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cluster_id  UUID REFERENCES public.clusters(id),
  full_name   TEXT NOT NULL,
  phone       TEXT,
  language    TEXT DEFAULT 'Hindi',
  verified    BOOLEAN DEFAULT FALSE,
  active      BOOLEAN DEFAULT TRUE,
  batches_verified INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ARTISANS (Master Weavers)
-- ============================================================

CREATE TABLE public.artisans (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artisan_id_code   TEXT UNIQUE NOT NULL,  -- e.g. VNS-2024-0042
  cluster_id        UUID REFERENCES public.clusters(id),
  coordinator_id    UUID REFERENCES public.coordinators(id),
  full_name         TEXT NOT NULL,
  display_name      TEXT,  -- name shown on consumer pages
  gender            TEXT,
  age_bracket       TEXT,  -- '25-35', '35-45' etc
  phone             TEXT,
  village           TEXT,
  district          TEXT,
  state             TEXT DEFAULT 'Uttar Pradesh',
  country           TEXT DEFAULT 'India',
  lat               NUMERIC(10,7),
  lng               NUMERIC(10,7),
  bio               TEXT,  -- artisan story shown to consumers
  specialisation    TEXT[],  -- array of techniques
  years_experience  INTEGER,
  photo_url         TEXT,
  verification_status verification_status DEFAULT 'pending',
  verified_at       TIMESTAMPTZ,
  verified_by       UUID REFERENCES public.coordinators(id),
  cooperative_member BOOLEAN DEFAULT FALSE,
  cooperative_name  TEXT,
  total_batches     INTEGER DEFAULT 0,
  active            BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LOOMS
-- ============================================================

CREATE TABLE public.looms (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  loom_id_code    TEXT UNIQUE NOT NULL,  -- e.g. LM-VNS-0088
  artisan_id      UUID REFERENCES public.artisans(id) ON DELETE CASCADE,
  loom_type       loom_type NOT NULL,
  width_cm        NUMERIC(6,2),
  age_years       INTEGER,
  owned_or_leased TEXT DEFAULT 'owned',
  cooperative_registered BOOLEAN DEFAULT FALSE,
  photo_url       TEXT,
  verified        BOOLEAN DEFAULT FALSE,
  active          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TEXTILE BATCHES (Core certified unit)
-- ============================================================

CREATE TABLE public.batches (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  batch_id_code     TEXT UNIQUE NOT NULL,  -- e.g. WP-2024-VNS-0042
  brand_id          UUID REFERENCES public.brands(id),
  artisan_id        UUID REFERENCES public.artisans(id),
  loom_id           UUID REFERENCES public.looms(id),
  coordinator_id    UUID REFERENCES public.coordinators(id),
  cluster_id        UUID REFERENCES public.clusters(id),

  -- Textile details
  textile_name      TEXT NOT NULL,
  technique         textile_technique NOT NULL,
  fibre_content     TEXT,  -- e.g. '100% pure silk'
  colour_palette    TEXT,
  thread_count      INTEGER,
  dimensions_cm     TEXT,  -- e.g. '250cm x 115cm'
  weight_grams      NUMERIC(8,2),
  quantity_pieces   INTEGER DEFAULT 1,

  -- Production data
  production_start  DATE,
  production_end    DATE,
  production_location TEXT,
  production_lat    NUMERIC(10,7),
  production_lng    NUMERIC(10,7),

  -- Verification
  status            batch_status DEFAULT 'draft',
  verification_status verification_status DEFAULT 'pending',
  field_verified_at TIMESTAMPTZ,
  certified_at      TIMESTAMPTZ,
  certified_by      UUID REFERENCES public.profiles(id),
  rejection_reason  TEXT,

  -- Evidence
  photos            TEXT[],  -- array of storage URLs
  video_url         TEXT,
  field_notes       TEXT,

  -- QR & Consumer
  qr_code_url       TEXT,
  provenance_page_slug TEXT UNIQUE,  -- /p/{slug}
  consumer_views    INTEGER DEFAULT 0,
  qr_scans          INTEGER DEFAULT 0,

  -- Compliance
  compliance_frameworks compliance_framework[],
  regulatory_notes  TEXT,

  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKUs (Brand products linked to batches)
-- ============================================================

CREATE TABLE public.skus (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sku_code        TEXT NOT NULL,
  brand_id        UUID REFERENCES public.brands(id) ON DELETE CASCADE,
  batch_id        UUID REFERENCES public.batches(id),
  product_name    TEXT NOT NULL,
  product_category TEXT,
  product_description TEXT,
  price_gbp       NUMERIC(10,2),
  retail_url      TEXT,
  active          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(sku_code, brand_id)
);

-- ============================================================
-- PROVENANCE PAGES (Consumer-facing QR destination)
-- ============================================================

CREATE TABLE public.provenance_pages (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,  -- short URL slug
  batch_id        UUID REFERENCES public.batches(id) ON DELETE CASCADE,
  sku_id          UUID REFERENCES public.skus(id),
  brand_id        UUID REFERENCES public.brands(id),

  -- Display content
  headline        TEXT,  -- e.g. "Your Banarasi Silk was woven by Ravi Kumar"
  artisan_story   TEXT,
  production_story TEXT,
  cultural_context TEXT,

  -- Certification badge
  certified       BOOLEAN DEFAULT FALSE,
  certification_date TIMESTAMPTZ,
  compliance_badge  TEXT[],  -- ['EU-ECGT', 'UK-GCC']

  -- Analytics
  total_views     INTEGER DEFAULT 0,
  unique_views    INTEGER DEFAULT 0,
  last_viewed_at  TIMESTAMPTZ,

  published       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMPLIANCE DOCUMENTS
-- ============================================================

CREATE TABLE public.compliance_documents (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id        UUID REFERENCES public.brands(id) ON DELETE CASCADE,
  batch_id        UUID REFERENCES public.batches(id),
  document_type   document_type NOT NULL,
  framework       compliance_framework,
  title           TEXT NOT NULL,
  file_url        TEXT,
  generated_at    TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ,
  version         INTEGER DEFAULT 1,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================

CREATE TABLE public.audit_logs (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  actor_id    UUID REFERENCES public.profiles(id),
  actor_role  user_role,
  action      TEXT NOT NULL,
  resource    TEXT,
  resource_id UUID,
  details     JSONB,
  ip_address  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS EVENTS
-- ============================================================

CREATE TABLE public.analytics_events (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id    UUID REFERENCES public.brands(id),
  batch_id    UUID REFERENCES public.batches(id),
  page_slug   TEXT,
  event_type  TEXT NOT NULL,  -- 'qr_scan', 'page_view', 'share', 'download'
  country     TEXT,
  device      TEXT,
  referrer    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES for performance
-- ============================================================

CREATE INDEX idx_batches_brand_id         ON public.batches(brand_id);
CREATE INDEX idx_batches_artisan_id       ON public.batches(artisan_id);
CREATE INDEX idx_batches_status           ON public.batches(status);
CREATE INDEX idx_batches_provenance_slug  ON public.batches(provenance_page_slug);
CREATE INDEX idx_artisans_cluster         ON public.artisans(cluster_id);
CREATE INDEX idx_skus_brand_id            ON public.skus(brand_id);
CREATE INDEX idx_skus_batch_id            ON public.skus(batch_id);
CREATE INDEX idx_provenance_slug          ON public.provenance_pages(slug);
CREATE INDEX idx_analytics_brand_id       ON public.analytics_events(brand_id);
CREATE INDEX idx_analytics_created_at     ON public.analytics_events(created_at);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisans           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.looms              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skus               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provenance_pages   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coordinators       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clusters           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events   ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update own profile; admins see all
CREATE POLICY "profiles_own" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Brands: brand user sees own brand; admin sees all
CREATE POLICY "brands_own" ON public.brands
  FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "brands_admin" ON public.brands
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Batches: brand sees own; coordinator sees cluster batches; admin all
CREATE POLICY "batches_brand_own" ON public.batches
  FOR ALL USING (
    brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid())
  );

CREATE POLICY "batches_coordinator" ON public.batches
  FOR SELECT USING (
    coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = auth.uid())
  );

CREATE POLICY "batches_admin" ON public.batches
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Provenance pages: publicly readable by slug (no auth required)
CREATE POLICY "provenance_public_read" ON public.provenance_pages
  FOR SELECT USING (published = TRUE);

CREATE POLICY "provenance_brand_manage" ON public.provenance_pages
  FOR ALL USING (
    brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid())
  );

-- Artisans: coordinator manages own cluster; brands can read verified; admin all
CREATE POLICY "artisans_coordinator_own" ON public.artisans
  FOR ALL USING (
    cluster_id IN (SELECT cluster_id FROM public.coordinators WHERE profile_id = auth.uid())
  );

CREATE POLICY "artisans_brands_read" ON public.artisans
  FOR SELECT USING (verification_status = 'verified');

CREATE POLICY "artisans_admin" ON public.artisans
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- Analytics: brands see own; admin all
CREATE POLICY "analytics_brand" ON public.analytics_events
  FOR SELECT USING (
    brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid())
  );

CREATE POLICY "analytics_public_insert" ON public.analytics_events
  FOR INSERT WITH CHECK (TRUE);  -- allow anonymous inserts for QR scans

-- ============================================================
-- TRIGGERS — updated_at auto-update
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at    BEFORE UPDATE ON public.profiles    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_updated_at      BEFORE UPDATE ON public.brands      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_artisans_updated_at    BEFORE UPDATE ON public.artisans    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_batches_updated_at     BEFORE UPDATE ON public.batches     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_provenance_updated_at  BEFORE UPDATE ON public.provenance_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SEED DATA — Default clusters & admin setup
-- ============================================================

INSERT INTO public.clusters (name, region, country, lat, lng, description) VALUES
  ('Varanasi Cluster',     'Varanasi, Uttar Pradesh', 'India', 25.3176, 82.9739, 'Primary Banarasi silk weaving cluster — home to master weavers of Varanasi'),
  ('Murshidabad Cluster',  'Murshidabad, West Bengal', 'India', 24.1800, 88.2667, 'Renowned for Jamdani and fine Murshidabad silk weaving'),
  ('Chanderi Cluster',     'Chanderi, Madhya Pradesh', 'India', 24.7132, 78.1419, 'Home of the iconic lightweight Chanderi silk-cotton fabric');
