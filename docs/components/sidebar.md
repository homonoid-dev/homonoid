# Sidebar

A sidebar provides an anchor navigation column that structures application routing, workspace switching, category grouping, and contextual actions across desktop and responsive viewports.

Sidebar components establish visual hierarchy, preserve continuous user orientation across deep information architectures, and transition gracefully between full expanded layouts and compact icon rails without layout destabilization.

<br>

### Purpose

Sidebar components organize complex application landscapes into clear, persistent navigational tiers.

They keep primary destination routes immediately accessible while providing contextual slots for identity switchers, search fields, categorized navigation groups, and administrative utilities.

<br>

### Usage

Use sidebar when:
* The application features five or more core destination routes that benefit from constant visibility.
* Navigation hierarchy includes multiple categorized sections such as projects, administration, settings, and personal tools.
* Users need persistent access to workspace switchers, organization selectors, or search inputs while traversing subpages.
* Screen real estate on desktop displays accommodates a dedicated vertical column alongside main content canvases.

Do not use sidebar when:
* The application is a single landing page or simple linear presentation where a top header navigation bar suffices.
* Screen width is constrained on mobile devices without pairing with a collapsible drawer or slide over sheet.
* Navigating between local sibling tabs inside a single content card where the Tabs component is appropriate.
* Displaying transient contextual menus where Dropdown or ContextMenu primitives are designed for temporary overlays.

<br>

### Anatomy

The sidebar adheres to a compound component architecture exposing dedicated primitives through dot notation while simultaneously providing a zero boilerplate atomic interface through the root component:

* `Sidebar`: The root structural coordinator and provider managing collapsed state, collapsible modes, layout orientation, and keyboard landmark navigation.
* `Sidebar.Header`: The top structural zone configured for identity emblems, workspace switchers, organization selectors, or persistent searchbars.
* `Sidebar.Content`: The scrollable central container holding navigation groups, menu lists, and categorized links with automatic scrollbar suppression.
* `Sidebar.Group`: The semantic sectional container grouping related navigation links beneath an accessible heading label.
* `Sidebar.Item`: The interactive destination link or button built upon the Tile component, inheriting standardized leading icons, labels, and trailing indicators.
* `Sidebar.Footer`: The bottom pinned structural zone designed for user account profiles, system status alerts, theme toggles, and secondary settings.
* `Sidebar.Separator`: The hairline structural divider consuming divider tokens to partition distinct navigational sections.
* `Sidebar.Trigger`: The interactive button that toggles the sidebar between expanded and collapsed states without requiring manual state management.
* `Sidebar.Rail`: The invisible interactive edge zone enabling click to toggle or hover interactions to preview collapsed sidebars smoothly.

<br>

### Primitive Composition

The sidebar composes core Homonoid primitives to enforce system wide token continuity:

* `Tile`: Powers `Sidebar.Item`, guaranteeing identical border radius tokens, interactive surface colors, and hover transitions across navigation items.
* `Label`: Powers section titles through `Sidebar.Group`, upholding unified typographic scale and contrast tokens.
* `Searchbar`: Integrates directly within `Sidebar.Header` to provide immediate navigation filtering.
* `Separator`: Powers `Sidebar.Separator` for hairline visual partitions between disparate functional groups.
* `Button`: Powers `Sidebar.Trigger`, utilizing ghost variants and icon dimensions matching control standards.

<br>

### Atomic Usage

For rapid application scaffolding, the sidebar accepts structured navigation collections directly on the root component:

```tsx
import { Sidebar, type SidebarGroup } from "@homonoid/react";
import { LayoutDashboard, Layers, Bell, Settings } from "lucide-react";

const navigationGroups: SidebarGroup[] = [
  {
    label: "Platform",
    items: [
      {
        value: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        leading: <LayoutDashboard className="size-4" />,
        badge: "Live",
        active: true,
      },
      {
        value: "components",
        label: "Components",
        href: "/components",
        leading: <Layers className="size-4" />,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        value: "notifications",
        label: "Notifications",
        href: "/notifications",
        leading: <Bell className="size-4" />,
      },
      {
        value: "settings",
        label: "Settings",
        href: "/settings",
        leading: <Settings className="size-4" />,
      },
    ],
  },
];

export function Example() {
  return (
    <Sidebar
      header={<div className="font-semibold text-sm p-2">Application Portal</div>}
      groups={navigationGroups}
      footer={<div className="text-xs text-muted p-2">Version 0.3.0</div>}
      collapsible="icon"
    />
  );
}
```

<br>

