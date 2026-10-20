# Popover

A popover presents rich interactive content within a transient floating surface anchored to an interactive trigger element.

Popovers provide non modal or modal contextual overlays such as filter menus, rich property pickers, profile summaries, or complex confirmation actions while preserving surrounding application context.

<br>

### Purpose

Popovers expose secondary actions, rich controls, detailed metadata, and interactive forms without navigating away from the current canvas.

They balance spatial economy with information density, appearing immediately upon user interaction and floating securely above adjacent interface layers.

<br>

### Usage

Use popovers when:
- An action reveals rich interactive controls such as date pickers, color pickers, or multi field filter forms.
- Supplementary profile cards or preview summaries require clickable links or interactive buttons.
- Contextual menus or action lists require custom structured content beyond plain lists.
- Lightweight inline confirmations need anchored positioning directly beside the triggering control.

Do not use popovers when:
- Displaying passive, non interactive descriptions where tooltips are appropriate.
- Requiring heavy multi step workflows that command full user focus where modals or full pages are needed.
- Presenting critical system notifications that belong in toasts or persistent banner alerts.
- Space constrained mobile contexts favor persistent bottom sheet drawers.

<br>

### Anatomy

A popover follows a compound component architecture exposing dedicated sub components through dot notation:

- `Popover`: Root context provider coordinating open state, floating positioning, interaction listeners, and focus management.
- `Popover.Trigger`: Interactive anchor element initiating presentation upon activation without artificial wrapper elements.
- `Popover.Content`: Floating portal container isolating spatial positioning coordinates from entrance transitions.
- `Popover.Dialog`: Elevated surface housing popover content with tokenized padding, borders, shadows, and semantic dialog roles.
- `Popover.Heading`: The standard `Label` component integrated under the popover namespace to present semantic titles.

```tsx
import { Popover, Button } from "@homonoid/react";

export function PopoverBasic() {
  return (
    <Popover>
      <Button>Click me</Button>
      <Popover.Content className="max-w-64">
        <Popover.Dialog>
          <Popover.Heading>Popover Title</Popover.Heading>
          <p className="mt-2 text-sm text-muted">
            This is the popover content. You can put any content here.
          </p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
```

<br>

### Layout

Popovers float relative to their trigger anchor while adapting intelligently to viewport constraints:

- Placement: Positions across four cardinal sides (`top`, `right`, `bottom`, `left`) with optional alignments (`start`, `center`, `end`).
- Collision Detection: Flips automatically across opposite axes and shifts along viewport edges to maintain full on screen visibility.
- Surface Offset: Floats with consistent tokenized offset gaps (`offset={8}`) between trigger and surface.

<br>

### Variants

Popovers express elevation and visual hierarchy through surface tokens:

- `Surface` (`variant="surface"`): Default neutral elevated surface consuming standard surface tokens (`bg-surface`) and borders (`border-border`).
- `Primary` (`variant="primary"`): Brand accented surface providing heightened contextual emphasis.
- `Inverted` (`variant="inverted"`): High contrast dark surface on light themes and bright surface on dark themes.

<br>

### Sizes

Popovers scale across predictable dimensional widths:

- `Small` (`size="sm"`): Compact surface width tailored for brief confirmation prompts and compact pickers.
- `Medium` (`size="md"`): Standard width balanced for general form inputs, property lists, and card previews.
- `Large` (`size="lg"`): Expansive width suited for multi column filters and rich interactive widgets.
- `Auto` (`size="auto"`): Flexible natural width conforming to the intrinsic dimension of nested children.

<br>

### States

Popovers navigate through distinct interaction states:

- `Closed`: Inert resting state where floating planes remain unmounted or completely transparent to pointer hits.
- `Entering`: Transition state animating floating opacity and subtle scale into active visibility upon trigger interaction.
- `Open`: Fully interactive surface receiving keyboard focus and handling user input.
- `Exiting`: Transition state dissolving opacity and scaling smoothly toward initial rest before unmounting.

<br>

### Behavior

Popovers enforce predictable interaction and dismissal flows:

- Trigger Activation: Clicking or activating the trigger toggles open state smoothly.
- Outside Interaction: Clicking outside the popover surface or trigger dismisses the popover when dismissable.
- Escape Dismissal: Pressing `Escape` closes the open popover instantly and returns focus to the trigger element.
- Focus Management: Directs focus smoothly into the popover surface upon opening and restores focus cleanly upon dismissal.
- Implicit Trigger Binding: Automatically infers direct child elements as triggers when explicit trigger tags are omitted.

<br>

### Object Continuity

Homonoid requires that overlay transitions preserve spatial stability and component identity:

- Dimensional Stability: Dialog dimensions remain stable throughout entrance and departure phases without layout jitter.
- Origin Isolation: Isolates outer floating coordinate positioning from inner scale and opacity transitions to eliminate transform origin conflicts.
- Subtle Scaling: Entering states apply subtle scale motion (from 0.96 to 1.0) rather than abrupt pops.
- Smooth Dissolve: Opacity transitions smoothly across standardized motion tokens.

<br>

### Motion

Motion reinforces contextual elevation without visual latency:

- Duration: Operates over standardized motion tokens (`--motion-duration-fast` and `--motion-duration-normal`).
- Easing: Applies smooth organic curves (`--motion-easing`).
- Directional Cue: Floats cleanly away from the trigger anchor during presentation.
- Reduced Motion: Respects user motion preferences by bypassing scale transformations in favor of opacity dissolves.

<br>

### Accessibility

Every popover implementation satisfies strict digital accessibility standards:

- Semantic Role: The dialog container exposes `role="dialog"` and `aria-modal="false"` for non modal surfaces.
- Reference Association: The trigger element links dynamically to the dialog container through `aria-haspopup="dialog"`, `aria-expanded`, and `aria-controls`.
- Title Identification: Headings attach `id` descriptors linked directly to `aria-labelledby` on the dialog surface.
- Keyboard Navigation: Supports natural tab traversal across focusable interactive elements within the popover.
- Escape Key: Guarantees prompt dismissal when users press `Escape` without triggering side effects.

<br>

### Platform Notes

Web implementations observe standard platform conventions:

- Portal Rendering: Renders floating elements within portal roots to eliminate clipping from parent containers with hidden overflow.
- Positioning Isolation: Outer container manages floating coordinates while inner wrappers manage transition transforms.
- Event Bubbling: Prevents unwanted event bubbling into parent listeners when interacting within the popover surface.

<br>

### Relationships

Popovers coordinate closely with complementary components across the Homonoid ecosystem:

- Button: Operates as the standard trigger element and supplies action controls inside the dialog.
- Label: Powers `Popover.Heading` to provide consistent typographic hierarchy.
- Tooltip: Complements popovers by handling passive text hints while popovers handle interactive content.
- Modal: Complements popovers by providing heavy modal interruption for high stakes tasks.

<br>

### Implementation Notes

Platform packages implement this specification according to repository standards:

- Tokens: Consumes spatial paddings, elevations, radii, colors, and motion exclusively from `@homonoid/tokens`.
- React Architecture: Authored in `packages/react` using React 19, TypeScript strict mode, and Tailwind CSS v4.
- Compound Structure: Components export via dot notation on the parent `Popover` namespace.
- Functional Helpers: Uses repository conditional utilities (`cond`, `match`, `when`, `any`, `all`, `none`) rather than inline ternaries.
