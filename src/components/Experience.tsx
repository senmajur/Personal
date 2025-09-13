'use client'

import React, { useEffect, useRef, useState } from 'react'
import TimelineSection, { TimelineItemData } from './TimelineSection'

const Experience = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  // old interactive states removed (handled inside TimelineSection)

  // Resume-based experiences
  const experiences = [
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
        'Developed internal scripts using matplotlib to visualize engineering test data, making it easier for managers to make quick decisions.',
        'Queried and filtered data using SQLite to identify trends (e.g., defect rates by product line, throughput analysis).'
      ],
      technologies: ['Python', 'SQL', 'matplotlib', 'SQLite'],
      gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
      icon: '🛠️'
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
        'Single-handedly generated over $1.56 million in ARR within 4 months through high-performance direct-to-consumer (D2C) sales.',
        'Delivered technical product explanations in clear, accessible terms to a wide range of clients, adapting to handle objections, and develop persuasive messaging in real time, totaling 600+ closed customers during term.'
      ],
      technologies: [],
      gradient: 'from-green-500/20 via-teal-500/20 to-blue-500/20',
      icon: '📈'
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
        'Used AutoCAD to model and tweak production layouts, helping visualize efficiency improvements.',
        'Automated CAD scripting tools to model production layouts (equipment, product flow, etc.) and support process optimization.'
      ],
      technologies: ['AutoCAD'],
      gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
      icon: '🧩'
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
        'Designed and developed a responsive web interface using HTML, CSS, JavaScript, and React for a hunger relief initiative.',
        'Integrated dynamic UI components using Bootstrap/Tailwind to improve user engagement and streamline donation workflows, contributing to an additional $12,000 in fundraising revenue compared to the previous year.',
        'Implemented version control with Git/GitHub to track features and collaborate with other interns.'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Tailwind', 'Git', 'GitHub'],
      gradient: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
      icon: '�'
    },
    {
      id: '05',
      year: 'Sep 2024 - Sep 2025',
      company: 'McMaster Engineering Society',
      position: 'First-Year Council Chair',
      duration: 'Sep 2024 – Sep 2025',
      type: 'Leadership',
      description: '',
      achievements: [
        'Strategically managed and allocated a $20,000 annual budget across multiple academic and social engineering events.',
        'Represented and advocated for over 2,400 undergraduate engineering students, raising event participation by 40%+ year over year.',
        'Chaired all council meetings, coordinating logistics and managing a team of 20+ volunteers, troubleshooting day-of issues to support student success and well-being.'
      ],
      technologies: [],
      gradient: 'from-fuchsia-500/20 via-purple-500/20 to-indigo-500/20',
      icon: '🎯'
    },
    {
      id: '06',
      year: 'Oct 2022 - Jun 2024',
      company: 'TDSB Community Services',
      position: 'Coding Instructor',
      duration: 'Oct 2022 – Jun 2024',
      type: 'Part-time',
      description: '',
      achievements: [
        'Instructed students in C, Python, JavaScript, and web development fundamentals by delivering structured, hands-on lessons.',
        'Developed and implemented interactive coding exercises and pair-programming sessions, teaching concepts like recursion and basic data structures & algorithms through project-based learning.'
      ],
      technologies: [],
      gradient: 'from-teal-500/20 via-cyan-500/20 to-blue-500/20',
      icon: '🧑‍🏫'
    },
    {
      id: '07',
      year: 'Nov 2022 - Jul 2023',
      company: 'Toronto Pan Am Centre',
      position: 'Lifeguard',
      duration: 'Nov 2022 – Jul 2023',
      type: 'Part-time',
      description: '',
      achievements: [
        'Received NL, Bronze Cross from the National Lifesaving Society in April of 2023 after 8+ years of competitive swimming.',
        'Responded quickly and effectively to emergencies, administering first aid and CPR as needed, resulting in 0 fatalities during tenure.'
      ],
      technologies: [],
      gradient: 'from-sky-500/20 via-blue-500/20 to-indigo-500/20',
      icon: '�'
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

  // Partition arrays
  const professionalExperiences = experiences.filter(e => ['IPEX', 'Cogeco', '5n2'].includes(e.company))
  const extracurricularExperiences = experiences.filter(e => ['McMaster Engineering Society', 'TDSB Community Services', 'Toronto Pan Am Centre'].includes(e.company))

  const mapToTimelineItems = (arr: typeof experiences): TimelineItemData[] =>
    arr.map((e, idx) => ({
      id: e.id,
      company: e.company,
      position: e.position,
      number: idx + 1,
      description: e.description,
      achievements: e.achievements,
      technologies: e.technologies,
      icon: e.icon
    }))

  return (
    <div ref={sectionRef} className="relative z-10">
      <TimelineSection
        id="experience"
        heading="Professional Experiences"
        subheading="Engineering, software, and technical impact roles."
        items={mapToTimelineItems(professionalExperiences)}
      />
      <TimelineSection
        id="activities"
        heading="Extracurricular Activities"
        subheading="Leadership, teaching, and community engagement roles."
        items={mapToTimelineItems(extracurricularExperiences)}
      />
    </div>
  )
}
export default Experience


