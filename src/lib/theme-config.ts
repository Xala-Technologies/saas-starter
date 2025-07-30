/**
 * Theme Configuration for Xala UI System Integration
 * 
 * This file configures the primary theme and theme switching functionality
 * for the SaaS starter application using the Xala Technologies UI System.
 */

export type ThemeName = 
  | 'base'
  | 'bergen'
  | 'drammen'
  | 'ecommerce'
  | 'education'
  | 'enterprise'
  | 'finance'
  | 'healthcare'
  | 'oslo'
  | 'productivity';

export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  name: ThemeName;
  mode: ThemeMode;
  displayName: string;
  description: string;
  category: 'industry' | 'geographic' | 'general';
  recommendedFor: string[];
}

/**
 * Available theme configurations
 */
export const AVAILABLE_THEMES: Record<ThemeName, Omit<ThemeConfig, 'mode'>> = {
  enterprise: {
    name: 'enterprise',
    displayName: 'Enterprise',
    description: 'Professional theme designed for B2B SaaS applications',
    category: 'industry',
    recommendedFor: ['B2B SaaS', 'Business Tools', 'Corporate Dashboards', 'Internal Tools']
  },
  base: {
    name: 'base',
    displayName: 'Base',
    description: 'Clean, neutral foundation theme suitable for any application',
    category: 'general',
    recommendedFor: ['General Purpose', 'Prototyping', 'Minimal Branding', 'Startups']
  },
  finance: {
    name: 'finance',
    displayName: 'Finance',
    description: 'Trust-building theme for financial services and fintech',
    category: 'industry',
    recommendedFor: ['Fintech', 'Banking', 'Investment Platforms', 'Accounting Software']
  },
  productivity: {
    name: 'productivity',
    displayName: 'Productivity',
    description: 'Focus-enhancing theme for task management and workflow tools',
    category: 'industry',
    recommendedFor: ['Project Management', 'Task Tools', 'Collaboration Platforms', 'Workflow Apps']
  },
  healthcare: {
    name: 'healthcare',
    displayName: 'Healthcare',
    description: 'Calming, accessible theme for medical and health applications',
    category: 'industry',
    recommendedFor: ['Patient Portals', 'Medical Dashboards', 'Health Tracking', 'Telemedicine']
  },
  education: {
    name: 'education',
    displayName: 'Education',
    description: 'Engaging theme designed for learning platforms and educational tools',
    category: 'industry',
    recommendedFor: ['LMS', 'Student Portals', 'Educational Dashboards', 'E-Learning']
  },
  ecommerce: {
    name: 'ecommerce',
    displayName: 'E-commerce',
    description: 'Conversion-optimized theme for online retail and marketplaces',
    category: 'industry',
    recommendedFor: ['Online Stores', 'Marketplaces', 'Product Catalogs', 'Checkout Flows']
  },
  oslo: {
    name: 'oslo',
    displayName: 'Oslo',
    description: 'Professional Norwegian capital-inspired theme',
    category: 'geographic',
    recommendedFor: ['Government', 'Official Platforms', 'Nordic Design', 'Professional Services']
  },
  bergen: {
    name: 'bergen',
    displayName: 'Bergen',
    description: 'Maritime-inspired theme from Norwegian coastal city',
    category: 'geographic',
    recommendedFor: ['Maritime Industry', 'Coastal Applications', 'Travel Platforms', 'Nordic Design']
  },
  drammen: {
    name: 'drammen',
    displayName: 'Drammen',
    description: 'Nature-inspired theme from Norwegian river city',
    category: 'geographic',
    recommendedFor: ['Environmental Apps', 'Outdoor Industry', 'Nature Platforms', 'Nordic Design']
  }
};

/**
 * Primary theme configuration for the SaaS starter
 */
export const PRIMARY_THEME: ThemeName = 'enterprise';

/**
 * Default theme mode (light/dark)
 */
export const DEFAULT_THEME_MODE: ThemeMode = 'light';

/**
 * Theme selection rationale documentation
 */
export const THEME_SELECTION_RATIONALE = {
  primary: PRIMARY_THEME,
  reasons: [
    'Perfect alignment with B2B SaaS applications',
    'Professional appearance builds trust with business users',
    'Versatile across various business domains',
    'Scalable from startup to enterprise',
    'Industry-standard design patterns',
    'High contrast for accessibility compliance'
  ],
  alternatives: [
    {
      theme: 'base' as ThemeName,
      reason: 'Most flexible for custom branding and future customization'
    },
    {
      theme: 'productivity' as ThemeName,
      reason: 'Excellent for workflow and task management features'
    }
  ]
};

/**
 * Theme provider configuration
 */
export const THEME_PROVIDER_CONFIG = {
  primaryTheme: PRIMARY_THEME,
  defaultMode: DEFAULT_THEME_MODE,
  enableSystemPreference: true,
  enableThemeSwitching: true,
  persistThemePreference: true,
  storageKey: 'xala-ui-theme-preference'
};

/**
 * Get theme configuration by name
 */
export function getThemeConfig(name: ThemeName, mode: ThemeMode = DEFAULT_THEME_MODE): ThemeConfig {
  const baseConfig = AVAILABLE_THEMES[name];
  return {
    ...baseConfig,
    mode
  };
}

/**
 * Get all available themes grouped by category
 */
export function getThemesByCategory() {
  const themes = Object.values(AVAILABLE_THEMES);
  return {
    industry: themes.filter(theme => theme.category === 'industry'),
    geographic: themes.filter(theme => theme.category === 'geographic'),
    general: themes.filter(theme => theme.category === 'general')
  };
}

/**
 * Check if a theme is recommended for a specific use case
 */
export function isThemeRecommendedFor(themeName: ThemeName, useCase: string): boolean {
  const theme = AVAILABLE_THEMES[themeName];
  return theme.recommendedFor.some(rec => 
    rec.toLowerCase().includes(useCase.toLowerCase()) ||
    useCase.toLowerCase().includes(rec.toLowerCase())
  );
}

/**
 * Get recommended themes for a specific use case
 */
export function getRecommendedThemes(useCase: string): ThemeName[] {
  return Object.keys(AVAILABLE_THEMES).filter(themeName => 
    isThemeRecommendedFor(themeName as ThemeName, useCase)
  ) as ThemeName[];
}
