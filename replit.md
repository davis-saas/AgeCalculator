# Overview

This is a full-stack web application built with React, TypeScript, and Express.js that serves as an age calculator tool. The application allows users to input birth dates and target dates to calculate precise age differences in years, months, days, and other time units. It features a modern UI built with shadcn/ui components and Tailwind CSS, with a PostgreSQL database managed through Drizzle ORM for data persistence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Hook Form for form validation with Zod schema validation
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Date Handling**: date-fns library for date calculations and formatting

## Backend Architecture
- **Server**: Express.js with TypeScript running in ESM mode
- **API Structure**: RESTful API with routes prefixed under `/api`
- **Request Handling**: Express middleware for JSON parsing and request logging
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reload with tsx and Vite integration

## Data Storage
- **Database**: PostgreSQL with connection via @neondatabase/serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations with schema defined in shared directory
- **Current Storage**: In-memory storage implementation with interface pattern for easy database integration

## Authentication & Authorization
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **User Schema**: Basic user model with username/password fields
- **Storage Interface**: Abstracted storage layer supporting user CRUD operations

## Development & Build
- **Monorepo Structure**: Shared TypeScript definitions between client and server
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, etc.)
- **Development Tools**: Replit integration with cartographer plugin and runtime error overlay

## External Dependencies

- **Database**: Neon PostgreSQL serverless database
- **UI Components**: Radix UI primitives for accessible component foundations
- **Validation**: Zod for runtime type checking and form validation
- **Date Utilities**: date-fns for comprehensive date manipulation
- **Build Tools**: Vite for frontend development and bundling, esbuild for backend compilation
- **Development**: Replit-specific plugins for enhanced development experience
- **Styling**: Tailwind CSS with PostCSS for utility-first styling approach