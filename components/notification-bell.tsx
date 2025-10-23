"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { loadDB, getCurrentUser } from "@/lib/local-db"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  
  const notifications = useMemo(() => {
    const user = getCurrentUser()
    if (!user) return []

    const db = loadDB()
    const notifs: Array<{ id: string; type: string; message: string; time: number; link?: string }> = []

    // For customers: new quotes on their ads
    if (user.role === "customer") {
      const myAds = db.ads.filter((a) => a.owner_id === user.id)
      myAds.forEach((ad) => {
        const quotes = db.quotes.filter(
          (q) => q.ad_id === ad.id && q.status === "pending"
        )
        quotes.forEach((q) => {
          const vendor = db.users.find((u) => u.id === q.vendor_id)
          notifs.push({
            id: q.id,
            type: "quote",
            message: `${vendor?.name || "Vendor"} sent a quote for "${ad.title}"`,
            time: q.created_at,
            link: `/ads/${ad.id}`,
          })
        })
      })

      // New messages
      const myThreads = db.threads.filter((t) => t.customer_id === user.id)
      myThreads.forEach((thread) => {
        const messages = db.messages
          .filter((m) => m.thread_id === thread.id && m.sender_id !== user.id)
          .slice(-1) // Get last message
        
        if (messages.length > 0) {
          const msg = messages[0]
          const vendor = db.users.find((u) => u.id === msg.sender_id)
          notifs.push({
            id: msg.id,
            type: "message",
            message: `${vendor?.name || "Vendor"} sent you a message`,
            time: msg.timestamp,
            link: `/messages/${thread.id}`,
          })
        }
      })
    }

    // For vendors: quote status updates, new messages
    if (user.role === "vendor") {
      const myQuotes = db.quotes.filter((q) => q.vendor_id === user.id)
      myQuotes.forEach((q) => {
        if (q.status === "accepted") {
          const ad = db.ads.find((a) => a.id === q.ad_id)
          notifs.push({
            id: q.id,
            type: "accepted",
            message: `Your quote for "${ad?.title || "an ad"}" was accepted! 🎉`,
            time: q.updated_at,
            link: `/ads/${q.ad_id}`,
          })
        }
      })

      // New messages
      const myThreads = db.threads.filter((t) => t.vendor_id === user.id)
      myThreads.forEach((thread) => {
        const messages = db.messages
          .filter((m) => m.thread_id === thread.id && m.sender_id !== user.id)
          .slice(-1)
        
        if (messages.length > 0) {
          const msg = messages[0]
          const customer = db.users.find((u) => u.id === msg.sender_id)
          notifs.push({
            id: msg.id,
            type: "message",
            message: `${customer?.name || "Customer"} sent you a message`,
            time: msg.timestamp,
            link: `/messages/${thread.id}`,
          })
        }
      })
    }

    // Sort by time (most recent first) and take last 10
    return notifs.sort((a, b) => b.time - a.time).slice(0, 10)
  }, [isOpen]) // Refresh when dropdown opens

  const unreadCount = notifications.length

  if (!getCurrentUser()) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative border-[#2a2a2a] hover:bg-[#1a1a1a]"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-[#1a1a1a] border-[#2a2a2a]">
        <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#2a2a2a]" />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No new notifications</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <DropdownMenuItem
                key={notif.id}
                asChild
                className="cursor-pointer focus:bg-[#2a2a2a]"
              >
                <Link
                  href={notif.link || "#"}
                  className="flex flex-col gap-1 p-3 hover:bg-[#2a2a2a]"
                  onClick={() => setIsOpen(false)}
                >
                  <p className="text-sm text-white">{notif.message}</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(notif.time)}</p>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

