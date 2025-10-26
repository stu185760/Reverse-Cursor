"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { getUserAds } from "@/lib/supabase/ads"
import { getVendorQuotes } from "@/lib/supabase/quotes"
import { getProfile } from "@/lib/supabase/profiles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [ads, setAds] = useState<any[]>([])
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabase = getSupabaseClient()
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          window.location.href = "/auth/login"
          return
        }

        setUser(authUser)

        // Load profile
        const userProfile = await getProfile(authUser.id)
        setProfile(userProfile)

        // Load data based on role
        if (userProfile.role === "customer") {
          const userAds = await getUserAds(authUser.id)
          setAds(userAds)
        } else if (userProfile.role === "vendor") {
          const vendorQuotes = await getVendorQuotes(authUser.id)
          setQuotes(vendorQuotes)
        }
      } catch (error) {
        console.error("Error loading dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {profile?.full_name}</p>
      </div>

      {profile?.role === "customer" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Ads</h2>
            <Link href="/dashboard/create-ad">
              <Button>Create New Ad</Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {ads.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">No ads yet. Create one to get started!</p>
                </CardContent>
              </Card>
            ) : (
              ads.map((ad) => (
                <Card key={ad.id}>
                  <CardHeader>
                    <CardTitle>{ad.title}</CardTitle>
                    <CardDescription>{ad.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{ad.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        ${ad.budget_min} - ${ad.budget_max}
                      </span>
                      <Link href={`/dashboard/ads/${ad.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {profile?.role === "vendor" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Quotes</h2>
            <Link href="/dashboard/browse">
              <Button>Browse Opportunities</Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {quotes.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">No quotes yet. Browse opportunities to get started!</p>
                </CardContent>
              </Card>
            ) : (
              quotes.map((quote) => (
                <Card key={quote.id}>
                  <CardHeader>
                    <CardTitle>{quote.ad?.title}</CardTitle>
                    <CardDescription>{quote.ad?.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{quote.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">${quote.amount}</span>
                      <span className="text-sm capitalize px-2 py-1 bg-secondary rounded">{quote.status}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  )
}
