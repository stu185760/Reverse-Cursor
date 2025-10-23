import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Skip Supabase for local development when environment variables aren't set
  // The app works with local storage (lib/local-db.ts) for demo purposes
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // No Supabase configured - app will use local storage
    return
  }

  // Only use Supabase if properly configured
  const { updateSession } = await import("@/lib/supabase/middleware")
  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
