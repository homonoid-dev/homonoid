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

### Prohibited Icons

Never use the Sparkles icon across components, stage showcases, or documentation examples. Select purposeful semantic glyphs such as Star, Zap, or Layers rather than decorative novelty icons.
