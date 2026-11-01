export interface ShowcaseComponentItem {
  name: string;
  href: string;
  description?: string;
  category?: string;
  related?: string[];
}

export const SHOWCASE_COMPONENTS: ShowcaseComponentItem[] = [
  { name: "Accordion", href: "/components/accordion", description: "Vertically collapsible content panels with disclosure headers", category: "Layout", related: ["Card", "Tile", "Separator"] },
  { name: "Autocomplete", href: "/components/autocomplete", description: "Searchable combobox with interactive suggestions list", category: "Inputs", related: ["Input", "Select", "Tile"] },
  { name: "Avatar", href: "/components/avatar", description: "Visual representation of user identity, initials, and presence", category: "Feedback", related: ["Badge", "Tooltip", "Button"] },
  { name: "Badge", href: "/components/badge", description: "Metadata tags, notification counts, and status indicators", category: "Feedback", related: ["Button", "Label", "Kbd"] },
  { name: "Breadcrumb", href: "/components/breadcrumb", description: "Hierarchical navigational path with collapsible tiers", category: "Layout", related: ["Stepper", "Button", "Label"] },
  { name: "Button", href: "/components/button", description: "Trigger actions and operations", category: "Actions", related: ["Kbd", "Spinner"] },
  { name: "Card", href: "/components/card", description: "Structured content grouping", category: "Layout", related: ["Tile", "Separator"] },
  { name: "Checkbox", href: "/components/checkbox", description: "Binary choice selection", category: "Inputs", related: ["Switch", "Tile", "Label"] },
  { name: "Description", href: "/components/description", description: "Contextual guidance and supportive copy", category: "Typography", related: ["Label", "Input"] },
  { name: "Dropdown", href: "/components/dropdown", description: "Floating menu of contextual actions and commands", category: "Overlays", related: ["Select", "Popover", "Tile"] },
  { name: "Input", href: "/components/input", description: "Capture user text input", category: "Inputs", related: ["Searchbar", "Label", "Description"] },
  { name: "Kbd", href: "/components/kbd", description: "Keyboard shortcut keys and command combination badges", category: "Feedback", related: ["Button", "Tooltip"] },
  { name: "Label", href: "/components/label", description: "Accessible captions and headers", category: "Typography", related: ["Description", "Input"] },
  { name: "Modal", href: "/components/modal", description: "Elevated dialog surfaces and focus containers", category: "Overlays", related: ["Popover", "Card"] },
  { name: "Popover", href: "/components/popover", description: "Transient floating surface anchored to interactive triggers", category: "Overlays", related: ["Modal", "Dropdown", "Tooltip"] },
  { name: "Searchbar", href: "/components/searchbar", description: "Search query entry with instant discovery actions", category: "Inputs", related: ["Input", "Kbd"] },
  { name: "Select", href: "/components/select", description: "Collapsible floating listbox with single choice selection", category: "Inputs", related: ["Dropdown", "Tile"] },
  { name: "Separator", href: "/components/separator", description: "Hairline visual partition across layout axes", category: "Layout", related: ["Card", "Tile"] },
  { name: "Spinner", href: "/components/spinner", description: "Indicate background activity", category: "Feedback", related: ["Button"] },
  { name: "Stepper", href: "/components/stepper", description: "Sequential multistep progress navigation", category: "Layout", related: ["Button", "Label", "Description"] },
  { name: "Switch", href: "/components/switch", description: "Toggle state of a single setting", category: "Inputs", related: ["Checkbox", "Tile", "Label"] },
  { name: "Textarea", href: "/components/textarea", description: "Multi line text entry with auto resize and floating label support", category: "Inputs", related: ["Input", "Description", "Label"] },
  { name: "Tile", href: "/components/tile", description: "Structured horizontal list item with tactile response", category: "Layout", related: ["Checkbox", "Switch", "Select", "Dropdown"] },
  { name: "Tooltip", href: "/components/tooltip", description: "Contextual guidance and keyboard shortcuts", category: "Feedback", related: ["Popover", "Kbd"] },
].sort((a, b) => a.name.localeCompare(b.name));
