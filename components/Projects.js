"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Text, useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CometCursor from './CometCursor'
import { FireShader } from './FireShader'
import { AsteroidBelt } from './AsteroidBelt'

const projectLinks = [
  { name: 'Aguaboo', url: 'https://aguaboo.com', image: '/images/aguaboo.png', description: 'A modern water delivery platform for ordering and management.' },
  { name: 'TrackWise', url: 'https://teacher-app-seven.vercel.app/', image: '/images/trackwise.png', description: 'A teacher-parent forum for discussing children\'s daily activities.' },
  { name: 'University Online Document Request', url: 'https://sis.cmu.edu.ph/odrms', image: '/images/odrms.png', description: 'Online Document Request Management System for CMU students and staff.' },
  { name: 'CMUPress', url: 'https://apps.cmu.edu.ph/cmupress', image: '/images/cmupress.png', description: 'CMU Press platform for academic publishing and resources.' },
  { name: 'HR Online Document Request', url: 'https://apps.cmu.edu.ph/hrodrs', image: '/images/hrodrs.png', description: 'HR Online Document Request System for CMU employees.' },
  { name: 'CAEP South East Asia', url: 'https://caepsea.com', image: '/images/caepsea.png', description: 'Study Work Travel Application System by CAEP South East Asia. Partners with Swiss program Study Work Travel to open doors for young adventurous individuals seeking programs and opportunities in Europe to hone professional skills, build credentials, and personal growth. Welcomes Filipinos and Indonesians to join the program.' },
  { name: 'M.M. Stud Farm Management System', url: 'https://qhive-innovations.com/studfarm/', image: '/images/studfarm.png', description: 'A web-based management system for M.M. Stud Farm, providing access-controlled tools for managing stud farm operations and records.' },
  { name: 'Point of Sale System', url: 'https://wcplpointofsale.onrender.com', image: '/images/pospic.png', description: 'A point-of-sale web application, featuring managing sales and transactions.' },
  { name: 'Dental Clinic Management System', url: 'https://rodrigoorthodentalclinic.onrender.com/', image: '/images/dmspic.png', description: 'A dental clinic management system that enables staff to securely manage patient-related operations.' },
]

function FinancialVisualization() {
  const ref = useRef()
  const materialRef = useRef()

  const uniforms = useMemo(() => ({
    time: { value: 0 }
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

      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
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

function ProjectOrb({ url, name, image, onClickOrb, orbitalRadius, orbitalSpeed, startAngleOffset }) {
  const ref = useRef()
  const meshRef = useRef()
  const texture = useTexture(image)
  const [hovered, hover] = useState(false)
  const [mousePos, setMousePos] = useState([0, 0])

  useFrame(({ camera, clock }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position)
    }
    // Orbital motion
    const t = clock.getElapsedTime() * orbitalSpeed
    const x = Math.cos(startAngleOffset + t) * orbitalRadius
    const z = Math.sin(startAngleOffset + t) * orbitalRadius
    const y = Math.sin(t * 0.5 + startAngleOffset) * 0.5 // Add subtle up and down motion

    if (ref.current) {
      ref.current.position.set(x, y, z)
    }
  })

  // Handle mouse move to get relative position within the orb
  const handlePointerMove = (event) => {
    if (meshRef.current) {
      // Get intersection point in local coordinates of the mesh
      const intersection = event.point.clone().sub(meshRef.current.position);

      // Normalize to -1 to 1 range across the sphere
      const normalizedX = intersection.x / (0.3); // 0.3 is sphere radius
      const normalizedY = intersection.y / (0.3);
      setMousePos([normalizedX, normalizedY]);
    }
  };

  return (
    <group
      ref={ref}
      // position is now handled by useFrame hook
      onPointerOver={(e) => {
        hover(true);
        handlePointerMove(e); // Capture initial position on hover
      }}
      onPointerOut={() => {
        hover(false);
        setMousePos([0, 0]); // Reset on hover out
      }}
      onPointerMove={handlePointerMove} // Update position on move
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
          <FireShader active={true} mousePos={mousePos} /> {/* Pass mousePos to FireShader */}
        </mesh>
      )}
    </group>
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
          <img src={project.image} alt={project.name} className="w-full h-auto max-h-96 object-contain mb-4 rounded-lg" />
          <h3 className="text-3xl font-bold text-white text-center mb-2">{project.name}</h3>
          <p className="text-gray-300 text-center mb-6">{project.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-center"
            >
              <span>Visit Site</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-700 text-white font-medium shadow-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 text-center"
            >
              <span>Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
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

  const orbitalRadius = 3.5
  const orbitalSpeed = 0.2

  return (
    <section id="projects" className="relative bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">My Projects</h2>
        <p className="text-gray-400 text-center mb-2 text-sm md:text-base">
          Sample projects showcased below. I also have projects running locally and desktop applications.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === '3d' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-700 hover:text-white'}`}
          >
            3D View
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-700 hover:text-white'}`}
          >
            View All
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {activeTab === '3d' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex-grow w-full flex justify-center items-center h-[80vh] relative"
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
                <AsteroidBelt />
                <group>
                  {projectLinks.map((project, index) => {
                    const startAngleOffset = (index / projectLinks.length) * Math.PI * 2
                    return (
                      <ProjectOrb
                        key={project.name}
                        url={project.url}
                        name={project.name}
                        image={project.image}
                        onClickOrb={handleOrbClick}
                        orbitalRadius={orbitalRadius}
                        orbitalSpeed={orbitalSpeed}
                        startAngleOffset={startAngleOffset}
                      />
                    )
                  })}
                </group>
                <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} autoRotateSpeed={1} />
              </Canvas>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {projectLinks.map((project) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative w-full aspect-video">
                    <Image 
                      src={project.image} 
                      alt={project.name} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 flex-1">{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-sm"
                      onClick={e => e.stopPropagation()}
                    >
                      <span>Visit Site</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
} 