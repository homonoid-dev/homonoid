# Agent Guidelines

Guidelines and standards for AI agents working within the Homonoid repository.

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

Consume styling exclusively from `@homonoid/tokens` with zero hardcoded values. Author a formal specification in `docs/components/<name>.md` before implementation. Maintain object continuity and dimensional stability during transitions.

<br>

### Accessibility

Guarantee native keyboard navigation and proper ARIA semantic roles across every interactive surface. Bind dynamic descriptors and error messages through descriptive ID references. Ensure focus rings match platform visual standards, respect reduced motion preferences, and keep non-interactive overlay planes pointer transparent.

<br>

### Git and Branching

Follow trunk based development targeting `main` with squash merges. Name branches by type and package (`feat/react-button`, `fix/tokens-color`, `docs/tooltip`) and format commit messages using Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

<br>

### Showcase Views Standards

Mirror established showcase anatomy across all component pages in the showcase workspace. Structure sections with a Default stage, interactive variant stages, an Object Continuity section using the Infinity icon, an Accessibility section, a Design Tokens section, a Style Reference section, and terminal Pagination navigation.

<br>

### Showcase Stage Conventions

Render interactive stage headers using a flex row container wrapping a Frame icon and a large Label heading. Never insert loose Description tags between stage headers and Stage components. Maintain strict one to one parity between rendered stage JSX and exported Example code blocks in model files. Use mapped array iterations with concise body copy instead of repetitive markup or nested ternaries. Keep stage dialogs and interactive widgets self contained with local dismiss actions instead of hoisting external page state.

<br>

### Workflow and Execution

Complete tasks directly without performing redundant status checks or post completion inspection commands unless explicitly requested.
