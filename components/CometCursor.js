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
          width: 40,
          height: 40,
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          boxShadow: '0 0 30px 10px rgba(0, 234, 255, 1), 0 0 80px 30px rgba(0, 234, 255, 0.5)', // Most prominent glow
          background: 'radial-gradient(circle at 30% 30%, #fff 80%, #00eaff 100%)', // Max brightness for head
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
            width: 24,
            height: 24,
            pointerEvents: 'none',
            zIndex: 9998,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 30%, rgba(0, 234, 255, 0.7) 100%)', // Max visible tail colors
            filter: 'blur(3px)', // More blur for a smoother, thicker trail
            opacity: 0.9,
            transition: 'opacity 0.05s',
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </>
  )
} 