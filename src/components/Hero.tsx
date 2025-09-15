'use client'

import React, { useEffect, useState } from 'react'

const Hero = (): React.JSX.Element => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section 
      className="relative z-10 min-h-screen flex items-center justify-center px-6 overflow-hidden pt-16"
    >
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto relative z-20">
        <div className="animate-fade-in-up">
          <h6 className="text-2xl sm:text-3xl text-gray-400 mb-4 tracking-wider opacity-0 animate-fade-in-delayed-1">
            Hello, I&apos;m
          </h6>
        </div>
        
        <div className="animate-fade-in-up-delayed">
          <h1 className="text-7xl sm:text-7xl md:text-9xl font-bold mb-4 opacity-0 animate-text-reveal relative">
            <span className="block animate-slide-up-1">Rian</span>
            <span className="block animate-slide-up-2">Sen</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10 animate-glow-pulse"></div>
          </h1>
          <div className="mt-8 mb-6 animate-fade-in-delayed-2">
            <span className="text-xl sm:text-2xl text-gray-400 tracking-wider">Computer Engineering Student</span>
          </div>
        </div>
        
  <div className="animate-fade-in-up-delayed-2 mt-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-4 opacity-0 animate-fade-in-delayed-2">
            Engineering applications that{' '}
            <TypewriterText />
          </h3>
        </div>

        {/* Animated CTA Button */}
  <div className="mt-16 opacity-0 animate-fade-in-delayed-3 flex flex-col items-center gap-6">
          <button 
            onClick={scrollToProjects}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white text-lg sm:text-lg font-medium transition-all duration-500 hover:scale-105 hover:shadow-[0_12px_40px_rgba(139,92,246,0.15)] bg-white/[0.05] hover:bg-white/[0.08]"
          >
            <span className="relative z-10 transition-all duration-300">
              <span className="text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-200 group-hover:bg-clip-text group-hover:text-transparent group-hover:animate-gradient-shift group-hover:bg-[length:200%_200%]">Explore My Work</span>
              {/* Text-specific glow */}
              <span className="absolute inset-0 text-white opacity-0 group-hover:opacity-75 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-200 group-hover:bg-clip-text group-hover:text-transparent group-hover:animate-gradient-shift group-hover:bg-[length:200%_200%] blur-sm transition-all duration-300">Explore My Work</span>
            </span>
            {/* Enhanced Frosted Glass Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.02] via-purple-500/[0.01] via-pink-500/[0.01] to-cyan-500/[0.02] animate-gradient-shift opacity-60 hover:opacity-100 transition-opacity duration-500"></div>
            {/* Subtle Frosted Shimmer */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 animate-border-flow"></div>
            </div>
            {/* Additional Frosted Layer */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.03] to-transparent opacity-80"></div>
          </button>
          <div className="flex items-center justify-center gap-4">
            {/* GitHub */}
            <a href="https://github.com/senmajur" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group relative w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-105">
              <div className="w-6 h-6 relative flex items-center justify-center">
                <img src="/github.svg" alt="GitHub" className="w-6 h-6 absolute inset-0 z-10 transition-all duration-300 group-hover:opacity-0" style={{filter: 'brightness(0) saturate(100%) invert(100%)'}} />
                {/* Neon Glow Layer */}
                <span className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-80 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-200 group-hover:animate-gradient-shift group-hover:bg-[length:200%_200%] blur-md group-hover:[filter:drop-shadow(0_0_8px_rgba(139,92,246,0.8)) drop-shadow(0_0_16px_rgba(236,72,153,0.7)) drop-shadow(0_0_24px_rgba(34,211,238,0.9))] transition-all duration-300"></span>
                <div className="w-6 h-6 absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-200 animate-gradient-shift bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{WebkitMask: 'url(/github.svg) no-repeat center/contain', mask: 'url(/github.svg) no-repeat center/contain', WebkitMaskSize: 'contain', maskSize: 'contain'}}></div>
              </div>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/rian-sen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group relative w-8.5 h-8.5 flex items-center justify-center transition-all duration-300 hover:scale-105">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5 absolute inset-0 z-10 transition-all duration-300 group-hover:opacity-0" style={{filter: 'brightness(0) saturate(100%) invert(100%)'}} />
                {/* Neon Glow Layer */}
                <span className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-80 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-200 group-hover:animate-gradient-shift group-hover:bg-[length:200%_200%] blur-md group-hover:[filter:drop-shadow(0_0_8px_rgba(139,92,246,0.8)) drop-shadow(0_0_16px_rgba(236,72,153,0.7)) drop-shadow(0_0_24px_rgba(34,211,238,0.9))] transition-all duration-300"></span>
                <div className="w-5 h-5 absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-200 animate-gradient-shift bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{WebkitMask: 'url(/linkedin.svg) no-repeat center/contain', mask: 'url(/linkedin.svg) no-repeat center/contain', WebkitMaskSize: 'contain', maskSize: 'contain'}}></div>
              </div>
            </a>
            {/* Gmail */}
            <a href="mailto:rian.senmajumder@gmail.com" aria-label="Gmail" className="group relative w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-105">
              <div className="w-6 h-6 relative flex items-center justify-center">
                <img src="/gmail.svg" alt="Gmail" className="w-6 h-6 absolute inset-0 z-10 transition-all duration-300 group-hover:opacity-0" style={{filter: 'brightness(0) saturate(100%) invert(100%)'}} />
                {/* Neon Glow Layer */}
                <span className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-80 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-200 group-hover:animate-gradient-shift group-hover:bg-[length:200%_200%] blur-md group-hover:[filter:drop-shadow(0_0_8px_rgba(139,92,246,0.8)) drop-shadow(0_0_16px_rgba(236,72,153,0.7)) drop-shadow(0_0_24px_rgba(34,211,238,0.9))] transition-all duration-300"></span>
                <div className="w-6 h-6 absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-200 animate-gradient-shift bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{WebkitMask: 'url(/gmail.svg) no-repeat center/contain', mask: 'url(/gmail.svg) no-repeat center/contain', WebkitMaskSize: 'contain', maskSize: 'contain'}}></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Liquid Glass Orbs */}
      <LiquidGlassOrbs />
    </section>
  )
}

