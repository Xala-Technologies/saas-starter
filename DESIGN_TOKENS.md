# Enhanced Design Token System

## 🎯 Overview

This project implements a comprehensive **WCAG 2.2 AAA compliant design token system** with an enhanced 8pt grid system. All components **MUST** use design tokens exclusively - **NO hardcoded values are permitted**.

## 🚫 FORBIDDEN Patterns

### ❌ NEVER Use These Patterns

```tsx
// ❌ Hardcoded colors
className="text-blue-600 bg-gray-100 border-red-500"

// ❌ Arbitrary values  
className="text-[18px] bg-[#f0f0f0] p-[16px]"

// ❌ Inline styles
style={{ padding: '16px', margin: '24px' }}

// ❌ Raw HTML elements in pages
<div className="flex flex-col">
<span className="text-lg">
<p className="mb-4">

// ❌ Hardcoded spacing/sizing
className="p-4 mb-6 h-12 w-64"

// ❌ Hardcoded gradients
className="bg-gradient-to-r from-blue-500 to-purple-600"
```

## ✅ APPROVED Patterns

### ✅ Use These Patterns Instead

```tsx
// ✅ Semantic color tokens
className="bg-background text-foreground border-border"

// ✅ Design token spacing
className="p-card-md gap-component space-y-section"

// ✅ Component heights
className="h-button-md h-input-lg"

// ✅ Semantic components
<Card padding="md">
<Button variant="primary" size="lg">
<Typography variant="h1">
```

## 🎨 Design Token Categories

### 1. Enhanced 8pt Grid System

All spacing follows 8px increments for perfect visual hierarchy:

```tsx
// Spacing tokens (8px increments)
spacing: {
  0: "0px",     // 0px
  1: "8px",     // 8px  
  2: "16px",    // 16px
  3: "24px",    // 24px
  4: "32px",    // 32px
  5: "40px",    // 40px
  // ... up to 96: "768px"
}
```

### 2. Professional Component Heights (WCAG Compliant)

```tsx
// Button heights - WCAG minimum touch targets
'button-sm': '44px',  // Minimum WCAG touch target
'button-md': '48px',  // Standard button
'button-lg': '56px',  // Large button  
'button-xl': '64px',  // Extra large button

// Input heights - Accessible sizing
'input-md': '56px',   // Standard input
'input-lg': '64px',   // Large input
```

### 3. Card & Section Padding

```tsx
// Card padding (Enhanced for accessibility)
'card-sm': '32px',    // spacing[8]
'card-md': '40px',    // spacing[10] 
'card-lg': '48px',    // spacing[12]

// Section spacing (Improved visual hierarchy)
'section-sm': '64px', // spacing[16]
'section-md': '80px', // spacing[20]
'section-lg': '96px', // spacing[24]
```

### 4. Gap Spacing

```tsx
// Standard gap spacing
'component': '16px',  // spacing[4] - Between components
'section': '24px',    // spacing[6] - Between sections  
'layout': '32px',     // spacing[8] - Layout spacing
```

### 5. WCAG AAA Compliant Colors

All colors meet WCAG 2.2 AAA contrast requirements:

```tsx
// Semantic color tokens
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
    50: "hsl(var(--primary-50))",
    // ... full scale 50-950
  },
  // Status colors
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))", 
  destructive: "hsl(var(--destructive))",
  info: "hsl(var(--info))",
}
```

### 6. Typography Scale

Professional typography with consistent line heights:

```tsx
fontSize: {
  'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.025em' }],
  'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.025em' }],
  'base': ['16px', { lineHeight: '24px', letterSpacing: '0.025em' }],
  // ... up to '9xl'
}
```

## 🔧 Usage Examples

### Enhanced Button Component

```tsx
import { Button } from "@/components/Button";

// ✅ Correct usage with design tokens
<Button 
  variant="primary" 
  size="lg" 
  startIcon={<PlusIcon />}
  loading={isLoading}
>
  Create Account
</Button>

// ✅ All variants available
<Button variant="success" size="md">Success</Button>
<Button variant="warning" size="sm">Warning</Button>
<Button variant="destructive" size="xl">Delete</Button>
```

### Card Component Example

```tsx
// ✅ Using semantic padding tokens
<Card className="p-card-md space-y-component">
  <CardHeader className="pb-section">
    <Typography variant="h2">Card Title</Typography>
  </CardHeader>
  <CardContent className="space-y-component">
    <Typography variant="body">Content here</Typography>
  </CardContent>
</Card>
```

### Layout Spacing

```tsx
// ✅ Using gap tokens for consistent spacing
<div className="flex flex-col gap-section">
  <Section className="p-section-md">
    <div className="grid grid-cols-2 gap-component">
      <Card />
      <Card />
    </div>
  </Section>
</div>
```

## 🎯 Component Variants with CVA

Using `class-variance-authority` for type-safe variants:

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  // Base styles using design tokens
  ["rounded-xl shadow-md bg-card text-card-foreground"],
  {
    variants: {
      padding: {
        sm: "p-card-sm",
        md: "p-card-md", 
        lg: "p-card-lg",
      },
      shadow: {
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      }
    },
    defaultVariants: {
      padding: "md",
      shadow: "md",
    }
  }
);
```

## 🔍 WCAG 2.2 AAA Compliance Features

### Minimum Touch Targets
- All interactive elements meet 44px minimum size
- Button heights: `button-sm` (44px) to `button-xl` (64px)

### High Contrast Colors
- All color combinations meet WCAG AAA contrast ratios
- Semantic color tokens ensure consistency

### Focus Indicators
```tsx
// ✅ Built into all interactive components
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

### Accessible Typography
- Consistent line heights and letter spacing
- Professional typography scale
- High contrast text colors

## 📁 File Structure

```
src/
├── lib/
│   ├── design-tokens.ts     # TypeScript types and utilities
│   └── utils.ts            # cn() utility function
├── components/
│   ├── Button.tsx          # Enhanced button with design tokens
│   └── ui/                 # Other UI components
├── app/
│   └── globals.css         # CSS variables and design tokens
└── tailwind.config.ts      # Tailwind configuration
```

## 🛠️ Development Workflow

### 1. Always Use Design Tokens
```tsx
// ❌ Wrong
<div className="p-4 mb-6 text-blue-600">

// ✅ Correct  
<Card padding="md" className="mb-section text-primary">
```

### 2. Use Semantic Components
```tsx
// ❌ Wrong - Raw HTML
<div className="flex flex-col">
  <h1 className="text-2xl font-bold">Title</h1>
  <p className="text-gray-600">Description</p>
</div>

// ✅ Correct - Semantic components
<Section className="space-y-component">
  <Typography variant="h1">Title</Typography>
  <Typography variant="body" color="muted">Description</Typography>
</Section>
```

### 3. Type-Safe Variants
```tsx
// ✅ Use VariantProps for type safety
interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}
```

## 🚀 Benefits

1. **Consistency**: All components use the same design language
2. **Accessibility**: WCAG 2.2 AAA compliant by default
3. **Maintainability**: Changes to design tokens update entire system
4. **Type Safety**: TypeScript ensures correct token usage
5. **Performance**: No runtime style calculations
6. **Scalability**: Easy to extend and modify design system

## 📚 Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [8pt Grid System](https://spec.fm/specifics/8-pt-grid)
- [Class Variance Authority](https://cva.style/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Remember**: This design token system is **mandatory**. All components must use semantic design tokens exclusively. No hardcoded values are permitted.
