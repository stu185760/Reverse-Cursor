"use client"

import { getSupabaseClient } from "./client"
import type { Database } from "./database.types"

type Ad = Database["public"]["Tables"]["ads"]["Row"]
type AdInsert = Database["public"]["Tables"]["ads"]["Insert"]
type Classified = Database["public"]["Tables"]["classifieds"]["Row"]
type ClassifiedInsert = Database["public"]["Tables"]["classifieds"]["Insert"]
type Quote = Database["public"]["Tables"]["quotes"]["Row"]
type QuoteInsert = Database["public"]["Tables"]["quotes"]["Insert"]
type Message = Database["public"]["Tables"]["messages"]["Row"]
type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"]
type Review = Database["public"]["Tables"]["reviews"]["Row"]
type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"]
type Profile = Database["public"]["Tables"]["profiles"]["Row"]

// ============================================
// ADS (Customer Requirements)
// ============================================

export async function createAd(ad: Omit<AdInsert, "id" | "created_at" | "updated_at">): Promise<Ad> {
  console.log("[database.ts] createAd called with:", ad)
  const supabase = getSupabaseClient()
  console.log("[database.ts] Supabase client:", !!supabase)
  
  const { data, error } = await supabase
    .from("ads")
    .insert(ad)
    .select()
    .single()
  
  console.log("[database.ts] Insert result - data:", data, "error:", error)
  
  if (error) {
    console.error("[database.ts] Database error:", error)
    throw new Error(error.message)
  }
  
  console.log("[database.ts] Ad created successfully:", data)
  return data
}

export async function getAds(filters?: { status?: string; category?: string; location?: string }): Promise<Ad[]> {
  const supabase = getSupabaseClient()
  let query = supabase.from("ads").select("*").order("created_at", { ascending: false })
  
  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.category) {
    query = query.eq("category", filters.category)
  }
  if (filters?.location) {
    query = query.eq("location", filters.location)
  }
  
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data || []
}

export async function getAdById(id: string): Promise<Ad | null> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching ad:", error)
    return null
  }
  return data
}

export async function updateAd(id: string, updates: Partial<AdInsert>): Promise<Ad> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("ads")
    .update(updates)
    .eq("id", id)
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  return data
}

export async function deleteAd(id: string): Promise<void> {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from("ads")
    .delete()
    .eq("id", id)
  
  if (error) throw new Error(error.message)
}

// ============================================
// CLASSIFIEDS (Vendor Products/Services)
// ============================================

export async function createClassified(classified: Omit<ClassifiedInsert, "id" | "created_at" | "updated_at">): Promise<Classified> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("classifieds")
    .insert(classified)
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  return data
}

export async function getClassifieds(filters?: { status?: string; category?: string; location?: string }): Promise<Classified[]> {
  const supabase = getSupabaseClient()
  let query = supabase.from("classifieds").select("*").order("created_at", { ascending: false })
  
  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.category) {
    query = query.eq("category", filters.category)
  }
  if (filters?.location) {
    query = query.eq("location", filters.location)
  }
  
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data || []
}

export async function getClassifiedById(id: string): Promise<Classified | null> {
  const supabase = getSupabaseClient()
  const { data, error} = await supabase
    .from("classifieds")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching classified:", error)
    return null
  }
  return data
}

export async function getClassifiedsByCategory(categorySlug: string): Promise<Classified[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("classifieds")
    .select("*")
    .eq("category", categorySlug)
    .eq("status", "active")
    .order("created_at", { ascending: false })
  
  if (error) throw new Error(error.message)
  return data || []
}

export async function updateClassified(id: string, updates: Partial<ClassifiedInsert>): Promise<Classified> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("classifieds")
    .update(updates)
    .eq("id", id)
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  return data
}

export async function deleteClassified(id: string): Promise<void> {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from("classifieds")
    .delete()
    .eq("id", id)
  
  if (error) throw new Error(error.message)
}

// ============================================
// QUOTES (Vendor Responses to Ads)
// ============================================

export async function createQuote(quote: Omit<QuoteInsert, "id" | "created_at" | "updated_at">): Promise<Quote> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("quotes")
    .insert(quote)
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  return data
}

export async function getQuotesByAdId(adId: string): Promise<Quote[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("ad_id", adId)
    .order("created_at", { ascending: false })
  
  if (error) throw new Error(error.message)
  return data || []
}

export async function getQuotesByVendorId(vendorId: string): Promise<Quote[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false })
  
  if (error) throw new Error(error.message)
  return data || []
}

export async function updateQuote(id: string, updates: Partial<QuoteInsert>): Promise<Quote> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("quotes")
    .update(updates)
    .eq("id", id)
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  return data
}

// ============================================
// MESSAGES (Conversations)
// ============================================

export async function createMessage(message: Omit<MessageInsert, "id" | "created_at">): Promise<Message> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("messages")
    .insert(message)
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  return data
}

export async function getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
    .order("created_at", { ascending: true })
  
  if (error) throw new Error(error.message)
  return data || []
}

export async function getConversations(userId: string): Promise<Message[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false })
  
  if (error) throw new Error(error.message)
  return data || []
}

export async function markMessageAsRead(id: string): Promise<void> {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from("messages")
    .update({ read: true, read_at: new Date().toISOString() })
    .eq("id", id)
  
  if (error) throw new Error(error.message)
}

// ============================================
// REVIEWS (Ratings & Feedback)
// ============================================

export async function createReview(review: Omit<ReviewInsert, "id" | "created_at" | "updated_at">): Promise<Review> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("reviews")
    .insert(review)
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  return data
}

export async function getReviewsByVendorId(vendorId: string): Promise<Review[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false })
  
  if (error) throw new Error(error.message)
  return data || []
}

// ============================================
// PROFILES
// ============================================

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()
  
  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }
  return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  return data
}

export async function getVendors(filters?: { category?: string; location?: string }): Promise<Profile[]> {
  const supabase = getSupabaseClient()
  let query = supabase
    .from("profiles")
    .select("*")
    .eq("role", "vendor")
    .order("rating", { ascending: false })
  
  if (filters?.category) {
    query = query.eq("business_category", filters.category)
  }
  if (filters?.location) {
    query = query.eq("location", filters.location)
  }
  
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data || []
}

