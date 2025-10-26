"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ads", href: "/dashboard/browse" },
    { name: "Post Ad", href: "/dashboard/create-ad" },
    { name: "Dashboard", href: "/dashboard" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              Easy<span className="text-primary">Customized</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

