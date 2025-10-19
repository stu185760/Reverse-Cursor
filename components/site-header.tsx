"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Menu, X, LogOut } from "lucide-react"
import Image from "next/image"

const createClient = async () => {
  try {
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
    <header className="border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg md:text-xl">
          
          <span className="text-sm sm:text-base md:text-lg">EasyCustomized</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm hover:bg-muted",
                pathname === n.href && "bg-muted font-medium",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href="/messages">
                    <Button variant="outline" size="sm">
                      Messages
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button size="sm">Sign Up</Button>
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
        <div className="md:hidden border-t bg-card">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm hover:bg-muted",
                  pathname === n.href && "bg-muted font-medium",
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
