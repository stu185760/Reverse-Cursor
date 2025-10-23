'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <Card className="glass-card border-[#2a2a2a] max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-[#00FFFF]" />
            <CardTitle className="text-white text-xl">Something went wrong!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400 text-sm">
            We encountered an unexpected error. Don't worry, your data is safe.
          </p>
          
          {error.message && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm font-mono">{error.message}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={reset}
              className="flex-1 bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold"
            >
              Try Again
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="flex-1 border-[#7A00FF] text-[#7A00FF] hover:bg-[#7A00FF]/10"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

