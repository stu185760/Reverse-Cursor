"use client"

import { useEffect, useState } from "react"
import { getAds } from "@/lib/supabase/database"
import type { Database } from "@/lib/supabase/database.types"
import Link from "next/link"

type Ad = Database["public"]["Tables"]["ads"]["Row"]

export function AdsListClient() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadAds() {
      try {
        const data = await getAds({ status: "active" })
        setAds(data.slice(0, 6)) // Show only 6 most recent
      } catch (err: any) {
        setError(err.message || "Failed to load ads")
      } finally {
        setLoading(false)
      }
    }
    loadAds()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (ads.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <h3 className="text-xl font-semibold mb-2">No ads yet</h3>
        <p className="text-gray-600 mb-4">
          Be the first to post a requirement!
        </p>
        <Link
          href="/post-ad"
          className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Post Now
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <Link
          key={ad.id}
          href={`/ads/${ad.id}`}
          className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-2">{ad.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {ad.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{ad.category}</span>
            {ad.budget_min && ad.budget_max && (
              <span className="font-medium">
                ₹{ad.budget_min} - ₹{ad.budget_max}
              </span>
            )}
          </div>
          <div className="mt-4 text-xs text-gray-400">
            {ad.location} • {new Date(ad.created_at).toLocaleDateString()}
          </div>
        </Link>
      ))}
    </div>
  )
}

