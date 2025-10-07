'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { customerAPI, productAPI } from '@/lib/api'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ProductCard from '@/components/store/ProductCard'
import { FiArrowLeft, FiHeart } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const queryClient = useQueryClient()

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: customerAPI.getProfile,
    enabled: isAuthenticated,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const wishlistIds = profile?.wishlist || []

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/account"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Account
      </Link>

      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {profileLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : wishlistIds.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <FiHeart size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite items for later!</p>
          <Link href="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistIds.map((productId, index) => (
            <WishlistItem key={productId} productId={productId} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

function WishlistItem({ productId, index }: { productId: string; index: number }) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productAPI.getById(productId),
  })

  if (isLoading) {
    return (
      <div className="card p-4 animate-pulse">
        <div className="aspect-[3/4] bg-gray-200 rounded mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    )
  }

  if (!product) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <ProductCard product={product} />
    </motion.div>
  )
}