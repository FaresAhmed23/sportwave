'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiLogOut } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/lib/store/cartStore'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mounted, setMounted] = useState(false) // Add mounted state
  const router = useRouter()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const { user, isAuthenticated, isAdmin, logout, checkAuth } = useAuthStore()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
    checkAuth()
  }, [checkAuth])

  const menuItems = [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=footwear', label: 'Footwear' },
    { href: '/products?category=apparel', label: 'Apparel' },
    { href: '/products?featured=true', label: 'Featured' },
  ]

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    router.push('/')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            SPORTWAVE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hover:text-primary-600 transition-colors"
                  >
                    <FiUser size={22} />
                  </button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-semibold">{user?.firstName}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          Orders
                        </Link>
                        
                        {/* Admin Dashboard Link */}
                        {isAdmin && (
                          <>
                            <div className="border-t my-2" />
                            <Link
                              href="/dashboard"
                              onClick={() => setShowUserMenu(false)}
                              className="block px-4 py-2 text-sm hover:bg-gray-50 text-primary-600 font-medium"
                            >
                              Admin Dashboard
                            </Link>
                          </>
                        )}
                        
                        <div className="border-t my-2" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                        >
                          <FiLogOut className="inline mr-2" size={16} />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href="/login" className="hover:text-primary-600 transition-colors">
                  <FiUser size={22} />
                </Link>
              )}
            </div>
            
            {/* Cart Icon with Badge - Only render after mounting */}
            <Link href="/cart" className="relative hover:text-primary-600 transition-colors">
              <FiShoppingCart size={22} />
              {mounted && totalItems > 0 && (
                <motion.span
                  key="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-3">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isAuthenticated && isAdmin && (
                  <>
                    <div className="border-t my-2" />
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-primary-600 font-semibold py-2"
                    >
                      Admin Dashboard
                    </Link>
                  </>
                )}
                
                {!isAuthenticated && (
                  <>
                    <div className="border-t my-2" />
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-primary-600 font-semibold py-2"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-primary-600 font-semibold py-2"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}