'use client'
import { useQuery } from '@tanstack/react-query'
import { statsAPI } from '@/lib/api'
import StatsCard from '@/components/dashboard/StatsCard'
import RecentOrders from '@/components/dashboard/RecentOrders'
import SalesChart from '@/components/dashboard/SalesChart'
import { FiDollarSign, FiShoppingCart, FiUsers, FiTrendingUp } from 'react-icons/fi'

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: statsAPI.getDashboard,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={`$${data?.stats.totalRevenue.toFixed(2) || '0.00'}`}
          change="+12%"
          trend="up"
          icon={<FiDollarSign size={24} />}
        />
        <StatsCard
          title="Total Orders"
          value={data?.stats.totalOrders.toString() || '0'}
          change="+8%"
          trend="up"
          icon={<FiShoppingCart size={24} />}
        />
        <StatsCard
          title="Total Customers"
          value={data?.stats.totalCustomers.toString() || '0'}
          change="+15%"
          trend="up"
          icon={<FiUsers size={24} />}
        />
        <StatsCard
          title="Avg. Order Value"
          value={`$${data?.stats.avgOrderValue.toFixed(2) || '0.00'}`}
          change="-3%"
          trend="down"
          icon={<FiTrendingUp size={24} />}
        />
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={data?.weeklySales} />
        </div>
        <div>
          <RecentOrders orders={data?.recentOrders} />
        </div>
      </div>

      {/* Low Stock Alert */}
      {data?.lowStockProducts && data.lowStockProducts.length > 0 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">⚠️ Low Stock Alert</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.lowStockProducts.slice(0, 6).map((product: any) => (
              <div key={product._id} className="bg-white rounded p-3 border border-yellow-200">
                <p className="font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-sm text-gray-600">Stock: {product.sizes.reduce((acc: number, s: any) => acc + s.stock, 0)} units</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}