import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative bg-[#0D0D0D] text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 via-transparent to-[#7A00FF]/10 pointer-events-none" />
      
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20 lg:py-24 grid gap-8 md:gap-12 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Your Idea, <span className="text-[#00FFFF] neon-text-cyan">Their Craft</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-4">
              India's premier reverse marketplace connecting you with skilled artisans and craftspeople.
            </p>
          </div>
          <p className="text-sm md:text-base text-gray-400">
            From custom wedding jewelry to corporate gifting, furniture to automobiles—find the perfect vendor for your unique requirements. Post your need, receive competitive quotes in INR, and choose the best match.
          </p>
          
          {/* Trust indicators */}
          <div className="flex items-center gap-6 text-sm text-gray-400 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
              <span>10,000+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#7A00FF] rounded-full animate-pulse" />
              <span>Verified Vendors</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4">
            <Link href="/post-ad" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold neon-glow-cyan transition-all">
                Post Your Request
              </Button>
            </Link>
            <Link href="/ads" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-[#7A00FF] text-[#7A00FF] hover:bg-[#7A00FF]/10 bg-transparent"
              >
                Browse Requests
              </Button>
            </Link>
          </div>
        </div>
        
        <div aria-hidden="true" className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="glass-card rounded-xl overflow-hidden aspect-[4/3] hover:neon-glow-cyan transition-all duration-300">
            <Image
              src="/jewelry-embroidery.avif"
              alt="Ornate jewelry embroidery"
              width={400}
              height={300}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="glass-card rounded-xl overflow-hidden aspect-[4/3] hover:neon-glow-purple transition-all duration-300">
            <Image
              src="/shoemaker-craft.jpg"
              alt="Shoemaker craftsmanship"
              width={400}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass-card rounded-xl overflow-hidden aspect-[4/3] hover:neon-glow-purple transition-all duration-300">
            <Image
              src="/bridal-jewelry.jpg"
              alt="Bridal jewelry design"
              width={400}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass-card rounded-xl overflow-hidden aspect-[4/3] hover:neon-glow-cyan transition-all duration-300">
            <Image
              src="/red-automobile.jpg"
              alt="Custom automobile"
              width={400}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
