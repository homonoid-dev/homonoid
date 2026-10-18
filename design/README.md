# Design Assets

The `design` directory contains the source assets that define the Homonoid design language.

These assets serve as the foundation for every platform implementation and are considered the canonical representation of the Homonoid visual system.

The contents of this directory are implementation-independent. They describe the design itself rather than the code that renders it.

Typical contents include:

- Figma source files
- Design tokens
- Icon source assets
- Illustrations
- Exported assets for platform implementations

Every implementation within the Homonoid ecosystem should derive from the assets maintained in this directory to ensure consistency across platforms.

<br>

### Design Principle

Design is the source of truth.

Every implementation should faithfully represent the design language defined here while respecting the capabilities and conventions of its target platform.
