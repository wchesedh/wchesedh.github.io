"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

function FloatingText({ text, position, color = '#ffffff' }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        position={position}
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {text}
      </Text>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingText text="Full Stack" position={[-2, 1, 0]} color="#00ff88" />
      <FloatingText text="Developer" position={[2, -1, 0]} color="#00ccff" />
      <FloatingText text="UI/UX" position={[0, 2, 0]} color="#ff3366" />
      <FloatingText text="Designer" position={[0, -2, 0]} color="#ffcc00" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between min-h-screen">
        {/* Left side - Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-start mb-8 md:mb-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <Image
              src="/images/profile.jpg"
              alt="Weljo Chesedh"
              fill
              className="rounded-full object-cover border-4 border-gray-800"
              priority
            />
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Weljo Chesedh
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            A passionate developer crafting digital experiences
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gray-800 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>
    </section>
  )
} 