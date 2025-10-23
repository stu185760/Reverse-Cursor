"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Download, Chrome, Share2 } from "lucide-react"

export function PWADownloadSection() {
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(iOS)

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isIOSStandalone = (navigator as any).standalone === true
    setIsInstalled(isStandalone || isIOSStandalone)

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      alert('App installed successfully! Check your home screen.')
    }
  }

  if (isInstalled) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Card className="glass-card border-[#00FFFF]/50 bg-gradient-to-br from-[#00FFFF]/10 to-[#7A00FF]/10">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#00FFFF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-[#00FFFF]" />
              </div>
              <h3 className="text-2xl font-bold text-white">App Installed! ✅</h3>
              <p className="text-gray-300">You're using the EasyCustomized app.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <Card className="glass-card border-[#00FFFF]/50 bg-gradient-to-br from-[#00FFFF]/10 to-[#7A00FF]/10">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-[#00FFFF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-10 h-10 text-[#00FFFF]" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-white">
            📱 Get the Mobile App
          </CardTitle>
          <p className="text-lg text-gray-300 mt-2">
            Install EasyCustomized on your phone or computer for a better experience!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Android/Desktop Chrome */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#00FFFF]">
                  <Chrome className="w-5 h-5" />
                  Android / Desktop
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {deferredPrompt ? (
                  <>
                    <p className="text-sm text-gray-300">
                      ✅ Install prompt is ready!
                    </p>
                    <Button
                      onClick={handleInstallClick}
                      className="w-full bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Install App Now
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-300">
                      On Android Chrome or Desktop Chrome:
                    </p>
                    <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                      <li>Look for the install icon <Download className="w-3 h-3 inline" /> in the address bar</li>
                      <li>Or wait for the automatic install prompt</li>
                      <li>Tap "Install" or "Add to Home Screen"</li>
                      <li>App icon will appear on your device</li>
                    </ol>
                  </>
                )}
              </CardContent>
            </Card>

            {/* iOS */}
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#7A00FF]">
                  <Share2 className="w-5 h-5" />
                  iPhone / iPad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  On iPhone/iPad Safari:
                </p>
                <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                  <li>Tap the Share button <Share2 className="w-3 h-3 inline" /></li>
                  <li>Scroll down in the menu</li>
                  <li>Tap "Add to Home Screen"</li>
                  <li>Tap "Add" to confirm</li>
                  <li>App icon will appear on your home screen</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              ✨ Why Install the App?
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-sm font-medium text-white">Faster</div>
                <div className="text-xs text-gray-400">Lightning quick loads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📴</div>
                <div className="text-sm font-medium text-white">Works Offline</div>
                <div className="text-xs text-gray-400">Browse without internet</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🏠</div>
                <div className="text-sm font-medium text-white">Home Screen</div>
                <div className="text-xs text-gray-400">One tap access</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <div className="text-sm font-medium text-white">Native Feel</div>
                <div className="text-xs text-gray-400">Full-screen app</div>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              💡 Tip: The app works on both phones and computers. No App Store needed!
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

