import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navigate, useRoute } from './route'
import {
  Layers,
  Terminal,
  ShieldCheck,
  RefreshCw,
  Archive,
  Search,
  BookOpen,
  Copy,
  Check,
  Info,
  Lightbulb,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  PlusCircle,
  Settings,
  Play,
  Zap,
  ExternalLink,
  Wifi,
  Globe,
  Radio,
  Server,
  Lock,
  Cpu,
  Monitor,
  Box,
  Sliders,
  FileCode
} from 'lucide-react'

// --- Code Block Helper ---
const CodeBlock = ({ code, language = 'bash' }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative font-mono text-sm border border-white/10 bg-[#0E0E0E] rounded-lg overflow-hidden my-4 text-left">
      <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-[#161616] text-text-secondary text-xs">
        <span className="uppercase tracking-wider font-semibold">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent-emerald" />
              <span className="text-accent-emerald font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-text-primary whitespace-pre">{code}</pre>
    </div>
  );
};

// --- Alert Box Helper ---
const Alert = ({ type, children }: { type: 'note' | 'tip' | 'warning', children: React.ReactNode }) => {
  let borderColor = 'border-accent-cobalt/20';
  let bgColor = 'bg-accent-cobalt/5';
  let textColor = 'text-accent-cobalt';
  let icon = <Info className="w-5 h-5 flex-shrink-0" />;
  let label = 'NOTE';

  if (type === 'tip') {
    borderColor = 'border-accent-emerald/20';
    bgColor = 'bg-accent-emerald/5';
    textColor = 'text-accent-emerald';
    icon = <Lightbulb className="w-5 h-5 flex-shrink-0" />;
    label = 'PRO TIP';
  } else if (type === 'warning') {
    borderColor = 'border-yellow-500/20';
    bgColor = 'bg-yellow-500/5';
    textColor = 'text-yellow-500';
    icon = <AlertTriangle className="w-5 h-5 flex-shrink-0" />;
    label = 'WARNING';
  }

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${borderColor} ${bgColor} my-5 items-start text-left`}>
      <div className={`${textColor} mt-0.5`}>{icon}</div>
      <div className="text-sm leading-relaxed text-text-primary">
        <strong className={`block text-xs font-bold tracking-wider mb-1 ${textColor}`}>{label}</strong>
        {children}
      </div>
    </div>
  );
};

// --- Table Helper ---
const WikiTable = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="w-full overflow-x-auto my-6 border border-white/10 rounded-xl bg-[#1D1D1D]/30 backdrop-blur-sm text-left">
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-white/10 bg-white/5">
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3 font-semibold text-white whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
            {row.map((cell, cidx) => (
              <td key={cidx} className="px-4 py-3 text-text-secondary align-top">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const WikiPage = () => {
  const route = useRoute();
  const activeArticleId = route.articleId ?? 'about';
  const setActiveArticleId = (id: string) => navigate({ view: 'wiki', articleId: id });

  // Deep links (#/wiki/<article>/<section>) scroll to the section once the article renders
  useEffect(() => {
    if (!route.sectionId) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(route.sectionId!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [route.articleId, route.sectionId]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Getting Started': true,
    'Using the Dashboard': true,
    'Networking & Multiplayer': true,
    'Development': true
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const articles = [
    // ==========================================
    // GETTING STARTED
    // ==========================================
    {
      id: 'about',
      title: 'About Isopod',
      category: 'Getting Started',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold mb-4">
            <Box className="w-3.5 h-3.5" /> Core Overview
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">About Isopod</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            <strong>Isopod</strong> is an open-source, container-native Minecraft server management platform. Designed for both casual server hosts and dedicated community administrators, Isopod delivers a sleek web dashboard inspired by modern desktop launchers like Prism Launcher, powered under the hood by Docker.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] hover:border-accent-emerald/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-accent-emerald" /> Prism-Inspired Instances
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Manage isolated server environments effortlessly. Each server instance maintains its own dedicated directory, configuration, world files, and resource allocations without cross-contamination.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] hover:border-accent-cobalt/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <RefreshCw className="w-5 h-5 text-accent-cobalt" /> Smart Mod Ops (Modrinth)
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                First-class integration with the Modrinth ecosystem. Discover, download, and update mods with automatic server-compatibility checks and dependency resolution.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] hover:border-yellow-400/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-yellow-400" /> Real-Time Console & RCON
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Inspect server logs in real time with auto-scrolling terminal feeds and dispatch administrative Minecraft commands instantly through secure interactive RCON.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] hover:border-purple-400/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-purple-400" /> Docker Container Isolation
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Preserves host operating system integrity. All game servers run inside isolated, lightweight Docker containers with dedicated memory bounds and clean network mappings.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">🖥️ System Requirements</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Isopod runs on standard x86-64 and ARM64 servers and PCs. Below are recommended hardware specifications:
          </p>

          <WikiTable
            headers={['Component', 'Minimum (1-2 Servers)', 'Recommended (Multiple / Modded)']}
            rows={[
              ['Operating System', 'Windows 10/11 (WSL2), Linux (Ubuntu/Debian/Fedora), macOS 12+, CasaOS', 'Ubuntu Server 22.04+ or Debian 12 (Dedicated Host)'],
              ['CPU', 'Dual-Core x86-64 or ARM64 (e.g. Raspberry Pi 4/5)', 'Quad-Core (or higher) with high single-thread clock speed'],
              ['System RAM', '4 GB total host RAM (allocate 2 GB to Minecraft)', '16 GB+ total host RAM (allocate 4-10 GB per modded instance)'],
              ['Storage', '10 GB free space (HDD or SSD)', '50 GB+ High-Speed NVMe SSD for fast chunk loading'],
              ['Docker Engine', 'v24.0 or newer', 'Latest Docker Engine + Docker Compose v2.20+']
            ]}
          />

          <Alert type="note">
            Isopod leverages the battle-tested <strong>itzg/minecraft-server</strong> image, offering out-of-the-box compatibility with Vanilla, Fabric, Forge, NeoForge, Quilt, Paper, Purpur, and Folia. You can also create a server straight from a Modrinth or CurseForge modpack.
          </Alert>
        </div>
      )
    },
    {
      id: 'install-docker',
      title: 'Installing Docker & Prerequisites',
      category: 'Getting Started',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-semibold mb-4">
            <Monitor className="w-3.5 h-3.5" /> Setup Guide
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Installing Docker & Prerequisites</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Because Isopod manages Minecraft servers through container virtualization, having Docker and Docker Compose installed on your host system is required. Choose your operating system below:
          </p>

          {/* Windows Section */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] mb-8">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
              <Monitor className="w-6 h-6 text-accent-cobalt" /> Windows 10 & 11 (WSL 2 Backend)
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Docker Desktop on Windows runs most efficiently using the Windows Subsystem for Linux (WSL 2).
            </p>

            <ol className="list-decimal pl-6 space-y-3 text-text-secondary text-sm mb-4">
              <li>
                <strong>Enable Hardware Virtualization:</strong> Ensure CPU virtualization (VT-x for Intel, SVM for AMD) is enabled in your computer's BIOS/UEFI settings.
              </li>
              <li>
                <strong>Install WSL 2:</strong> Open <em>PowerShell</em> as Administrator and run:
                <CodeBlock code="wsl --install" language="powershell" />
                <em>Note: Restart your computer if prompted by Windows.</em>
              </li>
              <li>
                <strong>Download Docker Desktop:</strong> Download the official installer from <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:underline">docker.com/products/docker-desktop</a>.
              </li>
              <li>
                <strong>Install with WSL 2:</strong> Run the installer and ensure <strong>&quot;Use WSL 2 instead of Hyper-V&quot;</strong> is checked during setup.
              </li>
              <li>
                <strong>Verify Docker:</strong> Launch Docker Desktop from the Start menu. Once started, open PowerShell and verify:
                <CodeBlock code={`docker --version\ndocker compose version`} language="powershell" />
              </li>
            </ol>
          </div>

          {/* Linux Section */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] mb-8">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-accent-emerald" /> Linux (Ubuntu, Debian, Fedora, Arch)
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              On Linux servers, Docker Engine installs natively with maximum performance and minimal overhead.
            </p>

            <ol className="list-decimal pl-6 space-y-3 text-text-secondary text-sm mb-4">
              <li>
                <strong>Run the Official Docker Convenience Script:</strong>
                <CodeBlock code={`curl -fsSL https://get.docker.com -o get-docker.sh\nsudo sh get-docker.sh`} language="bash" />
              </li>
              <li>
                <strong>Allow Non-Root Docker Usage:</strong> Add your user account to the <code>docker</code> security group so you do not need <code>sudo</code> for every command:
                <CodeBlock code={`sudo usermod -aG docker $USER\nnewgrp docker`} language="bash" />
              </li>
              <li>
                <strong>Enable Docker to Start on Boot:</strong>
                <CodeBlock code="sudo systemctl enable --now docker" language="bash" />
              </li>
              <li>
                <strong>Verify Installation:</strong>
                <CodeBlock code="docker run --rm hello-world" language="bash" />
              </li>
            </ol>
          </div>

          {/* macOS Section */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] mb-8">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-purple-400" /> macOS (Apple Silicon & Intel)
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Docker Desktop is fully supported on macOS for both Apple Silicon (M1/M2/M3/M4) and Intel Macs.
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-text-secondary text-sm mb-4">
              <li>Download Docker Desktop for Mac from <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:underline">docker.com</a> (choose Apple Silicon or Intel).</li>
              <li>Drag <strong>Docker.app</strong> into your Applications folder and launch it.</li>
              <li>In Docker Desktop Settings &rarr; <em>Resources</em>, allocate at least <strong>4 GB - 6 GB</strong> of memory to allow server instances adequate RAM.</li>
            </ol>
          </div>

          {/* CasaOS Section */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] mb-8">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
              <Server className="w-6 h-6 text-yellow-400" /> CasaOS / Home NAS
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              If you run <strong>CasaOS</strong>, Docker Engine and Docker Compose are already pre-installed out of the box! You can proceed directly to the <button onClick={() => setActiveArticleId('casaos-install')} className="text-accent-emerald hover:underline font-semibold cursor-pointer">CasaOS Installation Guide</button>.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'getting-started',
      title: 'Quick Start Guide',
      category: 'Getting Started',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" /> Quick Start
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Quick Start Guide</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Get your Isopod manager up and running in just a few minutes. Follow these simple steps to deploy your local instance manager.
          </p>

          <div className="space-y-8 my-8">
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-xs text-accent-emerald font-bold">1</span>
                Clone the Isopod Repository
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Download the latest Isopod repository onto your machine:
              </p>
              <CodeBlock code={`git clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod`} language="bash" />
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-xs text-accent-emerald font-bold">2</span>
                Launch the Stack with Docker Compose
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Start the application containers in detached mode. This command will build the frontend assets, compile the backend, and link your local Docker socket:
              </p>
              <CodeBlock code="docker compose -f isopod-compose.yml up -d --build" language="bash" />
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-xs text-accent-emerald font-bold">3</span>
                Open the Web Dashboard
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Open your browser and navigate to the web panel:
              </p>
              <div className="p-4 rounded-xl border border-white/5 bg-[#0E0E0E] flex items-center justify-between">
                <span className="font-mono text-accent-emerald text-base">http://localhost:8000</span>
                <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors">
                  Open Dashboard <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">🔧 Lifecycle Management Commands</h2>
          <WikiTable
            headers={['Action', 'Command', 'Description']}
            rows={[
              ['View Logs', <code key="logs" className="text-xs text-accent-emerald">docker compose -f isopod-compose.yml logs -f</code>, 'Stream live backend and server container logs.'],
              ['Stop Service', <code key="stop" className="text-xs text-accent-emerald">docker compose -f isopod-compose.yml down</code>, 'Gracefully shuts down Isopod dashboard containers.'],
              ['Restart Service', <code key="restart" className="text-xs text-accent-emerald">docker compose -f isopod-compose.yml restart</code>, 'Quickly restarts the web backend.'],
              ['Update to Latest', <code key="update" className="text-xs text-accent-emerald">git pull && docker compose -f isopod-compose.yml up -d --build</code>, 'Pulls latest git commits and rebuilds the container image.']
            ]}
          />

          <Alert type="note">
            Want to create servers from <strong>CurseForge</strong> modpacks? CurseForge needs a free API key. Add <code>CURSEFORGE_API_KEY='your-key'</code> to a <code>.env</code> file next to <code>isopod-compose.yml</code> and run the launch command again. See <a href="#/wiki/dashboard-guide/curseforge-modpacks" className="text-accent-emerald hover:underline">CurseForge Modpacks</a> for the full steps.
          </Alert>

          <Alert type="tip">
            Hosting Isopod on a dedicated home server or remote VPS? Access the dashboard using your server's local LAN address (e.g., <code>http://192.168.1.150:8000</code>).
          </Alert>
        </div>
      )
    },
    {
      id: 'casaos-install',
      title: 'Installing on CasaOS',
      category: 'Getting Started',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-semibold mb-4">
            <Server className="w-3.5 h-3.5" /> CasaOS Integration
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Installing on CasaOS</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            CasaOS is an elegant home cloud system dashboard. This guide walks you through importing and deploying Isopod as a native dashboard web application.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Build the Docker Image</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Connect to your CasaOS server via SSH or the built-in terminal, clone the repository, and build the Docker image locally:
          </p>
          <CodeBlock code={`git clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod\ndocker build -t isopod:latest .`} language="bash" />

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Install via CasaOS Dashboard</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Follow these steps to import the container into CasaOS:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-text-secondary mb-6">
            <li>Open your <strong>CasaOS Web Interface</strong> in your browser.</li>
            <li>Click on the <strong>App Store</strong> icon.</li>
            <li>Click <strong>Custom Install</strong> in the top-right corner.</li>
            <li>Click the <strong>Import</strong> icon (represented by the <code>[→]</code> symbol in the upper header).</li>
            <li>Paste the following Docker Compose specification and click <strong>Submit</strong>:</li>
          </ol>

          <CodeBlock code={`services:
  isopod:
    image: isopod:latest
    container_name: isopod
    restart: unless-stopped
    network_mode: bridge
    ports:
      - "8000:8000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /DATA/AppData/isopod/servers:/DATA/AppData/isopod/servers
    environment:
      - SECURE_KEY=replace_with_a_secure_random_key
      # Optional: needed for CurseForge modpacks. Write every $ in the key as $$
      - CURSEFORGE_API_KEY=`} language="yaml" />

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Volume Mount Details</h2>
          <WikiTable
            headers={['Host Path', 'Container Path', 'Explanation']}
            rows={[
              ['/var/run/docker.sock', '/var/run/docker.sock', 'Grants Isopod permission to spin up and control Minecraft server containers.'],
              ['/DATA/AppData/isopod/servers', '/DATA/AppData/isopod/servers', 'Persists all Minecraft world directories, configs, and mod files safely on your CasaOS storage.']
            ]}
          />

          <Alert type="note">
            <code>CURSEFORGE_API_KEY</code> is only needed for CurseForge modpacks. Get a free key at <a href="https://console.curseforge.com" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:underline">console.curseforge.com</a>. Docker Compose treats <code>$</code> as the start of a variable, and CurseForge keys contain several, so write each <code>$</code> in the key as <code>$$</code> when you paste it into the YAML.
          </Alert>

          <Alert type="warning">
            Always change <code>replace_with_a_secure_random_key</code> to a long, random alphanumeric passphrase. This secures session authorization for instance administration.
          </Alert>
        </div>
      )
    },

    // ==========================================
    // USING THE DASHBOARD
    // ==========================================
    {
      id: 'dashboard-guide',
      title: 'Creating & Managing Instances',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold mb-4">
            <PlusCircle className="w-3.5 h-3.5" /> Instance Manager
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Creating & Managing Instances</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Isopod makes provisioning new Minecraft servers fast and intuitive. Every server is an independent instance with dedicated storage, custom RAM limits, and unique port bindings.
          </p>

          <h2 id="create-instance" className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2.5">
            <PlusCircle className="w-6 h-6 text-accent-emerald" /> 1. Creating a New Instance
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-text-secondary mb-6">
            <li>Click the <strong>&quot;New Instance&quot;</strong> button in the top-right header of your Isopod dashboard.</li>
            <li>
              <strong>Instance Name:</strong> Provide a human-friendly label (e.g. <code>Fabric SMP 1.20.4</code> or <code>Paper Lobby</code>).
            </li>
            <li>
              <strong>Minecraft Version:</strong> Select any supported Minecraft version from the dropdown menu (from legacy 1.7.10 up to the latest releases and snapshots).
            </li>
            <li>
              <strong>Server Loader:</strong> Choose the engine that best suits your server's purpose:
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="p-3 rounded-xl border border-white/5 bg-[#161616]">
                  <div className="font-bold text-white text-sm">Vanilla</div>
                  <div className="text-xs text-text-secondary">Official Mojang server software. Pure Minecraft experience.</div>
                </div>
                <div className="p-3 rounded-xl border border-white/5 bg-[#161616]">
                  <div className="font-bold text-white text-sm text-accent-emerald">Fabric</div>
                  <div className="text-xs text-text-secondary">Lightweight, modern modding loader. Highly recommended for performance mods.</div>
                </div>
                <div className="p-3 rounded-xl border border-white/5 bg-[#161616]">
                  <div className="font-bold text-white text-sm text-accent-cobalt">Paper / Purpur</div>
                  <div className="text-xs text-text-secondary">High-performance server forks optimized for Spigot/Bukkit plugins.</div>
                </div>
                <div className="p-3 rounded-xl border border-white/5 bg-[#161616]">
                  <div className="font-bold text-white text-sm text-yellow-400">Forge / NeoForge</div>
                  <div className="text-xs text-text-secondary">Traditional heavy modding platforms for expansive content modpacks.</div>
                </div>
                <div className="p-3 rounded-xl border border-white/5 bg-[#161616]">
                  <div className="font-bold text-white text-sm text-purple-400">Quilt</div>
                  <div className="text-xs text-text-secondary">Modern community modding fork with broad Fabric compatibility.</div>
                </div>
                <div className="p-3 rounded-xl border border-white/5 bg-[#161616]">
                  <div className="font-bold text-white text-sm text-blue-400">Folia</div>
                  <div className="text-xs text-text-secondary">Multi-threaded regional server engine for massive multi-player communities.</div>
                </div>
              </div>
            </li>
            <li className="mt-2">
              <strong>Memory Slider:</strong> Allocate how much host RAM should be dedicated to this server (e.g. 2 GB, 4 GB, 8 GB).
            </li>
            <li>
              <strong>Server Port:</strong> Default is <code>25565</code>. If you are creating a second server, assign an available port like <code>25566</code>.
            </li>
            <li>Click <strong>Create</strong>. Isopod writes the container configuration, registers the instance, and initializes the directory structure.</li>
          </ol>

          <h2 id="manage-instances" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-accent-cobalt" /> 2. Managing Existing Instances
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            On the main dashboard, each instance card provides real-time information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Status Indicator:</strong> Shows whether the server is <span className="text-text-secondary font-bold">Stopped</span>, <span className="text-yellow-400 font-bold">Starting</span>, or <span className="text-accent-emerald font-bold">Online</span>.</li>
            <li><strong>Port & Memory:</strong> Quick glance at active port bindings and allocated RAM.</li>
            <li><strong>One-Click Power:</strong> Start, stop, or open the instance inspector panel.</li>
            <li><strong>Isolated Directory:</strong> All server files reside safely in <code>servers/&lt;instance_name&gt;/</code> on your host.</li>
          </ul>
          <h2 id="import-modpacks" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Box className="w-6 h-6 text-accent-emerald" /> 3. Importing &amp; Modpacks
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The <strong>New Instance</strong> window has four server types in its left sidebar:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Custom:</strong> Build a server from scratch by choosing a Minecraft version and loader.</li>
            <li><strong>Import:</strong> Upload a <code>.zip</code> of an existing server. Isopod extracts it into a new instance and shows upload and extraction progress.</li>
            <li><strong>Modrinth:</strong> Search Modrinth modpacks and pick a pack version. Keep <em>Show only server-side compatible modpacks</em> enabled to hide packs that can&apos;t run on a dedicated server. Client-only mods inside a pack are excluded automatically.</li>
            <li><strong>CurseForge:</strong> Search CurseForge modpacks and pick a pack version. This needs a free API key, see <a href="#/wiki/dashboard-guide/curseforge-modpacks" className="text-accent-emerald hover:underline">CurseForge Modpacks</a> below.</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            Click the icon next to the instance name to choose a custom server icon. Modpack instances use the pack&apos;s icon by default.
          </p>

          <h2 id="curseforge-modpacks" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Box className="w-6 h-6 text-orange-400" /> 4. CurseForge Modpacks
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Isopod can create a server from any CurseForge modpack. CurseForge only serves its API to apps that have a key, so you set one up once.
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-text-secondary mb-6">
            <li>
              <strong>Get a key.</strong> Sign in at <a href="https://console.curseforge.com" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:underline">console.curseforge.com</a> and create an API key. It is free.
            </li>
            <li>
              <strong>Give it to Isopod.</strong> Add it to the <code>.env</code> file in the root of your Isopod clone. Put the key in single quotes, because CurseForge keys contain <code>$</code> characters:
              <CodeBlock code="CURSEFORGE_API_KEY='your-key-here'" language="env" />
              On macOS, add it to the same <code>.env</code> that holds <code>COMPOSE_FILE</code>. On CasaOS, add <code>CURSEFORGE_API_KEY</code> as an environment variable instead.
            </li>
            <li>
              <strong>Restart Isopod</strong> so it picks the key up:
              <CodeBlock code="docker compose -f isopod-compose.yml up -d" language="bash" />
            </li>
            <li>
              <strong>Create the server.</strong> Click <strong>Add Instance</strong>, open the <strong>CurseForge</strong> tab, search for a pack, and click it. The newest release is selected for you, or pick another version from the list. Name the server, continue, and start it.
            </li>
          </ol>
          <p className="text-text-secondary leading-relaxed mb-4">
            The first start downloads the pack and all of its mods, so it can take several minutes. Follow it in the <strong>Logs</strong> tab. The Minecraft version, loader, and Java version all come from the pack, and well-known client-only mods (shaders, minimaps, menu mods, and similar) are skipped so they do not crash the server.
          </p>
          <WikiTable
            headers={['Problem', 'What it means']}
            rows={[
              ['"Couldn\'t load modpacks" with CURSEFORGE_API_KEY is not set', 'The key never reached Isopod. Check the .env file and restart Isopod.'],
              ['"Couldn\'t load modpacks" with a 403', 'CurseForge rejected the key. Check that you copied all of it, or create a new one.'],
              ['The server stops while installing the pack', 'Some pack authors block downloads outside the CurseForge app, so Isopod cannot install them. The server log names the mod that failed.']
            ]}
          />
          <Alert type="note">
            CurseForge support covers <strong>modpacks</strong>. The Mods and Resource Packs tabs still search Modrinth only.
          </Alert>
          <Alert type="warning">
            Keep your key private. Isopod only sends it to <code>api.curseforge.com</code> and passes it to the server container as an environment variable. It is not written to the instance&apos;s <code>docker-compose.yml</code>.
          </Alert>
        </div>
      )
    },
    {
      id: 'mod-management',
      title: 'Mods & Resource Packs (Modrinth)',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold mb-4">
            <RefreshCw className="w-3.5 h-3.5" /> Mod Operations
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Mods & Resource Packs</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Isopod connects directly to the <strong>Modrinth</strong> platform, giving you instant access to thousands of open-source Minecraft mods, plugins, and server optimization tools without leaving your browser.
          </p>

          <h2 id="installing-mods" className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-accent-emerald" /> Intelligent Mod Installation
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Unlike generic file uploaders, Isopod's Mod Manager actively prevents server crashes through three smart safety mechanisms:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-xl border border-white/5 bg-[#161616]">
              <span className="px-2 py-0.5 rounded bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-bold">SERVER-SIDE FILTER</span>
              <h4 className="font-bold text-white mt-2 mb-1">No Client Mods</h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                Automatically hides client-only mods (HUDs, zoom, shaders, mini-maps) that cause dedicated servers to crash upon startup.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/5 bg-[#161616]">
              <span className="px-2 py-0.5 rounded bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-bold">DEP RESOLVER</span>
              <h4 className="font-bold text-white mt-2 mb-1">Auto Dependencies</h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                When installing a mod (such as <em>Lithium</em> or <em>FerriteCore</em>), Isopod checks Modrinth for required libraries (e.g. <em>Fabric API</em>) and installs them automatically.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/5 bg-[#161616]">
              <span className="px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold">LOADER GUARD</span>
              <h4 className="font-bold text-white mt-2 mb-1">Compatibility Checks</h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                Blocks incompatible downloads, such as attempting to install a Forge mod on a Fabric instance or a mismatched game version.
              </p>
            </div>
          </div>

          <h2 id="managing-mods" className="text-2xl font-bold text-white mt-10 mb-4">📦 Managing Installed Mods</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Enable / Disable:</strong> Temporarily toggle a mod off with a single click without deleting your configuration files (safely renames <code>.jar</code> to <code>.jar.disabled</code>).</li>
            <li><strong>One-Click Uninstall:</strong> Delete unwanted mods cleanly from the <code>mods/</code> directory.</li>
            <li><strong>Direct Jar Upload:</strong> Have a custom private mod? Drop your <code>.jar</code> directly into the instance's <code>mods/</code> folder or use the file uploader.</li>
            <li><strong>Check for Updates:</strong> Scan installed Modrinth mods for newer versions compatible with your server&apos;s Minecraft version and loader.</li>
          </ul>

          <h2 id="resource-packs" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-accent-cobalt" /> Server Resource Packs
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The <strong>Resource Packs</strong> tab searches Modrinth for texture and asset packs. Every pack you select is bundled together and served to players automatically when they join.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Requirement Policy:</strong> <em>Suggested</em> lets players decline the pack; <em>Required</em> makes accepting it a condition of joining.</li>
            <li><strong>Bundle Install Message:</strong> The prompt players see when the server offers the pack.</li>
          </ul>

          <Alert type="note">
            The Mods and Resource Packs tabs search Modrinth only. You can still create a server from a <strong>CurseForge</strong> modpack when you add an instance, see <a href="#/wiki/dashboard-guide/curseforge-modpacks" className="text-accent-emerald hover:underline">CurseForge Modpacks</a>.
          </Alert>

          <Alert type="tip">
            Running a Fabric server? Always install <strong>Fabric API</strong> first, as nearly all Fabric content and performance mods depend on it.
          </Alert>
        </div>
      )
    },
    {
      id: 'server-tuning',
      title: 'Server Configuration & Tuning',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-semibold mb-4">
            <Sliders className="w-3.5 h-3.5" /> Performance & Config
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Server Configuration & Tuning</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Fine-tune every aspect of your Minecraft server. Isopod provides an easy-to-use graphical editor for <code>server.properties</code> alongside container resource controls.
          </p>

          <h2 id="server-settings" className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-accent-cobalt" /> Graphical Server Settings
          </h2>
          <WikiTable
            headers={['Setting Property', 'Description', 'Recommended Value']}
            rows={[
              ['MOTD', 'The message displayed in players\' multiplayer server list.', 'Your custom community title and color codes'],
              ['Max Players', 'Maximum simultaneous players allowed on the server.', '10 - 50 (based on allocated RAM)'],
              ['Difficulty', 'Peaceful, Easy, Normal, or Hard.', 'Normal or Hard'],
              ['Game Mode', 'Survival, Creative, Adventure, or Spectator.', 'Survival'],
              ['View Distance', 'Number of chunks sent to the player (affects server CPU heavily).', '8 - 12 (10 is ideal for 1.18+)'],
              ['Simulation Distance', 'Radius of chunks where entities, crops, and ticks are processed.', '6 - 8 (crucial for tick performance)'],
              ['Online Mode', 'Validates players with Mojang authentication servers.', 'True (keep enabled for security)'],
              ['White-List', 'Only players added to the whitelist can join.', 'True (recommended for private servers)'],
              ['Allow Flight', 'Prevents survival players from being kicked for floating.', 'True if using elytra or modded movement']
            ]}
          />

          <h2 id="memory" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-accent-emerald" /> Memory & JVM Optimization
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Isopod automatically injects <strong>Aikar's Optimized Garbage Collection Flags</strong> into the Java virtual machine under the hood. To ensure peak performance:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Leave Host Headroom:</strong> Never allocate 100% of your computer's RAM to a Minecraft instance. Leave at least 2 GB free for the operating system and Docker engine.</li>
            <li><strong>Modpack Guidelines:</strong> Light vanilla/plugins: 2 - 4 GB. Heavy Fabric/Forge modpacks: 6 - 10 GB. Big Modrinth and CurseForge packs with hundreds of mods belong at the top of that range. If a pack runs out of memory, raise <code>MEMORY</code> in the instance Configuration tab.</li>
          </ul>

          <h2 id="raw-environment" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <FileCode className="w-6 h-6 text-yellow-400" /> Advanced: Raw Environment Variables
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The instance <strong>Configuration</strong> tab lists every environment variable passed to the server container (such as <code>MEMORY</code>, <code>TYPE</code>, and <code>VERSION</code>) and lets you edit their values directly.
          </p>
          <Alert type="warning">
            Invalid values can stop the container from starting. Prefer the dedicated Versions, Loaders, and Mods tabs, and only edit raw variables when you know what they do.
          </Alert>

          <Alert type="tip">
            Lowering <code>simulation-distance</code> from 10 to 6 can double your server's TPS (Ticks Per Second) with minimal noticeable difference to gameplay.
          </Alert>
        </div>
      )
    },
    {
      id: 'console-rcon',
      title: 'Live Console & RCON',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold mb-4">
            <Terminal className="w-3.5 h-3.5" /> Live Operations
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Live Console & RCON</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Monitor live server events, catch error traces, and execute administrative in-game commands in real time directly from the Isopod console tab.
          </p>

          <h2 id="console" className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2.5">
            <Terminal className="w-6 h-6 text-yellow-400" /> Interactive RCON Console
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The console tab features an integrated RCON terminal. Type any standard Minecraft command into the input bar and press Enter:
          </p>

          <WikiTable
            headers={['Command', 'Syntax Example', 'Description']}
            rows={[
              ['Grant Operator', <code key="op" className="text-xs text-yellow-400">op PlayerName</code>, 'Gives a player administrator permissions in-game.'],
              ['Whitelist Player', <code key="wl" className="text-xs text-yellow-400">whitelist add PlayerName</code>, 'Adds a player to the server\'s access whitelist.'],
              ['Broadcast Message', <code key="say" className="text-xs text-yellow-400">say Server restarting in 5 minutes!</code>, 'Sends a global chat announcement to all players.'],
              ['Teleport Player', <code key="tp" className="text-xs text-yellow-400">tp Steve Alex</code>, 'Teleports Steve to Alex\'s coordinates.'],
              ['Force World Save', <code key="save" className="text-xs text-yellow-400">save-all</code>, 'Flushes all player chunks and inventories immediately to disk.']
            ]}
          />

          <h2 id="log-controls" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Search className="w-6 h-6 text-accent-cobalt" /> Log Viewer Controls
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Keep updating:</strong> Stream new log lines live. Turn it off to freeze the view while you read.</li>
            <li><strong>Wrap lines / Color lines:</strong> Toggle line wrapping and color highlighting for errors, warnings, commands, and player events.</li>
            <li><strong>Copy / Clear / Refresh:</strong> Copy the whole log to your clipboard, clear the view, or re-fetch logs from the server.</li>
            <li><strong>Search &amp; Find:</strong> Highlight matches and jump between them. <strong>Bottom</strong> scrolls back to the newest line.</li>
          </ul>

          <h2 id="power" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Play className="w-6 h-6 text-accent-emerald" /> Server Power Lifecycle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-xl border border-white/5 bg-[#161616]">
              <h4 className="font-bold text-accent-emerald mb-2 flex items-center gap-2">
                <Play className="w-4 h-4" /> Start
              </h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                Boots the container, checks environment variables, generates server jars, and begins world loading.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/5 bg-[#161616]">
              <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Graceful Stop
              </h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                Dispatches a <code>stop</code> command via RCON, allowing chunks to save cleanly to prevent world corruption.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/5 bg-[#161616]">
              <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Force Kill
              </h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                Immediately terminates the container if a rogue mod causes the server process to hang or freeze indefinitely.
              </p>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'versions-loaders',
      title: 'Versions & Mod Loaders',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold mb-4">
            <Box className="w-3.5 h-3.5" /> Server Software
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Versions &amp; Mod Loaders</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Change the Minecraft version an instance runs and the loader that runs its mods, from the <strong>Versions</strong> and <strong>Loaders</strong> tabs of the instance editor.
          </p>

          <h2 id="versions" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Box className="w-6 h-6 text-accent-emerald" /> Changing the Minecraft Version
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The <strong>Versions</strong> tab lists the most recent releases from Mojang&apos;s official version manifest. Picking a new version opens a confirmation where you can:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Automatically update the mod loader</strong> to a build that supports the new version.</li>
            <li><strong>Verify &amp; disable incompatible mods</strong>, so only mods with a matching release stay enabled.</li>
          </ul>
          <Alert type="warning">
            Back up your world before changing versions. Worlds can be upgraded to newer versions but not safely downgraded.
          </Alert>
          <h2 id="loaders" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-accent-cobalt" /> Choosing a Mod Loader
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The <strong>Loaders</strong> tab sets how Minecraft loads mods: Vanilla (no mods), Fabric, Forge, NeoForge, Quilt, or Paper for plugins. Pick a specific loader version, or leave it on <strong>Latest Recommended</strong>.
          </p>
          <Alert type="note">
            Mods are built for one loader. Switching loaders (for example Fabric to Forge) will stop most existing mods from loading.
          </Alert>
        </div>
      )
    },
    {
      id: 'world-settings',
      title: 'World Settings',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold mb-4">
            <Globe className="w-3.5 h-3.5" /> World Generation
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">World Settings</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            The <strong>World</strong> tab controls how your server&apos;s world is generated and played. Most changes need a server restart.
          </p>

          <h2 id="world-generation" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-accent-emerald" /> Generation &amp; Gameplay Options
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>World Seed:</strong> Determines terrain generation. Leave it blank for a random seed.</li>
            <li><strong>Level Type:</strong> Default, Flat, Large Biomes, Amplified, or Buffet.</li>
            <li><strong>Difficulty:</strong> Peaceful, Easy, Normal, or Hard.</li>
            <li><strong>Game Mode:</strong> Survival, Creative, Adventure, or Spectator.</li>
            <li><strong>Structures:</strong> Toggle generation of villages, temples, and other structures.</li>
          </ul>
          <Alert type="tip">
            Seed and Level Type only apply when a world is first created. To regenerate with new settings, delete the <code>world</code> folder from the instance&apos;s Files tab, then restart the server.
          </Alert>
        </div>
      )
    },
    {
      id: 'backups',
      title: 'World Backups',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-semibold mb-4">
            <Archive className="w-3.5 h-3.5" /> Backups
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">World Backups</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            The <strong>Backups</strong> tab in the instance editor saves copies of your server&apos;s worlds, either on a schedule or on demand, so a bad mod update, corruption, or griefing doesn&apos;t cost you progress.
          </p>

          <h2 id="schedule" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <RefreshCw className="w-6 h-6 text-accent-cobalt" /> Automatic Backups
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Automatic backups:</strong> Turn on scheduled backups for this instance.</li>
            <li><strong>Frequency:</strong> Every hour, every 6 or 12 hours, daily, or weekly.</li>
            <li><strong>Backups to keep:</strong> Once there are more backups than this, the oldest are deleted.</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            Changes are saved as soon as you make them. Isopod checks every minute and backs up any instance whose newest backup is older than its frequency, so scheduled backups only run while Isopod itself is running.
          </p>
          <Alert type="tip">
            Backups are safe to take while the server is running. Isopod pauses world saving and flushes it to disk during the copy, then turns saving back on.
          </Alert>

          <h2 id="manage" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Archive className="w-6 h-6 text-accent-emerald" /> Managing Backups
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Back Up Now:</strong> Create a backup immediately, for example before updating mods.</li>
            <li><strong>Download:</strong> Save a backup&apos;s <code>.zip</code> to your computer.</li>
            <li><strong>Restore:</strong> Revert the world to that backup. The current world folders are replaced.</li>
            <li><strong>Delete:</strong> Permanently remove a backup.</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            Each backup contains every world folder in the instance (any folder with a <code>level.dat</code>, such as <code>world</code>). Server settings, mods, and configs are not included; use <strong>Export</strong> on the dashboard for a full copy of an instance.
          </p>

          <h2 id="restore" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <RefreshCw className="w-6 h-6 text-accent-emerald" /> Restoring a Backup
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-text-secondary mb-6">
            <li>Stop the server. Restore is refused while it is running.</li>
            <li>Optionally press <strong>Back Up Now</strong> so you can return to the current world later.</li>
            <li>Press <strong>Restore</strong> on the backup you want and confirm.</li>
            <li>Start the server again.</li>
          </ol>
          <Alert type="warning">
            Restoring replaces the current world. Anything built since that backup is lost unless you back up first.
          </Alert>

          <h2 id="location" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Server className="w-6 h-6 text-accent-cobalt" /> Where Backups Are Stored
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            By default, backups are saved in a <code>backups</code> folder inside each instance. They are left out when an instance is exported or duplicated. The Backups tab shows the exact folder.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            To store them somewhere else, such as a separate drive, set <strong>Settings &rarr; General &rarr; Backup Folder</strong> to an absolute path. Each instance then gets its own subfolder there. Backups already made in the old location are not moved.
          </p>
          <Alert type="warning">
            When Isopod runs in Docker, the path is inside the Isopod container. Mount the host folder into the container (for example <code>/mnt/backups:/backups</code> in your compose file) and use the container path, or backups will be lost when the container is recreated.
          </Alert>
        </div>
      )
    },
    {
      id: 'players-access',
      title: 'Players, Whitelist & Operators',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-semibold mb-4">
            <Lock className="w-3.5 h-3.5" /> Access Control
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Players, Whitelist &amp; Operators</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            The <strong>Users</strong> tab manages who can join your server and what they are allowed to do, without typing console commands.
          </p>

          <h2 id="whitelist" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Lock className="w-6 h-6 text-accent-cobalt" /> Whitelist
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Whitelist toggle:</strong> When enabled, only players on the list who are marked active can join. When disabled, anyone can join.</li>
            <li><strong>Add Player:</strong> Type a Minecraft username and press Enter (Tab autocompletes known players).</li>
            <li><strong>Remove:</strong> Removes a player from the server&apos;s player list.</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            You can set a default whitelist for every new server under <strong>Settings &rarr; Server Defaults</strong>.
          </p>
          <h2 id="operators" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-accent-emerald" /> Operator (OP) Levels
          </h2>
          <WikiTable
            headers={['Level', 'Permissions']}
            rows={[
              ['Standard Player', 'No operator permissions.'],
              ['Level 1', 'Bypass spawn protection.'],
              ['Level 2', 'Cheat commands and command blocks.'],
              ['Level 3', 'Kick, ban, and promote players.'],
              ['Level 4', 'Full operator, including server management commands.']
            ]}
          />
        </div>
      )
    },
    {
      id: 'file-manager',
      title: 'File Manager',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-semibold mb-4">
            <FileCode className="w-3.5 h-3.5" /> Server Files
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">File Manager</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            The <strong>Files</strong> tab is a full file browser for an instance&apos;s directory: configs, worlds, mods, and logs.
          </p>

          <h2 id="file-operations" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <FileCode className="w-6 h-6 text-accent-cobalt" /> Working with Files
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Upload:</strong> Drag files from your computer onto the browser, or use the upload button.</li>
            <li><strong>Create:</strong> Make new files and folders from the toolbar or by right-clicking empty space.</li>
            <li><strong>Edit:</strong> Open text files such as <code>server.properties</code> to edit them in place.</li>
            <li><strong>Organize:</strong> Select items to cut, copy, paste, download, or delete. Drag items onto a folder or breadcrumb to move them.</li>
            <li><strong>Right-click menu:</strong> Rename, delete, and other actions for the item under your cursor.</li>
          </ul>
          <Alert type="warning">
            Stop the server before editing or deleting world files. Changing them while it runs can corrupt your world.
          </Alert>
        </div>
      )
    },
    {
      id: 'app-settings',
      title: 'Dashboard Settings',
      category: 'Using the Dashboard',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-semibold mb-4">
            <Settings className="w-3.5 h-3.5" /> Application Settings
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Dashboard Settings</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Open <strong>Settings</strong> from the dashboard header to configure Isopod itself, plus the defaults used for new servers.
          </p>

          <h2 id="general" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Monitor className="w-6 h-6 text-accent-cobalt" /> General
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Automatic Refresh:</strong> Update server statuses every 5 seconds.</li>
            <li><strong>Show Snapshots:</strong> Include Minecraft snapshot versions in version lists.</li>
            <li><strong>Backup Folder:</strong> Where world backups are stored. Leave empty to keep them inside each instance. See <button onClick={() => setActiveArticleId('backups')} className="text-accent-emerald hover:underline font-semibold cursor-pointer">World Backups</button>.</li>
          </ul>
          <h2 id="language" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-accent-emerald" /> Language
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Choose the dashboard&apos;s interface language.
          </p>
          <h2 id="appearance" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Monitor className="w-6 h-6 text-accent-emerald" /> Appearance
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Switch between Dark Mode and Light Mode.
          </p>
          <h2 id="defaults" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Server className="w-6 h-6 text-accent-cobalt" /> Server Defaults
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
            <li><strong>Default Port Range Start:</strong> The first port offered to new servers.</li>
            <li><strong>Default Mod Loader</strong> and <strong>Default RAM Allocation</strong> for new servers.</li>
            <li><strong>Default Whitelist:</strong> Enable the whitelist for new servers and pre-fill its players.</li>
          </ul>
          <h2 id="updates" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <RefreshCw className="w-6 h-6 text-accent-emerald" /> Updates
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Compare your installed Isopod version with the latest release, read its release notes, and install updates. Isopod reconnects automatically once an update finishes.
          </p>
          <h2 id="advanced" className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2.5">
            <Lock className="w-6 h-6 text-yellow-400" /> Advanced
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Set the <strong>Docker Socket Path</strong> Isopod uses to manage server containers. Only change this if Docker runs at a non-standard location on your host.
          </p>
        </div>
      )
    },
    // ==========================================
    // NETWORKING & MULTIPLAYER
    // ==========================================
    {
      id: 'port-forwarding',
      title: 'Router Port Forwarding Guide',
      category: 'Networking & Multiplayer',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-semibold mb-4">
            <Wifi className="w-3.5 h-3.5" /> Multiplayer Setup
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Router Port Forwarding Guide</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            To allow friends outside your home network to connect to your Minecraft server, your home router needs to know how to route incoming Minecraft game traffic directly to your host machine.
          </p>

          <Alert type="tip">
            Cannot access your router or have strict ISP restrictions? Check our <button onClick={() => setActiveArticleId('tunneling-alternatives')} className="text-accent-emerald font-bold hover:underline cursor-pointer">Zero-Config Alternatives Guide</button> to host without port forwarding!
          </Alert>

          <div className="space-y-8 my-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 flex items-center justify-center text-xs text-accent-cobalt font-bold">1</span>
                Find Your Server's Local IPv4 Address
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                You need your server machine's private local network address (typically starts with <code>192.168.x.x</code> or <code>10.0.x.x</code>):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text-secondary text-sm mb-3">
                <li><strong>Windows:</strong> Open Command Prompt or PowerShell and type <code>ipconfig</code>. Look for <code>IPv4 Address</code> (e.g. <code>192.168.1.150</code>).</li>
                <li><strong>Linux / macOS:</strong> Open Terminal and type <code>hostname -I</code> or <code>ip a</code>.</li>
              </ul>
              <Alert type="note">
                Consider assigning a <strong>Static IP</strong> or DHCP Reservation in your router for this machine so this address does not change when your computer reboots.
              </Alert>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 flex items-center justify-center text-xs text-accent-cobalt font-bold">2</span>
                Access Your Router Gateway
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Open your web browser and navigate to your router's default gateway address (usually <code>http://192.168.1.1</code> or <code>http://192.168.0.1</code>). Sign in with your router's administrator username and password (often found on a sticker on the physical router).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 flex items-center justify-center text-xs text-accent-cobalt font-bold">3</span>
                Create the Port Forwarding Rule
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Locate the section named <strong>Port Forwarding</strong>, <strong>NAT</strong>, or <strong>Virtual Servers</strong> in your router settings. Add a new rule with the following parameters:
              </p>
              <WikiTable
                headers={['Field', 'Recommended Setting', 'Explanation']}
                rows={[
                  ['Rule / Service Name', 'Minecraft-Isopod', 'Label to identify the rule in your router.'],
                  ['Protocol', 'TCP / UDP (or Both)', 'Minecraft Java uses TCP; Bedrock/Geyser uses UDP.'],
                  ['External / WAN Port', '25565', 'The port players type when connecting.'],
                  ['Internal / LAN Port', '25565', 'The port Isopod bound to your Minecraft instance.'],
                  ['Internal IP Address', 'Your Local IPv4 (e.g. 192.168.1.150)', 'Your host computer\'s local network address.']
                ]}
              />
              <p className="text-text-secondary text-sm">Click <strong>Save</strong> or <strong>Apply Changes</strong>.</p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 flex items-center justify-center text-xs text-accent-cobalt font-bold">4</span>
                Configure Host Firewall
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Ensure your operating system's firewall allows incoming connections on port <code>25565</code>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text-secondary text-sm">
                <li>
                  <strong>Windows:</strong> Open <em>Windows Defender Firewall with Advanced Security</em> &rarr; <em>Inbound Rules</em> &rarr; <em>New Rule</em> &rarr; Port &rarr; TCP &rarr; Specific local ports: <code>25565</code> &rarr; Allow the connection.
                </li>
                <li>
                  <strong>Linux (UFW):</strong> Run:
                  <CodeBlock code="sudo ufw allow 25565/tcp" language="bash" />
                </li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#161616]">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 flex items-center justify-center text-xs text-accent-cobalt font-bold">5</span>
                Find Your Public IP & Share with Friends
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Check your public external IP address by visiting <a href="https://ifconfig.me" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:underline">ifconfig.me</a> or running:
              </p>
              <CodeBlock code="curl ifconfig.me" language="bash" />
              <p className="text-text-secondary text-sm mt-3">
                Friends can join in Minecraft by typing: <code className="text-accent-emerald font-bold">YOUR_PUBLIC_IP:25565</code> (or simply <code className="text-accent-emerald font-bold">YOUR_PUBLIC_IP</code> if using standard port 25565).
              </p>
            </div>
          </div>

          <Alert type="warning">
            <strong>Security Crucial:</strong> Only port forward Minecraft game ports (e.g. <code>25565</code>). <strong>DO NOT</strong> port forward port <code>8000</code> (the Isopod Web Management Dashboard) to the open internet without a secure reverse proxy and authentication!
          </Alert>
        </div>
      )
    },
    {
      id: 'tunneling-alternatives',
      title: 'Playit.gg, Tailscale & No-Port-Forward Options',
      category: 'Networking & Multiplayer',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-semibold mb-4">
            <Globe className="w-3.5 h-3.5" /> Modern Alternatives
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">No-Port-Forwarding Alternatives</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Port forwarding is not always possible. If you are behind Carrier-Grade NAT (CGNAT), on university/dorm Wi-Fi, or want to protect your home IP address from DDoS attacks, modern tunneling solutions allow seamless multiplayer hosting with zero router changes.
          </p>

          {/* Playit.gg Section */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Globe className="w-6 h-6 text-accent-emerald" /> 1. Playit.gg (Recommended for Public Server Hosting)
              </h2>
              <span className="px-2.5 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-xs font-bold">BEST FOR MINECRAFT</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              <strong>Playit.gg</strong> is a global reverse proxy designed specifically for game servers. It assigns you a clean public domain name (e.g. <code>my-server.craft.ply.gg</code>) and routes traffic over an encrypted tunnel. Your players do not need to install any software!
            </p>

            <h4 className="font-bold text-white text-sm mb-2">Setup Steps:</h4>
            <ol className="list-decimal pl-6 space-y-2 text-text-secondary text-sm mb-4">
              <li>Download the Playit.gg program from <a href="https://playit.gg/download" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:underline">playit.gg</a> or run their lightweight Docker container.</li>
              <li>Launch the application and follow the terminal link to claim your guest account.</li>
              <li>In the Playit.gg web dashboard, click <strong>Add Tunnel</strong> &rarr; select <strong>Minecraft Java</strong>.</li>
              <li>Set local port to <code>25565</code>.</li>
              <li>Playit will provide you with a permanent address (e.g. <code>your-name.joinmc.link</code>). Give this address to your players!</li>
            </ol>

            <div className="flex gap-2 flex-wrap text-xs text-text-secondary mt-2">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-white">✓ Hides Home IP</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-white">✓ Bypasses CGNAT</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-white">✓ No Client Downloads for Friends</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-white">✓ Free Tier Available</span>
            </div>
          </div>

          {/* Tailscale Section */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Lock className="w-6 h-6 text-accent-cobalt" /> 2. Tailscale (Best for Private Gaming with Friends)
              </h2>
              <span className="px-2.5 py-1 rounded-full bg-accent-cobalt/10 border border-accent-cobalt/20 text-accent-cobalt text-xs font-bold">SECURE MESH VPN</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              <strong>Tailscale</strong> creates a zero-config, encrypted WireGuard mesh network connecting your devices directly. It is completely immune to external port scanners.
            </p>

            <h4 className="font-bold text-white text-sm mb-2">Setup Steps:</h4>
            <ol className="list-decimal pl-6 space-y-2 text-text-secondary text-sm mb-4">
              <li>Install Tailscale on your server host from <a href="https://tailscale.com" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:underline">tailscale.com</a> and sign in.</li>
              <li>Have your trusted friends install Tailscale and sign into the same Tailnet (or use Tailscale Node Sharing).</li>
              <li>Note your server's Tailscale IPv4 address (starts with <code>100.x.y.z</code>).</li>
              <li>Friends connect in Minecraft by typing: <code className="text-accent-cobalt">100.x.y.z:25565</code>.</li>
            </ol>
          </div>

          {/* ngrok Section */}
          <div className="p-6 rounded-2xl border border-white/5 bg-[#161616] mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Radio className="w-6 h-6 text-yellow-400" /> 3. ngrok (Best for Quick Testing Sessions)
              </h2>
              <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold">QUICK TUNNEL</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              <strong>ngrok</strong> is a quick tunneling tool popular with developers. You can open a TCP tunnel to your Minecraft server with a single terminal command:
            </p>
            <CodeBlock code="ngrok tcp 25565" language="bash" />
            <p className="text-text-secondary text-sm mt-3">
              ngrok generates a forwarding address like <code>0.tcp.ngrok.io:19424</code>. Share this temporary address with friends for testing sessions.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">📊 Comparison of Multiplayer Hosting Methods</h2>
          <WikiTable
            headers={['Method', 'Ease of Setup', 'Friend Setup Required?', 'DDoS Protection', 'Static Domain', 'Best Use Case']}
            rows={[
              ['Traditional Port Forwarding', 'Moderate', 'No', 'None (Exposes Home IP)', 'Dynamic DNS needed', 'Full router admin access, maximum raw speed'],
              ['Playit.gg', 'Very Easy', 'No', 'Built-in Cloud Anycast', 'Yes (permanent domain)', 'Public SMP servers, hiding personal home IP'],
              ['Tailscale', 'Easy', 'Yes (Friends must install app)', 'End-to-End Encrypted', 'Yes (100.x IP)', 'Private servers for close friend groups'],
              ['ngrok', 'Very Easy', 'No', 'Proxied through ngrok', 'Changes on reboot (Free)', 'Quick testing or demonstrating builds']
            ]}
          />
        </div>
      )
    },

    // ==========================================
    // DEVELOPMENT
    // ==========================================
    {
      id: 'dev-setup',
      title: 'Development Environment Guide',
      category: 'Development',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/20 text-purple-400 text-xs font-semibold mb-4">
            <FileCode className="w-3.5 h-3.5" /> Contributor Guide
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Development Guide</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Want to contribute code, build features, or debug Isopod locally? Follow this guide to set up the development environment with hot-reloading enabled.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Method A: Docker Development Compose (Recommended)</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The repository includes a dedicated development Docker configuration that volume-mounts your local source tree into the container, enabling instant hot-reloading for both React and FastAPI:
          </p>
          <CodeBlock code={`# Clone repository\ngit clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod\n\n# Build dev container\ndocker build -t isopod:dev -f docker/Dockerfile.dev .\n\n# Launch dev compose stack\ndocker compose -f docker/docker-compose.dev.yml up -d`} language="bash" />

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Method B: Direct Local Setup (Fastest Iteration)</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Alternatively, run the FastAPI backend and Vite frontend processes directly on your host machine:
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/5 bg-[#161616]">
              <h4 className="font-bold text-accent-emerald text-sm mb-2">1. Start Python Backend</h4>
              <CodeBlock code={`cd backend\npython -m venv venv\nsource venv/bin/activate  # On Windows: .\\venv\\Scripts\\activate\npip install -r requirements.txt\nuvicorn main:app --reload --port 8000`} language="bash" />
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-[#161616]">
              <h4 className="font-bold text-accent-cobalt text-sm mb-2">2. Start React / Vite Frontend</h4>
              <CodeBlock code={`cd frontend\nnpm install\nnpm run dev`} language="bash" />
            </div>
          </div>

          <Alert type="tip">
            The frontend dev server proxies API calls on <code>/api</code> directly to <code>http://localhost:8000</code>.
          </Alert>

          <Alert type="note">
            To work on CurseForge modpacks, put <code>CURSEFORGE_API_KEY=&apos;your-key&apos;</code> in a <code>.env</code> file in the repository root (in single quotes, keys contain <code>$</code>). Both dev compose files pass it into the container, and the backend reads it when you run it directly.
          </Alert>
        </div>
      )
    },
    {
      id: 'project-standards',
      title: 'Project Organization & Standards',
      category: 'Development',
      content: () => (
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/20 text-purple-400 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" /> Architecture
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-6">Project Organization & Standards</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Guidelines for repository structure, coding hygiene, and architecture patterns within the Isopod project.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Directory Structure</h2>
          <WikiTable
            headers={['Directory', 'Purpose']}
            rows={[
              ['backend/', 'Python source code running FastAPI routes, Modrinth and CurseForge API clients, Docker SDK wrappers, and RCON manager.'],
              ['frontend/', 'React 19 + TypeScript + Tailwind CSS dashboard client files.'],
              ['docker/', 'Dockerfiles (production & dev) and development Compose stacks.'],
              ['documentation/', 'Project documentation and technical guides.'],
              ['servers/', 'Persistent host volume holding Minecraft server instances.'],
              ['assets/', 'Brand identity icons, logos, and UI graphics.']
            ]}
          />

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Engineering Standards</h2>
          <ul className="list-disc pl-6 space-y-3 text-text-secondary mb-6">
            <li><strong>Mod Provider Policy:</strong> Modrinth is the official mod repository integration, with full server-side dependency resolution. CurseForge is supported for modpacks only, through its official API with a user-supplied key. Send the key per request and only to <code>api.curseforge.com</code>.</li>
            <li><strong>Clean Root Directory:</strong> Do not commit temporary test files, local virtual environments, or scratch scripts to the root directory.</li>
            <li><strong>Strict Typing:</strong> All new frontend components must feature comprehensive TypeScript interfaces.</li>
            <li><strong>Docstring Integrity:</strong> Backend Python functions and route handlers must preserve clear docstrings detailing parameter schemas.</li>
          </ul>
        </div>
      )
    }
  ];

  const categories = [
    'Getting Started',
    'Using the Dashboard',
    'Networking & Multiplayer',
    'Development'
  ];

  const activeArticle = articles.find(a => a.id === activeArticleId) || articles[0];

  const filteredArticles = articles.filter(a => {
    const q = searchQuery.toLowerCase();
    return a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto pt-32 pb-24 px-6 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col md:flex-row gap-8 items-start relative">

        {/* Mobile Category / Article Selector */}
        <div className="w-full md:hidden mb-6">
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="w-full py-4 px-5 rounded-xl glass-card border border-white/10 flex items-center justify-between text-white font-bold bg-white/5 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent-emerald" />
              {activeArticle.title}
            </span>
            {mobileDrawerOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {mobileDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 rounded-xl border border-white/10 bg-[#242424] overflow-hidden shadow-2xl p-4 flex flex-col gap-4 text-left"
            >
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1D1D1D] border border-white/5 text-sm text-white focus:outline-none focus:border-accent-emerald transition-colors"
                />
              </div>

              {categories.map(cat => {
                const catArticles = filteredArticles.filter(a => a.category === cat);
                if (catArticles.length === 0) return null;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="text-xs uppercase tracking-wider font-bold text-text-secondary mb-1 px-2">{cat}</div>
                    {catArticles.map(art => (
                      <button
                        key={art.id}
                        onClick={() => {
                          setActiveArticleId(art.id);
                          setMobileDrawerOpen(false);
                        }}
                        className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-all cursor-pointer ${activeArticleId === art.id ? 'bg-accent-emerald/10 text-accent-emerald font-bold' : 'text-text-secondary hover:text-white'}`}
                      >
                        {art.title}
                      </button>
                    ))}
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-72 glass-card border border-white/5 p-5 sticky top-32 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar flex-shrink-0 text-left">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search docs..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#1D1D1D] border border-white/5 text-xs text-white focus:outline-none focus:border-accent-emerald transition-colors"
            />
          </div>

          <div className="space-y-6">
            {categories.map(cat => {
              const catArticles = filteredArticles.filter(a => a.category === cat);
              if (catArticles.length === 0) return null;
              const isExpanded = expandedCategories[cat] ?? true;
              return (
                <div key={cat} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-extrabold text-text-secondary mb-2 px-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{cat}</span>
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                  {isExpanded && (
                    <div className="space-y-0.5 pl-1 border-l border-white/5 flex flex-col">
                      {catArticles.map(art => (
                        <button
                          key={art.id}
                          onClick={() => setActiveArticleId(art.id)}
                          className={`text-left py-2 px-3 rounded-lg text-sm transition-all cursor-pointer ${activeArticleId === art.id ? 'bg-accent-emerald/10 text-accent-emerald border-l-2 border-accent-emerald rounded-l-none font-bold pl-4' : 'text-text-secondary hover:text-white hover:pl-4'}`}
                        >
                          {art.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content View */}
        <div className="flex-grow w-full md:max-w-3xl glass-card border border-white/5 p-8 md:p-10 bg-[#242424]/40 backdrop-blur-md">
          <motion.div
            key={activeArticleId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prose prose-invert max-w-none text-left"
          >
            {activeArticle.content()}
          </motion.div>
        </div>

      </div>
    </div>
  );
};
export default WikiPage;
