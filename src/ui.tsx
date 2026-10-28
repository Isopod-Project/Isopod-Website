import React, { useState } from 'react'
import { AlertTriangle, Check, Copy, Info, Lightbulb } from 'lucide-react'
import { navigate, routeHref, type Route } from './route'

// Shared building blocks. Styling lives in the component classes in index.css
// (see DESIGN.md); these wrap the ones that need markup or behaviour.

// Link to an in-app route. A real <a href> so it can be opened in a new tab,
// with plain left-clicks handled client-side.
export const RouteLink = ({ to, onClick, ...props }: { to: Route } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    {...props}
    href={routeHref(to)}
    onClick={e => {
      onClick?.(e)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      navigate(to)
    }}
  />
)

// GitHub icon — lucide-react removed brand icons in v1
export const GitHubIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

export const CodeBlock = ({ code, language = 'bash' }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border bg-inset text-left font-mono text-sm">
      <div className="flex items-center justify-between border-b border-border bg-surface-raised px-4 py-2 text-xs text-fg-muted">
        <span className="font-semibold uppercase tracking-wider">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : `Copy ${language} code`}
          className="flex items-center gap-1.5 rounded transition-colors hover:text-fg-strong"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="font-semibold text-success">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre p-4 text-fg-strong">{code}</pre>
    </div>
  )
}

const CALLOUTS = {
  note: { label: 'NOTE', icon: Info, box: 'border-accent/30 bg-accent/10', text: 'text-accent-fg' },
  tip: { label: 'PRO TIP', icon: Lightbulb, box: 'border-success/30 bg-success/10', text: 'text-success' },
  warning: { label: 'WARNING', icon: AlertTriangle, box: 'border-warn/30 bg-warn/10', text: 'text-warn' },
}

export const Callout = ({ type, children }: { type: keyof typeof CALLOUTS, children: React.ReactNode }) => {
  const { label, icon: Icon, box, text } = CALLOUTS[type]
  return (
    <div role="note" className={`my-5 flex items-start gap-3 rounded-xl border p-4 text-left ${box}`}>
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${text}`} aria-hidden="true" />
      <div className="text-sm leading-relaxed text-fg">
        <strong className={`mb-1 block text-xs font-bold tracking-wider ${text}`}>{label}</strong>
        {children}
      </div>
    </div>
  )
}

export const Table = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  // Focusable so keyboard users can scroll wide tables
  <div role="region" aria-label={`Table: ${headers.join(', ')}`} tabIndex={0} className="my-6 w-full overflow-x-auto rounded-xl border border-border bg-surface text-left">
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-border bg-surface-raised">
          {headers.map((h, i) => (
            <th key={i} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold text-fg-strong">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="border-b border-border last:border-b-0">
            {row.map((cell, cidx) => (
              <td key={cidx} className="px-4 py-3 align-top text-fg">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
