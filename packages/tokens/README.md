# @homonoid/tokens

The canonical design tokens that define colors, typography, spacing, radii, elevation, and motion values shared throughout the Homonoid ecosystem.

<br>

### Installation

Install the package into your project using your preferred package manager:

```bash
npm install @homonoid/tokens
```

<br>

### Stylesheet Integration

Import the consolidated stylesheet into your application root stylesheet or entry layout:

```css
@import "@homonoid/tokens/css";
```

Individual token layers are also available for modular consumption:

```css
@import "@homonoid/tokens/css/colors";
@import "@homonoid/tokens/css/spatial";
@import "@homonoid/tokens/css/motion";
```

<br>

### JavaScript and TypeScript Usage

Access token variables directly in TypeScript or JavaScript files:

```typescript
import { tokens } from "@homonoid/tokens";

export const primaryColor = tokens.color.primary;
export const surfacePadding = tokens.spacing["p-surface-md"];
```

<br>

### Specifications

All visual values in the Homonoid ecosystem originate from design tokens. The semantic token scale provides values for light and dark modes while ensuring continuous tactile feedback across interactive surfaces.
