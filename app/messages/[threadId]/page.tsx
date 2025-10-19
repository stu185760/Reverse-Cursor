import { ChatThread } from "@/components/chat-thread"

export default function ThreadPage({ params }: { params: { threadId: string } }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <ChatThread threadId={params.threadId} />
    </main>
  )
}
