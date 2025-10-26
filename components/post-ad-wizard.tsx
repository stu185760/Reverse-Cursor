"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ALL_LOCATIONS } from "@/lib/locations"

const CATEGORIES = [
  { name: "Jewelry", icon: "💍", description: "Custom jewelry, rings, necklaces" },
  { name: "Footwear", icon: "👟", description: "Handcrafted shoes and boots" },
  { name: "Clothing", icon: "👔", description: "Custom garments and embroidery" },
  { name: "Furniture", icon: "🪑", description: "Bespoke furniture pieces" },
  { name: "Automobile", icon: "🚗", description: "Car modifications and customization" },
  { name: "Gifting", icon: "🎁", description: "Personalized gifts and hampers" },
  { name: "Home Decor", icon: "🏠", description: "Interior decoration items" },
  { name: "Electronics", icon: "📱", description: "Custom tech and gadgets" },
  { name: "Art & Craft", icon: "🎨", description: "Paintings, sculptures, crafts" },
  { name: "Food & Bakery", icon: "🍰", description: "Custom cakes, catering" },
  { name: "Photography", icon: "📸", description: "Photo shoots, editing" },
  { name: "Printing", icon: "🖨️", description: "Custom prints, banners, cards" },
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
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<AdFormData>({
    category: "",
    title: "",
    description: "",
    location: "",
    budget_min: 0,
    budget_max: 0,
    images: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1 && !formData.category) {
      newErrors.category = "Please select a category"
    }

    if (step === 2) {
      if (!formData.title.trim()) {
        newErrors.title = "Title is required"
      }
      if (!formData.description.trim()) {
        newErrors.description = "Description is required"
      }
      if (formData.description.length < 20) {
        newErrors.description = "Description must be at least 20 characters"
      }
    }

    if (step === 3) {
      if (!formData.location) {
        newErrors.location = "Location is required"
      }
      if (formData.budget_min <= 0) {
        newErrors.budget_min = "Minimum budget must be greater than 0"
      }
      if (formData.budget_max <= 0) {
        newErrors.budget_max = "Maximum budget must be greater than 0"
      }
      if (formData.budget_min > formData.budget_max) {
        newErrors.budget_min = "Minimum cannot be greater than maximum"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setErrors({})
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (validateStep()) {
      await onSubmit(formData)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {["Category", "Details", "Budget & Location", "Images", "Review"].map((label, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${
                  step > idx + 1
                    ? "bg-primary text-primary-foreground"
                    : step === idx + 1
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > idx + 1 ? "✓" : idx + 1}
              </div>
              <span className="text-xs text-center hidden md:block">{label}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Category Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">What do you need?</h2>
            <p className="text-muted-foreground">Select the category that best matches your requirement</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Card
                key={cat.name}
                className={`p-4 cursor-pointer transition-all hover:border-primary hover:shadow-lg ${
                  formData.category === cat.name ? "border-primary border-2 shadow-lg bg-primary/5" : ""
                }`}
                onClick={() => setFormData({ ...formData, category: cat.name })}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <div className="font-semibold mb-1">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">{cat.description}</div>
                </div>
              </Card>
            ))}
          </div>

          {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}

          <div className="flex justify-end">
            <Button onClick={nextStep} size="lg">
              Next Step →
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Basic Details */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Describe your requirement</h2>
            <p className="text-muted-foreground">Provide clear details to attract the right vendors</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Custom Wedding Jewelry Design Needed"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what you need in detail. Include:
- What you want made
- Specific requirements or preferences
- Any reference designs or inspirations
- Timeline expectations"
                rows={8}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={errors.description ? "border-red-500" : ""}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {formData.description.length} characters (minimum 20)
              </p>
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline" size="lg">
              ← Back
            </Button>
            <Button onClick={nextStep} size="lg">
              Next Step →
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Budget & Location */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Budget & Location</h2>
            <p className="text-muted-foreground">Help vendors understand your budget and location</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                <SelectTrigger className={errors.location ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget_min">Minimum Budget (₹) *</Label>
                <Input
                  id="budget_min"
                  type="number"
                  placeholder="5000"
                  value={formData.budget_min || ""}
                  onChange={(e) => setFormData({ ...formData, budget_min: Number(e.target.value) })}
                  className={errors.budget_min ? "border-red-500" : ""}
                />
                {errors.budget_min && <p className="text-sm text-red-600 mt-1">{errors.budget_min}</p>}
              </div>

              <div>
                <Label htmlFor="budget_max">Maximum Budget (₹) *</Label>
                <Input
                  id="budget_max"
                  type="number"
                  placeholder="15000"
                  value={formData.budget_max || ""}
                  onChange={(e) => setFormData({ ...formData, budget_max: Number(e.target.value) })}
                  className={errors.budget_max ? "border-red-500" : ""}
                />
                {errors.budget_max && <p className="text-sm text-red-600 mt-1">{errors.budget_max}</p>}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>💡 Tip:</strong> Set a realistic budget range. Vendors will submit quotes within this range.
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline" size="lg">
              ← Back
            </Button>
            <Button onClick={nextStep} size="lg">
              Next Step →
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Images */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Add Reference Images</h2>
            <p className="text-muted-foreground">Upload photos to show vendors what you're looking for (optional)</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="images">Upload Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files || []) })}
              />
              <p className="text-sm text-muted-foreground mt-2">
                {formData.images.length > 0
                  ? `${formData.images.length} image(s) selected`
                  : "No images selected (you can skip this step)"}
              </p>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((file, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline" size="lg">
              ← Back
            </Button>
            <Button onClick={nextStep} size="lg">
              Review & Submit →
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Review Your Request</h2>
            <p className="text-muted-foreground">Make sure everything looks good before publishing</p>
          </div>

          <Card className="p-6 space-y-4">
            <div>
              <Label className="text-muted-foreground">Category</Label>
              <p className="font-semibold text-lg">
                {CATEGORIES.find((c) => c.name === formData.category)?.icon} {formData.category}
              </p>
            </div>

            <div>
              <Label className="text-muted-foreground">Title</Label>
              <p className="font-semibold">{formData.title}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Description</Label>
              <p className="whitespace-pre-wrap">{formData.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Location</Label>
                <p className="font-semibold">📍 {formData.location}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Budget</Label>
                <p className="font-semibold">
                  ₹{formData.budget_min.toLocaleString("en-IN")} - ₹{formData.budget_max.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div>
                <Label className="text-muted-foreground">Images</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {formData.images.map((file, idx) => (
                    <div key={idx} className="aspect-square rounded overflow-hidden border">
                      <img src={URL.createObjectURL(file)} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline" size="lg" disabled={loading}>
              ← Back
            </Button>
            <Button onClick={handleSubmit} size="lg" disabled={loading}>
              {loading ? "Publishing..." : "Publish Request ✓"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

