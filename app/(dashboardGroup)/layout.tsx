// import Navbar from '@/components/shared/navbar'
import React from 'react'
// import { getCurrentUser } from '@/service/auth'

const DashboardLayout = async ({children }: {children: React.ReactNode}) => {
  // const user = await getCurrentUser()
  
  return (
    <div>
      {/* <Navbar user={user} /> */}
       {children}
    </div>
  )
}

export default DashboardLayout
