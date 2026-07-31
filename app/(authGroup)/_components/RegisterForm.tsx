"use client"

import * as React from "react"
import { useActionState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { registerAction } from "../_actions/authAction"
import { FormState } from "@/types/auth"


const initialState: FormState = { success: false }

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState)
  const [password, setPassword] = React.useState("")

  const strength = React.useMemo(() => {
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  }, [password])

  const strengthColors = ["bg-muted", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"]
  const strengthLabels = ["Password strength", "Weak", "Fair", "Good", "Strong"]

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <h1 className="text-center text-4xl font-bold tracking-tight">
        Register Now
      </h1>

      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-base font-medium">First name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              required
              disabled={isPending}
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-base font-medium">Last name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              required
              disabled={isPending}
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-base font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            disabled={isPending}
            className="w-full rounded-full border border-gray-300 px-5 py-3 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-base font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-5 py-3 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
          <div className="space-y-1">
            <div className="flex gap-1 h-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-colors ${
                    i <= strength ? strengthColors[strength] : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className={`text-xs ${
              strength === 0 ? "text-muted-foreground" :
              strength <= 2 ? "text-red-500" :
              strength === 3 ? "text-yellow-500" : "text-green-500"
            }`}>
              {strengthLabels[strength]}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-base font-medium">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
            className="w-full rounded-full border border-gray-300 px-5 py-3 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="mt-1 h-4 w-4 rounded border-gray-300"
            required
          />
          <label htmlFor="terms" className="text-sm font-normal leading-relaxed">
            I agree to the{" "}
            <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>
          </label>
        </div>

        {state?.message && (
          <p className="text-sm text-red-500 text-center">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-blue-600 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">Or Sign Up with</div>

      <div className="flex justify-center gap-4">
        <Button type="button" aria-label="Continue with Google">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  )
}