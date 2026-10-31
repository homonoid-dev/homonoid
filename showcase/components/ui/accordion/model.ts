import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Component,
  Sliders,
  MousePointerClick,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface AccordionSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const ACCORDION_SECTIONS: Record<string, AccordionSectionItem> = {
  atomic: {
    id: "atomic-usage",
    label: "Atomic Usage",
    icon: Component,
  },
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  multiple: {
    id: "multiple-expansion",
    label: "Multiple Expansion",
    icon: Sliders,
  },
  interactive: {
    id: "compound-composition",
    label: "Compound Composition",
    icon: MousePointerClick,
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

export const ACCORDION_SECTIONS_LIST: AccordionSectionItem[] =
  Object.values(ACCORDION_SECTIONS);

export const ACCORDION_DEFAULT_CODE_SAMPLE = `import { Accordion } from "@homonoid/react";

export function Example() {
  const items = [
    {
      value: "architecture",
      trigger: "How does the compound pattern work?",
      content:
        "Subcomponents connect through React context to synchronize disclosure states and keyboard navigation automatically.",
    },
    {
      value: "theming",
      trigger: "Can themes be overridden dynamically?",
      disabled: true,
      content:
        "Theme tokens adapt across light and dark modes through CSS custom properties defined at the root.",
    },
    {
      value: "motion",
      trigger: "How is object continuity preserved?",
      content:
        "Transitions utilize CSS grid template rows and motion duration tokens to eliminate abrupt layout jumps.",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Accordion defaultValue="architecture" items={items} />
    </div>
  );
}`;

export const ACCORDION_ATOMIC_CODE_SAMPLE = `import { Accordion } from "@homonoid/react";

export function Example() {
  const items = [
    {
      value: "item-1",
      trigger: "What is Homonoid?",
      content:
        "Homonoid is an agentic design system crafted for modern web applications.",
    },
    {
      value: "item-2",
      trigger: "Can I customize variants?",
      content:
        "Yes. Choose between flush, bordered, or separated card treatments.",
    },
    {
      value: "item-3",
      trigger: "Does it support nested content?",
      content:
        "Any valid React node can be passed inside content panels seamlessly.",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Accordion variant="bordered" defaultValue="item-1" items={items} />
    </div>
  );
}`;

export const ACCORDION_VARIANTS_CODE_SAMPLE = `import { Accordion } from "@homonoid/react";

export function Example() {
  const items = [
    {
      value: "profile",
      trigger: "Account Security",
      content: "Configure multi factor authentication and session duration.",
    },
    {
      value: "notifications",
      trigger: "Notification Preferences",
      content: "Manage email digests, push alerts, and workspace mentions.",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Accordion variant="separated" defaultValue="profile" items={items} />
    </div>
  );
}`;

export const ACCORDION_MULTIPLE_CODE_SAMPLE = `import { Accordion } from "@homonoid/react";

export function Example() {
  const items = [
    {
      value: "general",
      trigger: "General Settings",
      content: "Workspace name, branding colors, and public directory options.",
    },
    {
      value: "billing",
      trigger: "Plan and Invoices",
      content: "Subscription tier details, payment methods, and receipt history.",
    },
    {
      value: "integrations",
      trigger: "Connected Services",
      content: "Manage API keys, webhooks, and third party developer connections.",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Accordion
        multiple
        defaultValue={["general", "billing"]}
        items={items}
      />
    </div>
  );
}`;

export const ACCORDION_COMPOUND_CODE_SAMPLE = `import { Accordion } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Accordion defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Custom Header Structure</Accordion.Trigger>
          <Accordion.Content>
            Compound primitives allow explicit customization of slots and triggers.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>Dedicated Subcomponents</Accordion.Trigger>
          <Accordion.Content>
            Dot notation gives developers total layout flexibility.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}`;
