'use client'
import { useQuery } from '@tanstack/react-query'
import { orderAPI } from '@/lib/api'
import Link from 'next/link'
import { FiArrowLeft, FiPackage, FiMapPin, FiUser } from 'react-icons/fi'

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', params.id],
    queryFn: () => orderAPI.getById(params.id),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Order not found</p>
        <Link href="/dashboard/orders" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Orders
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Order {order.orderNumber}</h1>
                <p className="text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status.toUpperCase()}
              </span>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center mb-4">
                <FiPackage className="text-gray-400 mr-2" size={20} />
                <h3 className="font-semibold">Order Items</h3>
              </div>
              <div className="space-y-4">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-start pb-4 border-b last:border-b-0">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <FiUser className="text-gray-400 mr-2" size={20} />
                <h3 className="font-semibold">Customer Information</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Name:</span> {order.customer.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Email:</span> {order.customer.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Phone:</span> {order.customer.phone}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <FiMapPin className="text-gray-400 mr-2" size={20} />
                <h3 className="font-semibold">Shipping Address</h3>
              </div>
              <p className="text-gray-600">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-medium text-gray-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">
                  {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary-600">${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-600 mb-2">Payment Method</p>
              <p className="font-medium capitalize">{order.paymentMethod}</p>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-600 mb-2">Order Date</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}