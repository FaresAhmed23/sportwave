'use client'
import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCheckCircle, FiPackage, FiTruck, FiHome } from 'react-icons/fi'
import { useEffect } from 'react'
import { useCartStore } from '@/lib/store/cartStore'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const clearCart = useCartStore((state) => state.clearCart)
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    // Clear cart on successful order
    clearCart()
  }, [clearCart])

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your order information.</p>
          <Link href="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative bg-white rounded-full p-6 shadow-2xl">
                <FiCheckCircle className="w-24 h-24 text-green-500" />
              </div>
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your purchase!
            </p>
            <p className="text-lg text-gray-500">
              Order ID: <span className="font-mono font-bold text-primary-600">#{orderId}</span>
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">What's Next?</h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiPackage className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Order Confirmation</h3>
                  <p className="text-gray-600">
                    You'll receive an email confirmation at your registered email address shortly.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FiTruck className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Shipping Updates</h3>
                  <p className="text-gray-600">
                    We'll notify you when your order ships. Expected delivery: 3-5 business days.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiHome className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Track Your Order</h3>
                  <p className="text-gray-600">
                    You can track your order anytime from your account dashboard.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/account/orders"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <FiPackage />
              View Order Details
            </Link>
            <Link
              href="/products"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Continue Shopping
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 text-center text-sm text-gray-500"
          >
            <p>Need help? Contact our support team at</p>
            <a href="mailto:support@sportwave.com" className="text-primary-600 hover:text-primary-700 font-semibold">
              support@sportwave.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// Loading fallback component
function OrderSuccessLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="flex justify-center mb-8">
              <div className="w-36 h-36 bg-gray-200 rounded-full" />
            </div>
            <div className="text-center mb-12">
              <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
              <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto" />
            </div>
            <div className="bg-white rounded-2xl p-8 mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense wrapper
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  )
}