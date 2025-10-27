import { Hero } from "@/components/hero"
import { CategoryShowcase } from "@/components/category-showcase"
import { TestimonialsSection } from "@/components/testimonials-section"
import { RecentAds } from "@/components/recent-ads"
import { PWADownloadSection } from "@/components/pwa-download-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryShowcase />
      <TestimonialsSection />
      <RecentAds />
      <PWADownloadSection />
    </main>
  )
}
