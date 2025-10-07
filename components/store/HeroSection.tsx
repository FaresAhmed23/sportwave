'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiPlay, FiStar, FiTrendingUp, FiAward } from 'react-icons/fi'
import { useRef } from 'react'

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-accent-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Floating Blobs */}
        <motion.div
          initial={{ scale: 1, rotate: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -right-48 -top-48 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          initial={{ scale: 1, rotate: 0 }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -left-48 bottom-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute right-1/4 top-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10"
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 h-full relative z-10 flex items-center min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-white">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20 shadow-lg"
            >
              <FiTrendingUp className="text-accent-400 mr-2" />
              <span className="text-white font-semibold">NEW COLLECTION 2024</span>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="ml-3 text-xs bg-gradient-to-r from-accent-500 to-primary-500 text-white px-3 py-1.5 rounded-full font-bold"
              >
                30% OFF
              </motion.span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              Unleash Your
              <motion.span 
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="block bg-gradient-to-r from-accent-400 via-primary-400 to-accent-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Performance
              </motion.span>
            </motion.h1>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl leading-relaxed"
            >
              Discover premium sportswear designed for champions. 
              <span className="text-accent-400 font-semibold"> Elevate your game</span> with cutting-edge performance gear.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/products" className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-accent-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <span className="relative z-10 flex items-center">
                  Shop Collection
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="ml-2" />
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                <FiPlay className="mr-2" />
                Watch Video
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="text-3xl font-bold text-accent-400 mb-1"
                >
                  50K+
                </motion.div>
                <div className="text-sm text-gray-400">Happy Athletes</div>
              </div>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="text-3xl font-bold text-accent-400 mb-1 flex items-center justify-center"
                >
                  4.9
                  <FiStar className="ml-1 text-yellow-400 fill-yellow-400" size={20} />
                </motion.div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="text-3xl font-bold text-accent-400 mb-1"
                >
                  100+
                </motion.div>
                <div className="text-sm text-gray-400">Products</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - 3D Card Effect */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Floating Cards */}
            <div className="relative w-full h-[600px]">
              {/* Main Product Card */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl"
              >
                <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <FiAward size={80} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">Premium Quality</p>
                    <p className="text-sm text-gray-300 mt-2">Certified Excellence</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 1 */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ 
                  y: [-20, 20, -20],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl"
              >
                <div className="text-accent-400 font-bold text-lg">Free Shipping</div>
                <div className="text-white text-sm">On orders $100+</div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ 
                  y: [20, -20, 20],
                  rotate: [0, -5, 0, 5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-32 left-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl"
              >
                <div className="text-accent-400 font-bold text-lg">24/7 Support</div>
                <div className="text-white text-sm">Always here for you</div>
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500 rounded-full blur-3xl"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}