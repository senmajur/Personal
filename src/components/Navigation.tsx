'use client'

import React, { useEffect, useState, useCallback } from 'react'

// Typed throttle helper
const throttle = <T extends (...args: unknown[]) => void>(fn: T, limit: number): ((...args: Parameters<T>) => void) => {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => { inThrottle = false }, limit)
    }
  }
}

const Navigation = (): React.JSX.Element => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  // Throttled scroll handler for better performance
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    throttle(() => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      // Update active section based on scroll position
      const sections = ['skills', 'experience', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (current) setActiveSection(current)
    }, 50), // Throttle to 20fps for scroll events
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const navItems = [
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav className="fixed top-2 sm:top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-6xl px-2 sm:px-4 lg:px-6 pointer-events-auto">
        <div
          className={`
            relative rounded-full backdrop-blur-2xl 
            shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3
            transition-all duration-500 hover:shadow-[0_12px_40px_rgba(139,92,246,0.15)]
            ${scrolled ? 'bg-white/[0.08]' : 'bg-white/[0.05]'}
          `}
        >
          {/* Enhanced Frosted Glass Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.02] via-purple-500/[0.01] via-pink-500/[0.01] to-cyan-500/[0.02] animate-gradient-shift opacity-60 hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Subtle Frosted Shimmer */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 animate-border-flow"></div>
          </div>

          {/* Additional Frosted Layer */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.03] to-transparent opacity-80"></div>

          <div className="flex-1 flex items-center justify-center gap-2 sm:gap-8 relative z-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base
                  ${activeSection === item.id 
                    ? 'text-white bg-white/10 shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-glow-pulse"></div>
                )}
                
                {/* Hover particle effect */}
                <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {[...Array(3)].map((_, i) => {
                    const left = 20 + (i * 20) % 60
                    const top = 20 + (i * 25) % 60
                    return (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full animate-particle-float"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          animationDelay: `${i * 100}ms`,
                          animationDuration: '1.5s'
                        }}
                      />
                    )
                  })}
                </div>
              </button>
            ))}
          </div>

          {/* Enhanced Resume Button */}
          <a
            href="#resume"
            className="group relative ml-2 sm:ml-6 inline-flex items-center justify-center bg-white text-black px-3 sm:px-6 py-1 sm:py-2 rounded-full font-semibold shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105 hover:bg-gray-100 text-sm sm:text-base"
          >
            <span className="relative z-10">Resume</span>
            
            {/* Star-struck gradient glow effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-0 group-hover:opacity-75 blur-sm transition-opacity duration-300 animate-gradient-shift bg-[length:200%_200%]"></div>
            
            {/* Magnetic hover effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navigation


