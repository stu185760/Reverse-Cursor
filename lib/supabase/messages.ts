import { getSupabaseClient } from "./client"
import type { Message } from "./types"

export async function sendMessage(message: Omit<Message, "id" | "created_at" | "is_read">) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("messages")
    .insert([{ ...message, is_read: false }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getConversation(userId1: string, userId2: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`,
    )
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function markAsRead(messageId: string) {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from("messages").update({ is_read: true }).eq("id", messageId)

  if (error) throw error
}

export async function getUserMessages(userId: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
