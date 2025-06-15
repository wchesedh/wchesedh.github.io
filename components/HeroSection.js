"use client"

import Image from 'next/image'
import Hero3D from './Hero3d'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [isInProjects3D, setIsInProjects3D] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects')
      const projectsRect = projectsSection?.getBoundingClientRect()
      const isInProjects = projectsRect && projectsRect.top <= 0 && projectsRect.bottom >= 0
      
      // Check if we're in the 3D view of projects
      const activeTab = document.querySelector('#projects button.bg-blue-600')
      const is3DView = activeTab?.textContent?.trim() === '3D View'
      
      setIsInProjects3D(isInProjects && is3DView)
      setShowButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavigation = (direction) => {
    if (isInProjects3D) {
      if (direction === 'up') {
        scrollToSection('skills')
      } else {
        scrollToSection('certifications')
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Image
                src="/images/profilePic.png"
                alt="Weljo Chesedh"
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Weljo Chesedh
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">Full Stack Developer & Web3 Specialist</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <button
              onClick={scrollToSection}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              View Projects
            </button>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-gray-800 text-white font-semibold shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-gray-400">Years of Experience</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-400">Count of Projects</div>
            </div>
          </motion.div>
        </div>
      </section>

      {showButton && (
        <div className="fixed bottom-20 right-4 flex flex-col gap-2">
          <button
            onClick={() => handleNavigation('up')}
            className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
            title={isInProjects3D ? "Go to Skills" : "Back to Top"}
          >
            ↑
          </button>
          {isInProjects3D && (
            <button
              onClick={() => handleNavigation('down')}
              className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
              title="Go to Certifications"
            >
              ↓
            </button>
          )}
        </div>
      )}
    </>
  )
} 