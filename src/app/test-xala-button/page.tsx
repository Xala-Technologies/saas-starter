/**
 * Xala Button Test Page
 * 
 * This page demonstrates the XalaButton component integration
 * and allows testing of different variants and features.
 */

'use client';

import React from 'react';
import { Button, Card, CardHeader, CardContent, Input, Stack } from '@xala-technologies/ui-system';
import { useXalaTheme } from '@/components/providers/XalaThemeProvider';
import { useTheme } from 'next-themes';

export default function TestXalaButtonPage() {
  const { currentTheme } = useXalaTheme();
  const { theme, setTheme: setNextTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Xala Button Integration Test</h1>
          <p className="text-lg text-muted-foreground">
            Testing the XalaButton component with different variants and features
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span>Theme: <strong>{currentTheme}</strong></span>
            <span>Mode: <strong>{theme === 'dark' ? 'dark' : 'light'}</strong></span>
            <Button variant="outline" size="sm" onClick={() => setNextTheme(theme === 'dark' ? 'light' : 'dark')}>
              Toggle {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>

        {/* Button Variants */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Button Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        {/* Button Sizes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Button States */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Button States</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Full Width Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Full Width Buttons</h2>
          <div className="space-y-2">
            <Button fullWidth variant="primary">Full Width Primary</Button>
            <Button fullWidth variant="outline">Full Width Outline</Button>
          </div>
        </section>

        {/* Interactive Tests */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Interactive Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Click Handler Test</h3>
              <Button 
                onClick={() => alert('Button clicked!')}
                variant="primary"
              >
                Click Me
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Form Submit Test</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
                <Button type="submit" variant="secondary">
                  Submit Form
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Accessibility Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Accessibility Features</h2>
          <div className="space-y-2">
            <Button aria-label="This button has an accessible label">
              Button with ARIA Label
            </Button>
            <p className="text-sm text-muted-foreground">
              ✅ WCAG 2.2 AAA compliant<br/>
              ✅ Keyboard navigation support<br/>
              ✅ Screen reader friendly<br/>
              ✅ Focus indicators<br/>
              ✅ Proper contrast ratios
            </p>
          </div>
        </section>

        {/* Theme Integration Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Theme Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Current Theme: {currentTheme}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Buttons automatically adapt to the selected theme and mode.
              </p>
              <div className="space-x-2">
                <Button variant="primary">Themed Primary</Button>
                <Button variant="secondary">Themed Secondary</Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Mode: {theme === 'dark' ? 'dark' : 'light'}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Toggle between light and dark modes to see the adaptation.
              </p>
              <Button onClick={() => setNextTheme(theme === 'dark' ? 'light' : 'dark')} variant="outline">
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </Button>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="text-center pt-8">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
          >
            ← Back to Home
          </Button>
        </section>
      </div>
    </div>
  );
}
