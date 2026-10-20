# Modal

A modal displays an elevated dialog surface over the application canvas to focus user attention on a discrete task, critical confirmation, or rich sub flow.

Modals interrupt standard workflow by rendering a dimmed backdrop overlay and trapping keyboard focus, requiring explicit dismissal or completion before users return to the primary interface.

<br>

### Purpose

Modals present critical decisions, complex multi step forms, contextual inspectors, or urgent system confirmations without navigating away from the current view.

They establish direct focus, eliminate peripheral distractions, and preserve underlying application context while isolating high priority interactions.

<br>

### Usage

Use modals when:
- Users must confirm a destructive or irreversible action before execution.
- A discrete workflow requires multiple input fields without navigating away from the current page.
- Critical system alerts require immediate user acknowledgement.
- Rich auxiliary details or media require inspection in an isolated focused surface.

Do not use modals when:
- Displaying lightweight auxiliary descriptions or contextual hints where tooltips or popovers suffice.
- Presenting non essential information that can be read inline without task interruption.
- Navigating complex multi page applications that warrant distinct URL routes.
- Mobile screen density favors full page views or persistent drawer surfaces.

<br>

### Anatomy

A modal follows a compound component architecture exposing dedicated sub components through dot notation:

- `Modal`: Root context provider managing open state, keyboard dismissal, scroll lock coordination, and focus trapping.
- `Trigger`: Direct interactive child element such as a button initiating modal presentation upon click without artificial wrapper layers.
- `Modal.Backdrop`: Ambient overlay plane managing visual dimming, background blur, and click outside dismissal configuration.
- `Modal.Container`: Layout positioning shell centering the dialog within the viewport and managing scroll mechanics.
- `Modal.Dialog`: Floating surface housing modal content with elevated tokens, rounded borders, and accessibility semantics.
- `Modal.Header`: Top section organizing titles and optional action controls.
- `Modal.Heading`: The standard `Label` component integrated under the modal namespace to present semantic titles.
- `Modal.Body`: Central scrollable content region hosting form controls, explanatory copy, or custom widgets.
- `Modal.Footer`: Bottom section organizing primary actions, secondary options, and dismissal buttons.

```tsx
import { Modal, Button } from "@homonoid/react";

export default function Example() {
  return (
    <Modal>
      <Button>Open Modal</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Confirmation</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              Please confirm your action before proceeding.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="surface">Cancel</Button>
              <Button variant="primary">Confirm</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
```

<br>

### Layout

Modals maintain balanced spatial hierarchy and responsive adaptation across viewports:

- Centered Alignment: Centers the dialog horizontally and vertically within the viewport canvas by default.
- Top Alignment: Optional top biased placement for search palettes or command dialogs.
- Scroll Containment: Supports internal body scrolling (`scroll="inside"`) when modal content exceeds viewport height while keeping header and footer pinned.
- Viewport Scrolling: Supports container level scrolling (`scroll="outside"`) where the entire dialog scrolls naturally on smaller screens.
- Edge Margins: Enforces tokenized margin insets preventing the dialog surface from touching outer viewport boundaries.

<br>

### Sizes

Modals scale predictably across dimensional scales:

- `Small` (`size="sm"`): Compact surface width tailored for brief confirmations and single prompt decisions.
- `Medium` (`size="md"`): Standard width providing balanced proportions for general forms and settings.
- `Large` (`size="lg"`): Expansive width suitable for rich editing workflows and multi column inputs.
- `Cover` (`size="cover"`): Expands nearly to the full viewport while preserving standard surface margins and rounded corners.
- `Full` (`size="full"`): Covers the entire viewport canvas edge to edge without any margins, padding, or corner curvature.

<br>

### Variants

Modals provide semantic treatments across both dialog surfaces and overlay planes:

- Dialog Surface Default (`variant="default"`): Elevated neutral surface (`bg-surface`) framed by a subtle hairline border stroke (`border-border`).
- Dialog Surface Destructive (`variant="destructive"`): Critical alert dialog styling highlighting danger confirmations with focused destructive action accents.
- Backdrop Blur (`variant="blur"`): Semi transparent dark overlay enhanced with backdrop filter blur (`backdrop-blur-md`).
- Backdrop Opaque (`variant="opaque"`): Grounded solid contrast overlay (`bg-black/60`) without backdrop blur.
- Backdrop Transparent (`variant="transparent"`): Invisible backdrop surface enabling click dismissal while preserving canvas visibility.

