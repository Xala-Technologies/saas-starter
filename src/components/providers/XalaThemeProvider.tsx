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
import { 
  ThemeName, 
  ThemeMode, 
  ThemeConfig,
  PRIMARY_THEME,
  DEFAULT_THEME_MODE,
  THEME_PROVIDER_CONFIG,
  AVAILABLE_THEMES,
  getThemeConfig
} from '@/lib/theme-config';

interface XalaThemeContextType {
  currentTheme: ThemeName;
  currentMode: ThemeMode;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeName) => void;
  toggleMode: () => void;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

const XalaThemeContext = createContext<XalaThemeContextType | undefined>(undefined);

interface XalaThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  enableThemeSwitching?: boolean;
}

export function XalaThemeProvider({ 
  children, 
  defaultTheme = PRIMARY_THEME,
  enableThemeSwitching = THEME_PROVIDER_CONFIG.enableThemeSwitching
}: XalaThemeProviderProps) {
  const { theme: nextTheme, setTheme: setNextTheme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine current mode from next-themes
  const currentMode: ThemeMode = React.useMemo(() => {
    if (nextTheme === 'system') {
      return (systemTheme as ThemeMode) || DEFAULT_THEME_MODE;
    }
    return (nextTheme as ThemeMode) || DEFAULT_THEME_MODE;
  }, [nextTheme, systemTheme]);

  // Get current theme configuration
  const themeConfig = React.useMemo(() => 
    getThemeConfig(currentTheme, currentMode), 
    [currentTheme, currentMode]
  );

  // Load persisted theme preference on mount only
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && THEME_PROVIDER_CONFIG.persistThemePreference) {
        const savedTheme = localStorage.getItem(THEME_PROVIDER_CONFIG.storageKey);
        if (savedTheme && savedTheme !== defaultTheme) {
          // Validate theme before setting
          if (Object.keys(AVAILABLE_THEMES).includes(savedTheme)) {
            setCurrentTheme(savedTheme as ThemeName);
          } else {
            console.warn(`Invalid saved theme: ${savedTheme}, falling back to default`);
            localStorage.removeItem(THEME_PROVIDER_CONFIG.storageKey);
          }
        }
      }
      setError(null);
    } catch (err) {
      console.error('Failed to load theme preference:', err);
      setError('Failed to load theme preference');
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array - only run on mount

  // Persist theme changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && THEME_PROVIDER_CONFIG.persistThemePreference) {
        localStorage.setItem(THEME_PROVIDER_CONFIG.storageKey, currentTheme);
      }
    } catch (err) {
      console.error('Failed to persist theme preference:', err);
      // Don't set error state for persistence failures as it's not critical
    }
  }, [currentTheme]);

  const setTheme = React.useCallback((theme: ThemeName) => {
    if (enableThemeSwitching) {
      setCurrentTheme(theme);
    }
  }, [enableThemeSwitching]);

  const toggleMode = React.useCallback(() => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setNextTheme(newMode);
  }, [currentMode, setNextTheme]);

  const retry = React.useCallback(() => {
    setError(null);
    setIsLoading(true);
    // Retry theme initialization
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const contextValue: XalaThemeContextType = {
    currentTheme,
    currentMode,
    themeConfig,
    setTheme,
    toggleMode,
    isLoading,
    error,
    retry
  };

  // Show error state if theme loading failed
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Theme Loading Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={retry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading state during hydration
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading theme...</p>
        </div>
      </div>
    );
  }

  return (
    <XalaThemeContext.Provider value={contextValue}>
      <DesignSystemProvider>
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
export function ThemeSwitcher() {
  const { currentTheme, currentMode, setTheme, toggleMode, isLoading } = useXalaTheme();

  if (isLoading) {
    return <div className="w-8 h-8 animate-pulse bg-gray-200 rounded"></div>;
  }

  return (
    <div className="flex items-center gap-2">
      {/* Mode Toggle */}
      <button
        onClick={toggleMode}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
        aria-label={`Switch to ${currentMode === 'light' ? 'dark' : 'light'} mode`}
      >
        {currentMode === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Theme Selector */}
      <select
        value={currentTheme}
        onChange={(e) => setTheme(e.target.value as ThemeName)}
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        aria-label="Select theme"
      >
        <option value="enterprise">Enterprise</option>
        <option value="base">Base</option>
        <option value="finance">Finance</option>
        <option value="productivity">Productivity</option>
        <option value="healthcare">Healthcare</option>
        <option value="education">Education</option>
        <option value="ecommerce">E-commerce</option>
        <option value="oslo">Oslo</option>
        <option value="bergen">Bergen</option>
        <option value="drammen">Drammen</option>
      </select>
    </div>
  );
}

/**
 * Theme info display component
 */
export function ThemeInfo() {
  const { themeConfig, isLoading } = useXalaTheme();

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>;
  }

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      <span className="font-medium">{themeConfig.displayName}</span>
      <span className="mx-2">•</span>
      <span className="capitalize">{themeConfig.mode}</span>
    </div>
  );
}
