import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import StarBackground from '@/components/StarBackground'

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Seamless Background Gradients */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-purple-900/80 via-indigo-900/60 via-slate-900/80 to-gray-900"></div>
      
      {/* Floating Glass Layers for Continuity */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Hero to Skills Transition */}
        <div className="absolute top-[80vh] left-0 right-0 h-96 bg-gradient-to-b from-transparent via-purple-800/10 to-indigo-900/20 blur-3xl"></div>
        
        {/* Skills to Experience Transition */}
        <div className="absolute top-[160vh] left-0 right-0 h-96 bg-gradient-to-b from-transparent via-slate-800/15 to-purple-900/20 blur-3xl"></div>
        
        {/* Experience to Projects Transition */}
        <div className="absolute top-[240vh] left-0 right-0 h-96 bg-gradient-to-b from-transparent via-indigo-800/15 to-pink-900/20 blur-3xl"></div>
        
        {/* Projects to Contact Transition */}
        <div className="absolute top-[320vh] left-0 right-0 h-96 bg-gradient-to-b from-transparent via-violet-800/15 to-fuchsia-900/20 blur-3xl"></div>
      </div>
      
      {/* Morphing Orbs for Visual Continuity */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[50vh] left-[10%] w-80 h-80 bg-gradient-to-br from-purple-500/8 to-pink-500/6 rounded-full blur-3xl animate-morph-1 opacity-60"></div>
        <div className="absolute top-[100vh] right-[15%] w-96 h-96 bg-gradient-to-br from-cyan-500/6 to-blue-500/8 rounded-full blur-3xl animate-morph-2 opacity-60"></div>
        <div className="absolute top-[150vh] left-[20%] w-64 h-64 bg-gradient-to-br from-emerald-500/8 to-teal-500/6 rounded-full blur-3xl animate-morph-3 opacity-60"></div>
        <div className="absolute top-[200vh] right-[10%] w-72 h-72 bg-gradient-to-br from-orange-500/6 to-red-500/8 rounded-full blur-3xl animate-morph-1 opacity-60"></div>
        <div className="absolute top-[250vh] left-[25%] w-88 h-88 bg-gradient-to-br from-violet-500/8 to-purple-500/6 rounded-full blur-3xl animate-morph-2 opacity-60"></div>
        <div className="absolute top-[300vh] right-[20%] w-60 h-60 bg-gradient-to-br from-pink-500/6 to-fuchsia-500/8 rounded-full blur-3xl animate-morph-3 opacity-60"></div>
      </div>

      <StarBackground />
      <Navigation />
      
      {/* Sections with Seamless Spacing */}
      <div className="relative z-10">
        <Hero />
        
        {/* Seamless Divider */}
        <div className="relative -mt-32 pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-transparent h-64 blur-xl"></div>
          <Skills />
        </div>
        
        {/* Seamless Divider */}
        <div className="relative -mt-32 pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent h-64 blur-xl"></div>
          <Experience />
        </div>
        
        {/* Seamless Divider */}
        <div className="relative -mt-32 pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/30 to-transparent h-64 blur-xl"></div>
          <Projects />
        </div>
        
        {/* Seamless Divider */}
        <div className="relative -mt-32 pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/30 to-transparent h-64 blur-xl"></div>
          <Contact />
        </div>
      </div>
    </main>
  )
}
