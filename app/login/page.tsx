"use client"

import { useRouter } from "next/navigation"
import { switchRole } from "@/lib/local-db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()

  function handleLogin(role: "customer" | "vendor" | "admin") {
    switchRole(role)
    router.push("/") // go home after login
  }

  return (
    <main className="container mx-auto max-w-md p-6">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose how you want to continue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button onClick={() => handleLogin("customer")} className="w-full">
            Continue as Customer
          </Button>
          <Button onClick={() => handleLogin("vendor")} variant="secondary" className="w-full">
            Continue as Vendor
          </Button>
          <Button onClick={() => handleLogin("admin")} variant="outline" className="w-full">
            Continue as Admin
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
