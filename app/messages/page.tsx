"use client"

import Link from "next/link"
import { useCurrentUser, useThreads } from "@/hooks/use-local"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAd } from "@/lib/local-db"
import { formatDateTime } from "@/lib/utils"

export default function MessagesPage() {
  const { data: user } = useCurrentUser()
  const { data: threads } = useThreads(user?.id)

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {threads?.map((t) => {
              const ad = getAd(t.ad_id)
              return (
                <li key={t.id} className="py-3">
                  <Link href={`/messages/${t.id}`} className="underline underline-offset-4">
                    {ad?.title ?? "Ad"} — {formatDateTime(t.created_at)}
                  </Link>
                </li>
              )
            })}
            {!threads?.length && <p className="text-sm text-muted-foreground">No conversations yet.</p>}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
