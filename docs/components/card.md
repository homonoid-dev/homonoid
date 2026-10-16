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

- `Outlined` (`outlined`): Transparent surface framed by an optional hairline border stroke (`bg-transparent`), ideal for lightweight modular layouts and interactive stages.
- `Filled` (`filled`): Solid neutral surface fill (`bg-surface`) providing grounded visual grouping.

<br>

### Colors

Cards support semantic color intent palettes aligned with Harmonia design tokens:

- `Surface` (`surface`): Neutral container background and border (`bg-surface` / `border-border`).
- `Subtle` (`subtle`): Low-contrast Chroma subtle tint and border (`bg-subtle` / `border-subtle-border`).
- `Primary` (`primary`): Chroma brand primary highlight tint and border (`bg-primary/5` / `border-primary-border`).
- `Destructive` (`destructive`): Danger alert or error callout tint and border (`bg-destructive/10` / `border-destructive-border`).

<br>

### Border Control

Cards support toggling the hairline border stroke via the `border` property:

- `true` (default): Renders a precise `0.5px` border stroke matching the active color token.
- `false`: Omits the border stroke (`border-0`), enabling borderless filled cards for flat surfaces or nested containers.

<br>

### Tokens and Styling

Cards consume spatial boundaries, padding, and surface palettes exclusively from `@harmonia/tokens`:

- Surface: `bg-surface` (`--surface`), `bg-subtle` (`--subtle`), or `bg-transparent`.
- Border: `border-[0.5px]` with color matched to `--border`, `--subtle-border`, `--primary-border`, or `--destructive-border`.
- Corner Radius: `rounded-3xl` by default to preserve the fluid, rounded aesthetic of Harmonia.
- Inset Padding: `p-surface` (`--p-surface`) by default, aligning internal elements with standardized layout rhythm.
