"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { loadDB } from "@/lib/local-db"
import { exportData, importData, clearAllData, getDataStats } from "@/lib/data-backup"
import { Users, FileText, MessageSquare, TrendingUp, DollarSign, Flag, Download, Upload, Trash2, Database } from "lucide-react"
import { useMemo, useState, useRef } from "react"
import { formatCurrency } from "@/lib/utils"

export default function AdminDashboard() {
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const stats = useMemo(() => {
    const db = loadDB()
    
    const totalUsers = db.users.length
    const customers = db.users.filter((u) => u.role === "customer").length
    const vendors = db.users.filter((u) => u.role === "vendor").length
    
    const totalAds = db.ads.length
    const openAds = db.ads.filter((a) => a.status === "open").length
    const closedAds = db.ads.filter((a) => a.status === "closed").length
    
    const totalQuotes = db.quotes.length
    const pendingQuotes = db.quotes.filter((q) => q.status === "pending").length
    const acceptedQuotes = db.quotes.filter((q) => q.status === "accepted").length
    
    const totalValue = db.quotes
      .filter((q) => q.status === "accepted")
      .reduce((sum, q) => sum + q.price_inr, 0)
    
    const totalMessages = db.messages.length
    const totalFlags = db.flags.length
    
    return {
      totalUsers,
      customers,
      vendors,
      totalAds,
      openAds,
      closedAds,
      totalQuotes,
      pendingQuotes,
      acceptedQuotes,
      totalValue,
      totalMessages,
      totalFlags,
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor your platform's key metrics</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="w-4 h-4 text-[#00FFFF]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.customers} customers, {stats.vendors} vendors
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Ads</CardTitle>
              <FileText className="w-4 h-4 text-[#7A00FF]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.openAds}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.closedAds} closed, {stats.totalAds} total
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Quotes</CardTitle>
              <TrendingUp className="w-4 h-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.pendingQuotes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.acceptedQuotes} accepted, {stats.totalQuotes} total
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {stats.acceptedQuotes} accepted quotes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#00FFFF]" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00FFFF]">{stats.totalMessages}</div>
            <p className="text-sm text-muted-foreground mt-2">Total messages exchanged</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Flag className="w-5 h-5 text-red-400" />
              Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">{stats.totalFlags}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.totalFlags === 0 ? "No issues reported" : "Require attention"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health & Data Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a]">
                <span className="text-sm text-gray-300">Conversion Rate (Quotes → Accepted)</span>
                <span className="text-lg font-bold text-[#00FFFF]">
                  {stats.totalQuotes > 0 
                    ? `${Math.round((stats.acceptedQuotes / stats.totalQuotes) * 100)}%`
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a]">
                <span className="text-sm text-gray-300">Average Quotes per Ad</span>
                <span className="text-lg font-bold text-[#7A00FF]">
                  {stats.totalAds > 0 
                    ? (stats.totalQuotes / stats.totalAds).toFixed(1)
                    : "0"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a]">
                <span className="text-sm text-gray-300">Vendor/Customer Ratio</span>
                <span className="text-lg font-bold text-green-400">
                  {stats.customers > 0 
                    ? `1:${(stats.vendors / stats.customers).toFixed(1)}`
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management Card */}
        <Card className="glass-card border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-[#00FFFF]" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-[#1a1a1a] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Storage Size:</span>
                <span className="text-white font-medium">
                  {(getDataStats().storageSize / 1024).toFixed(2)} KB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Records:</span>
                <span className="text-white font-medium">
                  {Object.values(getDataStats()).reduce((sum, val) => 
                    typeof val === 'number' && val !== getDataStats().storageSize ? sum + val : sum, 0
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => {
                  exportData()
                }}
                className="w-full bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data (Backup)
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setIsImporting(true)
                    try {
                      await importData(file)
                    } catch (error) {
                      alert(`❌ Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
                    } finally {
                      setIsImporting(false)
                    }
                  }
                }}
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                variant="outline"
                className="w-full border-[#7A00FF]/50 text-[#7A00FF] hover:bg-[#7A00FF]/10"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isImporting ? "Importing..." : "Import Data (Restore)"}
              </Button>

              <Button
                onClick={clearAllData}
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>

            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-xs text-yellow-400">
                💡 <strong>Tip:</strong> Export your data regularly to prevent data loss when clearing browser cache.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

