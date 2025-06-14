'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Text, useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import Image from 'next/image'

const projectLinks = [
  { name: 'aguaboo.com', url: 'https://aguaboo.com', image: '/images/aguaboo.png', description: 'A modern water delivery platform for ordering and management.' },
  { name: 'sis.cmu.edu.ph/odrms', url: 'https://sis.cmu.edu.ph/odrms', image: '/images/odrms.png', description: 'Online Document Request Management System for CMU students and staff.' },
  { name: 'apps.cmu.edu.ph/hrodrs', url: 'https://apps.cmu.edu.ph/hrodrs', image: '/images/hrodrs.png', description: 'HR Online Document Request System for CMU employees.' },
  { name: 'apps.cmu.edu.ph/cmupress', url: 'https://apps.cmu.edu.ph/cmupress', image: '/images/cmupress.png', description: 'CMU Press platform for academic publishing and resources.' },
  { name: 'Bullisch Bulls', url: 'https://bull-token-site.vercel.app/', image: '/images/bullisch1.png', description: 'Successful launch of BULL token on Solana' },
]

function FinancialVisualization() {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
      ref.current.rotation.x = clock.getElapsedTime() * 0.02
    }
  })

  // Create dynamic lines connecting to points
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
      const z = (Math.random() - 0.5) * 0.5 // Slight depth variation

      // Connect to central core
      vertices.push(corePosition.x, corePosition.y, corePosition.z)
      vertices.push(x, y, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  return (
    <group ref={ref}>
      {/* Central Core */}
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} wireframe />
      </mesh>

      {/* Dynamic Connecting Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00ccff" opacity={0.6} transparent />
      </lineSegments>

      {/* Floating Points (optional for more complexity) */}
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
  const texture = useTexture(image)
  const [hovered, hover] = useState(false)

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group
        ref={ref}
        position={position}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={() => onClickOrb({ name, url, image, description: projectLinks.find(p => p.name === name).description })}
        style={{ cursor: 'pointer' }}
        scale={hovered ? 1.1 : 1} 
      >
        <mesh ref={meshRef}> 
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
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
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          className="absolute top-3 right-3 text-white text-2xl font-bold leading-none hover:text-gray-400 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center mb-4">
          <img src={project.image} alt={project.name} className="w-full h-auto max-h-96 object-contain mb-4" />
          <h3 className="text-3xl font-bold text-white text-center mb-2">{project.name}</h3>
          <p className="text-gray-300 text-center mb-4">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition-all text-lg"
          >
            Visit Site
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleOrbClick = (project) => {
    setSelectedProject(project)
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} shadows>
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
        <OrbitControls enablePan={true} enableZoom={false} autoRotate={false} autoRotateSpeed={1} />
      </Canvas>
      <h1 className="absolute top-10 text-4xl font-bold text-white z-10">My Projects</h1>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
} 