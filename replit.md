# Overview

This is a frontend-focused web application built with React, TypeScript, and Vite that serves as a bilingual age calculator tool. The application allows users to input birth dates and target dates to calculate precise age differences in years, months, days, weeks, and total days. It features a modern UI built with shadcn/ui components and Tailwind CSS, with support for English and Latvian languages.

## Deployment Status
✅ **Ready for GitHub Pages** - Static build output generated in `dist/public/` with proper base path configuration for project sites (`/AgeCalculator/`)

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod schema validation
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns library for precise date calculations and formatting
- **Routing**: Wouter for lightweight client-side routing
- **Internationalization**: Custom translation system supporting English and Latvian

## Build & Deployment
- **Build Tool**: Vite with production-optimized output
- **Output**: Static HTML/CSS/JS in `dist/public/` for GitHub Pages
- **Base Path**: Configured for project sites (`/AgeCalculator/`)
- **Hosting**: GitHub Pages compatible static deployment

## Development & Build
- **Build Process**: Vite for optimized frontend bundling
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)
- **Development Tools**: Replit integration with cartographer plugin and runtime error overlay
- **Scripts**:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run check` - Type checking

## Key Features
- ✅ Bilingual support (English + Latvian) with persistent language selection
- ✅ Dark/Light theme toggle with persistent preference
- ✅ Calendar date pickers with Monday as first day of week
- ✅ Precise age calculation (years, months, days, total days/weeks)
- ✅ Form validation with error messages
- ✅ Copy-to-clipboard sharing functionality
- ✅ Fully responsive design
- ✅ All calculations performed locally in browser (no server calls)

## GitHub Pages Deployment
Ready to deploy to GitHub Pages as a static site:
1. Built static files in `dist/public/` with index.html
2. Base path configured for project sites
3. See README.md for detailed deployment instructions