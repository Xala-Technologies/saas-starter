# Design Token Migration Strategy

## 🔄 Migration Overview

This document outlines the strategy for migrating from our custom design token system to the Xala UI System tokens while maintaining compatibility and improving consistency.

## 📊 Current vs Xala Token Comparison

### Spacing Tokens

#### Current System (8pt Grid)
```typescript
// Our current spacing tokens
type SpacingToken = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20'
  | '24' | '28' | '32' | '36' | '40' | '44' | '48' | '52' | '56' | '60'
  | '64' | '72' | '80' | '96';
```

#### Xala System Integration
```typescript
// Xala UI System provides spacing through design tokens
// We'll create a mapping layer to maintain compatibility
const spacingMapping = {
  // Direct mappings where possible
  '0': 'space-0',
  '1': 'space-1',
  '2': 'space-2',
  // ... continue mapping
  
  // Component-specific tokens from Xala
  'button-sm': 'component-button-padding-sm',
  'button-md': 'component-button-padding-md',
  'button-lg': 'component-button-padding-lg',
};
```

### Color Tokens

#### Current System (Semantic Colors)
```typescript
type SemanticColorToken = 
  | 'background' | 'foreground' | 'card' | 'card-foreground'
  | 'primary' | 'primary-foreground' | 'secondary' | 'secondary-foreground'
  | 'muted' | 'muted-foreground' | 'accent' | 'accent-foreground'
  | 'destructive' | 'destructive-foreground' | 'success' | 'success-foreground'
  | 'warning' | 'warning-foreground' | 'info' | 'info-foreground';
```

#### Xala System Integration
```typescript
// Xala provides theme-specific color tokens
// Enterprise theme color mapping
const colorMapping = {
  // Surface colors
  'background': 'surface-background',
  'foreground': 'surface-foreground',
  'card': 'surface-card',
  'card-foreground': 'surface-card-foreground',
  
  // Brand colors
  'primary': 'brand-primary',
  'primary-foreground': 'brand-primary-foreground',
  'secondary': 'brand-secondary',
  'secondary-foreground': 'brand-secondary-foreground',
  
  // Semantic colors
  'success': 'semantic-success',
  'warning': 'semantic-warning',
  'destructive': 'semantic-error',
  'info': 'semantic-info',
};
```

### Typography Tokens

#### Current System
```typescript
type FontSizeToken = 
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' 
  | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
```

#### Xala System Integration
```typescript
// Xala provides comprehensive typography scale
const typographyMapping = {
  'xs': 'text-xs',
  'sm': 'text-sm',
  'base': 'text-base',
  'lg': 'text-lg',
  'xl': 'text-xl',
  '2xl': 'text-2xl',
  // Xala also provides semantic typography
  'heading-1': 'typography-heading-1',
  'heading-2': 'typography-heading-2',
  'body-large': 'typography-body-large',
  'body-small': 'typography-body-small',
};
```

## 🔧 Migration Strategy

### Phase 1: Compatibility Layer ✅ (Current Phase)
Create a compatibility layer that maps our existing tokens to Xala tokens:

```typescript
// src/lib/token-compatibility.ts
export const tokenCompatibility = {
  spacing: (token: SpacingToken) => {
    // Map our tokens to Xala tokens
    const xalaToken = spacingMapping[token];
    return xalaToken || `space-${token}`;
  },
  
  color: (token: SemanticColorToken) => {
    const xalaToken = colorMapping[token];
    return xalaToken || token;
  },
  
  typography: (token: FontSizeToken) => {
    const xalaToken = typographyMapping[token];
    return xalaToken || `text-${token}`;
  }
};
```

### Phase 2: Component Migration
Migrate components one by one to use Xala tokens directly:

```typescript
// Before (using our tokens)
<Button className={cn(
  tokens.buttonHeight('button-md'),
  tokens.spacing('4'),
  'bg-primary text-primary-foreground'
)} />

// After (using Xala tokens)
<XalaButton
  size="md"
  variant="primary"
  className="px-4"
/>
```

### Phase 3: Direct Xala Integration
Replace our token system entirely with Xala's system:

```typescript
// Import Xala design tokens directly
import { useDesignTokens } from '@xala-technologies/ui-system';

function Component() {
  const tokens = useDesignTokens();
  return (
    <div style={{
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.surface.background,
      color: tokens.colors.surface.foreground
    }}>
      Content
    </div>
  );
}
```

## 🎯 Token Mapping Tables

### Spacing Token Mapping
| Current Token | Xala Token | Notes |
|---------------|------------|-------|
| `0` | `space-0` | Direct mapping |
| `1` | `space-1` | Direct mapping |
| `2` | `space-2` | Direct mapping |
| `4` | `space-4` | Direct mapping |
| `8` | `space-8` | Direct mapping |
| `button-sm` | `component-button-padding-sm` | Component-specific |
| `button-md` | `component-button-padding-md` | Component-specific |
| `card-md` | `component-card-padding-md` | Component-specific |

