import type { LucideIcon } from "lucide-react";
import {
  Command,
  Layers,
  Paintbrush,
  Compass,
  AlignLeft,
  Sparkles,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface KbdSectionItem extends TocItem {
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
  special: {
    id: "special-keys",
    label: "Special Keys",
    icon: Sparkles,
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
    { label: "Copy", keys: "command" as const, content: "C" },
    { label: "Paste", keys: "command" as const, content: "V" },
    { label: "Cut", keys: "command" as const, content: "X" },
    { label: "Undo", keys: "command" as const, content: "Z" },
    { label: "Command Palette", keys: ["shift", "command"] as const, content: "P" },
    { label: "Inspect Element", keys: ["option", "command"] as const, content: "I" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {shortcuts.map((shortcut) => (
        <div key={shortcut.label} className="flex items-center gap-2">
          <span className="text-xs text-muted font-sans">{shortcut.label}</span>
          <Kbd keyValue={shortcut.keys} content={shortcut.content} />
        </div>
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
        <div key={item.variant} className="flex items-center gap-2">
          <span className="text-xs text-muted font-sans">{item.label}</span>
          <Kbd variant={item.variant} keyValue="command" content="K" />
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
        <div key={item.color} className="flex items-center gap-2">
          <span className="text-xs text-muted font-sans">{item.label}</span>
          <Kbd color={item.color} keyValue="command" content="K" />
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
        <div key={item.key} className="flex items-center gap-2">
          <span className="text-xs text-muted font-sans">{item.label}</span>
          <Kbd keyValue={item.key} />
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

export const KBD_SPECIAL_CODE_SAMPLE = `import { Kbd } from "@homonoid/react";

export function Example() {
  const specialKeys = [
    { key: "enter" as const, label: "Enter" },
    { key: "escape" as const, label: "Escape" },
    { key: "tab" as const, label: "Tab" },
    { key: "space" as const, label: "Space" },
    { key: "backspace" as const, label: "Delete" },
    { key: "capslock" as const, label: "Caps Lock" },
    { key: "shift" as const, label: "Shift" },
    { key: "option" as const, label: "Option" },
    { key: "control" as const, label: "Control" },
    { key: "command" as const, label: "Command" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {specialKeys.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <span className="text-xs text-muted font-sans">{item.label}</span>
          <Kbd keyValue={item.key} />
        </div>
      ))}
    </div>
  );
}`;
