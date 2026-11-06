# Tabs

Tabs organize content into distinct views while allowing users to switch between them within a shared spatial context.

Tabs serve as navigational landmarks and view toggles across interfaces, maintaining object continuity through shared sliding indicators and tactile scale feedback.

<br>

### Purpose

Tabs segment related content into mutually exclusive panels or toolbars to reduce cognitive overload and spatial clutter.

They provide clear, persistent affordances that confirm the active view and allow effortless exploration without losing orientation.

<br>

### Usage

Use tabs to alternate between complementary perspectives of the same entity, such as switching between Preview and Code within a component studio, or navigating between Settings sections.

Avoid using tabs for sequential multi step workflows where choices in earlier steps dictate subsequent options, reserving those experiences for Stepper or Breadcrumb.

<br>

### Anatomy

A tabs component consists of the following elements:

- `Root`: The top level context container managing selection state, keyboard navigation, and layout dimensions.
- `List`: The bounded container structuring tab triggers into a cohesive horizontal or vertical bar.
- `Tab`: The interactive surface representing an individual selectable view or operation.
- `Indicator`: The continuous animated surface gliding behind or beneath the active tab to convey current selection.
- `Panel`: The content container associated with each tab, rendered when its corresponding tab is selected.
- `Focus Ring`: A visible high contrast perimeter displayed during keyboard navigation.

<br>

### Layout

Tabs adapt to their content while maintaining consistent structural rhythm:

- Alignment: Content within each tab centers horizontally and vertically by default.
- Orientation: Supports horizontal row alignment as standard, alongside vertical column alignment for dense side panels.
- Sizing Modes: Supports auto content hugging where tabs size to their labels and icons, or full width equal distribution across the list.
- Docked Spacing: In pill and contained variants, tabs sit docked adjacent to one another inside a shared track with uniform control padding.

<br>

### Variants

Homonoid separates structural treatment into dedicated visual variants:

- `Pill` (`variant="pill"`): Rounded capsule container enclosing tabs where a physical sliding pill indicator glides behind the active selection.
- `Outlined` (`variant="outlined"`): Segmented container enclosed by a subtle hairline border stroke with quiet resting tabs.
- `Plain` (`variant="plain"`): Minimal transparent presentation where only the active indicator and typography communicate selection.
- `Underlined` (`variant="underlined"`): Classic structural tabs where an animated hairline indicator slides along the bottom border.

<br>

### Colors

Semantic color tokens apply across all variants via the `color` prop:

- `Primary` (`color="primary"`): Brand Chroma palette for prominent view switching.
- `Subtle` (`color="subtle"`): Low contrast neutral palette for auxiliary canvas tools and utility switchers.
- `Surface` (`color="surface"`): Monochromatic elevation hierarchy adapting naturally between light and dark modes.
- `Destructive` (`color="destructive"`): Alert palette reserved for warning or high risk filtered states.

<br>

### Sizes

Tabs scale proportionally across standard control height tiers:

- `Small` (`size="sm"`): Compact 32px height (`h-control-sm`) designed for dense toolbars, code stages, and secondary panels.
- `Medium` (`size="md"`): Standard 40px height (`h-control-md`) designed for general page navigation and primary card headers.
- `Large` (`size="lg"`): Prominent 48px height (`h-control-lg`) designed for top level view routing and prominent display headers.

<br>

### Radius

Tabs provide customizable corner curvature via the `radius` prop:

- `Full` (`radius="full"`): Continuous capsule geometry active by default for pill variants.
- `Large` (`radius="lg"`): Soft modern curvature matching standard container radii.
- `Medium` (`radius="md"`): Balanced standard control rounding.
- `Small` (`radius="sm"`): Subtle corner rounding.
- `None` (`radius="none"`): Sharp architectural corners.

<br>

### States

Tabs communicate interactive status through clear visual states:

