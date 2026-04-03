# Project Structure & Architecture

This document provides a comprehensive overview of the portfolio project to guide your further development.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router, v16.2.2)
- **Library**: React 19.2.4
- **Language**: TypeScript (`tsconfig.json`)
- **Styling**: Tailwind CSS v4 (via PostCSS)
- **Icons**: Lucide React
- **Utilities**: 
  - `clsx` & `tailwind-merge`: For dynamically merging Tailwind class names without style conflicts.
- **Fonts**: Next.js optimized Google Fonts (`Syne` for headings, `DM Sans` for body text).

## 📁 Directory Structure

The repository relies on a standard Next.js `src/` directory layout:

```text
c:\a-warehouse\portfolio_1\
├── .next/                  # Next.js build output (Auto-generated)
├── next-app/               # (Legacy/Unused App Directory)
├── node_modules/           # Dependencies
├── public/                 # Static assets like images and fonts
├── src/                    # Source Code
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── favicon.ico     # Favicon
│   │   ├── globals.css     # Global Tailwind CSS and base styles
│   │   ├── layout.tsx      # Root layout, includes fonts, global background, and Sidebar
│   │   └── page.tsx        # Main entry page aggregating components (Hero, Skills, Work, Contact)
│   ├── components/         # Reusable React components
│   │   ├── Contact.tsx     # The contact form section
│   │   ├── Hero.tsx        # The main introductory section
│   │   ├── Sidebar.tsx     # Navigation sidebar/menu
│   │   ├── Skills.tsx      # Technical skills showcase
│   │   └── Work.tsx        # Portfolio projects showcase
│   └── lib/                # Shared utilities
│       └── utils.ts        # Common utility functions (e.g., `cn` for Tailwind)
├── .gitignore
├── eslint.config.mjs       # ESLint rules Configuration
├── next.config.ts          # Next.js configuration settings
├── package.json            # npm scripts and dependency definitions
├── postcss.config.mjs      # PostCSS configuration for Tailwind integration
├── tsconfig.json           # TypeScript configuration
└── ui.md                   # Reference for internal Glassmorphism styling standards
```

## 🧩 Key Components Overview

- **`layout.tsx`**: Defines the `<html>` and `<body>` structure. It sets up the primary font variables (`--font-syne`, `--font-dm-sans`), inserts dynamic pulsing background orbs for the glassmorphism theme, and persists the `<Sidebar />` navigation across all views.
- **`page.tsx`**: The main hub that composes your top-level structure. It sequentially renders `<Hero />`, `<Skills />`, `<Work />`, and `<Contact />`.
- **`Sidebar.tsx`**: Sticky on desktop, potentially a drawer on mobile. Handles routing your users smoothly.

## 🎨 Design System & Workflow

The application employs a strong **Glassmorphism** visual theme (as documented in `ui.md`). 

### Core Styling Approach
1. **Utility-First (`Tailwind v4`)**: The vast majority of styling is applied via inline Tailwind classes.
2. **Glassmorphism Backgrounds**: This is typically achieved with varying layers of semi-transparent backgrounds alongside `backdrop-blur-[value]` features. 
3. **Class Merging Logic**: Rather than fighting Tailwind order-of-origin issues, use the exported `cn()` helper from `src/lib/utils.ts` when creating conditional class strings or reusable components.

```tsx
// Example of using the UI utility
import { cn } from "@/lib/utils";

export default function MyComponent({ className }) {
  return (
    <div className={cn("base-classes backdrop-blur-md", className)}>
      ...
    </div>
  );
}
```

## 🛠️ Development Workflow

To continue development smoothly:

1. **Running the Local Server**:
   ```bash
   npm run dev
   ```
   *Your app will be available at `http://localhost:3000`.*

2. **Adding a New Component**:
   - Create a file in `src/components/` (e.g., `About.tsx`).
   - Define and export the React function component.
   - Import it in `src/app/page.tsx` and place it in the `<main>` structural flow.
   
3. **Adding a New Route Page (If building out multi-page)**:
   - Create a new directory within `src/app/` (e.g., `src/app/about/`).
   - Add a `page.tsx` file in that folder to instantly expose `localhost:3000/about`.
   - The global `layout.tsx` (containing the sidebar and animated backgrounds) will persist automatically on new sibling pages!

4. **Linting and Formatting Check**:
   Before commiting changes, ensure code quality matches existing setups:
   ```bash
   npm run lint
   ```

5. **Building for Production**:
   To test exactly what will be deployed:
   ```bash
   npm run build
   npm run start
   ```
