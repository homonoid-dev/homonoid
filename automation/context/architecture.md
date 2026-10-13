# Architecture

Harmonia is organized into independent areas, each with a clearly defined responsibility.

<br>

### Repository Structure

- `docs` defines the design language and project documentation.
- `design` contains the canonical design assets.
- `packages` contains platform implementations and reusable libraries.
- `showcase` demonstrates the Harmonia ecosystem.
- `tools` contains internal development utilities.
- `automation` contains development knowledge, workflows, and supporting resources.

<br>

### Source of Truth

The Harmonia ecosystem follows a single direction of responsibility.

Design defines the visual language.

Documentation defines the specifications.

Platform packages implement those specifications.

The Showcase demonstrates the implementations.

Tools automate the development process.

<br>

### Architecture Principles

- Every directory has a single responsibility.
- Specifications are implementation-independent.
- Platform implementations should remain independent while preserving shared behavior.
- Automation should reduce manual effort without replacing engineering judgment.
