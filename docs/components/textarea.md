# Textarea

A textarea allows users to enter, edit, and submit multi line text content through direct keyboard interaction.

Textareas represent foundational interface controls for capturing paragraph copy, descriptions, feedback messages, and structured code snippets while maintaining dimensional stability, fluid auto resizing, and visual continuity across interactive states.

<br>

### Purpose

Textareas capture long form unstructured copy across forms, comment threads, feedback sheets, modals, and settings cards.

They provide immediate visual feedback upon focus, clear guidance on expected formats, and contextual validation signaling while supporting optional auto expansion as content grows.

<br>

### Usage

Use textareas when:
* Users need to enter multiple lines of text, paragraphs, or comments.
* Content length is unpredictable and exceeds the single line capacity of an input.
* Freeform feedback, bug reports, or descriptions are required.
* Form workflows require rich textual explanations before submission.

Do not use textareas when:
* Capturing single line values such as email addresses, names, or passwords (use Input instead).
* Options are predetermined and mutually exclusive (use Radio Group or Select instead).
* Options represent binary states (use Checkbox or Switch instead).
* Selecting from large option sets using query filtering (use Autocomplete instead).

<br>

### Anatomy

The textarea functions as a unified atomic component powered directly by the Input architecture under the hood:

* `Control Container`: Bounded interactive frame providing the touch surface, background fill, border stroke, and focus ring boundary.
* `Native Textarea`: Standard HTML textarea element with transparent background, native selection mechanics, and keyboard event routing.
* `Label` (Optional): Clear textual descriptor associated with the textarea element either as a floating badge or as an external heading.
* `Description` (Optional): Subordinate helper copy or formatting guidance positioned beneath the control container.
* `Error Message` (Optional): Semantic validation message signaling invalid entry linked programmatically.

<br>

### Primitive Composition

The textarea composes core Homonoid primitives and styling systems under the hood to ensure complete ecosystem harmony:

* `Input Foundation`: Inherits the container frame, border transitions, surface tokens, and Chroma focus ring mechanics established in the Input component.
* `Floating Mask`: Reuses the background masking plate and notch translation math from the Input floating label system.
* `Label`: Powers the accessible external heading and floating text label.
* `Description`: Powers subordinate guidance copy beneath the control surface.

<br>

### Usage Example

```tsx
import { Textarea } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      {/* Standard Textarea */}
      <Textarea
        label="Feedback"
        placeholder="Share your thoughts with the team..."
        description="Write concise feedback regarding your experience."
        rows={4}
      />

      {/* Floating Label Textarea */}
      <Textarea
        floating
        label="Project Notes"
        placeholder="Document continuous thoughts..."
        autoResize
        minRows={3}
        maxRows={8}
      />

      {/* Validation Error State */}
      <Textarea
        label="Description"
        placeholder="Enter at least twenty characters..."
        defaultValue="Too short"
        error="Description must contain at least twenty characters."
      />
    </div>
  );
}
```

<br>

### Sizes

Textareas conform to the standardized Homonoid control scale:

* `Small` (`sm`): Compact typography (`text-xs`), tight internal padding (`px-2.5 py-2`), and refined line height. Ideal for dense tables, side panels, and compact modal dialogs.
* `Medium` (`md`): Standard typography (`text-sm`), balanced padding (`px-3 py-2.5`), and standard line height. Default density for general forms, settings views, and cards.
* `Large` (`lg`): Prominent typography (`text-base`), comfortable padding (`px-3.5 py-3`), and generous spacing. High prominence density for dedicated editorial forms and hero feedback prompts.

<br>

### Variants

Homonoid defines structural surface treatments matching the Input component:

* `Outlined` (`variant="outlined"`): Default structural treatment featuring a defined hairline border stroke (`border-border`) over neutral transparent background.
* `Contained` (`variant="contained"`): Subdued background surface fill (`bg-surface`) with subtle hover elevation (`hover:bg-surface-hover`) shifting contrast on focus.
* `Plain` (`variant="plain"`): Transparent borderless container without resting background, ideal for inline editing workflows and embedded canvas surfaces.

