import WikiPage from './WikiPage'
import { useRoute } from './route'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { GitHubIcon, RouteLink } from './ui'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Terminal,
  Layers,
  Zap,
  RefreshCw,
  ShieldCheck,
  Cpu,
  Globe,
  Database,
  Box,
  AlertTriangle,
  Download,
  Monitor,
  ChevronRight,
} from 'lucide-react'

const RELEASES_URL = 'https://github.com/Isopod-Project/Isopod/releases'

// --- Error Boundary ---
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("isopod_error_caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <AlertTriangle className="mb-4 h-16 w-16 text-warn" aria-hidden="true" />
          <h1 className="text-heading mb-2">Something went wrong</h1>
          <p className="mb-6 text-fg-muted">The interface encountered an error during rendering.</p>
          <button type="button" onClick={() => window.location.reload()} className="btn btn-primary btn-lg">
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Components ---

const FEATURES = [
  { icon: Layers, title: 'Prism-Like UI', body: 'Create separate, isolated instances in seconds with our intuitive interface.' },
  { icon: RefreshCw, title: 'Smart Mod Ops', body: 'One-click Modrinth integration with intelligent server-side dependency resolution.' },
  { icon: Terminal, title: 'Live Sync/RCON', body: 'Real-time log streaming and interactive console inputs for total control.' },
  { icon: ShieldCheck, title: 'Docker Powered', body: 'Portable, lightweight, and completely isolated from your host OS environment.' },
]

const STACK = [
  { icon: Cpu, label: 'Backend', name: 'FastAPI' },
  { icon: Globe, label: 'Frontend', name: 'React + Tailwind' },
  { icon: Database, label: 'Engine', name: 'Docker SDK' },
  { icon: Box, label: 'Base Image', name: 'itzg/minecraft-server' },
]

const terminalSequence = [
  "isopod_test0  | [18:03:09] [main/INFO]: Loaded 1515 recipes",
  "isopod_test0  | [18:03:09] [main/INFO]: Loaded 1617 advancements",
  "isopod_test0  | [18:03:09] [main/INFO]: Applied 0 biome modifications to 0 of 65 new biomes in 4.712 ms",
  "isopod_test0  | [18:03:09] [Server thread/INFO]: Starting minecraft server version 26.1.1",
  "isopod_test0  | [18:03:09] [Server thread/INFO]: Loading properties",
  "isopod_test0  | [18:03:09] [Server thread/INFO]: Default game type: SURVIVAL",
  "isopod_test0  | [18:03:09] [Server thread/INFO]: Generating keypair",
  "isopod_test0  | [18:03:09] [Server thread/INFO]: Starting Minecraft server on *:25565",
  "isopod_test0  | [18:03:09] [Server thread/INFO]: Preparing level \"world\"",
  "isopod_test0  | [18:03:10] [Server thread/INFO]: Loading 0 persistent chunks...",
  "isopod_test0  | [18:03:10] [Server thread/INFO]: Preparing spawn area: 100%",
  "isopod_test0  | [18:03:10] [Server thread/INFO]: Time elapsed: 67 ms",
  "isopod_test0  | [18:03:10] [Server thread/INFO]: Done (0.461s)! For help, type \"help\"",
]

const MockTerminal = () => {
  const [lines, setLines] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

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
    <div
      role="img"
      aria-label="Example Isopod console output of a Minecraft server starting up"
      className="mx-auto mt-16 w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-inset font-mono text-xs shadow-2xl sm:text-sm"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="h-3 w-3 rounded-full bg-danger/60" />
          <div className="h-3 w-3 rounded-full bg-warn/60" />
          <div className="h-3 w-3 rounded-full bg-success/60" />
        </div>
        <span className="ml-2 text-xs text-fg-muted">isopod@manager: ~/survival</span>
      </div>
      <div ref={scrollRef} className="h-64 overflow-y-auto p-4" aria-hidden="true">
        {lines.map((line, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            key={idx}
            className="mb-1 break-all"
          >
            <span className="mr-2 text-success">❯</span>
            <span className="text-fg">{line}</span>
          </motion.div>
        ))}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-success">❯</span>
          <span className="h-4 w-2 animate-pulse bg-success" />
        </div>
      </div>
    </div>
  )
}

