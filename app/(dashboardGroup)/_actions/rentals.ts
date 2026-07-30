"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import type { RentalRequest } from "@/types/rental"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return { Authorization: `Bearer ${token}` }
}

export async function getMyRentalRequests(): Promise<RentalRequest[]> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: await authHeader(),
    cache: "no-store",
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data
}

export type RequestFormState = {
  success: boolean
  message?: string
}

export async function createRentalRequest(
  propertyId: string,
  prevState: RequestFormState,
  formData: FormData
): Promise<RequestFormState> {
  const moveInDate = formData.get("moveInDate") as string
  const message = formData.get("message") as string

  if (!moveInDate) {
    return { success: false, message: "Move-in date is required" }
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ propertyId, moveInDate, message }),
    })
    const result = await res.json()

    if (!result.success) {
      return { success: false, message: result.message || "Request failed" }
    }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/dashboard/tenant")
  return { success: true, message: "Request submitted successfully" }
}