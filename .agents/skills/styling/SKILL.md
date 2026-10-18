---
name: styling
description: Use when styling components, managing layout dimensions, implementing transitions or animations, and applying Tailwind CSS utility classes without arbitrary bracket values.
---

# Styling Standards

Guidelines for applying styles, transitions, and component layouts.

<br>

### Zero Arbitrary Magic Values

Never write arbitrary pixel values or hex codes in component class strings. Use semantic classes and defined design token variables rather than arbitrary brackets.

<br>

### Object Continuity

Transitions must preserve component identity and spatial stability. Elements must not jump, flicker, or collapse abruptly when toggling states or collapsing sidebars.

<br>

### Overlay Positioning

Isolate outer floating coordinate placement from inner scale and opacity transitions. Non-interactive overlay planes or closing surfaces must declare `pointer-events-none`.

<br>

### Functional Conditions

Always use functional condition utilities (`cond`, `match`, `when`, `any`, `all`, `none`) instead of inline ternary operators in class names and layout branching.
