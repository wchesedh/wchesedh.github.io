// components/Hero3D.tsx
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function TradingGrid() {
  const gridRef = useRef()
  const time = useRef(0)
  
  // Create dynamic angular structure
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const size = 10
    const divisions = 20
    
    // Create angular lines instead of grid
    for (let i = 0; i <= divisions; i++) {
      const angle = (i / divisions) * Math.PI * 2
      const radius = size / 2
      
      // Create angular lines from center
      vertices.push(0, 0, 0) // Center point
      vertices.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      )
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  // Animate the structure
  useFrame(() => {
    time.current += 0.005
    if (gridRef.current) {
      gridRef.current.rotation.z = Math.sin(time.current) * 0.2
      gridRef.current.rotation.x = Math.cos(time.current) * 0.1
    }
  })

  return (
    <group ref={gridRef}>
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial color="#00ff88" opacity={0.2} transparent />
      </lineSegments>
    </group>
  )
}

function SharpElements() {
  return (
    <group>
      {/* Main angular structure */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>
      
      {/* Floating angular elements */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[2, 1, 0]}>
          <tetrahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial 
            color="#00ccff"
            emissive="#00ccff"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[-2, -1, 0]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color="#ff3366"
            emissive="#ff3366"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  )
}

function TradingLines() {
  const linesRef = useRef()
  const time = useRef(0)
  
  // Create animated price action pattern
  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const points = 100
    
    // Generate initial price action pattern
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 4 - 2
      vertices.push(x, 0, 0)
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  // Animate the price action
  useFrame(() => {
    time.current += 0.01
    const positions = linesGeometry.attributes.position.array
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      positions[i + 1] = Math.sin(time.current + x) * 0.5
    }
    
    linesGeometry.attributes.position.needsUpdate = true
  })

  return (
    <group>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#00ff88" linewidth={2} />
      </lineSegments>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <TradingGrid />
        <SharpElements />
        <TradingLines />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
