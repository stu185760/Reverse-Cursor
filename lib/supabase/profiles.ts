import { getSupabaseClient } from "./client"
import type { Profile } from "./types"

export async function getProfile(userId: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) throw error
  return data
}

export async function uploadProfilePhoto(file: File, userId: string) {
  const supabase = getSupabaseClient()
  const fileName = `${userId}/profile-${Date.now()}.jpg`

  // Upload to storage
  const { error: uploadError } = await supabase.storage.from("profile-photos").upload(fileName, file)

  if (uploadError) throw uploadError

  // Get public URL
  const { data } = supabase.storage.from("profile-photos").getPublicUrl(fileName)

  // Update profile
  const { data: profileData, error: dbError } = await supabase
    .from("profiles")
    .update({ profile_photo_url: data.publicUrl })
    .eq("id", userId)
    .select()
    .single()

  if (dbError) throw dbError
  return profileData
}

export async function getVendorsByCategory(category: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "vendor")
    .order("rating", { ascending: false })

  if (error) throw error
  return data
}
