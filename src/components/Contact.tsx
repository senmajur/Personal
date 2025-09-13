'use client'

import { useEffect, useRef, useState } from 'react'
import GlassBubble from './GlassBubble'

const Contact = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: '/linkedin.svg',
      url: 'https://www.linkedin.com/in/rian-sen/',
      gradient: 'from-purple-400 via-pink-400 to-cyan-200',
      description: 'Connect professionally'
    },
    {
      name: 'GitHub',
      icon: '/github.svg',
  url: 'https://github.com/senmajur',
      gradient: 'from-purple-400 via-pink-400 to-cyan-200',
      description: 'View my code'
    },
    {
      name: 'Gmail',
      icon: '/gmail.svg',
      url: 'mailto:rian.senmajumder@gmail.com',
      gradient: 'from-purple-400 via-pink-400 to-cyan-200',
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
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Feeling{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              star-struck
            </span>
            ? Contact me!
          </h3>
          <p className="text-xl sm:text-xl text-gray-300 leading-relaxed">
            I&apos;m looking for internships for summer 2025!<br />
            Or just feel free to reach out to chat about technology and innovation.
          </p>
        </div>

        {/* Social Links with Liquid Glass */}
  <div className={`flex justify-center gap-10 transition-all duration-600 delay-150 flex-wrap ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
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
          <div className="relative max-w-3xl mx-auto">
            <div className="group relative p-10 sm:p-12 rounded-[2.2rem] overflow-hidden bg-white/5 backdrop-blur-3xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.4)] transition-all duration-700 hover:shadow-[0_16px_64px_-10px_rgba(139,92,246,0.55)]">
              <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-60 animate-gradient-shift" />
              <div className="absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_60%)] opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
              <div className="absolute -inset-[2px] rounded-[2.4rem] bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-700" />
              <div className="relative z-10">
                <h4 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">Let&apos;s Build Something Amazing Together</h4>
                <p className="text-gray-300/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Ready to turn innovative ideas into reality? I bring passion, creativity, and cutting-edge technical skills to every project.
                </p>
                <GlassBubble asButton className="!px-9 !py-4 text-base font-semibold relative">
                  <span className="relative z-10">Start a Conversation</span>
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-cyan-500/40 opacity-50 mix-blend-overlay" />
                </GlassBubble>
              </div>
              <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-60" />
            </div>
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
        className="group relative block w-28 h-28 rounded-2xl overflow-visible flex items-center justify-center transition-all duration-500"
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
        {/* Subtle SVG-hugging glow */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-0 group-hover:opacity-100 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-cyan-200 group-hover:animate-gradient-shift group-hover:bg-[length:200%_200%] group-hover:blur-[1.7rem] transition-all duration-300 ${link.name === 'LinkedIn' ? 'w-17 h-17' : 'w-20 h-20'}`}
          style={{WebkitMask: `url(${link.icon}) no-repeat center/contain`, mask: `url(${link.icon}) no-repeat center/contain`, WebkitMaskSize: 'contain', maskSize: 'contain'}}
        ></div>
        {/* SVG Icon Masked Gradient */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-200 animate-gradient-shift bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${link.name === 'LinkedIn' ? 'w-17 h-17' : 'w-20 h-20'}`} style={{WebkitMask: `url(${link.icon}) no-repeat center/contain`, mask: `url(${link.icon}) no-repeat center/contain`, WebkitMaskSize: 'contain', maskSize: 'contain'}}></div>
        {/* White SVG for default state */}
        <img src={link.icon} alt={link.name} className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 group-hover:opacity-0 ${link.name === 'LinkedIn' ? 'w-17 h-17' : 'w-20 h-20'}`} style={{filter: 'brightness(0) saturate(100%) invert(100%)'}} />
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