### Color Token Mapping
| Current Token | Xala Token | Enterprise Theme Value |
|---------------|------------|----------------------|
| `primary` | `brand-primary` | Enterprise blue |
| `secondary` | `brand-secondary` | Enterprise gray |
| `success` | `semantic-success` | Enterprise green |
| `warning` | `semantic-warning` | Enterprise amber |
| `destructive` | `semantic-error` | Enterprise red |
| `background` | `surface-background` | White/Dark gray |
| `foreground` | `surface-foreground` | Black/Light gray |

### Component Token Mapping
| Current Component | Xala Component | Migration Notes |
|-------------------|----------------|-----------------|
| `Button` | `XalaButton` | Use Xala variants |
| `Input` | `XalaInput` | Enhanced validation |
| `Card` | `XalaCard` | Better elevation system |
| `Alert` | `XalaAlert` | More semantic variants |

## 🔄 Migration Implementation

### Step 1: Create Token Bridge
```typescript
// src/lib/xala-token-bridge.ts
import { useDesignTokens } from '@xala-technologies/ui-system';
import { SpacingToken, SemanticColorToken } from './design-tokens';

export function useTokenBridge() {
  const xalaTokens = useDesignTokens();
  
  return {
    // Bridge our spacing tokens to Xala
    spacing: (token: SpacingToken) => {
      return xalaTokens.spacing[token] || xalaTokens.spacing.md;
    },
    
    // Bridge our color tokens to Xala
    color: (token: SemanticColorToken) => {
      const colorMap = {
        'primary': xalaTokens.colors.brand.primary,
        'secondary': xalaTokens.colors.brand.secondary,
        'success': xalaTokens.colors.semantic.success,
        'warning': xalaTokens.colors.semantic.warning,
        'destructive': xalaTokens.colors.semantic.error,
        'background': xalaTokens.colors.surface.background,
        'foreground': xalaTokens.colors.surface.foreground,
      };
      return colorMap[token] || xalaTokens.colors.surface.foreground;
    }
  };
}
```

### Step 2: Update Existing Components
```typescript
// Update our Button component to use Xala tokens
import { Button as XalaButton } from '@xala-technologies/ui-system';
import { useTokenBridge } from '@/lib/xala-token-bridge';

export function Button({ size, variant, children, ...props }) {
  const tokens = useTokenBridge();
  
  return (
    <XalaButton
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </XalaButton>
  );
}
```

### Step 3: Gradual Migration
1. **Week 1**: Implement token bridge and test with existing components
2. **Week 2**: Migrate core components (Button, Input, Card)
3. **Week 3**: Migrate layout components (Header, Sidebar, Footer)
4. **Week 4**: Migrate complex components (DataTable, Forms)
5. **Week 5**: Remove old token system and cleanup

## 🧪 Testing Strategy

### Token Compatibility Tests
```typescript
// tests/token-migration.test.ts
describe('Token Migration', () => {
  it('should map spacing tokens correctly', () => {
    const bridge = useTokenBridge();
    expect(bridge.spacing('4')).toBe(xalaTokens.spacing['4']);
  });
  
  it('should map color tokens correctly', () => {
    const bridge = useTokenBridge();
    expect(bridge.color('primary')).toBe(xalaTokens.colors.brand.primary);
  });
});
```

### Visual Regression Tests
- Screenshot comparison before/after migration
- Accessibility contrast ratio validation
- Cross-browser compatibility testing

## 📈 Benefits of Migration

### Immediate Benefits
1. **Consistency**: Unified design system across all components
2. **Accessibility**: WCAG 2.2 AAA compliance built-in
3. **Theming**: Professional themes with light/dark variants
4. **Maintenance**: Reduced custom token maintenance

### Long-term Benefits
1. **Scalability**: Enterprise-grade design system
2. **Updates**: Automatic design system updates
3. **Team Efficiency**: Standardized component library
4. **Quality**: Professional, tested components

## 🚨 Migration Risks & Mitigation

### Potential Risks
1. **Visual Changes**: Components may look different
2. **Breaking Changes**: Some token mappings may not be perfect
3. **Performance**: Additional bundle size from UI system

### Mitigation Strategies
1. **Gradual Migration**: Migrate components incrementally
2. **Visual Testing**: Comprehensive screenshot testing
3. **Fallback System**: Keep old tokens as fallback during transition
4. **Team Training**: Ensure team understands new token system

## 📋 Migration Checklist

### Pre-Migration
- [ ] Audit all current design token usage
- [ ] Create token mapping documentation
- [ ] Set up visual regression testing
- [ ] Create migration timeline

### During Migration
- [ ] Implement token bridge system
- [ ] Migrate components incrementally
- [ ] Test each component thoroughly
- [ ] Update documentation

### Post-Migration
- [ ] Remove old token system
- [ ] Update team documentation
- [ ] Conduct team training
- [ ] Monitor for issues

## 🔗 Resources

- [Xala UI System Documentation](https://xala-technologies.github.io/ui-system)
- [Design Token Specification](https://design-tokens.github.io/community-group/format/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Token Migration Best Practices](https://design-system-handbook.com/tokens/migration/)
