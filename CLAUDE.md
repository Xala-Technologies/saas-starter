# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

### Essential Commands
```bash
# Install dependencies (use pnpm)
pnpm install

# Development server with Turbopack
pnpm dev

# Build the application
pnpm build

# Run linting
pnpm lint

# Run Storybook
pnpm storybook

# Database migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate
```

### Testing and Verification
```bash
# Run build to verify TypeScript compilation
pnpm build

# Check TypeScript types without building
pnpm tsc --noEmit

# Run Storybook for component testing
pnpm storybook
```

## High-Level Architecture

### Technology Stack
- **Next.js 15.4.5** with App Router and Turbopack
- **TypeScript** with strict mode enabled
- **tRPC** for type-safe API routes
- **Prisma** ORM with PostgreSQL (Supabase)
- **NextAuth.js** for authentication with email provider
- **Tailwind CSS** with enhanced design token system
- **@xala-technologies/ui-system@4.7.1** for enterprise UI components
- **Inngest** for background jobs and event handling
- **AI Integration** with OpenAI, Anthropic, Perplexity, and Google Gemini

### Directory Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes (auth, inngest, trpc, upload)
│   ├── auth/           # Authentication pages
│   └── test-xala-*/    # Xala UI component test pages
├── components/         # React components
│   └── debug/          # Testing/debug components
├── lib/                # Core utilities and configuration
│   ├── api/            # tRPC routers and configuration
│   ├── auth/           # NextAuth configuration
│   ├── email/          # Email sending utilities
│   ├── utils/          # Shared utilities
│   └── zod/            # Zod schemas
└── stories/            # Storybook stories
```

### Database Architecture
- **Prisma Schema**: `prisma/schema.prisma`
- **Models**: User, Account, Session, Allowlist, VerificationToken
- **User Roles**: `user` and `admin` enum
- **Migrations**: Use `pnpm prisma migrate dev` (never use `db push`)

### Authentication System
- **NextAuth.js** with Prisma adapter
- **Email Provider** using Resend for magic links
- **Session Strategy**: Database sessions
- **Protected Routes**: Use `protectedProcedure` in tRPC
- **Admin Routes**: Commented out `adminProcedure` available

### tRPC Architecture
- **Root Router**: `src/lib/api/root.ts`
- **Context**: `src/lib/api/trpc.ts` with session handling
- **Procedures**: `publicProcedure` and `protectedProcedure`
- **Client Access**: Use `@/lib/trpc/react` in components
- **Type Safety**: Full end-to-end type safety with Zod validation

### UI System Integration
- **Direct Usage**: Import components directly from `@xala-technologies/ui-system`
- **NO Custom Wrappers**: Use Xala components without wrapping
- **Theme Provider**: XalaThemeProvider with enterprise theme
- **Design Tokens**: Use Xala's built-in tokens exclusively
- **Current Status**: Button component fully migrated, form components next

### AI Integration
- **Primary Function**: `generateChatCompletion()` in `src/lib/aiClient.ts`
- **Default Model**: O1 with high reasoning effort
- **Available Models**: OpenAI (O1, GPT-4o), Anthropic (Sonnet), Perplexity, Gemini
- **Web Grounding**: Use `generateGeminiWebResponse()` for factual responses
- **JSON Parsing**: Use `parseJsonResponse()` for structured AI responses

### Background Jobs with Inngest
- **Configuration**: `inngest.config.ts`
- **Event Types**: Strongly typed in `AppEvents`
- **Functions**: `userRegisteredFn`, `messageHandlerFn`
- **API Route**: `src/app/api/inngest/handler.ts`
- **Usage Pattern**: Poll for updates, don't rely on tRPC success response

### File Storage
- **AWS S3**: Configured in `src/lib/storage.ts`
- **Upload Route**: `src/app/api/upload/route.ts`
- **Environment**: AWS credentials and bucket name in `.env`

## Development Guidelines

### Component Development
- Use functional components with `"use client"` if needed
- Name components in PascalCase under `src/components/`
- Keep components small and typed with interfaces
- Use Xala UI components directly - NO custom UI components
- For icons, prefer `lucide-react` with PascalCase naming

### Styling Guidelines
- Use Tailwind CSS with mobile-first approach
- Dark mode support with `dark:` prefix
- Use Xala's design tokens - NO hardcoded values
- Professional sizing: buttons min h-12, inputs min h-14
- Modern borders: rounded-lg or higher
- Professional shadows: shadow-md or higher

### Database Best Practices
- snake_case table names → camelCase field names
- Always use Prisma migrations, never raw SQL
- Run `pnpm prisma migrate dev` for schema changes
- Use transactions for multi-table operations

### API Development with tRPC
- Create routers in `src/lib/api/routers/`
- Compose routers in `src/lib/api/root.ts`
- Use Zod for input validation
- Return meaningful error messages
- Handle errors gracefully with try-catch

### TypeScript Standards
- Strict mode enabled - avoid `any` types
- Use optional chaining and nullish coalescing
- Prefer union types over enums
- Explicit return types for components: `: JSX.Element`
- Readonly interfaces for component props

### Toast Notifications
- Use `react-toastify` in client components
- Import toast methods: `toast.success()`, `toast.error()`
- Provide meaningful feedback messages
- Handle loading states appropriately

## Critical Reminders

### After Making Changes
1. **Always run build**: `pnpm build` - fix any TypeScript errors
2. **Update `.cursor-updates`**: Add one-sentence summary of changes
3. **Commit changes**: `git add . && git commit -m "message"` (don't push)

### UI System Migration
- **Current Phase**: Button migrated, working on form components
- **Import Pattern**: `import { Button } from '@xala-technologies/ui-system'`
- **Test Page**: `/test-xala-components` for testing migrations
- **Cleanup**: Remove custom components after migration

### Environment Variables
- **Required**: See `.env.example` for all required variables
- **GitHub Token**: Required for @xala-technologies package access
- **Database URLs**: Both DATABASE_URL and DIRECT_URL needed
- **AI Keys**: Configure based on which AI providers you use

### Common Pitfalls to Avoid
- Don't use `npx prisma db push` - always use migrations
- Don't create custom UI components - use Xala UI System
- Don't hardcode colors or spacing - use design tokens
- Don't forget to run build before committing
- Don't use inline styles - always use Tailwind classes

## AI-Specific Instructions

When using AI tools for code generation:
1. Reference the correct import path for Xala UI: `@xala-technologies/ui-system`
2. Follow the established patterns in existing code
3. Use `generateChatCompletion` for all AI calls
4. Prefer O1 model with high reasoning effort
5. Handle errors gracefully and provide user feedback
6. Use toast notifications for async operations


#### Enhanced Design Token System (CRITICAL)
- **MANDATORY Design Token Usage** - ALL components MUST use design tokens exclusively
- **NO hardcoded styling permitted** - no arbitrary values like `text-[18px]` or `bg-[#f0f0f0]`
- **NO inline styles** - Never use `style={{ }}` attribute
- **NO direct className for styling** - Use semantic components with design tokens
- **WCAG 2.2 AAA Compliance**: All colors, spacing, and typography meet enhanced accessibility standards
- **Enhanced 8pt Grid System**: All spacing follows 8px increments for better visual hierarchy
- **Component Tokens**: Pre-configured styling variants for consistent UI components
- **Professional sizing standards** (Enhanced 8pt Grid):
  - Button heights: `spacing[11]` (44px), `spacing[12]` (48px), `spacing[14]` (56px), `spacing[16]` (64px)
  - Input height: `spacing[14]` (56px) or `spacing[16]` (64px) - WCAG compliant
  - Card padding: `spacing[8]` (32px) or `spacing[10]` (40px) - Enhanced for accessibility
  - Section spacing: `spacing[16]` (64px) or `spacing[20]` (80px) - Improved visual hierarchy
  - Gap spacing: `spacing[4]` (16px), `spacing[6]` (24px), `spacing[8]` (32px)
  - Border radius: `borderRadius.lg`, `borderRadius.xl`, `borderRadius['2xl']`
  - Shadows: `shadows.md`, `shadows.lg`, `shadows.xl` - Enhanced depth perception

#### Styling Patterns
```typescript
// ❌ FORBIDDEN Styling Patterns
className="p-4 mb-6 text-blue-600 bg-gray-100 h-12 w-64"  // Hardcoded values
style={{ padding: '16px', margin: '24px' }}               // Inline styles
className="text-[18px] bg-[#f0f0f0]"                      // Arbitrary values
<div className="flex flex-col">                            // Raw HTML elements
className="bg-gradient-to-r from-blue-500 to-purple-600"  // Hardcoded gradients
className="text-neutral-600"                              // Hardcoded colors

// ✅ REQUIRED Styling Patterns
import { Card, Stack, Text, Button } from '@xala-technologies/ui-system';

// Typography: Enhanced sizes with accessibility focus
variant="heading" size="3xl"        // Large headings
variant="body" size="lg"            // Body text - enhanced readability

// Spacing: Enhanced 8pt grid system
spacing="8"                         // 32px - enhanced padding
spacing="12"                        // 48px - enhanced section spacing

// Colors: Use design token references
variant="primary"                   // Primary button styling
variant="elevated"                  // Enhanced card styling
```
