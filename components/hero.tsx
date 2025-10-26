import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold mb-4">
                <span className="text-foreground">Your Idea,</span>
                <br />
                <span className="text-primary">Their Craft</span>
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-xl">
              India's premier reverse marketplace connecting you with skilled artisans and craftspeople.
            </p>

            <p className="text-lg text-muted-foreground max-w-xl">
              From custom wedding jewelry to corporate gifting, furniture to automobiles—find the perfect vendor for your unique requirements. Post your need, receive competitive quotes in INR, and choose the best match.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">10,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Verified Vendors</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/post-ad">
                <Button size="lg" className="text-lg px-8">
                  Post Your Request
                </Button>
              </Link>
              <Link href="/ads">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Browse Requests
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Custom jewelry"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Wedding jewelry"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Leather craftsman"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Custom automobile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

