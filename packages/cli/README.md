# @homonoid/cli

The command line interface for onboarding, calibrating, and auditing applications within the Homonoid design system.

<br>

### Overview

The Homonoid CLI automates project configuration, connects Tailwind CSS v4 scanning sources, and calibrates dynamic Chroma color palettes directly from your terminal.

<br>

### Project Initialization

Bootstrap a new or existing application with Homonoid packages and stylesheet directives:

```bash
npx @homonoid/cli init
```

To install only design tokens without the React component library:

```bash
npx @homonoid/cli init --tokens-only
```

The command detects your active package manager, installs dependencies, wires token imports into your stylesheet, and configures Next.js compilation settings when applicable.

<br>

### Chroma Theme Calibration

Calibrate the entire dynamic color palette from a single brand seed color:

```bash
npx @homonoid/cli chroma --seed #8b5cf6
```

Invoking the command without flags launches an interactive terminal prompt:

```bash
npx @homonoid/cli chroma
```

Homonoid Chroma relies on native CSS color mixing to derive all hover, active, subtle, border, and dark mode tokens dynamically from this single seed property without generating repetitive boilerplate.

<br>

### Project Health Check

Audit your repository for proper stylesheet wiring, dependency versions, and compiler sources:

```bash
npx @homonoid/cli doctor
```

The doctor command verifies package installations, stylesheet imports, and Tailwind directives to confirm that your project compiles with optimal token continuity.
