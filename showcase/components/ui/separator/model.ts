import type { LucideIcon } from "lucide-react";
import {
  MoveHorizontal,
  MoveVertical,
  Layers,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface SeparatorSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const SEPARATOR_SECTIONS: Record<string, SeparatorSectionItem> = {
  horizontal: {
    id: "horizontal",
    label: "Horizontal",
    icon: MoveHorizontal,
  },
  vertical: {
    id: "vertical",
    label: "Vertical",
    icon: MoveVertical,
  },
  semantics: {
    id: "semantics",
    label: "Semantics",
    icon: Layers,
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

export const SEPARATOR_SECTIONS_LIST: SeparatorSectionItem[] =
  Object.values(SEPARATOR_SECTIONS);

export const SEPARATOR_DEFAULT_CODE_SAMPLE = `import { Separator, Heading, Description } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Heading size="md">Workspace Overview</Heading>
        <Description size="sm">Central control hub for team projects</Description>
      </div>
      <Separator />
      <div className="flex justify-between text-xs text-muted">
        <span>Active Repositories</span>
        <span className="font-medium text-foreground">14</span>
      </div>
    </div>
  );
}`;

export const SEPARATOR_HORIZONTAL_CODE_SAMPLE = `import { Separator, Heading, Description } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Heading size="sm">Account Details</Heading>
        <Description size="sm">Manage personal login settings</Description>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-1">
        <Heading size="sm">Security Keys</Heading>
        <Description size="sm">Configure hardware tokens and credentials</Description>
      </div>
    </div>
  );
}`;

export const SEPARATOR_VERTICAL_CODE_SAMPLE = `import { Separator, Button } from "@homonoid/react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter } from "lucide-react";

export function Example() {
  return (
    <div className="flex items-center gap-2 p-1.5 border border-border rounded-xl bg-surface">
      <Button variant="plain" layout="icon" size="sm" leading={<Bold className="size-4" />} />
      <Button variant="plain" layout="icon" size="sm" leading={<Italic className="size-4" />} />
      <Button variant="plain" layout="icon" size="sm" leading={<Underline className="size-4" />} />
      <Separator orientation="vertical" className="mx-1 h-5" />
      <Button variant="plain" layout="icon" size="sm" leading={<AlignLeft className="size-4" />} />
      <Button variant="plain" layout="icon" size="sm" leading={<AlignCenter className="size-4" />} />
    </div>
  );
}`;

export const SEPARATOR_SEMANTICS_CODE_SAMPLE = `import { Separator, Description } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Description size="sm" className="font-medium text-foreground">
          Decorative Divider with role none
        </Description>
        <Separator decorative />
      </div>

      <div className="flex flex-col gap-2">
        <Description size="sm" className="font-medium text-foreground">
          Semantic Divider with role separator
        </Description>
        <Separator decorative={false} />
      </div>
    </div>
  );
}`;
