'use client'

import React, { useEffect, useRef, useState } from 'react'
import TimelineSection, { TimelineItemData } from './TimelineSection'

// Fresh recreation with verified emojis (🛠️, 📈, 🧩, 💻, 🎯, 🧑‍🏫, 🛟)
interface RawExperience {
  id: string
  year: string
  company: string
  position: string
  duration: string
  type: string
  description: string
  achievements: string[]
  technologies: string[]
  gradient: string
  icon: string
  url?: string
}

const data: RawExperience[] = [
  {
    id: '01',
    year: 'May 2025 – Aug 2025',
    company: 'IPEX',
    position: 'Software Developer Intern',
    duration: 'May 2025 – Aug 2025',
    type: 'Internship',
    description: '',
    achievements: [
      'Automated data analysis workflows with Python and SQL, streamlining reporting on production and quality metrics.',
      'Developed internal scripts using matplotlib to visualize engineering test data for faster managerial decisions.',
      'Queried and filtered data using SQLite to identify trends (defect rates, throughput analysis).'
    ],
    technologies: ['Python', 'SQL', 'matplotlib', 'SQLite'],
    gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
    icon: '🛠️',
    url: 'https://ipexna.com/'
  },
  {
    id: '02',
    year: 'Feb 2025 – May 2025',
    company: 'Cogeco',
    position: 'Digital Systems Sales Intern',
    duration: 'Feb 2025 – May 2025',
    type: 'Internship',
    description: '',
    achievements: [
      'Generated over $1.56M in ARR within 4 months through high-performance D2C sales.',
      'Delivered technical product explanations adapting messaging live for 600+ closed customers.'
    ],
    technologies: [],
    gradient: 'from-green-500/20 via-teal-500/20 to-blue-500/20',
    icon: '📈',
    url: 'https://www.cogeco.ca/en'
  },
  {
    id: '03',
    year: 'May 2024 – Aug 2024',
    company: 'IPEX',
    position: 'Design Engineering Intern',
    duration: 'May 2024 – Aug 2024',
    type: 'Internship',
    description: '',
    achievements: [
      'Used AutoCAD to model and iterate on production layouts for efficiency insights.',
      'Automated CAD scripting tools to model layouts and support process optimization.'
    ],
    technologies: ['AutoCAD'],
    gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
    icon: '🧩',
    url: 'https://ipexna.com/'
  },
  {
    id: '04',
    year: 'Jun 2023 – Sep 2023',
    company: '5n2',
    position: 'Front-End Web Developer Intern',
    duration: 'Jun 2023 – Sep 2023',
    type: 'Internship',
    description: '',
    achievements: [
      'Built responsive interface using HTML, CSS, JavaScript, and React for hunger relief initiative.',
      'Integrated UI components (Bootstrap/Tailwind) boosting donation flows (+$12K YoY).',
      'Used Git/GitHub for version control and collaboration.'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Tailwind', 'Git', 'GitHub'],
    gradient: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
    icon: '💻',
    url: 'https://5n2.ca/'
  },
  {
    id: '05',
    year: 'Sep 2024 – Sep 2025',
    company: 'McMaster Engineering Society',
    position: 'First-Year Council Chair',
    duration: 'Sep 2024 – Sep 2025',
    type: 'Leadership',
    description: '',
    achievements: [
      'Managed $20K annual budget across academic and social engineering events.',
      'Advocated for 2,400+ engineering students increasing event participation 40% YoY.',
      'Chaired meetings and coordinated 20+ volunteers resolving day-of event issues.'
    ],
    technologies: [],
    gradient: 'from-fuchsia-500/20 via-purple-500/20 to-indigo-500/20',
    icon: '🎯',
    url: 'https://macengsociety.ca/first-year-council'
  },
  {
    id: '06',
    year: 'Oct 2022 – Jun 2024',
    company: 'TDSB Community Services',
    position: 'Coding Instructor',
    duration: 'Oct 2022 – Jun 2024',
    type: 'Part-time',
    description: '',
    achievements: [
      'Taught C, Python, JavaScript, and web fundamentals with structured hands-on lessons.',
      'Designed interactive coding exercises covering recursion and basic data structures.'
    ],
    technologies: [],
    gradient: 'from-teal-500/20 via-cyan-500/20 to-blue-500/20',
    icon: '🧑‍🏫'
  },
  {
    id: '07',
    year: 'Nov 2022 – Jul 2023',
    company: 'Toronto Pan Am Centre',
    position: 'Lifeguard',
    duration: 'Nov 2022 – Jul 2023',
    type: 'Part-time',
    description: '',
    achievements: [
      'Earned NL & Bronze Cross after 8+ years competitive swimming (Apr 2023).',
      'Responded to emergencies with first aid & CPR resulting in 0 fatalities.'
    ],
    technologies: [],
    gradient: 'from-sky-500/20 via-blue-500/20 to-indigo-500/20',
    icon: '🛟'
  }
]

const Experience = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasIntersected(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const professional = data.filter(d => ['IPEX', 'Cogeco', '5n2'].includes(d.company))
  const extracurricular = data.filter(d => ['McMaster Engineering Society', 'TDSB Community Services', 'Toronto Pan Am Centre'].includes(d.company))

  const toItems = (arr: RawExperience[]): TimelineItemData[] =>
    arr.map((d, idx) => ({
      id: d.id,
      company: d.company,
      position: d.position,
      number: idx + 1,
      description: d.description,
      achievements: d.achievements,
      technologies: d.technologies,
      icon: d.icon,
      url: d.url
    }))

  return (
    <div ref={sectionRef} className="relative z-10">
      <TimelineSection
        id="experience"
        heading="Professional Experiences"
        subheading="Engineering, software, and technical impact roles."
        items={toItems(professional)}
      />
      <TimelineSection
        id="activities"
        heading="Extracurricular Activities"
        subheading="Leadership, teaching, and community engagement roles."
        items={toItems(extracurricular)}
      />
    </div>
  )
}

export default Experience


