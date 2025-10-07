'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { useQuery } from '@tanstack/react-query'
import { orderAPI } from '@/lib/api'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiPackage, FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi'

export default function OrdersPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: orderAPI.getMyOrders,
    enabled: isAuthenticated,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FiClock className="text-yellow-500" />
      case 'processing':
        return <FiPackage className="text-blue-500" />
      case 'shipped':
        return <FiTruck className="text-purple-500" />
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />
      default:
        return <FiPackage className="text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/account" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
          ← Back to Account
        </Link>
        <h1 className="text-3xl font-bold">Order History</h1>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : orders?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <FiPackage size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
          <Link href="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {orders?.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-primary-600">${order.total.toFixed(2)}</p>
                  </div>
                  {getStatusIcon(order.status)}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Shipping Address</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Items ({order.items.length})</p>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {item.name} x{item.quantity}
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/account/orders/${order._id}`}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Order Details →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}