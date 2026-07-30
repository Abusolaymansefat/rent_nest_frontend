"use server"

import { cookies } from "next/headers"
import type { CurrentUser } from "@/types/auth"
import { decodeJWT } from "@/utils/jwt"

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return null
  }

  const decoded = decodeJWT(accessToken)

  if (!decoded?.id) {
    return null
  }

  return {
    id: decoded.id as string,
    name: decoded.name as string,
    email: decoded.email as string,
    phone: decoded.phone as string | null,
    avatar: decoded.avatar as string | null,
    role: decoded.role as string,
  }
}