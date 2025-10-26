"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { getAds } from "@/lib/supabase/ads"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BrowseAds() {
  const router = useRouter()
  const [ads, setAds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [filters, setFilters] = useState({ category: "", location: "" })
  const [error, setError] = useState("")

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push("/auth/login")
          return
        }
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/auth/login")
      } finally {
        setAuthLoading(false)
      }
    }
    
    checkAuth()
  }, [router])

  useEffect(() => {
    if (authLoading) return
    
    const loadAds = async () => {
      try {
        console.log("Loading ads with filters:", filters)
        const data = await getAds({
          category: filters.category || undefined,
          location: filters.location || undefined,
          status: "open",
        })
        console.log(`Loaded ${data.length} ads`)
        setAds(data)
      } catch (error: any) {
        console.error("Error loading ads:", error)
        setError(error.message || "Failed to load ads")
      } finally {
        setLoading(false)
      }
    }

    loadAds()
  }, [filters, authLoading])

  if (authLoading) {
    return (
      <main className="container mx-auto py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Browse Opportunities</h1>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded text-sm mb-4">
            {error}
          </div>
        )}

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
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">Loading ads...</div>
        </div>
      ) : ads.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              {filters.category || filters.location 
                ? "No opportunities found matching your filters." 
                : "No opportunities available yet. Check back soon!"}
            </p>
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
