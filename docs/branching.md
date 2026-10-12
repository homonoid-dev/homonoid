# Branching

Harmonia follows a trunk-based branching model to maintain a stable, continuous integration environment across all packages in the ecosystem.

Every change originates from short-lived branches and merges back into the main line of development through automated validation.

<br>

### Main Branch

The `main` branch serves as the source of truth for the repository.

It represents the active, stable state of the project and is always deployable. Direct commits to `main` are restricted, and all changes must arrive through validated pull requests.

<br>

### Branch Hierarchy

Branch names reflect their purpose and scope within the monorepo.

```text
harmonia/
├── main
├── feat/
├── fix/
├── docs/
├── chore/
└── release/
```

<br>

### Feature Branches

Feature branches introduce new capabilities, components, or specifications.

```text
feat/<package>-<description>
```

Examples:

- `feat/tokens-color-system`
- `feat/web-button`
- `feat/motion-continuity`

<br>

### Fix Branches

Fix branches address defects, regressions, or inconsistencies across existing implementations.

```text
fix/<package>-<description>
```

Examples:

- `fix/web-focus-ring`
- `fix/tokens-contrast-ratio`

<br>

### Documentation Branches

Documentation branches update specifications, guides, and architectural documentation.

```text
docs/<topic>
```

Examples:

- `docs/motion-specification`
- `docs/button-component`

<br>

### Maintenance Branches

Maintenance branches modify tooling, CI workflows, dependencies, or repository automation.

```text
chore/<task>
```

Examples:

- `chore/update-pnpm-workspaces`
- `chore/validate-repository-rules`

<br>

### Release Branches

Release branches stabilize milestone releases before publishing to package registries.

```text
release/v<version>-<target>
```

Examples:

- `release/v0.1.0-web`
- `release/v1.0.0`

<br>

### Commit Guidelines

Commits should follow conventional standards to enable automated changelogs and version tagging across packages.

- `feat`: A new feature or component.
- `fix`: A bug fix.
- `docs`: Documentation updates.
- `chore`: Tooling, workflow, or dependency changes.
- `refactor`: Code reorganization without functional changes.
- `test`: Addition or modification of test suites.

<br>

### Merge Strategy

Pull requests merge into `main` using squash merges.

Squashing preserves a linear, bisectable commit history while retaining comprehensive context within the pull request.

<br>

### Branch Protection

The `main` branch enforces quality gates before changes are integrated:

- Pull request required with review approval.
- Required CI checks must pass (repository validation, markdown linting, link verification, and automated tests).
- Linear commit history required.
- Direct pushes and deletions disabled.

<br>

### Engineering Principle

Small, frequent integrations prevent drift.

Branches should remain short-lived and focus on a single objective to preserve velocity and clarity.