const Landing = () => (
  <>
    {/* Hero Section */}
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-accent mb-6">
            <Zap className="h-3 w-3" aria-hidden="true" /> v1.0 Beta Now Available
          </span>
          <h1 className="text-display mb-6">
            Minecraft Server Management Made <span className="text-gradient">Easy.</span>
          </h1>
          <p className="lead mb-10 max-w-xl sm:text-xl">
            A modern, Docker-powered instance manager with smart mod resolution and real-time awareness. Deploy modded servers in seconds.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="https://github.com/Isopod-Project/Isopod" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <GitHubIcon className="h-5 w-5" /> Get Started on GitHub
            </a>
            <RouteLink to={{ view: 'wiki' }} className="btn btn-secondary btn-lg">
              <FileText className="h-5 w-5" aria-hidden="true" /> View Documentation
            </RouteLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:ml-auto"
        >
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-[120px]" aria-hidden="true" />
          <img
            src="Isopod_logo.png"
            alt="Isopod mascot, a rolled-up isopod"
            className="relative z-10 mx-auto w-full max-w-xs drop-shadow-2xl sm:max-w-sm lg:max-w-md"
          />
        </motion.div>
      </div>

      <div className="container-page">
        <MockTerminal />
      </div>
    </section>

    {/* Features Grid */}
    <section id="features" aria-labelledby="features-title" className="border-t border-border bg-surface/50 py-20 sm:py-24">
      <div className="container-page">
        <div className="mb-12 text-center sm:mb-16">
          <h2 id="features-title" className="text-title mb-4">Core Shell Capabilities</h2>
          <p className="lead mx-auto max-w-2xl">Everything you need to run high-performance modded servers with ease.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card card-interactive">
              <div className="icon-tile mb-6">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-fg-strong">{title}</h3>
              <p className="text-sm leading-relaxed text-fg-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Tech Stack Section */}
    <section id="tech" aria-label="Tech stack" className="border-t border-border py-16">
      <ul className="container-page grid grid-cols-2 gap-8 md:flex md:items-center md:justify-center md:gap-20">
        {STACK.map(({ icon: Icon, label, name }) => (
          <li key={name} className="flex items-center gap-3">
            <Icon className="h-6 w-6 flex-shrink-0 text-accent-fg" aria-hidden="true" />
            <div>
              <div className="text-xs uppercase tracking-widest text-fg-muted">{label}</div>
              <div className="font-bold text-fg-strong">{name}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  </>
)

const Downloads = () => (
  <div className="page animate-in">
    <div className="container-page max-w-5xl">
      <div className="mb-12 text-center sm:mb-16">
        <span className="badge badge-accent mb-4">
          <Download className="h-3 w-3" aria-hidden="true" /> Downloads
        </span>
        <h1 className="text-title mb-6">Get Isopod Manager</h1>
        <p className="lead mx-auto max-w-2xl">
          Choose your platform and start managing your Minecraft instances with the power of Docker.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {/* Windows Download */}
        <div className="card flex h-full flex-col">
          <div className="icon-tile mb-6">
            <Monitor className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-heading mb-4">Windows</h2>
          <div className="flex-grow">
            <p className="mb-6 leading-relaxed text-fg-muted">
              The full desktop experience for Windows users. Includes our intuitive GUI and background manager.
            </p>
            <div className="mb-8 flex items-start gap-3 rounded-xl border border-warn/30 bg-warn/10 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-warn" aria-hidden="true" />
              <p className="text-sm leading-snug text-fg">
                <strong className="text-warn">Requirement:</strong> Need Docker Desktop downloaded and running to use Isopod.
              </p>
            </div>
          </div>
          <a href={`${RELEASES_URL}/latest`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg w-full">
            <Download className="h-5 w-5" aria-hidden="true" /> Download for Windows (.exe)
          </a>
        </div>

        {/* Linux Download */}
        <div className="card flex h-full flex-col">
          <div className="icon-tile mb-6">
            <Terminal className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-heading mb-4">Linux</h2>
          <div className="flex-grow">
            <p className="mb-6 leading-relaxed text-fg-muted">
              Optimized for server environments and advanced users. Available as an AppImage or manual script.
            </p>
            <ul className="mb-8 space-y-3">
              {['Ubuntu / Debian', 'Fedora / Arch', 'Generic AppImage'].map(distro => (
                <li key={distro} className="flex items-center gap-2 text-sm text-fg-muted">
                  <ChevronRight className="h-4 w-4 text-accent-fg" aria-hidden="true" /> {distro}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a href={`${RELEASES_URL}/latest`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              .AppImage
            </a>
            <a href={`${RELEASES_URL}/latest`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              .deb / .rpm
            </a>
          </div>
        </div>
      </div>

      <p className="mt-16 text-center text-sm text-fg-muted">
        Looking for other versions? Check our <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="link">Releases page</a> on GitHub.
      </p>
    </div>
  </div>
)

function App() {
  const { view } = useRoute()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader view={view} />
      <main id="main" tabIndex={-1} className="flex-grow focus:outline-none">
        {view === 'landing' && <Landing />}
        {view === 'downloads' && <Downloads />}
        {view === 'wiki' && <WikiPage />}
      </main>
      <SiteFooter />
    </div>
  )
}

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}
