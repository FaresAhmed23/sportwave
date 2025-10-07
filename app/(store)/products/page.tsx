'use client'
import { use, useState } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiMinus, FiPlus, FiFilter } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query'
import { productAPI } from '@/lib/api'
import { useCartStore } from '@/lib/store/cartStore'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import ProductCardSkeleton from '@/components/store/ProductCardSkeleton'
import ProductCard from '@/components/store/ProductCard'

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Unwrap searchParams using React.use()
  const resolvedSearchParams = use(searchParams)
  
  const [filters, setFilters] = useState({
    category: (resolvedSearchParams.category as string) || '',
    sort: 'createdAt',
    order: 'desc',
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productAPI.getAll(filters),
  })

  const categories = ['footwear', 'apparel', 'accessories', 'equipment']
  const sortOptions = [
    { value: 'createdAt-desc', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A-Z' },
  ]

  const handleSortChange = (value: string) => {
    const [sort, order] = value.split('-')
    setFilters({ ...filters, sort, order })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden bg-gray-100 px-4 py-2 rounded-lg flex items-center"
        >
          <FiFilter className="mr-2" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-64 flex-shrink-0`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow p-6 sticky top-24"
          >
            <h2 className="font-semibold mb-4">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={filters.category === ''}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="mr-2"
                  />
                  All Categories
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center capitalize">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="mr-2"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-medium mb-2">Sort By</h3>
              <select
                value={`${filters.sort}-${filters.order}`}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No products found</p>
              <button
                onClick={() => setFilters({ category: '', sort: 'createdAt', order: 'desc' })}
                className="text-primary-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">{data?.pagination.total} products found</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}