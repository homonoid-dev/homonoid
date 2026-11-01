"use client";

import { Breadcrumb, Card, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import { Home, ChevronRight, ArrowRight } from "lucide-react";
import {
  BREADCRUMB_SECTIONS,
  BREADCRUMB_SECTIONS_LIST,
  BREADCRUMB_DEFAULT_CODE_SAMPLE,
  BREADCRUMB_ATOMIC_CODE_SAMPLE,
  BREADCRUMB_COMPOUND_CODE_SAMPLE,
  BREADCRUMB_SIZES_CODE_SAMPLE,
  BREADCRUMB_SEPARATORS_CODE_SAMPLE,
  BREADCRUMB_COLLAPSED_CODE_SAMPLE,
  BREADCRUMB_CARD_CODE_SAMPLE,
} from "./model";

export function BreadcrumbView() {
  const sections = BREADCRUMB_SECTIONS;

  const defaultItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Navigation", href: "/components#navigation" },
    { label: "Breadcrumb" },
  ];

  const atomicItems = [
    { label: "Dashboard", href: "/", icon: <Home className="size-4" /> },
    { label: "Settings", href: "/settings" },
    { label: "Security", href: "/settings/security" },
    { label: "Two Factor Authentication" },
  ];

  const sizeItems = [
    { label: "Workspace", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Overview" },
  ];

  const separatorItems = [
    { label: "Home", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: "Architecture" },
  ];

  const collapsedItems = [
    { label: "Root", href: "/" },
    { label: "Users", href: "/users" },
    { label: "Profiles", href: "/users/profiles" },
    { label: "Preferences", href: "/users/profiles/preferences" },
    { label: "Notification Channels" },
  ];

  const cardItems = [
    { label: "Dashboard", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Design System", href: "/projects/design-system" },
    { label: "Tokens" },
  ];

  return (
    <Exhibit
      title="Breadcrumb"
      summary="A breadcrumb displays the navigational hierarchy leading to the current page location, reinforcing site orientation and allowing users to traverse parent levels rapidly."
      description="Homonoid breadcrumbs support both zero boilerplate atomic declarations and fully composable compound subcomponents with native keyboard accessibility and fluid overflow handling."
      component="breadcrumb"
      importCode='import { Breadcrumb } from "@homonoid/react";'
      defaultCode={BREADCRUMB_DEFAULT_CODE_SAMPLE}
      defaultStage={<Breadcrumb items={defaultItems} />}
      sections={BREADCRUMB_SECTIONS_LIST}
    >
      {/* Atomic Usage Section */}
      <Exhibit.Stage section={sections.atomic} code={BREADCRUMB_ATOMIC_CODE_SAMPLE}>
        <Breadcrumb items={atomicItems} />
      </Exhibit.Stage>

      {/* Compound Composition Section */}
      <Exhibit.Stage section={sections.compound} code={BREADCRUMB_COMPOUND_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Sizing Variants Section */}
      <Exhibit.Stage section={sections.sizes} code={BREADCRUMB_SIZES_CODE_SAMPLE}>
        <div className="flex flex-col gap-4 items-center justify-center">
          <Breadcrumb size="sm" items={sizeItems} />
          <Breadcrumb size="md" items={sizeItems} />
          <Breadcrumb size="lg" items={sizeItems} />
        </div>
      </Exhibit.Stage>

      {/* Custom Separators Section */}
      <Exhibit.Stage section={sections.separators} code={BREADCRUMB_SEPARATORS_CODE_SAMPLE}>
        <div className="flex flex-col gap-4 items-center justify-center">
          <Breadcrumb items={separatorItems} separator="/" />
          <Breadcrumb
            items={separatorItems}
            separator={<ArrowRight className="size-3.5 text-muted" />}
          />
        </div>
      </Exhibit.Stage>

      {/* Collapsed Overflow Section */}
      <Exhibit.Stage section={sections.collapsed} code={BREADCRUMB_COLLAPSED_CODE_SAMPLE}>
        <Breadcrumb
          items={collapsedItems}
          maxItems={3}
          itemsBeforeCollapse={1}
          itemsAfterCollapse={1}
        />
      </Exhibit.Stage>

      {/* Card Container Section */}
      <Exhibit.Stage section={sections.card} code={BREADCRUMB_CARD_CODE_SAMPLE}>
        <Card variant="filled" padding="none" className="px-5 py-2.5">
          <Breadcrumb items={cardItems} />
        </Card>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Navigational items preserve vertical optical alignment and baseline stability regardless of glyph icons or custom separators.
        </Description>
        <Description>
          Links transition text color smoothly during hover states without producing abrupt shifts or border jitter across surrounding components.
        </Description>
        <Description>
          Intermediate tiers collapse predictably into an ellipsis trigger while keeping the root level and active page destination anchored.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          The navigation container renders a semantic nav element with an explicit aria label declaring breadcrumb landmarks.
        </Description>
        <Description>
          Tiers organize within an ordered list so screen readers announce total tier counts alongside the active location index.
        </Description>
        <Description>
          The terminal page node applies aria current set to page and omits interactive anchor styling to indicate the current destination.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          All link typography and interactive states consume foreground and muted tokens directly from the tokens library.
        </Description>
        <Description>
          Horizontal gap rhythm strictly scales according to control spatial scales across small, medium, and large configurations.
        </Description>
        <Description>
          Focus indicators apply high contrast primary focus rings adhering to platform visual standards without hardcoded outlines.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          The root Breadcrumb component exposes List, Item, Link, Page, Separator, and Ellipsis subcomponents via dot notation.
        </Description>
        <Description>
          Developers can configure custom separator glyphs, polymorphic router links, and maximum visible thresholds effortlessly.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

