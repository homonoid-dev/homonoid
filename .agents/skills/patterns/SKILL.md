---
name: patterns
description: Use when implementing state branching, functional condition helpers, overlay positioning mechanics, and interactive patterns across components.
---

# Implementation Patterns

Guidelines for coding conventions and functional state management in Homonoid.

<br>

### Functional Condition Utilities

Always use functional condition helpers provided by the Homonoid ecosystem rather than inline ternary operators or complex boolean ladder expressions:

- `cond`: Replaces inline ternaries for selecting between two values
- `match`: Evaluates a key against a branches dictionary with fallback
- `when`: Renders an element or invokes a factory only when the condition is truthy
- `any`: Evaluates whether at least one flag is truthy
- `all`: Evaluates whether every flag is truthy
- `none`: Evaluates whether all provided flags are falsy

<br>

### Overlay Positioning Isolation

When building tooltips, popovers, or floating surfaces, isolate outer floating coordinate positioning from inner scale and opacity transitions to avoid transform origin conflicts. Always ensure non-interactive overlay planes remain transparent to hit testing and pointer interactions.
