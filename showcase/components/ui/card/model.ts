import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Paintbrush,
  Square,
  Maximize2,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface CardSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const CARD_SECTIONS: Record<string, CardSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  colors: {
    id: "colors",
    label: "Colors",
    icon: Paintbrush,
  },
  border: {
    id: "border-control",
    label: "Border Control",
    icon: Square,
  },
  padding: {
    id: "padding-scale",
    label: "Padding Scale",
    icon: Maximize2,
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

export const CARD_SECTIONS_LIST: CardSectionItem[] =
  Object.values(CARD_SECTIONS);

export const CARD_DEFAULT_CODE_SAMPLE = `import { Card, Label, Description } from "@harmonia/react";

export function Example() {
  return (
    <Card className="flex flex-col gap-2 max-w-sm w-full p-surface">
      <Label size="md" as="h3">
        Project Overview
      </Label>
      <Description>
        Harmonia components provide continuous aesthetic fidelity and tactile physics.
      </Description>
    </Card>
  );
}`;

export const CARD_VARIANTS_CODE_SAMPLE = `import { Card, Label, Description } from "@harmonia/react";

export function VariantsExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-surface-gap w-full max-w-lg">
      <Card variant="outlined" className="flex flex-col gap-2 p-surface">
        <Label size="sm" as="h3">
          Outlined Card
        </Label>
        <Description>
          Transparent surface framed by an optional hairline border stroke.
        </Description>
      </Card>
      <Card variant="filled" className="flex flex-col gap-2 p-surface">
        <Label size="sm" as="h3">
          Filled Card
        </Label>
        <Description>
          Solid surface fill providing grounded visual grouping across views.
        </Description>
      </Card>
    </div>
  );
}`;

export const CARD_COLORS_CODE_SAMPLE = `import { Card, Label, Description } from "@harmonia/react";

export function ColorsExample() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-surface-gap w-full max-w-lg">
      <Card variant="filled" color="surface" className="flex flex-col gap-2 p-surface">
        <Label size="sm" as="h3">
          Surface
        </Label>
        <Description>
          Neutral surface background.
        </Description>
      </Card>
      <Card variant="filled" color="subtle" className="flex flex-col gap-2 p-surface">
        <Label size="sm" as="h3">
          Subtle
        </Label>
        <Description>
          Chroma subtle wash tint.
        </Description>
      </Card>
      <Card variant="filled" color="primary" className="flex flex-col gap-2 p-surface">
        <Label size="sm" as="h3">
          Primary
        </Label>
        <Description>
          Brand highlight container.
        </Description>
      </Card>
      <Card variant="filled" color="destructive" className="flex flex-col gap-2 p-surface">
        <Label size="sm" as="h3">
          Destructive
        </Label>
        <Description>
          Danger alert container.
        </Description>
      </Card>
    </div>
  );
}`;

export const CARD_BORDER_CODE_SAMPLE = `import { Card, Label, Description } from "@harmonia/react";

export function BorderExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-surface-gap w-full max-w-lg">
      <Card variant="filled" border={true} className="flex flex-col gap-2 p-surface">
        <Label size="sm" as="h3">
          With Border
        </Label>
        <Description>
          Hairline border framing the card perimeter.
        </Description>
      </Card>
      <Card variant="filled" border={false} className="flex flex-col gap-2 p-surface">
        <Label size="sm" as="h3">
          Borderless
        </Label>
        <Description>
          Border stroke omitted for flat layered surfaces.
        </Description>
      </Card>
    </div>
  );
}`;

export const CARD_PADDING_CODE_SAMPLE = `import { Card, Label, Description } from "@harmonia/react";

export function PaddingExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-lg">
      <Card padding="none" variant="filled" className="flex flex-col gap-1 p-2">
        <Label size="sm" as="h3">
          Padding None
        </Label>
        <Description>
          Custom internal inset padding.
        </Description>
      </Card>
      <Card padding="sm" variant="filled" className="flex flex-col gap-1">
        <Label size="sm" as="h3">
          Padding Small
        </Label>
        <Description>
          Compact four unit padding scale.
        </Description>
      </Card>
      <Card padding="surface" variant="filled" className="flex flex-col gap-1">
        <Label size="sm" as="h3">
          Padding Surface
        </Label>
        <Description>
          Standard layout rhythm surface padding.
        </Description>
      </Card>
    </div>
  );
}`;
