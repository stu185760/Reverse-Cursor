"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loadDB, getUser, deleteAd, type Ad } from "@/lib/local-db"
import { Search, Trash2, Eye } from "lucide-react"
import { formatDateTime, formatPriceRange } from "@/lib/utils"
import Link from "next/link"

export default function AdminAdsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("all")
  const [refreshKey, setRefreshKey] = useState(0)

  const ads = useMemo(() => {
    const db = loadDB()
    let filtered = db.ads

    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter)
    }

    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      )
    }

    return filtered.sort((a, b) => b.created_at - a.created_at)
  }, [search, statusFilter, refreshKey])

  const handleDelete = (adId: string) => {
    if (confirm("Are you sure you want to delete this ad? This cannot be undone.")) {
      deleteAd(adId)
      setRefreshKey(prev => prev + 1)
    }
  }

  const statusColors = {
    open: "bg-green-500/20 text-green-400 border-green-500/50",
    closed: "bg-gray-500/20 text-gray-400 border-gray-500/50",
    completed: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Ad Management</h1>
        <p className="text-muted-foreground mt-1">Monitor and moderate all ads</p>
      </div>

      {/* Filters */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search ads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-[#2a2a2a]"
              />
            </div>
            <div className="flex gap-2">
              {["all", "open", "closed"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status as any)}
                  className={
                    statusFilter === status
                      ? "bg-[#00FFFF] text-black hover:bg-[#00CCCC]"
                      : "border-[#2a2a2a] hover:bg-[#1a1a1a]"
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ad List */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white">
            {ads.length} {ads.length === 1 ? "Ad" : "Ads"} Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ads.map((ad) => {
              const owner = getUser(ad.owner_id)
              return (
                <div
                  key={ad.id}
                  className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#00FFFF]/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">{ad.title}</h3>
                        <Badge className={statusColors[ad.status]}>
                          {ad.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">{ad.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>Posted by: {owner?.name || "Unknown"}</span>
                        <span>•</span>
                        <span>{formatDateTime(ad.created_at)}</span>
                        {ad.location && (
                          <>
                            <span>•</span>
                            <span>📍 {ad.location}</span>
                          </>
                        )}
                        {(ad.price_from || ad.price_to) && (
                          <>
                            <span>•</span>
                            <span className="text-[#00FFFF]">{formatPriceRange(ad.price_from, ad.price_to)}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/ads/${ad.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#00FFFF]/50 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(ad.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}

            {ads.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No ads found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

