'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { customerAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store/authStore'
import { useCartStore } from '@/lib/store/cartStore'
import { Product } from '@/lib/types'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuthStore()
  const { addItem } = useCartStore()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [hoverImageError, setHoverImageError] = useState(false)

  // Get wishlist status
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: customerAPI.getProfile,
    enabled: isAuthenticated,
  })

  const isInWishlist = profile?.wishlist?.includes(product._id) || false

  // Wishlist mutations
  const addToWishlistMutation = useMutation({
    mutationFn: () => customerAPI.addToWishlist(product._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Added to wishlist!', {
        icon: '❤️',
      })
    },
    onError: () => {
      toast.error('Failed to add to wishlist')
    },
  })

  const removeFromWishlistMutation = useMutation({
    mutationFn: () => customerAPI.removeFromWishlist(product._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Removed from wishlist')
    },
    onError: () => {
      toast.error('Failed to remove from wishlist')
    },
  })

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist')
      router.push('/login')
      return
    }

    if (isInWishlist) {
      removeFromWishlistMutation.mutate()
    } else {
      addToWishlistMutation.mutate()
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.sizes.length > 0 && product.colors.length > 0) {
      addItem(product, product.sizes[0], product.colors[0], 1)
    } else {
      toast.error('Product configuration required')
    }
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const mainImage = product.images?.[0]
  const hoverImage = product.images?.[1]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card group relative overflow-hidden"
    >
      <Link href={`/products/${product._id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {mainImage && !imageError ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized // Use this if optimization keeps timing out
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FiShoppingCart size={48} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No Image</p>
              </div>
            </div>
          )}

          {/* Hover Image */}
          {hoverImage && !hoverImageError && !imageError && (
            <Image
              src={hoverImage}
              alt={product.name}
              fill
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setHoverImageError(true)}
              unoptimized // Use this if optimization keeps timing out
              priority={false}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.featured && (
              <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                FEATURED
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                LOW STOCK
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistToggle}
            disabled={addToWishlistMutation.isPending || removeFromWishlistMutation.isPending}
            className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:bg-white transition-all disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isInWishlist ? (
                <motion.div
                  key="filled"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiHeart className="w-5 h-5 fill-red-500 text-red-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiHeart className="w-5 h-5 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Quick Add Button */}
          <motion.button
            onClick={handleQuickAdd}
            className="absolute bottom-3 left-3 right-3 bg-primary-600 text-white py-2.5 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 hover:bg-primary-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiShoppingCart className="w-4 h-4" />
            Quick Add
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.category}</p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1.5 mt-3">
              {product.colors.slice(0, 5).map((color, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.colors.length > 5 && (
                <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                  +{product.colors.length - 5}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}