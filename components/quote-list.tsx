"use client"

import { type Quote } from "@/lib/local-db"
import { QuoteCard } from "./quote-card"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  quotes: Quote[]
  showActions?: boolean
  onUpdate?: () => void
}

export function QuoteList({ quotes, showActions, onUpdate }: Props) {
  if (quotes.length === 0) {
    return (
      <Card className="glass-card border-[#2a2a2a]">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Quotes Yet</h3>
            <p className="text-sm text-muted-foreground">
              {showActions 
                ? "Be the first to submit a quote for this request!"
                : "Quotes will appear here once vendors respond."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Sort quotes: pending first, then accepted, then rejected/withdrawn
  const sortedQuotes = [...quotes].sort((a, b) => {
    const statusOrder = { pending: 0, accepted: 1, rejected: 2, withdrawn: 3 }
    return statusOrder[a.status] - statusOrder[b.status] || b.created_at - a.created_at
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {quotes.length} {quotes.length === 1 ? "Quote" : "Quotes"} Received
        </h3>
        <div className="flex gap-2 text-xs">
          {quotes.filter((q) => q.status === "pending").length > 0 && (
            <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
              {quotes.filter((q) => q.status === "pending").length} Pending
            </span>
          )}
          {quotes.filter((q) => q.status === "accepted").length > 0 && (
            <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">
              {quotes.filter((q) => q.status === "accepted").length} Accepted
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {sortedQuotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} showActions={showActions} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  )
}

