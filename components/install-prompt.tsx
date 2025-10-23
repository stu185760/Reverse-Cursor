"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Download, Smartphone, Share } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(iOS)

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isIOSStandalone = (navigator as any).standalone === true
    
    if (isStandalone || isIOSStandalone) {
      setIsInstalled(true)
      return
    }

    // For iOS, show manual instructions after a delay
    if (iOS && !isIOSStandalone) {
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed')
        if (!dismissed) {
          setShowPrompt(true)
        }
      }, 30000) // Show after 30 seconds
      return
    }

    // For other browsers, listen for the install prompt event
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Don't show immediately - wait a bit for user to explore
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed')
        if (!dismissed) {
          setShowPrompt(true)
        }
      }, 30000) // Show after 30 seconds
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if already installed
    const installHandler = () => {
      setIsInstalled(true)
      setShowPrompt(false)
    }
    window.addEventListener('appinstalled', installHandler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installHandler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    await deferredPrompt.prompt()

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // Clear the prompt
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (isInstalled || !showPrompt) {
    return null
  }

  // iOS doesn't support automatic install, show manual instructions
  if (isIOS) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-5">
        <Card className="glass-card border-[#00FFFF]/50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center">
                <Share className="w-5 h-5 text-[#00FFFF]" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">
                  Install EasyCustomized
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  To install: Tap <Share className="w-3 h-3 inline mx-1" /> Share, then scroll and tap "Add to Home Screen"
                </p>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-white"
                >
                  Got it
                </Button>
              </div>

              <button
                onClick={handleDismiss}
                className="flex-shrink-0 text-gray-400 hover:text-white p-1"
                aria-label="Dismiss install prompt"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Chrome/Edge/Android - automatic install
  if (!deferredPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-5">
      <Card className="glass-card border-[#00FFFF]/50 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00FFFF]/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#00FFFF]" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white mb-1">
                Install EasyCustomized
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Add to your home screen for quick access and a better experience!
              </p>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="bg-[#00FFFF] hover:bg-[#00CCCC] text-black font-semibold"
                  aria-label="Install app"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-white"
                  aria-label="Dismiss install prompt"
                >
                  Not now
                </Button>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-gray-400 hover:text-white p-1"
              aria-label="Dismiss install prompt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

