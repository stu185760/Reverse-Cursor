"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Riya Sharma",
    role: "Corporate Events Manager",
    location: "Mumbai",
    rating: 5,
    text: "Found the perfect vendor for our corporate gifting needs. The quote system made it easy to compare prices and delivery times. Highly recommend!",
    image: "👩‍💼"
  },
  {
    name: "Arjun Mehta",
    role: "Wedding Planner",
    location: "Delhi NCR",
    rating: 5,
    text: "As a vendor on EasyCustomized, I've connected with amazing clients. The platform is professional and the payment system gives everyone confidence.",
    image: "🧑‍🔧"
  },
  {
    name: "Priya Nair",
    role: "Small Business Owner",
    location: "Bengaluru",
    rating: 5,
    text: "Got custom furniture made within my budget. The vendor was professional and delivery was on time. Best marketplace experience!",
    image: "👩‍💻"
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-b from-[#0D0D0D] to-[#1a1a1a] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="text-[#00FFFF]">Thousands</span> Across India
          </h2>
          <p className="text-gray-400 text-lg">See what our customers and vendors have to say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="glass-card border-[#2a2a2a] hover:border-[#00FFFF]/30 transition-all">
              <CardContent className="pt-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 fill-[#00FFFF] text-[#00FFFF]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#7A00FF] flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-[#00FFFF]">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

