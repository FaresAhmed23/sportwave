'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiSettings,
  FiBarChart2,
  FiLogOut,
  FiArrowLeft
} from 'react-icons/fi'
import { useAuthStore } from '@/lib/store/authStore'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Products', href: '/dashboard/products', icon: FiPackage },
  { name: 'Orders', href: '/dashboard/orders', icon: FiShoppingCart },
  { name: 'Customers', href: '/dashboard/customers', icon: FiUsers },
  { name: 'Analytics', href: '/dashboard/analytics', icon: FiBarChart2 },
  { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold gradient-text">SPORTWAVE</h2>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>
      
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-primary-600 border-r-4 border-primary-400'
                  : 'hover:bg-gray-800'
              }`}
            >
              <Icon className="mr-3" size={20} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition mb-2"
        >
          <FiArrowLeft className="mr-3" size={20} />
          Back to Store
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition"
        >
          <FiLogOut className="mr-3" size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}