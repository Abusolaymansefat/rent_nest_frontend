"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import type { Property } from "@/types/property"
import type { RentalRequest } from "@/types/rental"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return { Authorization: `Bearer ${token}` }
}

export async function getMyProperties(): Promise<Property[]> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data
}

export async function getMyPropertyById(id: string): Promise<Property | null> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return null
  const json = await res.json()
  return json.data
}

export async function getMyRequests(): Promise<RentalRequest[]> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data
}

// ---------------- PROPERTY FORM STATE ----------------
export type PropertyFormState = {
  success: boolean
  message?: string
}

function buildPropertyPayload(formData: FormData) {
  const images = (formData.get("images") as string)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
  const amenities = (formData.get("amenities") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    location: formData.get("location") as string,
    address: formData.get("address") as string,
    bedrooms: Number(formData.get("bedrooms")),
    bathrooms: Number(formData.get("bathrooms")),
    size: Number(formData.get("size")),
    propertyType: formData.get("propertyType") as string,
    categoryId: formData.get("categoryId") as string,
    images,
    amenities,
  }
}

export async function createProperty(
  prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const payload = buildPropertyPayload(formData)

  if (!payload.title || !payload.price || !payload.location) {
    return { success: false, message: "Title, price and location are required" }
  }

  let result
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify(payload),
    })
    result = await res.json()
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  if (!result.success) {
    return { success: false, message: result.message || "Could not create property" }
  }

  redirect("/dashboard/landlord/properties")
}

export async function updateProperty(
  propertyId: string,
  prevState: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const payload = buildPropertyPayload(formData)

  let result
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify(payload),
    })
    result = await res.json()
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  if (!result.success) {
    return { success: false, message: result.message || "Could not update property" }
  }

  revalidatePath("/dashboard/landlord/properties")
  return { success: true, message: "Property updated" }
}

export async function deleteProperty(propertyId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`, {
      method: "DELETE",
      headers: await authHeader(),
    })
    const result = await res.json()

    if (!result.success) {
      return { success: false, message: result.message || "Could not delete property" }
    }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/dashboard/landlord/properties")
  return { success: true }
}

export async function toggleAvailability(
  propertyId: string,
  availability: "AVAILABLE" | "UNAVAILABLE"
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ availability }),
    })
    const result = await res.json()

    if (!result.success) {
      return { success: false, message: result.message || "Could not update availability" }
    }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/dashboard/landlord/properties")
  return { success: true }
}

export async function updateRequestStatus(
  requestId: string,
  status: "APPROVED" | "REJECTED"
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ status }),
    })
    const result = await res.json()

    if (!result.success) {
      return { success: false, message: result.message || "Could not update request" }
    }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/dashboard/landlord/requests")
  return { success: true }
}