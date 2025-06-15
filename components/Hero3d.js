// components/Hero3D.tsx
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Tesseract({ depth = 0, maxDepth = 3, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
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
      {/* Main tesseract */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial 
          color={depth === 0 ? "#00ff88" : "#00ccff"} 
          opacity={1 - (depth / maxDepth) * 0.7} 
          transparent 
        />
      </lineSegments>

      {/* Recursive smaller tesseracts */}
      {depth < maxDepth && (
        <>
          <Tesseract 
            depth={depth + 1} 
            maxDepth={maxDepth} 
            scale={scale * 0.5} 
            position={[scale * 0.5, scale * 0.5, scale * 0.5]} 
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
          />
          <Tesseract 
            depth={depth + 1} 
            maxDepth={maxDepth} 
            scale={scale * 0.5} 
            position={[-scale * 0.5, scale * 0.5, scale * 0.5]} 
            rotation={[-Math.PI / 4, Math.PI / 4, 0]}
          />
          <Tesseract 
            depth={depth + 1} 
            maxDepth={maxDepth} 
            scale={scale * 0.5} 
            position={[scale * 0.5, -scale * 0.5, scale * 0.5]} 
            rotation={[Math.PI / 4, -Math.PI / 4, 0]}
          />
          <Tesseract 
            depth={depth + 1} 
            maxDepth={maxDepth} 
            scale={scale * 0.5} 
            position={[-scale * 0.5, -scale * 0.5, scale * 0.5]} 
            rotation={[-Math.PI / 4, -Math.PI / 4, 0]}
          />
        </>
      )}
    </group>
  )
}

function InfiniteTesseract() {
  return (
    <group>
      <Tesseract scale={2} maxDepth={3} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <InfiniteTesseract />
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
