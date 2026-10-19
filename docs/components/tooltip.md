# Tooltip

A tooltip presents contextual descriptions or auxiliary keyboard accelerators when users hover over or focus an interactive element.

Tooltips provide non essential supplementary guidance without crowding the primary interface canvas, preserving visual clarity while aiding discovery.

<br>

### Purpose

Tooltips clarify the intent of ambiguous controls, reveal keyboard shortcuts, display full text for truncated content, and offer quick orientation cues.

They appear transiently upon user interest, positioning themselves floating above or beside the reference target without shifting surrounding layout elements.

<br>

### Usage

Use tooltips when:
- An icon only button requires textual identification.
- An action supports a secondary keyboard shortcut.
- Truncated text labels require complete display on inspection.
- Contextual definitions clarify technical terminology.

Do not use tooltips when:
- Information is essential to completing a primary task.
- Content requires user interaction, link clicking, or text selection.
- Detailed rich text or lengthy paragraphs are necessary.
- Form validation errors or critical system alerts need prominent visibility.

<br>

### Anatomy

A tooltip consists of the following elements:

- `Reference Element`: The anchor target triggering the presentation upon hover or keyboard focus.
- `Content Surface`: The floating container displaying the contextual message.
- `Label`: The primary descriptive text string.
- `Shortcut Badge` (Optional): A visual badge presenting keyboard accelerators.
- `Arrow` (Optional): An optional directional indicator pointing to the reference element.

<br>

### Layout

Tooltips float relative to their trigger target while respecting viewport boundaries:

- Placement: Placed along any primary side (`top`, `right`, `bottom`, `left`) with optional alignment (`start`, `center`, `end`).
- Boundary Collision: Automatically flip to opposite sides or shift along viewport margins when proximity bounds collide.
- Spatial Padding: Consume standard token insets to maintain compact visual proportion.
- Surface Offset: Float with a consistent spatial gap from the reference element.

<br>

### Variants

Homonoid structures tooltip surface presentation through variants:

- `Inverted` (`variant="inverted"`): High contrast dark surface on light themes and bright surface on dark themes for immediate legibility.
- `Surface` (`variant="surface"`): Neutral elevation matching secondary card surfaces with a subtle border stroke.
- `Primary` (`variant="primary"`): Accent tinted surface reinforcing primary brand presence.

<br>

### Sizes

Tooltips conform to compact sizing scales:

- `Small` (`size="sm"`): Compact spatial insets and fine typography for dense toolbars and tight icon clusters.
- `Medium` (`size="md"`): Standard padding and typography for general controls, actions, and form inputs.

<br>

### States

Tooltips operate across distinct lifecycle states:

- `Hidden`: Unmounted or completely transparent resting state waiting for interaction.
- `Entering`: Transition state activating upon hover or focus after an intentional delay timer.
- `Visible`: Interactive floating state displaying clear textual guidance.
- `Exiting`: Transition state dissolving smoothly when focus leaves or pointer departs.

<br>

### Behavior

Tooltips activate predictably through pointer and keyboard events:

- Hover Activation: Moving the pointer over the trigger starts an open delay timer to avoid unwanted flashes during sweeping gestures.
- Focus Activation: Keyboard navigation into the trigger displays the tooltip instantly for accessibility parity.
- Escape Dismissal: Pressing `Escape` dismisses open tooltips immediately without shifting active focus.
- Pointer Down Dismissal: Clicking or pressing the reference element dismisses the tooltip.

<br>

### Object Continuity

Homonoid requires that overlay transitions preserve spatial stability and component identity:

- Dimensional Stability: Tooltips maintain stable text geometry without jittering or abrupt content reflow.
- Subtle Scaling: Entering and exiting states apply subtle scale motion (from 0.96 to 1.0) rather than abrupt pops.
- Smooth Dissolve: Opacity fades smoothly over short durations matching motion tokens.

<br>

### Motion

Motion reinforces contextual continuity without introducing distraction:

- Duration: Quick transitions operating over fast durations (`--motion-duration-fast`).
- Easing: Fluid motion easing (`--motion-easing`) ensuring natural organic arrival.
- Directional Cue: Subtle translation away from the trigger upon arrival to indicate physical proximity.

<br>

### Accessibility

Every tooltip implementation must satisfy web accessibility standards:

- Semantic Role: Content container exposes `role="tooltip"`.
- Reference Association: The trigger element links to the tooltip container through `aria-describedby`.
- Pointer Dismissal: Tooltips dismiss cleanly on pointer interaction and escape key strokes.
- Passive Behavior: Tooltips never trap focus or prevent interaction with adjacent elements.

<br>

### Platform Notes

Web implementations observe standard platform conventions:

- Portal Rendering: Render floating surfaces within portal roots to eliminate clipping from overflow hidden parents.
- Pointer Events: Floating surfaces mark pointer events as none to avoid capturing accidental clicks.
- Inert Interaction: Screen readers announce content via ARIA description associations during focus.

<br>

### Relationships

Tooltips coordinate closely with surrounding interactive components:

- Icon Buttons: Primary pairing providing descriptive labels for standalone icon triggers.
- Form Controls: Supply supplementary hints for complex form inputs without cluttering labels.
- Keyboard Shortcuts: Reinforce discovered key bindings across toolbars and navigation menus.

<br>

### Implementation Notes

Platform packages implement this specification using their native toolchain:

- Tokens: All values for padding, radii, colors, and transitions consume `@homonoid/tokens`.
- Positioning: Uses floating position calculation, collision detection, and portal rendering.
- Web Implementation: Built in `packages/react` using React 19, TypeScript, and Tailwind CSS v4.
