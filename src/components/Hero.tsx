'use client'

import React, { useEffect, useState } from 'react'

const Hero = (): React.JSX.Element => {
  return (
    <section 
      className="relative z-10 min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto relative z-20">
        <div className="animate-fade-in-up">
          <h6 className="text-3xl text-gray-400 mb-6 tracking-wider opacity-0 animate-fade-in-delayed-1">
            Hi, my name is
          </h6>
        </div>
        
        <div className="animate-fade-in-up-delayed">
          <h1 className="text-7xl md:text-9xl font-bold mb-8 opacity-0 animate-text-reveal relative">
            <span className="block animate-slide-up-1">Rian</span>
            <span className="block animate-slide-up-2">Sen</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10 animate-glow-pulse"></div>
          </h1>
        </div>
        
        <div className="animate-fade-in-up-delayed-2">
          <h3 className="text-3xl md:text-4xl text-gray-300 mb-10 opacity-0 animate-fade-in-delayed-2">
            Engineering applications that{' '}
            <TypewriterText />
          </h3>
        </div>

        {/* Animated CTA Button */}
        <div className="mt-16 opacity-0 animate-fade-in-delayed-3">
          <button className="group relative px-10 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-lg font-medium hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(139,92,246,0.3)]">
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
      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
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


