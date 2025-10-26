import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">EasyCustomized</h1>
          <p className="text-xl text-muted-foreground mb-4">
            India's Reverse Marketplace
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Connect customers with skilled vendors. Post your requirements, receive competitive quotes,
            and choose the perfect match for your project.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/dashboard/create-ad"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Post a Requirement
            </Link>
            <Link
              href="/dashboard/browse"
              className="px-8 py-4 border-2 border-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              Browse Opportunities
            </Link>
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 border-2 border-border rounded-lg font-semibold hover:bg-accent transition-colors"
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
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
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
                className="p-6 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of customers and vendors on India's premier reverse marketplace
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Create Free Account
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 border-2 border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
