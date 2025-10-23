"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/local-db"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FileText, MessageSquare, Flag, BarChart3 } from "lucide-react"

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/ads", label: "Ads", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/flags", label: "Flags", icon: Flag },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const user = getCurrentUser()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/")
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D]">
        <p className="text-red-400">Access denied. Admin only.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#2a2a2a] bg-[#1a1a1a] p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#00FFFF]">Admin Panel</h2>
          <p className="text-xs text-muted-foreground mt-1">EasyCustomized</p>
        </div>

        <nav className="space-y-2">
          {adminNav.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-[#00FFFF]/10 text-[#00FFFF] font-medium"
                    : "text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

