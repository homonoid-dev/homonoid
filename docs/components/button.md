# Button

A button communicates an action and allows users to trigger that action with a single interaction.

Buttons are primary interactive landmarks within interfaces, providing direct affordances for user intent while preserving continuity across states.

<br>

### Purpose

Buttons trigger immediate operations, submit workflows, initiate processes, and navigate between states.

They provide clear, legible feedback confirming that an action has been recognized and is actively processing.

<br>

### Usage

Use buttons for actions that impact application state, such as submitting data, opening dialogs, confirming decisions, or toggling modes.

Avoid using buttons for pure navigation when an anchor link is more semantically appropriate, unless the link functions as a primary call to action within an application flow.

<br>

### Anatomy

A button consists of the following elements:

- `Container`: The bounded interactive surface defining the shape, background, and boundaries of the component.
- `Label`: The text string communicating the specific action to be performed.
- `Leading Icon` (Optional): A visual glyph preceding the label to reinforce intent or recognition.
- `Trailing Icon` (Optional): A glyph following the label, commonly indicating direction or disclosure.
- `Loading Indicator` (Optional): An animated indicator replacing or accompanying the label during asynchronous operations.
- `Focus Indicator`: A distinct visual ring displayed during keyboard navigation.

<br>

### Layout

Buttons adapt to their content while maintaining consistent vertical cadence and internal proportions:

- Alignment: Content inside the button is centered both horizontally and vertically by default.
- Padding: Internal horizontal padding scales relative to button height to maintain visual balance.
- Gap: A consistent spatial gap separates icons from text labels.
- Minimum Dimensions: Touch targets must meet or exceed minimum platform tap standards (44x44 points or pixels).

<br>

### Variants

Harmonia defines five button variants to express visual hierarchy:

- `Primary`: High-emphasis button using solid primary tokens for the main call to action.
- `Secondary`: Medium-high emphasis button using a subtle tinted surface (`bg-subtle text-subtle-foreground`), providing soft visual weight.
- `Outline`: Medium-emphasis button with an explicit hairline stroke (`border border-border`), ideal for auxiliary actions against content cards.
- `Ghost`: Low-emphasis button without a solid background at rest, used for subtle or tertiary actions.
- `Destructive`: Specialized high-emphasis variant using warning tokens for actions that cause irreversible data changes.

<br>

### States

Buttons communicate their operational status through clear visual states:

- `Rest`: The default, inactive state waiting for interaction.
- `Hover`: Pointer presence over the interactive container, subtly shifting surface lightness or elevation.
- `Pressed`: Physical touch or mouse down event, applying tactile compression and subtle scale or color darkening.
- `Focused`: Keyboard navigation target, rendering a high-contrast focus ring without relying solely on color.
- `Loading`: Asynchronous process underway, preserving interactive geometry while suppressing repeated submissions.
- `Disabled`: Inactive state indicating the action is currently unavailable.

<br>

### Behavior

Buttons trigger their assigned callback upon pointer release (mouse up / tap up) or keyboard activation:

- Activation: Pressing `Enter` or `Space` while focused activates the button immediately.
- Cancellation: Dragging the pointer outside the button surface prior to release cancels the action.
- Rate Limiting: Asynchronous actions lock repeated triggering while transitioning into the loading state.

<br>

### Object Continuity

Harmonia requires that state transitions preserve component identity rather than tearing down and reconstructing views:

- State Transitions: Hover, pressed, and focus states transition smoothly using defined easing curves rather than instantaneous cuts.
- Loading Transition: Transitioning to the loading state must preserve container width and height. The button must not collapse, expand, or jump abruptly.
- Content Morphing: Text labels cross-fade smoothly into the loading indicator within the same stable container boundaries.
- Return to Rest: Completing an action smoothly returns the button to its resting state or transitions onward to the resulting interface state.

<br>

### Motion

Motion reinforces tactile feedback and preserves contextual continuity:

- Scale Feedback: Active and pressed states apply a subtle spring compression (scale 0.98) that rebounds smoothly on release.
- Duration: State color transitions occur over short durations (150ms to 200ms) with ease-out curves.
- Loading Motion: The loading indicator animates with steady, non-distracting cadence.

<br>

### Accessibility

Every button implementation must satisfy accessibility standards:

- Semantic Role: Rendered as a native button element or equivalent platform accessibility role.
- Keyboard Navigation: Fully reachable via sequential keyboard navigation (`Tab` key).
- Focus Ring: Unobstructed high-contrast focus ring visible whenever activated by keyboard navigation.
- Accessible Labeling: Buttons containing only icons must provide an explicit accessible text label.
- Asynchronous State: When in a loading state, the button sets appropriate busy attributes (`aria-busy="true"`, `aria-disabled="true"`) and announces state changes to assistive technologies.

<br>

### Platform Notes

Web implementations must observe web platform standards:

- Semantic Tag: Rendered as an HTML `<button>` element with `type="button"` by default to avoid unintended form submissions.
- Focus Outline: Utilize CSS `:focus-visible` pseudo-class to show focus outlines only during keyboard navigation.
- Link Polymorphism: When acting as a route navigation element, support rendering as an anchor tag (`<a>`) while retaining full button visual styles and keyboard behavior.

<br>

### Relationships

Buttons interact closely with surrounding components:

- Button Groups: When placed adjacent to other buttons, maintain standardized spacing and clear visual hierarchy.
- Forms: Serve as submit and cancel triggers within input workflows.
- Dialogs: Anchor the action footer to confirm or dismiss modal experiences.

<br>

### Implementation Notes

Platform packages implement this specification using their native toolchain:

- Tokens: All values (colors, border radii, padding, typography, animations) must be consumed from `@harmonia/tokens`.
- Web Implementation: Built in `packages/web` using React 19, TypeScript, and Tailwind CSS v4.
