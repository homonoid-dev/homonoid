# Toggle

A toggle communicates a two state choice and enables users to activate or deactivate a preference, formatting attribute, or view mode with a single click.

Toggles operate both as independent binary controls and as connected item groups supporting single select or multi select behaviors.

<br>

### Purpose

Toggles provide instant, tactile feedback for binary decisions across formatting bars, settings panels, and display options.

Unlike standard action buttons that trigger transient tasks or navigation, toggles maintain persistent active status and visually reflect their pressed state.

<br>

### Usage

Use toggles when:
* Applying rich text formatting choices such as bold, italic, or code in document toolbars.
* Switching interface layout arrangements such as list or grid views.
* Muting, bookmarking, pinning, or toggling persistent feature preferences.
* Grouping mutually exclusive or collective options inside connected toolbars.

Do not use toggles when:
* Triggering destructive or permanent operations that require secondary confirmation.
* Submitting forms where standard checkboxes are more semantically appropriate.
* Initiating standard page navigation where links or buttons should be used.

<br>

### Anatomy

The toggle component architecture accommodates both standalone buttons and connected item groups through compound subcomponents:

* `Toggle`: The primary two state interactive button surface. In standalone mode it renders the toggle directly.
* `Toggle.Group`: An organizational container coordinating mutual exclusivity, collective selection sets, and roving keyboard navigation.
* `Toggle.Item`: An individual toggle button nested within a group container, inheriting group dimensions and selection logic.

<br>

### Composition

Toggles support dual interface paradigms tailored for both direct implementation and flexible groupings:

* Atomic Shorthand: Developers declare properties such as `pressed`, `defaultPressed`, `onPressedChange`, `variant`, `color`, and `size` directly on the root component.
* Compound Dot Notation: Developers assemble `Toggle.Group` and `Toggle.Item` subcomponents to construct docked toolbars, text alignment sets, and multi select collections.

<br>

### Primitive Composition

The toggle composes core Homonoid primitives under the hood to ensure token consistency:

* `Button`: Powers the underlying physical press surface, tactile motion scale, focus ring styles, and control height scales without code duplication.

<br>

### Variants

Homonoid separates structural surface treatments from semantic color palettes through the `variant` property:

* `Contained` (`variant="contained"`): Solid background surface fill upon activation, providing strong visual prominence.
* `Outlined` (`variant="outlined"`): Transparent interior with a defined one pixel hairline border stroke, offering balanced secondary emphasis.
* `Plain` (`variant="plain"`): Transparent resting state with soft active background fills, ideal for minimal inline toolbars.

<br>

### Colors

Semantic color intent applies orthogonally across all variants through the `color` property:

* `Primary` (`color="primary"`): Brand driven Chroma primary palette for focal selections and highlighted modes.
* `Subtle` (`color="subtle"`): Low contrast neutral palette for quiet toolbar options and auxiliary selections.
* `Surface` (`color="surface"`): Monochromatic palette adapting cleanly across light and dark surface planes.
* `Destructive` (`color="destructive"`): Red alert palette signaling active recording, irreversible muting, or safety overrides.

<br>

### Sizes

Toggles adapt to surrounding interface hierarchy across three standard dimensional scales aligning with control height tokens:

* `Small` (`size="sm"`): Scaled at thirty two pixels height with compact proportions, tailored for dense toolbars and nested menus.
* `Medium` (`size="md"`): Standard forty pixel height optimized for cards, content headers, and default toolbar controls.
* `Large` (`size="lg"`): Scaled at forty eight pixels height for prominent action strips and expansive touch surfaces.

<br>

### Geometry and Shapes

Corner curvature adapts through the `radius` property with continuous rounding active by default:

* `Full` (`radius="full"`): Continuous pill geometry active as the component default.
* `Medium` (`radius="md"`): Softened modern curvature aligned with standard control tokens.
* `Small` (`radius="sm"`): Subtle rounding suited for compact rectangular toolbars.
* `None` (`radius="none"`): Sharp rectilinear edges for technical dashboards and docked industrial strips.

<br>

### Grouping and Docking

The `Toggle.Group` subcomponent coordinates multiple toggle items into cohesive toolbars:

* Single Selection: Supports mutually exclusive options like text alignment where selecting an item deactivates previous choices.
* Multiple Selection: Supports collective options like text styles where multiple items remain active simultaneously.
* Docked Borders: Merges adjacent borders across grouped items with negative pixel offsets, removing redundant internal dividers.
* Rounded Masking: Automatically rounds the outer perimeter corners while keeping internal boundaries rectilinear.

<br>

### Accessibility

Toggles uphold platform accessibility standards:

* Standalone Semantics: Renders native HTML button elements bearing explicit `aria-pressed="true"` or `aria-pressed="false"` attributes reflecting current activation.
* Group Roles: Exposes `role="radiogroup"` with child items bearing `role="radio"` and `aria-checked` in single select mode, or `role="group"` with `aria-pressed` in multi select mode.
* Keyboard Traversal: Supports roving tabindex navigation using Arrow Left, Arrow Right, Arrow Up, and Arrow Down keys within groups.
* Accessible Labels: Requires descriptive `aria-label` strings on icon only toggle surfaces to ensure comprehension for screen reader users.
* Physical Feedback: Delivers tactile press scale responses without shifting adjacent layout dimensions.

