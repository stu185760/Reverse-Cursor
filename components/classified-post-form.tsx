"use client"

import type React from "react"
import ImageUpload from "@/components/image-upload"
import { useState } from "react"
import { createClassified, getCategories, getCurrentUser } from "@/lib/local-db"

export default function ClassifiedPostForm() {
  const cats = getCategories()
  const user = getCurrentUser()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [category, setCategory] = useState(cats[0]?.slug || "others")
  const [createdId, setCreatedId] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return // Prevent double submission
    
    try {
      setIsSubmitting(true)
      const vendor_id = user?.id || "anon"
      const item = createClassified({
        title,
        description,
        price: typeof price === "number" ? price : undefined,
        images,
        vendor_id,
        category,
      })
      setCreatedId(item.id)
      setTitle("")
      setDescription("")
      setPrice("")
      setImages([])
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to post classified")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Post a Classified</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2"
            rows={4}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2"
            >
              {cats.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Price (optional)</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full rounded-md border bg-background px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Images</label>
          <ImageUpload value={images} onChange={(next) => setImages(next.slice(0, 8))} />
          <p className="text-xs text-muted-foreground mt-1">Add up to 8 images. JPG/PNG supported.</p>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="rounded-md bg-foreground px-4 py-2 text-background disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
        {createdId && (
          <p className="text-sm text-muted-foreground">
            Posted! View it in{" "}
            <a className="underline" href="/classifieds">
              Classifieds
            </a>
            .
          </p>
        )}
      </form>
    </main>
  )
}
