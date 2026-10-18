# Agent Guidelines

Guidelines and standards for AI agents working within the Harmonia repository.

Every contribution should preserve the design philosophy, architectural standards, and conventions of the ecosystem.

<br>

### Markdown Standards

Use a single `#` title per document with `###` subheadings separated by `<br>` tags. Ensure whitespace hygiene with no trailing spaces and a single terminating newline.

<br>

### Paragraph and Copy Standards

Write concise, continuous prose without any hyphens `-`, double hyphens `--`, en dashes `–`, or em dashes `—` between words, clauses, or thoughts. Keep explanations descriptive and token first without decorative filler.

<br>

### Technology Stack

Built with React 19, Tailwind CSS v4, TypeScript strict mode, and Next.js App Router inside an npm workspace.

<br>

### Architecture and Design Tokens

Consume styling exclusively from `@harmonia/tokens` with zero hardcoded values. Author a formal specification in `docs/components/<name>.md` before implementation. Maintain object continuity and dimensional stability during transitions. Always use functional condition helpers (`cond`, `any`, `all`) from `@harmonia/react` instead of inline ternary operators (`?:`).

<br>

### Git and Branching

Follow trunk based development targeting `main` with squash merges. Name branches by type and package (`feat/react-button`, `fix/tokens-color`, `docs/tooltip`) and format commit messages using Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
