# Breadcrumb

A breadcrumb displays the navigational hierarchy leading to the current page location, reinforcing site orientation and allowing users to traverse parent levels rapidly.

Breadcrumbs organize multi level structures into clear sequential paths, supporting both zero boilerplate atomic declarations and fully composable compound subcomponents with native keyboard accessibility and fluid overflow handling.

<br>

### Purpose

Breadcrumbs communicate the user location within complex information architectures such as documentation catalogs, administrative consoles, ecommerce categories, and hierarchical settings panels.

They provide immediate visual orientation, reduce cognitive effort when exploring deep folders or articles, and offer clickable shortcuts to higher tiers without relying on browser history or global menus.

<br>

### Usage

Use breadcrumbs when:
* Websites or applications contain hierarchical structures three or more levels deep.
* Users frequently arrive via deep links, search engine results, or shared URLs and require immediate context.
* Workflows benefit from visible upward parent navigation alongside page content.
* Organizing multi tier product categories, nested documentation articles, or directory trees.

Do not use breadcrumbs when:
* Applications have flat, single level architectures without hierarchical parent relationships.
* Guiding users through sequential step by step procedures (use Stepper instead).
* Primary site wide global navigation is required (use AppSidebar or Header instead).
* History based back navigation is sufficient for linear two step transitions.

<br>

### Anatomy

The breadcrumb adheres to a compound component architecture exposing dedicated primitives through dot notation while simultaneously providing a zero boilerplate atomic interface through the root component:

* `Breadcrumb`: The root navigation landmark coordinator rendering a semantic HTML nav element with aria label set to Breadcrumb.
* `Breadcrumb.List`: The ordered list container establishing horizontal rhythm, flex alignment, and tokenized spacing gaps.
* `Breadcrumb.Item`: The individual list item element wrapping links, current page labels, or overflow triggers within valid HTML list semantics.
* `Breadcrumb.Link`: The interactive navigation anchor managing hover surface transitions, platform focus rings, and custom router link delegation.
* `Breadcrumb.Page`: The terminal non interactive caption element representing the active destination with aria current set to page.
* `Breadcrumb.Separator`: The visual partition element rendered with aria hidden set to true to ensure screen reader hygiene.
* `Breadcrumb.Ellipsis`: The collapsed overflow trigger representing omitted intermediate hierarchy tiers with an accessible label.

<br>

### Primitive Composition

The breadcrumb composes core Homonoid primitives under the hood to ensure complete ecosystem harmony:

* `Button`: Powers interactive overflow controls and compact ellipsis triggers, inheriting standard pressed scaling and high contrast focus rings.
* `Label`: Powers the terminal page caption and link text, ensuring calibrated typography tokens across light and dark modes.
* `Dropdown`: Integrates with `Breadcrumb.Ellipsis` when developers choose to expose collapsed intermediate links through a floating menu.

<br>

### Atomic Usage

For standard layouts, the breadcrumb accepts an items collection directly on the root component:

```tsx
import { Breadcrumb, type BreadcrumbItem } from "@homonoid/react";
import { ChevronRight } from "lucide-react";

const items: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Navigation", href: "/components#navigation" },
  { label: "Breadcrumb" },
];

export function Example() {
  return (
    <Breadcrumb
      items={items}
      separator={<ChevronRight className="size-3.5 text-muted" />}
      maxItems={4}
    />
  );
}
```

<br>

### Compound Usage

When customized icons, custom router integration, or bespoke markup ordering are needed, developers compose the subcomponents directly:

```tsx
import { Breadcrumb } from "@homonoid/react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export function Example() {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRight className="size-3.5 text-muted" />
        </Breadcrumb.Separator>

        <Breadcrumb.Item>
          <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRight className="size-3.5 text-muted" />
        </Breadcrumb.Separator>

        <Breadcrumb.Item>
          <Breadcrumb.Ellipsis aria-label="Show intermediate pages">
            <MoreHorizontal className="size-3.5 text-muted" />
          </Breadcrumb.Ellipsis>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRight className="size-3.5 text-muted" />
        </Breadcrumb.Separator>

        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}
```

