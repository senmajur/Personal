'use client'

import React, { useEffect, useRef, useState } from 'react'

const Skills = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('languages')

  const skillCategories = {
    languages: {
      title: 'Programming Languages',
      icon: '💻',
      skills: [
        { name: 'Python', level: 95, color: 'from-blue-400 to-yellow-400', description: 'Expert in Django, Flask, Data Science' },
        { name: 'TypeScript', level: 90, color: 'from-blue-500 to-purple-500', description: 'Advanced React/Next.js development' },
        { name: 'JavaScript', level: 88, color: 'from-yellow-400 to-orange-400', description: 'Full-stack development expertise' },
        { name: 'Go', level: 82, color: 'from-cyan-400 to-blue-400', description: 'High-performance backend services' },
        { name: 'C', level: 75, color: 'from-gray-400 to-blue-400', description: 'System programming and algorithms' },
        { name: 'Haskell', level: 70, color: 'from-purple-400 to-pink-400', description: 'Functional programming paradigms' }
      ]
    },
    frameworks: {
      title: 'Frameworks & Libraries',
      icon: '🚀',
      skills: [
        { name: 'React', level: 92, color: 'from-cyan-400 to-blue-500', description: 'Modern UI component architecture' },
        { name: 'Next.js', level: 90, color: 'from-gray-800 to-purple-600', description: 'Full-stack React framework' },
        { name: 'Django', level: 88, color: 'from-green-600 to-green-800', description: 'Robust web application development' },
        { name: 'Node.js', level: 85, color: 'from-green-400 to-emerald-400', description: 'Server-side JavaScript runtime' },
        { name: 'Express.js', level: 83, color: 'from-gray-600 to-gray-800', description: 'Minimal web application framework' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      icon: '🛠️',
      skills: [
        { name: 'Google Cloud', level: 85, color: 'from-blue-500 to-red-500', description: 'Cloud infrastructure and services' },
        { name: 'MongoDB', level: 80, color: 'from-green-500 to-green-700', description: 'NoSQL database management' },
        { name: 'SQLite', level: 78, color: 'from-blue-600 to-indigo-600', description: 'Lightweight database solutions' },
        { name: 'Selenium', level: 75, color: 'from-green-400 to-yellow-400', description: 'Automated testing and web scraping' }
      ]
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative z-10 py-32 px-6"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h3 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-200 via-purple-300 to-blue-200 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              Technical Arsenal
            </span>
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies, frameworks, and tools 
            that power innovative digital solutions
          </p>
        </div>

        {/* Category Navigation */}
        <div className={`flex justify-center mb-16 transition-all duration-600 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-2">
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`
                  relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3
                  ${activeCategory === key 
                    ? 'text-white bg-white/10 shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="hidden sm:inline">{category.title}</span>
                {activeCategory === key && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-glow-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Display */}
        <div className={`transition-all duration-600 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <SkillsCategory 
            category={skillCategories[activeCategory as keyof typeof skillCategories]} 
            isActive={isVisible}
          />
        </div>
      </div>
    </section>
  )
}

interface SkillsCategoryProps {
  category: {
    title: string
    icon: string
    skills: Array<{
      name: string
      level: number
      color: string
      description: string
    }>
  }
  isActive: boolean
}

const SkillsCategory = ({ category, isActive }: SkillsCategoryProps) => {
  return (
    <div className="grid gap-6 md:gap-8">
      {category.skills.map((skill, index) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          index={index}
          isActive={isActive}
        />
      ))}
    </div>
  )
}

interface SkillCardProps {
  skill: {
    name: string
    level: number
    color: string
    description: string
  }
  index: number
  isActive: boolean
}

const SkillCard = ({ skill, index, isActive }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [animateLevel, setAnimateLevel] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setAnimateLevel(true), index * 200)
      return () => clearTimeout(timer)
    }
  }, [isActive, index])

  return (
    <div
      className={`
        relative group transition-all duration-700 ease-out
        ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Liquid Glass Container */}
      <div className="relative p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/8 overflow-hidden">
        
        {/* Gradient Background */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          {/* Skill Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-300">
                {skill.name}
              </h4>
              <span className="text-sm font-medium text-purple-400">
                {skill.level}%
              </span>
            </div>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              {skill.description}
            </p>
          </div>

          {/* Skill Level Visualization */}
          <div className="w-full md:w-64 space-y-3">
            {/* Progress Bar */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ 
                  width: animateLevel ? `${skill.level}%` : '0%',
                  transitionDelay: `${index * 100}ms`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-flow"></div>
            </div>

            {/* Level Indicator */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Proficiency</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < Math.floor(skill.level / 20) 
                        ? `bg-gradient-to-r ${skill.color}` 
                        : 'bg-white/20'
                    }`}
                    style={{ transitionDelay: `${(index * 100) + (i * 50)}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Particles on Hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => {
              const left = 10 + (i * 18) % 80
              const top = 20 + (i * 15) % 60
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full animate-particle-float"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${i * 150}ms`,
                    animationDuration: '2.5s'
                  }}
                />
              )
            })}
          </div>
        )}

        {/* Liquid Glass Reflection */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  )
}

export default Skills


