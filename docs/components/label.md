# Label

A label establishes clear typographic hierarchy and semantic prominence for sections, views, and data landmarks.

Labels anchor layout surfaces, providing immediate legibility and visual weight while preserving continuum across responsive viewports.

<br>

### Purpose

Labels identify views, interface modules, input groupings, and data structures.

They guide reading order and communicate informational hierarchy without decorative clutter.

<br>

### Usage

Use labels to introduce views, name functional regions, and head interactive workbenches.

Ensure the semantic heading level matches the accessibility tree structure of the enclosing document.

Avoid using labels for generic paragraph bodies or non-structural text runs.

<br>

### Anatomy

A label consists of the following elements:

- `Element`: The semantic root container, defaulting to `<h1>` and polymorphic across standard heading and text tags (`<h2>`, `<h3>`, `<p>`, `<span>`, `<label>`).
- `Content`: Text or inline elements establishing the title identity.

<br>

### Sizes

Labels support three standardized typographic scale sizes:

- `Small` (`sm`): 1.0rem (16px), font-semibold. Suited for compact cards, nested subsections, and accessory panels.
- `Medium` (`md`): 1.125rem (18px), font-bold. Standard heading for sectional content and dialog titles.
- `Large` (`lg`): 1.5rem (24px), font-bold. Primary landmark title for views and top-level pages.

<br>

### Tokens and Styling

Labels consume typography and color exclusively from `@homonoid/tokens`:

- Color: `text-foreground` (`--foreground`).
- Tracking: `tracking-tight` for compact, modern optical proportion.
