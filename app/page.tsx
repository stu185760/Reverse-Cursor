import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            EasyCustomized
          </h1>
          <p className="text-2xl text-primary font-semibold mb-4">
            India's Reverse Marketplace
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Connect customers with skilled vendors. Post your requirements, receive competitive quotes,
            and choose the perfect match for your project.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/dashboard/create-ad"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/80 transition-all shadow-lg shadow-primary/50"
            >
              Post a Requirement
            </Link>
            <Link
              href="/dashboard/browse"
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Browse Opportunities
            </Link>
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-card border border-border rounded-lg font-semibold hover:border-primary transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">1. Post Your Need</h3>
              <p className="text-muted-foreground">
                Describe your project requirements, budget, and timeline
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">2. Receive Quotes</h3>
              <p className="text-muted-foreground">
                Skilled vendors submit their proposals and pricing
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">3. Choose & Connect</h3>
              <p className="text-muted-foreground">
                Review, compare, and hire the perfect vendor for your project
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Popular Categories</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Jewelry", icon: "💍" },
              { name: "Footwear", icon: "👟" },
              { name: "Clothing", icon: "👔" },
              { name: "Furniture", icon: "🪑" },
              { name: "Automobiles", icon: "🚗" },
              { name: "Gifting", icon: "🎁" },
              { name: "Home Decor", icon: "🏠" },
              { name: "Electronics", icon: "📱" },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase()}`}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</div>
                <div className="font-semibold group-hover:text-primary transition-colors">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of customers and vendors on India's premier reverse marketplace
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/80 transition-all shadow-lg shadow-primary/50"
            >
              Create Free Account
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
