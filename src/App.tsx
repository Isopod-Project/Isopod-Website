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
  Package,
  Smartphone,
  Archive,
  HeartPulse,
  FolderOpen,
  ShieldCheck,
  Cpu,
  Globe,
  Database,
  Box,
  AlertTriangle,
  Download,
  Monitor,
  Apple,
  Server,
  GitPullRequest,
  BookOpen,
  Bug,
} from 'lucide-react'
import { Callout, CodeBlock } from './ui'

const GITHUB_URL = 'https://github.com/Isopod-Project/Isopod'
const RELEASES_URL = `${GITHUB_URL}/releases`

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
  { icon: Layers, title: 'Prism-Like Instances', body: 'Vanilla, Fabric, Forge, NeoForge, Quilt, Paper, Purpur, and Folia servers, each in its own isolated instance with a pickable loader version.' },
  { icon: Package, title: 'Mods & Modpacks', body: 'Search Modrinth from the dashboard with automatic dependency resolution, or create a server straight from a Modrinth or CurseForge modpack.' },
  { icon: Smartphone, title: 'Bedrock & Cross-play', body: 'Run a native Bedrock server, or switch on Geyser and Floodgate so phone, console, and Windows players can join a Java world.' },
  { icon: Archive, title: 'Backups & Snapshots', body: 'Scheduled world backups with retention limits, plus an automatic snapshot before every version or mod change so a bad update rolls back in one click.' },
  { icon: HeartPulse, title: 'Crash Watchdog', body: 'Crashed servers restart on their own, crash loops stop after three tries, and a crash report points at the root cause and suspect mods.' },
  { icon: Terminal, title: 'Live Console & RCON', body: 'Stream logs in real time, send commands, and see who is online, with whitelist, operator, and ban management built in.' },
  { icon: FolderOpen, title: 'File Explorer', body: 'Drag-and-drop uploads, right-click menus, multi-select, and cut/copy/paste for every file in a server.' },
  { icon: ShieldCheck, title: 'Docker Powered', body: 'Every server runs in its own container, and the dashboard updates itself with release notes built in.' },
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
            <Zap className="h-3 w-3" aria-hidden="true" /> Free &amp; open source · MIT licensed
          </span>
          <h1 className="text-display mb-6">
            Minecraft Server Management Made <span className="text-gradient">Easy.</span>
          </h1>
          <p className="lead mb-10 max-w-xl sm:text-xl">
            A self-hosted, Docker-powered dashboard for Java and Bedrock servers. Install mods and modpacks, back up worlds, and watch every server from one place.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <RouteLink to={{ view: 'downloads' }} className="btn btn-primary btn-lg">
              <Download className="h-5 w-5" aria-hidden="true" /> Install Isopod
            </RouteLink>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              <GitHubIcon className="h-5 w-5" /> View on GitHub
            </a>
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

    {/* Dashboard Screenshot */}
    <section id="dashboard" aria-labelledby="dashboard-title" className="border-t border-border py-20 sm:py-24">
      <div className="container-page">
        <div className="mb-12 text-center">
          <h2 id="dashboard-title" className="text-title mb-4">Every server, one dashboard</h2>
          <p className="lead mx-auto max-w-2xl">See which servers are online, who is playing, and how much CPU and RAM they use, then launch, edit, or back up any of them in a click.</p>
        </div>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-danger/60" />
            <div className="h-3 w-3 rounded-full bg-warn/60" />
            <div className="h-3 w-3 rounded-full bg-success/60" />
            <span className="ml-2 text-xs text-fg-muted">localhost:8000</span>
          </div>
          <img
            src="dashboard.png"
            alt="The Isopod dashboard with servers grouped into folders, one selected server showing its online players, address, and controls"
            width={1440}
            height={860}
            loading="lazy"
            className="block w-full"
          />
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section id="features" aria-labelledby="features-title" className="border-t border-border bg-surface/50 py-20 sm:py-24">
      <div className="container-page">
        <div className="mb-12 text-center sm:mb-16">
          <h2 id="features-title" className="text-title mb-4">Everything a server needs</h2>
          <p className="lead mx-auto max-w-2xl">From a vanilla world for friends to a 300-mod pack, without editing compose files by hand.</p>
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

    {/* Contribute Section */}
    <section id="contribute" aria-labelledby="contribute-title" className="border-t border-border py-20 sm:py-24">
      <div className="container-page max-w-4xl text-center">
        <h2 id="contribute-title" className="text-title mb-4">Built in the open</h2>
        <p className="lead mx-auto mb-10 max-w-2xl">
          Isopod is MIT licensed and developed on GitHub. Try it on your own server, report what breaks, or pick up a starter issue.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href={`${GITHUB_URL}/labels/good%20first%20issue`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            <GitPullRequest className="h-5 w-5" aria-hidden="true" /> Good first issues
          </a>
          <a href={`${GITHUB_URL}/issues/new/choose`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
            <Bug className="h-5 w-5" aria-hidden="true" /> Report a bug
          </a>
          <a href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
            <BookOpen className="h-5 w-5" aria-hidden="true" /> Contributing guide
          </a>
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

const PLATFORMS = [
  {
    icon: Terminal,
    name: 'Linux',
    needs: <>Docker Engine with the Compose plugin, and Git.</>,
    code: 'git clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod\ndocker compose -f isopod-compose.yml up -d --build',
    language: 'bash',
    guide: { articleId: 'install-docker', sectionId: 'linux' },
  },
  {
    icon: Monitor,
    name: 'Windows',
    needs: <><a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" className="link">Docker Desktop</a> running, and Git. The start script waits for the dashboard and opens it for you.</>,
    code: 'git clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod\n.\\scripts\\start-isopod.ps1',
    language: 'powershell',
    guide: { articleId: 'getting-started', sectionId: 'windows' },
  },
  {
    icon: Apple,
    name: 'macOS',
    needs: <><a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" className="link">Docker Desktop</a> running, and Git. The extra compose file adapts Isopod to Docker Desktop on Mac.</>,
    code: 'git clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod\necho "COMPOSE_FILE=isopod-compose.yml:docker/isopod-compose.macos.yml" > .env\ndocker compose up -d --build',
    language: 'bash',
    guide: { articleId: 'getting-started', sectionId: 'macos' },
  },
  {
    icon: Server,
    name: 'CasaOS',
    needs: <>Build the image once over SSH, then import the compose file as a custom app from the CasaOS dashboard.</>,
    code: 'git clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod\ndocker build -t isopod:latest .',
    language: 'bash',
    guide: { articleId: 'casaos-install' },
  },
]

const Downloads = () => (
  <div className="page animate-in">
    <div className="container-page max-w-5xl">
      <div className="mb-12 text-center sm:mb-16">
        <span className="badge badge-accent mb-4">
          <Download className="h-3 w-3" aria-hidden="true" /> Install
        </span>
        <h1 className="text-title mb-6">Install Isopod</h1>
        <p className="lead mx-auto max-w-2xl">
          Isopod runs as a Docker container on the machine that hosts your servers. Pick your platform, run the commands, then open <code className="font-mono text-fg-strong">http://localhost:8000</code>.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
        {PLATFORMS.map(({ icon: Icon, name, needs, code, language, guide }) => (
          <div key={name} className="card flex h-full flex-col">
            <div className="mb-4 flex items-center gap-4">
              <div className="icon-tile">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-heading">{name}</h2>
            </div>
            <p className="leading-relaxed text-fg-muted">{needs}</p>
            <div className="flex-grow">
              <CodeBlock code={code} language={language} />
            </div>
            <RouteLink to={{ view: 'wiki', ...guide }} className="btn btn-secondary w-full">
              <FileText className="h-4 w-4" aria-hidden="true" /> {name} guide
            </RouteLink>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Callout type="warning">
          The dashboard has no login yet, and the container runs privileged. Keep port 8000 on your home network and never forward it to the internet. To reach Isopod remotely, use a VPN such as Tailscale or WireGuard.
        </Callout>
        <Callout type="tip">
          CurseForge modpacks need a free API key. See <RouteLink to={{ view: 'wiki', articleId: 'dashboard-guide', sectionId: 'curseforge-modpacks' }} className="link">CurseForge Modpacks</RouteLink> in the wiki.
        </Callout>
      </div>

      <p className="mt-12 text-center text-sm text-fg-muted">
        Updating? Click <strong className="text-fg-strong">Update Now</strong> in the dashboard when a new version is out. Release notes are on the <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="link">Releases page</a>.
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
