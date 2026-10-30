export interface ShowcaseComponentItem {
  name: string;
  href: string;
  description?: string;
  related?: string[];
}

export const SHOWCASE_COMPONENTS: ShowcaseComponentItem[] = [
  { name: "Button", href: "/components/button", description: "Trigger actions and operations", related: ["Kbd", "Spinner"] },
  { name: "Card", href: "/components/card", description: "Structured content grouping", related: ["Tile", "Separator"] },
  { name: "Checkbox", href: "/components/checkbox", description: "Binary choice selection", related: ["Switch", "Tile", "Label"] },
  { name: "Description", href: "/components/description", description: "Contextual guidance and supportive copy", related: ["Label", "Input"] },
  { name: "Dropdown", href: "/components/dropdown", description: "Floating menu of contextual actions and commands", related: ["Select", "Popover", "Tile"] },
  { name: "Input", href: "/components/input", description: "Capture user text input", related: ["Searchbar", "Label", "Description"] },
  { name: "Kbd", href: "/components/kbd", description: "Keyboard shortcut keys and command combination badges", related: ["Button", "Tooltip"] },
  { name: "Label", href: "/components/label", description: "Accessible captions and headers", related: ["Description", "Input"] },
  { name: "Modal", href: "/components/modal", description: "Elevated dialog surfaces and focus containers", related: ["Popover", "Card"] },
  { name: "Popover", href: "/components/popover", description: "Transient floating surface anchored to interactive triggers", related: ["Modal", "Dropdown", "Tooltip"] },
  { name: "Searchbar", href: "/components/searchbar", description: "Search query entry with instant discovery actions", related: ["Input", "Kbd"] },
  { name: "Select", href: "/components/select", description: "Collapsible floating listbox with single choice selection", related: ["Dropdown", "Tile"] },
  { name: "Separator", href: "/components/separator", description: "Hairline visual partition across layout axes", related: ["Card", "Tile"] },
  { name: "Spinner", href: "/components/spinner", description: "Indicate background activity", related: ["Button"] },
  { name: "Switch", href: "/components/switch", description: "Toggle state of a single setting", related: ["Checkbox", "Tile", "Label"] },
  { name: "Tile", href: "/components/tile", description: "Structured horizontal list item with tactile response", related: ["Checkbox", "Switch", "Select", "Dropdown"] },
  { name: "Tooltip", href: "/components/tooltip", description: "Contextual guidance and keyboard shortcuts", related: ["Popover", "Kbd"] },
].sort((a, b) => a.name.localeCompare(b.name));
