import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpSuccess() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Account Created!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your account has been created successfully. Please check your email to verify your account.
          </p>
          <Link href="/auth/login" className="block">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
