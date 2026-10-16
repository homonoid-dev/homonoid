import type { LucideIcon } from "lucide-react";
import {
  Ruler,
  Layers,
  Tag,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface LabelSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const LABEL_SECTIONS: Record<string, LabelSectionItem> = {
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Ruler,
  },
  polymorphism: {
    id: "polymorphism",
    label: "Polymorphism",
    icon: Layers,
  },
  forms: {
    id: "forms",
    label: "Form Controls",
    icon: Tag,
  },
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

export const LABEL_SECTIONS_LIST: LabelSectionItem[] =
  Object.values(LABEL_SECTIONS);


export const LABEL_DEFAULT_CODE_SAMPLE = `import { Label } from "@harmonia/react";

export function Example() {
  return (
    <Label size="lg" as="h1">
      Account Settings
    </Label>
  );
}`;

export const LABEL_SIZES_CODE_SAMPLE = `import { Label } from "@harmonia/react";

export function SizesExample() {
  return (
    <div className="flex flex-col gap-4">
      <Label size="lg">Large Heading</Label>
      <Label size="md">Medium Section</Label>
      <Label size="sm">Small Subsection</Label>
    </div>
  );
}`;

export const LABEL_POLYMORPHISM_CODE_SAMPLE = `import { Label } from "@harmonia/react";

export function PolymorphismExample() {
  return (
    <div className="flex flex-col gap-3">
      <Label as="h1" size="lg">
        Document Landmark (h1)
      </Label>
      <Label as="h2" size="md">
        Regional Section (h2)
      </Label>
      <Label as="span" size="sm">
        Inline Accessory (span)
      </Label>
    </div>
  );
}`;

export const LABEL_FORMS_CODE_SAMPLE = `import { Label, Input, Description } from "@harmonia/react";

export function FormExample() {
  return (
    <div className="flex flex-col gap-2 max-w-sm w-full">
      <Label as="label" htmlFor="workspace-name" size="sm">
        Workspace Name
      </Label>
      <Input
        id="workspace-name"
        placeholder="e.g. Studio"
      />
      <Description>
        Used across notifications and shared project invites.
      </Description>
    </div>
  );
}`;
