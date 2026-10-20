# Heading

A heading establishes clear typographic hierarchy and semantic prominence for sections, views, and data landmarks.

Headings anchor layout surfaces, providing immediate legibility and visual weight while preserving continuum across responsive viewports.

<br>

### Purpose

Headings identify views, interface modules, major sectional regions, and modal dialog titles.

They guide reading order and communicate informational hierarchy without decorative clutter.

<br>

### Usage

Use headings to introduce views, name functional regions, and head interactive workbenches.

Ensure the semantic heading level matches the accessibility tree structure of the enclosing document.

Avoid using headings for generic paragraph bodies or form field controls.

<br>

### Anatomy

A heading consists of the following elements:

- `Element`: The semantic root container, defaulting to `<h1>` and polymorphic across standard heading tags (`<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`).
- `Content`: Text or inline elements establishing the title identity.

<br>

### Sizes

Headings support four standardized typographic scale sizes:

- `Small` (`sm`): 1.0rem (16px), font-semibold. Suited for compact cards, nested subsections, and accessory panels.
- `Medium` (`md`): 1.125rem (18px), font-bold tracking-tight. Standard heading for sectional content and dialog titles.
- `Large` (`lg`): 1.5rem (24px), font-bold tracking-tight. Primary landmark title for views and top-level pages.
- `Extra Large` (`xl`): 1.875rem (30px), font-bold tracking-tight. Hero landmark headers for marketing showcases and major landing views.

<br>

### Tokens and Styling

Headings consume typography and color exclusively from `@homonoid/tokens`:

- Color: `text-foreground` (`--foreground`).
- Tracking: `tracking-tight` for compact, modern optical proportion.
