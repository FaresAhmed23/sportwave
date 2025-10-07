'use client'
import { motion } from 'framer-motion'
import { FiArrowUp, FiArrowDown } from 'react-icons/fi'

interface StatsCardProps {
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down'
  icon?: React.ReactNode
}

export default function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
        </div>
        {icon && (
          <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && trend && (
          <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? <FiArrowUp /> : <FiArrowDown />}
            <span className="ml-1 text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}