import { HelpCircle, Activity, Shield } from "lucide-react";
import type { ComponentType } from "react";
import type { Size } from "@homonoid/react";

export interface AccordionDemoItem {
  value: string;
  title: string;
  description: string;
  content: string;
  icon: ComponentType<{ className?: string }>;
  iconName: string;
}

export const ACCORDION_ITEMS: AccordionDemoItem[] = [
  {
    value: "item-1",
    title: "What is Homonoid?",
    description: "Tactile continuous aesthetics",
    content: "A tactile design system built with continuous aesthetics and object continuity.",
    icon: HelpCircle,
    iconName: "HelpCircle",
  },
  {
    value: "item-2",
    title: "How does motion work?",
    description: "Dynamic scale transitions",
    content: "Interactive surfaces respond with continuous easing and dynamic scale transitions.",
    icon: Activity,
    iconName: "Activity",
  },
  {
    value: "item-3",
    title: "Is it accessible?",
    description: "Accessible keyboard semantics",
    content: "Built with full keyboard navigation and comprehensive assistive technology support.",
    icon: Shield,
    iconName: "Shield",
  },
];

export type AccordionIndicatorType = "chevron" | "plus" | "none";
export type AccordionIndicatorPlacement = "leading" | "trailing";

export interface AccordionCodeOptions {
  variant: "plain" | "outlined" | "contained";
  size: Size;
  multiple: boolean;
  collapsible: boolean;
  disabled: boolean;
  showLeading: boolean;
  showDescription: boolean;
  indicatorType: AccordionIndicatorType;
  indicatorPlacement: AccordionIndicatorPlacement;
  compound: boolean;
}

export function getAccordionCode(options: AccordionCodeOptions): string {
  const {
    variant,
    size,
    multiple,
    collapsible,
    disabled,
    showLeading,
    showDescription,
    indicatorType,
    indicatorPlacement,
    compound,
  } = options;

  const lucideImports: string[] = [];
  if (showLeading) {
    lucideImports.push("HelpCircle", "Activity", "Shield");
  }
  if (indicatorType === "chevron") {
    lucideImports.push("ChevronDown");
  } else if (indicatorType === "plus") {
    lucideImports.push("Plus");
  }

  const iconImports = lucideImports.length > 0
    ? `import { ${lucideImports.join(", ")} } from "lucide-react";\n`
    : "";

  const props: string[] = ['defaultValue="item-1"'];
  if (variant !== "plain") props.push(`variant="${variant}"`);
  if (size !== "md") props.push(`size="${size}"`);
  if (multiple) props.push("multiple");
  if (!collapsible) props.push("collapsible={false}");
  if (disabled) props.push("disabled");

  if (indicatorType === "chevron") {
    props.push(
      `indicator={{ icon: <ChevronDown className="size-4 text-muted shrink-0" />, placement: "${indicatorPlacement}" }}`
    );
  } else if (indicatorType === "plus") {
    props.push(
      `indicator={{ icon: <Plus className="size-4 text-muted shrink-0" />, placement: "${indicatorPlacement}" }}`
    );
  }

  if (compound) {
    const accordionProps = props.length > 0 ? " " + props.join(" ") : "";

    const itemsCode = ACCORDION_ITEMS.map((item) => {
      const triggerProps: string[] = [];
      if (showLeading) {
        triggerProps.push(`leading={<${item.iconName} className="size-4 text-muted shrink-0" />}`);
      }
      if (showDescription) {
        triggerProps.push(`description="${item.description}"`);
      }
      const triggerAttr = triggerProps.length > 0 ? " " + triggerProps.join(" ") : "";

      return `      <Accordion.Item value="${item.value}">
        <Accordion.Trigger${triggerAttr}>
          ${item.title}
        </Accordion.Trigger>
        <Accordion.Content>
          ${item.content}
        </Accordion.Content>
      </Accordion.Item>`;
    }).join("\n");

    return `${iconImports}import { Accordion } from "@homonoid/react";

export function Example() {
  return (
    <Accordion${accordionProps}>
${itemsCode}
    </Accordion>
  );
}`;
  }

  // Atomic mode
  const atomicItemsCode = ACCORDION_ITEMS.map((item) => {
    const fields: string[] = [
      `value: "${item.value}"`,
      `trigger: "${item.title}"`,
    ];
    if (showDescription) {
      fields.push(`description: "${item.description}"`);
    }
    if (showLeading) {
      fields.push(`leading: <${item.iconName} className="size-4 text-muted shrink-0" />`);
    }
    fields.push(`content: "${item.content}"`);

    return `  {\n    ${fields.join(",\n    ")},\n  },`;
  }).join("\n");

  const accordionProps = props.length > 0 ? " " + props.join(" ") : "";

  return `${iconImports}import { Accordion, type AccordionItemDefinition } from "@homonoid/react";

const items: AccordionItemDefinition[] = [
${atomicItemsCode}
];

export function Example() {
  return (
    <Accordion${accordionProps} items={items} />
  );
}`;
}
