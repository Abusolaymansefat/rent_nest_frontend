"use server"

import { cookies } from "next/headers"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return token ? { Authorization: `Bearer ${token}` } : null
}

export async function createPaymentSession(
  rentalRequestId: string
): Promise<{ url?: string; error?: string }> {
  try {
    const authorization = await authHeader()
    if (!authorization) {
      return { error: "Your session has expired. Please log in again." }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authorization },
      body: JSON.stringify({ rentalRequestId }),
    })
    const result = (await res.json()) as {
      success?: boolean
      message?: string
      data?: { url?: string }
    }

    if (!res.ok || !result.success) {
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
    const authorization = await authHeader()
    if (!authorization) {
      return { success: false, message: "Your session has expired. Please log in again." }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authorization },
      body: JSON.stringify({ sessionId }),
    })
    const result = (await res.json()) as { success?: boolean; message?: string }

    if (!res.ok || !result.success) {
      return { success: false, message: result.message || "Could not confirm payment" }
    }

    return { success: true }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }
}