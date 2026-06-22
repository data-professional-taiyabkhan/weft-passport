-- ============================================================
-- WEFT PASSPORT — Database Schema (corrected, matches live DB)
-- Project ref: psjuehgawhpynvfftibu  (region eu-west-2)
-- Fixes vs original: removed unused postgis; is_admin() SECURITY DEFINER
-- to stop RLS recursion; handle_new_user() signup trigger; added the
-- missing RLS policies on clusters/coordinators/looms/skus/
-- compliance_documents/audit_logs (were RLS-enabled with zero policies).
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role           AS ENUM ('admin', 'brand', 'coordinator', 'consumer');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected', 'under_review');
CREATE TYPE batch_status        AS ENUM ('draft', 'submitted', 'field_verified', 'certified', 'rejected');
CREATE TYPE subscription_tier   AS ENUM ('trial', 'standard', 'premium', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled', 'trial');
CREATE TYPE loom_type           AS ENUM ('pit_loom', 'frame_loom', 'jacquard', 'dobby', 'fly_shuttle', 'handloom_other');
CREATE TYPE textile_technique   AS ENUM ('banarasi_silk', 'kantha', 'ikat', 'block_print', 'embroidery', 'jamdani', 'chanderi', 'other');
CREATE TYPE compliance_framework AS ENUM ('eu_ecgt', 'eu_csddd', 'eu_dpp', 'uk_green_claims', 'gots', 'fair_trade');
CREATE TYPE document_type       AS ENUM ('compliance_report', 'artisan_certificate', 'batch_certificate', 'audit_trail', 'qr_summary');

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
  annual_revenue    TEXT,
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

CREATE TABLE public.clusters (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  region      TEXT NOT NULL,
  country     TEXT DEFAULT 'India',
  lat         NUMERIC(10,7),
  lng         NUMERIC(10,7),
  description TEXT,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE public.artisans (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artisan_id_code   TEXT UNIQUE NOT NULL,
  cluster_id        UUID REFERENCES public.clusters(id),
  coordinator_id    UUID REFERENCES public.coordinators(id),
  full_name         TEXT NOT NULL,
  display_name      TEXT,
  gender            TEXT,
  age_bracket       TEXT,
  phone             TEXT,
  village           TEXT,
  district          TEXT,
  state             TEXT DEFAULT 'Uttar Pradesh',
  country           TEXT DEFAULT 'India',
  lat               NUMERIC(10,7),
  lng               NUMERIC(10,7),
  bio               TEXT,
  specialisation    TEXT[],
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

CREATE TABLE public.looms (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  loom_id_code    TEXT UNIQUE NOT NULL,
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

CREATE TABLE public.batches (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  batch_id_code     TEXT UNIQUE NOT NULL,
  brand_id          UUID REFERENCES public.brands(id),
  artisan_id        UUID REFERENCES public.artisans(id),
  loom_id           UUID REFERENCES public.looms(id),
  coordinator_id    UUID REFERENCES public.coordinators(id),
  cluster_id        UUID REFERENCES public.clusters(id),
  textile_name      TEXT NOT NULL,
  technique         textile_technique NOT NULL,
  fibre_content     TEXT,
  colour_palette    TEXT,
  thread_count      INTEGER,
  dimensions_cm     TEXT,
  weight_grams      NUMERIC(8,2),
  quantity_pieces   INTEGER DEFAULT 1,
  production_start  DATE,
  production_end    DATE,
  production_location TEXT,
  production_lat    NUMERIC(10,7),
  production_lng    NUMERIC(10,7),
  status            batch_status DEFAULT 'draft',
  verification_status verification_status DEFAULT 'pending',
  field_verified_at TIMESTAMPTZ,
  certified_at      TIMESTAMPTZ,
  certified_by      UUID REFERENCES public.profiles(id),
  rejection_reason  TEXT,
  photos            TEXT[],
  video_url         TEXT,
  field_notes       TEXT,
  qr_code_url       TEXT,
  provenance_page_slug TEXT UNIQUE,
  consumer_views    INTEGER DEFAULT 0,
  qr_scans          INTEGER DEFAULT 0,
  compliance_frameworks compliance_framework[],
  regulatory_notes  TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE public.provenance_pages (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  batch_id        UUID REFERENCES public.batches(id) ON DELETE CASCADE,
  sku_id          UUID REFERENCES public.skus(id),
  brand_id        UUID REFERENCES public.brands(id),
  headline        TEXT,
  artisan_story   TEXT,
  production_story TEXT,
  cultural_context TEXT,
  certified       BOOLEAN DEFAULT FALSE,
  certification_date TIMESTAMPTZ,
  compliance_badge  TEXT[],
  total_views     INTEGER DEFAULT 0,
  unique_views    INTEGER DEFAULT 0,
  last_viewed_at  TIMESTAMPTZ,
  published       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE public.analytics_events (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id    UUID REFERENCES public.brands(id),
  batch_id    UUID REFERENCES public.batches(id),
  page_slug   TEXT,
  event_type  TEXT NOT NULL,
  country     TEXT,
  device      TEXT,
  referrer    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'), 'brand')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at    BEFORE UPDATE ON public.profiles    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_brands_updated_at      BEFORE UPDATE ON public.brands      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_artisans_updated_at    BEFORE UPDATE ON public.artisans    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_batches_updated_at     BEFORE UPDATE ON public.batches     FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_provenance_updated_at  BEFORE UPDATE ON public.provenance_pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clusters             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coordinators         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisans             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.looms                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skus                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provenance_pages     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_rw" ON public.profiles FOR ALL USING (auth.uid() = id OR public.is_admin()) WITH CHECK (auth.uid() = id OR public.is_admin());
CREATE POLICY "brands_rw" ON public.brands FOR ALL USING (profile_id = auth.uid() OR public.is_admin()) WITH CHECK (profile_id = auth.uid() OR public.is_admin());
CREATE POLICY "clusters_read"  ON public.clusters FOR SELECT USING (TRUE);
CREATE POLICY "clusters_admin" ON public.clusters FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "coordinators_self"      ON public.coordinators FOR ALL USING (profile_id = auth.uid() OR public.is_admin()) WITH CHECK (profile_id = auth.uid() OR public.is_admin());
CREATE POLICY "coordinators_read_auth" ON public.coordinators FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "artisans_admin"       ON public.artisans FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "artisans_coordinator" ON public.artisans FOR ALL
  USING (cluster_id IN (SELECT cluster_id FROM public.coordinators WHERE profile_id = auth.uid()))
  WITH CHECK (cluster_id IN (SELECT cluster_id FROM public.coordinators WHERE profile_id = auth.uid()));
CREATE POLICY "artisans_read_verified" ON public.artisans FOR SELECT USING (verification_status = 'verified' AND auth.uid() IS NOT NULL);
CREATE POLICY "looms_admin"     ON public.looms FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "looms_read_auth" ON public.looms FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "looms_coordinator" ON public.looms FOR ALL
  USING (artisan_id IN (SELECT a.id FROM public.artisans a JOIN public.coordinators c ON a.cluster_id = c.cluster_id WHERE c.profile_id = auth.uid()))
  WITH CHECK (artisan_id IN (SELECT a.id FROM public.artisans a JOIN public.coordinators c ON a.cluster_id = c.cluster_id WHERE c.profile_id = auth.uid()));
CREATE POLICY "batches_brand_own" ON public.batches FOR ALL
  USING (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()))
  WITH CHECK (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()));
CREATE POLICY "batches_coordinator" ON public.batches FOR ALL
  USING (coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = auth.uid()))
  WITH CHECK (coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = auth.uid()));
CREATE POLICY "batches_admin" ON public.batches FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "skus_brand_own" ON public.skus FOR ALL
  USING (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()))
  WITH CHECK (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()));
CREATE POLICY "skus_admin" ON public.skus FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "provenance_public_read"   ON public.provenance_pages FOR SELECT USING (published = TRUE);
CREATE POLICY "provenance_brand_manage"  ON public.provenance_pages FOR ALL
  USING (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()))
  WITH CHECK (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()));
CREATE POLICY "provenance_admin"         ON public.provenance_pages FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "compliance_brand_own" ON public.compliance_documents FOR ALL
  USING (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()))
  WITH CHECK (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()));
CREATE POLICY "compliance_admin" ON public.compliance_documents FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "audit_admin_read"  ON public.audit_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "audit_insert_auth" ON public.audit_logs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "analytics_brand_read" ON public.analytics_events FOR SELECT
  USING (brand_id IN (SELECT id FROM public.brands WHERE profile_id = auth.uid()) OR public.is_admin());
CREATE POLICY "analytics_public_insert" ON public.analytics_events FOR INSERT WITH CHECK (TRUE);

INSERT INTO public.clusters (name, region, country, lat, lng, description) VALUES
  ('Varanasi Cluster',     'Varanasi, Uttar Pradesh', 'India', 25.3176, 82.9739, 'Primary Banarasi silk weaving cluster'),
  ('Murshidabad Cluster',  'Murshidabad, West Bengal', 'India', 24.1800, 88.2667, 'Renowned for Jamdani and fine Murshidabad silk'),
  ('Chanderi Cluster',     'Chanderi, Madhya Pradesh', 'India', 24.7132, 78.1419, 'Home of lightweight Chanderi silk-cotton');
