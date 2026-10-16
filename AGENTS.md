# Agent Guidelines

Guidelines and standards for AI agents working within the Harmonia repository.

Every contribution should preserve the design philosophy, architectural standards, and conventions of the ecosystem.

<br>

### Markdown Standards

All markdown documentation must adhere to the following formatting rules:

- Single Title: Only one top level `#` title per document.
- Subheadings: All section headers must use `###` (never `##`).
- Spacing: Separate major sections using an empty line, `<br>`, and an empty line before the next `###` header.
- Whitespace Hygiene: Never leave trailing spaces on any line. Files must end with a single newline character.

<br>

### Paragraph and Copy Standards

Guidelines for writing prose, component descriptions, and documentation copy:

- No Dashes or Hyphens Between Words: Never use hyphens or dashes (`-`, `--`, or `—`) to separate thoughts, clauses, or words in descriptive text. Structure sentences using clean punctuation, commas, or direct conjunctions instead.
- Continuous Flow: Keep sentence structures natural, clear, and rhythmic without disruptive punctuation breaks.
- Token-First Clarity: Explanations must be concise and descriptive, emphasizing component behavior, hierarchy, and design tokens without decorative filler.

<br>

### Technology Stack

The web implementation and showcase ecosystem use the following standard toolchain:

- Web Framework: React 19.3.0
- Styling: Tailwind CSS v4.3.3
- Language: TypeScript with strict mode enabled
- Documentation and Showcase: Next.js (App Router)
- Package Manager: npm

<br>

### Architecture and Design Tokens

Harmonia prioritizes continuity, platform-native excellence, and token-driven design:

- Design Tokens First: Components must consume values exclusively from design tokens (`@harmonia/tokens`). Never introduce hardcoded colors, spacing, or radii.
- Component Specifications: Every new component requires a formal specification in `docs/components/<name>.md` before implementation.
- Object Continuity: State transitions must preserve component identity and dimensional stability. Components must not collapse or jump abruptly during state changes.
- Functional Condition Utilities: Use functional condition helpers (`cond`, `iff`, `any`, `all`) from `@harmonia/react` instead of inline ternary operators (`?:`) across component markup, class definitions, and layout branching logic.

<br>

### Git and Branching

The repository follows a trunk-based development workflow:

- Target Branch: All pull requests must target `main`.
- Branch Naming: Feature branches use `feat/<package>-<description>` (e.g. `feat/web-button`), fixes use `fix/<package>-<description>`, and documentation uses `docs/<topic>`.
- Commit Style: Follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Merge Strategy: Squash and merge into `main` to preserve a clean, linear history.
