"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { matchVendorsToAd } from "@/lib/ai-matching"
import { Star, Sparkles } from "lucide-react"
import Link from "next/link"

type Props = {
  adId: string
}

export function RecommendedVendors({ adId }: Props) {
  const matches = useMemo(() => matchVendorsToAd(adId, 3), [adId])

  if (matches.length === 0) {
    return null
  }

  return (
    <Card className="glass-card border-[#7A00FF]/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#7A00FF]" />
          AI-Recommended Vendors
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          These vendors are great matches based on their expertise and your requirements
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {matches.map(({ vendor, score, matchReasons }) => (
            <div
              key={vendor.id}
              className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#7A00FF]/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#7A00FF] flex items-center justify-center text-xl font-bold text-black flex-shrink-0">
                  {vendor.name.charAt(0).toUpperCase()}
                </div>

                {/* Vendor Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{vendor.name}</h3>
                    {vendor.verified && (
                      <Badge variant="outline" className="border-[#00FFFF] text-[#00FFFF] text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>

                  {vendor.business_name && (
                    <p className="text-sm text-[#7A00FF] mb-1">{vendor.business_name}</p>
                  )}

                  {/* Rating */}
                  {vendor.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-[#00FFFF] text-[#00FFFF]" />
                      <span className="text-sm font-semibold text-[#00FFFF]">{vendor.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({vendor.total_reviews} reviews)
                      </span>
                    </div>
                  )}

                  {/* Match Reasons */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {matchReasons.slice(0, 3).map((reason, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-[#7A00FF]/50 text-[#7A00FF] text-xs"
                      >
                        {reason}
                      </Badge>
                    ))}
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00FFFF] to-[#7A00FF]"
                        style={{ width: `${Math.min((score / 20) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="font-medium text-[#7A00FF]">{score}% match</span>
                  </div>
                </div>

                {/* Action */}
                <Link href={`/vendor/${vendor.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#7A00FF]/50 text-[#7A00FF] hover:bg-[#7A00FF]/10"
                  >
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

