"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Sparkles } from "lucide-react"
import { createAd, getCurrentUser } from "@/lib/local-db"
import { validateAdInput, VALIDATION_LIMITS } from "@/lib/validation"
import { ALL_LOCATIONS } from "@/lib/locations"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CategoryPostSectionProps {
  categorySlug: string
  categoryName: string
}

export function CategoryPostSection({ categorySlug, categoryName }: CategoryPostSectionProps) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priceFrom, setPriceFrom] = useState("")
  const [priceTo, setPriceTo] = useState("")
  const [location, setLocation] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const user = getCurrentUser()
  const locations = ALL_LOCATIONS

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return // Prevent double submission
    
    if (!user) {
      alert("Please login to post a request")
      router.push("/auth/login")
      return
    }

    // Validate inputs
    const validation = validateAdInput({ title, description })
    if (!validation.valid) {
      setValidationErrors(validation.errors)
      return
    }

    try {
      setIsSubmitting(true)
      setValidationErrors({})

      const ad = createAd({
        title: validation.sanitized!.title,
        description: validation.sanitized!.description,
        category: categorySlug,
        images: [],
        location: location || "All India",
        price_from: priceFrom ? Number.parseInt(priceFrom) : undefined,
        price_to: priceTo ? Number.parseInt(priceTo) : undefined,
      })

      // Reset form
      setTitle("")
      setDescription("")
      setPriceFrom("")
      setPriceTo("")
      setLocation("")

      // Show success and redirect
      alert("✅ Your request has been posted! Vendors will start submitting quotes soon.")
      router.push(`/ads/${ad.id}`)
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Failed to post request"
      alert(`❌ ${error}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="glass-card border-[#7A00FF]/50 sticky top-20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[#7A00FF]/20 flex items-center justify-center">
            <Plus className="w-5 h-5 text-[#7A00FF]" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-white flex items-center gap-2">
              Post Your Request
              <Sparkles className="w-4 h-4 text-[#00FFFF]" />
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-gray-400">
          Looking for custom {categoryName.toLowerCase()}? Post your requirements and get competitive quotes from skilled vendors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-gray-300">
              What do you need? <span className="text-red-400">*</span>
            </Label>
            <Input
              id="title"
              placeholder={`e.g., Custom ${categoryName} for wedding`}
              value={title}
              onChange={(e) => {
                if (e.target.value.length <= VALIDATION_LIMITS.TITLE_MAX) {
                  setTitle(e.target.value)
                  setValidationErrors((prev) => ({ ...prev, title: "" }))
                }
              }}
              className={`bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500 ${
                validationErrors.title ? "border-red-500" : ""
              }`}
              aria-invalid={!!validationErrors.title}
            />
            {validationErrors.title && (
              <p className="text-sm text-red-400 mt-1">{validationErrors.title}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {title.length}/{VALIDATION_LIMITS.TITLE_MAX}
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-300">
              Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your requirements in detail..."
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= VALIDATION_LIMITS.DESCRIPTION_MAX) {
                  setDescription(e.target.value)
                  setValidationErrors((prev) => ({ ...prev, description: "" }))
                }
              }}
              className={`bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500 min-h-[100px] ${
                validationErrors.description ? "border-red-500" : ""
              }`}
              aria-invalid={!!validationErrors.description}
            />
            {validationErrors.description && (
              <p className="text-sm text-red-400 mt-1">{validationErrors.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {description.length}/{VALIDATION_LIMITS.DESCRIPTION_MAX}
            </p>
          </div>

          {/* Budget Range */}
          <div>
            <Label className="text-gray-300">Budget Range (₹)</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Input
                type="number"
                placeholder="Min"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-gray-300">
              Location
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc} className="text-white hover:bg-[#2a2a2a]">
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !title || !description}
            className="w-full bg-gradient-to-r from-[#00FFFF] to-[#7A00FF] hover:opacity-90 text-black font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post Request"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Your request will be visible to all vendors in the {categoryName} category
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

