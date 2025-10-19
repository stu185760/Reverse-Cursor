import { AdList } from "@/components/ad-list"

export default function AdsPage({ searchParams }: { searchParams?: { category?: string } }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Browse Requests</h1>
      <AdList initialCategory={searchParams?.category} />
    </main>
  )
}
