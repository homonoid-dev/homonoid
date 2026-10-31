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
      value: "accessibility",
      trigger: "Is it accessible?",
      content:
        "Yes. It adheres to the WAI ARIA design pattern with full keyboard navigation.",
    },
    {
      value: "styling",
      trigger: "Is it styled with tokens?",
      disabled: true,
      content:
        "Yes. It consumes styling exclusively from Homonoid design tokens.",
    },
    {
      value: "animation",
      trigger: "Is it animated?",
      content:
        "Yes. CSS grid row interpolation guarantees smooth dimensional continuity.",
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Accordion defaultValue="accessibility" items={items} />
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

export const ACCORDION_COMPOUND_CODE_SAMPLE = `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Custom Header Structure</AccordionTrigger>
          <AccordionContent>
            Compound primitives allow explicit customization of slots and triggers.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Dedicated Subcomponents</AccordionTrigger>
          <AccordionContent>
            Dot notation or named imports give developers total layout flexibility.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}`;
