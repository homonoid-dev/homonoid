# Searchbar

A searchbar allows users to enter, preview, and submit search queries across collections of data and application views.

Searchbars combine immediate text entry with contextual search actions including leading query icons, asynchronous loading spinners, and keyboard shortcut badges.

<br>

### Purpose

Searchbars provide a focused interface for filtering lists, querying databases, navigating documentation, and finding resources.

They present immediate visual affordances that distinguish general data input from discovery workflows while preserving spatial continuity and tactile responsiveness across interactive states.

<br>

### Usage

Use searchbars when:

- Users need to query, filter, or locate items within large collections.
- Global site search or documentation search serves as a primary navigation path.
- Table views, directory listings, or media libraries require real time filtering.
- Quick navigation palettes or command menus provide keyboard driven discovery.

Do not use searchbars when:

- Users input general form fields such as emails or personal names (use Input instead).
- Users select from static predetermined lists with few options (use Select instead).
- Multi line search prompts or natural language query composers are needed (use Textarea instead).

<br>

### Anatomy

The searchbar component consists of the following elements:

- `Container`: Bounded structural frame providing touch bounds, surface background, hairline border stroke, and focus ring boundary.
- `Leading`: Composition slot preceding the text field for contextual search icons, custom triggers, or decorative glyphs.
- `Input`: Native search input element with transparent background and native query handling.
- `Trailing`: Composition slot following the text field for keyboard shortcut indicators, clear triggers, or contextual action buttons.

```tsx
import { Searchbar, Kbd } from "@homonoid/react";
import { Search } from "lucide-react";

export function SearchbarBasic() {
  return (
    <Searchbar
      leading={<Search className="size-4" />}
      trailing={<Kbd keyValue="command" content="K" />}
      placeholder="Search documentation..."
      onSearch={(query) => console.log(query)}
    />
  );
}
```

<br>

### Composition

Searchbars adapt to diverse query workflows through flexible accessory slots:

- Standalone Search: Single control with leading search icon and trailing keyboard indicator for toolbar integration.
- Controlled Query: Direct two way binding with query value and change events for real time filtering.
- Command Trigger: Read only or button styled presentation opening dedicated command palettes on click or shortcut key press.
- Async State: Asynchronous query communication through aria busy states during network operations.

<br>

### Layout

Searchbars integrate cleanly into application headers, hero banners, and toolbars:

- Full Width: Containers expand horizontally to fill parent widths (`w-full`) across responsive viewports.
- Fixed Cadence: Standard control heights align predictably with sibling buttons and filters.
- Slot Insets: Interior horizontal insets preserve balanced breathing room around icons, spinners, and shortcut badges.

<br>

### Sizes

Searchbars conform to the standardized Homonoid control scale:

- `Small` (`sm`): 32px height (`h-control-sm`), compact typography (`text-xs`), and tight horizontal padding. Ideal for dense table toolbars and compact filter rows.
- `Medium` (`md`): 40px height (`h-control-md`), standard typography (`text-sm`), and balanced padding. Standard density for application headers and main content filters.
- `Large` (`lg`): 48px height (`h-control-lg`), prominent typography (`text-base`), and generous padding. High prominence density for hero banners, documentation hubs, and global search modals.

<br>

### Variants

Searchbars provide structural surface treatments via the `variant` property:

- `Outlined` (`outlined`): Structural treatment with hairline border stroke over neutral background. Default presentation for general toolbars and page headers.
- `Filled` (`filled`): Subdued surface fill with minimal border stroke, shifting contrast on interaction. Ideal for high density dashboards and embedded cards.
- `Plain` (`plain`): Borderless container without resting background fill. Ideal for modal dialogs and seamless floating search overlays.

<br>

### Radius

Searchbars support corner curvature configurations via the `radius` property:

- `None` (`none`): Square container boundary with matching sharp accessory badges.
- `Small` (`sm`): Subtle 4px rounded corners (`rounded-sm`).
- `Medium` (`md`): Standard 6px rounded corners (`rounded-md`).
- `Large` (`lg`): Prominent 8px rounded corners (`rounded-lg`).
- `Full` (`full`): Continuous pill curvature (`rounded-full`), harmonizing container frames and nested shortcut badges.

<br>

### States

Searchbars communicate interactive status across all phases of user engagement:

- `Rest`: Default resting state displaying search icon and placeholder copy.
- `Hover`: Pointer presence over the container, enhancing border contrast.
- `Focus`: Active keyboard entry target, applying primary focus ring styling to the container frame.
- `Populated`: Active query entered with immediate display of search criteria.
- `Loading`: Asynchronous query in flight, replacing leading slot content with a spinner indicator.
- `Disabled`: Inactive state indicating search is unavailable with reduced opacity and blocked interaction.

<br>

### Object Continuity

Searchbars preserve dimensional stability across interactive transitions:

- Slot Swapping: Transitions between leading accessories and loading spinners maintain stable dimensions to prevent layout jitter.
- Focus Elevation: Focus rings expand outward without shifting adjacent elements or changing internal dimensions.
- Responsive Resilience: Flexible container widths preserve internal slot alignments smoothly during viewport changes.

<br>

### Accessibility

Searchbars adhere to WAI ARIA searchbox patterns and native search semantics:

- Input Role: Employs `type="search"` ensuring assistive technologies announce search capabilities and provide native accessibility actions.
- Focus Management: Escape key press blurs the active input.
- Dynamic States: Loading spinners communicate active status through `aria-busy="true"` on the parent container.

<br>

### Design Tokens

Searchbars consume design tokens exclusively from `@homonoid/tokens`:

- Surface Colors: `bg-background`, `bg-surface`, `bg-subtle`.
- Border Colors: `border-border`, `hover:border-foreground/30`, `focus-within:border-primary`.
- Control Heights: `h-control-sm` (32px), `h-control-md` (40px), `h-control-lg` (48px).
- Typography: `text-xs`, `text-sm`, `text-base` linked to active size.
- Motion Durations: `var(--motion-duration-normal)`, `var(--motion-easing)`.
