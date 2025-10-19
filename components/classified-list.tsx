"use client"

import { useMemo, useState } from "react"
import { getCategories, listClassifieds } from "@/lib/local-db"
import { ClassifiedCard } from "./classified-card"

export default function ClassifiedList() {
  const categories = getCategories()
  const [q, setQ] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest")

  const items = useMemo(() => listClassifieds({ q, category, sort }), [q, category, sort])

  return (
    <main className="container mx-auto max-w-5xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-pretty">Classified Listings</h1>
        <p className="text-sm text-muted-foreground">Vendors can showcase their best products here.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search classifieds"
          className="rounded-md border bg-background px-3 py-2"
          aria-label="Search classifieds"
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="rounded-md border bg-background px-3 py-2"
          aria-label="Sort classifieds"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <ClassifiedCard key={item.id} item={item} />
        ))}
        {items.length === 0 && <div className="text-sm text-muted-foreground">No classifieds yet.</div>}
      </div>
    </main>
  )
}
