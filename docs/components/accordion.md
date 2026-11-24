# Accordion

An accordion organizes complex sections of content by stacking vertically collapsible panels beneath interactive headers.

Accordion components conserve vertical screen real estate, facilitate progressive disclosure, and reduce visual density by letting users focus on specific information segments while keeping broader page context intact.

<br>

### Purpose

Accordions decompose extensive documents, FAQs, configuration groups, and secondary information into compact expandable sections.

They allow users to scan high level topic summaries quickly before deciding to reveal detailed explanations, reducing cognitive fatigue and scrolling on content heavy surfaces.

<br>

### Usage

Use accordions when:
* Content consists of multiple related sections that users do not need to read concurrently.
* Vertical canvas constraints favor collapsed headers over sprawling content layouts.
* Organizing frequently asked questions, product specifications, or detailed inspection panes.
* Progressive disclosure aids comprehension by revealing nested information upon deliberate request.

Do not use accordions when:
* Users must read every piece of information sequentially where linear document copy is better.
* Content represents mutually exclusive operational views where tabs or segment controls are appropriate.
* The panels contain only a single line of text where simple lists or definition tables suffice.
* Guiding users through strict chronological procedures where a stepper should be used instead.

<br>

### Anatomy

The accordion adheres to a compound component architecture exposing dedicated primitives through dot notation while simultaneously providing a zero boilerplate atomic interface through the root component:

* `Accordion`: The root context coordinator managing open keys, multiple expansion modes, collapsible rules, global indicator configurations, and orientation.
* `Accordion.Item`: The individual section container encapsulating active disclosure state and border treatments.
* `Accordion.Trigger`: The interactive button toggle managing focus rings, touch targets, tactile feedback, heading semantics, and custom accessory slots.
* `Accordion.Indicator`: The rotating accessory primitive managing state based orientation transitions without forcing hardcoded icons.
* `Accordion.Content`: The collapsible panel container managing height interpolation, overflow containment, and landmark semantics.

<br>

### Indicator and Accessory Architecture

The accordion provides complete freedom over accessories with zero mandatory default icons:

* Root Indicator Configuration: Pass the `indicator` prop to `Accordion` with an icon element or configuration object `{ icon, placement, rotate }` to apply consistent indicators across all panels automatically.
* Custom Leading and Trailing Slots: Pass `leading` or `trailing` directly to `Accordion.Trigger` for custom item accessories or local overrides.
* Zero Icon Baseline: When neither root nor items define accessories, triggers render clean typography without empty icon spacers.
* Dedicated Rotation Primitive: Use `Accordion.Indicator` to wrap any custom icon or glyph, applying continuous rotation easing and reduced motion safety automatically.

<br>

### Atomic Usage

For standard declarative workflows, the accordion accepts an items collection directly on the root component:

```tsx
import { Accordion, type AccordionItemDefinition } from "@homonoid/react";
import { ChevronDown } from "lucide-react";

const items: AccordionItemDefinition[] = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content: "Yes. It adheres to the WAI ARIA design pattern.",
  },
  {
    value: "item-2",
    trigger: "Is it styled?",
    content:
      "Yes. It comes with default styles that match the other components aesthetic.",
  },
  {
    value: "item-3",
    trigger: "Is it animated?",
    content:
      "Yes. It is animated by default, but you can disable it if you prefer.",
  },
];

export function Example() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Accordion
        multiple={false}
        defaultValue="item-1"
        indicator={{
          icon: <ChevronDown className="size-4 text-muted shrink-0" />,
          placement: "trailing",
          rotate: true,
        }}
        items={items}
      />
    </div>
  );
}
```

<br>

### Compound Usage

When customized trigger accessories, custom header layouts, or embedded action buttons are needed, developers compose primitives directly without artificial wrapper layers:

```tsx
import { Accordion } from "@homonoid/react";
import { ChevronDown, Plus } from "lucide-react";

export function CompoundExample() {
  return (
    <Accordion
      multiple={false}
      defaultValue="item-1"
      indicator={{
        icon: <ChevronDown className="size-4 text-muted shrink-0" />,
        placement: "trailing",
      }}
    >
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI ARIA design pattern with complete keyboard navigation.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-2">
        <Accordion.Trigger
          trailing={
            <Accordion.Indicator>
              <Plus className="size-4 text-primary shrink-0" />
            </Accordion.Indicator>
          }
        >
          Can I override accessories per item?
        </Accordion.Trigger>
        <Accordion.Content>
          Yes. Local leading and trailing props take complete precedence over inherited root indicators.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
```

<br>

### Variants

Accordions support distinct structural presentations through the `variant` prop:

* Plain (`variant="plain"`): Clean horizontal dividing lines between panels without outer border wrappers, ideal for clean article FAQs and documentation.
* Outlined (`variant="outlined"`): An enclosed container featuring an outer perimeter border and rounded corners, suited for settings sidebars and form groups.
* Contained (`variant="contained"`): Detached cards where each item sits as an independent surface separated by vertical spacing tokens.

<br>

### States

Items communicate operational states through explicit data attributes:

* Collapsed (`data-state="closed"`): Content panel height is zero and indicator rests at zero rotation.
* Expanded (`data-state="open"`): Content panel is fully visible and indicator rotates smoothly.
* Disabled (`data-disabled`): Interactive trigger suppresses click and keyboard events while presenting muted foreground tokens.
* Focused (`data-focus-visible`): Trigger button exhibits platform calibrated focus rings matching Homonoid accessibility standards.

<br>

### Behavior

The accordion accommodates both single panel inspection and multi panel comparison:

* Single Selection (`multiple={false}`): Opening an item automatically collapses previously opened items.
* Multiple Selection (`multiple={true}`): Users can expand several items simultaneously for side by side cross reference.
* Collapsible Control: When configured as single selection, the `collapsible` prop determines whether clicking an active trigger closes the panel.
* Keyboard Arrow Navigation: Pressing Arrow Down moves focus to the subsequent trigger, while Arrow Up returns focus to the preceding trigger.
* Edge Traversal: Home shifts focus directly to the initial trigger, and End moves focus to the final trigger.

<br>

### Object Continuity

Transitions preserve visual stability without abrupt jumps:

* Single Layer Tactile Press: In separated card presentations, the entire `Accordion.Item` takes the physical press scale transition as one unified surface, preventing inner elements from pulling away or shrinking awkwardly inside container borders.
* Height Interpolation: Panels utilize CSS grid row transitions moving from zero fractions to one fraction with zero minimum height, avoiding clipped text or jumping content.
* Indicator Continuity: The indicator rotates smoothly across one hundred eighty degrees with calibrated cubic bezier timing.
* Motion Preference: Motion durations collapse automatically to zero when the user prefers reduced motion.

<br>

### Accessibility

Accordions enforce rigorous accessibility standards:

* Heading Wrapping: Triggers render inside native HTML heading elements, configurable via the `asHeading` or `headingLevel` prop with a level three default.
* State Semantics: Triggers specify `aria-expanded` and link directly to content containers using `aria-controls`.
* Region Landmarks: Content panels declare `role="region"` and bind back to triggers through `aria-labelledby`.
* Native Buttons: Triggers render as native HTML button elements, ensuring native spacebar and enter key activation.