### Compound Usage

When customized trigger accessories, custom item layouts, grouped collections, or custom empty panels are needed, developers compose primitives directly without artificial wrapper layers:

```tsx
import { Sidebar } from "@homonoid/react";
import { Searchbar } from "@homonoid/react";
import { LayoutDashboard, Layers, Settings, Bell, Search } from "lucide-react";

export function CompoundExample() {
  return (
    <Sidebar collapsible="icon" defaultCollapsed={false}>
      <Sidebar.Header sticky>
        <div className="flex items-center justify-between p-2">
          <span className="font-semibold text-sm">Homonoid Console</span>
          <Sidebar.Trigger />
        </div>
        <Searchbar
          size="sm"
          placeholder="Quick search..."
          leading={<Search className="size-3.5 text-muted" />}
        />
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Group label="Platform">
          <Sidebar.Item
            href="/dashboard"
            active
            leading={<LayoutDashboard className="size-4" />}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="/components"
            leading={<Layers className="size-4" />}
          >
            Components
          </Sidebar.Item>
        </Sidebar.Group>

        <Sidebar.Separator />

        <Sidebar.Group label="Settings">
          <Sidebar.Item
            href="/notifications"
            leading={<Bell className="size-4" />}
          >
            Notifications
          </Sidebar.Item>
          <Sidebar.Item
            href="/preferences"
            leading={<Settings className="size-4" />}
          >
            Preferences
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Footer sticky>
        <Sidebar.Item href="/profile">My Workspace</Sidebar.Item>
      </Sidebar.Footer>
    </Sidebar>
  );
}
```

<br>

### Variants

Sidebar components support deliberate visual configurations through tokens:

* Fixed Width: Standard desktop navigation column occupying a stable width token without collapsible mechanics.
* Icon Rail: Collapses smoothly from full width navigation into a miniature icon rail while preserving quick access to leading icons and tooltips.
* Floating Inset: Elevated navigation container floating alongside content canvases with rounded perimeter borders and elevation shadow tokens.
* Bordered: Resting boundary stroke providing subtle contrast against main application shell backgrounds.

<br>

### States

Components communicate operational conditions through explicit data attributes:

* Expanded (`data-state="expanded"`): The sidebar occupies full desktop column width showing labels, groups, and badges.
* Collapsed (`data-state="collapsed"`): The sidebar condenses into an icon rail displaying leading icons exclusively.
* Active (`data-active="true"`): Highlights the navigation item corresponding to the active browser route.
* Pinned (`data-sticky="true"`): Anchors the header or footer zones during content scrolling.
* Disabled (`data-disabled="true"`): Prevents interaction and keyboard traversal on inactive navigation rows.

<br>

### Behavior

The sidebar balances spatial economy with fast orientation across application surfaces:

* Collapse Transitions: Smooth width transitions animate between expanded and icon rail states using standard Homonoid motion tokens.
* Tooltip Synchronization: In collapsed icon rail mode, navigation items automatically project tooltips on hover to ensure icon recognizability.
* Native Route Matching: Navigation items evaluate active route matches automatically against the current URL pathname when integrated with modern routers.
* Scroll Isolation: Navigational content scrolls independently within `Sidebar.Content` without dragging sticky headers or footers out of view.

<br>

### Object Continuity

Visual state transitions preserve geometric stability:

* Width Continuity: Transitioning between expanded and collapsed states scales container width using GPU accelerated transitions without text clipping or abrupt jumps.
* Content Dissolve: Text labels cross fade smoothly into icon rail alignments, maintaining exact center coordinates for leading icons across both states.
* Focus Stability: Collapsing or expanding the sidebar preserves keyboard focus without sudden cursor displacement.
* Reduced Motion: Transition durations collapse to zero when users specify reduced motion preferences in operating system settings.

<br>

### Accessibility

The sidebar conforms strictly to WAI ARIA landmark and navigation specifications:

* Landmark Semantics: The outer container renders as an HTML5 `aside` element wrapping an internal `nav` region configured with `aria-label="Sidebar navigation"`.
* Current Page Signaling: The active navigation item specifies `aria-current="page"` to announce the selected route to assistive technologies.
* Toggle State Binding: `Sidebar.Trigger` exposes `aria-expanded` and maps to the sidebar container via `aria-controls`.
* Group Labelling: Section groups declare `role="group"` with programmatic `aria-labelledby` bindings referencing their section title.
* Keyboard Flow: Users can navigate sequentially through all interactive items using standard Tab and Shift Tab traversal without trapping keyboard focus.
