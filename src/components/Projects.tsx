'use client'

import React, { useEffect, useRef, useState } from 'react'
import TimelineSection, { TimelineItemData } from './TimelineSection'

const Projects = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  // timeline-based display (no side nav)

  const projects = [
    {
      id: 1,
      title: 'PalmPilot - Computer Vision Hand Gesture Controlled Car',
      subtitle: '',
      description: 'Implemented a real-time gesture recognition pipeline in C++ & Python with OpenCV and MediaPipe to control an Arduino Uno based, Bluetooth enabled car with custom 3D-printed components, applying ML object detection in an embedded system.',
      longDescription: 'PalmPilot is a computer vision–powered Arduino car that replaces a physical remote with intuitive hand gesture control. The project integrates AI-based gesture recognition, real-time software processing, and embedded motor control, showcasing the intersection of computer vision, human–computer interaction, and hardware–software integration.',
      technologies: ['C++', 'Python', 'OpenCV', 'MediaPipe', 'Arduino', 'L298N', '3D Printing', 'Bluetooth'],
      features: [
        'Implemented a real-time gesture recognition pipeline in C++ & Python with OpenCV and MediaPipe to control an Arduino Uno based, Bluetooth enabled car with custom 3D-printed components, applying ML object detection in an embedded system.',
        'Programmed Arduino firmware to receive serial input and control DC motors via an L298N driver, enabling gesture navigation.'
      ],
      metrics: {} as { [key: string]: string },
      status: '',
      category: 'Projects',
      gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
      icon: '✋',
      demoUrl: '#',
      githubUrl: 'https://github.com/senmajur/PalmPilot'
    },
    {
      id: 2,
      title: 'Jittr - ADHD Diagnosing Regression Model',
      subtitle: '',
      description: 'Chrome extension that trains a logistic regression model on ADHD research datasets to flag behavioral signal patterns.',
      longDescription: 'Captures reading time, pointer path velocity, and mouse acceleration to produce live probability scores indicating ADHD-like interaction signals across domains.',
      technologies: ['Chrome Extension', 'Logistic Regression', 'JavaScript', 'Machine Learning', 'ADHD Research'],
      features: [
        'Implements logistic regression inference in-browser using captured interaction metrics.',
        'Generates real-time probability scores from aggregated time-on-task and movement features.'
      ],
      metrics: {} as { [key: string]: string },
      status: '',
      category: 'Projects',
      gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
      icon: '🧠',
      demoUrl: '#',
      githubUrl: 'https://github.com/senmajur/Jittr'
    },
    {
      id: 3,
      title: 'GreenGuide - Object Identifying Machine Learning Model',
      subtitle: '',
      description: 'MobileNetV2-based vision model that classifies household waste streams (compost, recycling, garbage) at 97% accuracy.',
      longDescription: 'Real-time Python/OpenCV pipeline fine-tuned on curated Kaggle + custom images to identify object material and route to correct disposal category with 97% measured validation accuracy.',
      technologies: ['Python', 'MobileNetV2', 'OpenCV', 'Keras', 'Tensorflow', 'Kaggle'],
      features: [
        'Fine-tuned MobileNetV2 with transfer learning for multi-class waste categorization.',
        'Processes live camera frames via OpenCV to classify and advise disposal category.'
      ],
      metrics: {} as { [key: string]: string },
      status: '',
      category: 'Projects',
      gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
      icon: '🌱',
      demoUrl: '#',
      githubUrl: 'https://github.com/senmajur/GreenGuide'
    },
    {
      id: 4,
      title: 'Personal Portfolio Website',
      subtitle: '',
      description: 'Responsive developer portfolio built with TypeScript, React, Next.js, and Tailwind CSS, deployed on Vercel.',
      longDescription: 'Used JavaScript, TypeScript, React, NextJS, Node.js, and TailwindCSS to create a dynamic website and deploy it on Vercel; showcases projects, experience timelines, smooth animations, and optimized asset delivery.',
      technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Vercel'],
      features: [
        'Implements accessible, mobile-first responsive design with Tailwind utility patterns.',
        'Leverages Next.js routing and server optimizations for fast initial paint and SEO-friendly metadata.'
      ],
      metrics: {} as { [key: string]: string },
      status: '',
      category: 'Projects',
      gradient: 'from-cyan-500/20 via-sky-500/20 to-blue-500/20',
      icon: '🗂️',
      demoUrl: '#',
      githubUrl: 'https://github.com/senmajur/Personal'
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

  const projectItems: TimelineItemData[] = projects.map((p, i) => ({
    id: String(p.id),
    title: p.title,
    subtitle: p.subtitle,
    number: i + 1,
    description: p.description,
    longDescription: p.longDescription,
    achievements: p.features, // reuse features as achievements list for expanded mode
    technologies: p.technologies,
    icon: p.icon,
    url: p.githubUrl !== '#' ? p.githubUrl : undefined
  }))

  return (
    <TimelineSection
      id="projects"
      heading="Featured Projects"
      subheading="Innovative solutions delivering real technical impact."
      items={projectItems}
    />
  )
}
export default Projects