<br>

### States

Modals operate across defined lifecycle states:

- `Closed`: Unmounted or completely inert resting state where overlay planes remain transparent to pointer hits.
- `Entering`: Transition state animating backdrop opacity and dialog scale smoothly into view upon trigger activation.
- `Open`: Active state trapping keyboard focus, locking underlying body scroll, and presenting accessible content.
- `Exiting`: Transition state dissolving backdrop opacity and scaling down the dialog before restoring focus to trigger.

<br>

### Behavior

Modals enforce clear interaction boundaries and predictable dismissal patterns:

- Backdrop Dismissal Control: `Modal.Backdrop` controls click outside dismissal through the `isDismissable` boolean property.
- Escape Key Dismissal: Pressing `Escape` closes the open modal instantly and returns focus to the trigger element.
- Focus Trapping: Tab navigation cycles exclusively through focusable elements within the active dialog container.
- Initial Focus: Focus transfers automatically to the first focusable control inside the modal or a designated initial element.
- Scroll Lock: Document body scrolling is locked while the modal is open, preventing disorienting background movement.
- Return Focus: Closing the modal restores keyboard focus directly to the original trigger element to maintain keyboard navigation continuity.

<br>

### Object Continuity

Homonoid requires that modal transitions preserve spatial stability and component identity:

- Dimensional Stability: Dialog dimensions remain stable throughout opening and closing phases without geometric jitter.
- Origin Scaling: Entering transitions scale gently from 0.96 to 1.0 rather than popping abruptly onto the screen.
- Scrollbar Stability: Scroll locks apply compensation padding to prevent layout shifts when document scrollbars vanish.

<br>

### Motion

Motion reinforces spatial elevation without creating visual delay:

- Duration: Operates over standardized motion tokens (`--motion-duration-normal`).
- Easing: Applies smooth organic deceleration curves (`--motion-easing`).
- Synchronized Fades: Backdrop opacity and dialog scale animate concurrently for cohesive entrance and exit.
- Reduced Motion: Respects user motion preferences by replacing scale transitions with simple opacity dissolves.

<br>

### Accessibility

Every modal implementation must satisfy strict accessibility criteria:

- Semantic Role: The dialog surface exposes `role="dialog"` or `role="alertdialog"` for urgent confirmations.
- Modal Boundary: Exposes `aria-modal="true"` to signal assistive technologies that background elements are inert.
- Keyboard Navigation: Native keyboard support including `Tab`, `Shift+Tab`, `Escape`, and `Enter`.
- Inert Background: Marks underlying application roots inert while the modal is mounted to block screen reader traversal outside the dialog.

<br>

### Platform Notes

Web implementations observe standard platform conventions:

- Portal Mounting: Mounts modal surfaces into a top level portal container to prevent clipping from parent overflow boundaries.
- Pointer Transparency: Inactive and exiting overlay containers set pointer events to none until entrance completes.
- Hydration Resilience: Supports server rendered initial markup while managing portal mounting safely upon client hydration.

<br>

### Relationships

Modals coordinate with other components across the Homonoid ecosystem:

- Button: Powers opening triggers and primary confirmation actions inside `Modal.Footer`.
- Label: Powers `Modal.Heading` to provide consistent typographic hierarchy.
- Card: Shares surface elevation tokens, subtle borders, and corner radius scales.
- Input and Description: Populates structured form fields within `Modal.Body`.
- Spinner: Communicates pending state during asynchronous confirmation submissions.

<br>

### Implementation Notes

Platform packages implement this specification according to repository standards:

- Tokens: Consumes spatial paddings, elevations, radii, colors, and motion exclusively from `@homonoid/tokens`.
- React Architecture: Authored in `packages/react` with React 19, TypeScript strict mode, and Tailwind CSS v4.
- Compound Structure: Components export via dot notation on the parent `Modal` namespace.
- Functional Helpers: Uses repository conditional helpers rather than inline ternaries.
