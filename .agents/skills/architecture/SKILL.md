---
name: architecture
description: Use when designing component structures, authoring component specifications, planning compound component hierarchies, and maintaining monorepo workspace boundaries.
---

# Architecture Standards

Guidelines for component composition and structural design in Homonoid.

<br>

### Compound Components

Author multi-part components using dot notation on the parent component namespace. This provides clean composition, flexible markup ordering, and predictable ref forwarding.

<br>

### Zero Artificial Wrappers

Never introduce artificial wrapper layers, intermediate scaffolds, or container bloat merely to handle events or positioning. Keep component trees shallow and platform native.

<br>

### Component Specifications

Every new component requires an approved specification in `docs/components/<name>.md` before beginning implementation. Specifications must describe behavior, props, and accessibility expectations.
