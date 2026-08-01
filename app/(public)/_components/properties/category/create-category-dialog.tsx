"use client"

import { useActionState, useEffect, useState } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import { CategoryFormState } from "@/types/auth"
import { createCategory } from "@/app/(public)/_actions/categories"

const initialState: CategoryFormState = { success: false }

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(createCategory, initialState)

  useEffect(() => {
    if (state.success) setOpen(false)
  }, [state.success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Category name</label>
            <input
              id="name"
              name="name"
              placeholder="e.g. Apartments"
              required
              disabled={isPending}
              className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="icon" className="text-sm font-medium">Icon (optional)</label>
            <input
              id="icon"
              name="icon"
              placeholder="e.g. building or a lucide icon name"
              disabled={isPending}
              className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
            />
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isPending} className="w-full rounded-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}