"use client"

import { Classified } from "@/lib/local-db"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CategoryClassifiedsProps {
  classifieds: Classified[]
  categoryName: string
}

export function CategoryClassifieds({ classifieds, categoryName }: CategoryClassifiedsProps) {
  if (classifieds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-[#00FFFF]/10 flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-[#00FFFF]" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Products Yet</h3>
        <p className="text-gray-400 text-center max-w-md">
          No vendors have posted products in the {categoryName} category yet. Check back soon!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Featured Products</h2>
          <p className="text-gray-400">Browse {classifieds.length} product{classifieds.length !== 1 ? 's' : ''} from skilled vendors</p>
        </div>
        <Badge variant="outline" className="border-[#00FFFF]/50 text-[#00FFFF]">
          {categoryName}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {classifieds.map((item) => (
          <Card key={item.id} className="glass-card border-[#2a2a2a] hover:border-[#00FFFF]/50 transition-all group">
            <CardContent className="p-4">
              {/* Image Gallery */}
              {item.images && item.images.length > 0 && (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-[#1a1a1a]">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {item.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      +{item.images.length - 1} more
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div>
                <h3 className="font-semibold text-white mb-2 line-clamp-1 group-hover:text-[#00FFFF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                  {item.description}
                </p>

                {/* Price and Category */}
                <div className="flex items-center justify-between">
                  {item.price != null && (
                    <div className="text-lg font-bold text-[#00FFFF]">
                      {formatCurrency(item.price)}
                    </div>
                  )}
                  <Badge variant="secondary" className="bg-[#1a1a1a] text-gray-300 text-xs">
                    {item.category}
                  </Badge>
                </div>

                {/* View Details Link */}
                <Link 
                  href={`/classifieds/${item.id}`}
                  className="mt-3 block w-full text-center py-2 px-4 rounded-md bg-[#00FFFF]/10 hover:bg-[#00FFFF]/20 text-[#00FFFF] font-medium text-sm transition-colors"
                >
                  View Details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

