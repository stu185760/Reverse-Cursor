export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Reverse Cursor</h1>
        <p className="text-lg text-muted-foreground mb-8">Your Next.js 15 app is ready for deployment</p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>✓ Supabase integration configured</p>
          <p>✓ Environment variables set up</p>
          <p>✓ Ready to deploy to Vercel</p>
        </div>
      </div>
    </main>
  )
}
