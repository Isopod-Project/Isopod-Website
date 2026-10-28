# Isopod Website Design System

The website and the Isopod dashboard should read as one product. Every page uses the tokens and components below. Don't add hex colors, Tailwind palette colors (`yellow-400`, `purple-400`, …) or one-off component styles in page code. If something is missing, add a token or component here first.

Source of truth: `src/index.css` (tokens + component classes) and `src/ui.tsx` / `src/SiteChrome.tsx` (React components).

## Themes

Light and dark, matching the dashboard's Appearance setting. The header toggle cycles **System → Light → Dark**. The choice is stored in `localStorage` under `isopod-theme`, and "System" follows `prefers-color-scheme`. An inline script in `index.html` sets `data-theme` on `<html>` before first paint so there's no flash, and `src/theme.ts` keeps it in sync.

All colors come from CSS variables that switch with `data-theme`, so components never need `dark:` / `light:` variants.

## Color tokens

Use them as Tailwind utilities, e.g. `bg-surface`, `text-fg-muted`, `border-border`, `bg-accent/10`.

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `canvas` | `#1A1A1A` | `#F1F5F9` | Page background |
| `surface` | `#242424` | `#FFFFFF` | Cards, sidebar, panels |
| `surface-raised` | `#2D2D2D` | `#F8FAFC` | Hover states, table headers, nested surfaces |
| `inset` | `#141414` | `#F8FAFC` | Code blocks, inputs, terminal |
| `border` | `#333333` | `#E2E8F0` | Default hairline |
| `border-strong` | `#444444` | `#CBD5E1` | Secondary button outline |
| `fg` | `#E0E0E0` | `#334155` | Body text |
| `fg-strong` | `#FFFFFF` | `#0F172A` | Headings, emphasis |
| `fg-muted` | `#A1A1AA` | `#475569` | Secondary text, captions |
| `accent` | `#3E8ED0` | `#3E8ED0` | Isopod cobalt: borders, focus ring, tinted fills |
| `accent-fg` | `#6AAEE6` | `#2B6A9E` | Cobalt **text** (links, active nav), contrast-safe on each theme |
| `accent-solid` | `#2E78B7` | `#2E78B7` | Primary button fill (white text passes AA) |
| `accent-solid-hover` | `#2B6A9E` | `#2B6A9E` | Primary button hover |
| `success` | `#34D399` | `#047857` | Emerald: online, success, "tip" callouts |
| `warn` | `#FACC15` | `#854D0E` | Starting, warnings |
| `danger` | `#F87171` | `#B91C1C` | Errors, destructive actions |

Cobalt is the primary accent, as in the dashboard. Emerald is reserved for success and online states. Don't use emerald for buttons or links.

Tinted backgrounds use the token at 10% with a 30% border, e.g. `border-success/30 bg-success/10 text-success`.

## Typography

Inter (400–800), with system sans as the fallback. Monospace uses the system stack.

| Class | Size | Use |
| --- | --- | --- |
| `text-display` | 36 → 48 → 60px, 800 | Landing hero `h1` only |
| `text-title` | 30 → 36px, 800 | Page titles and section titles (`h1`/`h2`) |
| `text-heading` | 24px, 700 | Card titles |
| `lead` | 18px, muted | Intro paragraph under a title |
| `.prose` | 16px body | Wiki articles: styles bare `h1`–`h4`, `p`, lists, links, `code` |
| `text-sm` / `text-xs` | 14 / 12px | Card body, captions, badges |

Every page has exactly one `h1`, and heading levels don't skip.

## Spacing, radius, layout

- Tailwind's 4px spacing scale. Sections use `py-16`–`py-24`, cards use `p-6` (`p-4` compact), and gaps run `gap-3`–`gap-8`.
- Radius: `rounded-lg` (8px) for buttons, inputs and code; `rounded-xl` (12px) for cards and callouts; `rounded-full` for badges and step numbers.
- `container-page`: centered, `max-w-6xl`, `px-4 sm:px-6`. Every page uses it, so all content lines up with the header and footer.
- `page`: top and bottom padding for non-landing pages (clears the fixed header).
- Breakpoints: Tailwind defaults. The layout is checked at 390px (mobile), 820px (tablet) and 1440px (desktop).

## Components

### CSS classes (`src/index.css`)

| Class | Notes |
| --- | --- |
| `btn` + `btn-primary` / `btn-secondary` / `btn-ghost` | Add `btn-lg` for hero/CTA size and `btn-icon` for icon-only buttons (which need an `aria-label`) |
| `card`, `card-compact`, `card-interactive` | Surface + border + radius. `card-interactive` adds a cobalt border on hover |
| `badge` + `badge-accent` / `badge-success` / `badge-warn` / `badge-danger` | Pills, including the eyebrow label above page titles (`badge badge-accent`) |
| `icon-tile` | 48px cobalt icon holder on feature cards |
| `step-num` | Numbered circle for step-by-step guides |
| `input` | Text and search inputs |
| `link` | Inline link outside `.prose` |
| `text-gradient` | Brand cobalt → emerald gradient, used for one word in the hero |
| `prose` | Article typography. Inside it, `.steps` stacks step cards and `.badge-row` lays out a row of badges |

### React components

| Component | File | Notes |
| --- | --- | --- |
| `SiteHeader`, `SiteFooter` | `SiteChrome.tsx` | Same chrome on every view: skip link, nav with `aria-current`, theme toggle, mobile menu (Esc closes) |
| `RouteLink` | `ui.tsx` | `<a href>` for in-app routes, so links can be opened in a new tab |
| `CodeBlock` | `ui.tsx` | Language label + copy button |
| `Callout` | `ui.tsx` | `note` (cobalt), `tip` (emerald), `warning` (warn) |
| `Table` | `ui.tsx` | Scrollable, keyboard-focusable table |

## Accessibility

- Focus: every interactive element shows a 2px cobalt `:focus-visible` ring.
- Text tokens meet WCAG AA (4.5:1) on `canvas`, `surface` and their tinted callout backgrounds in both themes. Check new token values before changing them.
- Icon-only controls have an `aria-label`, and decorative icons get `aria-hidden`.
- Motion is disabled under `prefers-reduced-motion`.

## Wiki deep links

The dashboard's help buttons link to `#/wiki/<article>/<section>` (see `frontend/src/components/HelpButton.tsx` in the Isopod repo). Never rename or remove an article or section id. Run `npm run check:links` to verify that every link the dashboard uses still resolves. It reads `HelpButton.tsx` from Isopod's `main` by default, or a local path if you pass one.
