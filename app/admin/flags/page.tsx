"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { loadDB, getUser, getAd } from "@/lib/local-db"
import { Flag, Eye, Trash2 } from "lucide-react"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"

export default function AdminFlagsPage() {
  const flags = useMemo(() => {
    const db = loadDB()
    return db.flags.sort((a, b) => b.created_at - a.created_at)
  }, [])

  const typeColors = {
    ad: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    response: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    message: "bg-green-500/20 text-green-400 border-green-500/50",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Flagged Content</h1>
        <p className="text-muted-foreground mt-1">Review and moderate reported content</p>
      </div>

      {/* Flag List */}
      <Card className="glass-card border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-400" />
            {flags.length} {flags.length === 1 ? "Flag" : "Flags"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {flags.length === 0 ? (
            <div className="text-center py-12">
              <Flag className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No flagged content. Platform is clean! ✨</p>
            </div>
          ) : (
            <div className="space-y-3">
              {flags.map((flag) => {
                let targetInfo = ""
                let targetLink = ""
                
                if (flag.target_type === "ad") {
                  const ad = getAd(flag.target_id)
                  targetInfo = ad?.title || "Deleted ad"
                  targetLink = `/ads/${flag.target_id}`
                }

                return (
                  <div
                    key={flag.id}
                    className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={typeColors[flag.target_type]}>
                            {flag.target_type}
                          </Badge>
                          <h3 className="font-semibold text-white">{targetInfo}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          <span className="text-red-400">Reason:</span> {flag.reason}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Flagged on {formatDateTime(flag.created_at)}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {targetLink && (
                          <Link href={targetLink}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#00FFFF]/50 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