<br>

### Radius

Textareas support corner curvature configurations via the `radius` property:

* `None` (`none`): Square container boundary with sharp corners (`rounded-none`).
* `Small` (`sm`): Subtle 4px rounded corners (`rounded-md`).
* `Medium` (`md`): Standard 6px rounded corners (`rounded-lg`).
* `Large` (`lg`): Prominent 8px rounded corners (`rounded-xl`).
* `Full` (`full`): Continuous pill curvature along container edges (`rounded-2xl`).

<br>

### Auto Resizing

Textareas support dynamic vertical expansion based on content volume:

* `Auto Resize Toggle`: Passing `autoResize` activates synchronous height calculations tracking element scroll height.
* `Row Boundaries`: Developers configure `minRows` to declare the resting height and `maxRows` to set the ceiling before vertical scroll bars engage.
* `Dimensional Stability`: Layout calculations adjust container bounds smoothly without causing scroll jumps or layout flicker during continuous typing.
* `Manual Resize`: When auto resize is disabled, developers configure the `resize` property (`"none" | "vertical" | "horizontal" | "both"`) to specify user drag capabilities.

<br>

### Floating Labels

Textareas support the animated floating label system popularized by the Input component:

* When `floating` is enabled, the label rests inside the upper area of the textarea and scales smoothly upward into the top border notch upon focus or content presence.
* A solid background mask matching the container surface prevents border strokes from bleeding through during hover and active states.
* When `floating` is omitted, the label renders as a standard accessible heading element above the control surface.

<br>

### States

Textareas communicate interactive readiness and status through distinct visual states:

* `Rest`: Default inactive state waiting for user interaction.
* `Hover`: Pointer presence over the container, applying subtle border contrast enhancement (`hover:border-foreground/30`).
* `Focus`: Active keyboard entry target, highlighting the container border with the Chroma primary color (`focus-within:border-primary`).
* `Invalid`: Destructive status signaling failed validation, rendering high visibility red border accents (`border-destructive`, `focus-within:border-destructive`).
* `Disabled`: Inactive state indicating data entry is unavailable (`opacity-50`, `cursor-not-allowed`, `pointer-events-none`).
* `Read Only`: Static informative state preventing modification while preserving readable contrast and text selection.

<br>

### Accessibility

Every textarea implementation must satisfy accessibility standards:

* Semantic Element: Rendered using a native HTML `<textarea>` element with native focus and keyboard event handling.
* Accessible Naming: Programmatically associated with a `<label htmlFor={id}>` or an `aria-label` attribute when a visual label is absent.
* Validation Signaling: Invalid textareas communicate error states programmatically using `aria-invalid="true"`.
* Associated Guidance: Helper descriptions and validation error messages link to the textarea via `aria-describedby` and `aria-errormessage`.
* Keyboard Traversal: Native Tab order navigation without trapped focus.

<br>

### Props Specification

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | `undefined` | Unique element identifier |
| `label` | `ReactNode` | `undefined` | Visual label associated with the textarea |
| `floating` | `boolean` | `false` | Enables animated floating label styling |
| `description` | `ReactNode` | `undefined` | Subordinate guidance caption beneath the field |
| `error` | `ReactNode` | `undefined` | Validation error message displayed beneath the field |
| `invalid` | `boolean` | `false` | Explicit invalid visual state toggle |
| `variant` | `"outlined" \| "contained" \| "plain"` | `"outlined"` | Surface treatment style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Density and typography scaling scale |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Corner border radius curvature |
| `autoResize` | `boolean` | `false` | Enables automatic vertical expansion based on content |
| `minRows` | `number` | `3` | Minimum row boundary when auto resize is active |
| `maxRows` | `number` | `10` | Maximum row boundary before enabling native vertical scroll |
| `resize` | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` | Manual drag handle direction |
| `disabled` | `boolean` | `false` | Disables interaction and dims control surface |

