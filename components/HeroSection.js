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
      
      // Calculate how much of the projects section is visible
      const windowHeight = window.innerHeight
      const projectsVisibleHeight = Math.min(projectsRect?.bottom || 0, windowHeight) - Math.max(projectsRect?.top || 0, 0)
      const projectsTotalHeight = projectsRect?.height || 0
      const projectsVisibilityRatio = projectsVisibleHeight / projectsTotalHeight
      
      // Check if we're in the 3D view of projects
      const activeTab = document.querySelector('#projects button.bg-blue-600')
      const is3DView = activeTab?.textContent?.trim() === '3D View'
      
      // Set isInProjects3D to true only if projects section is mostly visible (more than 60%) and in 3D view
      setIsInProjects3D(projectsVisibilityRatio > 0.6 && is3DView)
      
      // Show button when scrolled past hero section
      setShowButton(window.scrollY > windowHeight * 0.5)
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
              onClick={() => scrollToSection('projects')}
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
              <div className="text-4xl font-bold text-white mb-2">4+</div>
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
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
          <button
            onClick={() => handleNavigation('up')}
            className="w-10 h-10 flex items-center justify-center bg-gray-800/90 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-700"
            title={isInProjects3D ? "Go to Skills" : "Back to Top"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {isInProjects3D && (
            <button
              onClick={() => handleNavigation('down')}
              className="w-10 h-10 flex items-center justify-center bg-gray-800/90 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 border border-gray-700"
              title="Go to Certifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
} 