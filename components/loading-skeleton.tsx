import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="glass-card border-[#2a2a2a]">
          <CardHeader>
            <div className="h-6 bg-[#2a2a2a] rounded w-3/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-[#2a2a2a] rounded w-full" />
              <div className="h-4 bg-[#2a2a2a] rounded w-5/6" />
              <div className="h-4 bg-[#2a2a2a] rounded w-4/6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <Card className="glass-card border-[#2a2a2a] animate-pulse">
      <CardHeader>
        <div className="h-6 bg-[#2a2a2a] rounded w-2/3" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-4 bg-[#2a2a2a] rounded w-full" />
          <div className="h-4 bg-[#2a2a2a] rounded w-4/5" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] animate-pulse">
          <div className="space-y-3">
            <div className="h-5 bg-[#2a2a2a] rounded w-3/4" />
            <div className="h-4 bg-[#2a2a2a] rounded w-full" />
            <div className="h-4 bg-[#2a2a2a] rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

