import { getAllCategories } from "@/app/(public)/_actions/categories"
import { CategoryRow } from "@/app/(public)/_components/properties/category/category-row"
import { CreateCategoryDialog } from "@/app/(public)/_components/properties/category/create-category-dialog"
import { Card, CardContent } from "@/components/ui/card"


export default async function AdminCategoriesPage() {
  const categories = await getAllCategories()

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <CreateCategoryDialog />
      </div>

      <Card>
        <CardContent>
          {categories.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">No categories yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Slug</th>
                    <th className="pb-3 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => <CategoryRow key={c.id} category={c} />)}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}