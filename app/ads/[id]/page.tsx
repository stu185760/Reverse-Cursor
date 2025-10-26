"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getAdById } from "@/lib/supabase/database"
import type { Database } from "@/lib/supabase/database.types"
import Link from "next/link"

type Ad = Database["public"]["Tables"]["ads"]["Row"]

export default function AdDetailPage() {
  const params = useParams()
  const [ad, setAd] = useState<Ad | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAd() {
      try {
        const data = await getAdById(params.id as string)
        setAd(data)
      } catch (err) {
        console.error("Error loading ad:", err)
      } finally {
        setLoading(false)
      }
    }
    loadAd()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!ad) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col gap-4">
        <p className="text-xl">Ad not found</p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-blue-600 hover:underline mb-8 inline-block">
          ← Back to home
        </Link>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-4">
              {ad.status}
            </span>
            <h1 className="text-3xl font-bold mb-2">{ad.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📍 {ad.location}</span>
              <span>📂 {ad.category}</span>
              <span>📅 {new Date(ad.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {ad.images && ad.images.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                {ad.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Image ${i + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{ad.description}</p>
          </div>

          {(ad.budget_min || ad.budget_max) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Budget</h2>
              <p className="text-2xl font-bold">
                ₹{ad.budget_min?.toLocaleString()} - ₹{ad.budget_max?.toLocaleString()}
              </p>
            </div>
          )}

          {ad.timeline && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Timeline</h2>
              <p className="text-gray-700">{ad.timeline}</p>
            </div>
          )}

          <div className="border-t pt-6">
            <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800">
              Send Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

