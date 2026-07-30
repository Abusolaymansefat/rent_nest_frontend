import Navbar from '@/components/shared/navbar'
import React from 'react'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CurrentUser } from '@/service/auth'

const DashboardLayout = async ({children }: {children: React.ReactNode}) => {
  const user: CurrentUser | null = null
  
  return (
    <div>
      <Navbar user={user} />
       {children}
    </div>
  )
}

export default DashboardLayout
