export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: "customer" | "vendor" | "admin"
          avatar_url: string | null
          location: string | null
          bio: string | null
          business_name: string | null
          business_category: string | null
          verification_status: "pending" | "verified" | "rejected" | null
          rating: number
          total_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: "customer" | "vendor" | "admin"
          avatar_url?: string | null
          location?: string | null
          bio?: string | null
          business_name?: string | null
          business_category?: string | null
          verification_status?: "pending" | "verified" | "rejected" | null
          rating?: number
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: "customer" | "vendor" | "admin"
          avatar_url?: string | null
          location?: string | null
          bio?: string | null
          business_name?: string | null
          business_category?: string | null
          verification_status?: "pending" | "verified" | "rejected" | null
          rating?: number
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
      }
      ads: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          category: string
          budget_min: number | null
          budget_max: number | null
          currency: string
          timeline: string | null
          preferred_date: string | null
          location: string
          address: string | null
          images: string[] | null
          status: "draft" | "active" | "closed" | "fulfilled"
          contact_preferences: Json
          matched_vendors: string[] | null
          views_count: number
          quotes_count: number
          created_at: string
          updated_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          category: string
          budget_min?: number | null
          budget_max?: number | null
          currency?: string
          timeline?: string | null
          preferred_date?: string | null
          location: string
          address?: string | null
          images?: string[] | null
          status?: "draft" | "active" | "closed" | "fulfilled"
          contact_preferences?: Json
          matched_vendors?: string[] | null
          views_count?: number
          quotes_count?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          category?: string
          budget_min?: number | null
          budget_max?: number | null
          currency?: string
          timeline?: string | null
          preferred_date?: string | null
          location?: string
          address?: string | null
          images?: string[] | null
          status?: "draft" | "active" | "closed" | "fulfilled"
          contact_preferences?: Json
          matched_vendors?: string[] | null
          views_count?: number
          quotes_count?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
      }
      classifieds: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          category: string
          price: number | null
          price_type: "fixed" | "negotiable" | "starting_from" | "contact" | null
          currency: string
          location: string
          images: string[] | null
          status: "draft" | "active" | "sold" | "inactive"
          features: string[] | null
          tags: string[] | null
          views_count: number
          inquiries_count: number
          created_at: string
          updated_at: string
          featured_until: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          category: string
          price?: number | null
          price_type?: "fixed" | "negotiable" | "starting_from" | "contact" | null
          currency?: string
          location: string
          images?: string[] | null
          status?: "draft" | "active" | "sold" | "inactive"
          features?: string[] | null
          tags?: string[] | null
          views_count?: number
          inquiries_count?: number
          created_at?: string
          updated_at?: string
          featured_until?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          category?: string
          price?: number | null
          price_type?: "fixed" | "negotiable" | "starting_from" | "contact" | null
          currency?: string
          location?: string
          images?: string[] | null
          status?: "draft" | "active" | "sold" | "inactive"
          features?: string[] | null
          tags?: string[] | null
          views_count?: number
          inquiries_count?: number
          created_at?: string
          updated_at?: string
          featured_until?: string | null
        }
      }
      quotes: {
        Row: {
          id: string
          ad_id: string
          vendor_id: string
          message: string
          estimated_price: number | null
          estimated_timeline: string | null
          status: "pending" | "accepted" | "rejected" | "withdrawn"
          customer_response: string | null
          response_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ad_id: string
          vendor_id: string
          message: string
          estimated_price?: number | null
          estimated_timeline?: string | null
          status?: "pending" | "accepted" | "rejected" | "withdrawn"
          customer_response?: string | null
          response_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ad_id?: string
          vendor_id?: string
          message?: string
          estimated_price?: number | null
          estimated_timeline?: string | null
          status?: "pending" | "accepted" | "rejected" | "withdrawn"
          customer_response?: string | null
          response_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          ad_id: string | null
          quote_id: string | null
          classified_id: string | null
          read: boolean
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          ad_id?: string | null
          quote_id?: string | null
          classified_id?: string | null
          read?: boolean
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          ad_id?: string | null
          quote_id?: string | null
          classified_id?: string | null
          read?: boolean
          read_at?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          reviewer_id: string
          vendor_id: string
          ad_id: string | null
          rating: number
          title: string | null
          comment: string | null
          vendor_response: string | null
          responded_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reviewer_id: string
          vendor_id: string
          ad_id?: string | null
          rating: number
          title?: string | null
          comment?: string | null
          vendor_response?: string | null
          responded_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reviewer_id?: string
          vendor_id?: string
          ad_id?: string | null
          rating?: number
          title?: string | null
          comment?: string | null
          vendor_response?: string | null
          responded_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

