import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const sampleAds = [
  {
    id: "ad-sample-1",
    title: "Custom Wedding Jewelry Design Needed",
    category: "Jewelry",
    description: "Looking for an experienced jeweler to design custom wedding rings and necklace set. Budget: ₹50,000-₹80,000. Need within 2 months.",
    location: "Mumbai",
    budget: "₹50,000 – ₹80,000",
    author: "Riya Sharma",
    date: "25/10/2025 10:09 pm",
    image: "/placeholder.svg",
  },
]

export function RecentAds() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Recent Requests</h2>
        </div>

        <div className="space-y-6">
          {sampleAds.map((ad) => (
            <Card key={ad.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">{ad.title}</h3>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {ad.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{ad.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span>📍 {ad.location}</span>
                    <span>💰 {ad.budget}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {ad.author} • {ad.date}
                    </span>
                    <Link href={`/ads/${ad.id}`}>
                      <Button variant="link">View details →</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

