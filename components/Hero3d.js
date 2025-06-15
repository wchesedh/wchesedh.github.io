// components/Hero3D.tsx
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial, useTexture } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import * as random from 'maath/random'

// Enhanced particle system with multiple layers
function Particles({ count = 2000, radius = 4, speed = 0.2 }) {
  const points = useRef()
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(count * 3), { radius })
  )

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta * speed
      points.current.rotation.y -= delta * (speed * 0.8)
      points.current.rotation.z += delta * (speed * 0.5)
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff88"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.2}
        />
      </Points>
    </group>
  )
}

// Dynamic floating rings with glow effect
function FloatingRings() {
  const ringsRef = useRef()
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.sin(time.current * 0.2) * 0.1
      ringsRef.current.rotation.y = time.current * 0.1
      ringsRef.current.rotation.z = Math.cos(time.current * 0.15) * 0.1
    }
  })

  return (
    <group ref={ringsRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, i * 0.3 - 0.5]}>
          <torusGeometry args={[1.5 + i * 0.3, 0.01, 16, 100]} />
          <meshBasicMaterial 
            color="#00ff88"
            transparent 
            opacity={0.15 - i * 0.05} 
            wireframe 
          />
        </mesh>
      ))}
    </group>
  )
}

// Energy field effect
function EnergyField() {
  const meshRef = useRef()
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (meshRef.current) {
      meshRef.current.rotation.y = time.current * 0.2
      meshRef.current.material.uniforms.time.value = time.current
    }
  })

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color: { value: new THREE.Color("#00ff88") }
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
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    void main() {
      float n = noise(vUv * 10.0 + time);
      float pattern = sin(vUv.x * 20.0 + time) * sin(vUv.y * 20.0 + time * 0.5);
      float alpha = (0.5 + pattern * 0.5) * 0.1;
      gl_FragColor = vec4(color, alpha * (0.5 + n * 0.5));
    }
  `

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// Enhanced tesseract with consistent colors
function Tesseract({ depth = 0, maxDepth = 2, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const groupRef = useRef()
  const time = useRef(0)
  const [hovered, setHovered] = useState(false)

  const vertices = useMemo(() => {
    const v = []
    const s = scale * 0.5
    const points = [
      [-s, -s, -s, -s], [s, -s, -s, -s], [s, s, -s, -s], [-s, s, -s, -s],
      [-s, -s, s, -s], [s, -s, s, -s], [s, s, s, -s], [-s, s, s, -s],
      [-s, -s, -s, s], [s, -s, -s, s], [s, s, -s, s], [-s, s, -s, s],
      [-s, -s, s, s], [s, -s, s, s], [s, s, s, s], [-s, s, s, s]
    ]

    points.forEach(([x, y, z, w]) => {
      const factor = 1 / (w + 2)
      v.push(x * factor, y * factor, z * factor)
    })

    return v
  }, [scale])

  const edges = useMemo(() => {
    const e = []
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      [8, 9], [9, 10], [10, 11], [11, 8],
      [12, 13], [13, 14], [14, 15], [15, 12],
      [8, 12], [9, 13], [10, 14], [11, 15],
      [0, 8], [1, 9], [2, 10], [3, 11],
      [4, 12], [5, 13], [6, 14], [7, 15]
    ]

    connections.forEach(([a, b]) => {
      e.push(
        vertices[a * 3], vertices[a * 3 + 1], vertices[a * 3 + 2],
        vertices[b * 3], vertices[b * 3 + 1], vertices[b * 3 + 2]
      )
    })

    return e
  }, [vertices])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(edges, 3))
    return geo
  }, [edges])

  useFrame((state, delta) => {
    time.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.1
      groupRef.current.rotation.y = time.current * 0.2
      groupRef.current.rotation.z = Math.cos(time.current * 0.3) * 0.1
      
      // Subtle scale effect on hover
      if (hovered) {
        groupRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1)
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <lineSegments geometry={geometry}>
        <lineBasicMaterial 
          color="#00ff88"
          opacity={0.4 - (depth / maxDepth) * 0.2} 
          transparent 
        />
      </lineSegments>

      {/* Glow effect */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial 
          color="#00ff88"
          opacity={0.1 - (depth / maxDepth) * 0.05} 
          transparent 
          linewidth={2}
        />
      </lineSegments>

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

function Scene() {
  return (
    <group>
      <EnergyField />
      <Tesseract scale={1.5} maxDepth={2} />
      <FloatingRings />
      <Particles count={2000} radius={4} speed={0.2} />
      <Particles count={1500} radius={5} speed={0.15} />
      <Particles count={1000} radius={6} speed={0.1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={0.2} color="#00ff88" />
    </group>
  )
}

export default function Hero3D({ children }) {
  return (
    <div className="relative w-full h-screen flex">
      {/* Content Container - Takes up 50% of the width */}
      <div className="w-1/2 h-full flex items-center justify-center p-8 relative z-10">
        <div className="max-w-xl">
          {children}
        </div>
      </div>

      {/* 3D Visualization Container - Takes up 80% of the width and overlaps */}
      <div className="absolute right-0 w-4/5 h-full">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Scene />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.2}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </div>
  )
}
