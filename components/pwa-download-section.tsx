import { Card } from "@/components/ui/card"

export function PWADownloadSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <Card className="p-8 bg-primary/5 border-primary/20">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-3xl font-bold mb-2">Get the Mobile App</h2>
            <p className="text-muted-foreground">
              Install EasyCustomized on your phone or computer for a better experience!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📱</span>
                <span className="font-semibold">Android / Desktop</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>On Android Chrome or Desktop Chrome:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Look for the install icon ⊕ in the address bar</li>
                  <li>Or wait for the automatic install prompt</li>
                  <li>Tap "Install" or "Add to Home Screen"</li>
                  <li>App icon will appear on your device</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🍎</span>
                <span className="font-semibold">iPhone / iPad</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>On iPhone/iPad Safari:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Tap the Share button 📤</li>
                  <li>Scroll down in the menu</li>
                  <li>Tap "Add to Home Screen"</li>
                  <li>Tap "Add" to confirm</li>
                  <li>App icon will appear on your home screen</li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">✨ Why Install the App?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="font-semibold text-sm">Faster</div>
                <div className="text-xs text-muted-foreground">Lightning quick loads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">📴</div>
                <div className="font-semibold text-sm">Works Offline</div>
                <div className="text-xs text-muted-foreground">Browse without internet</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🏠</div>
                <div className="font-semibold text-sm">Home Screen</div>
                <div className="text-xs text-muted-foreground">One tap access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">📱</div>
                <div className="font-semibold text-sm">Native Feel</div>
                <div className="text-xs text-muted-foreground">Full-screen app</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              💡 Tip: The app works on both phones and computers. No App Store needed!
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

