"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Category } from "@/types/auth"
import { deleteCategory } from "@/app/(public)/_actions/categories"
import { EditCategoryDialog } from "./edit-category-dialog"
// import { deleteCategory } from "@/service/categories"
// import type { Category } from "@/types/category"

export function CategoryRow({ category }: { category: Category }) {
  const [isDeleted, setIsDeleted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    setIsDeleted(true) // optimistic

    startTransition(async () => {
      const result = await deleteCategory(category.id)
      if (!result.success) {
        setIsDeleted(false)
        toast.error(result.message || "Could not delete category")
      } else {
        toast.success("Category deleted")
      }
    })
  }

  if (isDeleted) return null

  return (
    <tr className="border-b last:border-b-0">
      <td className="py-3 pr-4 font-medium">
        <div className="flex items-center gap-2">
          {category.icon && <span className="text-muted-foreground">{category.icon}</span>}
          {category.name}
        </div>
      </td>
      <td className="py-3 pr-4 text-sm text-muted-foreground">{category.slug}</td>
      <td className="py-3 text-right">
        <div className="flex justify-end gap-1">
          <EditCategoryDialog category={category} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isPending}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete &quot;{category.name}&quot;?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  )
}