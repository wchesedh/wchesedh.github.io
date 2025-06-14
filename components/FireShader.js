import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  uniform float time;
  
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
    vUv = uv;
    vPosition = position;
    
    // Create more dynamic flame displacement
    float noise1 = noise(vUv * 4.0 + time * 3.0);
    float noise2 = noise(vUv * 3.0 - time * 2.0);
    float noise3 = noise(vUv * 5.0 + time * 4.0);
    float noise4 = noise(vUv * 2.0 + time * 1.5);
    
    float combinedNoise = (noise1 + noise2 + noise3 + noise4) / 4.0;
    float verticalGradient = 1.0 - vUv.y;
    
    // Increase displacement for more dramatic flames
    vDisplacement = combinedNoise * verticalGradient * 0.8;
    
    // Add some horizontal movement
    float horizontalMovement = sin(vUv.x * 10.0 + time * 2.0) * 0.1;
    
    // Apply displacement to position
    vec3 newPosition = position;
    newPosition.y += vDisplacement;
    newPosition.x += horizontalMovement * verticalGradient;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vDisplacement;
  
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
    // Create more dynamic flame shape
    float noise1 = noise(vUv * 4.0 + time * 3.0);
    float noise2 = noise(vUv * 3.0 - time * 2.0);
    float noise3 = noise(vUv * 5.0 + time * 4.0);
    float noise4 = noise(vUv * 2.0 + time * 1.5);
    
    float combinedNoise = (noise1 + noise2 + noise3 + noise4) / 4.0;
    float verticalGradient = 1.0 - vUv.y;
    
    // Create sharper flame edges
    float flameShape = smoothstep(0.0, 0.3, combinedNoise * verticalGradient);
    
    // Create smoke effect
    float smokeNoise = noise(vUv * 2.0 + time * 0.5);
    float smokeShape = smoothstep(0.0, 0.8, smokeNoise * (1.0 - verticalGradient));
    
    // Base fire colors with more intensity
    vec3 innerFire = vec3(1.0, 0.9, 0.3); // Brighter yellow-orange
    vec3 outerFire = vec3(1.0, 0.4, 0.0); // More intense orange-red
    vec3 smokeColor = vec3(0.3, 0.3, 0.35); // Slightly blue-tinted smoke
    
    // Mix colors based on flame shape with more contrast
    vec3 finalColor = mix(smokeColor, mix(outerFire, innerFire, flameShape), flameShape);
    
    // Add more intense glow effect
    float glow = smoothstep(0.0, 1.0, flameShape) * 0.8;
    finalColor += vec3(1.0, 0.6, 0.2) * glow;
    
    // Add smoke particles
    float smokeAlpha = smokeShape * 0.6;
    finalColor = mix(finalColor, smokeColor, smokeAlpha);
    
    // Calculate final alpha with smoke
    float alpha = max(smoothstep(0.0, 0.1, flameShape), smokeAlpha);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export function FireShader({ active = false }) {
  const materialRef = useRef()
  const uniforms = useMemo(() => ({
    time: { value: 0 }
  }), [])

  useFrame(({ clock }) => {
    if (materialRef.current && active) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
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
  )
} 