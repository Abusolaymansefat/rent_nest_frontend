"use server"

import type { CurrentUser } from "@/types/auth"
import { cookies } from "next/headers"

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return null
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}`
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const result = await res.json()

    if (!result.success || !result.data) {
      return null
    }

    return {
      id: result.data.id,
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone ?? null,
      avatar: result.data.avatar ?? null,
      role: result.data.role,
    }
  } catch (error) {
    console.error("getCurrentUser failed:", error)
    return null
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
}