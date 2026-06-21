export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'brand' | 'coordinator'
          full_name: string | null
          email: string | null
          avatar_url: string | null
          phone: string | null
          organisation: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      brands: {
        Row: {
          id: string
          profile_id: string
          name: string
          slug: string
          logo_url: string | null
          website: string | null
          country: string
          tier: 'trial' | 'standard' | 'premium' | 'enterprise'
          trial_expires_at: string | null
          subscription_active: boolean
          batches_used: number
          batches_limit: number
          onboarded_at: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['brands']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['brands']['Insert']>
      }
      artisans: {
        Row: {
          id: string
          coordinator_id: string | null
          name: string
          artisan_id: string | null
          gender: string | null
          cluster: string
          village: string | null
          district: string | null
          state: string | null
          country: string
          specialisation: string[] | null
          years_experience: number | null
          cooperative: string | null
          cooperative_verified: boolean
          photo_url: string | null
          bio: string | null
          is_active: boolean
          verified_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['artisans']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['artisans']['Insert']>
      }
      batches: {
        Row: {
          id: string
          batch_ref: string
          artisan_id: string | null
          loom_id: string | null
          coordinator_id: string | null
          weave_technique: string | null
          fibre_content: string | null
          natural_dye: boolean
          dye_notes: string | null
          thread_count: number | null
          length_metres: number | null
          width_cm: number | null
          production_date: string | null
          production_days: number | null
          status: 'pending' | 'field_verified' | 'certified' | 'rejected'
          geo_lat: number | null
          geo_lng: number | null
          photo_urls: string[] | null
          field_notes: string | null
          cooperative_cosign: string | null
          verified_by: string | null
          verified_at: string | null
          certification_ref: string | null
          certified_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['batches']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['batches']['Insert']>
      }
      skus: {
        Row: {
          id: string
          brand_id: string
          batch_id: string | null
          sku_code: string
          product_name: string
          product_type: string | null
          collection: string | null
          season: string | null
          attribution_pct: number
          qr_slug: string | null
          qr_generated_at: string | null
          provenance_page_live: boolean
          compliance_pack_url: string | null
          retail_price: number | null
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['skus']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['skus']['Insert']>
      }
      coordinators: {
        Row: {
          id: string
          profile_id: string | null
          name: string
          cluster: string
          region: string | null
          country: string
          phone: string | null
          is_active: boolean
          artisans_count: number
          batches_submitted: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['coordinators']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['coordinators']['Insert']>
      }
      provenance_views: {
        Row: {
          id: string
          sku_id: string | null
          qr_slug: string | null
          viewer_country: string | null
          viewed_at: string
        }
        Insert: Omit<Database['public']['Tables']['provenance_views']['Row'], 'id' | 'viewed_at'>
        Update: Partial<Database['public']['Tables']['provenance_views']['Insert']>
      }
    }
  }
}
