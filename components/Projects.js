"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Text, useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CometCursor from './CometCursor'

const projectLinks = [
  { name: 'University Online Document Request', url: 'https://sis.cmu.edu.ph/odrms', image: '/images/odrms.png', description: 'Online Document Request Management System for CMU students and staff.' },
  { name: 'HR Online Document Request', url: 'https://apps.cmu.edu.ph/hrodrs', image: '/images/hrodrs.png', description: 'HR Online Document Request System for CMU employees.' },
  { name: 'CMUPress', url: 'https://apps.cmu.edu.ph/cmupress', image: '/images/cmupress.png', description: 'CMU Press platform for academic publishing and resources.' },
  { name: 'Aguaboo', url: 'https://aguaboo.com', image: '/images/aguaboo.png', description: 'A modern water delivery platform for ordering and management.' },
  { name: 'Bullisch Bull Official Site', url: 'https://bull-token-site.vercel.app/', image: '/images/bullisch1.png', description: 'Successful launch of BULL token on Solana' },
]

function FinancialVisualization() {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
      ref.current.rotation.x = clock.getElapsedTime() * 0.02
    }
  })

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const numPoints = 10
    const corePosition = new THREE.Vector3(0, 0, 0)

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const radius = 1
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = (Math.random() - 0.5) * 0.5
      vertices.push(corePosition.x, corePosition.y, corePosition.z)
      vertices.push(x, y, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} wireframe />
      </mesh>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00ccff" opacity={0.6} transparent />
      </lineSegments>
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={2 + Math.random()} rotationIntensity={0.5} floatIntensity={0.2}>
          <mesh position={[(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#ff3366" emissive="#ff3366" emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function ProjectOrb({ position, url, name, image, onClickOrb }) {
  const ref = useRef()
  const meshRef = useRef()
  const materialRef = useRef()
  const texture = useTexture(image)
  const [hovered, hover] = useState(false)
  const [isExploding, setIsExploding] = useState(false)

  const defaultEmissiveColor = useMemo(() => new THREE.Color(0x000000), [])
  const hoverEmissiveColor = useMemo(() => new THREE.Color(0xFF4500), [])

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position)

      if (materialRef.current) {
        if (hovered && !isExploding) {
          materialRef.current.emissive.lerp(hoverEmissiveColor, 0.1)
          materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 2, 0.1)
        } else if (!isExploding) {
          materialRef.current.emissive.lerp(defaultEmissiveColor, 0.1)
          materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 0, 0.1)
        }
      }

      if (isExploding) {
        if (ref.current.scale.x > 0.01) {
          ref.current.scale.lerp(new THREE.Vector3(0.01, 0.01, 0.01), 0.2)
          if (materialRef.current) {
            materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0, 0.2)
          }
        } else {
          setIsExploding(false)
          if (ref.current) {
            ref.current.scale.set(1, 1, 1)
            ref.current.position.copy(position)
          }
          if (materialRef.current) {
            materialRef.current.opacity = 1
            materialRef.current.emissive.copy(defaultEmissiveColor)
            materialRef.current.emissiveIntensity = 0
          }
          onClickOrb({ name, url, image, description: projectLinks.find(p => p.name === name).description })
        }
      }
    }
  })

  const handleClick = () => {
    if (!isExploding) {
      setIsExploding(true)
    }
  }

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group
        ref={ref}
        position={position}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
        scale={hovered && !isExploding ? 1.1 : 1}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            ref={materialRef}
            map={texture}
            transparent={true}
            side={THREE.DoubleSide}
            emissive={defaultEmissiveColor}
            emissiveIntensity={0}
          />
        </mesh>
      </group>
    </Float>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center mb-4">
          <img src={project.image} alt={project.name} className="w-full h-auto max-h-96 object-contain mb-4" />
          <h3 className="text-3xl font-bold text-white text-center mb-2">{project.name}</h3>
          <p className="text-gray-300 text-center mb-4">{project.description}</p>
          <div className="flex space-x-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition-all text-lg"
            >
              Visit Site
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-gray-700 text-white font-semibold shadow hover:bg-gray-600 transition-all text-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('3d')
  const [showComet, setShowComet] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleOrbClick = (project) => {
    setSelectedProject(project)
  }

  return (
    <section id="projects" className={`bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col items-center ${isMobile ? 'min-h-[auto]' : 'h-screen'}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center pt-8 mb-8">My Projects</h2>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('3d')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === '3d' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-700 hover:text-white'}`}
        >
          3D View
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-700 hover:text-white'}`}
        >
          View All
        </button>
      </div>
      {activeTab === '3d' ? (
        <div
          className="flex-grow w-full max-w-6xl flex justify-center items-center h-[90vh] relative"
          onMouseEnter={() => setShowComet(true)}
          onMouseLeave={() => setShowComet(false)}
          style={{ cursor: showComet ? 'none' : 'default' }}
        >
          <CometCursor active={showComet} />
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} shadows className="w-full h-full">
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <pointLight position={[-10, -10, 10]} intensity={0.8} castShadow />
            <directionalLight position={[5, 5, 5]} intensity={0.7} castShadow />
            <FinancialVisualization />
            {projectLinks.map((project, index) => {
              const angle = (index / projectLinks.length) * Math.PI * 2
              const radius = 3
              const x = Math.cos(angle) * radius
              const z = Math.sin(angle) * radius
              return (
                <ProjectOrb
                  key={project.name}
                  position={[x, 0, z]}
                  url={project.url}
                  name={project.name}
                  image={project.image}
                  onClickOrb={handleOrbClick}
                />
              )
            })}
            <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} autoRotateSpeed={1} />
          </Canvas>
        </div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4">
          {projectLinks.map((project) => (
            <motion.div
              key={project.name}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full h-48">
                <Image src={project.image} alt={project.name} fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-gray-300 text-sm mb-4 flex-1">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all text-sm mt-auto"
                  onClick={e => e.stopPropagation()}
                >
                  Visit Site
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <footer className="w-full bg-gray-900 py-4 mt-auto">
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/wchesedh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/weljo-chesedh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="https://twitter.com/wchesedh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            Twitter
          </a>
        </div>
      </footer>
    </section>
  )
} 