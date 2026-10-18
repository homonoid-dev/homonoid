---
name: theming
description: Use when defining, modifying, or auditing design tokens in packages/tokens, including color scales, semantic mappings, typography, radii, and elevations across light and dark modes.
---

# Theming Standards

Guidelines for authoring and updating design tokens in Homonoid.

<br>

### Token Architecture

All visual values in Homonoid originate from `@homonoid/tokens`. Never define raw hex values, pixels, or inline styles in component packages.

<br>

### Semantic Mapping

Separate raw palette scales from semantic roles. Components must consume semantic tokens rather than raw palette colors:

- Surface: Background containers, cards, and modal planes
- Foreground: Primary text, body copy, and iconography
- Subtle: Diminished borders, muted text, and soft fills
- Primary: Accent actions and focused interactive selections
- Destructive: Danger actions, error captions, and invalid borders

<br>

### Theme Continuity

Every token must provide explicit definitions for both light and dark modes. Ensure color contrast ratios meet accessibility standards across every platform target.
