"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import type { PlatformStats, PaginatedUsers } from "@/types/admin"
import type { Property } from "@/types/property"
import type { RentalRequest } from "@/types/rental"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return { Authorization: `Bearer ${token}` }
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/stats`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return { totalUsers: 0, totalProperties: 0, pendingRequests: 0, totalRevenue: 0 }
  const json = await res.json()
  return json.data
}

export async function getUsers(params: { search?: string; page?: string }): Promise<PaginatedUsers> {
  const query = new URLSearchParams()
  if (params.search) query.set("search", params.search)
  if (params.page) query.set("page", params.page)

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users?${query.toString()}`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return { success: false, message: "Failed to load", data: [] }
  return res.json()
}

export async function toggleUserBan(userId: string, isBanned: boolean): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ isBanned }),
    })
    const result = await res.json()
    if (!result.success) return { success: false, message: result.message || "Could not update user" }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/dashboard/admin/users")
  return { success: true }
}

export async function getAllProperties(): Promise<Property[]> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data
}

export async function getAllRequests(): Promise<RentalRequest[]> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/requests`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data
}

export async function removeProperty(propertyId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties/${propertyId}`, {
      method: "DELETE",
      headers: await authHeader(),
    })
    const result = await res.json()
    if (!result.success) return { success: false, message: result.message || "Could not remove listing" }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/dashboard/admin/moderation")
  return { success: true }
}