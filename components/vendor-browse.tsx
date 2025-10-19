"use client"

import { useMemo, useState } from "react"
import { getCategories, listAds } from "@/lib/local-db"
import LocationSelect from "@/components/location-select"
import { AdCard } from "@/components/ad-card"

export default function VendorBrowse() {
  const categories = getCategories()
  const [q, setQ] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [sort, setSort] = useState<"newest" | "budget-asc" | "budget-desc">("newest")
  const [location, setLocation] = useState<string>("all")

  const items = useMemo(() => listAds({ q, category, sort, location }), [q, category, sort, location])

  return (
    <main className="container mx-auto max-w-5xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-pretty">Browse Customer Requests</h1>
        <p className="text-sm text-muted-foreground">
          Search, filter by category, and sort to find the best-fit leads.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or description"
          className="md:col-span-1 rounded-md border bg-background px-3 py-2"
          aria-label="Search ads"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border bg-background px-3 py-2"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <LocationSelect
          value={location}
          onChange={setLocation}
          includeAll
          className="rounded-md border bg-background px-3 py-2"
          aria-label="Filter by location"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="rounded-md border bg-background px-3 py-2"
          aria-label="Sort results"
        >
          <option value="newest">Newest</option>
          <option value="budget-asc">Budget: Low to High</option>
          <option value="budget-desc">Budget: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">No results. Try adjusting your search or filters.</p>
      )}
    </main>
  )
}
