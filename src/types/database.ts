export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = 'admin' | 'brand' | 'coordinator' | 'consumer';
export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'under_review';
export type BatchStatus = 'draft' | 'submitted' | 'field_verified' | 'certified' | 'rejected';
export type SubscriptionTier = 'trial' | 'standard' | 'premium' | 'enterprise';
export type LoomType = 'pit_loom' | 'frame_loom' | 'jacquard' | 'dobby' | 'fly_shuttle' | 'handloom_other';
export type TextileTechnique = 'banarasi_silk' | 'kantha' | 'ikat' | 'block_print' | 'embroidery' | 'jamdani' | 'chanderi' | 'other';
export type ComplianceFramework = 'eu_ecgt' | 'eu_csddd' | 'eu_dpp' | 'uk_green_claims' | 'gots' | 'fair_trade';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  phone: string | null;
  timezone: string;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  profile_id: string;
  brand_name: string;
  brand_slug: string;
  logo_url: string | null;
  website: string | null;
  description: string | null;
  country: string;
  city: string | null;
  subscription_tier: SubscriptionTier;
  subscription_status: string;
  trial_ends_at: string | null;
  total_batches_certified: number;
  total_skus_active: number;
  compliance_score: number;
  created_at: string;
  updated_at: string;
}

export interface Artisan {
  id: string;
  artisan_id_code: string;
  cluster_id: string | null;
  coordinator_id: string | null;
  full_name: string;
  display_name: string | null;
  gender: string | null;
  village: string | null;
  district: string | null;
  state: string;
  country: string;
  lat: number | null;
  lng: number | null;
  bio: string | null;
  specialisation: string[] | null;
  years_experience: number | null;
  photo_url: string | null;
  verification_status: VerificationStatus;
  verified_at: string | null;
  cooperative_member: boolean;
  total_batches: number;
  active: boolean;
  created_at: string;
}

export interface Batch {
  id: string;
  batch_id_code: string;
  brand_id: string | null;
  artisan_id: string | null;
  loom_id: string | null;
  coordinator_id: string | null;
  cluster_id: string | null;
  textile_name: string;
  technique: TextileTechnique;
  fibre_content: string | null;
  colour_palette: string | null;
  quantity_pieces: number;
  production_start: string | null;
  production_end: string | null;
  production_location: string | null;
  production_lat: number | null;
  production_lng: number | null;
  status: BatchStatus;
  verification_status: VerificationStatus;
  field_verified_at: string | null;
  certified_at: string | null;
  photos: string[] | null;
  field_notes: string | null;
  qr_code_url: string | null;
  provenance_page_slug: string | null;
  consumer_views: number;
  qr_scans: number;
  compliance_frameworks: ComplianceFramework[] | null;
  created_at: string;
  updated_at: string;
}

export interface SKU {
  id: string;
  sku_code: string;
  brand_id: string;
  batch_id: string | null;
  product_name: string;
  product_category: string | null;
  price_gbp: number | null;
  retail_url: string | null;
  active: boolean;
  created_at: string;
}

export interface ProvenancePage {
  id: string;
  slug: string;
  batch_id: string | null;
  sku_id: string | null;
  brand_id: string | null;
  headline: string | null;
  artisan_story: string | null;
  production_story: string | null;
  cultural_context: string | null;
  certified: boolean;
  certification_date: string | null;
  compliance_badge: string[] | null;
  total_views: number;
  unique_views: number;
  published: boolean;
  created_at: string;
}

export interface Cluster {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number | null;
  lng: number | null;
  description: string | null;
  active: boolean;
  created_at: string;
}

export interface Coordinator {
  id: string;
  profile_id: string;
  cluster_id: string | null;
  full_name: string;
  phone: string | null;
  language: string;
  verified: boolean;
  active: boolean;
  batches_verified: number;
  created_at: string;
}

// Database type for Supabase client generic
export interface Database {
  public: {
    Tables: {
      profiles:             { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      brands:               { Row: Brand;   Insert: Partial<Brand>;   Update: Partial<Brand> };
      artisans:             { Row: Artisan; Insert: Partial<Artisan>; Update: Partial<Artisan> };
      batches:              { Row: Batch;   Insert: Partial<Batch>;   Update: Partial<Batch> };
      skus:                 { Row: SKU;     Insert: Partial<SKU>;     Update: Partial<SKU> };
      provenance_pages:     { Row: ProvenancePage; Insert: Partial<ProvenancePage>; Update: Partial<ProvenancePage> };
      clusters:             { Row: Cluster; Insert: Partial<Cluster>; Update: Partial<Cluster> };
      coordinators:         { Row: Coordinator; Insert: Partial<Coordinator>; Update: Partial<Coordinator> };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
