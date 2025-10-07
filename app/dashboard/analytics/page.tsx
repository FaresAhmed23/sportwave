'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { statsAPI } from '@/lib/api'
import { FiTrendingUp, FiDollarSign, FiShoppingCart } from 'react-icons/fi'

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d')

  const { data, isLoading } = useQuery({
    queryKey: ['analytics', period],
    queryFn: () => statsAPI.getAnalytics(period),
  })

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="input-field w-auto"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Sales Over Time */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-6">Sales Over Time</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {data?.salesOverTime.map((item: any, index: number) => {
                const maxSales = Math.max(...data.salesOverTime.map((d: any) => d.sales))
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary-600 rounded-t hover:bg-primary-700 transition cursor-pointer relative group"
                      style={{ height: `${(item.sales / maxSales) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        ${item.sales.toFixed(2)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Top Products</h3>
              <div className="space-y-4">
                {data?.topProducts.slice(0, 5).map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <span className="font-semibold text-gray-400 mr-3">#{index + 1}</span>
                      <div>
                        <p className="font-medium text-gray-900 truncate">
                          {item.product[0]?.name || 'Unknown Product'}
                        </p>
                        <p className="text-sm text-gray-600">{item.totalSold} sold</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">${item.revenue.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
              <div className="space-y-4">
                {data?.categoryBreakdown.map((item: any, index: number) => {
                  const total = data.categoryBreakdown.reduce((acc: number, cat: any) => acc + cat.revenue, 0)
                  const percentage = ((item.revenue / total) * 100).toFixed(1)
                  return (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 capitalize">{item._id}</span>
                        <span className="text-sm text-gray-600">${item.revenue.toFixed(2)} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}