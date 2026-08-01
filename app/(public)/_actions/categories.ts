"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { Category, CategoryFormState } from "@/types/auth"
// import type { Category, CategoryFormState } from "@/types/category"

async function authHeader() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  return { Authorization: `Bearer ${token}` }
}

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    cache: "no-store",
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data
}

export async function createCategory(
  prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const name = formData.get("name") as string
  const icon = formData.get("icon") as string

  if (!name || name.trim().length < 2) {
    return { success: false, message: "Category name must be at least 2 characters" }
  }

  let result
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({
        name: name.trim(),
        slug: slugify(name),
        icon: icon || undefined,
      }),
    })
    result = await res.json()
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  if (!result.success) {
    return { success: false, message: result.message || "Could not create category" }
  }

  revalidatePath("/admin/categories")
  return { success: true, message: "Category created" }
}

export async function updateCategory(
  categoryId: string,
  prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const name = formData.get("name") as string
  const icon = formData.get("icon") as string

  if (!name || name.trim().length < 2) {
    return { success: false, message: "Category name must be at least 2 characters" }
  }

  let result
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${categoryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({
        name: name.trim(),
        slug: slugify(name),
        icon: icon || undefined,
      }),
    })
    result = await res.json()
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  if (!result.success) {
    return { success: false, message: result.message || "Could not update category" }
  }

  revalidatePath("/admin/categories")
  return { success: true, message: "Category updated" }
}

export async function deleteCategory(categoryId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: await authHeader(),
    })
    const result = await res.json()

    if (!result.success) {
      return { success: false, message: result.message || "Could not delete category" }
    }
  } catch {
    return { success: false, message: "Server error, please try again" }
  }

  revalidatePath("/admin/categories")
  return { success: true }
}