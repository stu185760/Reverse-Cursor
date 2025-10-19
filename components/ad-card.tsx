import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCategories, getUser, type Ad } from "@/lib/local-db"
import { formatDateTime } from "@/lib/utils"

export function AdCard({ ad }: { ad: Ad }) {
  const cat = getCategories().find((c) => c.slug === ad.category)
  const owner = ad.owner_id ? getUser(ad.owner_id) : undefined

  const cover = ad.images?.[0] || "/custom-project-preview.jpg"

  const priceLabel =
    typeof ad.price_from === "number" && typeof ad.price_to === "number"
      ? `₹${ad.price_from} – ₹${ad.price_to}`
      : typeof ad.price_from === "number"
        ? `From ₹${ad.price_from}`
        : typeof ad.price_to === "number"
          ? `Up to ₹${ad.price_to}`
          : undefined

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[16/9] bg-muted relative">
        <Image
          src={cover || "/placeholder.svg"}
          alt={ad.title || "Ad cover image"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <CardHeader className="flex-row items-start justify-between gap-2 pb-2">
        <CardTitle className="text-sm sm:text-base line-clamp-2">{ad.title}</CardTitle>
        <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap">
          {cat?.name ?? ad.category}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm text-muted-foreground">{ad.description}</p>

        <div className="flex flex-wrap items-center gap-2">
          {ad.location ? (
            <Badge variant="outline" className="text-xs">
              {ad.location}
            </Badge>
          ) : null}
          {priceLabel ? (
            <Badge variant="outline" className="text-xs">
              {priceLabel}
            </Badge>
          ) : null}
        </div>

        <div className="text-xs text-muted-foreground">
          {owner?.name} • {formatDateTime(ad.created_at)}
        </div>

        <Link href={`/ads/${ad.id}`} className="text-xs sm:text-sm underline underline-offset-4 hover:text-primary">
          View details
        </Link>
      </CardContent>
    </Card>
  )
}
