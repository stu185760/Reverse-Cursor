"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getUser, listReviewsForVendor, listQuotesByVendor, getCategories, getCurrentUser } from "@/lib/local-db"
import { Star, MapPin, Briefcase, Award, MessageCircle } from "lucide-react"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"

export function VendorProfile({ vendorId }: { vendorId: string }) {
  const [refreshKey, setRefreshKey] = useState(0)
  const vendor = useMemo(() => getUser(vendorId), [vendorId, refreshKey])
  const reviews = useMemo(() => listReviewsForVendor(vendorId), [vendorId, refreshKey])
  const quotes = useMemo(() => listQuotesByVendor(vendorId), [vendorId, refreshKey])
  const categories = getCategories()
  const currentUser = getCurrentUser()

  if (!vendor || vendor.role !== "vendor") {
    return <p className="text-muted-foreground">Vendor not found.</p>
  }

  const acceptedQuotes = quotes.filter((q) => q.status === "accepted")
  const pendingQuotes = quotes.filter((q) => q.status === "pending")

  return (
    <div className="space-y-6">
      {/* Vendor Header Card */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#7A00FF] flex items-center justify-center text-4xl font-bold text-black">
                {vendor.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Vendor Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{vendor.name}</h1>
                  {vendor.verified && (
                    <Badge className="bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/50">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                {vendor.business_name && (
                  <p className="text-lg text-[#7A00FF] font-semibold">{vendor.business_name}</p>
                )}
              </div>

              {/* Rating */}
              {vendor.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(vendor.rating!)
                            ? "fill-[#00FFFF] text-[#00FFFF]"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-[#00FFFF]">{vendor.rating}</span>
                  <span className="text-muted-foreground">({vendor.total_reviews} reviews)</span>
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {vendor.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.location}</span>
                  </div>
                )}
                {vendor.years_experience && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{vendor.years_experience} years experience</span>
                  </div>
                )}
                {acceptedQuotes.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{acceptedQuotes.length} completed projects</span>
                  </div>
                )}
              </div>

              {/* Bio */}
              {vendor.bio && (
                <p className="text-gray-300">{vendor.bio}</p>
              )}

              {/* Specialties */}
              {vendor.specialties && vendor.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {vendor.specialties.map((slug) => {
                    const cat = categories.find((c) => c.slug === slug)
                    return (
                      <Badge key={slug} variant="outline" className="border-[#7A00FF] text-[#7A00FF]">
                        {cat?.name || slug}
                      </Badge>
                    )
                  })}
                </div>
              )}

              {/* Contact Button */}
              {currentUser && currentUser.id !== vendor.id && (
                <div>
                  <Button className="bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Vendor
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card border-[#2a2a2a]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#00FFFF]">{quotes.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Quotes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-[#2a2a2a]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">{acceptedQuotes.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Accepted</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-[#2a2a2a]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">{pendingQuotes.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio */}
      {vendor.portfolio_images && vendor.portfolio_images.length > 0 && (
        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {vendor.portfolio_images.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={img}
                  alt={`Portfolio ${i + 1}`}
                  className="rounded-lg border border-[#2a2a2a] aspect-square object-cover hover:border-[#00FFFF]/50 transition-colors"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white">Customer Reviews ({reviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No reviews yet</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => {
                const customer = getUser(review.customer_id)
                return (
                  <div key={review.id} className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-white">{customer?.name || "Customer"}</p>
                        <p className="text-xs text-muted-foreground">{formatDateTime(review.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-[#00FFFF] text-[#00FFFF]" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

