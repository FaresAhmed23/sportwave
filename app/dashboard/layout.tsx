'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import Sidebar from '@/components/dashboard/Sidebar'
import Loading from '@/components/store/Loading'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isAdmin, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
    
    if (!isAuthenticated) {
      router.push('/login')
    } else if (!isAdmin) {
      router.push('/')
    }
  }, [isAuthenticated, isAdmin, checkAuth, router])

  if (!isAuthenticated || !isAdmin) {
    return <Loading />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}