import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "../_components/LoginFrom"


export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
}

export default function LoginPage() {
  return (
    <Card className="shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium underline hover:text-foreground">
            Create one
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}