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
      description: 'Developed a Chrome extension training a logistic regression model on ADHD research datasets to detect behavioral patterns.',
      longDescription: 'Tracked reading time, path velocity, and mouse acceleration across domains to generate real-time probability scores for ADHD-like signals.',
      technologies: ['Chrome Extension', 'Logistic Regression', 'JavaScript', 'Machine Learning', 'ADHD Research'],
      features: [
        'Developed a Chrome extension training a logistic regression model on ADHD research datasets to detect behavioral patterns.',
        'Tracked reading time, path velocity, and mouse acceleration across domains to generate real-time probability scores for ADHD-like signals.'
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
      description: 'Trained and fine-tuned a MobileNetV2 model to classify objects in real-time with 97% accuracy using Kaggle, Python, OpenCV, etc.',
      longDescription: 'Created and trained an ML model in Python that uses a device camera to identify and sort objects into various categories based on the object\'s material with 97% accuracy, sorting them into compost, garbage, or recycling.',
      technologies: ['Python', 'MobileNetV2', 'OpenCV', 'Keras', 'Tensorflow', 'Kaggle'],
      features: [
        'Trained and fine-tuned a MobileNetV2 model to classify objects in real-time with 97% accuracy using Kaggle, Python, OpenCV, etc.',
        'Created and trained an ML model in Python that uses a device camera to identify and sort objects into various categories based on the object\'s material with 97% accuracy, sorting them into compost, garbage, or recycling.'
      ],
      metrics: {} as { [key: string]: string },
      status: '',
      category: 'Projects',
      gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
      icon: '🌱',
      demoUrl: '#',
      githubUrl: 'https://github.com/senmajur/GreenGuide'
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


