// components/Hero3D.tsx
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import * as random from 'maath/random'

function ForceBarrier({ radius = 5, segments = 32 }) {
  const barrierRef = useRef()
  const time = useRef(0)
  
  const barrierGeometry = useMemo(() => {
    const geometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, segments)
    return geometry
  }, [radius, segments])

  useFrame((state, delta) => {
    time.current += delta
    if (barrierRef.current) {
      barrierRef.current.rotation.z = time.current * 0.2
      barrierRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.1
    }
  })

  return (
    <group ref={barrierRef}>
      <mesh geometry={barrierGeometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color="#00ff88"
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={barrierGeometry} rotation={[0, Math.PI / 2, 0]}>
        <meshBasicMaterial 
            color="#00ccff"
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide}
          />
        </mesh>
      <mesh geometry={barrierGeometry} rotation={[0, 0, Math.PI / 2]}>
        <meshBasicMaterial 
            color="#ff3366"
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide}
          />
        </mesh>
    </group>
  )
}

function EnergyParticles({ count = 1000 }) {
  const particlesRef = useRef()
  const time = useRef(0)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      colors[i * 3] = Math.random() * 0.5 + 0.5
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5
    }
    
    return { positions, colors }
  }, [count])

  useFrame((state, delta) => {
    time.current += delta
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time.current * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Tesseract({ depth = 0, maxDepth = 2, scale = 1.5, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const groupRef = useRef()
  const time = useRef(0)
  
  // Define tesseract vertices (4D cube projected to 3D)
  const vertices = useMemo(() => {
    const v = []
    const s = scale * 0.5
    // 4D cube vertices (x, y, z, w) projected to 3D
    const points = [
      [-s, -s, -s, -s], [s, -s, -s, -s], [s, s, -s, -s], [-s, s, -s, -s],
      [-s, -s, s, -s], [s, -s, s, -s], [s, s, s, -s], [-s, s, s, -s],
      [-s, -s, -s, s], [s, -s, -s, s], [s, s, -s, s], [-s, s, -s, s],
      [-s, -s, s, s], [s, -s, s, s], [s, s, s, s], [-s, s, s, s]
    ]

    // Project 4D to 3D (simple projection)
    points.forEach(([x, y, z, w]) => {
      const factor = 1 / (w + 2)
      v.push(x * factor, y * factor, z * factor)
    })

    return v
  }, [scale])

  // Define edges of the tesseract
  const edges = useMemo(() => {
    const e = []
    // Connect vertices to form edges
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 0], // bottom face
      [4, 5], [5, 6], [6, 7], [7, 4], // top face
      [0, 4], [1, 5], [2, 6], [3, 7], // vertical edges
      [8, 9], [9, 10], [10, 11], [11, 8], // inner bottom
      [12, 13], [13, 14], [14, 15], [15, 12], // inner top
      [8, 12], [9, 13], [10, 14], [11, 15], // inner vertical
      [0, 8], [1, 9], [2, 10], [3, 11], // connecting edges
      [4, 12], [5, 13], [6, 14], [7, 15]  // connecting edges
    ]

    connections.forEach(([a, b]) => {
      e.push(
        vertices[a * 3], vertices[a * 3 + 1], vertices[a * 3 + 2],
        vertices[b * 3], vertices[b * 3 + 1], vertices[b * 3 + 2]
      )
    })

    return e
  }, [vertices])

  // Create geometry for edges
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(edges, 3))
    return geo
  }, [edges])

  // Animation
  useFrame((state, delta) => {
    time.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.2
      groupRef.current.rotation.y = time.current * 0.5
      groupRef.current.rotation.z = Math.cos(time.current * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial 
          color={depth === 0 ? "#00ff88" : "#00ccff"} 
          opacity={0.7 - (depth / maxDepth) * 0.4} 
          transparent 
          linewidth={depth === 0 ? 2 : 1}
        />
      </lineSegments>

      {depth < maxDepth && (
        <>
          <Tesseract 
            depth={depth + 1} 
            maxDepth={maxDepth} 
            scale={scale * 0.6} 
            position={[scale * 0.5, scale * 0.5, scale * 0.5]} 
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
          />
          <Tesseract 
            depth={depth + 1} 
            maxDepth={maxDepth} 
            scale={scale * 0.6} 
            position={[-scale * 0.5, scale * 0.5, scale * 0.5]} 
            rotation={[-Math.PI / 4, Math.PI / 4, 0]}
          />
          <Tesseract 
            depth={depth + 1} 
            maxDepth={maxDepth} 
            scale={scale * 0.6} 
            position={[scale * 0.5, -scale * 0.5, scale * 0.5]} 
            rotation={[Math.PI / 4, -Math.PI / 4, 0]}
          />
          <Tesseract 
            depth={depth + 1} 
            maxDepth={maxDepth} 
            scale={scale * 0.6} 
            position={[-scale * 0.5, -scale * 0.5, scale * 0.5]} 
            rotation={[-Math.PI / 4, -Math.PI / 4, 0]}
          />
        </>
      )}
    </group>
  )
}

function Scene() {
  return (
    <group>
      <Tesseract scale={2} maxDepth={2} />
      <ForceBarrier radius={5} />
      <EnergyParticles count={300} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Scene />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  )
}
