export interface ShowcaseComponentItem {
  name: string;
  href: string;
  description?: string;
  related?: string[];
}

export const SHOWCASE_COMPONENTS: ShowcaseComponentItem[] = [
  { name: "Button", href: "/button", description: "Trigger actions and operations", related: ["Kbd", "Spinner"] },
  { name: "Card", href: "/card", description: "Structured content grouping", related: ["Tile", "Separator"] },
  { name: "Checkbox", href: "/checkbox", description: "Binary choice selection", related: ["Switch", "Tile", "Label"] },
  { name: "Description", href: "/description", description: "Contextual guidance and supportive copy", related: ["Label", "Input"] },
  { name: "Dropdown", href: "/dropdown", description: "Floating menu of contextual actions and commands", related: ["Select", "Popover", "Tile"] },
  { name: "Input", href: "/input", description: "Capture user text input", related: ["Searchbar", "Label", "Description"] },
  { name: "Kbd", href: "/kbd", description: "Keyboard shortcut keys and command combination badges", related: ["Button", "Tooltip"] },
  { name: "Label", href: "/label", description: "Accessible captions and headers", related: ["Description", "Input"] },
  { name: "Modal", href: "/modal", description: "Elevated dialog surfaces and focus containers", related: ["Popover", "Card"] },
  { name: "Popover", href: "/popover", description: "Transient floating surface anchored to interactive triggers", related: ["Modal", "Dropdown", "Tooltip"] },
  { name: "Searchbar", href: "/searchbar", description: "Search query entry with instant discovery actions", related: ["Input", "Kbd"] },
  { name: "Select", href: "/select", description: "Collapsible floating listbox with single choice selection", related: ["Dropdown", "Tile"] },
  { name: "Separator", href: "/separator", description: "Hairline visual partition across layout axes", related: ["Card", "Tile"] },
  { name: "Spinner", href: "/spinner", description: "Indicate background activity", related: ["Button"] },
  { name: "Switch", href: "/switch", description: "Toggle state of a single setting", related: ["Checkbox", "Tile", "Label"] },
  { name: "Tile", href: "/tile", description: "Structured horizontal list item with tactile response", related: ["Checkbox", "Switch", "Select", "Dropdown"] },
  { name: "Tooltip", href: "/tooltip", description: "Contextual guidance and keyboard shortcuts", related: ["Popover", "Kbd"] },
].sort((a, b) => a.name.localeCompare(b.name));
