import { notFound } from "next/navigation"
import { getClassifiedsByCategory, getCategories } from "@/lib/local-db"
import { CategoryClassifieds } from "@/components/category-classifieds"
import { CategoryPostSection } from "@/components/category-post-section"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CategoryPageProps {
  params: {
    categorySlug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params
  
  // Get category details
  const categories = getCategories()
  const category = categories.find((c) => c.slug === categorySlug)
  
  if (!category) {
    notFound()
  }

  // Get classifieds for this category
  const classifieds = getClassifiedsByCategory(categorySlug)

  return (
    <main className="min-h-screen bg-[#0D0D0D] py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {category.name}
          </h1>
          <p className="text-gray-400 text-lg">
            Explore products and post your custom requirements
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side - Classifieds (60% on large screens) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <CategoryClassifieds 
              classifieds={classifieds} 
              categoryName={category.name}
            />
          </div>

          {/* Right Side - Post Form (40% on large screens) */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <CategoryPostSection 
              categorySlug={categorySlug}
              categoryName={category.name}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-[#00FFFF]/10 to-[#7A00FF]/10 border border-[#00FFFF]/20">
          <h3 className="text-xl font-semibold text-white mb-2">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <div className="font-semibold text-[#00FFFF] mb-1">1. Browse Products</div>
              <p>Explore featured {category.name.toLowerCase()} products from verified vendors</p>
            </div>
            <div>
              <div className="font-semibold text-[#7A00FF] mb-1">2. Post Your Request</div>
              <p>Need something custom? Post your requirements and get competitive quotes</p>
            </div>
            <div>
              <div className="font-semibold text-[#00FFFF] mb-1">3. Choose Best Vendor</div>
              <p>Compare quotes, check ratings, and select the perfect vendor for your project</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((category) => ({
    categorySlug: category.slug,
  }))
}

