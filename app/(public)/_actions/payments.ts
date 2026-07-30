"use server"

import { cookies } from "next/headers"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return { Authorization: `Bearer ${token}` }
}

export async function createPaymentSession(rentalRequestId: string): Promise<{ url?: string; error?: string }> {
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

    // Stripe Checkout Session URL backend থেকে আসবে ধরে নিচ্ছি
    return { url: result.data.checkoutUrl }
  } catch {
    return { error: "Server error, please try again" }
  }
}