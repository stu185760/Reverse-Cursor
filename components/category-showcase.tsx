import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Jewelry",
    slug: "jewelry",
    description: "Custom designs and artisan pieces",
    image: "/placeholder.svg",
  },
  {
    name: "Footwear",
    slug: "footwear",
    description: "Handcrafted shoes and boots",
    image: "/placeholder.svg",
  },
  {
    name: "Clothing",
    slug: "clothing",
    description: "Embroidered and custom garments",
    image: "/placeholder.svg",
  },
  {
    name: "Automobiles",
    slug: "automobile",
    description: "Custom car modifications",
    image: "/placeholder.svg",
  },
  {
    name: "Gifting",
    slug: "gifting",
    description: "Personalized gift items",
    image: "/placeholder.svg",
  },
  {
    name: "Furniture",
    slug: "furniture",
    description: "Bespoke furniture pieces",
    image: "/placeholder.svg",
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Explore Our Categories</h2>
          <p className="text-xl text-muted-foreground">
            Find talented makers in every craft and category
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/categories/${category.slug}`}
              className="group"
            >
              <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Explore & Post
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

