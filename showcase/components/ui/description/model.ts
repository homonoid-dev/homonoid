import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Type,
  Tag,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface DescriptionSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const DESCRIPTION_SECTIONS: Record<string, DescriptionSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  polymorphism: {
    id: "polymorphism",
    label: "Polymorphism",
    icon: Type,
  },
  context: {
    id: "context",
    label: "Context",
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

export const DESCRIPTION_SECTIONS_LIST: DescriptionSectionItem[] =
  Object.values(DESCRIPTION_SECTIONS);

export const DESCRIPTION_DEFAULT_CODE_SAMPLE = `import { Description } from "@homonoid/react";

export function Example() {
  return (
    <Description className="max-w-md text-center">
      A description delivers supportive guidance and contextual information beneath controls and views.
    </Description>
  );
}`;

export const DESCRIPTION_VARIANTS_CODE_SAMPLE = `import { Description } from "@homonoid/react";

export function VariantsExample() {
  return (
    <div className="flex flex-col gap-3">
      <Description variant="muted">
        Muted variant provides secondary contrast for subtitles and auxiliary hints.
      </Description>
      <Description variant="surface">
        Surface variant delivers full foreground contrast for primary readability on tinted containers.
      </Description>
    </div>
  );
}`;

export const DESCRIPTION_POLYMORPHISM_CODE_SAMPLE = `import { Description } from "@homonoid/react";

export function PolymorphismExample() {
  return (
    <div className="flex flex-col gap-3">
      <Description as="p">
        Standard paragraph container for general instructional text.
      </Description>
      <Description as="span">
        Inline span container for inline annotations and supplementary badges.
      </Description>
      <Description as="small">
        Small element for legal disclaimers and secondary metadata footers.
      </Description>
    </div>
  );
}`;

export const DESCRIPTION_CONTEXT_CODE_SAMPLE = `import { Label, Description, Input, Card } from "@homonoid/react";

export function ContextExample() {
  return (
    <Card className="flex flex-col gap-3 max-w-sm w-full p-surface">
      <div className="flex flex-col gap-1">
        <Label size="sm" as="h3">
          Two Factor Authentication
        </Label>
        <Description>
          Protect your account with biometric keys or authenticator codes.
        </Description>
      </div>
      <Input placeholder="Enter verification code" />
      <Description variant="muted" as="small">
        Verification codes expire ten minutes after generation.
      </Description>
    </Card>
  );
}`;
