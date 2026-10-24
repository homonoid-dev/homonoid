# Kbd

A kbd element indicates keyboard inputs, key combinations, and user triggered shortcut keys.

Keyboard tags present visual affordances for tactile keys with monospace typography, bordered container boundaries, and standardized control scale heights.

<br>

### Purpose

The kbd component conveys executable key presses and platform shortcuts across toolbars, searchbars, menus, and contextual tooltips.

It standardizes the appearance of modifier keys and letters while providing assistive technologies with explicit keyboard semantics.

<br>

### Usage

Use kbd when:

- Indicating keyboard shortcuts inside search inputs or command menus.
- Displaying hotkeys and modifier keys within tooltips or dropdown items.
- Documenting keyboard navigation combinations in documentation guides.

Do not use kbd when:

- Communicating categorical tags or status metadata (use Badge instead).
- Presenting interactive button triggers that users click (use Button instead).

<br>

### Anatomy

The kbd component is a compound primitive consisting of three elements:

- `Kbd`: Native kbd container with monospace styling, surface background fill, and hairline border boundary.
- `Kbd.Abbr`: Semantic abbreviation element displaying modifier key symbols with accessible full name descriptions.
- `Kbd.Content`: Alphanumeric key label displaying primary character key targets.

```tsx
import { Kbd } from "@homonoid/react";

export function KbdCompound() {
  return (
    <Kbd>
      <Kbd.Abbr keyValue="command" />
      <Kbd.Content>K</Kbd.Content>
    </Kbd>
  );
}

export function KbdAtomic() {
  return <Kbd keyValue="command" content="K" />;
}
```

<br>

### Composition

The kbd component supports both compound composition and atomic shorthand configurations:

- Compound Mode: Compose individual `Kbd.Abbr` and `Kbd.Content` subcomponents for customized layouts with multiple modifier symbols.
- Atomic Shorthand: Pass `keyValue` as a string or array alongside `content` to automatically render abbreviations and labels.
- Direct Children: Pass plain text or custom elements directly within the root container.

<br>

### Sizes

The kbd component aligns with the standard Homonoid control scale:

- `Small` (`sm`): Compact key presentation with compact typography (`text-[10px]`) and tight horizontal padding.
- `Medium` (`md`): Balanced default scale with standard typography (`text-xs`) for headers, inputs, and menus.
- `Large` (`lg`): Generous key presentation with standard typography (`text-xs`) and larger minimum width.

<br>

### Radius

The kbd component supports container curvature configuration via the `radius` property:

- `None` (`none`): Square container boundary with sharp corners.
- `Small` (`sm`): Subtle 4px rounded corners (`rounded-sm`).
- `Medium` (`md`): Standard 6px rounded corners (`rounded-md`).
- `Large` (`lg`): Prominent 8px rounded corners (`rounded-lg`).
- `Full` (`full`): Continuous pill curvature (`rounded-full px-2`).

When `radius` is omitted, curvature resolves automatically through compound variants according to the active control scale (`rounded-sm` for small, `rounded-md` for medium, and `rounded-lg` for large).

<br>

### Accessibility

The kbd component adheres strictly to HTML semantics:

- Employs the native semantic `kbd` tag so screen readers recognize keyboard input references.
- Employs the native semantic `abbr` tag with `title` attributes so screen readers announce full modifier names such as Command or Shift.
- Inherits pointer transparency when nested within non interactive shortcut indicators.

<br>

### Design Tokens

The kbd component consumes design tokens exclusively from `@homonoid/tokens`:

- Background: `bg-surface`.
- Border: `border-border`.
- Text: `text-muted`.
- Typography: `font-mono`.
- Radius: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full`.
