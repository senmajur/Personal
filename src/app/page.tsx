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
        {/* Hero to Skills Organic Transition */}
        <div className="absolute top-[75vh] left-0 right-0 h-[120vh] bg-gradient-to-b from-transparent via-purple-800/8 via-indigo-900/12 to-transparent blur-3xl opacity-80"></div>
        <div className="absolute top-[85vh] left-[15%] right-[15%] h-80 bg-gradient-to-b from-transparent via-violet-700/10 to-transparent blur-2xl opacity-60"></div>
        
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
        <div className="absolute top-[90vh] right-[25%] w-72 h-72 bg-gradient-to-br from-cyan-500/6 to-purple-500/8 rounded-full blur-3xl animate-morph-2 opacity-50"></div>
        <div className="absolute top-[95vh] left-[30%] w-56 h-56 bg-gradient-to-br from-violet-500/7 to-indigo-500/5 rounded-full blur-2xl animate-morph-3 opacity-70"></div>
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
        
        {/* Organic Seamless Divider */}
        <div className="relative -mt-24 pt-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 via-violet-800/15 to-transparent h-80 blur-2xl"></div>
          <div className="absolute top-8 left-1/4 right-1/4 h-32 bg-gradient-to-r from-transparent via-purple-600/10 to-transparent blur-xl"></div>
          <Skills />
        </div>
        
        <Experience />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
