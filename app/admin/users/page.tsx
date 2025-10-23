"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { loadDB, type User } from "@/lib/local-db"
import { Search, Shield, ShieldCheck } from "lucide-react"

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "customer" | "vendor" | "admin">("all")

  const users = useMemo(() => {
    const db = loadDB()
    let filtered = db.users

    if (roleFilter !== "all") {
      filtered = filtered.filter((u) => u.role === roleFilter)
    }

    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      )
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name))
  }, [search, roleFilter])

  const roleColors = {
    customer: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    vendor: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    admin: "bg-red-500/20 text-red-400 border-red-500/50",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage all platform users</p>
      </div>

      {/* Filters */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-[#2a2a2a]"
              />
            </div>
            <div className="flex gap-2">
              {["all", "customer", "vendor", "admin"].map((role) => (
                <Button
                  key={role}
                  variant={roleFilter === role ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRoleFilter(role as any)}
                  className={
                    roleFilter === role
                      ? "bg-[#00FFFF] text-black hover:bg-[#00CCCC]"
                      : "border-[#2a2a2a] hover:bg-[#1a1a1a]"
                  }
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white">
            {users.length} {users.length === 1 ? "User" : "Users"} Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#00FFFF]/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#7A00FF] flex items-center justify-center text-xl font-bold text-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      {user.verified && (
                        <ShieldCheck className="w-4 h-4 text-[#00FFFF]" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user.role === "vendor" && user.business_name && (
                      <p className="text-xs text-[#7A00FF] mt-0.5">{user.business_name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={roleColors[user.role]}>
                    {user.role}
                  </Badge>
                  {user.role === "vendor" && user.rating && (
                    <Badge variant="outline" className="border-[#00FFFF] text-[#00FFFF]">
                      ⭐ {user.rating}
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}

            {users.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No users found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

