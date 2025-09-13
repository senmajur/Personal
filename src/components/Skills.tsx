'use client'

import React, { useEffect, useRef, useState } from 'react'
import GlassBubble from './GlassBubble'

const Skills = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  // Exact wording from resume – no paraphrasing, no extra descriptors
  const skillCategories: Array<{ title: string; items: string[] }> = [
    {
      title: 'Programming Languages',
      items: ['C', 'C++', 'Python', 'HTML/CSS', 'JavaScript', 'TypeScript', 'SQL']
    },
    {
      title: 'Libraries/Frameworks',
      items: ['Flask', 'React', 'NextJS', 'Node.js', 'OpenCV', 'Pandas', 'Numpy', 'MediaPipe', 'Scikit-Learn', 'TensorFlow', 'Kaggle']
    },
    {
      title: 'Tools/Design',
      items: ['Git', 'GitHub', 'Arduino Uno', 'AutoCAD', 'Solidworks', 'Prusaslicer', 'Microsoft Office/Excel', 'MobileNetV2']
    }
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
      id="skills" 
      ref={sectionRef}
      className="relative z-10 py-32 px-6"
    >

  <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className={`text-center mb-16 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-200 via-purple-300 to-blue-200 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              Skills
            </span>
          </h3>
        </div>

        <div className={`space-y-16 transition-all duration-600 w-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {skillCategories.map((cat, i) => (
            <div key={cat.title} className="space-y-6 flex flex-col items-center" style={{transitionDelay: `${i * 100}ms`}}>
              <h4 className="text-2xl font-semibold text-white text-center">{cat.title}</h4>
              <div className="flex flex-wrap gap-4 justify-center max-w-5xl">
                {cat.items.map((item, idx) => (
                  <GlassBubble
                    key={item}
                    className="!px-5 !py-2.5 text-sm"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    {item}
                  </GlassBubble>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Skills


