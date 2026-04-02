import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  ExternalLink, 
  FileText, 
  Terminal, 
  Layers, 
  Zap, 
  RefreshCw, 
  ShieldCheck, 
  Cpu,
  Globe,
  Database,
  Box
} from 'lucide-react'

// GitHub icon — lucide-react removed brand icons in v1
const GitHubIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    whileHover={{ y: -5, borderColor: 'rgba(52, 211, 153, 0.3)' }}
    className={`glass-card p-6 glass-card-hover ${className}`}
  >
    {children}
  </motion.div>
)

const MockTerminal = () => {
  const [lines, setLines] = useState<string[]>([
    "[SYSTEM] Initializing Isopod Core...",
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  const terminalSequence = [
    "[DOCKER] Pulling itzg/minecraft-server:latest...",
    "[RESOLVER] Checking Modrinth for 'Fabric API'...",
    "[RESOLVER] Resolved: Fabric API v0.92.0 (Direct Link)",
    "[RESOLVER] Resolving dependencies: 4 mods found.",
    "[ISOPOD] Creating container: isopod-survival-01",
    "[SERVER] Loading properties...",
    "[SERVER] Starting Minecraft server on port 25565",
    "[RCON] Connected to localhost:25575",
    "Welcome to Isopod Console. Type 'help' for commands.",
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < terminalSequence.length) {
        setLines(prev => [...prev, terminalSequence[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 font-mono text-sm shadow-2xl rounded-lg overflow-hidden border border-white/10 bg-[#0A0A0A]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-[#1A1A1A]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-text-secondary text-xs ml-2">isopod@manager: ~/survival</span>
      </div>
      <div ref={scrollRef} className="p-4 h-64 overflow-y-auto custom-scrollbar">
        {lines.map((line, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            key={idx} 
            className="mb-1"
          >
            <span className="text-accent-emerald mr-2">❯</span>
            <span className={line.startsWith('[SERVER]') ? 'text-accent-emerald' : line.startsWith('[RESOLVER]') ? 'text-accent-cobalt' : 'text-text-primary'}>
              {line}
            </span>
          </motion.div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-accent-emerald">❯</span>
          <span className="w-2 h-4 bg-accent-emerald animate-pulse" />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen mesh-gradient selection:bg-accent-emerald/30 selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-header py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/Isopod_logo.png" 
              alt="Isopod Logo" 
              className="w-10 h-10 object-contain drop-shadow-lg" 
            />
            <span className="text-xl font-bold tracking-tight text-white">ISOPOD</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-accent-emerald transition-colors">Features</a>
            <a href="#tech" className="hover:text-accent-emerald transition-colors">Stack</a>
            <a href="https://github.com" target="_blank" className="flex items-center gap-1 hover:text-white transition-colors">
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold mb-6">
              <Zap className="w-3 h-3" /> v1.0 Beta Now Available
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Minecraft Management, <span className="bg-gradient-to-r from-accent-emerald to-accent-cobalt bg-clip-text text-transparent">Encapsulated.</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-xl leading-relaxed">
              A modern, Docker-powered instance manager with smart mod resolution and real-time awareness. Deploy modded servers in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://github.com" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-br from-accent-emerald to-[#2DA44E] text-white font-bold shadow-lg shadow-accent-emerald/20 hover:scale-105 transition-transform">
                <GitHubIcon className="w-5 h-5" /> Get Started on GitHub
              </a>
              <a href="#" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-card border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                <FileText className="w-5 h-5" /> View Documentation
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="absolute inset-0 bg-accent-emerald/20 blur-[120px] rounded-full" />
            <img 
              src="/Isopod_logo.png" 
              alt="Isopod Mascot" 
              className="relative z-10 w-full max-w-md mx-auto drop-shadow-[0_20px_60px_rgba(52,211,153,0.4)]" 
            />
          </motion.div>
        </div>

        <MockTerminal />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-secondary-bg/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Core Shell Capabilities</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Everything you need to run high-performance modded servers without the overhead.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard>
              <div className="w-12 h-12 rounded-xl bg-accent-cobalt/10 flex items-center justify-center mb-6 border border-accent-cobalt/20">
                <Layers className="w-6 h-6 text-accent-cobalt" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Prism-Like UI</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Create separate, isolated instances in seconds with our intuitive interface.</p>
            </GlassCard>

            <GlassCard>
              <div className="w-12 h-12 rounded-xl bg-accent-emerald/10 flex items-center justify-center mb-6 border border-accent-emerald/20">
                <RefreshCw className="w-6 h-6 text-accent-emerald" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Mod Ops</h3>
              <p className="text-text-secondary text-sm leading-relaxed">One-click Modrinth & CurseForge integration with intelligent dependency resolution.</p>
            </GlassCard>

            <GlassCard>
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-6 border border-yellow-400/20">
                <Terminal className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Sync/RCON</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Real-time log streaming and interactive console inputs for total control.</p>
            </GlassCard>

            <GlassCard>
              <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center mb-6 border border-purple-400/20">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Docker Powered</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Portable, lightweight, and completely isolated from your host OS environment.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 opacity-60">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-accent-emerald" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-widest text-text-secondary">Backend</div>
              <div className="font-bold text-white">FastAPI</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-accent-cobalt" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-widest text-text-secondary">Frontend</div>
              <div className="font-bold text-white">React + Tailwind</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-purple-400" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-widest text-text-secondary">Engine</div>
              <div className="font-bold text-white">Docker SDK</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Box className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-widest text-text-secondary">Base Image</div>
              <div className="font-bold text-white">itzg/minecraft-server</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/20 to-accent-cobalt/20" />
        <div className="max-w-4xl mx-auto relative z-10 glass-card p-12 text-center border-accent-emerald/20">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to roll your own server?</h2>
          <p className="text-text-secondary mb-10 text-lg">Join the Isopod beta and experience the next generation of Minecraft server management.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 rounded-2xl bg-white text-[#1A1A1A] font-bold text-lg shadow-2xl hover:shadow-accent-emerald/20 transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <GitHubIcon className="w-6 h-6" /> Clone Repository
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/Isopod_logo.png" alt="Isopod Logo" className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold text-white">ISOPOD</span>
          </div>
          <div className="text-text-secondary text-sm">
            © 2026 Isopod Development Team. Built for the community.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-text-secondary hover:text-white transition-colors"><GitHubIcon className="w-5 h-5" /></a>
            <a href="#" className="text-text-secondary hover:text-white transition-colors"><ExternalLink className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
