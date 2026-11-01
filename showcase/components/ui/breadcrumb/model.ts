import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Component,
  Sliders,
  Split,
  FoldHorizontal,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface BreadcrumbSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const BREADCRUMB_SECTIONS: Record<string, BreadcrumbSectionItem> = {
  atomic: {
    id: "atomic-usage",
    label: "Atomic Usage",
    icon: Component,
  },
  compound: {
    id: "compound-composition",
    label: "Compound Composition",
    icon: Layers,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Sliders,
  },
  separators: {
    id: "custom-separators",
    label: "Custom Separators",
    icon: Split,
  },
  collapsed: {
    id: "collapsed-overflow",
    label: "Collapsed Overflow",
    icon: FoldHorizontal,
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

export const BREADCRUMB_SECTIONS_LIST: BreadcrumbSectionItem[] =
  Object.values(BREADCRUMB_SECTIONS);

export const BREADCRUMB_DEFAULT_CODE_SAMPLE = `import { Breadcrumb } from "@homonoid/react";

export function Example() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Navigation", href: "/components#navigation" },
    { label: "Breadcrumb" },
  ];

  return <Breadcrumb items={items} />;
}`;

export const BREADCRUMB_ATOMIC_CODE_SAMPLE = `import { Breadcrumb } from "@homonoid/react";
import { Home } from "lucide-react";

export function Example() {
  const items = [
    { label: "Dashboard", href: "/", icon: <Home className="size-3.5" /> },
    { label: "Settings", href: "/settings" },
    { label: "Security", href: "/settings/security" },
    { label: "Two Factor Authentication" },
  ];

  return <Breadcrumb items={items} />;
}`;

export const BREADCRUMB_COMPOUND_CODE_SAMPLE = `import { Breadcrumb } from "@homonoid/react";
import { ChevronRight } from "lucide-react";

export function Example() {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRight className="size-3.5 text-muted" />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/store">Store</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRight className="size-3.5 text-muted" />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/store/apparel">Apparel</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRight className="size-3.5 text-muted" />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Jackets</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}`;

export const BREADCRUMB_SIZES_CODE_SAMPLE = `import { Breadcrumb } from "@homonoid/react";

export function Example() {
  const items = [
    { label: "Workspace", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Overview" },
  ];

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Breadcrumb size="sm" items={items} />
      <Breadcrumb size="md" items={items} />
      <Breadcrumb size="lg" items={items} />
    </div>
  );
}`;

export const BREADCRUMB_SEPARATORS_CODE_SAMPLE = `import { Breadcrumb } from "@homonoid/react";
import { ArrowRight } from "lucide-react";

export function Example() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: "Architecture" },
  ];

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Breadcrumb items={items} separator="/" />
      <Breadcrumb
        items={items}
        separator={<ArrowRight className="size-3.5 text-muted" />}
      />
    </div>
  );
}`;

export const BREADCRUMB_COLLAPSED_CODE_SAMPLE = `import { Breadcrumb } from "@homonoid/react";

export function Example() {
  const items = [
    { label: "Root", href: "/" },
    { label: "Users", href: "/users" },
    { label: "Profiles", href: "/users/profiles" },
    { label: "Preferences", href: "/users/profiles/preferences" },
    { label: "Notification Channels" },
  ];

  return (
    <Breadcrumb
      items={items}
      maxItems={3}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={1}
    />
  );
}`;

