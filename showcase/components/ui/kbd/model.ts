import type { LucideIcon } from "lucide-react";
import {
  Command,
  Layers,
  Paintbrush,
  Compass,
  AlignLeft,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface KbdSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const KBD_SECTIONS: Record<string, KbdSectionItem> = {
  shortcuts: {
    id: "shortcuts",
    label: "Shortcuts",
    icon: Command,
  },
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
  navigation: {
    id: "navigation",
    label: "Navigation",
    icon: Compass,
  },
  inline: {
    id: "inline-usage",
    label: "Inline Usage",
    icon: AlignLeft,
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

export const KBD_SECTIONS_LIST: KbdSectionItem[] =
  Object.values(KBD_SECTIONS);

export const KBD_DEFAULT_CODE_SAMPLE = `import { Kbd } from "@homonoid/react";

export function Example() {
  return <Kbd keyValue="command" content="K" />;
}`;

export const KBD_SHORTCUTS_CODE_SAMPLE = `import { Kbd } from "@homonoid/react";

export function Example() {
  const shortcuts = [
    { label: "Cut", keys: "command" as const, content: "X" },
    { label: "Undo", keys: "command" as const, content: "Z" },
    { label: "Command Palette", keys: ["shift", "command"] as const, content: "P" },
    { label: "Inspect Element", keys: ["option", "command"] as const, content: "I" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {shortcuts.map((shortcut) => (
        <Kbd key={shortcut.label} keyValue={shortcut.keys} content={shortcut.content} />
      ))}
    </div>
  );
}`;

export const KBD_VARIANTS_CODE_SAMPLE = `import { Kbd } from "@homonoid/react";

export function Example() {
  const variants = [
    { variant: "contained" as const, label: "Contained" },
    { variant: "outlined" as const, label: "Outlined" },
    { variant: "plain" as const, label: "Plain" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-6">
      {variants.map((item) => (
        <div key={item.variant} className="flex flex-col items-center gap-2">
          <Kbd variant={item.variant} keyValue="command" content="K" />
          <span className="text-xs text-muted font-sans">{item.label}</span>
        </div>
      ))}
    </div>
  );
}`;

export const KBD_COLORS_CODE_SAMPLE = `import { Kbd } from "@homonoid/react";

export function Example() {
  const colors = [
    { color: "surface" as const, label: "Surface" },
    { color: "subtle" as const, label: "Subtle" },
    { color: "primary" as const, label: "Primary" },
    { color: "destructive" as const, label: "Destructive" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-6">
      {colors.map((item) => (
        <div key={item.color} className="flex flex-col items-center gap-2">
          <Kbd color={item.color} keyValue="command" content="K" />
          <span className="text-xs text-muted font-sans">{item.label}</span>
        </div>
      ))}
    </div>
  );
}`;

export const KBD_NAVIGATION_CODE_SAMPLE = `import { Kbd } from "@homonoid/react";

export function Example() {
  const navigation = [
    { key: "arrowup" as const, label: "Up" },
    { key: "arrowdown" as const, label: "Down" },
    { key: "arrowleft" as const, label: "Left" },
    { key: "arrowright" as const, label: "Right" },
  ];

  return (
    <div className="flex items-center gap-4">
      {navigation.map((item) => (
        <div key={item.key} className="flex flex-col items-center gap-2">
          <Kbd keyValue={item.key} />
          <span className="text-xs text-muted font-sans">{item.label}</span>
        </div>
      ))}
    </div>
  );
}`;

export const KBD_INLINE_CODE_SAMPLE = `import { Kbd } from "@homonoid/react";

export function Example() {
  return (
    <p className="text-sm text-foreground leading-relaxed max-w-lg">
      Press <Kbd keyValue="command" content="K" /> to open search, press{" "}
      <Kbd keyValue="escape" /> to dismiss overlays, or hit{" "}
      <Kbd keyValue="enter" /> to confirm changes.
    </p>
  );
}`;