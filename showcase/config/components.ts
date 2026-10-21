export interface ShowcaseComponentItem {
  name: string;
  href: string;
  description?: string;
}

export const SHOWCASE_COMPONENTS: ShowcaseComponentItem[] = [
  { name: "Button", href: "/button", description: "Trigger actions and operations" },
  { name: "Card", href: "/card", description: "Structured content grouping" },
  { name: "Checkbox", href: "/checkbox", description: "Binary choice selection" },
  { name: "Description", href: "/description", description: "Contextual guidance and supportive copy" },
  { name: "Dropdown", href: "/dropdown", description: "Floating menu of contextual actions and commands" },
  { name: "Input", href: "/input", description: "Capture user text input" },
  { name: "Label", href: "/label", description: "Accessible captions and headers" },
  { name: "Modal", href: "/modal", description: "Elevated dialog surfaces and focus containers" },
  { name: "Popover", href: "/popover", description: "Transient floating surface anchored to interactive triggers" },
  { name: "Select", href: "/select", description: "Collapsible floating listbox with single choice selection" },
  { name: "Separator", href: "/separator", description: "Hairline visual partition across layout axes" },
  { name: "Spinner", href: "/spinner", description: "Indicate background activity" },
  { name: "Switch", href: "/switch", description: "Toggle state of a single setting" },
  { name: "Tile", href: "/tile", description: "Structured horizontal list item with tactile response" },
  { name: "Tooltip", href: "/tooltip", description: "Contextual guidance and keyboard shortcuts" },
].sort((a, b) => a.name.localeCompare(b.name));
