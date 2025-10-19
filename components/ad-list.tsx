"use client"

import { useState } from "react"
import { useAds } from "@/hooks/use-local"
import { getCategories } from "@/lib/local-db"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdCard } from "./ad-card"

export function AdList({ initialCategory }: { initialCategory?: string }) {
  const [q, setQ] = useState("")
  const [category, setCategory] = useState<string>(initialCategory ?? "all")
  const effectiveCategory = category === "all" ? undefined : category
  const { data: ads } = useAds({ q, category: effectiveCategory })
  const categories = getCategories()

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            placeholder="Search by keyword..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={category} onValueChange={(v) => setCategory(v)}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {ads?.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
        {!ads?.length && <p className="text-muted-foreground">No ads found.</p>}
      </div>
    </section>
  )
}
