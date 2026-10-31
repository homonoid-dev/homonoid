"use client";

import {
  Accordion,
  Description,
} from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  ACCORDION_SECTIONS,
  ACCORDION_SECTIONS_LIST,
  ACCORDION_DEFAULT_CODE_SAMPLE,
  ACCORDION_ATOMIC_CODE_SAMPLE,
  ACCORDION_VARIANTS_CODE_SAMPLE,
  ACCORDION_MULTIPLE_CODE_SAMPLE,
  ACCORDION_COMPOUND_CODE_SAMPLE,
} from "./model";

export function AccordionView() {
  const sections = ACCORDION_SECTIONS;

  const defaultItems = [
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

  const atomicItems = [
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

  const separatedItems = [
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

  const multipleItems = [
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
    <Exhibit
      title="Accordion"
      summary="An accordion organizes complex sections of content by stacking vertically collapsible panels beneath interactive headers."
      description="Homonoid accordions support both zero boilerplate atomic declarations and fully composable compound subcomponents with native keyboard navigation and fluid state transitions."
      component="accordion"
      importCode='import { Accordion } from "@homonoid/react";'
      defaultCode={ACCORDION_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <div className="w-full max-w-lg mx-auto">
          <Accordion defaultValue="architecture" items={defaultItems} />
        </div>
      }
      sections={ACCORDION_SECTIONS_LIST}
    >
      {/* Atomic Usage Section */}
      <Exhibit.Stage section={sections.atomic} code={ACCORDION_ATOMIC_CODE_SAMPLE}>
        <div className="w-full max-w-lg mx-auto">
          <Accordion variant="bordered" defaultValue="item-1" items={atomicItems} />
        </div>
      </Exhibit.Stage>

      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={ACCORDION_VARIANTS_CODE_SAMPLE}>
        <div className="w-full max-w-lg mx-auto">
          <Accordion variant="separated" defaultValue="profile" items={separatedItems} />
        </div>
      </Exhibit.Stage>

      {/* Multiple Expansion Section */}
      <Exhibit.Stage section={sections.multiple} code={ACCORDION_MULTIPLE_CODE_SAMPLE}>
        <div className="w-full max-w-lg mx-auto">
          <Accordion
            multiple
            defaultValue={["general", "billing"]}
            items={multipleItems}
          />
        </div>
      </Exhibit.Stage>

      {/* Compound Composition Section */}
      <Exhibit.Stage section={sections.interactive} code={ACCORDION_COMPOUND_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Content panels preserve dimensional stability by animating CSS grid template rows smoothly from zero fractions to one fraction.
        </Description>
        <Description>
          The trailing disclosure chevron rotates smoothly across one hundred eighty degrees with calibrated timing and zero layout displacement.
        </Description>
        <Description>
          Panel collapse and expansion transitions automatically respect user reduced motion preferences by setting animation durations to zero.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Interactive triggers render as native button elements nested within semantic heading elements with configurable heading levels.
        </Description>
        <Description>
          Every item binds aria expanded and aria controls attributes to maintain unambiguous programmatic relationships with content regions.
        </Description>
        <Description>
          Full keyboard navigation empowers users to traverse between triggers using Arrow Down, Arrow Up, Home, and End keys.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          All border strokes, background fills, and hover highlights consume semantic surface and border tokens from the Homonoid tokens package.
        </Description>
        <Description>
          Transitions apply motion duration and easing curve variables exclusively without arbitrary millisecond values.
        </Description>
        <Description>
          Focus rings match Homonoid platform visual standards with high contrast visibility across both light and dark modes.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          The root Accordion component exposes Item, Trigger, Content, and Label subcomponents via dot notation namespacing.
        </Description>
        <Description>
          Developers can configure flush, bordered, or separated structural variants to harmonize with surrounding layout cards and forms.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
