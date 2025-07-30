import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@xala-technologies/ui-system";
import { PlusIcon, TrashIcon, CheckIcon } from "lucide-react";

/**
 * Enhanced Button Component Stories
 * Demonstrates the WCAG 2.2 AAA compliant design token system
 */
const meta = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Enhanced Button component with WCAG 2.2 AAA compliance, professional sizing standards, and semantic design tokens. All variants meet minimum 44px touch targets.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "outline", "ghost"],
      description: "The semantic variant of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button (all WCAG compliant)",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button should take full width",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    children: {
      control: "text",
      description: "The content to display inside the button",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Primary variants
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "md",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete Account",
    variant: "destructive",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "Save Changes",
    variant: "outline",
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "md",
  },
};

export const Loading: Story = {
  args: {
    children: "Processing...",
    variant: "primary",
    size: "md",
    loading: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
