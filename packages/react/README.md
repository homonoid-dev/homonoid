# @homonoid/react

The React implementation of the Homonoid design system built with tactile continuity and platform native performance.

<br>

### Prerequisites

The component library targets React 19 and consumes design tokens from `@homonoid/tokens`:

```bash
npm install @homonoid/react @homonoid/tokens
```

<br>

### Stylesheet Integration

Import design tokens and component styles into your application root stylesheet or entry layout:

```css
@import "@homonoid/tokens/css";
@import "@homonoid/react/styles.css";
```

<br>

### Component Usage

Import components directly from the package entry point:

```tsx
import { Button, Card, Input } from "@homonoid/react";

export function Example() {
  return (
    <Card variant="surface" className="flex flex-col gap-4">
      <Input placeholder="Enter username" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

<br>

### Utility Functions

Modular utilities for conditional rendering and class merging are available as dedicated subpaths:

```tsx
import { cn } from "@homonoid/react/cn";
import { condition } from "@homonoid/react/condition";
```

<br>

### Design Principles

Every component in Homonoid adheres to strict tactile continuity and dimensional stability during interactive transitions. Components consume styling exclusively from design tokens with zero hardcoded arbitrary values.
