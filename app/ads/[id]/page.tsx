import { AdDetail } from "@/components/ad-detail"

export default function AdDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-4">
      <AdDetail adId={params.id} />
    </main>
  )
}
