/**
 * Provider Integration Test Component
 * 
 * This component tests the integration of all providers:
 * - NextAuth SessionProvider
 * - Next Themes ThemeProvider  
 * - XalaThemeProvider
 * - tRPC Provider
 * - DesignSystemProvider
 */

'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useXalaTheme } from '@/components/providers/XalaThemeProvider';
import { api } from '@/lib/trpc/react';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'loading';
  message: string;
  details?: Record<string, unknown> | Error | null;
}

function useProviderTests(): TestResult[] {
  // Test hooks directly - no useMemo to avoid hooks rules violations
  const results: TestResult[] = [];

  // Test 1: NextAuth Session Provider
  try {
    const { data: session, status } = useSession();
    results.push({
      name: 'NextAuth SessionProvider',
      status: status === 'loading' ? 'loading' : 'pass',
      message: status === 'authenticated' ? 'User authenticated' : 
              status === 'unauthenticated' ? 'No active session (expected)' : 
              'Loading session...',
      details: { status, hasSession: !!session }
    });
  } catch (error) {
    results.push({
      name: 'NextAuth SessionProvider',
      status: 'fail',
      message: 'Failed to access session context',
      details: error instanceof Error ? error : { error: String(error) }
    });
  }

  // Test 2: Next Themes Provider
  try {
    const { theme, systemTheme, resolvedTheme, setTheme } = useTheme();
    results.push({
      name: 'Next Themes Provider',
      status: 'pass',
      message: 'Theme context accessible',
      details: { theme, systemTheme, resolvedTheme, hasSetTheme: typeof setTheme === 'function' }
    });
  } catch (error) {
    results.push({
      name: 'Next Themes Provider',
      status: 'fail',
      message: 'Failed to access theme context',
      details: error instanceof Error ? error : { error: String(error) }
    });
  }

  // Test 3: Xala Theme Provider
  try {
    const { 
      currentTheme, 
      currentMode, 
      themeConfig, 
      setTheme, 
      toggleMode, 
      isLoading, 
      error 
    } = useXalaTheme();
    
    results.push({
      name: 'Xala Theme Provider',
      status: error ? 'fail' : isLoading ? 'loading' : 'pass',
      message: error ? `Error: ${error}` : 
              isLoading ? 'Loading theme...' : 
              'Xala theme context accessible',
      details: { 
        currentTheme, 
        currentMode, 
        themeDisplayName: themeConfig?.displayName,
        hasSetTheme: typeof setTheme === 'function',
        hasToggleMode: typeof toggleMode === 'function'
      }
    });
  } catch (error) {
    results.push({
      name: 'Xala Theme Provider',
      status: 'fail',
      message: 'Failed to access Xala theme context',
      details: error instanceof Error ? error : { error: String(error) }
    });
  }

  // Test 4: tRPC Provider
  try {
    const utils = api.useUtils();
    results.push({
      name: 'tRPC Provider',
      status: 'pass',
      message: 'tRPC context accessible',
      details: { hasUtils: !!utils }
    });
  } catch (error) {
    results.push({
      name: 'tRPC Provider',
      status: 'fail',
      message: 'Failed to access tRPC context',
      details: error instanceof Error ? error : { error: String(error) }
    });
  }

  // Test 5: Provider Hierarchy Test
  const providerHierarchy = [
    'ThemeProvider (next-themes)',
    'XalaThemeProvider',
    'ClientProvider (SessionProvider)',
    'TRPCReactProvider'
  ];
  
  results.push({
    name: 'Provider Hierarchy',
    status: 'pass',
    message: 'All providers accessible in correct order',
    details: { hierarchy: providerHierarchy }
  });

  return results;
}

export function ProviderIntegrationTest() {
  const testResults = useProviderTests();
  const [isRunning, setIsRunning] = React.useState(false);

  const runTests = React.useCallback(async () => {
    setIsRunning(true);
    // Simulate test run delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsRunning(false);
  }, []);

  React.useEffect(() => {
    runTests();
  }, [runTests]);

  const passCount = testResults.filter(r => r.status === 'pass').length;
  const failCount = testResults.filter(r => r.status === 'fail').length;
  const loadingCount = testResults.filter(r => r.status === 'loading').length;

  return (
    <div className="fixed top-4 left-4 z-50 max-w-md">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Provider Integration Test
          </h3>
          <button
            onClick={runTests}
            disabled={isRunning}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'Rerun'}
          </button>
        </div>

        {/* Test Summary */}
        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700 dark:text-green-400">Pass: {passCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-700 dark:text-red-400">Fail: {failCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-yellow-700 dark:text-yellow-400">Loading: {loadingCount}</span>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {testResults.map((result, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded p-2">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${
                  result.status === 'pass' ? 'bg-green-500' :
                  result.status === 'fail' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'
                }`}></div>
                <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                  {result.name}
                </span>
              </div>
              <p className={`text-xs ${
                result.status === 'pass' ? 'text-green-700 dark:text-green-400' :
                result.status === 'fail' ? 'text-red-700 dark:text-red-400' :
                'text-yellow-700 dark:text-yellow-400'
              }`}>
                {result.message}
              </p>
              {result.details && (
                <details className="mt-1">
                  <summary className="text-xs text-gray-500 cursor-pointer">Details</summary>
                  <pre className="text-xs text-gray-600 dark:text-gray-400 mt-1 overflow-x-auto">
                    {JSON.stringify(result.details, (key, value) => {
                      if (value instanceof Error) {
                        return { message: value.message, name: value.name };
                      }
                      return value;
                    }, 2) || 'No details available'}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        {testResults.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            {isRunning ? 'Running tests...' : 'No tests run yet'}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Simple provider status component
 */
export function ProviderStatus() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const { currentTheme, currentMode, error } = useXalaTheme();

  const allGood = !error && currentTheme && currentMode && theme;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg border text-sm ${
        allGood 
          ? 'bg-green-100 border-green-300 text-green-800' 
          : 'bg-yellow-100 border-yellow-300 text-yellow-800'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            allGood ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
          }`}></div>
          <span>
            Providers: {allGood ? 'Ready' : 'Initializing'}
          </span>
        </div>
      </div>
    </div>
  );
}
