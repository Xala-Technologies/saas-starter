'use client';

import React from 'react';
import {
  // Available navigation components from Xala UI System
  Tabs,
  Breadcrumb,
  Pagination,
  WebNavbar,
  Button,
  Stack,
  Container,
  Text,
  Heading,
  Card
} from '@xala-technologies/ui-system';
import { Home, Settings, User, FileText, BarChart } from 'lucide-react';

export default function TestXalaNavigationPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeBottomNav, setActiveBottomNav] = React.useState('home');

  return (
    <Container maxWidth="xl" className="py-8">
      <Stack className="space-y-8">
        <Stack className="space-y-4">
          <Heading size="4xl">Xala Navigation Components</Heading>
          <Text variant="body" size="lg" className="text-muted-foreground">
            Testing available navigation components from the Xala UI System
          </Text>
        </Stack>

        {/* Web Navbar */}
        <Stack className="space-y-4">
          <Heading size="2xl">Web Navbar</Heading>
          <WebNavbar>
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center space-x-6">
                <Text className="font-bold text-lg">Brand</Text>
                <Button variant="ghost" size="sm">Home</Button>
                <Button variant="ghost" size="sm">Products</Button>
                <Button variant="ghost" size="sm">About</Button>
                <Button variant="ghost" size="sm">Contact</Button>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="secondary" size="sm">Sign In</Button>
                <Button variant="primary" size="sm">Get Started</Button>
              </div>
            </div>
          </WebNavbar>
        </Stack>

        {/* Navigation Tabs - Using Button Group for Navigation */}
        <Stack className="space-y-4">
          <Heading size="2xl">Navigation Using Button Group</Heading>
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <Button 
              variant={activeTab === 'overview' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Button>
            <Button 
              variant={activeTab === 'analytics' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </Button>
            <Button 
              variant={activeTab === 'reports' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </Button>
          </div>
        </Stack>

        {/* Tabs Component */}
        <Stack className="space-y-4">
          <Heading size="2xl">Tab Navigation</Heading>
          <Tabs
            items={[
              {
                key: 'overview',
                label: 'Overview',
                content: (
                  <Card className="p-6">
                    <Heading size="xl">Overview Content</Heading>
                    <Text className="mt-2">This is the overview tab content. It provides a general summary of your data.</Text>
                  </Card>
                )
              },
              {
                key: 'analytics',
                label: 'Analytics',
                content: (
                  <Card className="p-6">
                    <Heading size="xl">Analytics Content</Heading>
                    <Text className="mt-2">Analytics data and charts would be displayed here.</Text>
                  </Card>
                )
              },
              {
                key: 'reports',
                label: 'Reports',
                content: (
                  <Card className="p-6">
                    <Heading size="xl">Reports Content</Heading>
                    <Text className="mt-2">Generated reports and downloadable documents would appear here.</Text>
                  </Card>
                )
              },
              {
                key: 'settings',
                label: 'Settings',
                content: (
                  <Card className="p-6">
                    <Heading size="xl">Settings Content</Heading>
                    <Text className="mt-2">Configuration options and preferences would be shown here.</Text>
                  </Card>
                )
              }
            ]}
          />
        </Stack>

        {/* Breadcrumb */}
        <Stack className="space-y-4">
          <Heading size="2xl">Breadcrumb Navigation</Heading>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
              { label: 'Products', href: '/products' },
              { label: 'Analytics', href: '/analytics' }
            ]}
          />
        </Stack>

        {/* Pagination */}
        <Stack className="space-y-4">
          <Heading size="2xl">Pagination</Heading>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={(page) => setCurrentPage(page)}
            variant="primary"
            size="default"
            showFirstLast={true}
            maxVisible={7}
          />
          <Text variant="body" size="sm" className="text-muted-foreground">
            Current page: {currentPage}
          </Text>
        </Stack>

        {/* Context Menu (for dropdown-like functionality) */}
        <Stack className="space-y-4">
          <Heading size="2xl">Context Menu (Right-click menus)</Heading>
          <Card className="p-6">
            <Text variant="body" size="sm" className="text-muted-foreground">
              Note: Context menu components may have a different API structure in the Xala UI System.
              For dropdown functionality, consider using Button components with conditional rendering
              or a combination of other components.
            </Text>
          </Card>
        </Stack>

        {/* Bottom Navigation (Mobile) - Manual Implementation */}
        <Stack className="space-y-4">
          <Heading size="2xl">Bottom Navigation (Mobile)</Heading>
          <div className="max-w-sm mx-auto">
            <Card className="p-2">
              <div className="flex justify-around items-center">
                <Button
                  variant={activeBottomNav === 'home' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveBottomNav('home')}
                  className="flex flex-col items-center p-2"
                >
                  <Home className="h-5 w-5" />
                  <Text size="xs" className="mt-1">Home</Text>
                </Button>
                <Button
                  variant={activeBottomNav === 'analytics' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveBottomNav('analytics')}
                  className="flex flex-col items-center p-2"
                >
                  <BarChart className="h-5 w-5" />
                  <Text size="xs" className="mt-1">Analytics</Text>
                </Button>
                <Button
                  variant={activeBottomNav === 'reports' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveBottomNav('reports')}
                  className="flex flex-col items-center p-2"
                >
                  <FileText className="h-5 w-5" />
                  <Text size="xs" className="mt-1">Reports</Text>
                </Button>
                <Button
                  variant={activeBottomNav === 'settings' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveBottomNav('settings')}
                  className="flex flex-col items-center p-2"
                >
                  <Settings className="h-5 w-5" />
                  <Text size="xs" className="mt-1">Settings</Text>
                </Button>
              </div>
            </Card>
            <Text variant="body" size="sm" className="text-muted-foreground mt-4">
              Note: BottomNavigation component has specific API requirements. 
              This example shows a manual implementation using Button components.
            </Text>
          </div>
        </Stack>

        {/* Accessibility Information */}
        <Stack className="space-y-4 mt-8">
          <Card className="p-6">
            <Heading size="xl">Accessibility Features</Heading>
            <Text variant="body" size="sm" className="mt-4">
              All Xala navigation components include:
            </Text>
            <ul className="list-disc list-inside space-y-2 text-sm mt-2">
              <li>Full keyboard navigation support</li>
              <li>ARIA attributes for screen readers</li>
              <li>Focus indicators (WCAG 2.2 AAA compliant)</li>
              <li>Semantic HTML structure</li>
              <li>Proper role attributes</li>
            </ul>
            <Text variant="body" size="sm" className="text-muted-foreground mt-4">
              Note: Context menus are activated with right-click. For dropdown menus in navigation,
              consider using custom implementations with Button and conditional rendering.
            </Text>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
}