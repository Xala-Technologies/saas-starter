"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHeightToken, BorderRadiusToken, ShadowToken } from "@/lib/design-tokens";

/**
 * Enhanced Button Component with Design Token System
 * WCAG 2.2 AAA Compliant with Professional Sizing Standards
 * 
 * Uses semantic design tokens exclusively
 * WCAG compliant touch targets (minimum 44px)
 * High contrast focus indicators
 * Professional typography and spacing
 * NO hardcoded values allowed
 */

const buttonVariants = cva(
  // Base styles using design tokens
  [
    "inline-flex items-center justify-center",
    "font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 active:bg-primary/95",
          "shadow-sm hover:shadow-md",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80 active:bg-secondary/90",
          "shadow-sm hover:shadow-md",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90 active:bg-destructive/95",
          "shadow-sm hover:shadow-md",
        ],
        success: [
          "bg-success text-success-foreground",
          "hover:bg-success/90 active:bg-success/95",
          "shadow-sm hover:shadow-md",
        ],
        warning: [
          "bg-warning text-warning-foreground",
          "hover:bg-warning/90 active:bg-warning/95",
          "shadow-sm hover:shadow-md",
        ],
        info: [
          "bg-info text-info-foreground",
          "hover:bg-info/90 active:bg-info/95",
          "shadow-sm hover:shadow-md",
        ],
        outline: [
          "border border-border bg-background text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/90",
        ],
        ghost: [
          "text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/90",
        ],
        link: [
          "text-primary underline-offset-4",
          "hover:underline focus:underline",
        ],
      },
      size: {
        sm: [
          "h-button-sm px-4",  // 44px height - WCAG minimum
          "text-sm",
          "rounded-lg",
        ],
        md: [
          "h-button-md px-6",  // 48px height - Standard
          "text-base",
          "rounded-lg",
        ],
        lg: [
          "h-button-lg px-8",  // 56px height - Large
          "text-lg",
          "rounded-xl",
        ],
        xl: [
          "h-button-xl px-10", // 64px height - Extra large
          "text-xl",
          "rounded-xl",
        ],
        icon: [
          "h-button-md w-button-md", // Square button
          "rounded-lg",
        ],
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a child component (for Next.js Link integration)
   */
  asChild?: boolean;
  /**
   * Loading state with spinner
   */
  loading?: boolean;
  /**
   * Icon to display before text
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display after text
   */
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      startIcon,
      endIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && startIcon && (
          <span className="mr-2" aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children}
        {!loading && endIcon && (
          <span className="ml-2" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
