import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * IMPORTANT: Creates a NEW Supabase client for each request
 * DO NOT cache this - it must read fresh cookies for each request
 */
export async function getSupabaseServer() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    },
  )
}
