"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDateTime } from "@/lib/utils"
import { type Quote, getUser, getCurrentUser, updateQuoteStatus, getAd } from "@/lib/local-db"
import Link from "next/link"
import { MessageCircle, Clock, DollarSign, CheckCircle2, XCircle } from "lucide-react"
import { useState } from "react"

type Props = {
  quote: Quote
  showActions?: boolean
  onUpdate?: () => void
}

export function QuoteCard({ quote, showActions = true, onUpdate }: Props) {
  const [isProcessing, setIsProcessing] = useState(false)
  const vendor = getUser(quote.vendor_id)
  const currentUser = getCurrentUser()
  const ad = getAd(quote.ad_id)
  
  const isOwner = currentUser && ad && currentUser.id === ad.owner_id
  const canAcceptReject = isOwner && quote.status === "pending" && showActions

  const handleStatusUpdate = async (newStatus: "accepted" | "rejected") => {
    if (!confirm(`Are you sure you want to ${newStatus === "accepted" ? "accept" : "reject"} this quote?`)) {
      return
    }

    setIsProcessing(true)
    try {
      updateQuoteStatus(quote.id, newStatus)
      onUpdate?.()
    } catch (error: any) {
      alert(error.message || "Failed to update quote")
    } finally {
      setIsProcessing(false)
    }
  }

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    accepted: "bg-green-500/20 text-green-400 border-green-500/50",
    rejected: "bg-red-500/20 text-red-400 border-red-500/50",
    withdrawn: "bg-gray-500/20 text-gray-400 border-gray-500/50",
  }

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    accepted: <CheckCircle2 className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
    withdrawn: <XCircle className="w-4 h-4" />,
  }

  return (
    <Card className="glass-card border-[#2a2a2a] hover:border-[#00FFFF]/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white">{vendor?.name || "Vendor"}</h3>
              {vendor?.verified && (
                <Badge variant="outline" className="border-[#00FFFF] text-[#00FFFF] text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{formatDateTime(quote.created_at)}</p>
          </div>
          <Badge className={statusColors[quote.status]}>
            {statusIcons[quote.status]}
            <span className="ml-1 capitalize">{quote.status}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <DollarSign className="w-5 h-5 text-[#00FFFF] mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-lg font-bold text-[#00FFFF]">{formatCurrency(quote.price_inr)}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <Clock className="w-5 h-5 text-[#7A00FF] mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Delivery</p>
              <p className="text-lg font-bold text-[#7A00FF]">{quote.delivery_days} days</p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{quote.message}</p>
        </div>
      </CardContent>

      {(canAcceptReject || quote.thread_id) && (
        <CardFooter className="flex gap-2 pt-0">
          {canAcceptReject && (
            <>
              <Button
                onClick={() => handleStatusUpdate("accepted")}
                disabled={isProcessing}
                className="flex-1 bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold"
              >
                Accept Quote
              </Button>
              <Button
                onClick={() => handleStatusUpdate("rejected")}
                disabled={isProcessing}
                variant="outline"
                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                Reject
              </Button>
            </>
          )}
          {quote.thread_id && (
            <Link href={`/messages/${quote.thread_id}`} className="flex-1">
              <Button variant="outline" className="w-full border-[#7A00FF]/50 text-[#7A00FF] hover:bg-[#7A00FF]/10">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </Link>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

