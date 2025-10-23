"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAd, getCategories, getUser, getCurrentUser, flagItem, deleteAd, listQuotesForAd } from "@/lib/local-db"
import { useCurrentUser } from "@/hooks/use-local"
import { formatDateTime, formatPriceRange } from "@/lib/utils"
import { QuoteForm } from "./quote-form"
import { QuoteList } from "./quote-list"
import { RecommendedVendors } from "./recommended-vendors"
import { MapPin, Calendar, DollarSign } from "lucide-react"

export function AdDetail({ adId }: { adId: string }) {
  const [refreshKey, setRefreshKey] = useState(0)
  const ad = useMemo(() => getAd(adId), [adId, refreshKey])
  const quotes = useMemo(() => listQuotesForAd(adId), [adId, refreshKey])
  const cat = ad ? getCategories().find((c) => c.slug === ad.category) : undefined
  const owner = ad?.owner_id ? getUser(ad.owner_id) : undefined
  const { data: user } = useCurrentUser()
  const router = useRouter()

  if (!ad) return <p className="text-muted-foreground">Ad not found.</p>

  const isOwner = user?.id === ad.owner_id
  const isVendor = user?.role === "vendor"
  const canSubmitQuote = isVendor && ad.status === "open"
  const canFlag = !!user

  const statusColors = {
    open: "bg-green-500/20 text-green-400 border-green-500/50",
    closed: "bg-gray-500/20 text-gray-400 border-gray-500/50",
    completed: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      {/* Ad Details Card */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl text-white mb-2">{ad.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-[#00FFFF] text-[#00FFFF]">
                  {cat?.name ?? ad.category}
                </Badge>
                <Badge className={statusColors[ad.status]}>
                  {ad.status === "open" ? "🟢 Open" : ad.status === "closed" ? "🔴 Closed" : "✅ Completed"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDateTime(ad.created_at)}</span>
            </div>
            {ad.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{ad.location}</span>
              </div>
            )}
            {(ad.price_from || ad.price_to) && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium text-[#00FFFF]">{formatPriceRange(ad.price_from, ad.price_to)}</span>
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Posted by <span className="text-white font-medium">{owner?.name}</span>
          </div>

          <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <p className="text-gray-300 whitespace-pre-wrap">{ad.description}</p>
          </div>

          {ad.images?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ad.images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src || "/placeholder.svg"}
                  alt={`Ad image ${i + 1}`}
                  className="rounded-lg border border-[#2a2a2a] aspect-square object-cover hover:border-[#00FFFF]/50 transition-colors"
                />
              ))}
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-[#2a2a2a]">
            {canFlag && (
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 hover:bg-[#1a1a1a]"
                onClick={() => {
                  const reason = prompt("Reason for flagging this ad?") || "inappropriate"
                  flagItem("ad", ad.id, reason)
                  alert("Thanks for the report. Our team will review.")
                }}
              >
                🚩 Flag
              </Button>
            )}
            {(isOwner || user?.role === "admin") && (
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                onClick={() => {
                  if (!confirm("Are you sure you want to delete this ad? This cannot be undone.")) return
                  const ok = deleteAd(ad.id)
                  if (ok) {
                    alert("Ad deleted.")
                    router.push("/ads")
                  } else {
                    alert("Failed to delete the ad.")
                  }
                }}
              >
                🗑️ Delete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommended Vendors (for customers) */}
      {isOwner && ad.status === "open" && (
        <RecommendedVendors adId={ad.id} />
      )}

      {/* Quote Form for Vendors */}
      {canSubmitQuote && (
        <QuoteForm adId={ad.id} onSuccess={handleRefresh} />
      )}

      {/* Quotes Section */}
      {(isOwner || quotes.length > 0) && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            {isOwner ? "Quotes Received" : "Submitted Quotes"}
          </h2>
          <QuoteList quotes={quotes} showActions={isOwner} onUpdate={handleRefresh} />
        </div>
      )}

      {/* Info for non-vendors */}
      {!isVendor && !isOwner && (
        <Card className="glass-card border-[#2a2a2a]">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              Switch to a vendor account to submit quotes for this request.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
