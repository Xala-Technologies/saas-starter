/**
 * Enhanced Design Token System
 * WCAG 2.2 AAA Compliant Design Tokens
 * 
 * This file contains TypeScript interfaces and utilities for the design token system.
 * All components MUST use these tokens exclusively - NO hardcoded values allowed.
 */

// Enhanced 8pt Grid System Types
export type SpacingToken = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20'
  | '24' | '28' | '32' | '36' | '40' | '44' | '48' | '52' | '56' | '60'
  | '64' | '72' | '80' | '96';

// Professional Component Heights (WCAG Compliant)
export type ButtonHeightToken = 'button-sm' | 'button-md' | 'button-lg' | 'button-xl';
export type InputHeightToken = 'input-md' | 'input-lg';

// Card and Section Padding Tokens
export type CardPaddingToken = 'card-sm' | 'card-md' | 'card-lg';
export type SectionPaddingToken = 'section-sm' | 'section-md' | 'section-lg';

// Gap Spacing Tokens
export type GapToken = 'component' | 'section' | 'layout';

// Typography Scale Tokens
export type FontSizeToken = 
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' 
  | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

// Border Radius Tokens
export type BorderRadiusToken = 
  | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

// Shadow Tokens
export type ShadowToken = 
  | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

// Semantic Color Tokens
export type SemanticColorToken = 
  | 'background' | 'foreground' | 'card' | 'card-foreground'
  | 'popover' | 'popover-foreground' | 'primary' | 'primary-foreground'
  | 'secondary' | 'secondary-foreground' | 'muted' | 'muted-foreground'
  | 'accent' | 'accent-foreground' | 'destructive' | 'destructive-foreground'
  | 'success' | 'success-foreground' | 'warning' | 'warning-foreground'
  | 'info' | 'info-foreground' | 'border' | 'input' | 'ring';

// Color Scale Tokens
export type ColorScaleToken = 
  | '50' | '100' | '200' | '300' | '400' | '500' 
  | '600' | '700' | '800' | '900' | '950';

// Neutral Color Tokens (WCAG AAA Compliant)
export type NeutralColorToken = 
  | '0' | '50' | '100' | '200' | '300' | '400' | '500' 
  | '600' | '700' | '800' | '900' | '950' | '1000';

/**
 * Design Token Utilities
 */
export const designTokens = {
  // Professional sizing standards
  buttonHeights: {
    'button-sm': '44px',  // Minimum WCAG touch target
    'button-md': '48px',  // Standard button
    'button-lg': '56px',  // Large button
    'button-xl': '64px',  // Extra large button
  } as const,

  inputHeights: {
    'input-md': '56px',   // Standard input
    'input-lg': '64px',   // Large input
  } as const,

  cardPadding: {
    'card-sm': '32px',    // spacing[8]
    'card-md': '40px',    // spacing[10]
    'card-lg': '48px',    // spacing[12]
  } as const,

  sectionPadding: {
    'section-sm': '64px', // spacing[16]
    'section-md': '80px', // spacing[20]
    'section-lg': '96px', // spacing[24]
  } as const,

  gaps: {
    'component': '16px',  // spacing[4]
    'section': '24px',    // spacing[6]
    'layout': '32px',     // spacing[8]
  } as const,
} as const;

/**
 * Component Variant Types using class-variance-authority pattern
 */
export interface ComponentVariants {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info';
  radius?: BorderRadiusToken;
  shadow?: ShadowToken;
}

/**
 * Utility function to generate Tailwind classes using design tokens
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Type-safe design token class generators
 */
export const tokens = {
  spacing: (token: SpacingToken) => `spacing-${token}`,
  fontSize: (token: FontSizeToken) => `text-${token}`,
  borderRadius: (token: BorderRadiusToken) => `rounded-${token}`,
  shadow: (token: ShadowToken) => `shadow-${token}`,
  buttonHeight: (token: ButtonHeightToken) => `h-${token}`,
  inputHeight: (token: InputHeightToken) => `h-${token}`,
  cardPadding: (token: CardPaddingToken) => `p-${token}`,
  sectionPadding: (token: SectionPaddingToken) => `p-${token}`,
  gap: (token: GapToken) => `gap-${token}`,
} as const;

/**
 * WCAG AAA Compliance Utilities
 */
export const wcagCompliance = {
  // Minimum touch target size (44px x 44px)
  minTouchTarget: 'min-h-button-sm min-w-button-sm',
  
  // Focus indicators
  focusRing: 'focus:ring-2 focus:ring-ring focus:ring-offset-2',
  
  // High contrast borders
  accessibleBorder: 'border border-border',
  
  // Accessible text contrast
  highContrastText: 'text-foreground',
  
  // Screen reader only content
  srOnly: 'sr-only',
} as const;

/**
 * Forbidden Patterns - These should NEVER be used
 */
export const FORBIDDEN_PATTERNS = {
  // ❌ NEVER use these patterns
  hardcodedColors: ['text-blue-600', 'bg-gray-100', 'border-red-500'],
  arbitraryValues: ['text-[18px]', 'bg-[#f0f0f0]', 'p-[16px]'],
  inlineStyles: 'style={{ }}',
  rawHtmlElements: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  hardcodedSpacing: ['p-4', 'mb-6', 'mt-8'],
  hardcodedSizing: ['h-12', 'w-64'],
} as const;

/**
 * Approved Patterns - Use these instead
 */
export const APPROVED_PATTERNS = {
  // ✅ Use semantic color tokens
  semanticColors: ['bg-background', 'text-foreground', 'border-border'],
  
  // ✅ Use design token spacing
  designTokenSpacing: ['p-card-md', 'gap-component', 'space-y-section'],
  
  // ✅ Use component heights
  componentSizing: ['h-button-md', 'h-input-lg'],
  
  // ✅ Use semantic components
  semanticComponents: ['<Card>', '<Button>', '<Input>', '<Typography>'],
} as const;
