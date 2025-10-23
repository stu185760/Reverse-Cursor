import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <Card className="glass-card border-[#2a2a2a] max-w-md w-full text-center">
        <CardHeader>
          <div className="flex flex-col items-center gap-3">
            <FileQuestion className="w-16 h-16 text-[#00FFFF]" />
            <CardTitle className="text-white text-2xl">404 - Page Not Found</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold">
                Go Home
              </Button>
            </Link>
            <Link href="/ads" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-[#7A00FF] text-[#7A00FF] hover:bg-[#7A00FF]/10"
              >
                Browse Ads
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

