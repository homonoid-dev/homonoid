"use client";

import { Dropdown, Button, Description, Separator } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
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
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
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
  const sections = DROPDOWN_SECTIONS;

  const placements = [
    { placement: "bottom-start" as const, label: "Bottom Start", icon: <ArrowDownLeft className="size-4" /> },
    { placement: "bottom-end" as const, label: "Bottom End", icon: <ArrowDownRight className="size-4" /> },
    { placement: "top-start" as const, label: "Top Start", icon: <ArrowUpLeft className="size-4" /> },
    { placement: "top-end" as const, label: "Top End", icon: <ArrowUpRight className="size-4" /> },
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
    <Exhibit
      title="Dropdown"
      summary="A dropdown displays a floating menu of actionable items, contextual operations, and commands anchored to an interactive trigger."
      description="Homonoid dropdown menus combine resilient anchored positioning with the tactile Tile primitive, delivering fluid entrance transitions, full keyboard navigation, and total visual continuity."
      component="dropdown"
      importCode='import { Dropdown } from "@homonoid/react";'
      defaultCode={DROPDOWN_DEFAULT_CODE_SAMPLE}
      defaultStage={
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
              <Dropdown.Item
                leading={<Edit className="size-4" />}
                trailing={<Dropdown.Shortcut keyValue="command" content="E" />}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                leading={<Copy className="size-4" />}
                trailing={<Dropdown.Shortcut keyValue="command" content="C" />}
              >
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item leading={<Share2 className="size-4" />}>
                Share
              </Dropdown.Item>
              <Separator />
              <Dropdown.Item
                color="destructive"
                leading={<Trash2 className="size-4" />}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown.Content>
        </Dropdown>
      }
      sections={DROPDOWN_SECTIONS_LIST}
    >
      {/* Placements Section */}
      <Exhibit.Stage section={sections.placements} code={DROPDOWN_PLACEMENTS_CODE_SAMPLE}>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {placements.map((item) => (
            <Dropdown key={item.placement} placement={item.placement}>
              <Dropdown.Trigger asChild>
                <Button
                  layout="icon"
                  variant="outlined"
                  aria-label={item.label}
                >
                  {item.icon}
                </Button>
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
      </Exhibit.Stage>

      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={DROPDOWN_VARIANTS_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={DROPDOWN_SIZES_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Groups Section */}
      <Exhibit.Stage section={sections.groups} code={DROPDOWN_GROUPS_CODE_SAMPLE}>
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
              <Separator />
              <Dropdown.Group>
                <Dropdown.Label className="px-3 py-1.5 text-xs text-muted font-medium">
                  Billing
                </Dropdown.Label>
                <Dropdown.Item leading={<CreditCard className="size-4" />}>
                  Subscriptions
                </Dropdown.Item>
              </Dropdown.Group>
              <Separator />
              <Dropdown.Item color="destructive" leading={<LogOut className="size-4" />}>
                Sign Out
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown.Content>
        </Dropdown>
      </Exhibit.Stage>

      {/* Disabled Section */}
      <Exhibit.Stage section={sections.disabled} code={DROPDOWN_DISABLED_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Dropdown triggers uphold complete dimensional stability across active and dormant states. The trigger maintains steady geometry without spatial reflows when opening or dismissing the floating menu.
        </Description>

        <Description>
          The floating menu animates smoothly from the trigger anchor point with coordinated opacity and transform scaling. Transform origin resolves dynamically according to current placement, keeping motion physically connected to the anchor trigger.
        </Description>

        <Description>
          Menu tiles transition across hover, active press, and focus states with silky smooth color changes, preserving tactile continuity across the entire surface hierarchy.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Dropdown adheres strictly to the W3C WAI ARIA Menu pattern. Triggers declare aria haspopup menu and communicate expanded status through aria expanded and aria controls.
        </Description>

        <Description>
          Keyboard navigation provides comprehensive control. Users can open the menu with Enter or Space, navigate choices with arrow keys with automatic looping, activate actions with Enter, and dismiss menus with Escape.
        </Description>

        <Description>
          Typeahead navigation allows rapid jumping through choices by typing initial character sequences directly on the keyboard.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Dropdown menus align with the Homonoid spatial scale across small, medium, and large density configurations.
        </Description>

        <Description>
          Floating menu surfaces apply token elevations and subtle borders for clear spatial separation above underlying canvas planes.
        </Description>

        <Description>
          Menu items leverage the Tile component directly, sharing typography scale, focus rings, and state tokens with zero design drift.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Dropdown components utilize compound subcomponents to offer modular composition for simple action lists and complex hierarchical menus.
        </Description>

        <Description>
          Action items seamlessly incorporate leading icons, detailed labels, secondary descriptions, and trailing keyboard shortcuts through unified prop interfaces.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
