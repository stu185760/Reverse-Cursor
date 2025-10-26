"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { createAd, uploadAdImage } from "@/lib/supabase/ads"
import { getProfile } from "@/lib/supabase/profiles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget_min: "",
    budget_max: "",
  })
  const [images, setImages] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = getSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("You must be logged in to create an ad")
        router.push("/auth/login")
        return
      }

      // Validate budget
      const minBudget = Number.parseFloat(formData.budget_min)
      const maxBudget = Number.parseFloat(formData.budget_max)
      
      if (minBudget <= 0 || maxBudget <= 0) {
        setError("Budget must be greater than 0")
        return
      }
      
      if (minBudget > maxBudget) {
        setError("Minimum budget cannot be greater than maximum budget")
        return
      }

      // Create ad
      console.log("Creating ad with data:", {
        user_id: user.id,
        title: formData.title,
        category: formData.category,
        location: formData.location,
        budget: `${minBudget} - ${maxBudget}`
      })
      
      const ad = await createAd({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        budget_min: minBudget,
        budget_max: maxBudget,
        status: "open",
      })

      console.log("Ad created successfully:", ad.id)

      // Upload images
      if (images.length > 0) {
        console.log(`Uploading ${images.length} images...`)
        for (let i = 0; i < images.length; i++) {
          await uploadAdImage(images[i], ad.id, i)
          console.log(`Image ${i + 1}/${images.length} uploaded`)
        }
      }

      console.log("Ad creation complete, redirecting...")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error creating ad:", error)
      setError(error.message || "Failed to create ad. Please try again.")
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Ad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget_min">Min Budget</Label>
                <Input
                  id="budget_min"
                  type="number"
                  value={formData.budget_min}
                  onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="budget_max">Max Budget</Label>
                <Input
                  id="budget_max"
                  type="number"
                  value={formData.budget_max}
                  onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="images">Upload Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files || []))}
              />
              <p className="text-sm text-muted-foreground mt-2">{images.length} image(s) selected</p>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create Ad"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
