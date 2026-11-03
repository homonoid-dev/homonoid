# Progress

A progress indicator provides determinate visual feedback communicating the completion status of an active task, establishing clarity and spatial continuity across sequential or measurable operations.

Progress components convey quantified progression toward completion, differentiating deliberate measurable tasks from indeterminate background waiting states.

<br>

### Purpose

Progress indicators offer continuous verification during long running workflows such as file transfers, multi step data processing, and document scroll positioning.

They eliminate ambiguity by quantifying progress, giving users confidence regarding remaining duration and current operational health.

<br>

### Usage

Use progress indicators whenever the completion ratio of an operation can be calculated or estimated with meaningful accuracy.

Prefer circular progress presentations for compact inline controls, standalone status chips, floating docks, and constrained dashboards.

Prefer linear progress presentations for broad layout partitions, modal sheet footers, form wizards, and full width page headers.

Avoid utilizing indeterminate progress animations when measurable milestone metrics are available to compute.

<br>

### Anatomy

A progress indicator consists of the following elements:

* Container: The bounded envelope establishing dimensional constraints for linear tracks or circular rings.
* Track: The subdued static guide path indicating the full spatial range of zero to one hundred percent.
* Fill Indicator: The active geometry that traverses along the track path proportional to the completion value.
* Value Label (Optional): A readable numeric percentage or fraction confirming the current measurement value.
* Accessible Semantics: Native ARIA role and dynamic state bindings conveying progress to assistive technology.

<br>

### Variants

Homonoid defines two primary structural variants:

* Circular: Radial geometry where an active stroke arc traverses along a circular guide track, ideal for localized docks, buttons, and status tokens.
* Linear: Horizontal bar geometry where a solid fill bar extends across a constrained track, ideal for document headers, upload cards, and sequential layouts.

<br>

### Sizes

Progress indicators support three standardized scale tiers aligned with Homonoid control tokens:

* Small (`sm`): 16px by 16px for circular variants (`size-4`) with a 2px stroke, or 4px track height for linear variants (`h-1`). Optimal for dense tables, floating capsules, and inline metadata badges.
* Medium (`md`): 24px by 24px for circular variants (`size-6`) with a 2.5px stroke, or 8px track height for linear variants (`h-2`). The standard tier for cards, forms, and general surface containers.
* Large (`lg`): 32px by 32px for circular variants (`size-8`) with a 3px stroke, or 12px track height for linear variants (`h-3`). High prominence presentation for modal dialogs and primary dashboard milestones.

<br>

### States

Progress components navigate three canonical states:

* Determinate: The standard state displaying a clamped percentage between minimum and maximum bounds.
* Indeterminate: An optional transitional mode displaying a looping progress sweep when initial calculation is pending.
* Complete: The final state reaching maximum value, providing restorative visual confirmation before optional dismissal or departure.

<br>

### Object Continuity

Homonoid requires that progress transitions preserve geometric and spatial stability:

* Dimensional Stability: Progress containers maintain fixed external dimensions throughout transition phases, preventing layout reflows as percentages shift.
* Dynamic Value Clamping: Input values strictly clamp between minimum and maximum parameters to prevent geometry overshoot or negative clip paths.
* Theme Harmony: Active strokes and track fills consume semantic tokens from `@homonoid/tokens`, harmonizing naturally across light and dark modes.

<br>

### Motion

Motion parameters adhere strictly to `@homonoid/tokens`:

* Spring Smoothing: Dynamic value adjustments interpolate through calibrated spring physics to avoid abrupt stepping when telemetry updates arrive.
* Easing Transitions: Linear and circular stroke fills consume standard motion duration tokens (`--motion-duration-normal` or `--motion-duration-fast`) with natural deceleration curves.
* GPU Compositing: Radial stroke offset changes and linear transforms run with hardware acceleration to guarantee fluid sixty frame per second rendering.

<br>

### Accessibility

Every progress implementation guarantees compliance with WCAG 2.2 standards:

* Semantic Role: Rendered natively with `role="progressbar"` to announce progress tracking to assistive software.
* State Attributes: Binds `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` to deliver accurate numerical values dynamically.
* Text Alternative: Includes `aria-valuetext` when human readable descriptions convey more contextual meaning than raw numeric percentages.
* Screen Reader Optimization: Updates throttle to avoid saturating assistive software queues during high frequency value changes.
* Reduced Motion: Respects user motion preferences by applying direct value snapping without delayed spring physics.

<br>

### Platform Notes

Web implementations observe web standards across all target browsers:

* SVG Geometry: Circular variants render via scalable vector graphics elements with resolution independent strokes.
* Stroke Dashoffset Calculation: Circular fills utilize mathematical circumference calculations mapping stroke dash array and offset properties.
* CSS Containment: Progress tracks implement strict style containment to isolate rendering work from sibling document nodes.

<br>

### Implementation Notes

Platform packages author this component within monorepo workspace boundaries:

* Design Tokens: Consumes spatial scales, colors, and motion physics exclusively from `@homonoid/tokens`.
* Web Component: Authored in `packages/react` using React 19, TypeScript strict mode, and Tailwind CSS v4.

