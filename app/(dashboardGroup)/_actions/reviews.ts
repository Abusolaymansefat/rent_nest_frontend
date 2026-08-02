"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export type ReviewFormState = {
  success: boolean
  message?: string
}

export async function submitReview(
  rentalRequestId: string,
  prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const rating = formData.get("rating") as string
  const comment = formData.get("comment") as string

  if (!rating) {
    return { success: false, message: "Please select a rating" }
  }
  if (!comment || comment.trim() === "") {
    return { success: false, message: "Please write a comment" }
  }

  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const payload = {
    rentalRequestId, 
    rating: Number(rating),
    comment: comment.trim(),
  }

  let result
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    result = await res.json()
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  if (!result.success) {
    return { success: false, message: result.message || "Could not submit review" }
  }

  revalidatePath("/tenant")
  return { success: true, message: "Review submitted, thank you!" }
}