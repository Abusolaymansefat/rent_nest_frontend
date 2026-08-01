import { Card, CardContent } from "@/components/ui/card"
import { getUsers } from "../../_actions/admin";
import { UserSearchBar } from "../../_components/dashboard/user-search-bar";
import { UserRow } from "../../_components/dashboard/user-row";
import { UserPagination } from "../../_components/dashboard/user-pagination";


export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm?: string; page?: string }>
}) {
  const params = await searchParams
  const { data: users, meta } = await getUsers(params)

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">User Management</h1>

      <div className="mb-4">
        <UserSearchBar />
      </div>

      <Card>
        <CardContent>
          {users.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Joined</th>
                    <th className="pb-3 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => <UserRow key={u.id} user={u} />)}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {meta && <UserPagination page={meta.page} totalPages={totalPages} />}
    </>
  )
}