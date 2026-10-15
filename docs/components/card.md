# Card

A card provides a bounded, cohesive surface to group related content, controls, and interactive states.

Cards serve as primary structural containers, maintaining spatial hierarchy and dimensional stability across views.

<br>

### Purpose

Cards group conceptually related information and actions into digestible, distinct visual regions.

They establish spatial context and surface elevation without creating unnecessary visual noise.

<br>

### Usage

Use cards to group controls, preview interactive components, present data summaries, or chunk structured layouts.

Avoid nesting cards deeply within cards when borders or backgrounds compete for contrast.

<br>

### Anatomy

A card consists of the following elements:

- `Container`: The bounded surface element defining geometry, background, border stroke, and padding.
- `Content`: Children elements housed within the container boundary.

<br>

### Variants

Harmonia defines two primary structural variants:

- `Outlined` (`outlined`): Transparent surface framed by a hairline border stroke (`border border-border`), ideal for lightweight modular layouts and interactive stages.
- `Filled` (`filled`): Solid neutral surface fill (`bg-surface`) accompanied by a subtle hairline border, delivering grounded visual grouping.

<br>

### Tokens and Styling

Cards consume spatial boundaries, padding, and surface palettes exclusively from `@harmonia/tokens`:

- Surface: `bg-surface` (`--surface`) for filled variants, `bg-transparent` for outlined variants.
- Border: `border-[0.5px] border-border/50` (`--border`).
- Corner Radius: `rounded-3xl` by default to preserve the fluid, rounded aesthetic of Harmonia.
- Inset Padding: `p-surface` (`--p-surface`) by default, aligning internal elements with standardized layout rhythm.
