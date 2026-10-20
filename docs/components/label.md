# Label

A label provides clear visual identification and accessible naming for form controls, inputs, and selection widgets.

Labels link directly to interactive elements, establishing readable control names while preserving standard hit target delegation.

<br>

### Purpose

Labels identify form controls, inputs, switches, checkboxes, and interactive fields.

They provide clear textual names for visual users while binding directly to assistive technologies through accessible association identifiers.

<br>

### Usage

Use labels to accompany interactive form elements, checkboxes, switches, and input fields.

Ensure every interactive control has an associated label either through wrapping or identifier linkage.

Avoid using labels for top level view titles or page headers where Heading is appropriate.

<br>

### Anatomy

A label consists of the following elements:

- `Element`: The semantic root container, defaulting to `<label>` and polymorphic across standard inline tags such as `<span>`.
- `Content`: Text or inline elements naming the associated form control.

<br>

### Sizes

Labels support three standardized control scale sizes:

- `Small` (`sm`): 0.75rem (12px), font-medium with tight line height. Suited for compact sidebars, tables, and dense controls.
- `Medium` (`md`): 0.875rem (14px), font-medium with standard line height. Default density for form fields, switches, and checkboxes.
- `Large` (`lg`): 1.0rem (16px), font-semibold. High prominence density for hero inputs and primary settings rows.

<br>

### Tokens and Styling

Labels consume typography and color exclusively from `@homonoid/tokens`:

- Color: `text-foreground` (`--foreground`).
- Weight: `font-medium` providing clean legibility without overpowering surrounding controls.
- Selection: `select-none` preventing accidental text highlighting during click or tap activation.
