"use client"

import { useEffect, useState, useMemo, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCategories, getUser, type Ad } from "@/lib/local-db"
import { formatDateTime } from "@/lib/utils"

export const AdCard = memo(function AdCard({ ad }: { ad: Ad }) {
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch by only rendering dynamic localStorage data on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Direct operations for performance (memoization overhead not worth it for small lists)
  const cat = getCategories().find((c) => c.slug === ad.category)
  const owner = mounted && ad.owner_id ? getUser(ad.owner_id) : undefined

  const cover = ad.images?.[0] || "/custom-project-preview.jpg"

  const priceLabel =
    typeof ad.price_from === "number" && typeof ad.price_to === "number"
      ? `₹${ad.price_from.toLocaleString('en-IN')} – ₹${ad.price_to.toLocaleString('en-IN')}`
      : typeof ad.price_from === "number"
        ? `From ₹${ad.price_from.toLocaleString('en-IN')}`
        : typeof ad.price_to === "number"
          ? `Up to ₹${ad.price_to.toLocaleString('en-IN')}`
          : undefined

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow glass-card border-[#2a2a2a] hover:border-[#00FFFF]/30">
      <div className="aspect-[16/9] bg-muted relative">
        <Image
          src={cover}
          alt={ad.title || "Ad cover image"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <CardHeader className="flex-row items-start justify-between gap-2 pb-2">
        <CardTitle className="text-sm sm:text-base line-clamp-2 text-white">{ad.title}</CardTitle>
        <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/50">
          {cat?.name ?? ad.category}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm text-gray-400">{ad.description}</p>

        <div className="flex flex-wrap items-center gap-2">
          {ad.location ? (
            <Badge variant="outline" className="text-xs border-[#7A00FF]/50 text-[#7A00FF]">
              📍 {ad.location}
            </Badge>
          ) : null}
          {priceLabel ? (
            <Badge variant="outline" className="text-xs border-[#00FFFF]/50 text-[#00FFFF]">
              💰 {priceLabel}
            </Badge>
          ) : null}
        </div>

        {mounted && (
          <div className="text-xs text-muted-foreground">
            {owner?.name || "Unknown"} • {formatDateTime(ad.created_at)}
          </div>
        )}

        <Link href={`/ads/${ad.id}`} className="text-xs sm:text-sm underline underline-offset-4 hover:text-[#00FFFF] text-[#00FFFF]/80 transition-colors">
          View details →
        </Link>
      </CardContent>
    </Card>
  )
})
