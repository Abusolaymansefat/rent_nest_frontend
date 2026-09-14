"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { AdminDashboardStats, PaginatedResponse, PlatformUser, Property, RentalRequest, UserStatus } from "@/types/auth"
// import type { PaginatedResponse, PlatformUser, DashboardStats, UserStatus } from "@/types/admin"
// import type { Property } from "@/types/property"
// import type { RentalRequest } from "@/types/rental"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return { Authorization: `Bearer ${token}` }
}

export async function getDashboardStats(): Promise<AdminDashboardStats> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/dashboard`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) {
    return { totalUsers: 0, totalLandlords: 0, totalTenants: 0, totalProperties: 0, totalRentals: 0, totalCompletedRentals: 0 }
  }
  const json = await res.json()
  return json.data
}


export async function getPendingRequestCount(): Promise<number> {
  const query = new URLSearchParams({ status: "PENDING", limit: "1" })
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals?${query.toString()}`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return 0
  const json = await res.json()
  return json.meta?.total ?? 0
}

export async function getUsers(params: {
  searchTerm?: string
  role?: string
  status?: string
  page?: string
}): Promise<PaginatedResponse<PlatformUser>> {
  const query = new URLSearchParams()
  if (params.searchTerm) query.set("searchTerm", params.searchTerm)
  if (params.role) query.set("role", params.role)
  if (params.status) query.set("status", params.status)
  if (params.page) query.set("page", params.page)

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users?${query.toString()}`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return { success: false, message: "Failed to load", data: [] }
  return res.json()
}

export async function updateUserStatus(
  userId: string,
  status: UserStatus
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ status }),
    })
    const result = await res.json()
    if (!result.success) return { success: false, message: result.message || "Could not update user" }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/admin/users")
  return { success: true }
}

export async function getAllProperties(params: {
  searchTerm?: string
  location?: string
  availability?: string
  page?: string
} = {}): Promise<PaginatedResponse<Property>> {
  const query = new URLSearchParams()
  if (params.searchTerm) query.set("searchTerm", params.searchTerm)
  if (params.location) query.set("location", params.location)
  if (params.availability) query.set("availability", params.availability)
  if (params.page) query.set("page", params.page)

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties?${query.toString()}`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return { success: false, message: "Failed to load", data: [] }
  return res.json()
}

export async function getAllRentals(params: {
  status?: string
  page?: string
} = {}): Promise<PaginatedResponse<RentalRequest>> {
  const query = new URLSearchParams()
  if (params.status) query.set("status", params.status)
  if (params.page) query.set("page", params.page)

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals?${query.toString()}`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return { success: false, message: "Failed to load", data: [] }
  return res.json()
}

export async function deleteProperty(propertyId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const apiUrl = process.env.BACKEND_API_URL || "https://rentnestprismabackend.vercel.app"

    const res = await fetch(`${apiUrl}/api/admin/properties/${propertyId}`, {
      method: "DELETE",
      headers: await authHeader(),
    })

    const responseText = await res.text()
    const result = responseText ? JSON.parse(responseText) : { success: res.ok }

    if (res.ok && result.success !== false) {
      revalidatePath("/admin/moderation")
      revalidatePath("/admin/properties")
      revalidatePath("/admin/manage-posts")
      revalidatePath("/properties")
      revalidatePath("/landlord/properties")
      return { success: true }
    }

    const resultMessage = String(result.message ?? "").toLowerCase()
    const hasRentalDependency = /rental|request|foreign key|constraint/.test(resultMessage)

    if (res.status === 409 || res.status === 400 || hasRentalDependency) {
      const rentalsRes = await fetch(`${apiUrl}/api/admin/rentals`, {
        headers: await authHeader(),
        cache: "no-store",
      })
      const rentalsText = await rentalsRes.text()
      const rentalsData = rentalsText ? JSON.parse(rentalsText) : { data: [] }
      const propertyRentals = (rentalsData.data ?? []).filter(
        (rental: RentalRequest) => rental.propertyId === propertyId || rental.property?.id === propertyId,
      )

      if (propertyRentals.length > 0) {
        for (const rental of propertyRentals) {
          const rentalDeleteRes = await fetch(`${apiUrl}/api/admin/rentals/${rental.id}`, {
            method: "DELETE",
            headers: await authHeader(),
          })
          if (!rentalDeleteRes.ok) {
            return { success: false, message: "Could not remove related rental requests" }
          }
        }

        const deleteRes = await fetch(`${apiUrl}/api/admin/properties/${propertyId}`, {
          method: "DELETE",
          headers: await authHeader(),
        })
        const deleteText = await deleteRes.text()
        const deleteResult = deleteText ? JSON.parse(deleteText) : { success: deleteRes.ok }

        if (!deleteRes.ok || deleteResult.success === false) {
          return { success: false, message: deleteResult.message || "Could not delete property" }
        }
      } else {
        return { success: false, message: result.message || "Could not delete property" }
      }
    } else {
      return { success: false, message: result.message || "Could not delete property" }
    }
  } catch (error) {
    console.error("Delete property error:", error)
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/admin/moderation")
  revalidatePath("/admin/properties")
  revalidatePath("/admin/manage-posts")
  revalidatePath("/properties")
  revalidatePath("/landlord/properties")
  revalidatePath("/admin/rentals")
  return { success: true }
}

export async function deleteAllProperties(): Promise<{ success: boolean; message?: string }> {
  try {
    const apiUrl = process.env.BACKEND_API_URL || "https://rentnestprismabackend.vercel.app"
    const res = await fetch(`${apiUrl}/api/admin/properties`, {
      method: "DELETE",
      headers: await authHeader(),
    })
    const result = await res.json()
    if (!result.success) return { success: false, message: result.message || "Could not delete all properties" }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/admin/moderation")
  revalidatePath("/admin/properties")
  revalidatePath("/admin/manage-posts")
  revalidatePath("/properties")
  return { success: true }
}