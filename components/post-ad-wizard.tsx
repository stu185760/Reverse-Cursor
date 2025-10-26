"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ALL_LOCATIONS } from "@/lib/locations"

const CATEGORIES = [
  "Jewelry",
  "Footwear", 
  "Clothing",
  "Furniture",
  "Automobile",
  "Gifting",
  "Others"
]

interface PostAdWizardProps {
  onSubmit: (data: AdFormData) => Promise<void>
  loading: boolean
}

export interface AdFormData {
  category: string
  title: string
  description: string
  location: string
  budget_min: number
  budget_max: number
  images: File[]
}

export function PostAdWizard({ onSubmit, loading }: PostAdWizardProps) {
  const [formData, setFormData] = useState<AdFormData>({
    category: "",
    title: "",
    description: "",
    location: "",
    budget_min: 0,
    budget_max: 0,
    images: [],
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return // Prevent double submission
    
    setError("")
    
    // Validation
    if (!formData.category) {
      setError("Please select a category")
      return
    }
    if (!formData.title.trim()) {
      setError("Please enter a title")
      return
    }
    if (!formData.description.trim() || formData.description.length < 20) {
      setError("Description must be at least 20 characters")
      return
    }
    if (!formData.location) {
      setError("Please select a location")
      return
    }
    if (formData.budget_min <= 0 || formData.budget_max <= 0) {
      setError("Budget must be greater than 0")
      return
    }
    if (formData.budget_min > formData.budget_max) {
      setError("Minimum budget cannot be greater than maximum budget")
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (err: any) {
      setError(err.message || "Failed to create ad")
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Post Your Requirement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Category Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Custom Wedding Jewelry Design Needed"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what you need in detail. Include:
- What you want made
- Specific requirements or preferences
- Any reference designs or inspirations
- Timeline expectations"
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              {formData.description.length} characters (minimum 20 required)
            </p>
          </div>

          {/* Location Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => setFormData({ ...formData, location: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {ALL_LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    📍 {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget_min">Minimum Budget (₹) *</Label>
              <Input
                id="budget_min"
                type="number"
                placeholder="5000"
                value={formData.budget_min || ""}
                onChange={(e) => setFormData({ ...formData, budget_min: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget_max">Maximum Budget (₹) *</Label>
              <Input
                id="budget_max"
                type="number"
                placeholder="15000"
                value={formData.budget_max || ""}
                onChange={(e) => setFormData({ ...formData, budget_max: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label htmlFor="images">Reference Images (Optional)</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files || []) })}
            />
            <p className="text-sm text-muted-foreground">
              {formData.images.length > 0 
                ? `${formData.images.length} image(s) selected` 
                : "Upload photos to help vendors understand your requirement"}
            </p>
          </div>

          {/* Image Previews */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {formData.images.map((file, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-border">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={loading || isSubmitting} 
              className="w-full h-12 text-lg"
            >
              {loading || isSubmitting ? (
                <>
                  <span className="mr-2">⏳</span> Publishing Your Request...
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span> Publish Request & Get Quotes
                </>
              )}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Your request will be visible to verified vendors in your selected location
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