- `Rest`: The default inactive state ready for user interaction.
- `Hover`: Pointer presence over a tab, slightly elevating surface lightness or text brightness.
- `Pressed`: Physical touch or mouse down event, applying size specific tactile compression.
- `Active`: The currently selected view, emphasized by the gliding indicator and foreground contrast.
- `Focused`: Keyboard navigation target, rendering a distinct platform focus ring.
- `Disabled`: Inactive state suppressing pointer events and applying muted opacity tokens.

<br>

### Behavior

Tabs manage mutually exclusive view selection through pointer and keyboard activation:

- Selection: Clicking, tapping, or activating a tab selects it immediately and swaps the visible panel.
- Controlled and Uncontrolled: Supports both controlled `value` with `onValueChange` and uncontrolled `defaultValue`.
- Keyboard Traversal: Arrow keys traverse between tabs automatically using a roving focus index.
- Standalone Operation: When used in compact toolbars or canvas controls, `Tabs` and `Tabs.List` can function independently without mounting `Tabs.Panel` wrappers.

<br>

### Object Continuity

Homonoid requires that view transitions preserve spatial identity rather than flickering during state shifts:

- Shared Indicator: The active indicator glides between tabs using a shared layout motion identifier, animating position and dimensions fluidly.
- Stable Bounds: Switching tabs must never introduce layout shifts or container jumping, preserving exact height and width baselines across transitions.
- Content Crossfade: Panels transition smoothly using opacity and subtle translation tokens, avoiding abrupt blank frames.

<br>

### Motion

Motion reinforces tactile feedback and guarantees spatial continuity:

- Size Specific Press Scale: When pressed, individual tabs scale down using tokens calibrated to their control dimensions:
  Small size applies `--motion-press-scale-sm` at 0.94 compression.
  Medium size applies `--motion-press-scale-md` at 0.95 compression.
  Large size applies `--motion-press-scale-lg` at 0.96 compression.
- Gliding Indicator: The active background chip animates horizontally using spring physics with high stiffness and balanced damping for instantaneous responsiveness.
- Easing and Duration: State shifts glide over 250ms normal duration using `--motion-duration-normal` and cubic bezier curves defined by `--motion-easing`.

<br>

### Accessibility

Implementations must satisfy WAI ARIA tab pattern criteria:

- Semantic Roles: Container renders with `role="tablist"`, each tab renders with `role="tab"`, and each panel renders with `role="tabpanel"`.
- State Binding: Active tabs expose `aria-selected="true"` while inactive tabs expose `aria-selected="false"`.
- Identity References: Each tab connects to its panel via `aria-controls` referencing the panel identifier, while panels connect back via `aria-labelledby`.
- Keyboard Roving Focus: Left and Right arrow keys move focus across horizontal tab lists, while Up and Down move focus across vertical lists. Pressing `Home` or `End` jumps to the first or last tab.
- Accessible Labeling: Icon only tabs must provide an explicit `aria-label` attribute.

<br>

### Platform Notes

Web implementations observe standard platform patterns:

- HTML Buttons: Tabs render using native `<button type="button">` elements to prevent unexpected form submissions.
- Focus Rings: Focus styling applies strictly via `:focus-visible` to suppress intrusive rings during pointer clicks.
- SSR Hydration: Initial active indicator geometry must compute reliably on first client mount to avoid flash of unstyled position.

<br>

### Relationships

Tabs coordinate closely with surrounding design system primitives:

- Studio Stage: Powers canvas mode selection between live interactive preview and generated code views.
- Cards: Nest inside card headers to partition complex analytical views into organized sections.
- Modals: Group multi tab settings or profile preferences inside dialog surfaces.

<br>

### Implementation Notes

Platform implementations adhere to monorepo architectural standards:

- Tokens: All colors, radii, spatial gaps, and press motion scales must be consumed directly from `@homonoid/tokens`.
- Web Implementation: Authored in `packages/react` with TypeScript strict mode, React 19, and Tailwind CSS v4.

