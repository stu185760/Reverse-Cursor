import { Hero } from "@/components/hero"
import { CategoryShowcase } from "@/components/category-showcase"
import { CraftsmanshipSection } from "@/components/craftsmanship-section"
import { AdList } from "@/components/ad-list"

export default function Page() {
  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <CraftsmanshipSection />
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Recent Requests</h2>
        <AdList />
      </section>
    </main>
  )
}
