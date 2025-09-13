"use client";
import React, { useEffect, useRef, useState } from 'react';

export interface TimelineItemData {
  id: string;
  company?: string; // for experiences
  title?: string; // for projects
  position?: string;
  subtitle?: string; // alt label
  number: number; // sequential
  description?: string; // optional short description (exact text if provided)
  achievements?: string[]; // exact wording list
  longDescription?: string; // projects
  technologies?: string[];
  features?: string[];
  icon?: string;
}

interface TimelineSectionProps {
  id: string;
  heading: string;
  subheading?: string;
  items: TimelineItemData[];
  minimal?: boolean;
}

// Minimal two-column timeline with a scroll-progress purple glow descending.
const TimelineSection: React.FC<TimelineSectionProps> = ({ id, heading, subheading, items, minimal = true }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Start when top enters, finish when bottom leaves
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const ratio = Math.min(1, Math.max(0, passed / total));
      setProgress(ratio);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggle = (id: string) => setExpanded(e => ({ ...e, [id]: !e[id] }));

  return (
    <section id={id} ref={sectionRef} className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-200 via-purple-300 to-blue-200 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              {heading}
            </span>
          </h2>
          {subheading && (
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Static center dashed line */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_85%,transparent)]"></div>
          {/* Scroll glow overlay */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full bg-gradient-to-b from-purple-400 via-fuchsia-500 to-transparent shadow-[0_0_25px_8px_rgba(168,85,247,0.35)] transition-[height] duration-300"
            style={{ height: `${Math.max(6, progress * 100)}%` }}
          />

          <div className="relative flex flex-col gap-32">
            {items.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const expandedState = !!expanded[item.id];
              const companyOrTitle = item.company || item.title || '';
              const role = item.position || item.subtitle || '';
              const primaryId = item.id;
              const showAchievements = item.achievements && item.achievements.length > 0;
              const firstAchievement = showAchievements ? item.achievements![0] : undefined;
              const collapsedText = item.description || firstAchievement || '';
              return (
                <div key={primaryId} className="relative">
                  {/* Number & connector (center line anchor) */}
                  <div className={`hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 flex-col items-center pointer-events-none`}>
                    <span className="text-sm font-semibold tracking-wider text-purple-300">{String(item.number).padStart(2,'0')}</span>
                    <div className="mt-2 h-20 w-px bg-gradient-to-b from-purple-400 via-pink-500 to-transparent" />
                  </div>
                  {/* Card wrapper with side alignment */}
                  <div className={`md:w-1/2 ${isLeft ? 'md:pr-20 md:mr-auto md:text-right md:items-end' : 'md:pl-20 md:ml-auto md:text-left md:items-start'} flex flex-col items-center text-center group transition-all duration-700`}> 
                    <div className={`relative w-full max-w-xl mx-auto px-6 sm:px-10 pt-14 pb-10 rounded-[2.2rem] overflow-hidden transition-all duration-700
                      bg-black/40 backdrop-blur-xl ring-1 ring-white/5
                      before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_70%_0%,rgba(168,85,247,0.18),transparent_60%)] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-700
                      after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/5 after:via-transparent after:to-transparent after:opacity-60
                      group-hover:shadow-[0_8px_50px_-12px_rgba(168,85,247,0.45)]
                      ${isLeft ? 'md:animate-slide-in-left' : 'md:animate-slide-in-right'}`}> 
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-purple-400 via-pink-500 to-fuchsia-400 rounded-full shadow-[0_0_12px_2px_rgba(192,132,252,0.55)]" />
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">{companyOrTitle}</h3>
                      {role && (
                        <h4 className={`text-xs sm:text-sm tracking-[0.55em] font-semibold text-purple-300 mb-6 uppercase ${isLeft ? 'md:text-right' : 'md:text-left'}`}>{role}</h4>
                      )}
                      <div className="space-y-6">
                        <p className="text-gray-300 text-sm sm:text-[15px] leading-relaxed">
                          {expandedState ? (
                            showAchievements ? (
                              <>
                                {item.achievements!.map((a, i) => (
                                  <span key={i} className="block mb-4 last:mb-0">{a}</span>
                                ))}
                                {item.longDescription && (
                                  <span className="block mt-4">{item.longDescription}</span>
                                )}
                                {item.features && item.features.length > 0 && (
                                  <span className="block mt-4">{item.features.join(' ')} </span>
                                )}
                              </>
                            ) : (item.longDescription || collapsedText)
                          ) : collapsedText}
                        </p>
                        {item.technologies && item.technologies.length > 0 && (
                          <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
                            {item.technologies.slice(0, expandedState ? item.technologies.length : 6).map(t => (
                              <span key={t} className="text-[10px] px-3 py-1 rounded-full bg-white/5 text-gray-300 tracking-wide">{t}</span>
                            ))}
                            {item.technologies.length > 6 && !expandedState && (
                              <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 text-gray-400">+{item.technologies.length - 6}</span>
                            )}
                          </div>
                        )}
                      </div>
                      {(showAchievements && item.achievements!.length > 1) || item.longDescription || (item.features && item.features.length > 1) ? (
                        <button
                          onClick={() => toggle(primaryId)}
                          className={`mt-8 inline-flex items-center gap-2 text-xs font-semibold text-white group/btn tracking-wide ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}
                        >
                          <span className="relative">
                            {expandedState ? 'Show less' : 'See more'}
                            <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 opacity-70" />
                          </span>
                          <span className={`transition-transform duration-300 ${expandedState ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;