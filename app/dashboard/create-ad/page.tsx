"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { createAd, uploadAdImage } from "@/lib/supabase/ads"
import { getProfile } from "@/lib/supabase/profiles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PostAdWizard, type AdFormData } from "@/components/post-ad-wizard"

export default function CreateAd() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [isCustomer, setIsCustomer] = useState(false)
  const [error, setError] = useState("")
  
  // Check authentication and role
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push("/auth/login")
          return
        }
        
        // Check if user is a customer
        const profile = await getProfile(user.id)
        if (profile.role !== "customer") {
          setError("Only customers can post ads. Please sign up as a customer.")
          setIsCustomer(false)
        } else {
          setIsCustomer(true)
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

  const handleSubmit = async (data: AdFormData) => {
    setLoading(true)
    setError("")

    try {
      const supabase = getSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError("You must be logged in to create an ad")
        router.push("/auth/login")
        return
      }

      // Create ad
      console.log("Creating ad with data:", {
        user_id: user.id,
        title: data.title,
        category: data.category,
        location: data.location,
        budget: `₹${data.budget_min} - ₹${data.budget_max}`
      })
      
      const ad = await createAd({
        user_id: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        budget_min: data.budget_min,
        budget_max: data.budget_max,
      })

      console.log("Ad created successfully:", ad.id)

      // Upload images
      if (data.images.length > 0) {
        console.log(`Uploading ${data.images.length} images...`)
        for (let i = 0; i < data.images.length; i++) {
          await uploadAdImage(data.images[i], ad.id, i)
          console.log(`Image ${i + 1}/${data.images.length} uploaded`)
        }
      }

      console.log("Ad creation complete, redirecting...")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error creating ad:", error)
      setError(error.message || "Failed to create ad. Please try again.")
      throw error // Re-throw so wizard can handle it
    } finally {
      setLoading(false)
    }
  }

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
  
  if (!isCustomer) {
    return (
      <main className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-red-50 text-red-700 rounded mb-4">
              {error}
            </div>
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post Your Requirement</h1>
        <p className="text-muted-foreground">Fill in the details and get quotes from verified vendors across India</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded text-sm mb-6 max-w-4xl mx-auto">
          {error}
        </div>
      )}

      <PostAdWizard onSubmit={handleSubmit} loading={loading} />
    </main>
  )
}
