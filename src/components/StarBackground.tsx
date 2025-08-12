'use client'

import React, { useEffect, useRef, useCallback } from 'react'

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

// Throttle function for better performance
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

const StarBackground = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }, 16), // ~60fps throttling
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Add mouse event listener
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

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
    window.addEventListener('resize', resizeCanvas, { passive: true })

    // Reduce star count for better performance
    const STAR_COUNT = 150 // Reduced from 220
    
    // Create a seeded random function for consistent results across renders
    let seed = 12345 // Fixed seed for consistency
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    
    const stars: Star[] = new Array(STAR_COUNT).fill(0).map((_, i) => {
      // Use seeded random for truly organic placement while maintaining SSR consistency
      const depth = seededRandom()
      const baseRadius = 0.3 + depth * 1.8 + seededRandom() * 0.4 // Add more radius variation
      
      // Completely random positioning across the entire canvas
      const x = seededRandom() * (canvas.width / DPR)
      const y = seededRandom() * (canvas.height / DPR)
      
      // Vary speeds more naturally
      const speedVariation = seededRandom() * 0.6 - 0.3 // -0.3 to +0.3
      const speedY = 0.2 + depth * 1.2 + speedVariation
      
      // Random twinkle phases
      const twinklePhase = seededRandom() * Math.PI * 2
      
      return {
        x,
        y,
        radius: baseRadius,
        baseRadius: baseRadius,
        depth,
        speedY: Math.max(0.05, speedY), // Ensure minimum speed
        twinklePhase,
      }
    })

    let rafId = 0
    let t = 0
    let lastFrameTime = performance.now()

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

    const animate = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastFrameTime, 32) // Cap at ~30fps minimum
      lastFrameTime = currentTime
      
      t += deltaTime * 0.001 // Convert to seconds for consistent timing
      drawGradientBackground()

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

        // Move star downward at constant speed using deltaTime
        s.y += s.speedY * (deltaTime / 16) // Normalize to 60fps equivalent

        // Wrap with random repositioning for natural flow
        if (s.y - s.radius > canvas.height / DPR) {
          s.y = -2 - s.radius - seededRandom() * 50 // Random entry height
          s.x = seededRandom() * (canvas.width / DPR) // Random x position
        }
        if (s.y + s.radius < -4) {
          s.y = canvas.height / DPR + 2 + s.radius + seededRandom() * 50
          s.x = seededRandom() * (canvas.width / DPR) // Random x position
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

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start the animation with initial timestamp
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleMouseMove])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}

export default StarBackground


