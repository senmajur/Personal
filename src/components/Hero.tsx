'use client'

import { useEffect, useRef, useState } from 'react'

const Hero = (): JSX.Element => {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const rate = scrolled * -0.5
      hero.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto relative z-20">
        <div className="animate-fade-in-up">
          <h6 className="text-sm text-gray-400 mb-4 tracking-wider opacity-0 animate-fade-in-delayed-1">
            Hi, my name is
          </h6>
        </div>
        
        <div className="animate-fade-in-up-delayed">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 opacity-0 animate-text-reveal relative">
            <span className="block animate-slide-up-1">Rian</span>
            <span className="block animate-slide-up-2">Sen</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10 animate-glow-pulse"></div>
          </h1>
        </div>
        
        <div className="animate-fade-in-up-delayed-2">
          <h3 className="text-2xl md:text-3xl text-gray-300 mb-8 opacity-0 animate-fade-in-delayed-3">
            My coding skills are{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              out of this world
            </span>
          </h3>
        </div>

        {/* Animated CTA Button */}
        <div className="mt-12 opacity-0 animate-fade-in-delayed-4">
          <button className="group relative px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(139,92,246,0.3)]">
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-xl"></div>
          </button>
        </div>
      </div>

      {/* Liquid Glass Orbs */}
      <LiquidGlassOrbs />
    </section>
  )
}

// Floating Particles Component
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => {
        // Use index-based positioning for consistent SSR/client rendering
        const left = (i * 23.7) % 100
        const top = (i * 17.3) % 100
        const delay = (i * 0.3) % 5
        const duration = 3 + (i % 4)
        
        return (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/30 rounded-full animate-float-${i % 4 + 1}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          />
        )
      })}
    </div>
  )
}

// Liquid Glass Orbs Component
const LiquidGlassOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-morph-1"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-morph-2"></div>
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-pink-500/30 to-orange-500/20 rounded-full blur-2xl animate-morph-3"></div>
    </div>
  )
}

export default Hero


