# Description

A description provides supportive, secondary context to accompany headers, form fields, and interactive stages.

Descriptions anchor comprehension, elucidating functionality and purpose while preserving visual continuum across views.

<br>

### Purpose

Descriptions present explanatory text, supplementary guidance, or subtitle context beneath titles, form controls, and cards.

They reduce ambiguity and establish informational balance without overpowering primary headings.

<br>

### Usage

Use descriptions to explain the purpose of a view, clarify input requirements, or provide contextual details for cards and controls.

Pair descriptions with labels or headings to create consistent typographic hierarchy.

Avoid using descriptions for long narrative content or structural section headers.

<br>

### Anatomy

A description consists of the following elements:

- `Element`: The semantic root container, defaulting to `<p>` and polymorphic across text tags (`<span>`, `<div>`, `<small>`).
- `Content`: Informational copy delivering contextual clarity.

<br>

### Sizes

Descriptions support three standardized typographic scale sizes:

- `Small` (`sm`): 0.75rem (12px), compact captions and selection control secondary copy.
- `Medium` (`md`): 0.875rem (14px), standard secondary copy for input helpers and dialog subtitles.
- `Large` (`lg`): 1.0rem (16px), regular body description for cards and views.

<br>

### Variants

Homonoid defines two typographic color variants:

- `Muted` (`muted`): Subdued neutral tone (`text-muted`), delivering gentle visual weight ideal for captions, subtitles, and auxiliary guidance.
- `Surface` (`surface`): Primary neutral foreground tone (`text-foreground`), ensuring high legibility on subtle or accented container surfaces.

<br>

### Tokens and Styling

Descriptions consume typography and color exclusively from `@homonoid/tokens`:

- Muted Variant: `text-muted` (`--muted`).
- Surface Variant: `text-foreground` (`--foreground`).
- Line Height: `leading-normal` for compact captions and `leading-relaxed` for open body copy.
