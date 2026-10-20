import type { LucideIcon } from "lucide-react";
import {
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface PopoverSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const POPOVER_SECTIONS: Record<string, PopoverSectionItem> = {
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Infinity,
  },
  accessibility: {
    id: "accessibility",
    label: "Accessibility",
    icon: Accessibility,
  },
  tokens: {
    id: "design-tokens",
    label: "Design Tokens",
    icon: Palette,
  },
  styleReference: {
    id: "style-reference",
    label: "Style Reference",
    icon: BookOpen,
  },
};

export const POPOVER_SECTIONS_LIST: PopoverSectionItem[] =
  Object.values(POPOVER_SECTIONS);

export const POPOVER_DEFAULT_CODE_SAMPLE = `import { Button, Popover } from "@homonoid/react";

export function Example() {
  return (
    <Popover>
      <Button variant="contained">Click me</Button>
      <Popover.Content className="max-w-64">
        <Popover.Dialog>
          <Popover.Heading size="sm">Popover Title</Popover.Heading>
          <p className="mt-2 text-sm text-muted">
            This is the popover content. You can put any content here.
          </p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}`;
