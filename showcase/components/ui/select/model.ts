import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Ruler,
  SlidersHorizontal,
  FolderTree,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface SelectSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const SELECT_SECTIONS: Record<string, SelectSectionItem> = {
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
  accessories: {
    id: "accessories",
    label: "Accessories",
    icon: SlidersHorizontal,
  },
  groups: {
    id: "groups",
    label: "Groups",
    icon: FolderTree,
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

export const SELECT_SECTIONS_LIST: SelectSectionItem[] =
  Object.values(SELECT_SECTIONS);

export const SELECT_DEFAULT_CODE_SAMPLE = `import { Select } from "@homonoid/react";

export function Example() {
  const options = [
    { value: "system", label: "System Theme" },
    { value: "light", label: "Light Theme" },
    { value: "dark", label: "Dark Theme" },
  ];

  return (
    <div className="w-full max-w-xs">
      <Select defaultValue="system">
        <Select.Trigger aria-label="Theme selector">
          <Select.Value placeholder="Select theme" />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            {options.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select>
    </div>
  );
}`;

export const SELECT_VARIANTS_CODE_SAMPLE = `import { Select } from "@homonoid/react";

export function Example() {
  const variants = [
    { variant: "contained" as const, label: "Contained Variant" },
    { variant: "outlined" as const, label: "Outlined Variant" },
    { variant: "plain" as const, label: "Plain Variant" },
  ];

  const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "vite", label: "Vite" },
    { value: "remix", label: "Remix" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      {variants.map((item) => (
        <Select key={item.variant} variant={item.variant} defaultValue="next">
          <Select.Trigger aria-label={item.label}>
            <Select.Value placeholder={item.label} />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              {frameworks.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </Select>
      ))}
    </div>
  );
}`;

export const SELECT_SIZES_CODE_SAMPLE = `import { Select } from "@homonoid/react";

export function Example() {
  const sizes = [
    { size: "sm" as const, label: "Small Size" },
    { size: "md" as const, label: "Medium Size" },
    { size: "lg" as const, label: "Large Size" },
  ];

  const environments = [
    { value: "dev", label: "Development" },
    { value: "staging", label: "Staging" },
    { value: "prod", label: "Production" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      {sizes.map((item) => (
        <Select key={item.size} size={item.size} defaultValue="dev">
          <Select.Trigger aria-label={item.label}>
            <Select.Value placeholder={item.label} />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              {environments.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </Select>
      ))}
    </div>
  );
}`;

export const SELECT_ACCESSORIES_CODE_SAMPLE = `import { Select } from "@homonoid/react";
import { Shield, Zap, Lock } from "lucide-react";

export function Example() {
  const roles = [
    {
      value: "admin",
      label: "Administrator",
      description: "Full access to organization assets",
      icon: <Shield className="size-5" />,
    },
    {
      value: "developer",
      label: "Developer",
      description: "Deploy and manage workspace code",
      icon: <Zap className="size-5" />,
    },
    {
      value: "viewer",
      label: "Viewer",
      description: "Read only access to reports and views",
      icon: <Lock className="size-5" />,
    },
  ];

  return (
    <div className="w-full max-w-sm">
      <Select defaultValue="admin">
        <Select.Trigger aria-label="Access role">
          <Select.Value placeholder="Select member role" />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            {roles.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                leading={item.icon}
                label={item.label}
                description={item.description}
              />
            ))}
          </Select.List>
        </Select.Content>
      </Select>
    </div>
  );
}`;

export const SELECT_GROUPS_CODE_SAMPLE = `import { Select } from "@homonoid/react";

export function Example() {
  const groups = [
    {
      name: "Americas",
      regions: [
        { value: "us-east", label: "US East (N. Virginia)" },
        { value: "us-west", label: "US West (Oregon)" },
      ],
    },
    {
      name: "Europe",
      regions: [
        { value: "eu-west", label: "Europe (Ireland)" },
        { value: "eu-central", label: "Europe (Frankfurt)" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-sm">
      <Select defaultValue="us-east">
        <Select.Trigger aria-label="Server region">
          <Select.Value placeholder="Select deployment region" />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            {groups.map((group, index) => (
              <Select.Group key={group.name}>
                {index > 0 && <Select.Separator />}
                <Select.Label className="px-3 py-1.5 text-xs text-subtle-foreground font-medium">
                  {group.name}
                </Select.Label>
                {group.regions.map((region) => (
                  <Select.Item key={region.value} value={region.value}>
                    {region.label}
                  </Select.Item>
                ))}
              </Select.Group>
            ))}
          </Select.List>
        </Select.Content>
      </Select>
    </div>
  );
}`;
