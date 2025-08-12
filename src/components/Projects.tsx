'use client'

import React, { useEffect, useRef, useState } from 'react'

const Projects = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState(0)

  const projects = [
    { 
      id: 1,
      title: 'YouTube Shorts Generator', 
      subtitle: 'AI-Powered Video Creation Platform',
      description: 'Revolutionary platform that transforms Reddit posts into viral YouTube Shorts using advanced TTS, automated subtitle generation, and dynamic gameplay footage overlay. Built with scalable microservices architecture handling 1000+ concurrent video generations.',
      longDescription: 'This comprehensive video automation platform leverages cutting-edge AI technologies to democratize content creation. The system intelligently parses Reddit content, applies natural language processing for content optimization, generates human-like text-to-speech narration, and seamlessly overlays dynamic visuals to create engaging short-form content.',
      technologies: ['Django', 'React', 'Next.js', 'MoviePy', 'Redis', 'PostgreSQL', 'Docker', 'AWS'], 
      features: [
        'AI-powered content analysis and optimization',
        'Multi-voice TTS with emotion detection',
        'Automated subtitle generation with perfect timing',
        'Dynamic background video selection and editing',
        'Real-time processing with queue management',
        'Analytics dashboard with performance metrics'
      ],
      metrics: {
        users: '50K+',
        items: '100K+',
        success: '95%'
      },
      status: 'Live Production',
      category: 'AI & Automation',
      gradient: 'from-red-500/20 via-pink-500/20 to-purple-500/20',
      icon: '🎬',
      demoUrl: '#',
      githubUrl: '#'
    },
    { 
      id: 2,
      title: 'Interactive Algorithm Visualizer', 
      subtitle: 'Educational Data Structure Explorer',
      description: 'Immersive visualization platform for understanding complex sorting algorithms through real-time animation, step-by-step breakdown, and interactive controls. Used by 10,000+ students worldwide.',
      longDescription: 'An educational powerhouse that transforms abstract algorithmic concepts into engaging visual experiences. The platform features real-time algorithm execution visualization, comprehensive complexity analysis, and interactive learning modules that adapt to different learning styles and paces.',
      technologies: ['Python', 'Pygame', 'NumPy', 'Matplotlib', 'SQLite'], 
      features: [
        'Real-time algorithm visualization with customizable speed',
        'Interactive step-by-step breakdown with explanations',
        'Complexity analysis with Big-O notation',
        'Custom dataset input and generation',
        'Progress tracking and learning analytics',
        'Multi-algorithm comparison tools'
      ],
      metrics: {
        users: '10K+',
        items: '15+',
        success: '98%'
      },
      status: 'Open Source',
      category: 'Education & Visualization',
      gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
      icon: '📊',
      demoUrl: '#',
      githubUrl: '#'
    },
    { 
      id: 3,
      title: 'Smart Flashcard System', 
      subtitle: 'Adaptive Learning Management Platform',
      description: 'Intelligent spaced repetition system with AI-powered difficulty adjustment, collaborative study groups, and comprehensive analytics. Features seamless cross-platform synchronization and offline capabilities.',
      longDescription: 'A next-generation learning platform that combines cognitive science principles with modern technology. The system uses machine learning algorithms to optimize study sessions, tracks learning patterns to identify knowledge gaps, and provides personalized recommendations for maximum retention efficiency.',
      technologies: ['React', 'Express.js', 'Node.js', 'MongoDB', 'Socket.io', 'JWT', 'Stripe'], 
      features: [
        'AI-powered spaced repetition algorithm',
        'Collaborative study groups with real-time sync',
        'Advanced analytics and progress tracking',
        'Cross-platform offline synchronization',
        'Custom card templates with rich media support',
        'Gamification with achievements and leaderboards'
      ],
      metrics: {
        users: '25K+',
        items: '1M+',
        success: '89%'
      },
      status: 'Beta Testing',
      category: 'EdTech & Productivity',
      gradient: 'from-green-500/20 via-emerald-500/20 to-blue-500/20',
      icon: '🧠',
      demoUrl: '#',
      githubUrl: '#'
    },
    { 
      id: 4,
      title: 'Real-time Collaboration Hub', 
      subtitle: 'Next-Gen Team Productivity Suite',
      description: 'Comprehensive workspace platform combining video conferencing, document collaboration, project management, and AI-powered insights. Built for remote teams seeking seamless integration.',
      longDescription: 'A revolutionary collaboration platform that unifies all aspects of remote teamwork into a single, intuitive interface. The system leverages WebRTC for high-quality video communication, operational transforms for real-time document editing, and machine learning for intelligent workflow optimization.',
      technologies: ['TypeScript', 'React', 'WebRTC', 'Socket.io', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'], 
      features: [
        'HD video conferencing with screen sharing',
        'Real-time collaborative document editing',
        'Integrated project management with Kanban boards',
        'AI-powered meeting transcription and insights',
        'Advanced permission and security controls',
        'Third-party integrations with popular tools'
      ],
      metrics: {
        users: '500+',
        items: '99.9%',
        success: '94%'
      },
      status: 'In Development',
      category: 'Collaboration & Communication',
      gradient: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
      icon: '🚀',
      demoUrl: '#',
      githubUrl: '#'
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
      id="projects" 
      ref={sectionRef}
      className="relative z-10 py-32 px-6"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h3 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-200 via-purple-300 to-blue-200 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              Featured Projects
            </span>
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Innovative solutions that push technological boundaries and create 
            meaningful impact in the digital landscape
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-12">
          {/* Project Navigation */}
          <div className={`xl:w-96 transition-all duration-600 delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="sticky top-32 space-y-4">
              {projects.map((project, index) => (
                <ProjectNavItem
                  key={project.id}
                  project={project}
                  index={index}
                  isActive={selectedProject === index}
                  onClick={() => setSelectedProject(index)}
                />
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className={`flex-1 transition-all duration-600 delay-250 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <ProjectDetails project={projects[selectedProject]} />
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProjectNavItemProps {
  project: {
    id: number
    title: string
    category: string
    status: string
    icon: string
    gradient: string
  }
  index: number
  isActive: boolean
  onClick: () => void
}

const ProjectNavItem = ({ project, index, isActive, onClick }: ProjectNavItemProps) => {
  return (
    <div
      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg' 
          : 'bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/15'
      }`}
      onClick={onClick}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Background */}
      {isActive && (
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-20 animate-gradient-xy`}></div>
      )}

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-white/30' 
            : 'bg-white/10 border-white/20'
        }`}>
          <span className="text-lg">{project.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold mb-1 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-gray-300'
          }`}>
            {project.title}
          </h4>
          <p className="text-sm text-gray-400 mb-2">{project.category}</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              project.status === 'Live Production' ? 'bg-green-400' :
              project.status === 'Beta Testing' ? 'bg-yellow-400' :
              project.status === 'In Development' ? 'bg-blue-400' : 'bg-purple-400'
            }`}></div>
            <span className="text-xs text-gray-500">{project.status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectDetailsProps {
  project: {
    title: string
    subtitle: string
    description: string
    longDescription: string
    technologies: string[]
    features: string[]
    metrics: { [key: string]: string }
    status: string
    gradient: string
    icon: string
    demoUrl: string
    githubUrl: string
  }
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-8">
      {/* Main Card */}
      <div className="relative p-8 lg:p-12 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 overflow-hidden">
        
        {/* Gradient Background */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-40 animate-gradient-xy`}></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                <span className="text-3xl">{project.icon}</span>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
                <h4 className="text-xl font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  {project.subtitle}
                </h4>
                <div className="flex gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      project.status === 'Live Production' ? 'bg-green-400' :
                      project.status === 'Beta Testing' ? 'bg-yellow-400' :
                      project.status === 'In Development' ? 'bg-blue-400' : 'bg-purple-400'
                    }`}></div>
                    <span>{project.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105">
                Live Demo
              </button>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                View Code
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 p-1 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Features' },
              { id: 'tech', label: 'Technology' },
              { id: 'metrics', label: 'Impact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  {project.description}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="space-y-6">
                <h5 className="text-xl font-semibold text-white">Technology Stack</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={tech}
                      className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-center hover:border-white/30 transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-gray-300 font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(project.metrics).map(([key, value], index) => (
                  <div
                    key={key}
                    className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      {value}
                    </div>
                    <div className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Liquid Glass Reflection */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-100"></div>
      </div>
    </div>
  )
}

export default Projects


