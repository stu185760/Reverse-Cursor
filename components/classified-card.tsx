import type { Classified } from "@/lib/local-db"

export function ClassifiedCard({ item }: { item: Classified }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <div className="mt-2 text-xs text-muted-foreground">
            <span className="mr-2">Category: {item.category}</span>
            {item.price != null && <span>Price: {item.price}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
