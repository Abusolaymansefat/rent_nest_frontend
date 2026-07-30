"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type FormState = {
  success: boolean
  message?: string
}

export const loginAction = async (
  redirectTo: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email and password are required" }
  }

  let result
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    result = await res.json()
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  if (!result.success) {
    return { success: false, message: result.message || "Login failed" }
  }

  const cookieStore = await cookies()
  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })
  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  if (
    redirectTo &&
    typeof redirectTo === "string" &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
  ) {
    redirect(redirectTo)
  }

  redirect("/")
}

export const registerAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const terms = formData.get("terms")

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return { success: false, message: "All fields are required" }
  }
  if (!terms) {
    return { success: false, message: "You must agree to the Terms and Privacy Policy" }
  }
  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }
  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters" }
  }

  const name = `${firstName} ${lastName}`.trim()

  let result
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    result = await res.json()
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  if (!result.success) {
    return { success: false, message: result.message || "Registration failed" }
  }

  redirect("/login?registered=true")
}