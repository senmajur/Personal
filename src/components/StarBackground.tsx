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

// Typed throttle helper (preserves handler parameter types)
function throttle<T extends (...args: any[]) => void>(fn: T, limit: number) {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => { inThrottle = false }, limit)
    }
  }
}

const StarBackground = (): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  // Throttled mouse move handler for better performance (~60fps)
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }, 16),
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

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

    const STAR_COUNT = 150
    let seed = 12345
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    const stars: Star[] = new Array(STAR_COUNT).fill(0).map(() => {
      const depth = seededRandom()
      const baseRadius = 0.3 + depth * 1.8 + seededRandom() * 0.4
      const x = seededRandom() * (canvas.width / DPR)
      const y = seededRandom() * (canvas.height / DPR)
      const speedVariation = seededRandom() * 0.6 - 0.3
      const speedY = 0.2 + depth * 1.2 + speedVariation
      const twinklePhase = seededRandom() * Math.PI * 2
      return {
        x,
        y,
        radius: baseRadius,
        baseRadius,
        depth,
        speedY: Math.max(0.05, speedY),
        twinklePhase,
      }
    })

    let t = 0
    let lastFrameTime = performance.now()

    const drawGradientBackground = () => {
      const { width, height } = canvas
      const g = ctx.createLinearGradient(0, 0, 0, height / DPR)
      g.addColorStop(0, '#000000')
      g.addColorStop(0.55, '#10071b')
      g.addColorStop(1, '#1b0b34')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width / DPR, height / DPR)
    }

    const animate = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastFrameTime, 32)
      lastFrameTime = currentTime
      t += deltaTime * 0.001
      drawGradientBackground()

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const twinkle = 0.5 + 0.5 * Math.sin(t * (1.2 + s.depth) + s.twinklePhase)
        const dx = mouseRef.current.x - s.x
        const dy = mouseRef.current.y - s.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influenceRadius = 200
        const influence = Math.max(0, 1 - distance / influenceRadius)
        const sizeMultiplier = 1 + influence * 3
        const opacityMultiplier = 1 + influence * 1.5
        const baseOpacity = 0.25 + 0.55 * twinkle * (0.5 + s.depth * 0.5)
        const opacity = Math.min(1, baseOpacity * opacityMultiplier)
        s.radius = s.baseRadius * sizeMultiplier
        s.y += s.speedY * (deltaTime / 16)
        if (s.y - s.radius > canvas.height / DPR) {
          s.y = -2 - s.radius - seededRandom() * 50
          s.x = seededRandom() * (canvas.width / DPR)
        }
        if (s.y + s.radius < -4) {
          s.y = canvas.height / DPR + 2 + s.radius + seededRandom() * 50
          s.x = seededRandom() * (canvas.width / DPR)
        }
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

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [handleMouseMove])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}

export default StarBackground


