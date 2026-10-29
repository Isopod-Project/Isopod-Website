import { useEffect, useState } from 'react'
import { ExternalLink, Menu, Monitor, Moon, Sun, X } from 'lucide-react'
import { type View } from './route'
import { useTheme, type ThemePreference } from './theme'
import { GitHubIcon, RouteLink } from './ui'

const GITHUB_URL = 'https://github.com/Isopod-Project/Isopod'

const NAV: { view: View, label: string }[] = [
  { view: 'landing', label: 'Home' },
  { view: 'wiki', label: 'Wiki' },
  { view: 'downloads', label: 'Install' },
]

const THEMES: { id: ThemePreference, label: string, icon: typeof Sun }[] = [
  { id: 'system', label: 'System', icon: Monitor },
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
]

const ThemeToggle = () => {
  const [preference, setPreference] = useTheme()
  const index = THEMES.findIndex(t => t.id === preference)
  const current = THEMES[index]
  const next = THEMES[(index + 1) % THEMES.length]
  const Icon = current.icon
  return (
    <button
      type="button"
      onClick={() => setPreference(next.id)}
      aria-label={`Theme: ${current.label}. Switch to ${next.label}.`}
      title={`Theme: ${current.label}`}
      className="btn btn-ghost btn-icon"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}

const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
  <span className="flex items-center gap-2.5">
    <img src="Isopod_logo.png" alt="" className={size === 'md' ? 'h-9 w-9 object-contain' : 'h-7 w-7 object-contain'} />
    <span className={`font-bold tracking-tight text-fg-strong ${size === 'md' ? 'text-xl' : 'text-lg'}`}>Isopod</span>
  </span>
)

export const SiteHeader = ({ view }: { view: View }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const solid = scrolled || menuOpen
  const navLinks = (className: string) => (
    <>
      {NAV.map(item => (
        <RouteLink
          key={item.view}
          to={{ view: item.view }}
          onClick={() => setMenuOpen(false)}
          aria-current={view === item.view ? 'page' : undefined}
          className={`${className} ${view === item.view ? 'bg-accent/10 text-accent-fg' : ''}`}
        >
          {item.label}
        </RouteLink>
      ))}
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={className}>
        GitHub <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${solid ? 'border-border bg-header backdrop-blur-md' : 'border-transparent'}`}
    >
      {/* Focus #main directly: a "#main" hash would be read as a route change */}
      <a
        href="#main"
        onClick={e => { e.preventDefault(); document.getElementById('main')?.focus() }}
        className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between">
        <RouteLink to={{ view: 'landing' }} aria-label="Isopod home" className="rounded-lg">
          <Logo />
        </RouteLink>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks('btn btn-ghost')}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="btn btn-ghost btn-icon"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="container-page flex flex-col gap-1 border-t border-border pb-4 pt-2 md:hidden">
          {navLinks('btn btn-ghost btn-lg justify-start')}
        </nav>
      )}
    </header>
  )
}

export const SiteFooter = () => (
  <footer className="border-t border-border">
    <div className="container-page flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
      <Logo size="sm" />
      <p className="text-sm text-fg-muted">© 2026 Isopod Development Team. Built for the community.</p>
      <nav aria-label="Footer" className="flex items-center gap-1">
        <RouteLink to={{ view: 'wiki' }} className="btn btn-ghost">Wiki</RouteLink>
        <a href={`${GITHUB_URL}/releases`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Releases</a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="Isopod on GitHub" className="btn btn-ghost btn-icon">
          <GitHubIcon className="h-5 w-5" />
        </a>
      </nav>
    </div>
  </footer>
)
