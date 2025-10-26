import { getSupabaseClient } from "./client"
import type { Ad } from "./types"

export async function createAd(ad: Omit<Ad, "id" | "created_at" | "updated_at">) {
  const supabase = getSupabaseClient()
  
  // Ensure status is valid - force to lowercase and validate
  const validStatuses = ["open", "closed", "in_progress"] as const
  const statusValue = (ad.status || "open").toLowerCase()
  const finalStatus = validStatuses.includes(statusValue as any) ? statusValue : "open"
  
  const adData = {
    user_id: ad.user_id,
    title: ad.title,
    description: ad.description,
    category: ad.category,
    location: ad.location,
    budget_min: Number(ad.budget_min),
    budget_max: Number(ad.budget_max),
    status: finalStatus
  }
  
  console.log("[createAd] Original ad data:", JSON.stringify(ad, null, 2))
  console.log("[createAd] Status validation:", {
    original: ad.status,
    normalized: statusValue,
    final: finalStatus,
    validStatuses
  })
  console.log("[createAd] Final ad data being inserted:", JSON.stringify(adData, null, 2))
  
  const { data, error } = await supabase.from("ads").insert([adData]).select().single()

  if (error) {
    console.error("[createAd] Database error details:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    throw error
  }
  
  console.log("[createAd] Ad created successfully:", data.id)
  return data
}

export async function getAds(filters?: { category?: string; location?: string; status?: string }) {
  const supabase = getSupabaseClient()
  let query = supabase.from("ads").select("*, ad_images(*)")

  if (filters?.category) query = query.eq("category", filters.category)
  if (filters?.location) query = query.eq("location", filters.location)
  if (filters?.status) query = query.eq("status", filters.status)

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getAdById(id: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("ads").select("*, ad_images(*), quotes(*)").eq("id", id).single()

  if (error) throw error
  return data
}

export async function getUserAds(userId: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("ads")
    .select("*, ad_images(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function updateAd(id: string, updates: Partial<Ad>) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("ads").update(updates).eq("id", id).select().single()

  if (error) throw error
  return data
}

export async function deleteAd(id: string) {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from("ads").delete().eq("id", id)

  if (error) throw error
}

export async function uploadAdImage(file: File, adId: string, displayOrder: number) {
  const supabase = getSupabaseClient()
  const fileName = `${adId}/${Date.now()}-${file.name}`

  // Upload to storage
  const { error: uploadError } = await supabase.storage.from("ad-images").upload(fileName, file)

  if (uploadError) throw uploadError

  // Get public URL
  const { data } = supabase.storage.from("ad-images").getPublicUrl(fileName)

  // Save to database
  const { data: imageData, error: dbError } = await supabase
    .from("ad_images")
    .insert([
      {
        ad_id: adId,
        image_url: data.publicUrl,
        display_order: displayOrder,
      },
    ])
    .select()
    .single()

  if (dbError) throw dbError
  return imageData
}

export async function deleteAdImage(imageId: string) {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from("ad_images").delete().eq("id", imageId)

  if (error) throw error
}
