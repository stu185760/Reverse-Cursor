import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Jewelry",
    description: "Custom designs and artisan pieces",
    image: "/bridal-jewelry.jpg",
    slug: "jewelry",
  },
  {
    name: "Footwear",
    description: "Handcrafted shoes and boots",
    image: "/ornate-loafers.webp",
    slug: "footwear",
  },
  {
    name: "Clothing",
    description: "Embroidered and custom garments",
    image: "/embroidered-fabric.jpg",
    slug: "clothing",
  },
  {
    name: "Automobiles",
    description: "Custom car modifications",
    image: "/red-automobile.jpg",
    slug: "automobile",
  },
  {
    name: "Gifting",
    description: "Personalized gift items",
    image: "/gifting-craft.jpg",
    slug: "gifting",
  },
  {
    name: "Furniture",
    description: "Bespoke furniture pieces",
    image: "/colorful-embroidery.jpg",
    slug: "furniture",
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Explore Our Categories</h2>
          <p className="text-lg text-slate-600">Find talented makers in every craft and category</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/categories/${category.slug}`}>
              <div className="group cursor-pointer h-full">
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-300">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center">{category.name}</h3>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-3">{category.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-slate-900 group-hover:text-white transition-colors bg-transparent"
                >
                  Explore & Post
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
