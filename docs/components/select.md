# Select

A select displays a collapsible list of mutually exclusive options in a floating surface anchored to an interactive trigger control.

Select controls allow users to filter views, choose settings, pick form attributes, and navigate structured collections while maintaining dimensional stability and tactile responsiveness across interactive states.

<br>

### Purpose

Select controls present predefined options compactly without cluttering the screen canvas.

They conserve vertical space on forms, toolbars, and filter rows by revealing the complete option list only upon deliberate activation.

<br>

### Usage

Use select controls when:

- Users must choose a single value from a list of five or more predefined choices.
- Space constraints favor a compact collapsed control over an expanded list of radio buttons.
- Form inputs require standardized values such as countries, currencies, timezones, or account roles.
- Filter toolbars allow users to switch active data perspectives or sorting orders.

Do not use select controls when:

- Options number fewer than four and canvas space allows direct radio buttons.
- Selections represent binary boolean toggles where a switch or checkbox is appropriate.
- Users need freeform text entry or arbitrary search terms where an input is needed.
- Options require multi step creation flows where a modal dialog is preferred.

<br>

### Anatomy

A select component follows a compound component architecture exposing dedicated subcomponents through dot notation:

- `Select`: Root context provider coordinating open state, selected value, active keyboard index, and positioning calculations.
- `Select.Trigger`: Interactive anchor button rendering the current selection, placeholder copy, and trailing disclosure chevron.
- `Select.Value`: Text container presenting the selected option label or placeholder copy.
- `Select.Content`: Floating portal container isolating spatial positioning coordinates from entrance transitions.
- `Select.List`: Bounded scrolling container implementing listbox semantics, focus isolation, and option virtualization.
- `Select.Item`: Selectable choice row built directly upon the Tile component, inheriting standardized leading, label, description, and trailing check accessories with zero code duplication.
- `Select.Group`: Logical grouping wrapper categorizing related options into labeled clusters.
- `Select.Label`: Group heading caption powered by the Homonoid Label component.
- `Select.Separator`: Hairline divider stroke separating option groups or auxiliary commands.
- `Select.Description`: Supporting caption beneath the trigger powered by the Homonoid Description component.

```tsx
import { Select } from "@homonoid/react";

export function SelectBasic() {
  return (
    <Select defaultValue="us">
      <Select.Trigger aria-label="Select country">
        <Select.Value placeholder="Choose country" />
      </Select.Trigger>
      <Select.Content>
        <Select.List>
          <Select.Item value="us">United States</Select.Item>
          <Select.Item value="ca">Canada</Select.Item>
          <Select.Item value="uk">United Kingdom</Select.Item>
          <Select.Item value="de">Germany</Select.Item>
        </Select.List>
      </Select.Content>
    </Select>
  );
}
```

<br>

### Composition

Select controls support both compound composition and streamlined shorthand props:

- Compound composition gives full flexibility over item grouping, custom slot adornments, and separator placement.
- Shorthand slot properties allow developers to pass label, description, placeholder, and options array directly for rapid assembly.

<br>

### Layout

Select components adapt cleanly to container bounds while upholding spatial control rhythm:

- Trigger Cadence: Triggers match the standardized control heights across small, medium, and large density scales.
- Full Width: Triggers expand horizontally to fill parent containers while preserving padding rhythm.
- Anchored Positioning: The floating surface aligns flush with the trigger bottom edge using an eight pixel vertical offset gap.
- Viewport Adaptation: Floating surfaces flip vertically when colliding with bottom viewport boundaries and shift horizontally to stay on screen.
- Scroll Boundaries: Floating lists enforce a maximum height ceiling with smooth internal scrolling when items exceed vertical limits.

<br>

### Variants

Select triggers mirror button structural surface treatments via the `variant` property:

- `Contained` (`variant="contained"`): Solid surface fill providing grounded visual distinction across complex forms.
- `Outlined` (`variant="outlined"`): Transparent surface bounded by a hairline border stroke to frame selections subtly. This is the default variant.
- `Plain` (`variant="plain"`): Transparent surface with no resting border, adopting surface hover fills upon pointer entry for inline toolbars.

<br>

### Colors

Select components support semantic color intent palettes aligned with Homonoid tokens:

