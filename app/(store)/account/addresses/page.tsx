'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi'
import { customerAPI } from '@/lib/api'
import toast from 'react-hot-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function AddressesPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuthStore()
  const [showAddForm, setShowAddForm] = useState(false)

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: customerAPI.getProfile,
    enabled: isAuthenticated,
  })

  const deleteMutation = useMutation({
    mutationFn: customerAPI.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Address deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete address')
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const addresses = profile?.addresses || []

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/account"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Account
      </Link>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Saved Addresses</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary inline-flex items-center"
        >
          <FiPlus className="mr-2" />
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <FiMapPin size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Saved Addresses</h2>
          <p className="text-gray-600 mb-8">Add an address for faster checkout</p>
          <button onClick={() => setShowAddForm(true)} className="btn-primary">
            Add Your First Address
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, index) => (
            <motion.div
              key={address._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold capitalize">{address.type}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zipCode}<br />
                    {address.country}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-primary-600 p-2">
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => address._id && deleteMutation.mutate(address._id)}
                    className="text-gray-400 hover:text-red-600 p-2"
                    disabled={deleteMutation.isPending}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showAddForm && (
        <AddAddressModal onClose={() => setShowAddForm(false)} />
      )}
    </div>
  )
}

function AddAddressModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    type: 'shipping',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false,
  })

  const addMutation = useMutation({
    mutationFn: customerAPI.addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Address added successfully')
      onClose()
    },
    onError: () => {
      toast.error('Failed to add address')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="input-field"
            >
              <option value="shipping">Shipping</option>
              <option value="billing">Billing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="mr-2 rounded"
            />
            <label className="text-sm text-gray-700">Set as default address</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={addMutation.isPending}
              className="btn-primary flex-1"
            >
              {addMutation.isPending ? 'Adding...' : 'Add Address'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}