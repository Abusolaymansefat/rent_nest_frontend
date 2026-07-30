import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "../_components/RegisterForm"
// import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4">
      <div className="w-full max-w-md">
        <RegisterForm />
        
      </div>
    </div>
  )
}