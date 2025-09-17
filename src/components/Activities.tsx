'use client'

import React, { useMemo } from 'react'
import TimelineSection, { TimelineItemData } from './TimelineSection'
import { experienceData } from './Experience'

const Activities = (): React.JSX.Element => {
  const extracurricular = useMemo(
    () => experienceData.filter(d => ['McMaster Engineering Society', 'TDSB Community Services', 'Toronto Pan Am Centre'].includes(d.company)),
    []
  )

  const items: TimelineItemData[] = extracurricular.map((d, idx) => ({
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
    <TimelineSection
      id="activities"
      heading="Extracurricular Activities"
      subheading="Leadership, teaching, and community engagement roles."
      items={items}
    />
  )
}

export default Activities
