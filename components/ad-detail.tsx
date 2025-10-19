"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { getAd, getCategories, getUser, getCurrentUser, respondToAd, flagItem, deleteAd } from "@/lib/local-db"
import { useCurrentUser } from "@/hooks/use-local"
import { formatDateTime } from "@/lib/utils"

export function AdDetail({ adId }: { adId: string }) {
  const ad = useMemo(() => getAd(adId), [adId])
  const cat = ad ? getCategories().find((c) => c.slug === ad.category) : undefined
  const owner = ad?.owner_id ? getUser(ad.owner_id) : undefined
  const { data: user } = useCurrentUser()
  const router = useRouter()
  const [message, setMessage] = useState("Hi! I can help with this. Here’s a brief proposal...")

  if (!ad) return <p className="text-muted-foreground">Ad not found.</p>

  const canRespond = user?.role === "vendor" && ad.status === "open"
  const canFlag = !!user

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3">
            <span>{ad.title}</span>
            <Badge variant="secondary">{cat?.name ?? ad.category}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">
            Posted by {owner?.name} • {formatDateTime(ad.created_at)}
          </div>
          {typeof ad.price_from !== "undefined" || typeof ad.price_to !== "undefined" ? (
            <div className="text-sm">
              Budget range:{" "}
              <span className="font-medium">
                {typeof ad.price_from !== "undefined" ? ad.price_from : "—"} to{" "}
                {typeof ad.price_to !== "undefined" ? ad.price_to : "—"}
              </span>
            </div>
          ) : null}
          <p className="whitespace-pre-wrap">{ad.description}</p>
          {ad.images?.length ? (
            <div className="grid grid-cols-2 gap-2">
              {ad.images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src || "/placeholder.svg"} alt={`Ad image ${i + 1}`} className="rounded-md border" />
              ))}
            </div>
          ) : (
            <div className="rounded-md border aspect-video bg-muted" aria-hidden="true" />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Take action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {canRespond ? (
            <>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
              <Button
                onClick={() => {
                  try {
                    const { thread } = respondToAd(ad.id, message)
                    router.push(`/messages/${thread.id}`)
                  } catch (e: any) {
                    alert(e?.message ?? "Failed to respond")
                  }
                }}
              >
                Respond
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              {getCurrentUser()?.role === "customer"
                ? "You are signed in as a Customer."
                : "Sign in as a Vendor to respond."}
            </p>
          )}
          {canFlag && (
            <Button
              variant="outline"
              onClick={() => {
                const reason = prompt("Reason for flagging this ad?") || "inappropriate"
                flagItem("ad", ad.id, reason)
                alert("Thanks for the report. Our team will review.")
              }}
            >
              Flag
            </Button>
          )}
          {(user?.id === ad.owner_id || user?.role === "admin") && (
            <Button
              variant="destructive"
              onClick={() => {
                if (!confirm("Are you sure you want to delete this ad? This cannot be undone.")) return
                const ok = deleteAd(ad.id)
                if (ok) {
                  alert("Ad deleted.")
                  router.push("/ads")
                } else {
                  alert("Failed to delete the ad.")
                }
              }}
            >
              Delete ad
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
