import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Layers,
  Ruler,
  FolderTree,
  Ban,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface DropdownSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const DROPDOWN_SECTIONS: Record<string, DropdownSectionItem> = {
  placements: {
    id: "placements",
    label: "Placements",
    icon: Compass,
  },
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Ruler,
  },
  groups: {
    id: "groups",
    label: "Groups",
    icon: FolderTree,
  },
  disabled: {
    id: "disabled",
    label: "Disabled",
    icon: Ban,
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

export const DROPDOWN_SECTIONS_LIST: DropdownSectionItem[] =
  Object.values(DROPDOWN_SECTIONS);

export const DROPDOWN_DEFAULT_CODE_SAMPLE = `import { Dropdown, Button } from "@homonoid/react";
import { MoreHorizontal, Edit, Copy, Share2, Trash2 } from "lucide-react";

export function Example() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button 
          variant="outlined" 
          layout="icon"
          leading={<MoreHorizontal className="size-4" />}>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.List>
          <Dropdown.Item leading={<Edit className="size-4" />} trailing="⌘E">
            Edit
          </Dropdown.Item>
          <Dropdown.Item leading={<Copy className="size-4" />} trailing="⌘C">
            Duplicate
          </Dropdown.Item>
          <Dropdown.Item leading={<Share2 className="size-4" />}>
            Share
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item
            color="destructive"
            leading={<Trash2 className="size-4" />}
            trailing="⌫"
          >
            Delete
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}`;

export const DROPDOWN_PLACEMENTS_CODE_SAMPLE = `import { Dropdown, Button } from "@homonoid/react";

export function Example() {
  const placements = [
    { placement: "bottom-start" as const, label: "Bottom Start" },
    { placement: "bottom-end" as const, label: "Bottom End" },
    { placement: "top-start" as const, label: "Top Start" },
    { placement: "top-end" as const, label: "Top End" },
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {placements.map((item) => (
        <Dropdown key={item.placement} placement={item.placement}>
          <Dropdown.Trigger asChild>
            <Button variant="outlined">{item.label}</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.List>
              <Dropdown.Item>Action Item</Dropdown.Item>
              <Dropdown.Item>Second Item</Dropdown.Item>
            </Dropdown.List>
          </Dropdown.Content>
        </Dropdown>
      ))}
    </div>
  );
}`;

export const DROPDOWN_VARIANTS_CODE_SAMPLE = `import { Dropdown, Button } from "@homonoid/react";
import { Check, Info, Sparkles, AlertTriangle } from "lucide-react";

export function Example() {
  const actions = [
    { label: "Standard Action", color: "surface" as const, icon: <Check className="size-4" /> },
    { label: "Subtle Action", color: "subtle" as const, icon: <Info className="size-4" /> },
    { label: "Primary Action", color: "primary" as const, icon: <Sparkles className="size-4" /> },
    { label: "Destructive Action", color: "destructive" as const, icon: <AlertTriangle className="size-4" /> },
  ];

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button variant="outlined">Item Variants</Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.List>
          {actions.map((item) => (
            <Dropdown.Item key={item.label} color={item.color} leading={item.icon}>
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}`;

export const DROPDOWN_SIZES_CODE_SAMPLE = `import { Dropdown, Button } from "@homonoid/react";

export function Example() {
  const sizes = [
    { size: "sm" as const, label: "Small Menu" },
    { size: "md" as const, label: "Medium Menu" },
    { size: "lg" as const, label: "Large Menu" },
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {sizes.map((item) => (
        <Dropdown key={item.size} size={item.size}>
          <Dropdown.Trigger asChild>
            <Button size={item.size} variant="outlined">
              {item.label}
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.List>
              <Dropdown.Item>First Option</Dropdown.Item>
              <Dropdown.Item>Second Option</Dropdown.Item>
            </Dropdown.List>
          </Dropdown.Content>
        </Dropdown>
      ))}
    </div>
  );
}`;

export const DROPDOWN_GROUPS_CODE_SAMPLE = `import { Dropdown, Button } from "@homonoid/react";
import { User, Settings, CreditCard, LogOut } from "lucide-react";

export function Example() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button variant="outlined">Account</Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.List>
          <Dropdown.Group>
            <Dropdown.Label className="px-3 py-1.5 text-xs text-muted font-medium">
              Profile
            </Dropdown.Label>
            <Dropdown.Item leading={<User className="size-4" />}>
              Personal Info
            </Dropdown.Item>
            <Dropdown.Item leading={<Settings className="size-4" />}>
              Preferences
            </Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Separator />
          <Dropdown.Group>
            <Dropdown.Label className="px-3 py-1.5 text-xs text-muted font-medium">
              Billing
            </Dropdown.Label>
            <Dropdown.Item leading={<CreditCard className="size-4" />}>
              Subscriptions
            </Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Separator />
          <Dropdown.Item color="destructive" leading={<LogOut className="size-4" />}>
            Sign Out
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}`;

export const DROPDOWN_DISABLED_CODE_SAMPLE = `import { Dropdown, Button } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-center">
      <Dropdown disabled>
        <Dropdown.Trigger asChild>
          <Button disabled variant="outlined">
            Disabled Menu
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.List>
            <Dropdown.Item>Unavailable</Dropdown.Item>
          </Dropdown.List>
        </Dropdown.Content>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger asChild>
          <Button variant="outlined">Disabled Items</Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.List>
            <Dropdown.Item>Available Option</Dropdown.Item>
            <Dropdown.Item disabled>Locked Feature</Dropdown.Item>
            <Dropdown.Item>Active Option</Dropdown.Item>
          </Dropdown.List>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}`;
