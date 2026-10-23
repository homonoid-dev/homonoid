# Dropdown

A dropdown displays a floating menu of actionable items, contextual operations, and commands anchored to an interactive trigger.

Dropdown menus present secondary choices compactly while maintaining dimensional stability and tactile responsiveness across interactive states.

<br>

### Purpose

Dropdown menus declutter toolbars and surfaces by housing contextual commands within a temporary floating surface.

They conserve screen real estate and prevent visual fatigue by revealing operational choices only upon deliberate user interaction.

<br>

### Usage

Use dropdown menus when:

- Actions apply contextually to a specific entity such as edit, share, duplicate, or delete.
- Toolbar space is constrained and secondary actions must be grouped behind an overflow trigger.
- Navigation menus require hierarchical collections of operational links or shortcuts.
- Complex views provide contextual settings that do not warrant a full modal window.

Do not use dropdown menus when:

- Users must pick a persistent value for a form input where a select is required.
- Selections represent binary boolean toggles where a switch or checkbox is appropriate.
- Content requires rich interactive widgets or complex form fields where a popover is preferred.
- Destructive multi step workflows require dedicated confirmation dialogs.

<br>

### Anatomy

A dropdown component follows a compound component architecture exposing dedicated subcomponents through dot notation:

- `Dropdown`: Root context provider coordinating open state, positioning, active keyboard focus, and dismiss behaviors.
- `Dropdown.Trigger`: Interactive anchor button or element triggering menu presentation.
- `Dropdown.Content`: Floating portal surface container managing placement coordinates and entrance transitions.
- `Dropdown.List`: Bounded scrolling container implementing menu semantics and keyboard navigation.
- `Dropdown.Item`: Interactive action row built directly upon the Tile primitive, supporting leading icons, titles, descriptions, and trailing shortcut hints.
- `Dropdown.Group`: Logical section wrapper categorizing related commands into labeled clusters.
- `Dropdown.Label`: Section heading caption powered by the Homonoid Label component.

```tsx
import { Dropdown, Button, Separator } from "@homonoid/react";

export function DropdownBasic() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outlined">Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.List>
          <Dropdown.Item onSelect={() => console.log("edit")}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => console.log("duplicate")}>
            Duplicate
          </Dropdown.Item>
          <Separator />
          <Dropdown.Item color="destructive" onSelect={() => console.log("delete")}>
            Delete
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}
```

<br>

### Composition

Dropdown menus support flexible composition and clear structural clarity:

- Compound composition gives full control over custom trigger elements, icon accessories, shortcut badges, and group sections.
- Shorthand item properties allow developers to pass leading icons, descriptions, and trailing shortcuts directly without redundant wrappers.

<br>

### Layout

Dropdown components adapt smoothly to view bounds while preserving spatial rhythm:

- Anchored Placement: The floating surface anchors to the trigger with an eight pixel offset gap.
- Viewport Adaptation: Floating surfaces flip vertically when approaching boundary limits and shift horizontally to avoid edge clipping.
- Scroll Constraints: Lists enforce a bounded maximum height with internal scrolling when menu choices exceed vertical capacity.
- Surface Padding: Menus apply standardized container padding to establish harmonious margins around interactive tiles.

<br>

### Variants

Dropdown items support distinct semantic colors aligned with user intent:

- `Surface`: Standard neutral action styling for common operational commands.
- `Subtle`: Deemphasized secondary styling for informational actions.
- `Primary`: Highlighted accent styling for featured or recommended operations.
- `Destructive`: Alert styling signaling irreversible operations like removal or archiving.

<br>

### Sizes

Dropdown menus align with the Homonoid spatial scale through the `size` property:

- `sm`: Compact density for tight table cells and crowded toolbars using thirty six pixel minimum heights.
- `md`: Standard density for general application toolbars and content areas using forty pixel minimum heights.
- `lg`: Generous touch density for mobile viewports and primary actions using forty eight pixel minimum heights.

<br>

### Object Continuity

Dropdown menus uphold strict visual stability during transitions:

- Dimension Stability: Trigger elements retain their exact spatial footprint when menus open and close without press distortion.
- Directional Origin: Entrance animations scale smoothly from the precise anchor point facing the trigger.
- Color Transitions: Hover and focus indicators transition across token values smoothly with zero visual stutter.

<br>

### Accessibility

Dropdown components adhere strictly to WAI ARIA Menu patterns:

- Trigger element declares `aria-haspopup="menu"`, `aria-expanded`, and links to the menu container through `aria-controls`.
- Menu container declares `role="menu"` with an optional `aria-labelledby` reference to its trigger.
- Menu items declare `role="menuitem"`, with disabled choices declaring `aria-disabled="true"`.
- Group sections declare `role="group"` with headings referenced via `aria-labelledby`.
- Focus returns to the trigger automatically upon menu closure or escape dismissal.

<br>

### Design Tokens

Dropdown surfaces consume design tokens exclusively:

- Elevation: Floating surface applies `--elevation-lg` for clear spatial separation above underlying view canvas planes.
- Borders: Surfaces utilize `--border-subtle` hairline outlines for crisp contrast across light and dark modes.
- Radii: Surfaces utilize standardized token radii matching the design system scale.
- Motion: Entrance and exit transitions utilize `--motion-duration-quick`, `--motion-duration-normal`, and `--motion-easing`.

<br>

### Keyboard Interactions

Full native keyboard navigation is guaranteed:

- `Enter` or `Space`: Activates the focused trigger to open the menu, or executes the highlighted item and closes the menu.
- `ArrowDown`: Moves keyboard focus to the next enabled menu item with automatic wrapping.
- `ArrowUp`: Moves keyboard focus to the preceding enabled menu item with automatic wrapping.
- `Home` and `End`: Jumps focus directly to the first or last enabled menu item.
- `Escape`: Closes the open menu immediately and restores focus to the trigger.
- `Tab`: Closes the menu and advances tab focus to the next interactive page element.

<br>

### Component API

The Dropdown root component accepts the following properties:

- `open`: Controlled boolean open state.
- `defaultOpen`: Initial uncontrolled open state.
- `onOpenChange`: Callback triggered when open state changes.
- `placement`: Floating placement string such as `bottom-start`, `bottom-end`, `top-start`, or `top-end`.
- `offset`: Distance in pixels between trigger and floating menu surface. Default is `8`.
- `size`: Typographic and spatial density token passed down to items. Default is `md`.
- `radius`: Border radius token passed down to menu surface and items. Default is `lg`.
- `disabled`: Whether the entire dropdown trigger is inactive.
