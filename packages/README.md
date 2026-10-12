# Packages

The `packages` directory contains the platform implementations and shared libraries that make up the Harmonia ecosystem.

Each package has a single responsibility and is developed independently while adhering to the Harmonia design language, specifications, and engineering principles.

Platform implementations should provide native experiences while preserving the visual language, behavior, accessibility, and continuity defined by Harmonia.

<br>

### Planned Packages

```text
packages/
├── web/
├── flutter/
├── android/
├── ios/
├── icons/
├── motion/
└── tokens/
```

<br>

### Package Overview

<br>

### web

The web implementation for modern browsers and web frameworks.

<br>

### flutter

The Flutter implementation of the Harmonia design system.

<br>

### android

The Android implementation built using Jetpack Compose.

<br>

### ios

The iOS implementation built using SwiftUI.

<br>

### icons

The Harmonia icon library and supporting assets.

<br>

### motion

Shared motion specifications, transitions, and animation definitions used across platform implementations.

<br>

### tokens

The canonical design tokens that define colors, typography, spacing, radii, elevation, motion values, and other design primitives shared throughout the ecosystem.

<br>

### Architecture

Every package is responsible for its own implementation while remaining faithful to the Harmonia design language.

Shared design assets and specifications should never be duplicated between packages. Instead, packages should consume the same design principles while expressing them through their respective platform technologies.

<br>

### Engineering Principle

One design language.

Multiple platform implementations.

Every package should feel native to its platform while remaining unmistakably Harmonia.