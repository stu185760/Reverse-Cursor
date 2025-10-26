"use client"

import { useEffect, useState } from "react"
import { getAds } from "@/lib/supabase/ads"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BrowseAds() {
  const [ads, setAds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ category: "", location: "" })

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await getAds({
          category: filters.category || undefined,
          location: filters.location || undefined,
          status: "open",
        })
        setAds(data)
      } catch (error) {
        console.error("Error loading ads:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAds()
  }, [filters])

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Browse Opportunities</h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            placeholder="Filter by category..."
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="px-4 py-2 border rounded"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">Loading...</div>
      ) : ads.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No opportunities found matching your filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {ads.map((ad) => (
            <Card key={ad.id}>
              <CardHeader>
                <CardTitle>{ad.title}</CardTitle>
                <CardDescription>
                  {ad.category} • {ad.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{ad.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    ${ad.budget_min} - ${ad.budget_max}
                  </span>
                  <Link href={`/dashboard/ads/${ad.id}`}>
                    <Button>View & Quote</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
