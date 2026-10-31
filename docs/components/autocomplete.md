# Autocomplete

An autocomplete combines a text input with an interactive floating suggestions panel to help users filter, search, and select items from extensive datasets.

Autocomplete components accelerate data entry, prevent typographical mistakes, and support both local synchronous filtering and asynchronous remote search queries while preserving fluid tactile feedback and keyboard accessibility.

<br>

### Purpose

Autocomplete components streamline selection workflows where the collection of choices is too large for a traditional select menu or where users benefit from typing partial queries.

They provide immediate feedback as the user types, progressively narrowing potential choices and allowing instant selection via mouse click, touch tap, or keyboard navigation.

<br>

### Usage

Use autocomplete when:
* The available options exceed fifteen items where scrolling through a select menu becomes inefficient.
* Users know what they are searching for and prefer typing text to filter choices rapidly.
* Option lists are fetched asynchronously from remote search endpoints based on user input.
* Users require rich result cards with leading icons, structured descriptions, and status badges.

Do not use autocomplete when:
* Total options number fewer than seven items where a standard select or radio group is simpler.
* Freeform text without suggestion validation is required where a standard input suffices.
* The workflow requires hierarchical tree navigation where a nested menu is more appropriate.
* The interaction represents a site wide navigational search where a search modal dialog or searchbar fits better.

<br>

### Anatomy

The autocomplete adheres to a compound component architecture exposing dedicated primitives through dot notation while simultaneously providing a zero boilerplate atomic interface through the root component:

* `Autocomplete`: The root context coordinator managing input query value, selected item value, open state, active highlighted index, and keyboard event routing.
* `Autocomplete.Input`: The interactive combobox text field managing typing input, focus indicators, leading accessories, and trailing status accessories.
* `Autocomplete.Content`: The floating surface container managing portal rendering, spatial positioning coordinates, and entrance animations.
* `Autocomplete.List`: The bounded scrolling container implementing listbox semantics, focus isolation, and maximum height constraints.
* `Autocomplete.Item`: The selectable choice row built directly upon the Tile component, inheriting standardized leading, label, description, and trailing accessories with zero code duplication.
* `Autocomplete.Group`: The logical container grouping related options beneath a shared category label.
* `Autocomplete.Label`: The category heading caption powered by the Label component.
* `Autocomplete.Empty`: The fallback presentation displayed when the active query yields zero matching options.

<br>

### Primitive Composition

The autocomplete composes core Homonoid primitives under the hood to ensure token consistency:

* `Input`: Powers `Autocomplete.Input`, inheriting standardized sizing scales, focus rings, and custom accessory slots.
* `Tile`: Powers `Autocomplete.Item`, providing structured horizontal rhythm, interactive hover surfaces, and description typography.
* `Label`: Powers heading captions for option categories through `Autocomplete.Label`.
* `Description`: Powers supporting explanatory text inside option rows.
* `Spinner`: Provides subtle visual feedback in the input trailing slot during asynchronous data retrieval.

<br>

### Atomic Usage

For declarative workflows, the autocomplete accepts an options collection directly on the root component:

```tsx
import { Autocomplete, type AutocompleteOption } from "@homonoid/react";

const options: AutocompleteOption[] = [
  {
    value: "react",
    label: "React",
    description: "A declarative component library for modern user interfaces.",
  },
  {
    value: "vue",
    label: "Vue",
    description: "The progressive framework for building web applications.",
  },
  {
    value: "svelte",
    label: "Svelte",
    description: "Cybernetically enhanced web applications with zero runtime.",
  },
  {
    value: "angular",
    label: "Angular",
    description: "A unified platform for scalable enterprise web development.",
  },
];

export function Example() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Autocomplete
        placeholder="Search framework..."
        options={options}
        onSelect={(value) => console.log(value)}
      />
    </div>
  );
}
```

<br>

### Compound Usage

When customized trigger accessories, custom item layouts, grouped collections, or custom empty panels are needed, developers compose primitives directly without artificial wrapper layers:

