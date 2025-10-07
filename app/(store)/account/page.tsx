'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiPackage, FiHeart, FiUser, FiMapPin, FiLogOut } from 'react-icons/fi'

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!user) return null

  const accountLinks = [
    {
      icon: FiUser,
      title: 'Personal Information',
      description: 'Update your details',
      href: '/account/profile',
    },
    {
      icon: FiPackage,
      title: 'Order History',
      description: 'View your orders',
      href: '/account/orders',
    },
    {
      icon: FiMapPin,
      title: 'Addresses',
      description: 'Manage addresses',
      href: '/account/addresses',
    },
    {
      icon: FiHeart,
      title: 'Wishlist',
      description: 'Your favorite items',
      href: '/account/wishlist',
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card p-8 mb-8 gradient-primary text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.firstName}!</h1>
          <p className="opacity-90">Manage your account and track your orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {accountLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={link.href}>
                <div className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
                      <link.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{link.title}</h3>
                      <p className="text-gray-600 text-sm">{link.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              logout()
              router.push('/')
            }}
            className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg transition-colors"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}