// Move phrases outside component to prevent recreation
const PHRASES = [
  "defy-gravity",
  "bend space-time", 
  "unlock new worlds",
  "break the event-horizon",
  "reach escape velocity"
]

// Typewriter Text Component
const TypewriterText = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  // Separate effect for cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Start typing after component mounts
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsTyping(true)
    }, 500) // Reduced from 1000ms to 500ms

    return () => clearTimeout(startDelay)
  }, [])

  // Main typewriter effect
  useEffect(() => {
    if (!isTyping) return

    let timeout: NodeJS.Timeout
    const currentPhrase = PHRASES[currentPhraseIndex]

    if (isDeleting) {
      // Deleting characters
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1))
        }, 80) // Faster deletion speed
      } else {
        // Finished deleting, move to next phrase
        timeout = setTimeout(() => {
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length)
        }, 200) // Brief pause before starting next phrase
      }
    } else {
      // Typing characters
      if (currentText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setCurrentText(prev => currentPhrase.slice(0, prev.length + 1))
        }, 120) // Typing speed
      } else {
        // Finished typing, pause then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 1500) // Reduced from 2000ms to 1500ms
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentPhraseIndex, isTyping])

  return (
    <span className="relative inline-block">
      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-200 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
        {currentText}
      </span>
      <span 
        className={`inline-block w-0.5 h-[1em] bg-gradient-to-b from-purple-400 to-pink-400 ml-1 transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ verticalAlign: 'baseline', transform: 'translateY(5px)' }}
      />
    </span>
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
            className={`absolute w-1 h-1 sm:w-[0.65rem] sm:h-[0.65rem] md:w-[0.65rem] md:h-[0.65rem] lg:w-[0.65rem] lg:h-[0.65rem] bg-white/30 rounded-full animate-float-${i % 4 + 1}`}
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