```tsx
import { Autocomplete } from "@homonoid/react";

export function CompoundExample() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Autocomplete defaultValue="react">
        <Autocomplete.Input placeholder="Select framework..." />
        <Autocomplete.Content>
          <Autocomplete.List>
            <Autocomplete.Group heading="Popular">
              <Autocomplete.Item value="react">React</Autocomplete.Item>
              <Autocomplete.Item value="vue">Vue</Autocomplete.Item>
            </Autocomplete.Group>
            <Autocomplete.Group heading="Emerging">
              <Autocomplete.Item value="svelte">Svelte</Autocomplete.Item>
              <Autocomplete.Item value="solid">Solid</Autocomplete.Item>
            </Autocomplete.Group>
          </Autocomplete.List>
          <Autocomplete.Empty>No frameworks found.</Autocomplete.Empty>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  );
}
```

<br>

### Variants

Autocomplete components support consistent sizing and structural treatments through tokens:

* Sizes: Supports `sm`, `md`, and `lg` sizing scales matching standard Homonoid input and control dimensions.
* Visual Surfaces: Floating option lists render on the elevated surface token layer with subtle border contrast and elevation shadow tokens.
* Item Treatments: Selected items display subtle background tinting paired with high contrast foreground text.

<br>

### States

Components communicate operational conditions through explicit data attributes:

* Closed (`data-state="closed"`): Floating panel is detached or hidden while the input awaits interaction.
* Open (`data-state="open"`): Suggestions panel is elevated and aligned to the trigger input.
* Highlighted (`data-highlighted`): The active item under keyboard traversal receives visual hover styling via roving active descendant references.
* Selected (`data-selected="true"`): Denotes the actively chosen item in the collection.
* Disabled (`data-disabled`): Suppresses typing, clicking, and keyboard navigation across the entire control or individual items.
* Empty (`data-empty="true"`): Rendered when the current filter query produces zero results.
* Loading (`data-loading="true"`): Indicates an ongoing asynchronous search query.

<br>

### Behavior

The autocomplete balances fast keyboard control with intuitive pointer interactions:

* Automatic Filtering: Matches user input against option labels case insensitively using substring search by default, with support for custom filter predicates.
* Asynchronous Search: Debounces query string changes and updates suggestion lists dynamically without losing active focus from the input field.
* Arrow Navigation: Arrow Down and Arrow Up traverse available options sequentially, wrapping at boundaries or halting depending on configuration.
* Active Descendant Tracking: The input maintains native DOM focus at all times while updating `aria-activedescendant` to match the highlighted item ID, preventing disruption to software keyboards and screen reader virtual cursors.
* Selection Confirmation: Pressing Enter or clicking an option updates the input value, invokes the change callback, and closes the suggestions panel.
* Dismissal: Pressing Escape or clicking outside the container closes the floating surface without altering the established selection.

<br>

### Object Continuity

Visual state transitions maintain spatial stability:

* Floating Elevation: The suggestions panel opens using a micro scale and opacity entrance transition that respects Homonoid motion tokens.
* Scroll Alignment: As users traverse options via arrow keys, the active item scrolls smoothly into view within the bounded listbox container.
* Focus Stability: Input focus remains completely uninterrupted throughout query typing, menu opening, list scrolling, and item selection.
* Reduced Motion: Transition durations collapse to zero when users specify reduced motion preferences in their operating system settings.

<br>

### Accessibility

The autocomplete conforms strictly to WAI ARIA Combobox specifications:

* Combobox Semantics: The input specifies `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, and links directly to the listbox ID via `aria-controls`.
* Listbox Semantics: The suggestions container declares `role="listbox"` with `aria-label` or `aria-labelledby`.
* Option Roles: Every selectable item declares `role="option"` with `aria-selected` denoting the current active choice.
* Active Descendant Binding: Dynamic keyboard traversal coordinates through `aria-activedescendant` referencing the unique element ID of the highlighted option.
* Live Status Announcements: Screen readers receive updates on matching option counts and empty query results via polite live regions.

