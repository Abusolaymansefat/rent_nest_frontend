import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RegisterForm } from "../_components/RegisterForm"
// import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <Card className="shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your details to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <RegisterForm />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium underline hover:text-foreground">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}