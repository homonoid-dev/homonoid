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
- Minimum Dimensions: Touch targets must meet or exceed minimum platform tap standards of 44 by 44 points or pixels.

<br>

### Variants

Homonoid separates structural treatment (`variant`) from semantic color intent (`color`):

- `Contained` (`variant="contained"`): High emphasis solid surface fill, providing strong visual prominence.
- `Outlined` (`variant="outlined"`): Medium emphasis transparent surface with a defined 1px hairline border stroke.
- `Plain` (`variant="plain"`): Low emphasis flat button with no resting background or outline, ideal for inline toolbars and subtle utility actions.

<br>

### Colors

Semantic color palettes apply orthogonally across all variants via the `color` prop:

- `Primary` (`color="primary"`): Brand driven Chroma primary palette for the dominant call to action.
- `Subtle` (`color="subtle"`): Low contrast neutral secondary palette for auxiliary options.
- `Surface` (`color="surface"`): Monochromatic surface hierarchy adapting across light and dark modes.
- `Destructive` (`color="destructive"`): Red alert palette signaling irreversible or dangerous operations.

<br>

### Radius

Buttons support configurable corner geometry via the `radius` prop with full rounding active by default:

- `Full` (`radius="full"`): Continuous pill geometry active as the component default.
- `Large` (`radius="lg"`): Soft modern corners.
- `Medium` (`radius="md"`): Balanced standard control curvature.
- `Small` (`radius="sm"`): Subtle corner curvature.
- `None` (`radius="none"`): Sharp rectilinear corners.

<br>

### States

Buttons communicate their operational status through clear visual states:

- `Rest`: The default, inactive state waiting for interaction.
- `Hover`: Pointer presence over the interactive container, shifting surface lightness or elevation.
- `Pressed`: Physical touch or mouse down event, applying tactile compression down to 0.97 scale.
- `Focused`: Keyboard navigation target, rendering a high contrast focus ring.
- `Loading`: Asynchronous process underway, preserving interactive geometry while suppressing repeated submissions.
- `Disabled`: Inactive state indicating the action is currently unavailable.

<br>

### Behavior

Buttons trigger their assigned callback upon pointer release or keyboard activation:

- Activation: Pressing `Enter` or `Space` while focused activates the button immediately.
- Cancellation: Dragging the pointer outside the button surface prior to release cancels the action.
- Rate Limiting: Asynchronous actions lock repeated triggering while transitioning into the loading state.

<br>

### Object Continuity

Homonoid requires that state transitions preserve component identity rather than tearing down and reconstructing views:

- State Transitions: Hover, pressed, and focus states transition smoothly using defined easing curves rather than instantaneous cuts.
- Loading Transition: Transitioning to the loading state must preserve container width and height so the button does not collapse, expand, or jump abruptly.
- Content Morphing: Text labels cross fade smoothly into the loading indicator within the same stable container boundaries.
- Return to Rest: Completing an action smoothly returns the button to its resting state or transitions onward to the resulting interface state.

<br>

### Motion

Motion reinforces tactile feedback and preserves contextual continuity:

- Scale Feedback: Active pressed states apply smooth geometric compression down to scale 0.97.
- Duration: State transitions glide smoothly over 250ms normal duration using `--motion-duration-normal`.
- Easing: Acceleration and deceleration follow the cubic bezier curve defined by `--motion-easing`.
- Loading Motion: The loading indicator animates with steady cadence without causing container shifts.

<br>

### Accessibility

Every button implementation must satisfy accessibility standards:

- Semantic Role: Rendered as a native button element or equivalent platform accessibility role.
- Keyboard Navigation: Fully reachable via sequential keyboard navigation using the `Tab` key.
- Focus Ring: Unobstructed high contrast focus ring visible whenever activated by keyboard navigation.
- Accessible Labeling: Buttons containing only icons must provide an explicit accessible text label.
- Asynchronous State: When in a loading state, the button sets appropriate busy attributes and announces state changes to assistive technologies.

<br>

### Platform Notes

Web implementations must observe web platform standards:

- Semantic Tag: Rendered as an HTML `<button>` element with `type="button"` by default to avoid unintended form submissions.
- Focus Outline: Utilize CSS `:focus-visible` pseudo class to show focus outlines only during keyboard navigation.
- Link Polymorphism: When acting as a route navigation element, support rendering as an anchor tag while retaining full button visual styles and keyboard behavior.

<br>

### Relationships

Buttons interact closely with surrounding components:

- Button Groups: When placed adjacent to other buttons, maintain standardized spacing and clear visual hierarchy.
- Forms: Serve as submit and cancel triggers within input workflows.
- Dialogs: Anchor the action footer to confirm or dismiss modal experiences.

<br>

### Implementation Notes

Platform packages implement this specification using their native toolchain:

- Tokens: All values must be consumed from `@homonoid/tokens`.
- Web Implementation: Built in `packages/react` using React 19, TypeScript strict mode, and Tailwind CSS v4.
