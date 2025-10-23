"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { loadDB, getUser, getAd } from "@/lib/local-db"
import { MessageSquare, Eye } from "lucide-react"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"

export default function AdminMessagesPage() {
  const threads = useMemo(() => {
    const db = loadDB()
    return db.threads.sort((a, b) => b.last_message_at - a.created_at)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Message Monitoring</h1>
        <p className="text-muted-foreground mt-1">View all conversations for moderation</p>
      </div>

      {/* Thread List */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#00FFFF]" />
            {threads.length} Active {threads.length === 1 ? "Conversation" : "Conversations"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {threads.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No conversations yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {threads.map((thread) => {
                const customer = getUser(thread.customer_id)
                const vendor = getUser(thread.vendor_id)
                const ad = getAd(thread.ad_id)
                const db = loadDB()
                const messageCount = db.messages.filter((m) => m.thread_id === thread.id).length

                return (
                  <div
                    key={thread.id}
                    className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#00FFFF]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{ad?.title || "Deleted ad"}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                          <span>👤 Customer: {customer?.name || "Unknown"}</span>
                          <span>•</span>
                          <span>🔧 Vendor: {vendor?.name || "Unknown"}</span>
                        </div>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <Badge variant="outline" className="border-[#00FFFF]/50 text-[#00FFFF]">
                            {messageCount} messages
                          </Badge>
                          <span>Last activity: {formatDateTime(thread.last_message_at || thread.created_at)}</span>
                        </div>
                      </div>

                      <Link href={`/messages/${thread.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#00FFFF]/50 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

