# Spinner

A spinner provides non-blocking indeterminate progress feedback, communicating that a background process is active while preserving spatial and visual continuity.

Spinners indicate that an operation is underway without requiring precise completion time estimations.

<br>

### Purpose

Spinners provide immediate visual confirmation of asynchronous operations such as network requests, asset loading, state recalculation, and background synchronization.

They reassure the user that the system is responsive and progressing toward completion.

<br>

### Usage

Use spinners for operations with brief or indeterminate durations where a deterministic progress bar cannot be calculated.

Place spinners contextually inside the object undergoing change (such as buttons, cards, or input fields) or centered within a dedicated content viewport.

Avoid using multiple spinners simultaneously in the same viewport when a single localized or global indicator can communicate the state.

<br>

### Anatomy

A spinner consists of the following elements:

- `Container`: The bounded geometric container establishing the dimensional envelope (`size-4`, `size-6`, or `size-8`).
- `Indicator`: The moving geometric element that animates along predefined Homonoid motion curves.
- `Track` (Optional): A subdued static baseline path over which the indicator traverses during circular animations.
- `Accessible Announcement`: An off-screen or programmatic label (`role="status"`, `aria-label="Loading"`) for assistive technologies.

<br>

### Sizes

Spinners support three standardized sizes aligned with the Homonoid control scale:

- `Small` (`sm`): 16px × 16px (`size-4`). Designed for inline contexts, dense tables, and small button accessories.
- `Medium` (`md`): 24px × 24px (`size-6`). Standard indicator for forms, cards, and default controls.
- `Large` (`lg`): 32px × 32px (`size-8`). High-prominence indicator for modal dialogs and full-page loading states.

<br>

### Animation Variants

Homonoid defines four animation variants that express physical continuity and material behavior:

- `Border`: High precision circular track with a continuously rotating arc indicator, representing continuous angular motion.
- `Grow`: Rhythmic radial expansion and contraction with subtle opacity transitions, providing a calm organic breathing cadence.
- `Orbit`: Orbital satellite nodes traveling along a celestial guide track with Keplerian acceleration.
- `Dash`: Radial segmented dashes with stepped rotational cadence, offering a classic tactile activity indicator.

<br>

### States

Spinners operate in a singular continuous active state:

- `Active`: Continuously looping animation rendering fluid motion along standard easing curves.
- `Entering`: Smooth cross-fade transition into view with dimensional stability.
- `Exiting`: Smooth cross-fade departure once the asynchronous process resolves.

<br>

### Object Continuity

Homonoid requires that loading indicators integrate seamlessly into parent components without dimensional disruption:

- Dimensional Reservation: When embedded within buttons or form controls, the spinner must occupy an absolute overlay or matching spatial slot to avoid layout jumps.
- Fluid Transitions: Motion must remain continuous and never stutter across frame drops or state updates.
- Theme Continuity: Spinners inherit `currentColor` by default, harmonizing with their immediate parent context across light and dark modes.

<br>

### Motion

Motion parameters adhere strictly to `@homonoid/tokens`:

- Rotation Speed: Continuous 360-degree rotation over 750ms to 1000ms.
- Easing: Utilizes standard easing curves (`cubic-bezier(0.4, 0, 0.2, 1)`) for radial breathing cadence and linear progression for `border`.
- GPU Compositing: Driven exclusively by hardware-accelerated transforms (`transform-gpu`, `rotate`, `scale`) and opacity to guarantee 60fps performance.

<br>

### Accessibility

Every spinner implementation must satisfy WCAG 2.2 accessibility standards:

- Semantic Role: Rendered with `role="status"` to identify the element as a live region.
- Text Alternative: Includes a default `aria-label="Loading"` or visually hidden text fallback.
- Hidden in Decorative Contexts: When paired with a visible text label (such as inside a loading button with accompanying text), the visual spinner sets `aria-hidden="true"` to prevent redundant screen reader announcements.
- Reduced Motion: Honors `prefers-reduced-motion` by reducing pulse amplitude or replacing rapid rotation with a gentle opacity fade.

<br>

### Platform Notes

Web implementations must observe web platform standards:

- SVG Vector Geometry: Rendered using crisp, resolution-independent SVG elements to avoid pixelation on high-density displays.
- CSS Keyframe Animations: Driven by optimized CSS animations running on the compositor thread.

<br>

### Implementation Notes

Platform packages implement this specification using their native toolchain:

- Tokens: Consumes colors, stroke dimensions, and timing from `@homonoid/tokens`.
- Web Implementation: Built in `packages/web` using React 19, TypeScript, and Tailwind CSS v4.
