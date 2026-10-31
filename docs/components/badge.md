# Badge

A badge presents concise metadata, live status indicators, categorical labels, or numerical counts across interface elements.

Badges operate both as inline status elements and as floating notification anchors overlaid upon targets such as avatars, icons, and buttons.

<br>

### Purpose

Badges draw attention to salient changes, unread notifications, workflow states, and categorical attributes without interrupting primary user interactions.

They provide immediate visual differentiation through calibrated Chroma color palettes, structured typography tokens, and predictable spatial placements.

<br>

### Usage

Use badges when:
* Displaying qualitative milestone status such as active, pending, verified, or draft states.
* Communicating quantitative notifications such as unread message counts or item tallies.
* Anchoring status markers or counters to avatars, navigation icons, or interactive action buttons.
* Categorizing collection items with small non interactive metadata pills.

Do not use badges when:
* Rendering interactive tags that users click to filter complex queries, where chips or toggle buttons are more appropriate.
* Displaying critical alert banners that require multiline explanations or actionable dismiss workflows.
* Overcrowding interfaces with non essential numerical indicators that increase cognitive load.

<br>

### Anatomy

The badge component architecture accommodates both standalone chips and anchored overlays through compound subcomponents and shorthand atomic properties:

* `Badge`: The root element. In standalone mode it renders the badge pill directly. In anchored mode with children it acts as the relative positioning anchor.
* `Badge.Anchor`: The explicit positioning anchor container when coupling a target component with an overlay indicator.
* `Badge.Indicator`: The floating overlay marker or standalone indicator dot positioned relative to the target anchor.
* `Badge.Label`: The primary text string encapsulating the Homonoid Label primitive under the hood to ensure consistent typography tokens.
* `Badge.Leading`: An optional visual slot preceding the label, commonly housing status dots, category icons, or spinner animations.
* `Badge.Trailing`: An optional visual slot following the label, commonly housing numerical quantities or accessory icons.

<br>

### Composition

Badges support dual interface paradigms tailored for both standard speed and granular customization:

* Atomic Shorthand: Developers declare properties such as `count`, `dot`, `leading`, `trailing`, and `placement` directly on the root component to build complete badges with zero boilerplate.
* Compound Dot Notation: Developers assemble `Badge.Anchor`, `Badge.Indicator`, `Badge.Leading`, `Badge.Label`, and `Badge.Trailing` subcomponents to construct bespoke arrangements and complex overlays.

<br>

### Variants

Homonoid separates structural surface treatments from semantic color palettes through the `variant` property:

* `Contained` (`variant="contained"`): Solid background surface fill, delivering maximum visual presence for dominant status states and prominent counts.
* `Outlined` (`variant="outlined"`): Transparent interior with a defined one pixel hairline border stroke, offering balanced secondary prominence.
* `Plain` (`variant="plain"`): Transparent background and borderless silhouette, ideal for minimal inline indicators and status dots.

<br>

### Colors

Semantic color intent applies orthogonally across all variants through the `color` property:

* `Primary` (`color="primary"`): Brand driven Chroma primary palette for focal statuses and active notifications.
* `Subtle` (`color="subtle"`): Low contrast neutral palette for auxiliary classifications and quiet counts.
* `Surface` (`color="surface"`): Monochromatic palette adapting cleanly across light and dark surface planes.
* `Destructive` (`color="destructive"`): Red status palette signaling urgent notifications, critical errors, or destructive alerts.

<br>

### Sizes

Badges adapt to their surrounding hierarchy across three standard dimensional scales:

* `Small` (`size="sm"`): Scaled at eighteen pixels height with compact padding, tailored for dense table rows, nested lists, and standalone indicator dots.
* `Medium` (`size="md"`): Standard twenty two pixel height optimized for body typography, cards, and default control pairings.
* `Large` (`size="lg"`): Scaled at twenty six pixels height for prominent headings, hero banners, and expansive view surfaces.

<br>

### Geometry and Shapes

Corner curvature adapts through the `radius` property with continuous rounding active by default:

* `Full` (`radius="full"`): Continuous pill geometry active as the component default.
* `Medium` (`radius="md"`): Softened modern curvature aligned with standard control tokens.
* `Small` (`radius="sm"`): Subtle rounding suited for compact rectangular data tags.
* `None` (`radius="none"`): Sharp rectilinear edges for technical dashboards.

<br>

### Overlay Positioning

When operating as an anchored overlay, the indicator positions relative to its host container through the `placement` property:

* `top-right`: Anchored at the upper right boundary, standard for notification counters on buttons and icons.
* `top-left`: Anchored at the upper left boundary.
* `bottom-right`: Anchored at the lower right boundary, standard for online presence dots on avatars.
* `bottom-left`: Anchored at the lower left boundary.

The positioning engine automatically offsets the indicator across both horizontal and vertical axes to overlap the host element boundary cleanly without clipping.

<br>

### Numerical Thresholds

Numeric badges accept a `count` property alongside an optional `max` ceiling threshold defaulting to ninety nine. When the provided quantity exceeds the threshold, the badge renders the maximum count accompanied by a plus symbol to prevent dimensional layout distortion.

<br>

### Accessibility

Badges implement rigorous accessibility guarantees across interactive and static scenarios:

* Semantic Roles: Informative badges announcing dynamic status updates apply `role="status"` to inform assistive tools.
* Screen Reader Copy: Pure numerical counters and status dots provide descriptive hidden labels so that quantities and states convey clear contextual meaning.
* Decorative Icons: Auxiliary leading and trailing glyphs apply `aria-hidden="true"` to prevent duplicate announcements.
* Color Independence: Status badges pair color fills with text labels or distinct glyph shapes to ensure legibility for users with visual color differences.

<br>

### Design Tokens

All badge styling consumes tokens exclusively from `@homonoid/tokens` with zero hardcoded visual constants:

* Surfaces and Borders: Inherits `var(--primary)`, `var(--subtle)`, `var(--surface)`, and `var(--destructive)` alongside corresponding border and foreground tokens.
* Typography: Inherits typographic weights and leading tokens directly from the Homonoid Label primitive.
* Geometry: References standardized radius tokens across full pill and rounded box options.

