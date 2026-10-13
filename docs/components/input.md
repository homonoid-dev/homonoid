# Input

An input allows users to enter, edit, and submit text data through direct keyboard entry.

Inputs are foundational interface controls for capturing structured and unstructured user data while maintaining dimensional stability and visual continuity across interactive states.

<br>

### Purpose

Inputs capture text strings, numerical values, search queries, contact details, and credentials across forms, toolbars, dialogs, and filters.

They provide immediate visual feedback upon focus, clear guidance on expected formats, and contextual validation signaling.

<br>

### Usage

Use inputs when:
- Users need to provide arbitrary text, numerical information, or structured data (such as emails or telephone numbers).
- A search query or filter term drives interface results.
- Form workflows require data entry before submission.

Do not use inputs when:
- Options are predetermined and mutually exclusive (use Radio Group or Select instead).
- Options are binary on/off toggles (use Checkbox or Switch instead).
- Multi-line rich text or long-form paragraphs are required (use Textarea instead).

<br>

### Anatomy

An input component consists of the following elements:

- `Control Container`: Bounded interactive frame providing the touch target, background surface, border, and focus ring boundary.
- `Native Input`: Standard HTML `<input>` element with transparent background and native typing behavior.
- `Label` (Optional): Clear textual descriptor associated with the input element via accessible identifiers.
- `Leading Adornment` (Optional): Icon or prefix visual anchor preceding text (e.g. search magnifying glass or currency symbol).
- `Trailing Adornment` (Optional): Icon, status indicator, or unit descriptor following text.
- `Clear Action` (Optional): Interactive dismiss button clearing text input and restoring focus.
- `Description` (Optional): Helper text or format instructions positioned beneath the control container.
- `Error Message` (Optional): Semantic validation message signaling invalid input.

<br>

### Layout

Inputs adapt to their parent container width while preserving fixed vertical cadence:

- Full Width: Inputs expand horizontally to fill their parent container (`w-full`) by default, aligning with grid columns and form stacks.
- Alignment: Text and adornments center vertically inside the container frame.
- Padding: Internal horizontal and vertical insets scale according to the control size.
- Adornment Spacing: Consistent spatial gap separates leading/trailing glyphs from the text field.

<br>

### Sizes

Inputs conform to the standardized Harmonia control scale (`Size = "sm" | "md" | "lg"`):

- `Small` (`sm`): 32px height (`h-control-sm`), compact typography (`text-xs` / `text-sm`), and tight padding. Ideal for dense tables, toolbars, and compact filters.
- `Medium` (`md`): 40px height (`h-control-md`), standard typography (`text-sm`), and balanced padding. Standard density for general forms, dialogs, and settings panels.
- `Large` (`lg`): 48px height (`h-control-lg`), prominent typography (`text-base`), and generous padding. High-prominence density for hero search bars, mobile forms, and single-field prompt boxes.

<br>

### Variants

Harmonia defines structural surface treatments via the `variant` prop:

- `Outlined` (`variant="outlined"`): Default structural treatment featuring a defined hairline border stroke (`border-border`) over neutral background (`bg-background`).
- `Filled` (`variant="filled"`): Subdued background surface fill (`bg-surface` or `bg-subtle`) with a minimal border stroke, shifting contrast on focus.
- `Plain` (`variant="plain"`): Transparent borderless container without resting background, ideal for inline data editing and embedded search fields.

<br>

### States

Inputs communicate interactive readiness and status through distinct visual states:

- `Rest`: Default inactive state waiting for interaction.
- `Hover`: Pointer presence over the container, applying subtle border contrast enhancement (`hover:border-foreground/30`).
- `Focus`: Active keyboard entry target, displaying the high-contrast Chroma focus ring (`focus-ring`) around the container boundary.
- `Filled`: Input containing text value, presenting clear action triggers when clearable.
- `Invalid / Error`: Destructive status signaling failed validation, rendering high-visibility red border and focus ring (`border-destructive`, `focus-within:ring-destructive/50`).
- `Disabled`: Inactive state indicating data entry is unavailable (`opacity-50`, `cursor-not-allowed`).
- `Read-Only`: Static informative state preventing modification while preserving readable contrast and text selection.

<br>

### Object Continuity

Harmonia requires that state transitions preserve component identity without abrupt dimensional shifts:

- Geometric Stability: The container's outer bounds (`height`, `border-radius`, `box-shadow`) remain constant when switching between rest, hover, focus, and invalid states.
- Adornment Continuity: Introducing or dismissing a clear button or validation icon transitions smoothly within reserved container slots without causing text jump or layout shift.
- Surface Interpolation: Color transitions for background, border, and focus ring interpolate smoothly using standard motion tokens.

<br>

### Motion

Motion reinforces tactile feedback and state clarity:

- Duration: Focus ring and border color transitions execute over fast durations (`var(--motion-duration-fast)` = 150ms).
- Easing: Follows Harmonia standard easing curves (`var(--motion-easing-standard)` = cubic-bezier(0.2, 0, 0, 1)).
- Dismiss Animation: Clear button and status adornments fade smoothly into position.

<br>

### Accessibility

Every input implementation must satisfy accessibility standards:

- Semantic Role: Rendered using a native HTML `<input>` element.
- Accessible Labeling: Explicitly associated with `<label htmlFor={id}>` or an `aria-label` attribute when a visual label is absent.
- Validation Feedback: Invalid inputs communicate error states programmatically using `aria-invalid="true"`.
- Associated Descriptions: Helper text and validation error messages link to the input via `aria-describedby`.
- Keyboard Traversal: Clear buttons and interactive adornments maintain deterministic keyboard focus order and support activation via `Enter` or `Space`.

<br>

### Platform Notes

Web implementations observe web platform standards:

- Controlled and Uncontrolled: Supports both React controlled (`value`, `onChange`) and uncontrolled (`defaultValue`) usage.
- Ref Forwarding: Forwards ref directly to the native `HTMLInputElement` to allow direct DOM operations (such as `.focus()` or `.select()`).
- Input Types: Compatible with native input types (`text`, `email`, `password`, `search`, `url`, `tel`, `number`).

<br>

### Relationships

Inputs integrate closely with surrounding form components:

- `Field`: Form layout primitive providing labels, descriptions, and error message slots.
- `Button`: Coordinated actions for search submissions, password visibility toggles, or inline clearing.
- `Spinner`: Loading indicator displayed in trailing slots during asynchronous validation or search debouncing.

<br>

### Implementation Notes

Platform packages implement this specification using their native toolchain:

- Tokens: All values (colors, border radii, padding, typography, animations) must be consumed from `@harmonia/tokens`.
- Web Implementation: Built in `packages/web` using React 19, TypeScript, and Tailwind CSS v4.
