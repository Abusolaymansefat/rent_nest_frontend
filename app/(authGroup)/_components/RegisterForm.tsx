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

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Add your auth logic here
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    router.push("/login")
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" placeholder="John" required disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" placeholder="Doe" required disabled={isLoading} />
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
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          required
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" className="mt-1" required />
        <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
          I agree to the{" "}
          <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  )
}