'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  {
    name: 'Footwear',
    href: '/products?category=footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    description: 'Performance shoes'
  },
  {
    name: 'Apparel',
    href: '/products?category=apparel',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Athletic wear'
  },
  {
    name: 'Accessories',
    href: '/products?category=accessories',
    image: 'https://plus.unsplash.com/premium_photo-1678739395192-bfdd13322d34?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Complete your gear'
  },
  {
    name: 'Equipment',
    href: '/products?category=equipment',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800',
    description: 'Training essentials'
  }
]

export default function Categories() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-lg">Find exactly what you need</p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href} className="group block">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}