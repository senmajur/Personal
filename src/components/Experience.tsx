'use client'

import React, { useEffect, useRef, useState } from 'react'

const Experience = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeExperience, setActiveExperience] = useState(0)

  const experiences = [
    { 
      id: '01',
      year: '2024',
      company: 'Formula Electric',
      position: 'Software Developer',
      duration: '8 months',
      type: 'Full-time',
      description: "Led firmware development for electric Formula One racing car with team of 15 developers. Architected C firmware generation from DBC files using Python automation and built comprehensive SIL testing system in Go.",
      achievements: [
        'Reduced firmware deployment time by 60% through automated code generation',
        'Implemented real-time telemetry system handling 1000+ data points/second',
        'Designed fault-tolerant communication protocols for critical racing systems'
      ],
      technologies: ['C', 'Python', 'Go', 'CAN Bus', 'Real-time Systems'],
      gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
      icon: '🏎️'
    },
    { 
      id: '02',
      year: '2023',
      company: 'iBiomed Society',
      position: 'Web Developer',
      duration: '6 months',
      type: 'Contract',
      description: 'Architected and developed Next.js REST API with spreadsheet-driven CMS integration. Created modular UI component library used across multiple organizational pages.',
      achievements: [
        'Built scalable API serving 10,000+ monthly active users',
        'Developed reusable component system reducing development time by 40%',
        'Implemented automated content management workflow'
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'REST API', 'CMS'],
      gradient: 'from-green-500/20 via-teal-500/20 to-blue-500/20',
      icon: '🧬'
    },
    { 
      id: '03',
      year: '2022',
      company: 'FTC Robotics Team',
      position: 'Software Lead',
      duration: '1 year',
      type: 'Leadership',
      description: 'Directed software development for competitive robotics team. Built autonomous navigation and teleop control systems leveraging advanced sensor fusion and computer vision.',
      achievements: [
        'Led team to regional championship with 95% autonomous success rate',
        'Mentored 8 junior developers in software engineering best practices',
        'Authored comprehensive technical documentation and setup guides'
      ],
      technologies: ['Java', 'OpenCV', 'Sensor Fusion', 'PID Control', 'Git'],
      gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
      icon: '🤖'
    },
    { 
      id: '04',
      year: '2019-2023',
      company: 'Foodland',
      position: 'Customer Service Associate',
      duration: '4 years',
      type: 'Part-time',
      description: 'Delivered exceptional customer service in fast-paced retail environment. Developed strong communication skills and work ethic while maintaining academic excellence.',
      achievements: [
        'Received Sobeys Scholarship for outstanding academic and work performance',
        'Trained 15+ new employees in customer service best practices',
        'Maintained 98% customer satisfaction rating across 4-year tenure'
      ],
      technologies: ['Customer Service', 'Team Leadership', 'Time Management'],
      gradient: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
      icon: '🛒'
    },
  ]

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
      id="experience" 
      ref={sectionRef}
      className="relative z-10 py-32 px-6"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h3 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-200 via-purple-300 to-blue-200 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              Professional Journey
            </span>
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A timeline of growth, innovation, and impactful contributions across 
            diverse technology and leadership roles
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Timeline Navigation */}
          <div className={`lg:w-80 transition-all duration-600 delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="sticky top-32">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-cyan-500/50"></div>
                
                {experiences.map((exp, index) => (
                  <TimelineItem
                    key={exp.id}
                    experience={exp}
                    index={index}
                    isActive={activeExperience === index}
                    onClick={() => setActiveExperience(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Experience Details */}
          <div className={`flex-1 transition-all duration-600 delay-250 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <ExperienceDetails experience={experiences[activeExperience]} />
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  experience: {
    id: string
    year: string
    company: string
    position: string
    icon: string
  }
  index: number
  isActive: boolean
  onClick: () => void
}

const TimelineItem = ({ experience, index, isActive, onClick }: TimelineItemProps) => {
  return (
    <div
      className={`relative flex items-center gap-6 p-4 mb-6 cursor-pointer transition-all duration-300 rounded-2xl
        ${isActive ? 'bg-white/10 backdrop-blur-xl border border-white/20' : 'hover:bg-white/5'}
      `}
      onClick={onClick}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Timeline Dot */}
      <div className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-white/30 shadow-lg' 
          : 'bg-white/10 border-white/20 hover:border-white/30'
        }
      `}>
        <span className="text-xl">{experience.icon}</span>
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-glow-pulse"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-purple-400">{experience.year}</span>
        </div>
        <h4 className={`font-bold transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-300 hover:text-white'
        }`}>
          {experience.company}
        </h4>
        <p className="text-sm text-gray-400">{experience.position}</p>
      </div>
    </div>
  )
}

interface ExperienceDetailsProps {
  experience: {
    company: string
    position: string
    duration: string
    type: string
    description: string
    achievements: string[]
    technologies: string[]
    gradient: string
    icon: string
  }
}

const ExperienceDetails = ({ experience }: ExperienceDetailsProps) => {
  return (
    <div className="relative">
      {/* Main Card */}
      <div className="relative p-8 lg:p-12 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 overflow-hidden">
        
        {/* Gradient Background */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${experience.gradient} opacity-60 animate-gradient-xy`}></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
              <span className="text-2xl">{experience.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">{experience.company}</h3>
              <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {experience.position}
              </h4>
              <div className="flex gap-4 text-sm text-gray-300">
                <span>{experience.duration}</span>
                <span>•</span>
                <span>{experience.type}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-lg leading-relaxed mb-8">
            {experience.description}
          </p>

          {/* Achievements */}
          <div className="mb-8">
            <h5 className="text-lg font-semibold text-white mb-4">Key Achievements</h5>
            <div className="space-y-3">
              {experience.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Technologies Used</h5>
            <div className="flex flex-wrap gap-3">
              {experience.technologies.map((tech, index) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 font-medium hover:border-white/30 transition-colors duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Liquid Glass Reflection */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-100"></div>
      </div>
    </div>
  )
}

export default Experience


