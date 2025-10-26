"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCurrentUser, signOut } from "@/lib/supabase/auth"
import type { User } from "@supabase/supabase-js"

export function Navigation() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }
    loadUser()
  }, [])

  async function handleSignOut() {
    try {
      await signOut()
      setUser(null)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            EasyCustomized
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-gray-600">
              Home
            </Link>
            <Link href="/post-ad" className="text-sm hover:text-gray-600">
              Post Requirement
            </Link>

            {loading ? (
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

