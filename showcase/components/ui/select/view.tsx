"use client";

import { Select, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
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
  const sections = SELECT_SECTIONS;

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
    <Exhibit
      title="Select"
      summary="A select displays a collapsible list of mutually exclusive options in a floating surface anchored to an interactive trigger control."
      description="Homonoid select controls pair resilient floating positioning with the tactile Tile primitive, delivering fluid opening transitions, full typeahead navigation, and zero layout shift."
      component="select"
      importCode='import { Select } from "@homonoid/react";'
      defaultCode={SELECT_DEFAULT_CODE_SAMPLE}
      defaultStage={
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
      }
      sections={SELECT_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={SELECT_VARIANTS_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={SELECT_SIZES_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Accessories Section */}
      <Exhibit.Stage section={sections.accessories} code={SELECT_ACCESSORIES_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Groups Section */}
      <Exhibit.Stage section={sections.groups} code={SELECT_GROUPS_CODE_SAMPLE}>
        <div className="w-full max-w-sm">
          <Select>
            <Select.Trigger aria-label="Server region">
              <Select.Value placeholder="Select deployment region" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                {groups.map((group) => (
                  <Select.Group key={group.name} label={group.name}>
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
      </Exhibit.Stage>

      {/* Disabled Section */}
      <Exhibit.Stage section={sections.disabled} code={SELECT_DISABLED_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Select controls preserve absolute geometric stability across closed and open states. The trigger maintains steady horizontal boundaries without width collapse or layout reflows when opening the floating surface.
        </Description>

        <Description>
          The floating menu animates smoothly from the trigger anchor point with coordinated opacity and transform scaling. Transform origin resolves dynamically according to current placement, keeping motion physically connected to the anchor trigger.
        </Description>

        <Description>
          Tactile press physics compress the trigger down to scale 0.97 during pointer down events, giving clear mechanical feedback before option list expansion.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Select adheres to the W3C WAI ARIA Combobox pattern. The trigger exposes combobox semantics while communicating expanded state and active control connections through aria expanded and aria controls.
        </Description>

        <Description>
          Keyboard navigation provides comprehensive control. Users can open the menu with Enter, Space, Arrow Down, or Arrow Up, navigate items with arrow keys, select choices with Enter, and dismiss menus with Escape.
        </Description>

        <Description>
          Typeahead search allows rapid jumping through long lists by typing initial character sequences directly on the keyboard.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Trigger heights and internal padding values align precisely with the Homonoid spatial control scale across small, medium, and large density configurations.
        </Description>

        <Description>
          Surface backgrounds, border strokes, and elevation shadows consume semantic design tokens calibrated for light and dark environments.
        </Description>

        <Description>
          Item options share visual proportions, radii, and state colors directly with the unified Tile component system.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Select supports both declarative compound subcomponents and concise shorthand configurations using the options property.
        </Description>

        <Description>
          Every item leverages the Tile primitive directly, granting effortless support for leading iconography, rich labels, secondary descriptions, and trailing check indicators.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
