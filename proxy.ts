import { NextRequest, NextResponse } from "next/server"

const roleRoutes = [
  { prefix: "/tenant", role: "TENANT" },
  { prefix: "/landlord", role: "LANDLORD" },
  { prefix: "/admin", role: "ADMIN" },
]

function getTokenPayload(token: string): { id?: string; role?: string } | null {
  try {
    const encodedPayload = token.split(".")[1]
    if (!encodedPayload) return null

    const payload = atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"))
    return JSON.parse(payload) as { id?: string; role?: string }
  } catch {
    return null
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const matchedRoute = roleRoutes.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`))

  if (!matchedRoute) {
    return NextResponse.next()
  }

  const token = request.cookies.get("accessToken")?.value
  const user = token ? getTokenPayload(token) : null

  if (!user?.id) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (user.role !== matchedRoute.role) {
    const dashboardByRole: Record<string, string> = {
      TENANT: "/tenant",
      LANDLORD: "/landlord",
      ADMIN: "/admin",
    }

    return NextResponse.redirect(new URL(dashboardByRole[user.role ?? ""] ?? "/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/tenant/:path*", "/landlord/:path*", "/admin/:path*"],
}