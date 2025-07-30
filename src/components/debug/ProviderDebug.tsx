/**
 * Provider Debug Component
 * 
 * This component helps debug and verify that all providers are working correctly.
 * It displays the current state of theme, auth, and other context providers.
 */

'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { useXalaTheme } from '@/components/providers/XalaThemeProvider';
import { ThemeSwitcher, ThemeInfo } from '@/components/providers/XalaThemeProvider';

interface ProviderDebugProps {
  showDetails?: boolean;
}

export function ProviderDebug({ showDetails = false }: ProviderDebugProps) {
  const { theme: nextTheme, systemTheme, resolvedTheme } = useTheme();
  const { currentTheme, currentMode, themeConfig, isLoading } = useXalaTheme();

  if (!showDetails) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <ThemeInfo />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Provider Debug Info
        </h3>
        
        {/* Next Themes Info */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Next Themes</h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <div>Theme: {nextTheme || 'undefined'}</div>
            <div>System: {systemTheme || 'undefined'}</div>
            <div>Resolved: {resolvedTheme || 'undefined'}</div>
          </div>
        </div>

        {/* Xala Theme Info */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Xala Theme</h4>
          {isLoading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Theme: {currentTheme}</div>
              <div>Mode: {currentMode}</div>
              <div>Display: {themeConfig.displayName}</div>
              <div>Category: {themeConfig.category}</div>
            </div>
          )}
        </div>

        {/* Theme Controls */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex items-center justify-between">
            <ThemeInfo />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Provider Status Indicator
 * Shows a simple status indicator for providers
 */
export function ProviderStatusIndicator() {
  const [mounted, setMounted] = React.useState(false);
  const { isLoading: xalaLoading } = useXalaTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-yellow-800">Mounting...</span>
          </div>
        </div>
      </div>
    );
  }

  const status = xalaLoading ? 'loading' : 'ready';
  const statusColors = {
    loading: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    ready: 'bg-green-100 border-green-300 text-green-800',
    error: 'bg-red-100 border-red-300 text-red-800'
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`border rounded-lg px-3 py-2 ${statusColors[status]}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'loading' ? 'bg-yellow-500 animate-pulse' : 
            status === 'ready' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm capitalize">Providers {status}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Context Integration Test
 * Tests that all contexts are properly integrated
 */
export function ContextIntegrationTest() {
  const [testResults, setTestResults] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const runTests = async () => {
      const results: Record<string, boolean> = {};

      try {
        // Test Xala Theme Context
        const xalaTheme = useXalaTheme();
        results.xalaTheme = !!xalaTheme && !xalaTheme.isLoading;
      } catch (error) {
        results.xalaTheme = false;
      }

      try {
        // Test Next Themes Context
        const nextTheme = useTheme();
        results.nextThemes = !!nextTheme;
      } catch (error) {
        results.nextThemes = false;
      }

      // Add more context tests as needed
      setTestResults(results);
    };

    runTests();
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Context Tests</h4>
        <div className="space-y-1">
          {Object.entries(testResults).map(([context, passed]) => (
            <div key={context} className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={passed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                {context}: {passed ? 'Pass' : 'Fail'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
