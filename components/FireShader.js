import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  uniform float time;
  uniform vec2 mousePos; // Receive mouse position
  
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
    
    // Base noise for flame displacement
    float noise1 = noise(vUv * 6.0 + time * 5.0); // Sharper noise
    float noise2 = noise(vUv * 5.0 - time * 4.0);
    float noise3 = noise(vUv * 7.0 + time * 6.0);
    float noise4 = noise(vUv * 4.0 + time * 3.5);
    
    float combinedNoise = (noise1 + noise2 + noise3 + noise4) / 4.0;
    float verticalGradient = 1.0 - vUv.y; // Flames rise upwards
    
    // Factor in mouse position for displacement focus
    vec2 distToMouse = vUv - (mousePos * 0.5 + 0.5); // Normalize mousePos to 0-1 range
    float mouseInfluence = (1.0 - length(distToMouse) * 1.5); // Stronger influence near mouse
    mouseInfluence = clamp(mouseInfluence, 0.0, 1.0);

    vDisplacement = combinedNoise * verticalGradient * (0.6 + mouseInfluence * 0.4); // More displacement near mouse
    
    // Add some horizontal movement, more erratic near mouse
    float horizontalMovement = sin(vUv.x * 15.0 + time * 3.0 + mousePos.x * 5.0) * 0.08 * (1.0 + mouseInfluence * 0.5);
    
    // Apply displacement to position
    vec3 newPosition = position;
    newPosition.y += vDisplacement; // Vertical rise
    newPosition.x += horizontalMovement * verticalGradient; // Horizontal sway
    newPosition.z += (noise(vUv * 3.0 + time * 2.0) - 0.5) * 0.05 * (1.0 + mouseInfluence * 0.2); // Subtle z-depth variation
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec2 mousePos;
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
    // Base noise for flame shape
    float noise1 = noise(vUv * 6.0 + time * 5.0);
    float noise2 = noise(vUv * 5.0 - time * 4.0);
    float noise3 = noise(vUv * 7.0 + time * 6.0);
    float noise4 = noise(vUv * 4.0 + time * 3.5);
    
    float combinedNoise = (noise1 + noise2 + noise3 + noise4) / 4.0;
    float verticalGradient = 1.0 - vUv.y;
    
    // Sharper flame edges, influenced by mouse position
    vec2 distToMouse = vUv - (mousePos * 0.5 + 0.5); // Normalize mousePos to 0-1 range
    float mouseSharpness = (1.0 - length(distToMouse) * 2.0); // Sharper near mouse
    mouseSharpness = clamp(mouseSharpness, 0.0, 1.0);

    float flameShape = smoothstep(0.0, 0.2 + mouseSharpness * 0.1, combinedNoise * verticalGradient); // Sharper smoothstep
    flameShape = pow(flameShape, 1.5); // Exponentiate for sharper falloff
    
    // Create smoke effect, less prominent when fire is sharp
    float smokeNoise = noise(vUv * 3.0 + time * 0.7);
    float smokeShape = smoothstep(0.0, 0.7, smokeNoise * (1.0 - verticalGradient)) * (1.0 - mouseSharpness * 0.5);
    
    // Base fire colors with more intensity
    vec3 innerFire = vec3(1.0, 0.95, 0.4); // Brighter, more yellow inner fire
    vec3 outerFire = vec3(1.0, 0.5, 0.0); // Intense orange-red outer fire
    vec3 smokeColor = vec3(0.2, 0.2, 0.25); // Darker, subtle smoke

    // Color blending with increased contrast and mouse influence
    vec3 finalColor = mix(smokeColor, outerFire, flameShape);
    finalColor = mix(finalColor, innerFire, flameShape * (0.8 + mouseSharpness * 0.2)); // Inner fire more prominent near mouse
    
    // Add intense glow effect, stronger near mouse
    float glow = smoothstep(0.0, 1.0, flameShape) * (0.9 + mouseSharpness * 0.3);
    finalColor += vec3(1.0, 0.7, 0.3) * glow; // Brighter glow color
    
    // Add smoke particles
    float smokeAlpha = smokeShape * 0.5;
    finalColor = mix(finalColor, smokeColor, smokeAlpha);
    
    // Calculate final alpha with smoke and sharper falloff
    float alpha = max(smoothstep(0.0, 0.08 + mouseSharpness * 0.05, flameShape), smokeAlpha); // Sharper alpha cutoff
    alpha *= (0.7 + vDisplacement * 0.3); // Alpha also influenced by displacement
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export function FireShader({ active = false, mousePos = [0, 0] }) {
  const materialRef = useRef()
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    mousePos: { value: new THREE.Vector2(0, 0) } // Initialize mousePos uniform
  }), [])

  useFrame(({ clock }) => {
    if (materialRef.current && active) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
      materialRef.current.uniforms.mousePos.value.set(mousePos[0], mousePos[1])
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