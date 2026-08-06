# Development Tools

The `tools` directory contains internal utilities used to develop, maintain, and release the Harmonia ecosystem.

These tools are not part of the public API. Their purpose is to automate repetitive tasks, improve consistency across packages, and support the long-term maintenance of the project.

Typical responsibilities include:

- Design token generation
- Icon generation
- Component scaffolding
- Documentation generation
- Figma integration
- Asset processing
- Screenshot generation
- Build automation
- Release automation
- Repository maintenance

The contents of this directory will evolve alongside the Harmonia ecosystem. Every tool should improve developer productivity, increase consistency, or automate project infrastructure.

Production packages must not depend on the tools contained in this directory.

Engineering Principle

Automation is preferred over repetition.

Whenever practical, repetitive workflows should be automated through tools that improve consistency, reliability, and maintainability.