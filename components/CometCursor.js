import { useEffect, useRef, useMemo } from 'react'

export default function CometCursor({ active }) {
  const cursorRef = useRef(null)
  const tailSegments = useRef([])

  useEffect(() => {
    if (!active) return

    const cometHead = cursorRef.current
    const tailElements = tailSegments.current
    const tailLength = 30 // Significantly increased length for maximum prominence

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let rafId

    // Initialize tail positions
    let tailPositions = Array(tailLength).fill({ x: mouseX, y: mouseY })

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      // Update tail positions
      tailPositions = [
        { x: mouseX, y: mouseY },
        ...tailPositions.slice(0, tailLength - 1),
      ]

      // Animate comet head
      if (cometHead) {
        cometHead.style.transform = `translate3d(${mouseX - 20}px, ${mouseY - 20}px, 0)` // Even larger head
      }

      // Animate tail segments
      tailPositions.forEach((pos, i) => {
        const el = tailElements[i]
        if (el) {
          el.style.transform = `translate3d(${pos.x - 12}px, ${pos.y - 12}px, 0)` // Even larger tail segments
          el.style.opacity = `${0.95 - (i / tailLength) * 0.8}` // Maximize opacity decay for strongest trail
        }
      })

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [active])

  if (!active) return null

  return (
    <>
      {/* Main comet head */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 25,
          height: 25,
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          boxShadow: '0 0 6px 1px rgba(0, 234, 255, 0.2), 0 0 10px 3px rgba(0, 234, 255, 0.1)',
          background: 'radial-gradient(circle at 30% 30%, #ccc 30%, #0090a0 100%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Trailing tail */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (tailSegments.current[i] = el)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 12,
            height: 12,
            pointerEvents: 'none',
            zIndex: 9998,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 30%, rgba(0, 150, 160, 0.15) 100%)',
            filter: 'blur(0.8px)',
            opacity: 0.25,
            transition: 'opacity 0.05s',
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </>
  )
} 