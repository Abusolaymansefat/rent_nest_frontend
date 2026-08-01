"use server"

import { cookies } from "next/headers"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return { Authorization: `Bearer ${token}` }
}

export async function createPaymentSession(rentalRequestId: string): Promise<{ url?: string; error?: string }> {
  try {
    const apiUrl = process.env.BACKEND_API_URL || "http://localhost:5000"
    const res = await fetch(`${apiUrl}/api/payments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ rentalRequestId }),
    })
    
    if (!res.ok) {
      return { error: `Server error: ${res.status}` }
    }
    
    const result = await res.json()

    if (!result.success) {
      return { error: result.message || "Could not start payment" }
    }

    return { url: result.data.checkoutUrl }
  } catch (error) {
    console.error("Payment session creation error:", error)
    return { error: "Server error, please try again" }
  }
}