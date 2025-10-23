"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadDB } from "@/lib/local-db"
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function AdminReportsPage() {
  const report = useMemo(() => {
    const db = loadDB()
    
    // User metrics
    const totalUsers = db.users.length
    const newUsersThisWeek = db.users.filter(
      (u) => Date.now() - (u as any).created_at < 7 * 24 * 60 * 60 * 1000
    ).length

    // Ad metrics
    const totalAds = db.ads.length
    const newAdsThisWeek = db.ads.filter(
      (a) => Date.now() - a.created_at < 7 * 24 * 60 * 60 * 1000
    ).length

    // Quote metrics
    const totalQuotes = db.quotes.length
    const acceptedQuotes = db.quotes.filter((q) => q.status === "accepted")
    const totalValue = acceptedQuotes.reduce((sum, q) => sum + q.price_inr, 0)
    const avgQuoteValue = acceptedQuotes.length > 0 ? totalValue / acceptedQuotes.length : 0

    // Category breakdown
    const categoryStats = db.ads.reduce((acc, ad) => {
      acc[ad.category] = (acc[ad.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topCategories = Object.entries(categoryStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    return {
      totalUsers,
      newUsersThisWeek,
      totalAds,
      newAdsThisWeek,
      totalQuotes,
      acceptedQuotes: acceptedQuotes.length,
      totalValue,
      avgQuoteValue,
      topCategories,
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Platform Reports</h1>
        <p className="text-muted-foreground mt-1">Detailed analytics and insights</p>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00FFFF]" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-white">{report.totalUsers}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold text-[#00FFFF]">+{report.newUsersThisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#7A00FF]" />
              Ad Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Ads</p>
                <p className="text-3xl font-bold text-white">{report.totalAds}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold text-[#7A00FF]">+{report.newAdsThisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Metrics */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Transaction Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Transaction Value</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(report.totalValue)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Average Quote Value</p>
              <p className="text-2xl font-bold text-[#00FFFF]">{formatCurrency(report.avgQuoteValue)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Accepted Quotes</p>
              <p className="text-2xl font-bold text-[#7A00FF]">{report.acceptedQuotes}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#00FFFF]" />
            Top Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.topCategories.map(([category, count], index) => {
              const percentage = (count / report.totalAds) * 100
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white font-medium">
                      #{index + 1} {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    <span className="text-muted-foreground">
                      {count} ads ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00FFFF] to-[#7A00FF]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

