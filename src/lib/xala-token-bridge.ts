/**
 * Xala Token Bridge
 * 
 * This module provides a compatibility layer between our existing design tokens
 * and the Xala UI System tokens, enabling gradual migration without breaking changes.
 */

'use client';

import { useCallback } from 'react';
import { 
  SpacingToken, 
  SemanticColorToken, 
  FontSizeToken,
  BorderRadiusToken,
  ShadowToken,
  ButtonHeightToken,
  InputHeightToken,
  CardPaddingToken,
  SectionPaddingToken,
  GapToken
} from './design-tokens';

// Type definitions for Xala token mapping
interface XalaTokenMapping {
  spacing: Record<string, string>;
  colors: Record<string, string>;
  typography: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  components: {
    button: Record<string, string>;
    input: Record<string, string>;
    card: Record<string, string>;
    section: Record<string, string>;
    gap: Record<string, string>;
  };
}

/**
 * Static token mappings from our system to Xala system
 */
const TOKEN_MAPPINGS: XalaTokenMapping = {
  // Spacing token mappings
  spacing: {
    '0': 'space-0',
    '1': 'space-1',
    '2': 'space-2',
    '3': 'space-3',
    '4': 'space-4',
    '5': 'space-5',
    '6': 'space-6',
    '7': 'space-7',
    '8': 'space-8',
    '9': 'space-9',
    '10': 'space-10',
    '11': 'space-11',
    '12': 'space-12',
    '16': 'space-16',
    '20': 'space-20',
    '24': 'space-24',
    '32': 'space-32',
    '40': 'space-40',
    '48': 'space-48',
    '56': 'space-56',
    '64': 'space-64',
    '72': 'space-72',
    '80': 'space-80',
    '96': 'space-96'
  },

  // Color token mappings (Enterprise theme)
  colors: {
    // Surface colors
    'background': 'surface-background',
    'foreground': 'surface-foreground',
    'card': 'surface-card',
    'card-foreground': 'surface-card-foreground',
    'popover': 'surface-popover',
    'popover-foreground': 'surface-popover-foreground',
    
    // Brand colors
    'primary': 'brand-primary',
    'primary-foreground': 'brand-primary-foreground',
    'secondary': 'brand-secondary',
    'secondary-foreground': 'brand-secondary-foreground',
    'accent': 'brand-accent',
    'accent-foreground': 'brand-accent-foreground',
    
    // Semantic colors
    'success': 'semantic-success',
    'success-foreground': 'semantic-success-foreground',
    'warning': 'semantic-warning',
    'warning-foreground': 'semantic-warning-foreground',
    'destructive': 'semantic-error',
    'destructive-foreground': 'semantic-error-foreground',
    'info': 'semantic-info',
    'info-foreground': 'semantic-info-foreground',
    
    // Interactive colors
    'muted': 'interactive-muted',
    'muted-foreground': 'interactive-muted-foreground',
    'border': 'interactive-border',
    'input': 'interactive-input',
    'ring': 'interactive-ring'
  },

  // Typography token mappings
  typography: {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl'
  },

  // Border radius mappings
  borderRadius: {
    'none': 'radius-none',
    'sm': 'radius-sm',
    'md': 'radius-md',
    'lg': 'radius-lg',
    'xl': 'radius-xl',
    '2xl': 'radius-2xl',
    '3xl': 'radius-3xl',
    'full': 'radius-full'
  },

  // Shadow mappings
  shadows: {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl',
    '2xl': 'shadow-2xl',
    'inner': 'shadow-inner'
  },

  // Component-specific mappings
  components: {
    button: {
      'button-sm': 'component-button-height-sm',
      'button-md': 'component-button-height-md',
      'button-lg': 'component-button-height-lg',
      'button-xl': 'component-button-height-xl'
    },
    input: {
      'input-md': 'component-input-height-md',
      'input-lg': 'component-input-height-lg'
    },
    card: {
      'card-sm': 'component-card-padding-sm',
      'card-md': 'component-card-padding-md',
      'card-lg': 'component-card-padding-lg'
    },
    section: {
      'section-sm': 'component-section-padding-sm',
      'section-md': 'component-section-padding-md',
      'section-lg': 'component-section-padding-lg'
    },
    gap: {
      'component': 'layout-gap-component',
      'section': 'layout-gap-section',
      'layout': 'layout-gap-layout'
    }
  }
};

/**
 * Hook for bridging our design tokens to Xala tokens
 */