- `Surface` (`color="surface"`): Standard neutral palette adapting across light and dark presentations. This is the default color.
- `Subtle` (`color="subtle"`): Low contrast secondary tint for quiet filters or subdued menus.
- `Primary` (`color="primary"`): Brand accent palette for prominent interactive selections.
- `Destructive` (`color="destructive"`): Alert palette for critical warning selections or deletion categories.

<br>

### Sizes

Select components conform to the standardized Homonoid control scale:

- `Small` (`size="sm"`): Thirty two pixel control height with tight padding, designed for dense toolbars and compact popovers.
- `Medium` (`size="md"`): Forty pixel standard control height matching default form rhythm. This is the default size.
- `Large` (`size="lg"`): Forty eight pixel prominent control height for hero forms and mobile touch contexts.

<br>

### Radius

Triggers and floating lists support configurable corner geometry via the `radius` prop:

- `Large` (`radius="lg"`): Soft modern corners active as the component default.
- `Medium` (`radius="md"`): Balanced standard control curvature.
- `Small` (`radius="sm"`): Subtle corner curvature.
- `Full` (`radius="full"`): Continuous pill geometry for floating filter chips.
- `None` (`radius="none"`): Sharp rectilinear corners for flush tiled form rows.

<br>

### States

Select components express operational state clearly across pointer and keyboard interactions:

- `Rest`: Default resting state presenting the current value or placeholder text.
- `Hover`: Pointer presence shifting trigger background lightness or border tone.
- `Pressed`: Pointer down action applying tactile compression down to 0.97 scale.
- `Open`: Expanded state with rotated trailing chevron and highlighted trigger border.
- `Focused`: Keyboard navigation target displaying an inset focus ring.
- `Item Highlight`: Active option under keyboard traversal highlighted with surface hover tint.
- `Item Selected`: Chosen option marked by high contrast foreground text and checkmark indicator.
- `Disabled`: Inactive state reducing opacity and disabling pointer interactions.
- `Invalid`: Validation error state applying destructive border strokes and alert captions.

<br>

### Motion

Motion reinforces tactile feedback while keeping overlay positioning rock solid:

- Trigger Compression: Active pressed triggers compress down to 0.97 scale using the motion press scale token.
- Chevron Rotation: The trailing chevron rotates one hundred and eighty degrees smoothly using normal motion duration.
- Surface Appearance: The floating surface enters with a ninety five percent scale morph and opacity dissolve over fast duration.
- Positioning Isolation: Outer floating coordinate positioning remains strictly separated from inner scale transforms to prevent origin conflicts.

<br>

### Accessibility

Every select implementation adheres strictly to WAI ARIA Combobox specifications:

- Semantic Roles: Trigger exposes combobox role with aria expanded, aria haspopup listbox, and aria controls references.
- Floating Listbox: Menu surface renders with listbox role and vertical orientation.
- Option Roles: Selectable items expose option role and convey state through aria selected.
- Keyboard Navigation: Down and Up arrow keys traverse options sequentially without closing the list.
- Keyboard Selection: Pressing Enter or Space selects the highlighted option and dismisses the surface.
- Quick Dismissal: Pressing Escape closes the floating surface and restores focus to the trigger.
- Typeahead Search: Typing character keys jumps focus directly to matching options for rapid navigation.
- Accessible Labeling: Connects external label and error messages via aria labelledby and aria describedby references.

<br>

### Relationships

Select controls collaborate with surrounding form and layout structures:

- Tile: Select.Item directly consumes the Tile component as its underlying structural primitive, guaranteeing identical hover physics, press compression, typography inheritance, and layout rhythm across dropdown options.
- Label and Description: Form fields pair trigger controls with Label and Description components.
- Popovers and Modals: Select controls host options within floating portals that render above modals without clipping.
- Tables and Toolbars: Compact size variants integrate inside table filter headers and pagination bars.

<br>

### Implementation Notes

Platform packages implement this specification using native toolchain libraries:

- Tokens: All visual values originate exclusively from `@homonoid/tokens` with zero arbitrary values.
- Positioning: Floating overlay mechanics rely on floating ui coordinate calculation without layout flicker.
- Web Package: Built in `packages/react` using React 19, TypeScript strict mode, and Tailwind CSS v4.
