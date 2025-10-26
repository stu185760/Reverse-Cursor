import Link from "next/link"
import { AdsListClient } from "@/components/ads-list-client"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">EasyCustomized</h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect customers with vendors. Post your requirements, get quotes!
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/post-ad"
              className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
            >
              Post a Requirement
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-3 border-2 border-black rounded-lg font-medium hover:bg-gray-50"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Ads Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Requirements</h2>
            <Link href="/ads" className="text-sm text-blue-600 hover:underline">
              View all →
            </Link>
          </div>
          
          <AdsListClient />
        </div>
      </section>
    </main>
  )
}
