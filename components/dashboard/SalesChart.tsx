'use client'
import { motion } from 'framer-motion'

interface SalesChartProps {
  data?: Array<{ day: string; sales: number }>
}

export default function SalesChart({ data }: SalesChartProps) {
  const defaultData = [
    { day: 'Mon', sales: 120 },
    { day: 'Tue', sales: 150 },
    { day: 'Wed', sales: 180 },
    { day: 'Thu', sales: 140 },
    { day: 'Fri', sales: 200 },
    { day: 'Sat', sales: 250 },
    { day: 'Sun', sales: 190 },
  ]

  const chartData = data || defaultData
  const maxSales = Math.max(...chartData.map(d => d.sales))

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Sales</h3>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {chartData.map((data, index) => (
          <motion.div
            key={data.day}
            initial={{ height: 0 }}
            animate={{ height: `${(data.sales / maxSales) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-1 flex flex-col items-center"
          >
            <div className="w-full bg-primary-600 rounded-t hover:bg-primary-700 transition relative group cursor-pointer">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                ${data.sales}
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">{data.day}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}