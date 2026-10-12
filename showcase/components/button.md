# Button Showcase

Interactive demonstrations and usage examples for the Harmonia Button component.

<br>

### Overview

The Harmonia Button enables users to trigger immediate actions while maintaining object continuity across interaction states.

```tsx
import { Button } from "@harmonia/web";

export function Example() {
  return <Button variant="primary">Continue</Button>;
}
```

<br>

### Variants

Harmonia provides four button variants to establish clear visual hierarchy within an interface:

- `Primary`: High-emphasis action, typically one per section or modal view.
- `Secondary`: Standard actions with subtle borders and neutral background.
- `Ghost`: Minimal emphasis without background fill at rest.
- `Destructive`: High-contrast warning action indicating destructive operations.

```tsx
<div className="flex gap-3">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Delete</Button>
</div>
```

<br>

### Sizes

Buttons support three sizes designed around standardized 8px geometric increments:

- `Small` (`sm`): 32px height, compact interfaces, data tables, and toolbars.
- `Medium` (`md`): 40px height, standard forms and card actions.
- `Large` (`lg`): 48px height, hero sections and high-priority primary actions.

```tsx
<div className="flex items-center gap-3">
  <Button size="sm">Small (32px)</Button>
  <Button size="md">Medium (40px)</Button>
  <Button size="lg">Large (48px)</Button>
</div>
```

<br>

### Continuity in Loading State

Harmonia buttons preserve container dimensions when entering asynchronous operations. The text label cross-fades with the spinner without container collapse or visual jitter.

```tsx
<Button variant="primary" loading={isSubmitting}>
  Submit Application
</Button>
```

<br>

### Icons

Buttons support optional leading and trailing icons aligned with the text baseline:

```tsx
<Button leadingIcon={<PlusIcon />}>Create Item</Button>
<Button trailingIcon={<ArrowRightIcon />}>Next Step</Button>
```

<br>

### Keyboard Navigation and Accessibility

The button adheres to WCAG 2.2 accessibility criteria:

- Keyboard Activation: Supports activation via `Enter` and `Space`.
- High Contrast Focus Ring: Displayed only during keyboard navigation using `:focus-visible`.
- Screen Readers: Sets `aria-busy="true"` and `aria-disabled="true"` during loading states.
