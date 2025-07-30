/**
 * Xala UI System Components Test Page
 * 
 * Demonstrates direct usage of Xala UI System components without any wrapper components.
 * Shows theme integration, accessibility, and component interactions.
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@xala-technologies/ui-system';
import { useXalaTheme } from '@/components/providers/XalaThemeProvider';
import { useTheme } from 'next-themes';

export default function TestXalaComponentsPage(): React.JSX.Element {
  const { currentTheme } = useXalaTheme();
  const { theme, setTheme: setNextTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    alert('Form submitted with Xala UI System Button!');
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Xala UI System Components
          </h1>
          <p className="text-lg text-gray-600">
            Direct integration of Xala UI System components with theme support
          </p>
          
          {/* Theme Controls */}
          <div className="border rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                Theme: <strong>{currentTheme}</strong>
              </span>
              <span className="text-sm">
                Mode: <strong>{theme === 'dark' ? 'dark' : 'light'}</strong>
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setNextTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                Toggle {theme === 'dark' ? 'Light' : 'Dark'}
              </Button>
            </div>
          </div>
        </div>

        {/* Button Components */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Button Components</h2>
            <p className="text-gray-600">
              All button variants and sizes from Xala UI System
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Button Variants */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Sizes</h3>
              <div className="flex items-center gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            {/* Button States */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">States</h3>
              <div className="flex gap-3">
                <Button variant="primary">Normal</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" loading>Loading</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Form Demo */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Interactive Form Demo</h2>
            <p className="text-gray-600">
              Test Xala UI System Button with HTML form elements
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
              />
            </div>
            
            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                Submit Form
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setFormData({ name: '', email: '', message: '' })}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
