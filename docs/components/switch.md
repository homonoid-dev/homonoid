# Switch

A switch toggles the state of a single setting between on and off.

Switches communicate immediate binary preferences, delivering clear tactile affordance and smooth physical transitions across states.

<br>

### Purpose

Switches control immediate activation states in settings menus, preferences panels, configuration rows, and interactive toolbars.

Unlike checkboxes which typically require form submission confirmation, switches activate their state change immediately upon toggle.

<br>

### Usage

Use switches when:
- A setting or preference takes effect immediately without secondary confirmation.
- Users toggle independent binary features such as airplane mode, notifications, or dark mode.
- Presenting list items or settings rows with accompanying labels and descriptions.

Do not use switches when:
- Users select multiple items from a list or collection.
- State changes require secondary form confirmation before applying.
- A mixed indeterminate state is necessary across parent child selections.

<br>

### Anatomy

A switch follows a compound component architecture exposing dedicated sub components through dot notation:

- `Switch`: Root interactive container wrapping the native accessible input and coordinating state across child elements.
- `Switch.Control`: Track boundary providing the physical capsule surface, tactile press feedback, and focus ring container.
- `Switch.Thumb`: Sliding circular thumb element that translates along the track indicating active status.
- `Switch.Content`: Container grouping accompanying label and secondary description text beside the switch control.
- `Label`: The standard Homonoid typography component presenting the primary setting title.
- `Description`: The standard Homonoid caption component clarifying setting behavior.

```tsx
import { Switch, Label, Description } from "@homonoid/react";

export function SwitchExample() {
  return (
    <Switch defaultChecked>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Content>
        <Label>Airplane Mode</Label>
        <Description>Disable cellular, Wi Fi, and Bluetooth connections</Description>
      </Switch.Content>
    </Switch>
  );
}
```

<br>

### Sizes

Switches align with the standardized Homonoid control scale:

- `Small` (`sm`): Track width 28px and height 16px (`w-7 h-4 p-0.5`). Thumb diameter 12px (`w-3 h-3`). Designed for dense tables, compact sidebars, and tight metadata rows.
- `Medium` (`md`): Track width 44px and height 24px (`w-11 h-6 p-0.5`). Thumb diameter 20px (`w-5 h-5`). Standard default density for settings panels, dialogs, and application preferences.
- `Large` (`lg`): Track width 56px and height 32px (`w-14 h-8 p-1`). Thumb diameter 24px (`w-6 h-6`). High prominence density calibrated for touch interactions, tablet displays, and hero preference cards.

<br>

### Radius

Switches support configurable corner curvature matching the Homonoid geometric scale:

- `Full` (`radius="full"`): Standard circular pill shape active as default.
- `Large` (`radius="lg"`): Soft modern corners.
- `Medium` (`radius="md"`): Balanced rectangular curvature.
- `Small` (`radius="sm"`): Subtle corner rounding.
- `None` (`radius="none"`): Sharp rectilinear edges.

<br>

### States

Switches support the following interactive states:

- `Unchecked`: Default inactive state. Surface filled with subtle neutral tone and framed by standard border.
- `Checked`: Active affirmative state. Track filled with primary accent color and thumb translated to the terminal position.
- `Hover`: Enhanced background contrast indicating interactive affordance.
- `Active / Pressed`: Subtle micro scale compression providing physical tactile feedback upon interaction.
- `Focus-Visible`: Homonoid focus ring around the track container for clear keyboard navigation.
- `Disabled`: Reduced opacity (`opacity-50`) with pointer events disabled.
- `Invalid / Error`: Destructive border and focus tint signaling configuration requirements.

<br>

### Object Continuity

Homonoid requires that state transitions preserve component identity and spatial stability:

- Dimensional Stability: The track boundary remains dimensionally invariant across toggles, preventing layout shift in surrounding containers.
- Thumb Continuity: The thumb glides continuously across the track via hardware accelerated translation without visual stepping or layout reflow.
- Color Continuity: Track background colors transition smoothly between neutral and primary states using standard motion duration and easing curves.

<br>

### Motion

Motion parameters adhere strictly to tactile physics and tokens:

- Press Scale: Tactile press compression (`active:scale-[var(--motion-press-scale)]`) providing calibrated feedback across touch and mouse interactions.
- Travel Transition: Thumb sliding duration (`duration-[var(--motion-duration-normal)]`) and easing (`ease-[var(--motion-easing)]`) ensuring smooth physical movement.
- Pure Utility Architecture: Consumes Tailwind CSS utilities and design tokens directly with zero bespoke stylesheets.

<br>

### Accessibility

Every switch implementation satisfies WCAG 2.2 AA accessibility standards:

- Semantic Switch Role: Built on top of a visually hidden `<input type="checkbox" role="switch">` providing native keyboard, form, and screen reader announcements.
- Keyboard Support: Toggleable via `Space` key; navigable via `Tab` and `Shift+Tab`.
- Associated Label: Wrapped within a `<label>` or connected via `htmlFor` and `id` for automatic click delegation.
- Unified Description: Automatically binds supporting description text via `aria-describedby` so screen readers announce title, state, and description upon focus.
- Error Announcement: Connected to validation messages using `aria-invalid`.

<br>

### Implementation Notes

Implemented in `packages/react/src/components/switch/`:
- Consumes `Size` from `@homonoid/react`.
- Supports both compound composition and prop based label and description usage.
- Uses `cond`, `when`, `all`, and `any` condition utilities.
