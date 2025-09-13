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
      title: 'GreenGuide - Object Identifying Machine Learning Model',
      subtitle: '',
      description: 'Created and trained an ML model in Python that uses a device camera to identify and sort objects into various categories based on the object’s material with 97% accuracy, sorting them into compost, garbage, or recycling.',
      longDescription: 'Trained and fine-tuned a MobileNetV2 model to classify objects in real-time using OpenCV, Keras, Tensorflow, and Kaggle',
      technologies: ['Python', 'MobileNetV2', 'OpenCV', 'Keras', 'Tensorflow', 'Kaggle'],
      features: [
        'Created and trained an ML model in Python that uses a device camera to identify and sort objects into various categories based on the object’s material with 97% accuracy, sorting them into compost, garbage, or recycling.',
        'Trained and fine-tuned a MobileNetV2 model to classify objects in real-time using OpenCV, Keras, Tensorflow, and Kaggle'
      ],
      metrics: {} as { [key: string]: string },
      status: '',
      category: 'Projects',
      gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
      icon: '🌱',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'PalmPilot - Computer Vision Hand Gesture Controlled Car',
      subtitle: '',
      description: 'Designed and implemented a computer vision system in Python using a laptop camera and OpenCV, enabling object detection for a Bluetooth-controlled car.',
      longDescription: 'Utilized MediaPipe for real-time finger recognition and communicated gestures to Arduino via Serial library in C++ for controls.',
      technologies: ['Python', 'OpenCV', 'MediaPipe', 'Arduino', 'Serial', 'C++'],
      features: [
        'Designed and implemented a computer vision system in Python using a laptop camera and OpenCV, enabling object detection for a Bluetooth-controlled car.',
        'Utilized MediaPipe for real-time finger recognition and communicated gestures to Arduino via Serial library in C++ for controls.'
      ],
      metrics: {} as { [key: string]: string },
      status: '',
      category: 'Projects',
      gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
      icon: '✋',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Jittr - ADHD Diagnosing Regression Model',
      subtitle: '',
      description: 'Jittr - ADHD Diagnosing Regression Model',
      longDescription: 'Jittr - ADHD Diagnosing Regression Model',
      technologies: ['Python'],
      features: [
        'Jittr - ADHD Diagnosing Regression Model'
      ],
      metrics: {} as { [key: string]: string },
      status: '',
      category: 'Projects',
      gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
      icon: '🧠',
      demoUrl: '#',
      githubUrl: '#'
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
    icon: p.icon
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


