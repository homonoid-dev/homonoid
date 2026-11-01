# Avatar

An avatar visually represents an individual user, group, entity, or automated agent across an interface.

Avatars support image sources, calculated text initials, generic silhouette fallbacks, status presence indicators, and grouped stacks.

<br>

### Purpose

Avatars establish visual recognition, communicate user identity, and signal personal presence within collaborative workspaces.

They maintain immediate visual differentiation through calibrated Chroma color palettes, structured typography tokens, and predictable dimensional scales.

<br>

### Usage

Use avatars when:
* Displaying user identity within navigation bars, comments, chat messages, or author bylines.
* Representing teams, organizations, or automated agents with distinct visual silhouettes.
* Signaling active live presence such as online, busy, away, or offline statuses.
* Grouping multiple participants in collaborative boards, document headers, or assignees lists.

Do not use avatars when:
* Displaying product catalog thumbnails or arbitrary non identity media assets.
* Rendering primary standalone action buttons that lack secondary labels or accessible descriptions.
* Cluttering dense data tables where simple textual identifiers offer superior readability.

<br>

### Anatomy

The avatar component accommodates both self contained atomic usage and granular compound customization through subcomponents:

* `Avatar`: The root container establishing bounding dimensions, corner radius masking, and shared context.
* `Avatar.Image`: The visual graphic layer rendering the image source with continuous aspect ratio and object cover scaling.
* `Avatar.Fallback`: The surface displayed during image loading or upon load failure, housing initials or placeholder icons.
* `Avatar.Indicator`: An anchored status or presence marker positioned relative to the avatar outer perimeter.
* `Avatar.Group`: An organizational container coordinating multiple avatars with negative horizontal overlap and count limits.

<br>

### Composition

Avatars support dual interface paradigms tailored for both speed and custom composition:

* Atomic Shorthand: Developers declare properties such as `src`, `name`, `status`, `color`, and `size` directly on the root component to build complete avatars with automatic fallback resolution.
* Compound Dot Notation: Developers assemble `Avatar.Image`, `Avatar.Fallback`, `Avatar.Indicator`, and `Avatar.Group` subcomponents to construct bespoke arrangements and complex decorators.

<br>

### Variants

Homonoid separates structural surface treatments from semantic color palettes through the `variant` property:

* `Contained` (`variant="contained"`): Solid background surface fill, delivering maximum visual presence for initials and fallback silhouettes.
* `Outlined` (`variant="outlined"`): Transparent interior with a defined one pixel hairline border stroke, offering balanced secondary prominence.
* `Plain` (`variant="plain"`): Transparent background and borderless silhouette, ideal for minimal inline identity tags.

<br>

### Colors

Semantic color intent applies orthogonally across all variants through the `color` property:

* `Surface` (`color="surface"`): Monochromatic palette adapting cleanly across light and dark surface planes.
* `Subtle` (`color="subtle"`): Low contrast neutral palette for auxiliary avatars and quiet fallbacks.
* `Primary` (`color="primary"`): Brand driven Chroma primary palette for focal accounts and highlighted identities.
* `Destructive` (`color="destructive"`): Red palette signaling blocked users, security alerts, or critical system accounts.

<br>

### Sizes

Avatars adapt to surrounding interface hierarchy across three standard dimensional scales aligning with control height tokens:

* `Small` (`size="sm"`): Scaled at thirty two pixels height with compact proportions, tailored for dense comment threads and table rows.
* `Medium` (`size="md"`): Standard forty pixel height optimized for navigation bars, cards, and default control pairings.
* `Large` (`size="lg"`): Scaled at forty eight pixels height for user profile headers, hero cards, and expansive view surfaces.

<br>

### Geometry and Shapes

Corner curvature adapts through the `radius` property with continuous rounding active by default:

* `Full` (`radius="full"`): Continuous circular geometry active as the component default.
* `Medium` (`radius="md"`): Softened modern squircle curvature aligned with standard control tokens.
* `Small` (`radius="sm"`): Subtle rounding suited for compact rectangular profile tags.
* `None` (`radius="none"`): Sharp rectilinear edges for technical dashboards.

<br>

### Presence and Status

Avatars indicate real time user availability through the indicator subcomponent or atomic status properties:

* `online`: Green status dot signaling active presence.
* `away`: Amber status dot signaling temporary absence or idle state.
* `busy`: Red status dot signaling do not disturb or meeting modes.
* `offline`: Muted gray status dot signaling disconnected or inactive states.

When operating as an anchored overlay, the indicator positions along the perimeter using the `placement` property with bottom right as the standard default.

<br>

### Grouping and Stacking

The `Avatar.Group` subcomponent coordinates multiple avatars into visual stacks:

* Overlap: Applies negative horizontal margins so that adjacent avatars partially overlay one another.
* Layering: Preserves visual separation between overlapping avatars via an ambient boundary ring stroke.
* Truncation: Accepts a `max` property to restrict visible avatars and automatically renders an overflow count pill for remaining members.

<br>

### Accessibility

Avatars uphold platform accessibility standards:

* Semantic Roles: Operates with role `img` accompanied by descriptive `alt` text or `aria-label` when representing user identity.
* Decorative Use: Applies `aria-hidden="true"` when an avatar sits adjacent to an explicit visible name label to eliminate redundant screen reader announcements.
* Status Clarity: Presence indicators expose accessible status descriptions through dedicated `aria-label` properties rather than relying solely on visual color cues.
* Fallback Stability: Image loading state transitions occur seamlessly without layout shifts or erratic reflows.

