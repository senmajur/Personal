'use client'

import { useEffect, useRef, useState } from 'react'

type Star = {
  x: number
  y: number
  radius: number
  depth: number
  speedY: number
  twinklePhase: number
  baseRadius: number
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const StarBackground = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Separate effect for mouse position tracking to avoid re-initializing stars
  const mouseRef = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window
      canvas.width = Math.floor(innerWidth * DPR)
      canvas.height = Math.floor(innerHeight * DPR)
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Build a multi-depth star field
    const STAR_COUNT = 220
    const stars: Star[] = new Array(STAR_COUNT).fill(0).map((_, i) => {
      const depth = (i * 0.618) % 1 // Use golden ratio for distribution to avoid hydration issues
      const baseRadius = 0.4 + depth * 1.6
      return {
        x: (i * 47.3) % (canvas.width / DPR),
        y: (i * 31.7) % (canvas.height / DPR),
        radius: baseRadius,
        baseRadius: baseRadius,
        depth,
        speedY: 0.1 + depth * 0.9,
        twinklePhase: (i * 0.123) % (Math.PI * 2),
      }
    })

    // Scroll reactive velocity
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    let lastTs = performance.now()

    const onScroll = () => {
      const now = performance.now()
      const dy = window.scrollY - lastScrollY
      const dt = Math.max(16, now - lastTs)
      // pixels per ms, smoothed
      const v = dy / dt
      scrollVelocity = scrollVelocity * 0.9 + v * 0.6
      lastScrollY = window.scrollY
      lastTs = now
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    let rafId = 0
    let t = 0

    const drawGradientBackground = () => {
      // Darker black -> deep purple vertical gradient
      const { width, height } = canvas
      const g = ctx.createLinearGradient(0, 0, 0, height / DPR)
      g.addColorStop(0, '#000000')
      g.addColorStop(0.55, '#10071b')
      g.addColorStop(1, '#1b0b34')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width / DPR, height / DPR)
    }

    const animate = () => {
      t += 0.016
      drawGradientBackground()

      // small parallax based on scroll velocity
      const velocityBoost = clamp(scrollVelocity, -1.5, 1.5)

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const twinkle = 0.5 + 0.5 * Math.sin(t * (1.2 + s.depth) + s.twinklePhase)
        
        // Calculate distance from cursor
        const dx = mouseRef.current.x - s.x
        const dy = mouseRef.current.y - s.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Cursor influence (200px radius for more noticeable effect)
        const influenceRadius = 200
        const influence = Math.max(0, 1 - distance / influenceRadius)
        
        // Enhanced size and opacity based on cursor proximity (more dramatic)
        const sizeMultiplier = 1 + influence * 3 // Stars can grow up to 4x
        const opacityMultiplier = 1 + influence * 1.5 // More brightness increase
        
        const baseOpacity = 0.25 + 0.55 * twinkle * (0.5 + s.depth * 0.5)
        const opacity = Math.min(1, baseOpacity * opacityMultiplier)
        
        // Update star radius based on cursor influence
        s.radius = s.baseRadius * sizeMultiplier

        // Move star downward; accelerate slightly with scroll
        s.y += s.speedY + velocityBoost * (0.6 + s.depth)

        // Wrap
        if (s.y - s.radius > canvas.height / DPR) {
          s.y = -2 - s.radius
          s.x = (i * 47.3) % (canvas.width / DPR)
        }
        if (s.y + s.radius < -4) {
          s.y = canvas.height / DPR + 2 + s.radius
          s.x = (i * 47.3) % (canvas.width / DPR)
        }

        // Draw enhanced glow when cursor is close
        if (influence > 0.2) {
          const glowRadius = s.radius * (1 + influence * 3)
          const glowOpacity = influence * 0.25
          
          ctx.beginPath()
          ctx.arc(s.x, s.y, glowRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200,180,255,${glowOpacity.toFixed(3)})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`
        ctx.shadowColor = `rgba(160,120,255,${(0.25 + influence * 0.6).toFixed(3)})`
        ctx.shadowBlur = (6 * (0.5 + s.depth)) * (1 + influence * 1.2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // decay velocity gradually
      scrollVelocity *= 0.92
      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}

export default StarBackground


