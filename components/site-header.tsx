"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Menu, X, LogOut } from "lucide-react"
import Image from "next/image"
import { NotificationBell } from "./notification-bell"
import { RoleSwitcher } from "./role-switcher"

const createClient = async () => {
  try {
    // Only try to create Supabase client if credentials are configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return null // App will use local storage instead
    }
    
    const { createClient: createSupabaseClient } = await import("@/lib/supabase/client")
    return createSupabaseClient()
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    return null
  }
}

const nav = [
  { href: "/", label: "Home" },
  { href: "/ads", label: "Browse Ads" },
  { href: "/vendor/browse", label: "Vendor Browse" },
  { href: "/classifieds", label: "Classifieds" },
  { href: "/post-ad", label: "Post Ad" },
  { href: "/classifieds/post", label: "Post Classified" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const supabase = await createClient()
        if (!supabase) {
          setIsLoading(false)
          return
        }

        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null)
        })

        return () => subscription?.unsubscribe()
      } catch (error) {
        console.error("[v0] Auth initialization error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleLogout = async () => {
    try {
      const supabase = await createClient()
      if (supabase) {
        await supabase.auth.signOut()
        router.push("/")
      }
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <header className="border-b border-[#2a2a2a] bg-[#0D0D0D]/95 backdrop-blur-lg sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl group">
          <span className="text-sm sm:text-base md:text-lg">
            Easy<span className="text-[#00FFFF] group-hover:neon-text-cyan transition-all">Customized</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm hover:bg-[#1a1a1a] transition-colors",
                pathname === n.href && "bg-[#1a1a1a] text-[#00FFFF] font-medium",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {/* Role Switcher - Always visible for demo/testing */}
          <RoleSwitcher />
          
          {!isLoading && (
            <>
              {user ? (
                <>
                  <NotificationBell />
                  <Link href="/messages">
                    <Button variant="outline" size="sm" className="border-[#00FFFF]/50 text-[#00FFFF] hover:bg-[#00FFFF]/10">
                      Messages
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="border-gray-600 hover:bg-[#1a1a1a]">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm" className="border-[#00FFFF]/50 text-[#00FFFF] hover:bg-[#00FFFF]/10">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button size="sm" className="bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold">Sign Up</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2a2a2a] bg-[#0D0D0D]">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {/* Role Switcher - Mobile */}
            <div className="pb-2 border-b border-[#2a2a2a] mb-2">
              <div className="text-xs text-gray-400 mb-2 px-3">Switch Role (Demo)</div>
              <RoleSwitcher />
            </div>
            
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm hover:bg-[#1a1a1a]",
                  pathname === n.href && "bg-[#1a1a1a] text-[#00FFFF] font-medium",
                )}
              >
                {n.label}
              </Link>
            ))}
            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Link href="/messages" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        Messages
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full justify-start bg-transparent"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full justify-start">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
