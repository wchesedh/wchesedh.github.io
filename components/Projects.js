"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Text, useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CometCursor from './CometCursor'
import { FireShader } from './FireShader'

const projectLinks = [
  { name: 'University Online Document Request', url: 'https://sis.cmu.edu.ph/odrms', image: '/images/odrms.png', description: 'Online Document Request Management System for CMU students and staff.' },
  { name: 'HR Online Document Request', url: 'https://apps.cmu.edu.ph/hrodrs', image: '/images/hrodrs.png', description: 'HR Online Document Request System for CMU employees.' },
  { name: 'CMUPress', url: 'https://apps.cmu.edu.ph/cmupress', image: '/images/cmupress.png', description: 'CMU Press platform for academic publishing and resources.' },
  { name: 'Aguaboo', url: 'https://aguaboo.com', image: '/images/aguaboo.png', description: 'A modern water delivery platform for ordering and management.' },
  { name: 'Bullisch Bull Official Site', url: 'https://bull-token-site.vercel.app/', image: '/images/bullisch1.png', description: 'Successful launch of BULL token on Solana' },
]

function FinancialVisualization() {
  const ref = useRef()
  const materialRef = useRef()
  const [isHovered, setIsHovered] = useState(false)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
      ref.current.rotation.x = clock.getElapsedTime() * 0.02
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
      materialRef.current.uniforms.isHovered.value = isHovered ? 1.0 : 0.0
    }
  })

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    isHovered: { value: 0 }
  }), [])

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float time;
    uniform float isHovered;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    float PI = 3.14159265359;

    // Noise functions
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      // Calculate radial distance from center
      float radialDistance = length(vUv - vec2(0.5));
      
      // Time for animation
      float t = time;
      
      // *** Original Sun/Supernova Core ***
      float coreIntensity = 1.0 - smoothstep(0.0, 0.3, radialDistance);
      float corePulse = sin(t * 2.0) * 0.1 + 0.9;
      
      // Original Energy Waves
      float wave1 = sin(radialDistance * 20.0 - t * 5.0) * 0.5 + 0.5;
      float wave2 = sin(radialDistance * 15.0 + t * 3.0) * 0.5 + 0.5;
      float energyWaves = (wave1 + wave2) * 0.5;
      float energyMask = smoothstep(0.3, 0.7, radialDistance);
      
      // *** New Dynamic Sun Effects ***
      
      // Subtle Explosions (bright spots)
      float explosionNoise1 = noise(vUv * 8.0 + t * 7.0);
      float explosionNoise2 = noise(vUv * 12.0 - t * 9.0);
      float explosionNoise3 = noise(vUv * 10.0 + t * 6.0);
      float combinedExplosionNoise = (explosionNoise1 + explosionNoise2 + explosionNoise3) / 3.0;
      float explosionEffect = smoothstep(0.7, 1.0, combinedExplosionNoise) * (sin(t * 15.0) * 0.5 + 0.5); // Pulsing for flicker
      explosionEffect *= (1.0 - radialDistance); // More intense closer to center

      // Subtle Dark Spots (sunspots)
      float darkSpotNoise1 = noise(vUv * 5.0 - t * 2.0);
      float darkSpotNoise2 = noise(vUv * 7.0 + t * 3.0);
      float combinedDarkSpotNoise = (darkSpotNoise1 + darkSpotNoise2) / 2.0;
      float darkSpotEffect = smoothstep(0.4, 0.6, combinedDarkSpotNoise);
      darkSpotEffect *= (1.0 - radialDistance * 0.5); // More defined closer to center

      // Original Dynamic Noise for surface detail
      float noise1 = noise(vUv * 4.0 + t * 3.0);
      float noise2 = noise(vUv * 3.0 - t * 2.0);
      float noise3 = noise(vUv * 5.0 + t * 4.0);
      float combinedNoise = (noise1 + noise2 + noise3) / 3.0;
      
      // Sun/supernova colors
      vec3 coreColor = vec3(1.0, 0.9, 0.6); // Bright yellow-white core
      vec3 energyColor = vec3(1.0, 0.4, 0.1); // Orange energy
      vec3 outerColor = vec3(0.5, 0.1, 0.8); // Purple outer glow
      
      // Mix colors based on distance from core
      vec3 finalColor = mix(coreColor, energyColor, energyMask);
      finalColor = mix(finalColor, outerColor, smoothstep(0.5, 1.0, radialDistance));
      
      // Add pulsing core
      finalColor += coreColor * coreIntensity * corePulse;
      
      // Add energy waves
      finalColor += energyColor * energyWaves * energyMask;
      
      // Add noise-based detail
      finalColor += vec3(1.0, 0.6, 0.2) * combinedNoise * 0.3;

      // Apply subtle explosions (add light to areas)
      finalColor += coreColor * explosionEffect * 0.7; // Brighter core color for explosions

      // Apply subtle dark spots (subtract light from areas)
      finalColor -= finalColor * darkSpotEffect * 0.4; // Reduce existing color for dark spots
      
      // Calculate alpha with glow
      float alpha = smoothstep(1.0, 0.0, radialDistance) * 0.8;
      alpha += coreIntensity * corePulse * 0.5;
      alpha += energyWaves * energyMask * 0.3;

      // Adjust alpha for explosions and dark spots
      alpha += explosionEffect * 0.3; // Make explosions more opaque
      alpha -= darkSpotEffect * 0.2; // Make dark spots slightly more transparent/less visible

      // Add ray effect on hover
      if (isHovered > 0.5) {
        float raySpeed = t * 20.0;
        float rayWidth = 0.05;
        float numRays = 10.0;
        
        for (float i = 0.0; i < numRays; i++) {
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float rayPattern = fract(angle * (numRays / (2.0 * PI)) + raySpeed + i * 0.5);
          float rayIntensity = smoothstep(0.0, rayWidth, rayPattern) - smoothstep(rayWidth, rayWidth * 2.0, rayPattern);
          finalColor += vec3(1.0, 1.0, 0.5) * rayIntensity * 0.8;
          alpha += rayIntensity * 0.5;
        }
      }
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
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
        {/* Base orb */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Fire effect overlay */}
        {hovered && (
          <mesh>
            <sphereGeometry args={[0.31, 32, 32]} />
            <FireShader active={true} />
          </mesh>
        )}
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