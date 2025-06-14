"use client"

import Image from 'next/image'
import Hero3D from './Hero3d'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative h-screen">
      <Hero3D />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Profile and Text */}
          <div className="text-left space-y-6 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-32 h-32 md:w-40 md:h-40 mb-8 animate-float"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-glow"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src="/images/profilePic.png"
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Weljo Chesedh
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 max-w-lg"
            >
              Full Stack Developer & Web3 Specialist
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4 pt-4"
            >
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                View Projects
              </button>
              <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300">
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Right side - Stats or Featured Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-semibold text-blue-400">Latest Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-blue-400">98%</p>
                  <p className="text-sm text-gray-400">Success Rate</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-purple-400">150+</p>
                  <p className="text-sm text-gray-400">Projects</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 