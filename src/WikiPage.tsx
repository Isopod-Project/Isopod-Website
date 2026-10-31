import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRoute } from './route'
import { Callout, CodeBlock, RouteLink, Table } from './ui'
import {
  Layers,
  Terminal,
  ShieldCheck,
  RefreshCw,
  Archive,
  Search,
  BookOpen,
  Info,
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

interface WikiSection {
  id: string
  title: string
}

// Every article follows the same layout: what it is, how to use or set it up, then troubleshooting.
// Section ids are linked from the dashboard's help buttons, so never rename or remove one.
interface WikiArticle {
  id: string
  title: string
  category: string
  summary: string
  sections: WikiSection[]
  content: () => React.ReactNode
}

const CATEGORIES = [
  'Getting Started',
  'Servers',
  'Mods & Players',
  'Worlds & Files',
  'Dashboard',
  'Networking & Multiplayer',
  'Development'
];

const matches = (text: string, q: string) => text.toLowerCase().includes(q);

export const WikiPage = () => {
  const route = useRoute();
  const activeArticleId = route.articleId ?? 'index';

  // Deep links (#/wiki/<article>/<section>) scroll to the section once the article renders;
  // plain article links (including in-article "#/wiki/..." anchors) start at the top
  useEffect(() => {
    if (!route.sectionId) {
      window.scrollTo({ top: 0 });
      return;
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(route.sectionId!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [route.articleId, route.sectionId]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !(prev[cat] ?? true)
    }));
  };

  const articles: WikiArticle[] = [
    // ==========================================
    // GETTING STARTED
    // ==========================================
    {
      id: 'index',
      title: 'All Articles',
      category: 'Getting Started',
      summary: "Every wiki article and section on one page.",
      sections: [],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <BookOpen className="h-3 w-3" /> Wiki Index
          </div>
          <h1>Isopod Wiki</h1>
          <p className="lead">
            Everything you need to install Isopod and run Minecraft servers with it. New here? Start with the <a href="#/wiki/getting-started">Quick Start Guide</a>. Looking for something specific? Use the search box, which also searches every section below.
          </p>
          {CATEGORIES.map(cat => (
            <section key={cat} aria-labelledby={`cat-${cat}`}>
              <h2 id={`cat-${cat}`}>{cat}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {articles.filter(a => a.category === cat && a.id !== 'index').map(a => (
                  <div key={a.id} className="card-compact">
                    <h3 className="mt-0 mb-1 text-base">
                      <RouteLink to={{ view: 'wiki', articleId: a.id }} className="font-bold text-fg-strong no-underline hover:text-accent-fg">{a.title}</RouteLink>
                    </h3>
                    <p className="mb-2 text-xs text-fg-muted">{a.summary}</p>
                    {a.sections.length > 0 && (
                      <ul className="mb-0 list-none space-y-1 pl-0 text-xs">
                        {a.sections.map(sec => (
                          <li key={sec.id}>
                            <a href={`#/wiki/${a.id}/${sec.id}`}>{sec.title}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )
    },
    {
      id: 'about',
      title: 'About Isopod',
      category: 'Getting Started',
      summary: "What Isopod is, what it can run, and the hardware it needs.",
      sections: [{ id: 'requirements', title: 'System Requirements' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Box className="h-3 w-3" /> Core Overview
          </div>
          <h1>About Isopod</h1>
          <p className="lead">
            <strong>Isopod</strong> is an open-source, container-native Minecraft server management platform. Designed for both casual server hosts and dedicated community administrators, Isopod delivers a sleek web dashboard inspired by modern desktop launchers like Prism Launcher, powered under the hood by Docker.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="card">
              <h2 className="text-xl">
                <Layers /> Prism-Inspired Instances
              </h2>
              <p>
                Manage isolated server environments effortlessly. Each server instance maintains its own dedicated directory, configuration, world files, and resource allocations without cross-contamination.
              </p>
            </div>
            <div className="card">
              <h2 className="text-xl">
                <RefreshCw /> Smart Mod Ops (Modrinth)
              </h2>
              <p>
                First-class integration with the Modrinth ecosystem. Discover, download, and update mods with automatic server-compatibility checks and dependency resolution.
              </p>
            </div>
            <div className="card">
              <h2 className="text-xl">
                <Terminal /> Real-Time Console & RCON
              </h2>
              <p>
                Inspect server logs in real time with auto-scrolling terminal feeds and dispatch administrative Minecraft commands instantly through secure interactive RCON.
              </p>
            </div>
            <div className="card">
              <h2 className="text-xl">
                <ShieldCheck /> Docker Container Isolation
              </h2>
              <p>
                Preserves host operating system integrity. All game servers run inside isolated, lightweight Docker containers with dedicated memory bounds and clean network mappings.
              </p>
            </div>
          </div>

          <h2 id="requirements">🖥️ System Requirements</h2>
          <p>
            Isopod runs on standard x86-64 and ARM64 servers and PCs. Below are recommended hardware specifications:
          </p>

          <Table
            headers={['Component', 'Minimum (1-2 Servers)', 'Recommended (Multiple / Modded)']}
            rows={[
              ['Operating System', 'Windows 10/11 (WSL2), Linux (Ubuntu/Debian/Fedora), macOS 12+, CasaOS', 'Ubuntu Server 22.04+ or Debian 12 (Dedicated Host)'],
              ['CPU', 'Dual-Core x86-64 or ARM64 (e.g. Raspberry Pi 4/5)', 'Quad-Core (or higher) with high single-thread clock speed'],
              ['System RAM', '4 GB total host RAM (allocate 2 GB to Minecraft)', '16 GB+ total host RAM (allocate 4-10 GB per modded instance)'],
              ['Storage', '10 GB free space (HDD or SSD)', '50 GB+ High-Speed NVMe SSD for fast chunk loading'],
              ['Docker Engine', 'v24.0 or newer', 'Latest Docker Engine + Docker Compose v2.20+']
            ]}
          />

          <Callout type="note">
            Isopod leverages the battle-tested <strong>itzg/minecraft-server</strong> image, offering out-of-the-box compatibility with Vanilla, Fabric, Forge, NeoForge, Quilt, Paper, Purpur, and Folia. It also runs Mojang&apos;s <strong>Bedrock Dedicated Server</strong> for phone, console, and Windows players, see <a href="#/wiki/bedrock">Bedrock Edition &amp; Cross-play</a>. You can also create a server straight from a Modrinth or CurseForge modpack.
          </Callout>
        </div>
      )
    },
    {
      id: 'install-docker',
      title: 'Installing Docker & Prerequisites',
      category: 'Getting Started',
      summary: "Install Docker and Docker Compose on Windows, Linux, macOS, or CasaOS.",
      sections: [{ id: 'windows', title: 'Windows' }, { id: 'linux', title: 'Linux' }, { id: 'macos-docker', title: 'macOS' }, { id: 'casaos-docker', title: 'CasaOS' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Monitor className="h-3 w-3" /> Setup Guide
          </div>
          <h1>Installing Docker & Prerequisites</h1>
          <p className="lead">
            Because Isopod manages Minecraft servers through container virtualization, having Docker and Docker Compose installed on your host system is required. Choose your operating system below:
          </p>

          {/* Windows Section */}
          <div className="card">
            <h2 id="windows">
              <Monitor /> Windows 10 & 11 (WSL 2 Backend)
            </h2>
            <p>
              Docker Desktop on Windows runs most efficiently using the Windows Subsystem for Linux (WSL 2).
            </p>

            <ol>
              <li>
                <strong>Enable Hardware Virtualization:</strong> Ensure CPU virtualization (VT-x for Intel, SVM for AMD) is enabled in your computer's BIOS/UEFI settings.
              </li>
              <li>
                <strong>Install WSL 2:</strong> Open <em>PowerShell</em> as Administrator and run:
                <CodeBlock code="wsl --install" language="powershell" />
                <em>Note: Restart your computer if prompted by Windows.</em>
              </li>
              <li>
                <strong>Download Docker Desktop:</strong> Download the official installer from <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer">docker.com/products/docker-desktop</a>.
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
          <div className="card">
            <h2 id="linux">
              <Terminal /> Linux (Ubuntu, Debian, Fedora, Arch)
            </h2>
            <p>
              On Linux servers, Docker Engine installs natively with maximum performance and minimal overhead.
            </p>

            <ol>
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
          <div className="card">
            <h2 id="macos-docker">
              <Cpu /> macOS (Apple Silicon & Intel)
            </h2>
            <p>
              Docker Desktop is fully supported on macOS for both Apple Silicon (M1/M2/M3/M4) and Intel Macs.
            </p>
            <ol>
              <li>Download Docker Desktop for Mac from <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer">docker.com</a> (choose Apple Silicon or Intel).</li>
              <li>Drag <strong>Docker.app</strong> into your Applications folder and launch it.</li>
              <li>In Docker Desktop Settings &rarr; <em>Resources</em>, allocate at least <strong>4 GB - 6 GB</strong> of memory to allow server instances adequate RAM.</li>
            </ol>
            <p>
              Isopod needs one extra setup step on a Mac. See <a href="#/wiki/getting-started/macos">Running on macOS</a>.
            </p>
          </div>

          {/* CasaOS Section */}
          <div className="card">
            <h2 id="casaos-docker">
              <Server /> CasaOS / Home NAS
            </h2>
            <p>
              If you run <strong>CasaOS</strong>, Docker Engine and Docker Compose are already pre-installed out of the box! You can proceed directly to the <a href="#/wiki/casaos-install">CasaOS Installation Guide</a>.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'getting-started',
      title: 'Quick Start Guide',
      category: 'Getting Started',
      summary: "Clone Isopod, start it with Docker Compose, and open the dashboard. Includes macOS and Windows steps.",
      sections: [{ id: 'install', title: 'Install & Launch' }, { id: 'macos', title: 'Running on macOS' }, { id: 'windows', title: 'Windows Start Script' }, { id: 'lifecycle', title: 'Lifecycle Commands' }, { id: 'login', title: 'Logging In' }, { id: 'security', title: 'Keep the Dashboard Private' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Zap className="h-3 w-3" /> Quick Start
          </div>
          <h1>Quick Start Guide</h1>
          <p className="lead">
            Get your Isopod manager up and running in just a few minutes. Follow these simple steps to deploy your local instance manager.
          </p>

          <h2 id="install">Install &amp; Launch</h2>
          <div className="steps">
            <div className="card">
              <h3>
                <span className="step-num">1</span>
                Clone the Isopod Repository
              </h3>
              <p>
                Download the latest Isopod repository onto your machine:
              </p>
              <CodeBlock code={`git clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod`} language="bash" />
            </div>

            <div className="card">
              <h3>
                <span className="step-num">2</span>
                Launch the Stack with Docker Compose
              </h3>
              <p>
                Start Isopod in the background. The first run builds the image, which takes a few minutes:
              </p>
              <CodeBlock code="docker compose -f isopod-compose.yml up -d --build" language="bash" />
              <p>
                On a Mac, do the one-time <a href="#/wiki/getting-started/macos">macOS setup</a> first. On Windows you can use the <a href="#/wiki/getting-started/windows">start script</a> instead.
              </p>
            </div>

            <div className="card">
              <h3>
                <span className="step-num">3</span>
                Open the Web Dashboard
              </h3>
              <p>
                Open your browser and navigate to the web panel:
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-inset p-4">
                <span className="font-mono text-base text-accent-fg">http://localhost:8000</span>
                <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Open Dashboard <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <h2 id="macos">🍎 Running on macOS</h2>
          <p>
            <code>isopod-compose.yml</code> stores data under <code>/DATA/AppData/isopod</code>, a CasaOS path that doesn&apos;t exist on a Mac, so starting it as-is fails with <code>mounts denied</code>. The overlay file <code>docker/isopod-compose.macos.yml</code> swaps in Mac-friendly locations. Create a <code>.env</code> file in the root of your clone once so Docker Compose always loads it:
          </p>
          <CodeBlock code={`echo "COMPOSE_FILE=isopod-compose.yml:docker/isopod-compose.macos.yml"> .env`} language="bash" />
          <p>
            From then on, run plain <code>docker compose</code> commands without any <code>-f</code> flags:
          </p>
          <CodeBlock code={`docker compose up -d --build   # start or update\ndocker compose down            # stop\ndocker compose logs -f         # watch logs`} language="bash" />
          <p>
            Servers and worlds are stored in <code>data/servers</code> inside your clone. Keep the clone under your home folder, or add its location in Docker Desktop under <strong>Settings &rarr; Resources &rarr; File sharing</strong>.
          </p>
          <Callout type="warning">
            Don&apos;t add <code>-f isopod-compose.yml</code> on a Mac. Any <code>-f</code> flag makes Docker Compose ignore the <code>.env</code> setting and skip the overlay, and the start fails with <code>mounts denied</code>.
          </Callout>

          <h2 id="windows">🪟 Windows Start Script</h2>
          <p>
            On Windows, this script runs the same launch command, waits for the dashboard to come up, and opens it in your default browser:
          </p>
          <CodeBlock code={`.\\scripts\\start-isopod.ps1`} language="powershell" />

          <h2 id="lifecycle">🔧 Lifecycle Management Commands</h2>
          <Table
            headers={['Action', 'Command', 'Description']}
            rows={[
              ['View Logs', <code key="logs">docker compose -f isopod-compose.yml logs -f</code>, 'Stream live backend and server container logs.'],
              ['Stop Service', <code key="stop">docker compose -f isopod-compose.yml down</code>, 'Gracefully shuts down Isopod dashboard containers.'],
              ['Restart Service', <code key="restart">docker compose -f isopod-compose.yml restart</code>, 'Quickly restarts the web backend.'],
              ['Update to Latest', <code key="update">git pull && docker compose -f isopod-compose.yml up -d --build</code>, 'Pulls latest git commits and rebuilds the container image.']
            ]}
          />

          <Callout type="note">
            Want to create servers from <strong>CurseForge</strong> modpacks? CurseForge needs a free API key. Add <code>CURSEFORGE_API_KEY='your-key'</code> to a <code>.env</code> file next to <code>isopod-compose.yml</code> and run the launch command again. See <a href="#/wiki/dashboard-guide/curseforge-modpacks">CurseForge Modpacks</a> for the full steps.
          </Callout>

          <Callout type="tip">
            Hosting Isopod on a dedicated home server or remote VPS? Access the dashboard using your server's local LAN address (e.g., <code>http://192.168.1.150:8000</code>).
          </Callout>

          <h2 id="login">🔐 Logging In</h2>
          <p>
            The first time you open the dashboard, Isopod asks you to create the admin account. Open it right after you start Isopod: until the account exists, anyone who can reach port <code>8000</code> can create it. After that, every visit needs a login, and sessions last 30 days.
          </p>
          <ul>
            <li>To change the password or log out, open <strong>Settings &rarr; Account</strong>. Changing the password logs out every other browser.</li>
            <li>Forgot the password? Delete <code>.isopod_auth.json</code> from your servers folder (<code>/DATA/AppData/isopod/servers</code> on CasaOS, <code>data/servers</code> on macOS) and reload the dashboard to set up the account again. Your servers aren&apos;t affected.</li>
          </ul>

          <h2 id="security">🔒 Keep the Dashboard Private</h2>
          <p>
            Isopod serves plain HTTP and controls Docker on its host, so anyone who gets into the dashboard effectively controls that machine. Keep port <code>8000</code> on your local network or behind a VPN such as <a href="#/wiki/tunneling-alternatives">Tailscale</a>, and only forward your Minecraft ports.
          </p>
        </div>
      )
    },
    {
      id: 'casaos-install',
      title: 'Installing on CasaOS',
      category: 'Getting Started',
      summary: "Install Isopod as an app on a CasaOS home server.",
      sections: [{ id: 'build', title: 'Build the Image' }, { id: 'install', title: 'Install via CasaOS' }, { id: 'settings', title: 'Settings Explained' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Server className="h-3 w-3" /> CasaOS Integration
          </div>
          <h1>Installing on CasaOS</h1>
          <p className="lead">
            CasaOS is an elegant home cloud system dashboard. This guide walks you through importing and deploying Isopod as a native dashboard web application.
          </p>

          <h2 id="build">1. Build the Docker Image</h2>
          <p>
            Connect to your CasaOS server via SSH or the built-in terminal, clone the repository, and build the Docker image locally:
          </p>
          <CodeBlock code={`git clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod\ndocker build -t isopod:latest .`} language="bash" />

          <h2 id="install">2. Install via CasaOS Dashboard</h2>
          <p>
            Follow these steps to import the container into CasaOS:
          </p>
          <ol>
            <li>Open your <strong>CasaOS Web Interface</strong> in your browser.</li>
            <li>Click on the <strong>App Store</strong> icon.</li>
            <li>Click <strong>Custom Install</strong> in the top-right corner.</li>
            <li>Click the <strong>Import</strong> icon (represented by the <code>[→]</code> symbol in the upper header).</li>
            <li>Paste the following Docker Compose specification and click <strong>Submit</strong>.</li>
            <li>For the icon URL, replace what CasaOS fills in with <code>https://raw.githubusercontent.com/Isopod-Project/Isopod-Website/main/public/Isopod_logo.png</code>, then click <strong>Install</strong>.</li>
          </ol>

          <CodeBlock code={`name: isopod

services:
  isopod:
    image: isopod:latest
    container_name: isopod
    cap_add:
      - SYS_ADMIN
      - NET_ADMIN
      - SYS_PTRACE
    security_opt:
      - seccomp:unconfined
      - apparmor:unconfined
    devices:
      - /dev/fuse
    cgroup: private
    restart: unless-stopped
    network_mode: bridge
    ports:
      - "8000:8000"
      - "25565-25585:25565-25585"
      # Bedrock servers and Java cross-play (Geyser) use UDP
      - "19132-19152:19132-19152/udp"
    volumes:
      - /DATA/AppData/isopod/servers:/servers
      - /DATA/AppData/isopod/docker:/var/lib/docker
    environment:
      - SERVERS_DIR=/servers
      # Optional: needed for CurseForge modpacks. Write every $ in the key as $$
      - CURSEFORGE_API_KEY=`} language="yaml" />

          <h2 id="settings">3. Settings Explained</h2>
          <p>
            If you fill out the CasaOS form by hand instead, use these values:
          </p>
          <Table
            headers={['Setting', 'Value', 'Why']}
            rows={[
              ['Privileged Mode', 'Disabled', 'Isopod runs its own Docker engine inside the container using the capabilities, security options, device, and private cgroup namespace in the compose file above. The CasaOS form may not show them all, so use the import when you can.'],
              ['Web UI Port', '8000 → 8000', 'The dashboard.'],
              ['Game Server Ports (TCP)', '25565-25585 → 25565-25585', 'Java servers. Allows up to 21 servers at once.'],
              ['Bedrock Ports (UDP)', '19132-19152 → 19132-19152', 'Bedrock servers and Java servers with Bedrock cross-play.'],
              ['/DATA/AppData/isopod/servers', '/servers', 'Your servers, worlds, mods, and backups.'],
              ['/DATA/AppData/isopod/docker', '/var/lib/docker', 'Downloaded server images, so they are not downloaded again after a restart.'],
              ['SERVERS_DIR', '/servers', 'Tells Isopod where the servers volume is mounted.'],
              ['CURSEFORGE_API_KEY', 'Optional', 'Needed for CurseForge modpacks.']
            ]}
          />

          <Callout type="note">
            <code>CURSEFORGE_API_KEY</code> is only needed for CurseForge modpacks. Get a free key at <a href="https://console.curseforge.com" target="_blank" rel="noopener noreferrer">console.curseforge.com</a>. Docker Compose treats <code>$</code> as the start of a variable, and CurseForge keys contain several, so write each <code>$</code> in the key as <code>$$</code> when you paste it into the YAML.
          </Callout>

          <Callout type="tip">
            Isopod no longer mounts the host&apos;s <code>/var/run/docker.sock</code>. Older installs that did showed every Minecraft server as a separate &quot;Legacy app&quot; on the CasaOS home screen. With this compose file, only Isopod itself appears.
          </Callout>

          <Callout type="warning">
            Installed Isopod before Bedrock support? Add <code>19132-19152:19132-19152/udp</code> to the ports, or Bedrock players can&apos;t connect.
          </Callout>
        </div>
      )
    },

    // ==========================================
    // USING THE DASHBOARD
    // ==========================================
    {
      id: 'dashboard-guide',
      title: 'Creating & Managing Instances',
      category: 'Servers',
      summary: "Create servers, organize them in groups, and use the side panel and right-click menu.",
      sections: [{ id: 'create-instance', title: 'Creating a New Instance' }, { id: 'manage-instances', title: 'Managing Existing Instances' }, { id: 'import-modpacks', title: 'Importing & Modpacks' }, { id: 'curseforge-modpacks', title: 'CurseForge Modpacks' }, { id: 'modpack-updates', title: 'Updating a Modrinth Modpack' }, { id: 'groups', title: 'Groups' }, { id: 'context-menu', title: 'Right-Click Menu' }, { id: 'saving', title: 'Saving in the Edit Window' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <PlusCircle className="h-3 w-3" /> Instance Manager
          </div>
          <h1>Creating & Managing Instances</h1>
          <p className="lead">
            Isopod makes provisioning new Minecraft servers fast and intuitive. Every server is an independent instance with dedicated storage, custom RAM limits, and unique port bindings.
          </p>

          <h2 id="create-instance">
            <PlusCircle /> 1. Creating a New Instance
          </h2>
          <ol>
            <li>Click <strong>Add Instance</strong> in the dashboard header.</li>
            <li>
              <strong>Instance Name:</strong> Provide a human-friendly label (e.g. <code>Fabric SMP 1.20.4</code> or <code>Paper Lobby</code>).
            </li>
            <li>
              <strong>Minecraft Version:</strong> Select any supported Minecraft version from the dropdown menu (from legacy 1.7.10 up to the latest releases and snapshots).
            </li>
            <li>
              <strong>Server Loader:</strong> Choose the engine that best suits your server's purpose:
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="card-compact">
                  <div>Vanilla</div>
                  <div className="text-xs text-fg-muted">Official Mojang server software. Pure Minecraft experience.</div>
                </div>
                <div className="card-compact">
                  <div>Fabric</div>
                  <div className="text-xs text-fg-muted">Lightweight, modern modding loader. Highly recommended for performance mods.</div>
                </div>
                <div className="card-compact">
                  <div>Paper / Purpur</div>
                  <div className="text-xs text-fg-muted">High-performance server forks optimized for Spigot/Bukkit plugins.</div>
                </div>
                <div className="card-compact">
                  <div>Forge / NeoForge</div>
                  <div className="text-xs text-fg-muted">Traditional heavy modding platforms for expansive content modpacks.</div>
                </div>
                <div className="card-compact">
                  <div>Quilt</div>
                  <div className="text-xs text-fg-muted">Modern community modding fork with broad Fabric compatibility.</div>
                </div>
                <div className="card-compact">
                  <div>Folia</div>
                  <div className="text-xs text-fg-muted">Multi-threaded regional server engine for massive multi-player communities.</div>
                </div>
                <div className="card-compact">
                  <div>Bedrock</div>
                  <div className="text-xs text-fg-muted">Mojang&apos;s Bedrock Dedicated Server for phone, console, and Windows players. See <a href="#/wiki/bedrock">Bedrock Edition</a>.</div>
                </div>
              </div>
              <p className="mt-2 text-xs text-fg-muted">See <a href="#/wiki/versions-loaders/loaders">Choosing a Server Type</a> for how they differ.</p>
            </li>
            <li className="mt-2">
              <strong>Memory Slider:</strong> Allocate how much host RAM should be dedicated to this server (e.g. 2 GB, 4 GB, 8 GB).
            </li>
            <li>
              <strong>Server Port:</strong> Default is <code>25565</code>. If you are creating a second server, assign an available port like <code>25566</code>. Isopod publishes ports <code>25565</code>-<code>25585</code>, so stay in that range.
            </li>
            <li>
              <strong>Group (optional):</strong> File the new server under an existing group, or pick <strong>+ New Group...</strong> to make one. See <a href="#/wiki/dashboard-guide/groups">Groups</a>.
            </li>
            <li>Click <strong>Create</strong>. Isopod writes the container configuration, registers the instance, and selects it so you can start it right away. If creation fails (for example, the port is taken), the error says why.</li>
          </ol>

          <h2 id="manage-instances">
            <Layers /> 2. Managing Existing Instances
          </h2>
          <p>
            On the main dashboard, each instance tile provides real-time information:
          </p>
          <ul>
            <li><strong>Status Indicator:</strong> Shows whether the server is <span className="font-bold text-fg-muted">Stopped</span>, <span className="font-bold text-warn">Starting</span>, <span className="font-bold text-success">Online</span>, or <span className="font-bold text-accent-fg">Sleeping</span> (see <a href="#/wiki/server-tuning/sleep">Sleep When Empty</a>). A red badge means it <a href="#/wiki/crashes">crashed</a>.</li>
            <li><strong>Players &amp; RAM:</strong> Running servers show how many players are online and how much RAM they use.</li>
            <li><strong>Isolated Directory:</strong> All server files reside safely in <code>servers/&lt;instance_name&gt;/</code> on your host.</li>
          </ul>
          <p>
            Click a tile to select it. The side panel on the right then shows:
          </p>
          <ul>
            <li><strong>Address:</strong> The address players join with. Click it to copy it. Servers with Bedrock players also show a <strong>Bedrock</strong> address (UDP).</li>
            <li><strong>Start / Restart / Stop / Force Kill:</strong> The same controls appear in the Edit window&apos;s footer and the right-click menu. Stop saves the world first, and Restart does a Stop and then a Start. Force Kill asks for confirmation, then powers the server off at once; only use it when the server is stuck. While a server starts, a progress bar shows how far along it is when the server reports it. Otherwise, and while it stops or restarts, the bar slides with no percentage.</li>
            <li><strong>Update to &lt;version&gt;:</strong> Appears when a newer Minecraft release is out. See <a href="#/wiki/versions-loaders/update-world">Update World Button</a>.</li>
            <li><strong>Version</strong> and <strong>Last Activity</strong>.</li>
            <li><strong>CPU and RAM</strong> while the server runs. See <a href="#/wiki/monitoring/resource-usage">Resource Usage</a>.</li>
            <li><strong>Players:</strong> Who is online, with quick actions. See <a href="#/wiki/players-access/online-players">Online Players</a>.</li>
            <li><strong>Crash</strong> and <strong>snapshot</strong> cards when something needs your attention. See <a href="#/wiki/crashes">Crashes &amp; Auto-Restart</a> and <a href="#/wiki/backups/snapshots">Pre-update Snapshots</a>.</li>
          </ul>
          <h2 id="import-modpacks">
            <Box /> 3. Importing &amp; Modpacks
          </h2>
          <p>
            The <strong>New Instance</strong> window has four server types in its left sidebar:
          </p>
          <ul>
            <li><strong>Custom:</strong> Build a server from scratch by choosing a Minecraft version and loader.</li>
            <li><strong>Import:</strong> Upload an Isopod server export (<code>.zip</code>) or a Minecraft singleplayer world (a <code>.zip</code> containing <code>level.dat</code>). Isopod extracts it into a new instance and shows upload and extraction progress.</li>
            <li><strong>Modrinth:</strong> Search Modrinth modpacks and pick a pack version. Keep <em>Show only server-side compatible modpacks</em> enabled to hide packs that can&apos;t run on a dedicated server; the results update as soon as you change a filter. Client-only mods inside a pack are excluded automatically, and the pack&apos;s mods are listed in the Mods tab before the server&apos;s first start.</li>
            <li><strong>CurseForge:</strong> Search CurseForge modpacks and pick a pack version. This needs a free API key, see <a href="#/wiki/dashboard-guide/curseforge-modpacks">CurseForge Modpacks</a> below.</li>
          </ul>
          <p>
            Click the icon next to the instance name to choose a custom server icon. Modpack instances use the pack&apos;s icon by default.
          </p>

          <h2 id="curseforge-modpacks">
            <Box /> 4. CurseForge Modpacks
          </h2>
          <p>
            Isopod can create a server from any CurseForge modpack. CurseForge only serves its API to apps that have a key, so you set one up once.
          </p>
          <ol>
            <li>
              <strong>Get a key.</strong> Sign in at <a href="https://console.curseforge.com" target="_blank" rel="noopener noreferrer">console.curseforge.com</a> and create an API key. It is free.
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
          <p>
            The first start downloads the pack and all of its mods, so it can take several minutes. Follow it in the <strong>Logs</strong> tab. The Minecraft version, loader, and Java version all come from the pack, and well-known client-only mods (shaders, minimaps, menu mods, and similar) are skipped so they do not crash the server.
          </p>
          <Table
            headers={['Problem', 'What it means']}
            rows={[
              ['"Couldn\'t load modpacks" with CURSEFORGE_API_KEY is not set', 'The key never reached Isopod. Check the .env file and restart Isopod.'],
              ['"Couldn\'t load modpacks" with a 403', 'CurseForge rejected the key. Check that you copied all of it, or create a new one.'],
              ['The server stops while installing the pack', 'Some pack authors block downloads outside the CurseForge app, so Isopod cannot install them. The server log names the mod that failed.']
            ]}
          />
          <Callout type="note">
            CurseForge support covers <strong>modpacks</strong>. The Mods and Resource Packs tabs still search Modrinth only.
          </Callout>
          <Callout type="warning">
            Keep your key private. Isopod only sends it to <code>api.curseforge.com</code> and passes it to the server container as an environment variable. It is not written to the instance&apos;s <code>docker-compose.yml</code>.
          </Callout>

          <h2 id="modpack-updates">
            <Box /> 5. Updating a Modrinth Modpack
          </h2>
          <p>
            Servers created from a Modrinth modpack get a <strong>Modpack</strong> tab in the Edit window. It shows the pack, the version the server is on, and every version with its changelog.
          </p>
          <p>
            Isopod checks Modrinth about once an hour. When a newer version is out, the server&apos;s tile shows <strong>Update Available</strong>, and the side panel shows a <strong>View Update</strong> button that opens the tab. <strong>Check Now</strong> in the tab checks right away.
          </p>
          <ol>
            <li>Click <strong>Update to Latest</strong>, or <strong>Switch</strong> next to any version in the list. You can go to an older version the same way.</li>
            <li>Read the confirmation. It warns you if the Minecraft version changes.</li>
            <li>Keep <strong>Create backup before updating</strong> ticked. It saves the worlds, the <code>mods</code>, <code>config</code>, and <code>plugins</code> folders, <code>server.properties</code>, and the Docker settings, so you can roll back with <strong>Restore previous state</strong> in the side panel or from the <strong>Backups</strong> tab.</li>
            <li>If the server is running, keep <strong>Restart the server now</strong> ticked to install the new version straight away. Otherwise it installs the next time the server starts.</li>
          </ol>
          <p>
            Isopod sets the pack version, the Minecraft version, and the Java version for you. Client-only mods in the new version are excluded, and mods you removed or disabled stay that way.
          </p>
          <ul>
            <li>A pack on a release version is only offered newer releases, and a pack on a beta isn&apos;t offered alphas. You can still pick those versions from the list.</li>
            <li>Worlds can&apos;t be moved to an older Minecraft version safely. To undo an update that changed the Minecraft version, restore the backup.</li>
            <li>CurseForge modpacks don&apos;t have this tab yet.</li>
            <li>If <code>MODRINTH_MODPACK</code> holds a URL or a file path instead of a project ID, the tab says it can&apos;t check that pack.</li>
          </ul>

          <h2 id="groups">
            <Layers /> 6. Groups
          </h2>
          <p>
            Groups sort your servers into labelled sections on the dashboard, for example &quot;Survival&quot; and &quot;Testing&quot;.
          </p>
          <ul>
            <li><strong>New server:</strong> Pick a group in the Add Instance window, or <strong>+ New Group...</strong> to make one. An imported Isopod export keeps its old group unless you pick another.</li>
            <li><strong>Existing server:</strong> Right-click it and choose <strong>Change Group...</strong>.</li>
            <li><strong>Rename / Dissolve:</strong> Use the buttons on a group&apos;s header. Dissolving a group moves its servers back out; it doesn&apos;t delete them.</li>
          </ul>

          <h2 id="context-menu">
            <Sliders /> 7. Right-Click Menu
          </h2>
          <p>
            Right-click a server tile for:
          </p>
          <Table
            headers={['Action', 'What it does']}
            rows={[
              ['Rename / Change Icon', 'Change the name or picture shown on the dashboard.'],
              ['Start / Restart / Stop / Force Kill', 'Power controls. Stop and Restart save the world; Force Kill does not.'],
              ['Edit...', 'Open the Edit window with all of the server\'s tabs.'],
              ['Change Group...', 'Move the server to another group.'],
              ['Folder', 'Open the server\'s files in the File Manager.'],
              ['Export...', 'Download the whole server as a .zip, which you can import again later. Backups are left out.'],
              ['Duplicate', 'Make a copy of the server with its own folder.'],
              ['Delete', 'Remove the server and its files after you confirm.']
            ]}
          />
          <p>
            If an action fails, Isopod shows the reason instead of failing silently. A Restart that can&apos;t start the server again says so.
          </p>

          <h2 id="saving">
            <Settings /> 8. Saving in the Edit Window
          </h2>
          <ul>
            <li><strong>Mods and Backups tabs:</strong> Changes apply right away. There is nothing to save.</li>
            <li><strong>User Management:</strong> Player changes and the Whitelist switch are saved with <strong>Save User Configuration</strong>; <strong>Discard Changes</strong> undoes them.</li>
            <li><strong>Everything else</strong> (version, loader, world, configuration) waits for <strong>Save Changes</strong>. The sidebar shows <strong>Unsaved Changes</strong> while something is waiting.</li>
            <li>Closing the window with anything unsaved asks <strong>Discard N unsaved changes?</strong> Choose <strong>Keep editing</strong> to go back and save.</li>
          </ul>
          <Callout type="tip">
            Press <strong>Esc</strong> or click the dimmed area outside a window to close it. Unsaved changes are still asked about first. On the Files and Mods tabs, <strong>Esc</strong> first cancels a rename or clears the selection; press it again to close. The Add Instance window closes with <strong>Esc</strong> but not with a click outside, so a stray click doesn&apos;t lose what you entered.
          </Callout>
        </div>
      )
    },
    {
      id: 'mod-management',
      title: 'Mods & Resource Packs (Modrinth)',
      category: 'Mods & Players',
      summary: "Install mods and plugins from Modrinth, manage several at once, and serve resource packs.",
      sections: [{ id: 'installing-mods', title: 'Installing Mods' }, { id: 'managing-mods', title: 'Managing Installed Mods' }, { id: 'multi-select', title: 'Selecting Multiple Mods' }, { id: 'modpack-mods', title: 'Modpack Mods' }, { id: 'plugins', title: 'Plugins' }, { id: 'resource-packs', title: 'Server Resource Packs' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <RefreshCw className="h-3 w-3" /> Mod Operations
          </div>
          <h1>Mods & Resource Packs</h1>
          <p className="lead">
            Isopod connects directly to the <strong>Modrinth</strong> platform, giving you instant access to thousands of open-source Minecraft mods, plugins, and server optimization tools without leaving your browser.
          </p>

          <h2 id="installing-mods">
            <Zap /> Intelligent Mod Installation
          </h2>
          <p>
            Unlike generic file uploaders, Isopod's Mod Manager actively prevents server crashes through three smart safety mechanisms:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="card">
              <span className="badge badge-success">SERVER-SIDE FILTER</span>
              <h3 className="text-sm">No Client Mods</h3>
              <p className="text-xs text-fg-muted">
                Automatically hides client-only mods (HUDs, zoom, shaders, mini-maps) that cause dedicated servers to crash upon startup.
              </p>
            </div>
            <div className="card">
              <span className="badge badge-accent">DEP RESOLVER</span>
              <h3 className="text-sm">Auto Dependencies</h3>
              <p className="text-xs text-fg-muted">
                When installing a mod (such as <em>Lithium</em> or <em>FerriteCore</em>), Isopod checks Modrinth for required libraries (e.g. <em>Fabric API</em>) and installs them automatically.
              </p>
            </div>
            <div className="card">
              <span className="badge badge-warn">LOADER GUARD</span>
              <h3 className="text-sm">Compatibility Checks</h3>
              <p className="text-xs text-fg-muted">
                Blocks incompatible downloads, such as attempting to install a Forge mod on a Fabric instance or a mismatched game version.
              </p>
            </div>
          </div>

          <p>
            Click <strong>Add</strong> (or <strong>Add with Deps</strong> to include required libraries) next to a search result. The mod downloads straight away and shows <strong>Installing...</strong> until it&apos;s done. Every change in the Mods tab applies immediately; there is nothing to save. Isopod takes a <a href="#/wiki/backups/snapshots">snapshot</a> first, so you can roll back if a mod breaks the server.
          </p>

          <h2 id="managing-mods">📦 Managing Installed Mods</h2>
          <ul>
            <li><strong>Enable / Disable:</strong> Double-click a mod, or select it and use the buttons, to turn it off without deleting its configuration files (Isopod renames <code>.jar</code> to <code>.jar.disabled</code>).</li>
            <li><strong>Remove:</strong> Delete unwanted mods cleanly from the <code>mods/</code> directory.</li>
            <li><strong>Direct Jar Upload:</strong> Have a custom private mod? Upload your <code>.jar</code> in the Mods tab, or drop it into the instance&apos;s <code>mods/</code> folder with the File Manager.</li>
            <li><strong>Check for Updates:</strong> Downloads any configured mods that are missing from disk and reports which ones it fetched or couldn&apos;t. It doesn&apos;t update mods that are already installed yet.</li>
          </ul>

          <h2 id="multi-select">🧩 Selecting Multiple Mods</h2>
          <Table
            headers={['Do this', 'To']}
            rows={[
              ['Click', 'Select only that mod.'],
              ['Ctrl + Click (Cmd + Click on Mac)', 'Add or remove one mod from the selection.'],
              ['Shift + Click', 'Select every mod between the last one you clicked and this one.'],
              ['Ctrl + A (Cmd + A)', 'Select every mod that matches the search box.'],
              ['Esc, or click empty space', 'Clear the selection.'],
              ['Delete', 'Remove the selected mods.']
            ]}
          />
          <p>
            With several mods selected, <strong>Enable</strong>, <strong>Disable</strong>, and <strong>Remove</strong> show how many mods they will change, for example <strong>Disable (3)</strong>. Remove asks once for all of them. Mods hidden by the search box are left out of the selection, so a batch action never changes a mod you can&apos;t see.
          </p>

          <h2 id="modpack-mods">🗂️ Modpack Mods</h2>
          <p>
            On a server made from a Modrinth modpack, the Mods tab lists the pack&apos;s mods right after you create it, marked <strong>Installs on start</strong>. You can disable or remove them before the first start, and they won&apos;t be installed. Once the server has started, the list shows the real files on disk.
          </p>

          <h2 id="plugins">🔌 Plugins</h2>
          <p>
            On Paper, Purpur, and Folia servers the Mods tab manages <strong>plugins</strong> in the <code>plugins</code> folder instead. Its header reads <strong>Plugins</strong>, and <strong>Download Plugins</strong> searches Modrinth for plugins that run on that server type. On Folia, only plugins marked Folia-compatible appear. See <a href="#/wiki/versions-loaders/loaders">Choosing a Server Type</a>.
          </p>

          <h2 id="resource-packs">
            <Layers /> Server Resource Packs
          </h2>
          <p>
            The <strong>Resource Packs</strong> tab searches Modrinth for texture and asset packs. Every pack you select is bundled together and served to players automatically when they join.
          </p>
          <ul>
            <li><strong>Requirement Policy:</strong> <em>Suggested</em> lets players decline the pack; <em>Required</em> makes accepting it a condition of joining.</li>
            <li><strong>Bundle Install Message:</strong> The prompt players see when the server offers the pack.</li>
          </ul>

          <Callout type="note">
            The Mods and Resource Packs tabs search Modrinth only. You can still create a server from a <strong>CurseForge</strong> modpack when you add an instance, see <a href="#/wiki/dashboard-guide/curseforge-modpacks">CurseForge Modpacks</a>. Bedrock servers have no Mods or Resource Packs tab, see <a href="#/wiki/bedrock/bedrock-limits">Bedrock limitations</a>.
          </Callout>

          <Callout type="tip">
            Running a Fabric server? Always install <strong>Fabric API</strong> first, as nearly all Fabric content and performance mods depend on it.
          </Callout>
        </div>
      )
    },
    {
      id: 'server-tuning',
      title: 'Server Configuration & Tuning',
      category: 'Servers',
      summary: "The Configuration tab: auto-restart, sleep when empty, memory, and raw environment variables.",
      sections: [{ id: 'restart-policy', title: 'Restart Automatically' }, { id: 'sleep', title: 'Sleep When Empty' }, { id: 'memory', title: 'Memory' }, { id: 'server-settings', title: 'server.properties' }, { id: 'raw-environment', title: 'Raw Environment Variables' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Sliders className="h-3 w-3" /> Performance & Config
          </div>
          <h1>Server Configuration & Tuning</h1>
          <p className="lead">
            The <strong>Configuration</strong> tab of the Edit window controls how a server runs: whether it restarts on its own, whether it sleeps when nobody is playing, and the raw settings passed to its container. Changes here wait for <strong>Save Changes</strong> and take effect the next time the server starts.
          </p>

          <h2 id="restart-policy">
            <RefreshCw /> Restart Automatically
          </h2>
          <Table
            headers={['Option', 'The server restarts']}
            rows={[
              ['Always (also after a reboot)', 'After a crash, after a clean /stop from inside the game, and when your computer or Docker restarts. This is the default.'],
              ['Only after a crash', 'Only when it crashes.'],
              ['Never', 'Never. It stays stopped until you start it.']
            ]}
          />
          <p>
            Isopod stops a server that crashes 3 times within 2 minutes, whatever this is set to. See <a href="#/wiki/crashes">Crashes &amp; Auto-Restart</a>.
          </p>

          <h2 id="sleep">
            <Zap /> Sleep When Empty
          </h2>
          <p>
            A Java server can pause itself when nobody is playing, so it stops using CPU. Turn on <strong>Sleep when empty</strong> and pick how many minutes it waits (10 by default). The timer starts when the last player leaves, or at startup if nobody joins.
          </p>
          <ul>
            <li>Before pausing, the server saves the world. While it&apos;s paused, its tile shows a blue dot and the side panel says <strong>Sleeping</strong>.</li>
            <li>To wake it, connect to it in Minecraft, or just refresh your server list. It resumes within a few seconds and the join goes through as normal. If nobody joins after a server-list refresh, it goes back to sleep after about 2 minutes.</li>
            <li>Stopping a sleeping server from the dashboard wakes it first, so it shuts down cleanly.</li>
            <li>A scheduled backup wakes it briefly too.</li>
          </ul>
          <Callout type="note">
            A paused server still holds its RAM, though your computer can move it out to disk. Stop the server if you need the memory back. Sleep isn&apos;t available for Bedrock servers.
          </Callout>

          <h2 id="memory">
            <Cpu /> Memory
          </h2>
          <p>
            A new server gets the <strong>Default RAM Allocation</strong> from <a href="#/wiki/app-settings/defaults">Settings</a> (1 GB unless you changed it). To change it for one server, edit <code>MEMORY</code> in the raw environment variables below, for example <code>4G</code>.
          </p>
          <ul>
            <li><strong>Leave Host Headroom:</strong> Never allocate all of your computer&apos;s RAM to Minecraft. Leave at least 2 GB free for the operating system and Docker.</li>
            <li><strong>Modpack Guidelines:</strong> Light vanilla/plugins: 2 - 4 GB. Heavy Fabric/Forge modpacks: 6 - 10 GB. Big Modrinth and CurseForge packs with hundreds of mods belong at the top of that range.</li>
            <li><code>MEMORY</code> sets the Java heap. The server uses 10-30% more than that in total, which is normal. See <a href="#/wiki/monitoring/resource-usage">Resource Usage</a>.</li>
          </ul>

          <h2 id="server-settings">
            <Settings /> server.properties
          </h2>
          <p>
            Seed, level type, difficulty, game mode, and structures have their own controls in the <a href="#/wiki/world-settings">World tab</a>. For everything else, such as the MOTD, max players, or view distance, open <code>server.properties</code> in the <a href="#/wiki/file-manager">Files tab</a>, edit it, and restart the server. Common settings:
          </p>
          <Table
            headers={['Property', 'Description', 'Suggested Value']}
            rows={[
              ['motd', 'The message shown in players\' multiplayer server list.', 'Your server\'s name'],
              ['max-players', 'Maximum players online at once.', '10 - 50 (based on allocated RAM)'],
              ['view-distance', 'Number of chunks sent to each player. Affects server CPU heavily.', '8 - 12'],
              ['simulation-distance', 'Radius of chunks where entities, crops, and redstone tick.', '6 - 8'],
              ['online-mode', 'Checks players with Mojang\'s login servers.', 'true (keep it on)'],
              ['allow-flight', 'Stops players from being kicked for flying.', 'true if mods add flight']
            ]}
          />
          <Callout type="tip">
            Lowering <code>simulation-distance</code> from 10 to 6 can noticeably improve your server&apos;s TPS (ticks per second) with little difference to gameplay.
          </Callout>

          <h2 id="raw-environment">
            <FileCode /> Advanced: Raw Environment Variables
          </h2>
          <p>
            The <strong>Advanced: RAW Environment</strong> section lists every environment variable passed to the server container (such as <code>MEMORY</code>, <code>TYPE</code>, and <code>VERSION</code>) and lets you edit their values directly. They are the settings of the <a href="https://docker-minecraft-server.readthedocs.io" target="_blank" rel="noopener noreferrer">itzg/minecraft-server</a> image, whose documentation lists them all.
          </p>
          <Callout type="warning">
            Invalid values can stop the container from starting. Prefer the dedicated Versions, Loaders, and Mods tabs, and only edit raw variables when you know what they do.
          </Callout>
        </div>
      )
    },
    {
      id: 'console-rcon',
      title: 'Live Console & RCON',
      category: 'Servers',
      summary: "Read live logs, send commands, and start, stop, or kill a server.",
      sections: [{ id: 'console', title: 'Sending Commands' }, { id: 'log-controls', title: 'Log Viewer Controls' }, { id: 'power', title: 'Start, Restart, Stop & Force Kill' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Terminal className="h-3 w-3" /> Live Operations
          </div>
          <h1>Live Console & RCON</h1>
          <p className="lead">
            Monitor live server events, catch error traces, and execute administrative in-game commands in real time directly from the Isopod console tab.
          </p>

          <h2 id="console">
            <Terminal /> Interactive RCON Console
          </h2>
          <p>
            The <strong>Minecraft Log</strong> tab features an integrated RCON terminal. Type any standard Minecraft command into the input bar and press Enter. Press the <strong>Up</strong> and <strong>Down</strong> arrow keys to bring back commands you ran before.
          </p>

          <Table
            headers={['Command', 'Syntax Example', 'Description']}
            rows={[
              ['Grant Operator', <code key="op">op PlayerName</code>, 'Gives a player administrator permissions in-game.'],
              ['Whitelist Player', <code key="wl">whitelist add PlayerName</code>, 'Adds a player to the server\'s access whitelist.'],
              ['Broadcast Message', <code key="say">say Server restarting in 5 minutes!</code>, 'Sends a global chat announcement to all players.'],
              ['Teleport Player', <code key="tp">tp Steve Alex</code>, 'Teleports Steve to Alex\'s coordinates.'],
              ['Force World Save', <code key="save">save-all</code>, 'Flushes all player chunks and inventories immediately to disk.']
            ]}
          />
          <p>
            If a command fails, it stays in the input box so you can fix and retry it, and the console adds an <code>[Isopod] Command failed</code> line saying why.
          </p>

          <h2 id="log-controls">
            <Search /> Log Viewer Controls
          </h2>
          <ul>
            <li><strong>Simplified / Verbose:</strong> Simplified hides background noise and keeps chat, joins, errors, and the commands you ran with their replies. Verbose shows every line.</li>
            <li><strong>Keep updating:</strong> Stream new log lines live. Turn it off to freeze the view while you read.</li>
            <li><strong>Wrap lines / Color lines:</strong> Toggle line wrapping and color highlighting for errors, warnings, commands, and player events.</li>
            <li><strong>Copy / Clear / Refresh:</strong> Copy the whole log to your clipboard, clear the view, or re-fetch logs from the server.</li>
            <li><strong>Search &amp; Find:</strong> Highlight matches and jump between them. <strong>Bottom</strong> scrolls back to the newest line.</li>
            <li><strong>Crash Report:</strong> Opens the newest crash report with its root cause. See <a href="#/wiki/crashes/crash-report">Crash Report</a>.</li>
          </ul>

          <h2 id="power">
            <Play /> Server Power Lifecycle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="card">
              <h3 className="text-sm">
                <Play /> Start
              </h3>
              <p className="text-xs text-fg-muted">
                Boots the container, checks environment variables, generates server jars, and begins world loading.
              </p>
            </div>
            <div className="card">
              <h3 className="text-sm">
                <RefreshCw /> Restart
              </h3>
              <p className="text-xs text-fg-muted">
                Does a Stop and then a Start, so the world saves first and the server picks up any changed settings.
              </p>
            </div>
            <div className="card">
              <h3 className="text-sm">
                <RefreshCw /> Stop
              </h3>
              <p className="text-xs text-fg-muted">
                Dispatches a <code>stop</code> command via RCON, allowing chunks to save cleanly to prevent world corruption.
              </p>
            </div>
            <div className="card">
              <h3 className="text-sm">
                <AlertTriangle /> Force Kill
              </h3>
              <p className="text-xs text-fg-muted">
                Immediately terminates the container if a rogue mod causes the server process to hang or freeze indefinitely. Isopod asks you to confirm first, and a kill never counts as a crash.
              </p>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'versions-loaders',
      title: 'Versions & Server Types',
      category: 'Servers',
      summary: "Change a server's Minecraft version and server type: Fabric, Forge, NeoForge, Quilt, Paper, Purpur, or Folia.",
      sections: [{ id: 'versions', title: 'Changing the Minecraft Version' }, { id: 'update-world', title: 'Update World Button' }, { id: 'loaders', title: 'Choosing a Server Type' }, { id: 'folia', title: 'Folia' }, { id: 'cross-play', title: 'Bedrock Cross-play' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Box className="h-3 w-3" /> Server Software
          </div>
          <h1>Versions &amp; Server Types</h1>
          <p className="lead">
            Change the Minecraft version an instance runs and the server type (loader) that runs its mods or plugins, from the <strong>Versions</strong> and <strong>Loaders</strong> tabs of the Edit window. Both are saved with <strong>Save Changes</strong>, and Isopod takes a <a href="#/wiki/backups/snapshots">snapshot</a> first so you can roll back.
          </p>

          <h2 id="versions">
            <Box /> Changing the Minecraft Version
          </h2>
          <p>
            The <strong>Versions</strong> tab lists the most recent releases from Mojang&apos;s official version manifest. Picking a new version opens a confirmation where you can:
          </p>
          <ul>
            <li><strong>Automatically update the mod loader</strong> to a build that supports the new version.</li>
            <li><strong>Verify &amp; disable incompatible mods</strong>, so only mods with a matching release stay enabled.</li>
          </ul>
          <Callout type="warning">
            Worlds can be upgraded to newer versions but not safely downgraded. Isopod&apos;s automatic snapshot lets you undo a version change, but a full <a href="#/wiki/backups">backup</a> never hurts.
          </Callout>

          <h2 id="update-world">
            <RefreshCw /> Update World Button
          </h2>
          <p>
            When a newer stable Minecraft release is out, the side panel shows <strong>Update to &lt;version&gt;</strong>. It opens the Versions tab with the <strong>Change Minecraft Version</strong> dialog ready for that release, including the mod compatibility check. Confirm there, then press <strong>Save Changes</strong>.
          </p>

          <h2 id="loaders">
            <Cpu /> Choosing a Mod Loader
          </h2>
          <p>
            Pick a server type when you add an instance, or change it later in the <strong>Loaders</strong> tab. Each type lets you pin a loader version or build, or use <strong>Latest Recommended</strong>.
          </p>
          <Table
            headers={['Type', 'Runs', 'Good for']}
            rows={[
              ['Vanilla', 'Nothing extra', 'The plain Minecraft experience.'],
              ['Fabric / Quilt', 'Mods from the mods folder', 'Lightweight and performance mods. Quilt runs most Fabric mods.'],
              ['Forge / NeoForge', 'Mods from the mods folder', 'Big content mods and classic modpacks.'],
              ['Paper', 'Paper, Spigot, and Bukkit plugins', 'Fast servers with plugins.'],
              ['Purpur', 'The same plugins as Paper, plus Purpur-only ones', 'Paper with extra gameplay and config options.'],
              ['Folia', 'Folia-compatible plugins only', 'Very large servers on machines with many CPU cores.'],
              ['Bedrock', 'Add-ons (no Java mods or plugins)', 'Phone, console, and Windows players. See Bedrock Edition.']
            ]}
          />
          <p>
            On Paper, Purpur, and Folia, the Mods tab manages <a href="#/wiki/mod-management/plugins">plugins</a> instead of mods.
          </p>
          <Callout type="note">
            Mods are built for one loader. Switching loaders (for example Fabric to Forge) will stop most existing mods from loading.
          </Callout>

          <h2 id="folia">
            <AlertTriangle /> Folia
          </h2>
          <p>
            Folia runs each region of the world on its own thread. Most Paper plugins don&apos;t work on it, so the plugin search only shows plugins marked Folia-compatible. Folia only exists for some Minecraft versions (1.19.4 and newer) and all of its builds are experimental. Isopod warns you when the version you picked has no Folia build.
          </p>

          <h2 id="cross-play">
            <Globe /> Bedrock Cross-play
          </h2>
          <p>
            Paper, Purpur, Fabric, and NeoForge servers have a <strong>Bedrock cross-play</strong> switch in the Loaders tab. It lets phone, console, and Windows players join your Java server. See <a href="#/wiki/bedrock/cross-play-setup">Cross-play on a Java Server</a>.
          </p>
        </div>
      )
    },
    {
      id: 'bedrock',
      title: 'Bedrock Edition & Cross-play',
      category: 'Servers',
      summary: "Host players on phones, consoles, and Windows: run a Bedrock server, or let Bedrock players join a Java server.",
      sections: [{ id: 'bedrock-server', title: 'Running a Bedrock Server' }, { id: 'bedrock-allowlist', title: 'Allowlist & Operators' }, { id: 'bedrock-addons', title: 'Add-ons' }, { id: 'bedrock-resource-packs', title: 'Resource Packs' }, { id: 'bedrock-console', title: 'Console & Backups' }, { id: 'cross-play-setup', title: 'Cross-play on a Java Server' }, { id: 'bedrock-ports', title: 'Ports' }, { id: 'bedrock-limits', title: 'Limitations' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Globe className="h-3 w-3" /> Bedrock Edition
          </div>
          <h1>Bedrock Edition &amp; Cross-play</h1>
          <p className="lead">
            Minecraft on Windows, phones, tablets, and consoles is <strong>Bedrock Edition</strong>, and it can&apos;t join Java servers on its own. Isopod can host Bedrock players in two ways: a <strong>Bedrock server</strong>, which only Bedrock players can join, or <strong>cross-play</strong> on a Java server, which both can join.
          </p>

          <h2 id="bedrock-server">
            <Server /> Running a Bedrock Server
          </h2>
          <ol>
            <li>Click <strong>Add Instance</strong> and pick <strong>BEDROCK</strong> as the server type. Isopod runs Mojang&apos;s Bedrock Dedicated Server.</li>
            <li>The port switches to <code>19132</code>, the standard Bedrock port.</li>
            <li>Choose <strong>Latest release</strong> or <strong>Preview</strong> (for players on Minecraft Preview). To stay on one release, type its exact number, like <code>1.21.50.07</code>, in the <strong>Versions</strong> tab.</li>
            <li>Create and start the server, then add it in Minecraft under <strong>Play &rarr; Servers &rarr; Add Server</strong> with the address shown in the side panel.</li>
          </ol>
          <p>
            In the World tab, the world types are Default, Flat, and Legacy. Bedrock has no Spectator game mode or structures switch.
          </p>

          <h2 id="bedrock-allowlist">
            <Lock /> Allowlist &amp; Operators
          </h2>
          <p>
            Bedrock calls the whitelist the <strong>allowlist</strong>. Manage it in the <strong>User Management</strong> tab:
          </p>
          <ul>
            <li>Add players by Xbox gamertag. Spaces are fine, for example <code>Blocky Builder</code>.</li>
            <li>Turn the allowlist on or off, and set each player to <strong>Member</strong> or <strong>Operator</strong>.</li>
            <li>Changes reach a running server straight away, except that a new operator who isn&apos;t online gets operator powers at the next start.</li>
            <li>Bedrock has no ban command, so there&apos;s no Banned Players list. To keep someone out, turn the allowlist on and remove them from it.</li>
          </ul>

          <h2 id="bedrock-addons">
            <Box /> Add-ons
          </h2>
          <p>
            On a Bedrock server, the <strong>Mods</strong> tab is called <strong>Add-ons</strong>. Click <strong>Add File</strong> and pick a <code>.mcpack</code> or <code>.mcaddon</code>. Isopod installs its behavior packs, plus any resource packs a <code>.mcaddon</code> brings with them, and turns them on for the world. Those resource packs are listed in the <a href="#/wiki/bedrock/bedrock-resource-packs">Resource Packs</a> tab.
          </p>
          <ul>
            <li>Each add-on shows its name, version, and type. Switch one off to keep it installed but unused, or remove it to delete it.</li>
            <li>Changes apply the next time the server starts.</li>
            <li>Isopod takes a snapshot before each change, so you can roll it back.</li>
          </ul>
          <Callout type="note">
            Add-ons marked <strong>Uses experimental Beta APIs</strong> only work in a world that has the Beta APIs experiment on. Experiments are set when a world is created in the game, so turn it on there and upload that world.
          </Callout>
          <p>
            Files that aren&apos;t valid add-ons, or that try to write outside their folder, are rejected with the reason. Marketplace content is encrypted and can&apos;t be installed.
          </p>

          <h2 id="bedrock-resource-packs">
            <Layers /> Resource Packs
          </h2>
          <p>
            A Bedrock server&apos;s <strong>Resource Packs</strong> tab installs texture and sound packs from <code>.mcpack</code> files. Players download them when they join.
          </p>
          <ol>
            <li>Click <strong>Add File</strong> and pick a resource pack <code>.mcpack</code>.</li>
            <li>Isopod installs it and turns it on for the world.</li>
            <li>Restart the server. Players get the pack the next time they join.</li>
          </ol>
          <ul>
            <li><strong>Require pack</strong> makes players accept the server&apos;s resource packs to join. When it&apos;s off, players are asked and can decline. Press <strong>Save Changes</strong> to keep it.</li>
            <li>Switch a pack off to keep it installed but unused, or remove it to delete its files.</li>
            <li>Behavior packs and <code>.mcaddon</code> files are refused here. Install them from <a href="#/wiki/bedrock/bedrock-addons">Add-ons</a>.</li>
            <li>Java servers keep their own Resource Packs tab, which downloads packs from Modrinth. See <a href="#/wiki/mod-management/resource-packs">Server Resource Packs</a>.</li>
          </ul>

          <h2 id="bedrock-console">
            <Terminal /> Console &amp; Backups
          </h2>
          <ul>
            <li>Console commands show their replies in the console, the same as on Java.</li>
            <li>Backups and snapshots include the <code>worlds</code> folder. While the server is running, Isopod pauses saving for a few seconds so the copy is consistent.</li>
          </ul>

          <h2 id="cross-play-setup">
            <Globe /> Cross-play on a Java Server
          </h2>
          <ol>
            <li>Open a Paper, Purpur, Fabric, or NeoForge server&apos;s <strong>Loaders</strong> tab.</li>
            <li>Switch on <strong>Bedrock cross-play</strong>, press <strong>Save Changes</strong>, and restart the server.</li>
            <li>Bedrock players join on the <strong>Bedrock</strong> address shown next to the Java address in the side panel (UDP, <code>19132</code> by default).</li>
          </ol>
          <ul>
            <li>Isopod installs <a href="https://geysermc.org" target="_blank" rel="noopener noreferrer">Geyser</a>, which translates between Bedrock and Java, and Floodgate, which lets Bedrock players join without a Java account. On Fabric it also adds Fabric API, which both need.</li>
            <li>Bedrock players&apos; names start with a <code>.</code> so they can&apos;t clash with Java names.</li>
            <li>Switching cross-play off removes the Geyser and Floodgate jars and the Bedrock port. Their config folders stay, in case you turn it back on.</li>
          </ul>
          <Callout type="note">
            Geyser supports the newest Java releases. On an older Minecraft version, Bedrock players may not be able to join.
          </Callout>

          <h2 id="bedrock-ports">
            <Wifi /> Ports
          </h2>
          <p>
            Bedrock uses <strong>UDP</strong>, not TCP, so forward the port as UDP on your router (see <a href="#/wiki/port-forwarding">Port Forwarding</a>). Isopod publishes UDP ports <code>19132</code>-<code>19152</code>, so keep Bedrock ports in that range.
          </p>
          <Callout type="warning">
            Installed Isopod before Bedrock support? Add <code>19132-19152:19132-19152/udp</code> to the ports in your compose file and recreate the container, or Bedrock players can&apos;t connect.
          </Callout>

          <h2 id="bedrock-limits">
            <AlertTriangle /> Limitations
          </h2>
          <ul>
            <li>Bedrock servers can&apos;t run Java mods or plugins, so the Edit window has no <strong>Loaders</strong> tab. Use <a href="#/wiki/bedrock/bedrock-addons">Add-ons</a> and <a href="#/wiki/bedrock/bedrock-resource-packs">Resource Packs</a> instead.</li>
            <li>The online player list and player count work, but the side panel only lists names. Kick, message, and teleport need RCON, which Bedrock doesn&apos;t have.</li>
            <li><a href="#/wiki/server-tuning/sleep">Sleep when empty</a> isn&apos;t available.</li>
            <li>Saving a Bedrock server adds unused <code>RESOURCE_PACK_ID</code> and <code>CUSTOM_SERVER_PROPERTIES</code> entries to its raw environment variables. Bedrock ignores them, so you can leave them alone.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'crashes',
      title: 'Crashes & Auto-Restart',
      category: 'Servers',
      summary: "How Isopod spots crashes, restarts servers, stops crash loops, and shows crash reports.",
      sections: [{ id: 'crash-badges', title: 'When a Server Crashes' }, { id: 'auto-restart', title: 'Auto-Restart & Crash Loops' }, { id: 'crash-report', title: 'Crash Report' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <AlertTriangle className="h-3 w-3" /> Crash Watchdog
          </div>
          <h1>Crashes &amp; Auto-Restart</h1>
          <p className="lead">
            Isopod watches for servers that stop on their own. Stopping or killing a server from the dashboard never counts as a crash, and neither does a clean <code>/stop</code> from inside the game.
          </p>

          <h2 id="crash-badges">
            <AlertTriangle /> When a Server Crashes
          </h2>
          <ul>
            <li>Its tile shows a red <strong>Crashed (Code: X)</strong> badge, or <strong>Out of memory</strong> when it ran out of RAM.</li>
            <li>The side panel explains what happened, with <strong>View Crash Report</strong> and <strong>Dismiss</strong>.</li>
            <li>A server that crashed and came back on its own shows an amber note until you dismiss it or start it yourself.</li>
          </ul>

          <h2 id="auto-restart">
            <RefreshCw /> Auto-Restart &amp; Crash Loops
          </h2>
          <p>
            <strong>Restart automatically</strong> in the Configuration tab decides what happens after a crash: <strong>Always</strong> (the default), <strong>Only after a crash</strong>, or <strong>Never</strong>. See <a href="#/wiki/server-tuning/restart-policy">Restart Automatically</a>.
          </p>
          <p>
            Docker waits a little longer before each quick restart. If a server still crashes <strong>3 times within 2 minutes</strong>, Isopod stops it so a broken mod or world can&apos;t restart it forever, and the side panel says <strong>Crash loop stopped</strong>. Fix the problem, then press <strong>Start</strong>.
          </p>

          <h2 id="crash-report">
            <FileCode /> Crash Report
          </h2>
          <p>
            <strong>View Crash Report</strong>, or <strong>Crash Report</strong> in the Minecraft Log tab, opens the newest file from <code>crash-reports/</code>. It shows:
          </p>
          <ul>
            <li>What crashed and the <strong>root cause</strong> (the last <code>Caused by:</code> line).</li>
            <li><strong>Suspected mods</strong> named by the report.</li>
            <li>The full report with errors highlighted, and the last log lines.</li>
          </ul>
          <Table
            headers={['Problem', 'What to try']}
            rows={[
              ['No crash report found', 'Crashes like running out of memory or a port already in use don\'t write one. Read the log lines shown below it.'],
              ['Out of memory', 'Raise MEMORY in the Configuration tab. See Memory.'],
              ['A suspected mod is listed', 'Disable or remove that mod in the Mods tab, or use Restore previous state if it came in with an update.']
            ]}
          />
        </div>
      )
    },
    {
      id: 'world-settings',
      title: 'World Settings',
      category: 'Servers',
      summary: "Seed, level type, difficulty, game mode, and structures.",
      sections: [{ id: 'world-generation', title: 'Generation & Gameplay Options' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Globe className="h-3 w-3" /> World Generation
          </div>
          <h1>World Settings</h1>
          <p className="lead">
            The <strong>World</strong> tab controls how your server&apos;s world is generated and played. Most changes need a server restart.
          </p>

          <h2 id="world-generation">
            <Globe /> Generation &amp; Gameplay Options
          </h2>
          <ul>
            <li><strong>World Seed:</strong> Determines terrain generation. Leave it blank for a random seed.</li>
            <li><strong>Level Type:</strong> Default, Flat, Large Biomes, Amplified, or Buffet.</li>
            <li><strong>Difficulty:</strong> Peaceful, Easy, Normal, or Hard.</li>
            <li><strong>Game Mode:</strong> Survival, Creative, Adventure, or Spectator.</li>
            <li><strong>Structures:</strong> Toggle generation of villages, temples, and other structures.</li>
          </ul>
          <Callout type="tip">
            Seed and Level Type only apply when a world is first created. To regenerate with new settings, delete the <code>world</code> folder from the instance&apos;s Files tab, then restart the server.
          </Callout>
        </div>
      )
    },
    {
      id: 'backups',
      title: 'World Backups',
      category: 'Worlds & Files',
      summary: "Scheduled and manual world backups, pre-update snapshots, and restoring.",
      sections: [{ id: 'schedule', title: 'Automatic Backups' }, { id: 'manage', title: 'Managing Backups' }, { id: 'restore', title: 'Restoring a Backup' }, { id: 'snapshots', title: 'Pre-update Snapshots' }, { id: 'location', title: 'Where Backups Are Stored' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Archive className="h-3 w-3" /> Backups
          </div>
          <h1>World Backups</h1>
          <p className="lead">
            The <strong>Backups</strong> tab in the instance editor saves copies of your server&apos;s worlds, either on a schedule or on demand, so a bad mod update, corruption, or griefing doesn&apos;t cost you progress.
          </p>

          <h2 id="schedule">
            <RefreshCw /> Automatic Backups
          </h2>
          <ul>
            <li><strong>Automatic backups:</strong> Turn on scheduled backups for this instance.</li>
            <li><strong>Frequency:</strong> Every hour, every 6 or 12 hours, daily, or weekly.</li>
            <li><strong>Backups to keep:</strong> Once there are more backups than this, the oldest are deleted.</li>
          </ul>
          <p>
            Changes are saved as soon as you make them. Isopod checks every minute and backs up any instance whose newest backup is older than its frequency, so scheduled backups only run while Isopod itself is running.
          </p>
          <Callout type="tip">
            Backups are safe to take while the server is running. Isopod pauses world saving and flushes it to disk during the copy, then turns saving back on.
          </Callout>

          <h2 id="manage">
            <Archive /> Managing Backups
          </h2>
          <ul>
            <li><strong>Back Up Now:</strong> Create a backup immediately, for example before updating mods.</li>
            <li><strong>Download:</strong> Save a backup&apos;s <code>.zip</code> to your computer.</li>
            <li><strong>Restore:</strong> Revert the world to that backup. The current world folders are replaced.</li>
            <li><strong>Delete:</strong> Permanently remove a backup.</li>
          </ul>
          <p>
            Each backup contains every world folder in the instance (any folder with a <code>level.dat</code>, such as <code>world</code>). Server settings, mods, and configs are not included; use <strong>Export</strong> on the dashboard for a full copy of an instance.
          </p>

          <h2 id="restore">
            <RefreshCw /> Restoring a Backup
          </h2>
          <ol>
            <li>Stop the server. Restore is refused while it is running.</li>
            <li>Optionally press <strong>Back Up Now</strong> so you can return to the current world later.</li>
            <li>Press <strong>Restore</strong> on the backup you want and confirm.</li>
            <li>Start the server again.</li>
          </ol>
          <Callout type="warning">
            Restoring replaces the current world. Anything built since that backup is lost unless you back up first.
          </Callout>

          <h2 id="snapshots">
            <Archive /> Pre-update Snapshots
          </h2>
          <p>
            Before you change a server&apos;s Minecraft version, server type, loader version, modpack, or mods (adding, removing, enabling, or disabling them), Isopod takes a snapshot of its worlds, <code>mods</code>, <code>config</code>, and <code>plugins</code> folders, <code>server.properties</code>, and its Docker settings. Several changes within 10 minutes share one snapshot, taken before the first change.
          </p>
          <ul>
            <li><strong>Roll back:</strong> After an update, the side panel shows <strong>Restore previous state</strong>. It stops the server if it&apos;s running and puts everything back as it was. Anything that changed since, including world progress, is lost. <strong>Dismiss</strong> hides the offer; the snapshot stays in the Backups tab.</li>
            <li>The offer goes away on its own once the server has started successfully after the change.</li>
            <li><strong>Manage:</strong> The Backups tab lists every snapshot with the change it was taken before. Download, restore, or delete them like backups.</li>
            <li><strong>Snapshots to keep:</strong> How many are kept (3 by default); the oldest are removed first. Set it to <strong>0</strong> to turn snapshots off.</li>
          </ul>
          <Callout type="note">
            If a snapshot can&apos;t be taken (for example, the disk is full), the change is not made and Isopod tells you why.
          </Callout>

          <h2 id="location">
            <Server /> Where Backups Are Stored
          </h2>
          <p>
            By default, backups are saved in a <code>backups</code> folder inside each instance. They are left out when an instance is exported or duplicated. The Backups tab shows the exact folder.
          </p>
          <p>
            To store them somewhere else, such as a separate drive, set <strong>Settings &rarr; General &rarr; Backup Folder</strong> to an absolute path. Each instance then gets its own subfolder there. Backups already made in the old location are not moved.
          </p>
          <Callout type="warning">
            When Isopod runs in Docker, the path is inside the Isopod container. Mount the host folder into the container (for example <code>/mnt/backups:/backups</code> in your compose file) and use the container path, or backups will be lost when the container is recreated.
          </Callout>
        </div>
      )
    },
    {
      id: 'players-access',
      title: 'Players, Whitelist & Operators',
      category: 'Mods & Players',
      summary: "Whitelist, operators, bans, and live actions for online players.",
      sections: [{ id: 'whitelist', title: 'Whitelist' }, { id: 'operators', title: 'Operator Levels' }, { id: 'online-players', title: 'Online Players' }, { id: 'bans', title: 'Banned Players' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Lock className="h-3 w-3" /> Access Control
          </div>
          <h1>Players, Whitelist &amp; Operators</h1>
          <p className="lead">
            The <strong>User Management</strong> tab manages who can join your server and what they are allowed to do, without typing console commands. Changes are saved with <strong>Save User Configuration</strong>. Bedrock servers work a little differently, see <a href="#/wiki/bedrock/bedrock-allowlist">Bedrock Allowlist &amp; Operators</a>.
          </p>

          <h2 id="whitelist">
            <Lock /> Whitelist
          </h2>
          <ul>
            <li><strong>Whitelist toggle:</strong> When enabled, only players on the list who are marked active can join. When disabled, anyone can join.</li>
            <li><strong>Add Player:</strong> Type a Minecraft username and press Enter. Tab autocompletes players this install has already seen.</li>
            <li><strong>Remove:</strong> Removes a player from the server&apos;s player list.</li>
          </ul>
          <p>
            You can set a default whitelist for every new server under <strong>Settings &rarr; Server Defaults</strong>.
          </p>
          <h2 id="operators">
            <ShieldCheck /> Operator (OP) Levels
          </h2>
          <Table
            headers={['Level', 'Permissions']}
            rows={[
              ['Standard Player', 'No operator permissions.'],
              ['Level 1', 'Bypass spawn protection.'],
              ['Level 2', 'Cheat commands and command blocks.'],
              ['Level 3', 'Kick, ban, and promote players.'],
              ['Level 4', 'Full operator, including server management commands.']
            ]}
          />

          <h2 id="online-players">
            <Wifi /> Online Players
          </h2>
          <p>
            While a server is online, its tile shows how many players are on, and the side panel lists them. Click a player for quick actions:
          </p>
          <ul>
            <li><strong>Message</strong> and <strong>Teleport</strong></li>
            <li><strong>Op / Deop</strong> and <strong>Whitelist</strong></li>
            <li><strong>Kick</strong> and <strong>Ban</strong></li>
          </ul>
          <p>
            The same actions appear on each player row in User Management, with <strong>ONLINE</strong> and <strong>BANNED</strong> badges. On Bedrock servers the side panel only lists names, because these actions need RCON.
          </p>

          <h2 id="bans">
            <ShieldCheck /> Banned Players
          </h2>
          <p>
            User Management lists banned players with an <strong>Unban</strong> button. Unban works while the server is stopped, too.
          </p>
        </div>
      )
    },
    {
      id: 'file-manager',
      title: 'File Manager',
      category: 'Worlds & Files',
      summary: "Browse, upload, edit, and move an instance's files.",
      sections: [{ id: 'file-operations', title: 'Working with Files' }, { id: 'shortcuts', title: 'Keyboard Shortcuts' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <FileCode className="h-3 w-3" /> Server Files
          </div>
          <h1>File Manager</h1>
          <p className="lead">
            The <strong>Files</strong> tab is a full file browser for an instance&apos;s directory: configs, worlds, mods, and logs.
          </p>

          <h2 id="file-operations">
            <FileCode /> Working with Files
          </h2>
          <ul>
            <li><strong>Upload:</strong> Drag files from your computer onto the browser, or use the upload button.</li>
            <li><strong>Create:</strong> Make new files and folders from the toolbar or by right-clicking empty space.</li>
            <li><strong>Edit:</strong> Open text files such as <code>server.properties</code> to edit them in place.</li>
            <li><strong>Organize:</strong> Select items to cut, copy, paste, download, or delete. Drag items onto a folder or breadcrumb to move them.</li>
            <li><strong>Right-click menu:</strong> Rename, delete, and other actions for the item under your cursor.</li>
            <li><strong>Name clashes:</strong> When a pasted or uploaded file already exists, choose <strong>Overwrite</strong>, <strong>Keep Both (Auto-Rename)</strong>, or <strong>Cancel</strong>.</li>
          </ul>
          <p>
            <strong>Folders</strong> in the dashboard header opens the same browser for all servers at once.
          </p>

          <h2 id="shortcuts">
            <Sliders /> Keyboard Shortcuts
          </h2>
          <Table
            headers={['Key', 'Action']}
            rows={[
              ['Delete', 'Delete the selected files.'],
              ['F2', 'Rename the selected item.'],
              ['Ctrl + C / Ctrl + X / Ctrl + V', 'Copy, cut, and paste.'],
              ['Ctrl + A', 'Select everything in the folder.'],
              ['Esc', 'Cancel renaming or close the right-click menu.']
            ]}
          />
          <Callout type="warning">
            Stop the server before editing or deleting world files. Changing them while it runs can corrupt your world.
          </Callout>
        </div>
      )
    },
    {
      id: 'app-settings',
      title: 'Dashboard Settings',
      category: 'Dashboard',
      summary: "Isopod's own settings: refresh, backup folder, language, theme, server defaults, and updates.",
      sections: [{ id: 'general', title: 'General' }, { id: 'language', title: 'Language' }, { id: 'appearance', title: 'Appearance' }, { id: 'defaults', title: 'Server Defaults' }, { id: 'updates', title: 'Updates' }, { id: 'advanced', title: 'Advanced' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Settings className="h-3 w-3" /> Application Settings
          </div>
          <h1>Dashboard Settings</h1>
          <p className="lead">
            Open <strong>Settings</strong> from the dashboard header to configure Isopod itself, plus the defaults used for new servers.
          </p>
          <p>
            Changes take effect when you click <strong>Save Settings</strong>. Closing Settings any other way (<strong>Discard Changes</strong>, the X, <strong>Esc</strong>, or a click outside) puts back anything you changed, including a theme you were trying out.
          </p>

          <h2 id="general">
            <Monitor /> General
          </h2>
          <ul>
            <li><strong>Automatic Refresh:</strong> Update server statuses and <a href="#/wiki/monitoring/resource-usage">resource usage</a> every few seconds.</li>
            <li><strong>Show Snapshots:</strong> Include Minecraft snapshot versions in version lists.</li>
            <li><strong>Backup Folder:</strong> Where world backups are stored. Leave empty to keep them inside each instance. See <a href="#/wiki/backups">World Backups</a>.</li>
          </ul>
          <h2 id="language">
            <Globe /> Language
          </h2>
          <p>
            Choose the dashboard&apos;s interface language.
          </p>
          <h2 id="appearance">
            <Monitor /> Appearance
          </h2>
          <p>
            Switch between Dark Mode and Light Mode.
          </p>
          <Callout type="tip">
            The cat button in the dashboard header, a nod to Prism Launcher, turns on a <strong>MEOW</strong> background. Click it again to turn it off. It currently only shows in Dark Mode.
          </Callout>
          <h2 id="defaults">
            <Server /> Server Defaults
          </h2>
          <ul>
            <li><strong>Default Port Range Start:</strong> The first port offered to new servers.</li>
            <li><strong>Default Mod Loader</strong> and <strong>Default RAM Allocation</strong> for new servers.</li>
            <li><strong>Default Whitelist:</strong> Enable the whitelist for new servers and pre-fill its players.</li>
          </ul>
          <h2 id="updates">
            <RefreshCw /> Updates
          </h2>
          <p>
            Compare your installed Isopod version with the latest release, read its release notes, and click <strong>Update Now</strong> to install it. Running servers save and stop first, and servers set to restart come back afterwards. A progress bar follows the update, and Isopod reloads once the new version is running.
          </p>
          <p>
            If the new version fails to start, Isopod goes back to the one you had and tells you in this tab.
          </p>
          <p>
            Some releases change the container itself, and installs from before v0.5.0 don&apos;t have this updater yet. In those cases the tab shows these commands instead, to run on the machine hosting Isopod, in the folder you cloned it into:
          </p>
          <CodeBlock code={`git pull
docker compose -f isopod-compose.yml up -d --build`} language="bash" />
          <p>
            On macOS, leave out <code>-f isopod-compose.yml</code>. Your servers and worlds are kept.
          </p>
          <Callout type="warning">
            Versions before v0.4.1 show <strong>Update Now</strong> on every install, but there it only restarts the old version, even though the dashboard then reports the new one. Use the commands above.
          </Callout>
          <h2 id="advanced">
            <Lock /> Advanced
          </h2>
          <p>
            Set the <strong>Docker Socket Path</strong> Isopod uses to manage server containers. Only change this if Docker runs at a non-standard location on your host.
          </p>
        </div>
      )
    },
    {
      id: 'monitoring',
      title: 'Resource Usage',
      category: 'Dashboard',
      summary: "Live CPU and RAM use for each server and for all of them together.",
      sections: [{ id: 'resource-usage', title: 'CPU & RAM' }, { id: 'reading-usage', title: 'Reading the Numbers' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Cpu className="h-3 w-3" /> Monitoring
          </div>
          <h1>Resource Usage</h1>
          <p className="lead">
            See how much CPU and RAM your servers use, so you know when a server needs more memory or your machine is full.
          </p>

          <h2 id="resource-usage">
            <Cpu /> CPU &amp; RAM
          </h2>
          <ul>
            <li><strong>All servers:</strong> The dashboard header shows total CPU and RAM for every running server, with RAM shown against your machine&apos;s total memory (e.g. <code>3.1/16 GB</code>). It is hidden on screens narrower than 1366px.</li>
            <li><strong>One server:</strong> Select a running server to see its CPU and RAM in the side panel. Running servers also show their RAM under their tile.</li>
            <li>Usage updates every few seconds while <strong>Automatic Refresh</strong> is on in Settings, and whenever you press <strong>Refresh</strong>.</li>
          </ul>

          <h2 id="reading-usage">
            <Info /> Reading the Numbers
          </h2>
          <ul>
            <li><strong>CPU</strong> is a share of your whole machine: 100% means every core is busy. Minecraft mostly runs on one core, so a busy server on an 8-core machine shows around 12%.</li>
            <li><strong>RAM</strong> is shown as <code>2.2 GB used · 2.0 GB heap</code>. The heap is the memory set aside for Minecraft&apos;s world data (<code>MEMORY</code>, see <a href="#/wiki/server-tuning/memory">Memory</a>). Java needs extra memory on top of it, so using 10-30% more than the heap is normal.</li>
          </ul>
          <Callout type="note">
            RAM always reads 0? Your Isopod image is older than this feature. Rebuild the image and recreate the container: <code>docker compose -f isopod-compose.yml up -d --build</code>.
          </Callout>
        </div>
      )
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      category: 'Dashboard',
      summary: "Lost connection, servers that won't start, players who can't join, and where to get help.",
      sections: [{ id: 'lost-connection', title: 'Lost Connection' }, { id: 'common-problems', title: 'Common Problems' }, { id: 'get-help', title: 'Getting Help' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <AlertTriangle className="h-3 w-3" /> Troubleshooting
          </div>
          <h1>Troubleshooting</h1>
          <p className="lead">
            Fixes for the problems people run into most. Each feature&apos;s article also has its own troubleshooting notes.
          </p>

          <h2 id="lost-connection">
            <Wifi /> Lost Connection
          </h2>
          <p>
            The dashboard checks every few seconds that it can still reach Isopod, even with Automatic Refresh off. If two checks in a row fail, a <strong>Lost connection to Isopod</strong> banner appears and every server shows <strong>Unknown</strong>, because its last known status can&apos;t be trusted. Once Isopod is reachable again, the banner clears and statuses reload on their own; <strong>Retry</strong> checks right away.
          </p>
          <p>
            If the dashboard can&apos;t reach Isopod when it first loads, it shows <strong>Can&apos;t reach Isopod</strong> instead of an empty server list. Check that the container is running with <code>docker compose -f isopod-compose.yml ps</code>, and read its logs with <code>docker compose -f isopod-compose.yml logs -f</code>.
          </p>

          <h2 id="common-problems">
            <AlertTriangle /> Common Problems
          </h2>
          <Table
            headers={['Problem', 'What to try']}
            rows={[
              [<>The server crashes or keeps restarting</>, <>Open the <a href="#/wiki/crashes/crash-report">Crash Report</a>. If a mod update caused it, use <strong>Restore previous state</strong>.</>],
              [<>Creating a server fails with a port error</>, <>Another server already uses that port. Pick a free one between 25565 and 25585.</>],
              [<>Friends can&apos;t join</>, <>Forward the server&apos;s port (TCP for Java, UDP for Bedrock), or use a <a href="#/wiki/tunneling-alternatives">tunnel</a>.</>],
              [<>Bedrock players can&apos;t join</>, <>Check that the UDP ports 19132-19152 are in your compose file. See <a href="#/wiki/bedrock/bedrock-ports">Bedrock Ports</a>.</>],
              [<><code>mounts denied</code> on a Mac</>, <>Do the one-time <a href="#/wiki/getting-started/macos">macOS setup</a> and run <code>docker compose</code> without <code>-f</code>.</>],
              [<>CurseForge says &quot;Couldn&apos;t load modpacks&quot;</>, <>See the table in <a href="#/wiki/dashboard-guide/curseforge-modpacks">CurseForge Modpacks</a>.</>],
              [<>A console command does nothing</>, <>A failed command stays in the input box with the reason in the log.</>]
            ]}
          />

          <h2 id="get-help">
            <BookOpen /> Getting Help
          </h2>
          <p>
            Every tab in the dashboard has a <strong>?</strong> button that opens the matching wiki section. Still stuck? <a href="https://github.com/Isopod-Project/Isopod/issues" target="_blank" rel="noopener noreferrer">Open an issue on GitHub</a> with what you did, what you expected, and the server log.
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
      summary: "Forward your router's ports so friends outside your network can join.",
      sections: [],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Wifi className="h-3 w-3" /> Multiplayer Setup
          </div>
          <h1>Router Port Forwarding Guide</h1>
          <p className="lead">
            To allow friends outside your home network to connect to your Minecraft server, your home router needs to know how to route incoming Minecraft game traffic directly to your host machine.
          </p>

          <Callout type="tip">
            Cannot access your router or have strict ISP restrictions? Check our <a href="#/wiki/tunneling-alternatives">Zero-Config Alternatives Guide</a> to host without port forwarding!
          </Callout>

          <div className="steps">
            {/* Step 1 */}
            <div className="card">
              <h2 className="text-lg">
                <span className="step-num">1</span>
                Find Your Server's Local IPv4 Address
              </h2>
              <p>
                You need your server machine's private local network address (typically starts with <code>192.168.x.x</code> or <code>10.0.x.x</code>):
              </p>
              <ul>
                <li><strong>Windows:</strong> Open Command Prompt or PowerShell and type <code>ipconfig</code>. Look for <code>IPv4 Address</code> (e.g. <code>192.168.1.150</code>).</li>
                <li><strong>Linux / macOS:</strong> Open Terminal and type <code>hostname -I</code> or <code>ip a</code>.</li>
              </ul>
              <Callout type="note">
                Consider assigning a <strong>Static IP</strong> or DHCP Reservation in your router for this machine so this address does not change when your computer reboots.
              </Callout>
            </div>

            {/* Step 2 */}
            <div className="card">
              <h2 className="text-lg">
                <span className="step-num">2</span>
                Access Your Router Gateway
              </h2>
              <p>
                Open your web browser and navigate to your router's default gateway address (usually <code>http://192.168.1.1</code> or <code>http://192.168.0.1</code>). Sign in with your router's administrator username and password (often found on a sticker on the physical router).
              </p>
            </div>

            {/* Step 3 */}
            <div className="card">
              <h2 className="text-lg">
                <span className="step-num">3</span>
                Create the Port Forwarding Rule
              </h2>
              <p>
                Locate the section named <strong>Port Forwarding</strong>, <strong>NAT</strong>, or <strong>Virtual Servers</strong> in your router settings. Add a new rule with the following parameters:
              </p>
              <Table
                headers={['Field', 'Recommended Setting', 'Explanation']}
                rows={[
                  ['Rule / Service Name', 'Minecraft-Isopod', 'Label to identify the rule in your router.'],
                  ['Protocol', 'TCP / UDP (or Both)', 'Minecraft Java uses TCP; Bedrock/Geyser uses UDP.'],
                  ['External / WAN Port', '25565', 'The port players type when connecting.'],
                  ['Internal / LAN Port', '25565', 'The port Isopod bound to your Minecraft instance.'],
                  ['Internal IP Address', 'Your Local IPv4 (e.g. 192.168.1.150)', 'Your host computer\'s local network address.']
                ]}
              />
              <p>Click <strong>Save</strong> or <strong>Apply Changes</strong>.</p>
            </div>

            {/* Step 4 */}
            <div className="card">
              <h2 className="text-lg">
                <span className="step-num">4</span>
                Configure Host Firewall
              </h2>
              <p>
                Ensure your operating system's firewall allows incoming connections on port <code>25565</code>:
              </p>
              <ul>
                <li>
                  <strong>Windows:</strong> Open <em>Windows Defender Firewall with Advanced Security</em> &rarr; <em>Inbound Rules</em> &rarr; <em>New Rule</em> &rarr; Port &rarr; TCP &rarr; Specific local ports: <code>25565</code> &rarr; Allow the connection.
                </li>
                <li>
                  <strong>Linux (UFW):</strong> Run:
                  <CodeBlock code="sudo ufw allow 25565/tcp" language="bash" />
                  For a Bedrock server or cross-play, also allow its UDP port, for example <code>sudo ufw allow 19132/udp</code>.
                </li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="card">
              <h2 className="text-lg">
                <span className="step-num">5</span>
                Find Your Public IP & Share with Friends
              </h2>
              <p>
                Check your public external IP address by visiting <a href="https://ifconfig.me" target="_blank" rel="noopener noreferrer">ifconfig.me</a> or running:
              </p>
              <CodeBlock code="curl ifconfig.me" language="bash" />
              <p>
                Friends can join in Minecraft by typing: <code>YOUR_PUBLIC_IP:25565</code> (or simply <code>YOUR_PUBLIC_IP</code> if using standard port 25565).
              </p>
            </div>
          </div>

          <Callout type="warning">
            <strong>Security Crucial:</strong> Only port forward Minecraft game ports (e.g. <code>25565</code>). <strong>DO NOT</strong> port forward port <code>8000</code> (the Isopod Web Management Dashboard) to the open internet without a secure reverse proxy and authentication!
          </Callout>
        </div>
      )
    },
    {
      id: 'tunneling-alternatives',
      title: 'Playit.gg, Tailscale & No-Port-Forward Options',
      category: 'Networking & Multiplayer',
      summary: "Playit.gg, Tailscale, and ngrok for hosting without port forwarding.",
      sections: [],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Globe className="h-3 w-3" /> Modern Alternatives
          </div>
          <h1>No-Port-Forwarding Alternatives</h1>
          <p className="lead">
            Port forwarding is not always possible. If you are behind Carrier-Grade NAT (CGNAT), on university/dorm Wi-Fi, or want to protect your home IP address from DDoS attacks, modern tunneling solutions allow seamless multiplayer hosting with zero router changes.
          </p>

          {/* Playit.gg Section */}
          <div className="card">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2>
                <Globe /> 1. Playit.gg (Recommended for Public Server Hosting)
              </h2>
              <span className="badge badge-success">BEST FOR MINECRAFT</span>
            </div>
            <p>
              <strong>Playit.gg</strong> is a global reverse proxy designed specifically for game servers. It assigns you a clean public domain name (e.g. <code>my-server.craft.ply.gg</code>) and routes traffic over an encrypted tunnel. Your players do not need to install any software!
            </p>

            <h3 className="text-sm">Setup Steps:</h3>
            <ol>
              <li>Download the Playit.gg program from <a href="https://playit.gg/download" target="_blank" rel="noopener noreferrer">playit.gg</a> or run their lightweight Docker container.</li>
              <li>Launch the application and follow the terminal link to claim your guest account.</li>
              <li>In the Playit.gg web dashboard, click <strong>Add Tunnel</strong> &rarr; select <strong>Minecraft Java</strong>.</li>
              <li>Set local port to <code>25565</code>.</li>
              <li>Playit will provide you with a permanent address (e.g. <code>your-name.joinmc.link</code>). Give this address to your players!</li>
            </ol>

            <div className="badge-row">
              <span className="badge">✓ Hides Home IP</span>
              <span className="badge">✓ Bypasses CGNAT</span>
              <span className="badge">✓ No Client Downloads for Friends</span>
              <span className="badge">✓ Free Tier Available</span>
            </div>
          </div>

          {/* Tailscale Section */}
          <div className="card">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2>
                <Lock /> 2. Tailscale (Best for Private Gaming with Friends)
              </h2>
              <span className="badge badge-accent">SECURE MESH VPN</span>
            </div>
            <p>
              <strong>Tailscale</strong> creates a zero-config, encrypted WireGuard mesh network connecting your devices directly. It is completely immune to external port scanners.
            </p>

            <h3 className="text-sm">Setup Steps:</h3>
            <ol>
              <li>Install Tailscale on your server host from <a href="https://tailscale.com" target="_blank" rel="noopener noreferrer">tailscale.com</a> and sign in.</li>
              <li>Have your trusted friends install Tailscale and sign into the same Tailnet (or use Tailscale Node Sharing).</li>
              <li>Note your server's Tailscale IPv4 address (starts with <code>100.x.y.z</code>).</li>
              <li>Friends connect in Minecraft by typing: <code>100.x.y.z:25565</code>.</li>
            </ol>
          </div>

          {/* ngrok Section */}
          <div className="card">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2>
                <Radio /> 3. ngrok (Best for Quick Testing Sessions)
              </h2>
              <span className="badge badge-warn">QUICK TUNNEL</span>
            </div>
            <p>
              <strong>ngrok</strong> is a quick tunneling tool popular with developers. You can open a TCP tunnel to your Minecraft server with a single terminal command:
            </p>
            <CodeBlock code="ngrok tcp 25565" language="bash" />
            <p>
              ngrok generates a forwarding address like <code>0.tcp.ngrok.io:19424</code>. Share this temporary address with friends for testing sessions.
            </p>
          </div>

          <h2>📊 Comparison of Multiplayer Hosting Methods</h2>
          <Table
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
      summary: "Run Isopod from source with hot reloading.",
      sections: [{ id: 'cross-origin', title: 'Cross-Origin Requests' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <FileCode className="h-3 w-3" /> Contributor Guide
          </div>
          <h1>Development Guide</h1>
          <p className="lead">
            Want to contribute code, build features, or debug Isopod locally? Follow this guide to set up the development environment with hot-reloading enabled.
          </p>

          <h2>Method A: Docker Development Compose (Recommended)</h2>
          <p>
            The repository includes a dedicated development Docker configuration that volume-mounts your local source tree into the container, enabling instant hot-reloading for both React and FastAPI:
          </p>
          <CodeBlock code={`# Clone repository\ngit clone https://github.com/Isopod-Project/Isopod.git\ncd Isopod\n\n# Build dev container\ndocker build -t isopod:dev -f docker/Dockerfile.dev .\n\n# Launch dev compose stack\ndocker compose -f docker/docker-compose.dev.yml up -d`} language="bash" />

          <h2>Method B: Direct Local Setup (Fastest Iteration)</h2>
          <p>
            Alternatively, run the FastAPI backend and Vite frontend processes directly on your host machine:
          </p>

          <div className="space-y-4">
            <div className="card-compact">
              <h4>1. Start Python Backend</h4>
              <CodeBlock code={`cd backend\npython -m venv venv\nsource venv/bin/activate  # On Windows: .\\venv\\Scripts\\activate\npip install -r requirements.txt\nuvicorn main:app --reload --port 8000`} language="bash" />
            </div>

            <div className="card-compact">
              <h4>2. Start React / Vite Frontend</h4>
              <CodeBlock code={`cd frontend\nnpm install\nnpm run dev`} language="bash" />
            </div>
          </div>

          <Callout type="tip">
            The frontend dev server proxies API calls on <code>/api</code> directly to <code>http://localhost:8000</code>.
          </Callout>

          <Callout type="note">
            To work on CurseForge modpacks, put <code>CURSEFORGE_API_KEY=&apos;your-key&apos;</code> in a <code>.env</code> file in the repository root (in single quotes, keys contain <code>$</code>). Both dev compose files pass it into the container, and the backend reads it when you run it directly.
          </Callout>

          <h2 id="cross-origin">Cross-Origin Requests</h2>
          <p>
            The backend serves the dashboard from its own origin, so it rejects changes (<code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>) and WebSocket connections that come from another site. Requests without an <code>Origin</code> header, such as <code>curl</code> and scripts, are not affected.
          </p>
          <ul>
            <li><code>ISOPOD_CORS_ORIGINS</code>: comma-separated extra origins to allow, if you host a separate frontend.</li>
            <li><code>VITE_API_PROXY</code>: where the Vite dev server proxies <code>/api</code> (default <code>http://localhost:8000</code>).</li>
          </ul>
        </div>
      )
    },
    {
      id: 'project-standards',
      title: 'Project Organization & Standards',
      category: 'Development',
      summary: "Repository layout, coding standards, and keeping the wiki current.",
      sections: [{ id: 'wiki', title: 'Keeping the Wiki Current' }],
      content: () => (
        <div>
          <div className="badge badge-accent mb-4">
            <Layers className="h-3 w-3" /> Architecture
          </div>
          <h1>Project Organization & Standards</h1>
          <p className="lead">
            Guidelines for repository structure, coding hygiene, and architecture patterns within the Isopod project.
          </p>

          <h2>Directory Structure</h2>
          <Table
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

          <h2>Engineering Standards</h2>
          <ul>
            <li><strong>Mod Provider Policy:</strong> Modrinth is the official mod repository integration, with full server-side dependency resolution. CurseForge is supported for modpacks only, through its official API with a user-supplied key. Send the key per request and only to <code>api.curseforge.com</code>.</li>
            <li><strong>Clean Root Directory:</strong> Do not commit temporary test files, local virtual environments, or scratch scripts to the root directory.</li>
            <li><strong>Strict Typing:</strong> All new frontend components must feature comprehensive TypeScript interfaces.</li>
            <li><strong>Docstring Integrity:</strong> Backend Python functions and route handlers must preserve clear docstrings detailing parameter schemas.</li>
          </ul>

          <h2 id="wiki">Keeping the Wiki Current</h2>
          <p>
            Every change that affects what users see or configure updates this wiki in the same piece of work: new features, changed behavior, new settings, new platforms or server types, new error messages or limitations, and workarounds for known problems. Small bug fixes and internal changes (refactors, dependency bumps, tests) are exempt.
          </p>
          <ul>
            <li>The wiki lives in <code>src/WikiPage.tsx</code> of the <a href="https://github.com/Isopod-Project/Isopod-Website" target="_blank" rel="noopener noreferrer">Isopod-Website</a> repo. Open a PR there and link it from the Isopod PR.</li>
            <li>Lay out articles as: what it is, how to use or set it up, then troubleshooting or limitations.</li>
            <li>Give every section heading an <code>id</code> and list it in the article&apos;s <code>sections</code> so search and the index find it.</li>
            <li>Never rename or remove an article or section id. The dashboard&apos;s help buttons link to them.</li>
            <li>A new dashboard area gets a help topic in <code>frontend/src/components/HelpButton.tsx</code>.</li>
          </ul>
          <p>
            The full rule is in <code>docs/agents/wiki.md</code> in the Isopod repo.
          </p>
        </div>
      )
    }
  ];

  const activeArticle = articles.find(a => a.id === activeArticleId) || articles[0];

  // Search matches article titles, categories, summaries, and section titles.
  // Section hits are listed under their article so a click jumps straight to them.
  const query = searchQuery.trim().toLowerCase();
  const searchResults = articles
    .map(a => {
      const articleHit = !query || matches(a.title, query) || matches(a.category, query) || matches(a.summary, query);
      const sectionHits = query ? a.sections.filter(sec => matches(sec.title, query)) : [];
      return { article: a, articleHit, sectionHits };
    })
    .filter(r => r.articleHit || r.sectionHits.length > 0);

  const renderResults = (onPick: () => void) => (
    CATEGORIES.map(cat => {
      const catResults = searchResults.filter(r => r.article.category === cat);
      if (catResults.length === 0) return null;
      const isExpanded = query !== '' || (expandedCategories[cat] ?? true);
      const listId = `wiki-nav-${cat.replace(/\W+/g, '-').toLowerCase()}`;
      return (
        <div key={cat}>
          <button
            type="button"
            onClick={() => toggleCategory(cat)}
            aria-expanded={isExpanded}
            aria-controls={listId}
            className="mb-1 flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg-strong"
          >
            <span>{cat}</span>
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
          </button>
          {isExpanded && (
            <ul id={listId} className="flex flex-col gap-0.5 border-l border-border pl-1">
              {catResults.map(({ article: art, sectionHits }) => (
                <li key={art.id} className="flex flex-col gap-0.5">
                  <RouteLink
                    to={{ view: 'wiki', articleId: art.id }}
                    onClick={onPick}
                    aria-current={activeArticleId === art.id ? 'page' : undefined}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${activeArticleId === art.id ? 'bg-accent/10 font-semibold text-accent-fg' : 'text-fg-muted hover:bg-surface-raised hover:text-fg-strong'}`}
                  >
                    {art.title}
                  </RouteLink>
                  {sectionHits.map(sec => (
                    <RouteLink
                      key={sec.id}
                      to={{ view: 'wiki', articleId: art.id, sectionId: sec.id }}
                      onClick={onPick}
                      className="rounded-lg py-1 pl-7 pr-3 text-xs text-fg-muted transition-colors hover:text-accent-fg"
                    >
                      <span aria-hidden="true">↳ </span>{sec.title}
                    </RouteLink>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    })
  );

  const searchBox = (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" aria-hidden="true" />
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search articles and sections..."
        aria-label="Search the wiki"
        className="input pl-9"
      />
    </div>
  );

  return (
    <div className="page">
      <div className="container-page flex flex-col items-start gap-6 md:flex-row md:gap-8">

        {/* Mobile article picker */}
        <div className="w-full md:hidden">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            aria-expanded={mobileDrawerOpen}
            aria-controls="wiki-nav-mobile"
            className="btn btn-secondary btn-lg w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent-fg" aria-hidden="true" />
              {activeArticle.title}
            </span>
            {mobileDrawerOpen ? <ChevronUp className="h-5 w-5" aria-hidden="true" /> : <ChevronDown className="h-5 w-5" aria-hidden="true" />}
          </button>

          {mobileDrawerOpen && (
            <motion.nav
              id="wiki-nav-mobile"
              aria-label="Wiki articles"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="card mt-2 flex flex-col gap-4 overflow-hidden p-4 shadow-2xl"
            >
              {searchBox}
              {renderResults(() => setMobileDrawerOpen(false))}
            </motion.nav>
          )}
        </div>

        {/* Desktop sidebar */}
        <nav
          aria-label="Wiki articles"
          className="card sticky top-24 hidden max-h-[calc(100vh-8rem)] w-72 flex-shrink-0 flex-col gap-5 overflow-y-auto p-4 md:flex"
        >
          {searchBox}
          {renderResults(() => {})}
        </nav>

        {/* Article */}
        <article className="card w-full min-w-0 flex-grow p-6 sm:p-8 md:max-w-3xl md:p-10">
          <motion.div
            key={activeArticleId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prose"
          >
            {activeArticle.content()}
          </motion.div>
        </article>

      </div>
    </div>
  );
};
export default WikiPage;
