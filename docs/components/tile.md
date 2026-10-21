# Tile

A tile provides a structured horizontal list item container composed of a leading visual slot, a flexible central content column, and a trailing accessory slot.

Tiles serve as primary building blocks for structured lists, settings panels, navigation menus, and master detail feeds while preserving spatial stability and tactile responsiveness.

<br>

### Purpose

Tiles organize information into scannable horizontal rows where each item pairs descriptive copy with optional visual anchors and interactive accessories.

They establish consistent row height rhythm and responsive layout boundaries across repetitive collection surfaces.

<br>

### Usage

Use tiles for settings menus, navigation lists, feed items, device rosters, and interactive pickers.

Avoid placing multiple competing interactive elements inside a single interactive tile container to prevent gesture ambiguity.

<br>

### Anatomy

A tile consists of the following elements:

- `Container`: The bounded surface element defining geometry, background, border stroke, and padding.
- `Leading` (Optional): A visual anchor preceding the content column, typically housing an icon, avatar, thumbnail, or status indicator.
- `Content`: The central column arranging label copy and optional supporting description text.
- `Label`: The primary text node communicating the identity or subject of the tile, powered by the Homonoid Label component.
- `Description` (Optional): Auxiliary supporting copy providing context or secondary metadata, powered by the Homonoid Description component.
- `Trailing` (Optional): An accessory element following the content column, commonly containing a chevron, switch, badge, radio, or timestamp.

<br>

### Composition

Tiles support both compound subcomponent composition and direct shorthand properties:

- Compound notation provides complete control over internal element placement through `Tile.Leading`, `Tile.Content`, `Tile.Label`, `Tile.Description`, and `Tile.Trailing`.
- Shorthand slot properties (`leading`, `label`, `description`, `trailing`) provide concise syntax for standard list configurations without boilerplate.

<br>

### Variants

Homonoid defines three structural variants for tiles via the `variant` property:

- `Plain` (`variant="plain"`): Transparent surface with no resting border or fill, providing subtle background shifts upon hover and active press. This is the default variant.
- `Contained` (`variant="contained"`): Solid surface fill providing grounded visual separation across complex views.
- `Outlined` (`variant="outlined"`): Transparent surface framed by a hairline border stroke to delineate individual rows.

<br>

### Colors

Tiles support semantic color intent palettes aligned with Homonoid design tokens:

- `Surface` (`color="surface"`): Standard neutral palette adapting across light and dark modes. This is the default color.
- `Subtle` (`color="subtle"`): Low contrast secondary tint for muted items or soft selections.
- `Primary` (`color="primary"`): Brand primary highlight tint for active selections and navigation landmarks.
- `Destructive` (`color="destructive"`): Alert tint for critical warnings, security notices, or deletion options.

<br>

### Sizes

Tiles support three density configurations via the `size` prop:

- `Small` (`size="sm"`): Compact density for tight popover menus, command palettes, and dense lists.
- `Medium` (`size="md"`): Standard control height density for settings rows and application lists. This is the default size.
- `Large` (`size="lg"`): Generous spacing for hero list rows, profile cards, and rich media items.

<br>

### Radius

Tiles support configurable corner curvature via the `radius` prop:

- `Large` (`radius="lg"`): Soft modern corners active as the component default.
- `Medium` (`radius="md"`): Balanced standard control curvature.
- `Small` (`radius="sm"`): Subtle corner curvature.
- `Full` (`radius="full"`): Continuous pill geometry for floating row chips.
- `None` (`radius="none"`): Sharp rectilinear corners for flush divider separated lists.

<br>

### States

Interactive tiles communicate operational status across touch, pointer, and keyboard interaction:

- `Rest`: Default resting state waiting for interaction.
- `Hover`: Pointer presence shifting surface lightness or background fill.
- `Pressed`: Physical touch or pointer down event applying tactile compression down to 0.97 scale.
- `Focused`: Sequential keyboard navigation highlighting the tile with a standardized inset focus ring.
- `Selected`: Persistent active state highlighting the row through semantic tinting or check accessories.
- `Disabled`: Inactive state reducing opacity and suppressing pointer events.

<br>

### Motion

Tactile motion preserves spatial identity and aligns with the button interaction model:

- Scale Feedback: Active pressed states apply smooth geometric compression down to scale 0.97 using the `--motion-press-scale` token.
- Duration: State transitions glide over normal duration using `--motion-duration-normal`.
- Easing: Acceleration and deceleration follow the cubic bezier curve defined by `--motion-easing`.
- Layout Continuity: Internal slots remain dimensionally stable to eliminate layout jitter when state transitions trigger.

<br>

### Accessibility

Every tile implementation must adhere to accessibility standards:

- Semantic Role: Renders as a semantic `<button>` when interactive by default, or accepts polymorphic rendering as an anchor tag `<a>` or structural container `<div>`.
- Keyboard Navigation: Fully reachable via sequential `Tab` key progression when interactive.
- Focus Ring: Unobstructed high contrast focus ring visible during keyboard navigation.
- Accessible Labeling: Connects internal label and description elements through descriptive identifiers to inform assistive technologies.
- Selection States: Conveys active selections through `aria-selected` or `aria-current` attributes.

<br>

### Relationships

Tiles integrate seamlessly with adjacent layout containers:

- Cards: Group multiple tiles inside a card to form structured settings panels.
- Lists: Stack tiles vertically with or without hairline dividers.
- Controls: Host switches, checkboxes, or badges inside the trailing slot for streamlined preference forms.

<br>

### Implementation Notes

Platform packages implement this specification using native tools:

- Tokens: All styling values originate from `@homonoid/tokens` with zero arbitrary values.
- Web Implementation: Built in `packages/react` using React 19, TypeScript strict mode, and Tailwind CSS v4.
