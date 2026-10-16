export interface ShowcaseComponentItem {
  name: string;
  href: string;
  description?: string;
}

export const SHOWCASE_COMPONENTS: ShowcaseComponentItem[] = [
  { name: "Button", href: "/button", description: "Trigger actions and operations" },
  { name: "Input", href: "/input", description: "Capture user text input" },
  { name: "Spinner", href: "/spinner", description: "Indicate background activity" },
  { name: "Label", href: "/label", description: "Accessible captions and headers" },
  { name: "Description", href: "/description", description: "Contextual guidance and supportive copy" },
  { name: "Checkbox", href: "/checkbox", description: "Binary choice selection" },
  { name: "Card", href: "/card", description: "Structured content grouping" },
];
