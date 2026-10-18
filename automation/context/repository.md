# Repository

The Homonoid repository is organized as a monorepo.

Each top-level directory owns a distinct responsibility and should avoid overlapping with others.

<br>

### Repository Layout

- `docs` contains project documentation and specifications.
- `design` contains design assets.
- `packages` contains reusable libraries and platform implementations.
- `showcase` contains the public demonstration of Homonoid.
- `tools` contains internal development utilities.
- `automation` contains documentation that supports development workflows.

<br>

### Guidelines

- New features should be added to the appropriate package rather than creating new top-level directories.
- Documentation should be written before implementation whenever practical.
- Design assets should remain implementation-independent.
- Platform-specific code should never become the source of truth for the design language.
- Repository organization should prioritize long-term maintainability over short-term convenience.
