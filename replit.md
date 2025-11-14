# Todo Application

## Overview

A modern, minimalist todo application built with a full-stack TypeScript architecture. The application follows a Linear/Notion-inspired design system, prioritizing clarity and efficiency in task management. The frontend uses React with shadcn/ui components, while the backend runs on Express with Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing (alternative to React Router)
- **TanStack Query (React Query)** for server state management, data fetching, and caching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **class-variance-authority** for variant-based component styling
- Components follow a "New York" style variant with customized spacing and border radius

**Design System**
- Custom color system using HSL values with CSS variables for theming
- Typography: Inter font family via Google Fonts
- Spacing: Tailwind's default scale (2, 4, 6, 8, 12, 16)
- Border radius: Custom values (9px for lg, 6px for md, 3px for sm)
- Maximum content width: 2xl (672px) for centered layouts

**Form Handling**
- **React Hook Form** for form state management
- **Zod** for runtime validation and type inference
- **@hookform/resolvers** to integrate Zod schemas with React Hook Form

**State Management Approach**
- Server state: TanStack Query with optimistic updates and cache invalidation
- Local UI state: React hooks (useState, useContext)
- No global state management library needed due to simple application scope

### Backend Architecture

**Server Framework**
- **Express.js** as the HTTP server
- **TypeScript** with ES modules for type safety
- Custom middleware for JSON parsing with raw body preservation
- Request/response logging middleware for API endpoints

**API Design**
- RESTful endpoints under `/api` prefix
- JSON request/response format
- Standard HTTP status codes (200, 201, 400, 500)
- Error responses include structured error objects with descriptive messages

**Data Layer**
- **Drizzle ORM** configured for PostgreSQL
- **@neondatabase/serverless** as the database driver
- Schema-first approach with TypeScript type inference
- Migrations directory: `./migrations`

**Storage Abstraction**
- `IStorage` interface defines data access methods
- `MemStorage` provides in-memory implementation for development/testing
- Interface supports future database-backed implementations
- UUID-based entity IDs using Node.js crypto module

**Database Schema**
- **Users table**: id (UUID), username (unique), password
- **Todos table**: id (UUID), title (text, required)
- Both tables use `gen_random_uuid()` for default ID generation

**Validation Strategy**
- Shared Zod schemas between frontend and backend via `shared/schema.ts`
- `drizzle-zod` generates insert schemas from database schema
- Custom refinements for business logic (e.g., trimming, minimum length)

### Build & Development

**Development Mode**
- Vite dev server with HMR (Hot Module Replacement)
- Server runs with `tsx` for TypeScript execution without compilation
- Replit-specific plugins for error overlays and development banners

**Production Build**
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- ES module output format for Node.js compatibility
- External packages not bundled to reduce build size

**Path Aliases**
- `@/*` → `client/src/*` for frontend imports
- `@shared/*` → `shared/*` for shared code between frontend and backend
- `@assets/*` → `attached_assets/*` for static assets

### Project Structure Rationale

**Monorepo Organization**
- `client/`: Frontend React application
- `server/`: Backend Express application  
- `shared/`: Code shared between frontend and backend (schemas, types)
- Co-location enables type sharing and reduces duplication

**Shared Schema Pattern**
- Single source of truth for data models
- Type inference flows from database schema → Zod schemas → TypeScript types
- Frontend and backend use identical validation rules

## External Dependencies

### Database
- **PostgreSQL** via Neon serverless driver
- Connection configured through `DATABASE_URL` environment variable
- Drizzle Kit for schema migrations

### UI Component Libraries
- **Radix UI**: Headless, accessible component primitives (20+ components)
- **Lucide React**: Icon library for consistent iconography
- **cmdk**: Command palette component
- **Embla Carousel**: Carousel/slider functionality
- **Vaul**: Drawer component
- **React Day Picker**: Calendar/date picker
- **Recharts**: Charting library (configured but not actively used)

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay in Replit
- **@replit/vite-plugin-cartographer**: Code navigation in Replit
- **@replit/vite-plugin-dev-banner**: Development environment indicator

### Styling & Utilities
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with Autoprefixer
- **clsx** & **tailwind-merge**: Class name merging utilities
- **date-fns**: Date manipulation and formatting

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express (configured but authentication not implemented)