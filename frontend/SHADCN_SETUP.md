# shadcn/ui Implementation Guide

## Overview

This project uses **shadcn/ui**, a collection of re-usable components built on top of **Radix UI** and styled with **Tailwind CSS**. shadcn/ui provides a flexible, unstyled component library that you can customize to your brand.

## Key Points

### What is shadcn/ui?

- **Not a package**: shadcn/ui is not installed via npm. Instead, components are copied directly into your project
- **Copy & Customize**: You own the code, so you can customize it however you like
- **Built on Radix UI**: Uses Radix UI primitives for accessibility and functionality
- **Styled with Tailwind CSS**: All styling is done through Tailwind classes

### Project Setup

#### 1. **Path Alias Configuration** (`@/`)
   - Configured in both `vite.config.js` and `jsconfig.json`
   - Allows importing from `@/components/ui/` instead of relative paths
   - Example: `import { Button } from "@/components/ui/button"`

#### 2. **Dependencies**
   - `@radix-ui/react-dropdown-menu` - Radix UI dropdown menu primitive
   - `tailwind-merge` - Used to merge and resolve Tailwind class conflicts
   - `class-variance-authority` - Used for component variant management
   - `lucide-react` - Icon library used in components

#### 3. **Utility Functions**
   - `cn()` utility (from `@/utils/utils.js`) - Merges classNames using `clsx` and `tailwind-merge`
   - Used extensively in components to merge default and custom styles

### Component Structure

All UI components are located in `src/components/ui/`:

```
src/components/ui/
├── button.jsx
├── card.jsx
├── input.jsx
├── label.jsx
├── separator.jsx
├── dropdown-menu.jsx  ← Newly added
├── badge.jsx
├── field.jsx
├── radio-group.jsx
├── select.jsx
```

### How Components Work

Each component follows this pattern:

```jsx
"use client"  // React component directive (for Next.js compatibility)

import * as React from "react"
import * as ComponentPrimitive from "@radix-ui/react-component"
import { cn } from "@/utils/utils"

// Create forwarded ref component
const Component = React.forwardRef(({ className, ...props }, ref) => (
  <ComponentPrimitive.Root
    ref={ref}
    className={cn(
      "default-tailwind-classes",
      className  // Allows custom classes to override
    )}
    {...props}
  />
))
Component.displayName = ComponentPrimitive.Root.displayName

export { Component }
```

## Dropdown Menu Component

The newly created `dropdown-menu.jsx` component provides:

- `DropdownMenu` - Root container
- `DropdownMenuTrigger` - Button that opens the menu
- `DropdownMenuContent` - Menu container with animations
- `DropdownMenuItem` - Individual menu items
- `DropdownMenuLabel` - Section headers
- `DropdownMenuSeparator` - Visual dividers
- `DropdownMenuCheckboxItem` - Items with checkboxes
- `DropdownMenuRadioItem` - Items with radio buttons
- `DropdownMenuSub` - Nested submenus

### Usage Example

```jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuItem>Account Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Best Practices

### Import From Correct Path
- ✅ `import { Button } from "@/components/ui/button"`
- ❌ `import { Button } from "@/components/layout/ui/button"`

### Use the `cn()` Utility
- Always use `cn()` to merge Tailwind classes
- Allows consumers to override styles while maintaining predefined defaults

### Customization
- Modify component styles directly in the UI component file
- Customize colors, spacing, animations, etc. in Tailwind config if needed

## Common Issues & Solutions

### Issue: "Failed to resolve import"
**Cause**: Wrong import path
**Solution**: Always import from `@/components/ui/`, not from subdirectories

### Issue: Styles not applying correctly
**Cause**: Missing Tailwind CSS classes or conflicts
**Solution**: Check that `tailwind.config.js` includes the component files in its template paths

### Issue: Components not responding to clicks
**Cause**: Missing Radix UI primitive installation
**Solution**: Verify `package.json` includes required `@radix-ui/*` dependencies

## Adding New Components

To add a new shadcn/ui component:

1. Copy the component code into `src/components/ui/ComponentName.jsx`
2. Ensure all Radix UI dependencies are in `package.json`
3. Import from `@/components/ui/ComponentName` in your pages/components
4. Customize the default Tailwind classes as needed

## References

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
