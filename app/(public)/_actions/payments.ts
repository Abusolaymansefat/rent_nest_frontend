"use server"

import { cookies } from "next/headers"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return { Authorization: `Bearer ${token}` }
}

export async function createPaymentSession(
  rentalRequestId: string
): Promise<{ url?: string; error?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ rentalRequestId }),
    })
    const result = await res.json()

    if (!result.success) {
      return { error: result.message || "Could not start payment" }
    }

    if (!result.data?.url) {
      return { error: "Payment session created but no checkout URL was returned" }
    }

    return { url: result.data.url }
  } catch {
    return { error: "Server error, please try again" }
  }
}

export async function confirmPayment(
  sessionId: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ sessionId }),
    })
    const result = await res.json()

    if (!result.success) {
      return { success: false, message: result.message || "Could not confirm payment" }
    }

    return { success: true }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }
}