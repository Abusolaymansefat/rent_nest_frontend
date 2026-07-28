"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
// import { PasswordInput } from "./password-input"
// import { SocialButtons } from "./social-buttons"
import { Loader2 } from "lucide-react"
import { SocialButtons } from "./social-buttons"
import { PasswordInput } from "./password-input"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Add your auth logic here
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <SocialButtons />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </a>
        </div>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm font-normal">
          Remember me for 30 days
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  )
}