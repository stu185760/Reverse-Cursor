import { Card } from "@/components/ui/card"

const testimonials = [
  {
    name: "Riya Sharma",
    role: "Corporate Events Manager",
    location: "Mumbai",
    avatar: "👩‍💼",
    text: "Found the perfect vendor for our corporate gifting needs. The quote system made it easy to compare prices and delivery times. Highly recommend!",
  },
  {
    name: "Arjun Mehta",
    role: "Wedding Planner",
    location: "Delhi NCR",
    avatar: "🧑‍🔧",
    text: "As a vendor on EasyCustomized, I've connected with amazing clients. The platform is professional and the payment system gives everyone confidence.",
  },
  {
    name: "Priya Nair",
    role: "Small Business Owner",
    location: "Bengaluru",
    avatar: "👩‍💻",
    text: "Got custom furniture made within my budget. The vendor was professional and delivery was on time. Best marketplace experience!",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Trusted by Thousands Across India</h2>
          <p className="text-xl text-muted-foreground">
            See what our customers and vendors have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