export function useXalaTokenBridge() {
  // Spacing token bridge
  const spacing = useCallback((token: SpacingToken): string => {
    const xalaToken = TOKEN_MAPPINGS.spacing[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for spacing token: ${token}`);
      return `space-${token}`; // Fallback
    }
    return xalaToken;
  }, []);

  // Color token bridge
  const color = useCallback((token: SemanticColorToken): string => {
    const xalaToken = TOKEN_MAPPINGS.colors[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for color token: ${token}`);
      return token; // Fallback to original token
    }
    return xalaToken;
  }, []);

  // Typography token bridge
  const typography = useCallback((token: FontSizeToken): string => {
    const xalaToken = TOKEN_MAPPINGS.typography[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for typography token: ${token}`);
      return `text-${token}`; // Fallback
    }
    return xalaToken;
  }, []);

  // Border radius token bridge
  const borderRadius = useCallback((token: BorderRadiusToken): string => {
    const xalaToken = TOKEN_MAPPINGS.borderRadius[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for border radius token: ${token}`);
      return `rounded-${token}`; // Fallback
    }
    return xalaToken;
  }, []);

  // Shadow token bridge
  const shadow = useCallback((token: ShadowToken): string => {
    const xalaToken = TOKEN_MAPPINGS.shadows[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for shadow token: ${token}`);
      return `shadow-${token}`; // Fallback
    }
    return xalaToken;
  }, []);

  // Component token bridges
  const buttonHeight = useCallback((token: ButtonHeightToken): string => {
    const xalaToken = TOKEN_MAPPINGS.components.button[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for button height token: ${token}`);
      return `h-${token.replace('button-', '')}`; // Fallback
    }
    return xalaToken;
  }, []);

  const inputHeight = useCallback((token: InputHeightToken): string => {
    const xalaToken = TOKEN_MAPPINGS.components.input[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for input height token: ${token}`);
      return `h-${token.replace('input-', '')}`; // Fallback
    }
    return xalaToken;
  }, []);

  const cardPadding = useCallback((token: CardPaddingToken): string => {
    const xalaToken = TOKEN_MAPPINGS.components.card[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for card padding token: ${token}`);
      return `p-${token.replace('card-', '')}`; // Fallback
    }
    return xalaToken;
  }, []);

  const sectionPadding = useCallback((token: SectionPaddingToken): string => {
    const xalaToken = TOKEN_MAPPINGS.components.section[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for section padding token: ${token}`);
      return `p-${token.replace('section-', '')}`; // Fallback
    }
    return xalaToken;
  }, []);

  const gap = useCallback((token: GapToken): string => {
    const xalaToken = TOKEN_MAPPINGS.components.gap[token];
    if (!xalaToken) {
      console.warn(`No Xala mapping found for gap token: ${token}`);
      return `gap-${token}`; // Fallback
    }
    return xalaToken;
  }, []);

  return {
    spacing,
    color,
    typography,
    borderRadius,
    shadow,
    buttonHeight,
    inputHeight,
    cardPadding,
    sectionPadding,
    gap,
    
    // Utility functions
    getMapping: (category: keyof XalaTokenMapping) => TOKEN_MAPPINGS[category],
    getAllMappings: () => TOKEN_MAPPINGS,
    
    // CSS custom property generators
    toCSSVar: (token: string) => `var(--xala-${token})`,
    toTailwindClass: (category: string, token: string) => `${category}-${token}`
  };
}

/**
 * Static utility functions for use outside of React components
 */
export const xalaTokenBridge = {
  spacing: (token: SpacingToken): string => {
    return TOKEN_MAPPINGS.spacing[token] || `space-${token}`;
  },
  
  color: (token: SemanticColorToken): string => {
    return TOKEN_MAPPINGS.colors[token] || token;
  },
  
  typography: (token: FontSizeToken): string => {
    return TOKEN_MAPPINGS.typography[token] || `text-${token}`;
  },
  
  borderRadius: (token: BorderRadiusToken): string => {
    return TOKEN_MAPPINGS.borderRadius[token] || `rounded-${token}`;
  },
  
  shadow: (token: ShadowToken): string => {
    return TOKEN_MAPPINGS.shadows[token] || `shadow-${token}`;
  }
};

/**
 * Migration helper to check if a token has been migrated
 */
export function isTokenMigrated(category: keyof XalaTokenMapping, token: string): boolean {
  const categoryMapping = TOKEN_MAPPINGS[category];
  if (typeof categoryMapping === 'object' && 'button' in categoryMapping) {
    // Handle component mappings
    return Object.values(categoryMapping).some(subMapping => 
      typeof subMapping === 'object' && subMapping[token] !== undefined
    );
  }
  // Handle direct mappings
  return (categoryMapping as Record<string, string>)[token] !== undefined;
}

/**
 * Get all unmigrated tokens for a category
 */
export function getUnmigratedTokens(category: keyof XalaTokenMapping, allTokens: string[]): string[] {
  return allTokens.filter(token => !isTokenMigrated(category, token));
}

/**
 * Migration progress tracker
 */
export function getMigrationProgress(): {
  category: keyof XalaTokenMapping;
  total: number;
  migrated: number;
  percentage: number;
}[] {
  return Object.entries(TOKEN_MAPPINGS).map(([category, mappings]) => {
    const total = Object.keys(mappings).length;
    const migrated = Object.values(mappings).filter(Boolean).length;
    
    return {
      category: category as keyof XalaTokenMapping,
      total,
      migrated,
      percentage: Math.round((migrated / total) * 100)
    };
  });
}
