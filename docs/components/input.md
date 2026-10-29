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
- `Leading Slot` (Optional): Leading composition area preceding the text entry area for user-provided icons, prefixes, or triggers.
- `Trailing Slot` (Optional): Trailing composition area following the text entry area for user-provided icons, suffixes, status badges, or custom buttons.
- `Description` (Optional): Helper text or format instructions positioned beneath the control container.
- `Error Message` (Optional): Semantic validation message signaling invalid input.

<br>

### Layout

Inputs adapt to their parent container width while preserving fixed vertical cadence:

- Full Width: Inputs expand horizontally to fill their parent container (`w-full`) by default, aligning with grid columns and form stacks.
- Alignment: Text and slot elements center vertically inside the container frame.
- Padding: Internal horizontal and vertical insets scale according to the control size.
- Slot Spacing: Consistent spatial gap separates leading/trailing slot content from the text field.

<br>

### Sizes

Inputs conform to the standardized Homonoid control scale (`Size = "sm" | "md" | "lg"`):

- `Small` (`sm`): 32px height (`h-control-sm`), compact typography (`text-xs` / `text-sm`), and tight padding. Ideal for dense tables, toolbars, and compact filters.
- `Medium` (`md`): 40px height (`h-control-md`), standard typography (`text-sm`), and balanced padding. Standard density for general forms, dialogs, and settings panels.
- `Large` (`lg`): 48px height (`h-control-lg`), prominent typography (`text-base`), and generous padding. High-prominence density for hero search bars, mobile forms, and single-field prompt boxes.

<br>

### Variants

Homonoid defines structural surface treatments via the `variant` prop:

- `Outlined` (`variant="outlined"`): Default structural treatment featuring a defined hairline border stroke (`border-border`) over neutral background (`bg-background`).
- `Contained` (`variant="contained"`): Subdued background surface fill (`bg-surface`) with a minimal border stroke, shifting contrast on focus.
- `Plain` (`variant="plain"`): Transparent borderless container without resting background, ideal for inline data editing and embedded search fields.

<br>

### Radius

Inputs support corner curvature configurations via the `radius` property:

- `None` (`none`): Square container boundary with sharp corners (`rounded-none`).
- `Small` (`sm`): Subtle 4px rounded corners (`rounded-sm`).
- `Medium` (`md`): Standard 6px rounded corners (`rounded-md`).
- `Large` (`lg`): Prominent 8px rounded corners (`rounded-lg`).
- `Full` (`full`): Continuous pill curvature (`rounded-full`).

<br>

### States

Inputs communicate interactive readiness and status through distinct visual states:

- `Rest`: Default inactive state waiting for interaction.
- `Hover`: Pointer presence over the container, applying subtle border contrast enhancement (`hover:border-foreground/30`).
- `Focus`: Active keyboard entry target, highlighting the container border with the Chroma primary color (`focus-within:border-primary`).
- `Invalid / Error`: Destructive status signaling failed validation, rendering high-visibility red border (`border-destructive`, `focus-within:border-destructive`).
- `Disabled`: Inactive state indicating data entry is unavailable (`opacity-50`, `cursor-not-allowed`).
- `Read-Only`: Static informative state preventing modification while preserving readable contrast and text selection.

<br>

### Floating Labels

Inputs support an animated floating label configuration via the `floating` property.

The label rests inside the text entry slot when empty and unfocused, aligning naturally with leading adornments without manual offsets.

Upon focus or value entry, the label animates upward to straddle the top container border. A solid background mask matching the container surface prevents border strokes from bleeding through during hover and active states.

<br>

### Object Continuity

Homonoid requires that state transitions preserve component identity without abrupt dimensional shifts:

- Geometric Stability: The container's outer bounds (`height`, `border-radius`) remain constant when switching between rest, hover, focus, and invalid states.
- Composition Continuity: Accommodating leading or trailing elements preserves container boundaries and vertical alignment without layout shift.
- Surface Interpolation: Color transitions for background and border interpolate smoothly using standard motion tokens.

<br>

### Motion

Motion reinforces tactile feedback and state clarity:

- Duration: Border color transitions execute over fast durations (`var(--motion-duration-fast)` = 150ms).
- Easing: Follows Homonoid fluid easing curves (`var(--motion-easing)` = cubic-bezier(0.34, 1.4, 0.64, 1)).

<br>

### Accessibility

Every input implementation must satisfy accessibility standards:

- Semantic Role: Rendered using a native HTML `<input>` element.
- Accessible Labeling: Explicitly associated with `<label htmlFor={id}>` or an `aria-label` attribute when a visual label is absent.
- Validation Feedback: Invalid inputs communicate error states programmatically using `aria-invalid="true"`.
- Associated Descriptions: Helper text and validation error messages link to the input via `aria-describedby`.
- Unconstrained Composition: When interactive controls are placed inside leading or trailing slots, they maintain independent keyboard focusability and ARIA annotations.

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
- `Button`: Adjacent submit/search buttons or custom trailing actions.
- `Spinner`: Loading indicator displayed in trailing slots during asynchronous operations.

<br>

### Implementation Notes

Platform packages implement this specification using their native toolchain:

- Tokens: All values (colors, border radii, padding, typography, animations) must be consumed from `@homonoid/tokens`.
- Web Implementation: Built in `packages/web` using React 19, TypeScript, and Tailwind CSS v4.
