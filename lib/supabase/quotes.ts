import { getSupabaseClient } from "./client"
import type { Quote } from "./types"

export async function createQuote(quote: Omit<Quote, "id" | "created_at" | "updated_at">) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("quotes").insert([quote]).select().single()

  if (error) throw error
  return data
}

export async function getQuotesByAd(adId: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("quotes")
    .select("*, vendor:profiles(*)")
    .eq("ad_id", adId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getVendorQuotes(vendorId: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("quotes")
    .select("*, ad:ads(*)")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function updateQuote(id: string, updates: Partial<Quote>) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("quotes").update(updates).eq("id", id).select().single()

  if (error) throw error
  return data
}

export async function deleteQuote(id: string) {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from("quotes").delete().eq("id", id)

  if (error) throw error
}
