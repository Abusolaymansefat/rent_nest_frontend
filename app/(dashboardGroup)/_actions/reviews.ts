"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export type ReviewFormState = {
  success: boolean
  message?: string
}

export async function submitReview(
  propertyId: string,
  prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const rating = formData.get("rating") as string
  const comment = formData.get("comment") as string

  if (!rating) {
    return { success: false, message: "Please select a rating" }
  }

  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ propertyId, rating: Number(rating), comment }),
    })
    const result = await res.json()

    if (!result.success) {
      return { success: false, message: result.message || "Could not submit review" }
    }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/tenant")
  return { success: true, message: "Review submitted, thank you!" }
}