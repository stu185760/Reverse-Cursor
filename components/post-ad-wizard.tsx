"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createAd, getCategories, getCurrentUser } from "@/lib/local-db"
import { refreshAds } from "@/hooks/use-local"
import ImageUpload from "@/components/image-upload"
import LocationSelect from "@/components/location-select"

type Step = 1 | 2 | 3 | 4

export function PostAdWizard() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const categories = getCategories()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<string | undefined>()
  const [location, setLocation] = useState("Mumbai")
  const [priceFrom, setPriceFrom] = useState<string>("")
  const [priceTo, setPriceTo] = useState<string>("")
  const [uploads, setUploads] = useState<string[]>([])
  const images = uploads.slice(0, 8)

  if (getCurrentUser()?.role !== "customer") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Post an Ad</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Please switch to the Customer role to post.</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post an Ad</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Category</span>
          <span>→</span>
          <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Details</span>
          <span>→</span>
          <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Images</span>
          <span>→</span>
          <span className={step >= 4 ? "font-medium" : "text-muted-foreground"}>Preview</span>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!category}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loc">Location</Label>
              {/* using a select with Indian cities first and global majors */}
              <LocationSelect
                id="loc"
                value={location}
                onChange={setLocation}
                className="rounded-md border bg-background px-3 py-2"
                aria-label="Select location"
              />
            </div>
            <div className="space-y-2">
              <Label>Price range (optional)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="price-from" className="text-xs text-muted-foreground">
                    From
                  </Label>
                  <Input
                    id="price-from"
                    type="number"
                    min={0}
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    placeholder="e.g. 1000"
                  />
                </div>
                <div>
                  <Label htmlFor="price-to" className="text-xs text-muted-foreground">
                    To
                  </Label>
                  <Input
                    id="price-to"
                    type="number"
                    min={0}
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Leave blank if you don’t have a range.</p>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!title || !description}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Upload images</Label>
              <ImageUpload value={uploads} onChange={(next) => setUploads(next.slice(0, 8))} />
              <p className="text-xs text-muted-foreground">Add up to 8 images. JPG/PNG supported.</p>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)}>Next</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {images.length ? (
                  images.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={src || "/placeholder.svg"} alt={`Preview ${i + 1}`} className="rounded border" />
                  ))
                ) : (
                  <div className="rounded-md border aspect-video bg-muted" aria-hidden="true" />
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                onClick={() => {
                  try {
                    const pf = priceFrom.trim() ? Number(priceFrom) : undefined
                    const pt = priceTo.trim() ? Number(priceTo) : undefined
                    const ad = createAd({
                      title,
                      description,
                      category: category!,
                      images,
                      location,
                      price_from: isNaN(pf as any) ? undefined : pf,
                      price_to: isNaN(pt as any) ? undefined : pt,
                    })
                    refreshAds()
                    router.push(`/ads/${ad.id}`)
                  } catch (e: any) {
                    alert(e?.message ?? "Failed to publish")
                  }
                }}
              >
                Publish
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
