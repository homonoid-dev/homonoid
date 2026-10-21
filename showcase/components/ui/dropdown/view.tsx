"use client";

import { Dropdown, Button, Card, Label, Description, Heading } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  MoreHorizontal,
  Edit,
  Copy,
  Share2,
  Trash2,
  Check,
  Info,
  Sparkles,
  AlertTriangle,
  User,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";
import {
  DROPDOWN_SECTIONS,
  DROPDOWN_SECTIONS_LIST,
  DROPDOWN_DEFAULT_CODE_SAMPLE,
  DROPDOWN_PLACEMENTS_CODE_SAMPLE,
  DROPDOWN_VARIANTS_CODE_SAMPLE,
  DROPDOWN_SIZES_CODE_SAMPLE,
  DROPDOWN_GROUPS_CODE_SAMPLE,
  DROPDOWN_DISABLED_CODE_SAMPLE,
} from "./model";

export function DropdownView() {
  useToc(DROPDOWN_SECTIONS_LIST);

  const placements = [
    { placement: "bottom-start" as const, label: "Bottom Start" },
    { placement: "bottom-end" as const, label: "Bottom End" },
    { placement: "top-start" as const, label: "Top Start" },
    { placement: "top-end" as const, label: "Top End" },
  ];

  const actions = [
    { label: "Standard Action", color: "surface" as const, icon: <Check className="size-4" /> },
    { label: "Subtle Action", color: "subtle" as const, icon: <Info className="size-4" /> },
    { label: "Primary Action", color: "primary" as const, icon: <Sparkles className="size-4" /> },
    { label: "Destructive Action", color: "destructive" as const, icon: <AlertTriangle className="size-4" /> },
  ];

  const sizes = [
    { size: "sm" as const, label: "Small Menu" },
    { size: "md" as const, label: "Medium Menu" },
    { size: "lg" as const, label: "Large Menu" },
  ];

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">Dropdown</Heading>
        <Description size="md">
          A dropdown displays a floating menu of actionable items, contextual operations, and commands anchored to an interactive trigger.
        </Description>
        <Description size="md">
          Homonoid dropdown menus combine resilient anchored positioning with the tactile Tile primitive, delivering fluid entrance transitions, full keyboard navigation, and total visual continuity.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="dropdown" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Dropdown } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={DROPDOWN_DEFAULT_CODE_SAMPLE}>
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button
                variant="outlined"
                layout="icon"
                leading={<MoreHorizontal className="size-4" />}
              />
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
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.List>
            </Dropdown.Content>
          </Dropdown>
        </Stage>
      </section>

      {/* Placements Section */}
      <section
        id={DROPDOWN_SECTIONS.placements.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={DROPDOWN_SECTIONS.placements.icon} />
          <Heading size="md" as="h2">
            {DROPDOWN_SECTIONS.placements.label}
          </Heading>
        </div>

        <Stage code={DROPDOWN_PLACEMENTS_CODE_SAMPLE}>
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
        </Stage>
      </section>

      {/* Variants Section */}
      <section
        id={DROPDOWN_SECTIONS.variants.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={DROPDOWN_SECTIONS.variants.icon} />
          <Heading size="md" as="h2">
            {DROPDOWN_SECTIONS.variants.label}
          </Heading>
        </div>

        <Stage code={DROPDOWN_VARIANTS_CODE_SAMPLE}>
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
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={DROPDOWN_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={DROPDOWN_SECTIONS.sizes.icon} />
          <Heading size="md" as="h2">
            {DROPDOWN_SECTIONS.sizes.label}
          </Heading>
        </div>

        <Stage code={DROPDOWN_SIZES_CODE_SAMPLE}>
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
        </Stage>
      </section>

      {/* Groups Section */}
      <section
        id={DROPDOWN_SECTIONS.groups.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={DROPDOWN_SECTIONS.groups.icon} />
          <Heading size="md" as="h2">
            {DROPDOWN_SECTIONS.groups.label}
          </Heading>
        </div>

        <Stage code={DROPDOWN_GROUPS_CODE_SAMPLE}>
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
        </Stage>
      </section>

      {/* Disabled Section */}
      <section
        id={DROPDOWN_SECTIONS.disabled.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={DROPDOWN_SECTIONS.disabled.icon} />
          <Heading size="md" as="h2">
            {DROPDOWN_SECTIONS.disabled.label}
          </Heading>
        </div>

        <Stage code={DROPDOWN_DISABLED_CODE_SAMPLE}>
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
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={DROPDOWN_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {DROPDOWN_SECTIONS.continuity.label}
        </Heading>

        <Description>
          Dropdown triggers uphold complete dimensional stability across active and dormant states. The trigger maintains steady geometry without spatial reflows when opening or dismissing the floating menu.
        </Description>

        <Description>
          The floating menu animates smoothly from the trigger anchor point with coordinated opacity and transform scaling. Transform origin resolves dynamically according to current placement, keeping motion physically connected to the anchor trigger.
        </Description>

        <Description>
          Menu tiles transition across hover, active press, and focus states with silky smooth color changes, preserving tactile continuity across the entire surface hierarchy.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={DROPDOWN_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {DROPDOWN_SECTIONS.accessibility.label}
        </Heading>

        <Description>
          Dropdown adheres strictly to the W3C WAI ARIA Menu pattern. Triggers declare aria haspopup menu and communicate expanded status through aria expanded and aria controls.
        </Description>

        <Description>
          Keyboard navigation provides comprehensive control. Users can open the menu with Enter or Space, navigate choices with arrow keys with automatic looping, activate actions with Enter, and dismiss menus with Escape.
        </Description>

        <Description>
          Typeahead navigation allows rapid jumping through choices by typing initial character sequences directly on the keyboard.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={DROPDOWN_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {DROPDOWN_SECTIONS.tokens.label}
        </Heading>

        <Description>
          Dropdown menus align with the Homonoid spatial scale across small, medium, and large density configurations.
        </Description>

        <Description>
          Floating menu surfaces apply token elevations and subtle borders for clear spatial separation above underlying canvas planes.
        </Description>

        <Description>
          Menu items leverage the Tile component directly, sharing typography scale, focus rings, and state tokens with zero design drift.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={DROPDOWN_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {DROPDOWN_SECTIONS.styleReference.label}
        </Heading>

        <Description>
          Dropdown components utilize compound subcomponents to offer modular composition for simple action lists and complex hierarchical menus.
        </Description>

        <Description>
          Action items seamlessly incorporate leading icons, detailed labels, secondary descriptions, and trailing keyboard shortcuts through unified prop interfaces.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
