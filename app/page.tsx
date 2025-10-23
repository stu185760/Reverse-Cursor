import { Hero } from "@/components/hero"
import { CategoryShowcase } from "@/components/category-showcase"
import { CraftsmanshipSection } from "@/components/craftsmanship-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PWADownloadSection } from "@/components/pwa-download-section"
import { AdList } from "@/components/ad-list"

export default function Page() {
  return (
    <main className="bg-[#0D0D0D]">
      <Hero />
      <CategoryShowcase />
      <CraftsmanshipSection />
      <PWADownloadSection />
      <TestimonialsSection />
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Recent <span className="text-[#00FFFF]">Requests</span>
        </h2>
        <AdList />
      </section>
    </main>
  )
}
