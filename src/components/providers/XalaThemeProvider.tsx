/**
 * Xala Theme Provider Integration
 * 
 * This component integrates the Xala UI System with Next.js theme provider
 * and provides theme switching functionality with persistence.
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { DesignSystemProvider } from '@xala-technologies/ui-system';

// Available themes from @xala-technologies/ui-system
export type XalaThemeName = 
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

// Theme metadata for UI display
const THEME_METADATA: Record<XalaThemeName, {
  displayName: string;
  description: string;
  category: 'industry' | 'geographic' | 'general';
}> = {
  enterprise: {
    displayName: 'Enterprise',
    description: 'Professional theme designed for B2B SaaS applications',
    category: 'industry'
  },
  base: {
    displayName: 'Base',
    description: 'Clean, neutral foundation theme suitable for any application',
    category: 'general'
  },
  finance: {
    displayName: 'Finance',
    description: 'Trust-building theme for financial services and fintech',
    category: 'industry'
  },
  productivity: {
    displayName: 'Productivity',
    description: 'Focus-enhancing theme for task management and workflow tools',
    category: 'industry'
  },
  healthcare: {
    displayName: 'Healthcare',
    description: 'Calming, accessible theme for medical and health applications',
    category: 'industry'
  },
  education: {
    displayName: 'Education',
    description: 'Engaging theme designed for learning platforms and educational tools',
    category: 'industry'
  },
  ecommerce: {
    displayName: 'E-commerce',
    description: 'Conversion-optimized theme for online retail and marketplaces',
    category: 'industry'
  },
  oslo: {
    displayName: 'Oslo',
    description: 'Professional Norwegian capital-inspired theme',
    category: 'geographic'
  },
  bergen: {
    displayName: 'Bergen',
    description: 'Maritime-inspired theme from Norwegian coastal city',
    category: 'geographic'
  },
  drammen: {
    displayName: 'Drammen',
    description: 'Nature-inspired theme from Norwegian river city',
    category: 'geographic'
  }
};

interface XalaThemeContextType {
  currentTheme: XalaThemeName;
  themeMetadata: typeof THEME_METADATA[XalaThemeName];
  setTheme: (theme: XalaThemeName) => void;
  isLoading: boolean;
}

const XalaThemeContext = createContext<XalaThemeContextType | undefined>(undefined);

interface XalaThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: XalaThemeName;
  enableThemeSwitching?: boolean;
}

export function XalaThemeProvider({ 
  children, 
  defaultTheme = 'enterprise',
  enableThemeSwitching = true
}: XalaThemeProviderProps): React.JSX.Element {
  const { theme: nextTheme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<XalaThemeName>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  // Storage key for theme persistence
  const STORAGE_KEY = 'xala-ui-theme-preference';

  // Determine if dark mode based on next-themes
  const isDarkMode = React.useMemo(() => {
    const mode = nextTheme === 'system' ? systemTheme : nextTheme;
    return mode === 'dark';
  }, [nextTheme, systemTheme]);

  // Get theme metadata
  const themeMetadata = React.useMemo(() => 
    THEME_METADATA[currentTheme], 
    [currentTheme]
  );

  // Load persisted theme preference on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme && savedTheme in THEME_METADATA) {
          setCurrentTheme(savedTheme as XalaThemeName);
        }
      }
    } catch (err) {
      console.error('Failed to load theme preference:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist theme changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, currentTheme);
      }
    } catch (err) {
      console.error('Failed to persist theme preference:', err);
    }
  }, [currentTheme]);

  const setTheme = React.useCallback((theme: XalaThemeName) => {
    if (enableThemeSwitching && theme in THEME_METADATA) {
      setCurrentTheme(theme);
    }
  }, [enableThemeSwitching]);

  const contextValue: XalaThemeContextType = {
    currentTheme,
    themeMetadata,
    setTheme,
    isLoading
  };

  // Construct template ID for DesignSystemProvider
  const templateId = `${currentTheme}-${isDarkMode ? 'dark' : 'light'}`;

  return (
    <XalaThemeContext.Provider value={contextValue}>
      <DesignSystemProvider 
        templateId={templateId}
        initialDarkMode={isDarkMode}
        autoDetectDarkMode={false} // We handle dark mode via next-themes
      >
        {children}
      </DesignSystemProvider>
    </XalaThemeContext.Provider>
  );
}

/**
 * Hook to use Xala theme context
 */
export function useXalaTheme() {
  const context = useContext(XalaThemeContext);
  if (context === undefined) {
    throw new Error('useXalaTheme must be used within a XalaThemeProvider');
  }
  return context;
}

/**
 * Theme switching component
 */
export function ThemeSwitcher(): React.JSX.Element {
  const { currentTheme, setTheme, isLoading } = useXalaTheme();
  const { theme, setTheme: setNextTheme } = useTheme();
  
  const isDarkMode = theme === 'dark';

  if (isLoading) {
    return <div className="w-8 h-8 animate-pulse bg-gray-200 rounded"></div>;
  }

  const toggleMode = () => {
    setNextTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center gap-2">
      {/* Mode Toggle */}
      <button
        onClick={toggleMode}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Theme Selector */}
      <select
        value={currentTheme}
        onChange={(e) => setTheme(e.target.value as XalaThemeName)}
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        aria-label="Select theme"
      >
        {Object.entries(THEME_METADATA).map(([key, meta]) => (
          <option key={key} value={key}>
            {meta.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Theme info display component
 */
export function ThemeInfo(): React.JSX.Element {
  const { themeMetadata, isLoading } = useXalaTheme();
  const { theme } = useTheme();

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>;
  }

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      <span className="font-medium">{themeMetadata.displayName}</span>
      <span className="mx-2">•</span>
      <span className="capitalize">{theme === 'system' ? 'System' : theme}</span>
    </div>
  );
}

