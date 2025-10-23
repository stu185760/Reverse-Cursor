'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en" className="dark">
      <body className="bg-[#0D0D0D] min-h-screen flex items-center justify-center p-4">
        <div className="glass-card border-[#2a2a2a] rounded-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Critical Error</h2>
          <p className="text-gray-400 mb-6">
            Something went wrong at the application level. Please refresh the page.
          </p>
          <button
            onClick={reset}
            className="bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}

