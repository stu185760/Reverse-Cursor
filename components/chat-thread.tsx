"use client"

import { useState } from "react"
import { useMessages, useCurrentUser, refreshMessages } from "@/hooks/use-local"
import { sendMessage, getThread, getUser } from "@/lib/local-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/utils"

export function ChatThread({ threadId }: { threadId: string }) {
  const { data: msgs } = useMessages(threadId)
  const { data: user } = useCurrentUser()
  const [text, setText] = useState("")
  const thread = getThread(threadId)
  const other = user?.id === thread?.customer_id ? getUser(thread!.vendor_id) : getUser(thread!.customer_id)

  if (!thread) return <p className="text-muted-foreground">Thread not found.</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat with {other?.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-80 overflow-auto rounded-md border p-3 bg-card">
          <ul className="space-y-2">
            {msgs?.map((m) => {
              const mine = m.sender_id === user?.id
              return (
                <li key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-3 py-2 rounded-md text-sm ${mine ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <div>{m.text}</div>
                    <div className="text-[10px] opacity-70 mt-1">{formatTime(m.timestamp)}</div>
                  </div>
                </li>
              )
            })}
            {!msgs?.length && <p className="text-muted-foreground text-sm">No messages yet.</p>}
          </ul>
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!text.trim()) return
            sendMessage(threadId, text.trim())
            setText("")
            refreshMessages(threadId)
          }}
        >
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  )
}
