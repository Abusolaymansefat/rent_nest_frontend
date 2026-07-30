import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"

export type CurrentUser = {
  id: string
  name: string
  email: string
  role: string
  image?: string
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if (!accessToken) return null

    const secret = process.env.JWT_SECRET
    if (!secret) {
      console.error("JWT_SECRET is not set in environment")
      return null
    }

    const decoded = jwt.verify(accessToken, secret) as JwtPayload & CurrentUser

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      image: decoded.image,
    }
  } catch {
    return null
  }
}