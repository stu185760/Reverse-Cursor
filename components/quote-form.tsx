"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createQuote, getCurrentUser } from "@/lib/local-db"
import { validateQuoteInput, checkRateLimit, VALIDATION_LIMITS } from "@/lib/validation"

type Props = {
  adId: string
  onSuccess?: () => void
}

export function QuoteForm({ adId, onSuccess }: Props) {
  const [priceInr, setPriceInr] = useState("")
  const [deliveryDays, setDeliveryDays] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const user = getCurrentUser()

  if (!user || user.role !== "vendor") {
    return (
      <Card className="glass-card border-[#2a2a2a]">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Only vendors can submit quotes.</p>
        </CardContent>
      </Card>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const price = Number.parseInt(priceInr)
      const days = Number.parseInt(deliveryDays)

      // Quick validation for performance
      if (isNaN(price) || price <= 0) {
        throw new Error("Please enter a valid price")
      }
      if (isNaN(days) || days <= 0) {
        throw new Error("Please enter valid delivery days")
      }
      if (!message.trim() || message.length < 10) {
        throw new Error("Please provide a detailed message (at least 10 characters)")
      }

      createQuote({
        ad_id: adId,
        price_inr: price,
        delivery_days: days,
        message: message.trim(),
      })

      // Reset form
      setPriceInr("")
      setDeliveryDays("")
      setMessage("")

      onSuccess?.()
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Failed to submit quote"
      setError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="glass-card border-[#00FFFF]/30">
      <CardHeader>
        <CardTitle className="text-[#00FFFF]">Submit Your Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Your Price (₹)</Label>
              <Input
                id="price"
                type="number"
                min={1}
                value={priceInr}
                onChange={(e) => setPriceInr(e.target.value)}
                placeholder="e.g. 5000"
                required
                className="bg-[#1a1a1a] border-[#2a2a2a]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery">Delivery Time (days)</Label>
              <Input
                id="delivery"
                type="number"
                min={1}
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                placeholder="e.g. 7"
                required
                className="bg-[#1a1a1a] border-[#2a2a2a]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Offer Details (max {VALIDATION_LIMITS.MESSAGE_MAX} characters)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= VALIDATION_LIMITS.MESSAGE_MAX) {
                  setMessage(e.target.value)
                }
              }}
              placeholder="Describe your offer, materials, process, or any relevant details..."
              rows={5}
              required
              className="bg-[#1a1a1a] border-[#2a2a2a]"
            />
            <p className="text-xs text-muted-foreground">
              {message.length}/{VALIDATION_LIMITS.MESSAGE_MAX} - Explain what you'll deliver, your approach, and why you're the best fit.
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/50 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold"
            aria-label="Submit your quote"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Submit Quote"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

