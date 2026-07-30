import { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "../_components/LoginFrom"


export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4">
      <div className="w-full max-w-md">
        <LoginForm />
        
      </div>
    </div>
  )
}