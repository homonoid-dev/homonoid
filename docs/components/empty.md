# Empty

An empty state communicates the absence of data, records, or search matches within a view and guides users toward productive next actions.

Empty states turn blank canvas moments into intuitive guidance through expressive media, concise titles, supportive descriptions, and primary actions.

<br>

### Purpose

Empty states eliminate ambiguity when lists, dashboards, tables, or search queries contain zero items.

Rather than presenting an uninformative void, an empty state reassures users that the system is operating correctly, explains why content is absent, and offers actionable next steps.

<br>

### Usage

Use empty states when:
* First time users enter a newly created workspace with no active records.
* Search queries, filters, or date ranges return zero matching results.
* Completed queues or cleared inboxes celebrate successful resolution.
* Permissions or connectivity issues prevent content from loading.

Do not use empty states when:
* Data is actively loading in the background where spinners or skeleton screens are appropriate.
* Forms contain empty input fields where placeholder copy should guide entry.
* Inline validations report specific field syntax errors.

<br>

### Anatomy

The empty state component architecture accommodates both atomic shortcuts and flexible compound structures:

* `Empty`: Primary structural container centering illustration, copy, and call to action controls.
* `Empty.Media`: Visual graphic, icon glyph, or illustrated placeholder container with calibrated ambient backgrounds.
* `Empty.Header`: Structural stack coordinating title heading and descriptive body text with consistent vertical rhythm.
* `Empty.Title`: Semantic headline communicating current emptiness or completion status.
* `Empty.Description`: Supportive copy providing context or clarifying required steps.
* `Empty.Actions`: Interactive button cluster guiding user forward progress.

<br>

### Composition

Empty states support dual implementation paradigms tailored for developer velocity and layout customization:

* Atomic Shorthand: Developers declare properties such as `icon`, `title`, `description`, and `action` directly on the root component for rapid standard empty views.
* Compound Dot Notation: Developers assemble `Empty.Media`, `Empty.Header`, `Empty.Title`, `Empty.Description`, and `Empty.Actions` to construct specialized illustrations, multiple action buttons, or custom layout flows.

<br>

### Variants

Homonoid provides three structural surface treatments through the `variant` property:

* `Plain` (`variant="plain"`): Transparent resting container ideal for embedded tables, dropdowns, and card bodies without visual heaviness.
* `Outlined` (`variant="outlined"`): Hairline border stroke bounding the placeholder region within expansive pages.
* `Contained` (`variant="contained"`): Subtle surface fill establishing clear spatial presence across dashboard cards.

<br>

### Sizes

Empty states scale across three standard dimensional tiers through the `size` property:

* `Small` (`size="sm"`): Compact frame for dropdowns, popovers, nested widgets, and dense panels.
* `Medium` (`size="md"`): Standard proportion optimized for cards, content blocks, and data tables.
* `Large` (`size="lg"`): Expansive scale for blank slate pages, full viewports, and primary workspace views.

<br>

### Accessibility

Empty states uphold platform accessibility guidelines across every presentation:

* Status Semantics: Exposes `role="status"` with polite live announcements when content clears dynamically after user filtering.
* Heading Hierarchy: Empty titles render appropriate heading tags to allow screen reader users to jump directly to the state explanation.
* Action Focus: Action buttons maintain native keyboard focus rings and logical tab order immediately following descriptive copy.
* Contrast Compliance: Media glyphs and supportive guidance copy preserve contrast standards across both light and dark modes.
