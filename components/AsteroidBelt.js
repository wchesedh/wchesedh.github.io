import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AsteroidBelt() {
  const asteroidRefs = useRef([])
  const numAsteroids = 150 // Slightly reduced number for less clutter
  const beltInnerRadius = 3.5 // Inner radius of the asteroid belt
  const beltOuterRadius = 4.5 // Outer radius of the asteroid belt

  // Generate asteroid properties once
  const asteroidProps = useMemo(() => {
    return Array.from({ length: numAsteroids }).map(() => ({
      radius: beltInnerRadius + Math.random() * (beltOuterRadius - beltInnerRadius),
      speed: 0.05 + Math.random() * 0.1, // Slower for outer asteroids, faster for inner
      startAngle: Math.random() * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * 0.5, // Slight vertical scattering
      rotationSpeed: new THREE.Vector3(Math.random() * 0.05, Math.random() * 0.05, Math.random() * 0.05),
      size: 0.005 + Math.random() * 0.02 // Significantly smaller sizes
    }))
  }, [numAsteroids, beltInnerRadius, beltOuterRadius])

  useFrame(({ clock }) => {
    asteroidProps.forEach((props, i) => {
      const asteroid = asteroidRefs.current[i]
      if (asteroid) {
        const t = clock.getElapsedTime() * props.speed
        const x = Math.cos(props.startAngle + t) * props.radius
        const z = Math.sin(props.startAngle + t) * props.radius
        const y = props.yOffset

        asteroid.position.set(x, y, z)
        asteroid.rotation.x += props.rotationSpeed.x
        asteroid.rotation.y += props.rotationSpeed.y
        asteroid.rotation.z += props.rotationSpeed.z
      }
    })
  })

  return (
    <group>
      {asteroidProps.map((props, i) => (
        <mesh key={i} ref={el => asteroidRefs.current[i] = el}>
          <sphereGeometry args={[props.size, 6, 6]} /> {/* Reduced segments for a more 'rocky' look */}
          <meshStandardMaterial color={new THREE.Color(0.2, 0.2, 0.2)} /> {/* Darker grey for less prominence */}
        </mesh>
      ))}
    </group>
  )
} 