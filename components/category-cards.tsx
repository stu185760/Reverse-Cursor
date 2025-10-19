"use client"

import Link from "next/link"
import { Shirt, Footprints, Sofa, Car, Gem, Gift, MoreHorizontal } from "lucide-react"

const categories = [
  { name: "Clothing", icon: Shirt, color: "bg-blue-100 text-blue-600" },
  { name: "Footwear", icon: Footprints, color: "bg-purple-100 text-purple-600" },
  { name: "Furniture", icon: Sofa, color: "bg-amber-100 text-amber-600" },
  { name: "Automobile", icon: Car, color: "bg-red-100 text-red-600" },
  { name: "Jewelry", icon: Gem, color: "bg-pink-100 text-pink-600" },
  { name: "Gifting", icon: Gift, color: "bg-green-100 text-green-600" },
  { name: "Others", icon: MoreHorizontal, color: "bg-gray-100 text-gray-600" },
]

export default function CategoryCards() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Browse by Category</h2>
          <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={`/post-ad?category=${category.name}`} className="group">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center cursor-pointer hover:scale-105 transform">
                  <div
                    className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-2">Post a request</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
