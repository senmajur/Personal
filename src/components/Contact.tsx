'use client'

import { useEffect, useRef, useState } from 'react'

const Contact = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: '💼', 
      url: '#',
      gradient: 'from-blue-500 to-blue-600',
      description: 'Connect professionally'
    },
    { 
      name: 'GitHub', 
      icon: '💻', 
      url: '#',
      gradient: 'from-gray-700 to-gray-900',
      description: 'View my code'
    },
    { 
      name: 'Email', 
      icon: '📧', 
      url: '#',
      gradient: 'from-red-500 to-pink-500',
      description: 'Send a message'
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative z-10 py-32 px-6"
    >

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`mb-16 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h3 className="text-5xl md:text-6xl font-bold mb-6">
            Feeling{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              star-struck
            </span>
            ? Contact me!
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed">
            I'm looking for internships for summer 2025!<br />
            Or just feel free to reach out to chat about technology and innovation.
          </p>
        </div>

        {/* Social Links with Liquid Glass */}
        <div className={`flex justify-center gap-8 transition-all duration-600 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {socialLinks.map((link, index) => (
            <SocialLink
              key={link.name}
              link={link}
              index={index}
              isHovered={hoveredLink === link.name}
              onHover={(name) => setHoveredLink(name)}
            />
          ))}
        </div>

        {/* Liquid Glass CTA Card */}
        <div className={`mt-16 transition-all duration-600 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/8 group max-w-2xl mx-auto">
            
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h4 className="text-2xl font-bold text-white mb-4">Let's Build Something Amazing Together</h4>
              <p className="text-gray-300 mb-6">
                Ready to turn innovative ideas into reality? I bring passion, creativity, and cutting-edge technical skills to every project.
              </p>
              
              <button className="group/cta relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(139,92,246,0.4)] overflow-hidden">
                <span className="relative z-10">Start a Conversation</span>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 animate-border-flow"></div>
              </button>
            </div>

            {/* Liquid Glass Reflection */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface SocialLinkProps {
  link: {
    name: string
    icon: string
    url: string
    gradient: string
    description: string
  }
  index: number
  isHovered: boolean
  onHover: (name: string | null) => void
}

const SocialLink = ({ link, index, isHovered, onHover }: SocialLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!linkRef.current || !isHovered) return
      
      const rect = linkRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setMousePosition({ x, y })
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateY = (x - centerX) / 10
      const rotateX = (centerY - y) / 10
      
      linkRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  return (
    <div className="relative">
      <a
        ref={linkRef}
        href={link.url}
        className="group relative block w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 overflow-hidden"
        aria-label={link.name}
        onMouseEnter={() => onHover(link.name)}
        onMouseLeave={() => {
          onHover(null)
          if (linkRef.current) {
            linkRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
          }
        }}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
        
        {/* Magnetic Cursor Effect */}
        {isHovered && (
          <div 
            className="absolute w-16 h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl transition-all duration-300 pointer-events-none"
            style={{
              left: mousePosition.x - 32,
              top: mousePosition.y - 32,
            }}
          />
        )}

        {/* Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
            {link.icon}
          </span>
        </div>

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => {
              const left = 20 + (i * 15) % 60
              const top = 20 + (i * 20) % 60
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full animate-particle-float"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '2s'
                  }}
                />
              )
            })}
          </div>
        )}

        {/* Liquid Glass Reflection */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </a>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-xl bg-black/80 backdrop-blur-xl text-white text-sm whitespace-nowrap animate-fade-in-up">
          <div className="text-center">
            <div className="font-medium">{link.name}</div>
            <div className="text-xs text-gray-400">{link.description}</div>
          </div>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
        </div>
      )}
    </div>
  )
}

export default Contact


