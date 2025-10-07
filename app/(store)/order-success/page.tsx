'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCheck, FiPackage, FiMail } from 'react-icons/fi'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheck className="text-green-600" size={40} />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for your order. We've received your purchase and will process it shortly.
        </p>
        
        {orderId && (
          <div className="card p-6 mb-8">
            <p className="text-sm text-gray-500 mb-2">Order Number</p>
            <p className="text-2xl font-bold text-primary-600">{orderId}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <FiMail className="text-primary-600 mx-auto mb-3" size={32} />
            <h3 className="font-semibold mb-2">Confirmation Email</h3>
            <p className="text-sm text-gray-600">
              We've sent a confirmation email with order details
            </p>
          </div>
          
          <div className="card p-6">
            <FiPackage className="text-primary-600 mx-auto mb-3" size={32} />
            <h3 className="font-semibold mb-2">Track Your Order</h3>
            <p className="text-sm text-gray-600">
              You can track your order in your account
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link href="/account/orders" className="btn-primary inline-block w-full md:w-auto px-8">
            View Order Details
          </Link>
          
          <Link href="/products" className="btn-secondary inline-block w-full md:w-auto px-8 md:ml-4">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  )
}