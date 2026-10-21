# Separator

A separator visually or semantically partitions collections of content, controls, or sections within a layout.

Separators establish visual hierarchy across toolbars, lists, navigation menus, and content canvases while upholding spatial rhythm and accessibility standards.

<br>

### Purpose

Separators delineate distinct groupings to reduce visual clutter and enhance scannability.

They divide adjacent elements cleanly without requiring heavy container borders or intrusive structural wrappers.

<br>

### Usage

Use separators when:

- Partitioning distinct sections in toolbars, sidebars, or headers.
- Dividing groups of items within menus, lists, or card bodies.
- Providing visual distinction between primary content and secondary metadata.
- Grouping related interactive controls into coherent clusters.

Do not use separators when:

- Ample whitespace alone provides intuitive visual separation.
- Content items already reside in visually distinct container cards.
- Dividing table rows where standard cell borders are expected.
- Creating purely decorative illustrations where an icon or graphic is appropriate.

<br>

### Anatomy

The separator component renders as a focused primitive element with responsive orientation support:

- `Separator`: Structural divider element supporting horizontal and vertical orientations with automated ARIA semantics.

```tsx
import { Separator } from "@homonoid/react";

export function SeparatorBasic() {
  return (
    <div className="flex flex-col gap-4">
      <div>Section Header</div>
      <Separator />
      <div>Section Content</div>
    </div>
  );
}
```

<br>

### Composition

Separators adapt naturally to flexible layouts and compound containers:

- Horizontal separators span parent widths to establish clean row boundaries.
- Vertical separators align with flex rows, toolbars, and button clusters to delineate adjacent operations.

<br>

### Layout

Separators preserve spatial geometry across horizontal and vertical axes:

- Horizontal Geometry: Enforces full container width with a standard hairline thickness of half a pixel.
- Vertical Geometry: Enforces self stretching height alignment with a standard hairline thickness of half a pixel.
- Spacing Rhythm: Margins remain flexible via utility classes, allowing seamless integration inside compact menus or spacious article layouts.

<br>

### Orientations

The component supports two orientation modes via the `orientation` property:

- `horizontal`: Horizontal divider line spanning container widths. This is the default orientation.
- `vertical`: Vertical divider column spanning container heights within flex rows and toolbars.

<br>

### Object Continuity

Separators uphold visual stability across density and theme switches:

- Dimensional Stability: Hairline stroke metrics remain stable without layout shift during state changes.
- Theme Smoothness: Background stroke colors transition fluidly during light and dark mode switches without flicker.

<br>

### Accessibility

Separators adhere strictly to WAI ARIA divider standards:

- When `decorative` is true (default), the element applies `role="none"` or `aria-hidden="true"`, ensuring screen readers skip unnecessary noise.
- When `decorative` is false, the element applies `role="separator"` and exposes `aria-orientation` matching the active layout direction.

<br>

### Design Tokens

Separators consume design system tokens exclusively:

- Color: Consumes `--border` for standard boundaries and `--subtle-border` for diminished demarcations.
- Dimensions: Utilizes hairline dimensions calibrated for subpixel sharpness on high density retina displays.

<br>

### Component API

The Separator component accepts the following properties:

- `orientation`: Layout direction mode, either `horizontal` or `vertical`. Default is `horizontal`.
- `decorative`: Whether the separator is purely decorative rather than semantic. Default is `true`.
- `className`: Additional CSS classes for custom spacing and styling.
