# Checkbox

A checkbox allows users to select one or more independent options from a set, or toggle a single binary state between on and off.

Checkboxes communicate clear affirmative selections and support a three-state model: unchecked, checked, and indeterminate.

<br>

### Purpose

Checkboxes provide deterministic selection in forms, settings panels, filters, data tables, and interactive task lists.

Unlike radio groups which enforce mutual exclusivity, checkboxes permit arbitrary combinations of selections or standalone confirmation toggles (such as agreeing to terms).

<br>

### Usage

Use checkboxes when:
- Users can choose any number of options from a list.
- A single boolean setting requires explicit opt-in confirmation before activation.
- A nested hierarchy or parent collection requires a summary state (indeterminate) when some, but not all, children are selected.

Do not use checkboxes for immediate actions that take effect without confirmation (use Switch instead).

<br>

### Anatomy

A checkbox component consists of the following elements:

- `Control Container`: Bounded square boundary (`sm`, `md`, `lg`) providing the touch target, background surface, and border frame.
- `Glyph Indicator`: SVG vector checkmark (`✓`) or horizontal bar (`—`) communicating active or indeterminate state.
- `Label` (Optional): Clear textual description associated with the control.
- `Description` (Optional): Supporting caption or helper text rendered beneath the label.
- `Hidden Native Input`: Accessible native `<input type="checkbox">` preserving browser form integration and accessibility bindings.

<br>

### Sizes

Checkboxes align with the standardized Homonoid control scale (`Size = "sm" | "md" | "lg"`):

- `Small` (`sm`): 16px × 16px (`w-4 h-4`, radius `rounded-sm`). Designed for dense tables, compact lists, and inline metadata filters.
- `Medium` (`md`): 20px × 20px (`w-5 h-5`, radius `rounded-md`). Standard density for general forms, modals, and settings.
- `Large` (`lg`): 24px × 24px (`w-6 h-6`, radius `rounded-md`). High-prominence density for touch interfaces, onboarding, and hero selections.

<br>

### Shapes

Checkboxes support geometric shape overrides via the `shape` prop (`CheckboxShape = "circle" | "square"`):

- `Default` (`undefined`): Continuous corner radius inherited from size scale (`rounded-sm`, `rounded-md`, `rounded-lg`). Recommended for standard multi-select forms.
- `Circle` (`shape="circle"`): Circular boundary (`rounded-full`). Ideal for task managers, completed checklists, and todo lists.
- `Square` (`shape="square"`): Sharp corners (`rounded-none`). Ideal for dense enterprise data tables and brutalist layouts.

<br>

### States

Checkboxes support the following interactive states:

- `Unchecked`: Default idle state. Clear surface with a subtle neutral border.
- `Checked`: Affirmative selection. Filled with primary color displaying the white checkmark glyph.
- `Indeterminate`: Mixed selection. Filled with primary color or subtle tint displaying a centered horizontal bar.
- `Hover`: Enhanced border contrast or subtle background tint indicating interactive affordance.
- `Active / Pressed`: Subtle micro scale compression (`transform-gpu scale-95`) giving tactile physical response.
- `Focus-Visible`: Prominent Homonoid focus ring (`focus-ring`) around the control container for keyboard navigation.
- `Disabled`: Reduced opacity (`opacity-50`), pointer-events disabled, non-interactive.
- `Invalid / Error`: Destructive border and focus tint signaling required validation failure.

<br>

### Object Continuity

Homonoid requires that state transitions preserve component identity and physical stability:

- Dimensional Stability: The bounding box remains constant across unchecked, checked, and indeterminate states. Zero layout shift occurs when toggling.
- Glyph Transitions: The checkmark and indeterminate bar morph and scale fluidly into place using hardware-accelerated transforms rather than sudden binary pops.
- Color Continuity: Background color fills smoothly transition from transparent/surface to primary using standard token duration and easing.

<br>

### Motion

Motion parameters adhere strictly to tactile physics and `@homonoid/tokens`:

- Micro Scale: Active tactile press compression (`scale-[0.88]`, `group-active:scale-[0.88]`) providing noticeable physical feedback when pressing either the checkbox control or associated label.
- Color Transition: Smooth token transitions (`duration-[var(--motion-duration-fast)]`, `ease-[var(--motion-easing)]`) across border, background, and focus-ring states.
- Pure Utility Architecture: Zero bespoke CSS files required; utilizes Tailwind CSS utilities and design tokens directly.

<br>

### Accessibility

Every checkbox implementation must satisfy WCAG 2.2 AA accessibility standards:

- Native Semantics: Built on top of a visually hidden `<input type="checkbox">` ensuring complete keyboard, form, and screen reader compatibility.
- Mixed State: Sets `aria-checked="mixed"` when indeterminate.
- Keyboard Support: Toggleable via `Space` key; navigable via `Tab` / `Shift+Tab`.
- Associated Label: Wrapped within a `<label>` or connected via `htmlFor` and `id` for automatic label click delegation.
- Unified Description: Automatically binds the supporting description element via `aria-describedby` so screen readers announce label, state, and description simultaneously upon focusing the control.
- Error Announcement: Connected to validation messages using `aria-invalid`.

<br>

### Platform Notes

Web implementations observe standard platform practices:

- Vector Geometry: Crisp resolution-independent SVG paths with `strokeLinecap="round"` and `strokeLinejoin="round"`.
- Token Mapping: Colors derive from `--primary`, `--primary-foreground`, `--border`, `--subtle`, and `--destructive`.

<br>

### Implementation Notes

Implemented in `packages/web/src/components/checkbox/`:
- Consumes `Size` from `@homonoid/web/types`.
- Uses `any` and `all` condition utilities.
- Supports standalone checkbox or checkbox with label/description layout.
