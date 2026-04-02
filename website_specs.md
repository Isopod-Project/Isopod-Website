# 🦀 ISOPOD: Website Implementation Spec (Agent Only)

> **"Encapsulation, Portability, and Vibrancy."**
> This document provides the high-fidelity instructions required for an AI agent to build the official Isopod website.

---

## 🎨 1. THE ISOPOD AESTHETIC (Design System)

The website must feel like a premium, developer-centric tool. It should mirror the **Isopod Dashboard**'s dark, interactive, and glassmorphic UI.

### 🌑 Core Color Palette
- **Primary Background**: `#1A1A1A` (Deepest Charcoal - for sections)
- **Secondary Background**: `#242424` (Main Isopod background)
- **Surface/Card Color**: `#323232` (Subtle elevation)
- **Accent - Emerald**: `#34D399` (Emerald-400) - Primary interactions & success states.
- **Accent - Cobalt**: `#3E8ED0` (Isopod Blue) - Secondary highlights & links.
- **Text Primary**: `#E0E0E0` (Soft White)
- **Text Secondary**: `#A1A1AA` (Zinc-400)

### 💎 Design Language (Glassmorphism)
- **Blur**: Use `backdrop-blur-md` for headers and floating elements.
- **Borders**: Hairline borders (`border border-white/5` or `border border-[#4A4A4A]`).
- **Gradients**: Subtle radial gradients for background sections (`radial-gradient(circle at 50% 50%, #242424 0%, #1A1A1A 100%)`).

### ✨ Motion & Micro-interactions
- **Entry**: `animate-in` (defined as `slideInFromTop` + `fadeIn`).
- **Hover**: Smooth transitions (`0.3s ease-out`). Scale effects on buttons (1.05x).
- **Interactive Elements**: Use Lucide icons for all UI metaphors.

---

## 🛠 2. TECHNICAL STACK REQUIREMENTS

To maintain consistency with the existing codebase:
- **Framework**: Vite + React (or Vanilla HTML/JS with Tailwind).
- **Styling**: Tailwind CSS (Native).
- **Icons**: Lucide React.
- **Fonts**: Inter or Roboto (Sans-serif).
- **Animations**: Framer Motion (recommended for "premium" feel).

---

## 🏗 3. WEBSITE BLUEPRINT (Sections)

### Section 1: The Hero (The "Snap")
- **Visual**: A high-resolution generated image of the "Isopod Mascot" or a glassmorphic preview of the dashboard.
- **Copy**: 
    - *H1*: "Minecraft Management, Encapsulated."
    - *Subline*: "A modern, Docker-powered instance manager with smart mod resolution and real-time awareness."
- **CTA**: "Get Started on GitHub" (Lucide: `ExternalLink`) and "View Documentation" (Lucide: `FileText`).

### Section 2: Features (The "Core")
Display as a 3-column grid of "Glass Cards":
1. **Prism-Like UI**: Create separate, isolated instances in seconds.
2. **Smart Mod Ops**: One-click Modrinth & CurseForge integration with dependency resolution.
3. **Live Sync/RCON**: Real-time log streaming and interactive console inputs.
4. **Docker Powered**: Portable, lightweight, and isolated from your host OS.

### Section 3: Tech Stack (The "Shell")
A horizontal scrolling or static list of tech logos/names:
- **Backend**: FastAPI
- **Frontend**: React / Tailwind
- **Engine**: Docker SDK
- **Base**: itzg/minecraft-server

### Section 4: Call to Action (The "Roll")
- **Background**: A vibrant emerald-to-cobalt gradient.
- **Copy**: "Ready to roll your own server?"
- **Action**: A single, prominent button: "Clone Repository".

---

## 🤖 4. AGENT-SPECIFIC COMMANDS (Execution Rules)

When generating the code, the Agent MUST follow these protocols:

1. **NO PLACEHOLDERS**: Do not use `lorem ipsum`. All copy must be specific to Isopod features.
2. **RICH TEXTURES**: Use `bg-gradient-to-br` for buttons. Use `shadow-[0_8px_30px_rgb(0,0,0,0.12)]` for depth.
3. **RESPONSIVENESS**: Mobile-first grid layouts (`grid-cols-1 md:grid-cols-3`).
4. **SEO OPTIMIZATION**:
    - Title: "Isopod - Modern Minecraft Server Management"
    - Meta Description: "Manage modded Minecraft servers with ease using Isopod. Integrated Modrinth/CurseForge search, Docker isolation, and smart dependency resolution."
5. **ACCESSIBILITY**: ARIA labels on all Lucide-icon-only buttons.
6. **INTERACTIVE DEMO PREVIEW**: Create a simplified "Mock Terminal" component that mimics the real Isopod console animation.

---

## 🦀 MASCOT GUIDANCE
Use a "colorful, rolling isopod" as the theme. If generating assets, emphasize **iridescence** and **segmented armor** to symbolize security and portability.

---
*Created for the Isopod Development Team*
