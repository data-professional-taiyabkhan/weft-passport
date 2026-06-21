-- ============================================================
-- WEFT PASSPORT — SUPABASE DATABASE SCHEMA
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('admin', 'brand', 'coordinator');
CREATE TYPE batch_status AS ENUM ('pending', 'field_verified', 'certified', 'rejected');
CREATE TYPE subscription_tier AS ENUM ('trial', 'standard', 'premium', 'enterprise');
CREATE TYPE loom_type AS ENUM ('handloom', 'pit_loom', 'frame_loom', 'jacquard_handloom', 'other');
CREATE TYPE weave_technique AS ENUM ('plain', 'twill', 'satin', 'brocade', 'jamdani', 'ikat', 'banarasi', 'other');

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'brand',
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  phone TEXT,
  organisation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BRANDS
-- ============================================================
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website TEXT,
  country TEXT DEFAULT 'GB',
  tier subscription_tier DEFAULT 'trial',
  trial_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '60 days'),
  subscription_active BOOLEAN DEFAULT TRUE,
  batches_used INT DEFAULT 0,
  batches_limit INT DEFAULT 5,
  onboarded_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COORDINATORS
-- ============================================================
CREATE TABLE coordinators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cluster TEXT NOT NULL,  -- e.g. 'Varanasi', 'Dhaka'
  region TEXT,
  country TEXT DEFAULT 'IN',
  phone TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  artisans_count INT DEFAULT 0,
  batches_submitted INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ARTISANS
-- ============================================================
CREATE TABLE artisans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coordinator_id UUID REFERENCES coordinators(id),
  name TEXT NOT NULL,
  artisan_id TEXT UNIQUE,  -- e.g. WP-ART-001
  gender TEXT,
  age_range TEXT,
  cluster TEXT NOT NULL,
  village TEXT,
  district TEXT,
  state TEXT,
  country TEXT DEFAULT 'IN',
  specialisation TEXT[],  -- array of techniques
  years_experience INT,
  cooperative TEXT,
  cooperative_verified BOOLEAN DEFAULT FALSE,
  photo_url TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LOOMS
-- ============================================================
CREATE TABLE looms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artisan_id UUID REFERENCES artisans(id) ON DELETE CASCADE,
  loom_id TEXT UNIQUE,  -- e.g. WP-LM-001
  loom_type loom_type NOT NULL,
  age_years INT,
  width_cm DECIMAL,
  condition TEXT,
  location_lat DECIMAL,
  location_lng DECIMAL,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TEXTILE BATCHES
-- ============================================================
CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_ref TEXT UNIQUE NOT NULL,  -- e.g. WP-2025-BNS-0041
  artisan_id UUID REFERENCES artisans(id),
  loom_id UUID REFERENCES looms(id),
  coordinator_id UUID REFERENCES coordinators(id),
  weave_technique weave_technique,
  fibre_content TEXT,
  natural_dye BOOLEAN DEFAULT FALSE,
  dye_notes TEXT,
  thread_count INT,
  length_metres DECIMAL,
  width_cm DECIMAL,
  production_date DATE,
  production_days INT,
  status batch_status DEFAULT 'pending',
  geo_lat DECIMAL,
  geo_lng DECIMAL,
  geo_accuracy DECIMAL,
  photo_urls TEXT[],
  video_url TEXT,
  field_notes TEXT,
  cooperative_cosign TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  certification_ref TEXT UNIQUE,  -- e.g. WPC-2025-0041
  certified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKUS (Brand Product ↔ Batch Mapping)
-- ============================================================
CREATE TABLE skus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES batches(id),
  sku_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_type TEXT,
  collection TEXT,
  season TEXT,
  attribution_pct DECIMAL DEFAULT 100,  -- partial attribution support
  qr_slug TEXT UNIQUE,  -- public QR page slug
  qr_generated_at TIMESTAMPTZ,
  provenance_page_live BOOLEAN DEFAULT FALSE,
  compliance_pack_url TEXT,
  retail_price DECIMAL,
  currency TEXT DEFAULT 'GBP',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMPLIANCE EXPORTS
-- ============================================================
CREATE TABLE compliance_exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id),
  sku_ids UUID[],
  export_type TEXT,  -- 'ecgt', 'csddd', 'dpp', 'full_pack'
  file_url TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  generated_by UUID REFERENCES profiles(id)
);

-- ============================================================
-- CONSUMER PROVENANCE VIEWS (public QR scans)
-- ============================================================
CREATE TABLE provenance_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku_id UUID REFERENCES skus(id),
  qr_slug TEXT,
  viewer_country TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE looms ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE skus ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE provenance_views ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Brands: brand users manage own brand
CREATE POLICY "Brand users manage own brand"
  ON brands FOR ALL USING (
    profile_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Batches: coordinators manage, brands read certified
CREATE POLICY "Coordinators manage batches"
  ON batches FOR ALL USING (
    EXISTS (SELECT 1 FROM coordinators WHERE profile_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Brands read certified batches"
  ON batches FOR SELECT USING (
    status = 'certified' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('brand', 'admin'))
  );

-- SKUs: brands manage own SKUs
CREATE POLICY "Brands manage own SKUs"
  ON skus FOR ALL USING (
    EXISTS (SELECT 1 FROM brands WHERE id = brand_id AND profile_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Public provenance views: anyone can insert
CREATE POLICY "Anyone can log provenance view"
  ON provenance_views FOR INSERT WITH CHECK (true);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'brand')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER batches_updated_at BEFORE UPDATE ON batches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER skus_updated_at BEFORE UPDATE ON skus FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
