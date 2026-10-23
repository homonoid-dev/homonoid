"use client";

import { Select, Card, Description, Heading } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import { Shield, Zap, Lock } from "lucide-react";
import {
  SELECT_SECTIONS,
  SELECT_SECTIONS_LIST,
  SELECT_DEFAULT_CODE_SAMPLE,
  SELECT_VARIANTS_CODE_SAMPLE,
  SELECT_SIZES_CODE_SAMPLE,
  SELECT_ACCESSORIES_CODE_SAMPLE,
  SELECT_GROUPS_CODE_SAMPLE,
  SELECT_DISABLED_CODE_SAMPLE,
} from "./model";

export function SelectView() {
  useToc(SELECT_SECTIONS_LIST);

  const defaultOptions = [
    { value: "system", label: "System Theme" },
    { value: "light", label: "Light Theme" },
    { value: "dark", label: "Dark Theme" },
  ];

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

  const disabledOptions = [
    { value: "standard", label: "Standard Plan" },
    { value: "pro", label: "Pro Plan", disabled: true },
    { value: "enterprise", label: "Enterprise Plan" },
  ];

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">Select</Heading>
        <Description>
          A select displays a collapsible list of mutually exclusive options in a floating surface anchored to an interactive trigger control.
        </Description>
        <Description>
          Homonoid select controls pair resilient floating positioning with the tactile Tile primitive, delivering fluid opening transitions, full typeahead navigation, and zero layout shift.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="select" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Select } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={SELECT_DEFAULT_CODE_SAMPLE}>
          <div className="w-full max-w-xs">
            <Select
              label="Interface Theme"
              description="Select your preferred canvas color mode"
            >
              <Select.Trigger aria-label="Theme selector">
                <Select.Value placeholder="Select theme" />
              </Select.Trigger>
              <Select.Content>
                <Select.List>
                  {defaultOptions.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Content>
            </Select>
          </div>
        </Stage>
      </section>

      {/* Variants Section */}
      <section
        id={SELECT_SECTIONS.variants.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SELECT_SECTIONS.variants.icon} />
          <Heading size="md" as="h2">
            {SELECT_SECTIONS.variants.label}
          </Heading>
        </div>

        <Stage code={SELECT_VARIANTS_CODE_SAMPLE}>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {variants.map((item) => (
              <Select key={item.variant} variant={item.variant}>
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
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={SELECT_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SELECT_SECTIONS.sizes.icon} />
          <Heading size="md" as="h2">
            {SELECT_SECTIONS.sizes.label}
          </Heading>
        </div>

        <Stage code={SELECT_SIZES_CODE_SAMPLE}>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {sizes.map((item) => (
              <Select key={item.size} size={item.size}>
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
        </Stage>
      </section>

      {/* Accessories Section */}
      <section
        id={SELECT_SECTIONS.accessories.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SELECT_SECTIONS.accessories.icon} />
          <Heading size="md" as="h2">
            {SELECT_SECTIONS.accessories.label}
          </Heading>
        </div>

        <Stage code={SELECT_ACCESSORIES_CODE_SAMPLE}>
          <div className="w-full max-w-sm">
            <Select
              defaultValue="admin"
              label="Organization Role"
              description="Assign team permissions across repositories"
            >
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
        </Stage>
      </section>

      {/* Groups Section */}
      <section
        id={SELECT_SECTIONS.groups.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SELECT_SECTIONS.groups.icon} />
          <Heading size="md" as="h2">
            {SELECT_SECTIONS.groups.label}
          </Heading>
        </div>

        <Stage code={SELECT_GROUPS_CODE_SAMPLE}>
          <div className="w-full max-w-sm">
            <Select>
              <Select.Trigger aria-label="Server region">
                <Select.Value placeholder="Select deployment region" />
              </Select.Trigger>
              <Select.Content>
                <Select.List>
                  {groups.map((group) => (
                    <Select.Group key={group.name}>
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
        </Stage>
      </section>

      {/* Disabled Section */}
      <section
        id={SELECT_SECTIONS.disabled.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SELECT_SECTIONS.disabled.icon} />
          <Heading size="md" as="h2">
            {SELECT_SECTIONS.disabled.label}
          </Heading>
        </div>

        <Stage code={SELECT_DISABLED_CODE_SAMPLE}>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <Select
              disabled
              label="Disabled Control"
              description="Trigger surface and list interactions are inactive"
            >
              <Select.Trigger aria-label="Disabled select">
                <Select.Value placeholder="Unavailable option" />
              </Select.Trigger>
              <Select.Content>
                <Select.List>
                  <Select.Item value="one">Option One</Select.Item>
                </Select.List>
              </Select.Content>
            </Select>

            <Select
              label="Disabled Option"
              description="Specific choices can be individually deactivated"
            >
              <Select.Trigger aria-label="Select plan">
                <Select.Value placeholder="Select subscription" />
              </Select.Trigger>
              <Select.Content>
                <Select.List>
                  {disabledOptions.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Content>
            </Select>
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={SELECT_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {SELECT_SECTIONS.continuity.label}
        </Heading>

        <Description>
          Select controls preserve absolute geometric stability across closed and open states. The trigger maintains steady horizontal boundaries without width collapse or layout reflows when opening the floating surface.
        </Description>

        <Description>
          The floating menu animates smoothly from the trigger anchor point with coordinated opacity and transform scaling. Transform origin resolves dynamically according to current placement, keeping motion physically connected to the anchor trigger.
        </Description>

        <Description>
          Tactile press physics compress the trigger down to scale 0.97 during pointer down events, giving clear mechanical feedback before option list expansion.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={SELECT_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {SELECT_SECTIONS.accessibility.label}
        </Heading>

        <Description>
          Select adheres to the W3C WAI ARIA Combobox pattern. The trigger exposes combobox semantics while communicating expanded state and active control connections through aria expanded and aria controls.
        </Description>

        <Description>
          Keyboard navigation provides comprehensive control. Users can open the menu with Enter, Space, Arrow Down, or Arrow Up, navigate items with arrow keys, select choices with Enter, and dismiss menus with Escape.
        </Description>

        <Description>
          Typeahead search allows rapid jumping through long lists by typing initial character sequences directly on the keyboard.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={SELECT_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {SELECT_SECTIONS.tokens.label}
        </Heading>

        <Description>
          Trigger heights and internal padding values align precisely with the Homonoid spatial control scale across small, medium, and large density configurations.
        </Description>

        <Description>
          Surface backgrounds, border strokes, and elevation shadows consume semantic design tokens calibrated for light and dark environments.
        </Description>

        <Description>
          Item options share visual proportions, radii, and state colors directly with the unified Tile component system.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={SELECT_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {SELECT_SECTIONS.styleReference.label}
        </Heading>

        <Description>
          Select supports both declarative compound subcomponents and concise shorthand configurations using the options property.
        </Description>

        <Description>
          Every item leverages the Tile primitive directly, granting effortless support for leading iconography, rich labels, secondary descriptions, and trailing check indicators.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
