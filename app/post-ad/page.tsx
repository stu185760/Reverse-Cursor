"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase/auth"
import { createAd } from "@/lib/supabase/database"
import { uploadImages } from "@/lib/supabase/storage"
import Link from "next/link"

const CATEGORIES = [
  "Wedding Services",
  "Photography",
  "Catering",
  "Event Planning",
  "Decoration",
  "Transportation",
  "Entertainment",
  "Other"
]

const LOCATIONS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad"
]

export default function PostAdPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget_min: "",
    budget_max: "",
    timeline: ""
  })

  const [images, setImages] = useState<File[]>([])

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }
    checkAuth()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return

    setError("")
    setSubmitting(true)

    try {
      console.log("=== STARTING AD SUBMISSION ===")
      console.log("User:", user)
      
      if (!user) throw new Error("Please log in to post an ad")

      // Upload images first (if any)
      let imageUrls: string[] = []
      if (images.length > 0) {
        console.log(`Uploading ${images.length} images...`)
        try {
          imageUrls = await uploadImages("ad-images", images, user.id)
          console.log("Images uploaded successfully:", imageUrls)
        } catch (imgError) {
          console.error("Image upload error:", imgError)
          throw new Error(`Failed to upload images: ${imgError}`)
        }
      }

      // Create ad data
      const adData = {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        budget_min: formData.budget_min ? parseFloat(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseFloat(formData.budget_max) : null,
        timeline: formData.timeline || null,
        images: imageUrls.length > 0 ? imageUrls : null,
        status: "active" as const
      }
      
      console.log("Creating ad with data:", adData)

      // Create ad
      const ad = await createAd(adData)
      
      console.log("Ad created successfully:", ad)
      console.log("Ad ID:", ad.id)
      console.log("=== AD SUBMISSION COMPLETE ===")

      // Show success message before redirect
      alert(`✅ Ad posted successfully! ID: ${ad.id}`)

      // Redirect to ad detail page
      router.push(`/ads/${ad.id}`)
    } catch (err: any) {
      console.error("=== ERROR POSTING AD ===")
      console.error("Error:", err)
      console.error("Error message:", err.message)
      console.error("Error stack:", err.stack)
      setError(err.message || "Failed to post ad. Check console for details.")
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to post an ad.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
          >
            Login
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Back to home
          </Link>
          <h1 className="text-3xl font-bold mt-4">Post a Requirement</h1>
          <p className="text-gray-600 mt-2">
            Tell vendors what you need and get quotes!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="E.g., Need wedding photographer in Mumbai"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your requirement in detail..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Location *
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select location</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Min Budget (₹)
              </label>
              <input
                type="number"
                value={formData.budget_min}
                onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Max Budget (₹)
              </label>
              <input
                type="number"
                value={formData.budget_max}
                onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Timeline
            </label>
            <input
              type="text"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="E.g., Within 2 weeks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Images (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                setImages(files)
              }}
              className="w-full border rounded-md px-4 py-2"
            />
            {images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {images.length} file(s) selected
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Posting..." : "Post Requirement"}
          </button>
        </form>
      </div>
    </div>
  )
}

