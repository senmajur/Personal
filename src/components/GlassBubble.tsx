"use client";
import React from 'react';

interface GlassBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  asButton?: boolean;
  glow?: boolean;
  pill?: boolean;
  padding?: string; // tailwind padding classes override
}

// Reusable liquid glass pill/bubble matching hero CTA aesthetic.
const GlassBubble: React.FC<GlassBubbleProps> = ({
  children,
  className = '',
  asButton = false,
  glow = true,
  pill = true,
  padding = 'px-5 py-2.5',
  ...rest
}) => {
  const base = `relative inline-flex items-center justify-center ${padding} ${pill ? 'rounded-full' : 'rounded-2xl'}
    bg-white/5 backdrop-blur-2xl overflow-hidden
    shadow-[0_4px_20px_rgba(0,0,0,0.25)]
    transition-all duration-500
    hover:scale-[1.05] hover:shadow-[0_8px_32px_rgba(139,92,246,0.35)]`;

  return (
    <div
      className={base + ' ' + className}
      {...rest}
      role={asButton ? 'button' : rest.role}
    >
      <span className="relative z-10 text-gray-200 tracking-wide text-sm whitespace-nowrap">
        {children}
      </span>
      {/* Animated subtle gradient field */}
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-white/[0.04] via-purple-500/[0.05] via-pink-500/[0.05] to-cyan-500/[0.04] animate-gradient-shift opacity-60 hover:opacity-90 transition-opacity duration-500" />
      {/* Shimmer / sweep */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 animate-border-flow" />
      </div>
      {/* Inner frosting */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-70" />
      {glow && (
        <div className="pointer-events-none absolute -inset-1 rounded-inherit bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
      )}
    </div>
  );
};

export default GlassBubble;