<br>

### Separators

Breadcrumb partitions consecutive items using dedicated visual separators:

* Default Separator: Renders an angled slash or subtle chevron icon depending on design intent.
* Custom Icon Nodes: Developers pass custom glyphs (such as arrows, chevrons, or custom graphic symbols) via the separator prop or inside `Breadcrumb.Separator`.
* Screen Reader Hygiene: All separator instances declare `aria-hidden="true"` so assistive technologies ignore repetitive punctuation during audio readout.

<br>

### Overflow and Collapsing

Deep hierarchical trees automatically manage horizontal real estate through collapsing logic:

* Threshold Bounds: In atomic mode, configuring `maxItems` collapses intermediate items when the total exceeds the limit.
* Anchored Edges: Developers configure `itemsBeforeCollapse` and `itemsAfterCollapse` to keep the root parent and active destination visible while compacting middle sections.
* Expansion Access: Clicking `Breadcrumb.Ellipsis` expands the hidden items inline or opens an anchored dropdown menu listing the collapsed tiers.

<br>

### Sizing and Typography

Breadcrumbs scale seamlessly across different layout densities:

* Small (`sm`): Compact `text-xs` typography paired with tight horizontal gaps (`gap-1.5`). Suited for dense dashboards, side drawers, and secondary content headers.
* Medium (`md`): Standard `text-sm` typography with balanced horizontal gaps (`gap-2`). Default density for documentation sites and general page banners.
* Large (`lg`): Prominent `text-base` typography with generous spacing (`gap-2.5`). Ideal for hero breadcrumbs in marketing catalogs or minimal editorial layouts.

<br>

### States and Interactions

Every breadcrumb tier reflects its interactive status unambiguously:

* Link Rest: Muted foreground styling (`text-muted`) indicating navigable parent tiers.
* Link Hover: Foreground transition (`hover:text-foreground`) providing immediate visual confirmation under pointer hover.
* Link Focus: High contrast focus ring matching platform visual standards with zero offset layout displacement.
* Current Page: Solid foreground styling (`text-foreground`) with medium font weight (`font-medium`) and non interactive pointer events.

<br>

### Object Continuity

Breadcrumb interactions prioritize dimensional stability and seamless visual feedback:

* Spatial Invariance: Separator dimensions and font sizing maintain consistent vertical baselines across text links, icon buttons, and ellipsis triggers.
* Color Interpolation: Hover state color transitions execute over standard fast durations using calibrated motion tokens without layout jump.
* Overflow Expansion: Collapsed items reveal with opacity transitions that preserve surrounding page layout boundaries.

<br>

### Accessibility

Every breadcrumb implementation satisfies accessibility standards:

* Landmark Role: The root element renders a native HTML nav element declared with `aria-label="Breadcrumb"`.
* Semantic Ordered List: Items render within an ordered list `ol` and list items `li` so screen readers announce overall count and current level index.
* Current Page Semantics: The active destination declares `aria-current="page"` and avoids rendered anchor tags.
* Non Interactive Separators: Decorative separator symbols are hidden from assistive technology using `aria-hidden="true"`.
* Keyboard Traversal: Interactive links and ellipsis triggers support standard Tab navigation and Enter activation.

<br>

### Props Specification

#### Breadcrumb Props (Root)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `BreadcrumbItem[]` | `undefined` | Array of item objects for atomic usage |
| `separator` | `ReactNode` | `<ChevronRight />` | Custom separator rendered between items |
| `maxItems` | `number` | `undefined` | Maximum visible items before collapsing |
| `itemsBeforeCollapse` | `number` | `1` | Number of items retained before the ellipsis |
| `itemsAfterCollapse` | `number` | `1` | Number of items retained after the ellipsis |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Typography scale and gap density |

<br>

#### BreadcrumbItem Definition (Atomic)

| Field | Type | Description |
| :--- | :--- | :--- |
| `label` | `ReactNode` | Display text or rich element for the tier |
| `href` | `string` | Navigation destination URL |
| `icon` | `ReactNode` | Optional leading glyph icon |
| `current` | `boolean` | Explicitly marks the item as active page destination |

