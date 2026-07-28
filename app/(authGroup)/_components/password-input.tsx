"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {Eye, EyeOff } from "lucide-react"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={`pr-10 ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}