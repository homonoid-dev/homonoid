"use client";

import { Searchbar, Card, Label, Description, Heading } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  SEARCHBAR_SECTIONS,
  SEARCHBAR_SECTIONS_LIST,
  SEARCHBAR_DEFAULT_CODE_SAMPLE,
  SEARCHBAR_VARIANTS_CODE_SAMPLE,
  SEARCHBAR_SIZES_CODE_SAMPLE,
  SEARCHBAR_LOADING_CODE_SAMPLE,
  SEARCHBAR_RADII_CODE_SAMPLE,
} from "./model";

export function SearchbarView() {
  useToc(SEARCHBAR_SECTIONS_LIST);

  const variants = [
    { variant: "outlined", placeholder: "Outlined searchbar..." },
    { variant: "filled", placeholder: "Filled searchbar..." },
    { variant: "plain", placeholder: "Plain searchbar..." },
  ] as const;

  const sizes = [
    { size: "sm", placeholder: "Small search (32px)...", shortcut: "/" },
    { size: "md", placeholder: "Medium search (40px)...", shortcut: "⌘K" },
    { size: "lg", placeholder: "Large search (48px)...", shortcut: "⌘K" },
  ] as const;

  const radii = [
    { radius: "md", placeholder: "Medium radius..." },
    { radius: "lg", placeholder: "Large radius..." },
    { radius: "full", placeholder: "Pill searchbar..." },
  ] as const;

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">Searchbar</Heading>
        <Description size="md">
          A searchbar allows users to enter, preview, and submit search queries across collections of data and application views.
        </Description>
        <Description size="md">
          Searchbars combine immediate text entry with contextual search actions including leading query icons, asynchronous loading spinners, and keyboard shortcut badges.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="searchbar" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Searchbar } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={SEARCHBAR_DEFAULT_CODE_SAMPLE}>
          <div className="w-full max-w-sm">
            <Searchbar placeholder="Search documentation..." shortcut="⌘K" />
          </div>
        </Stage>
      </section>

      {/* Variants Section */}
      <section
        id={SEARCHBAR_SECTIONS.variants.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SEARCHBAR_SECTIONS.variants.icon} />
          <Label size="lg" as="h2">
            {SEARCHBAR_SECTIONS.variants.label}
          </Label>
        </div>

        <Stage code={SEARCHBAR_VARIANTS_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            {variants.map((item) => (
              <Searchbar
                key={item.variant}
                variant={item.variant}
                placeholder={item.placeholder}
              />
            ))}
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={SEARCHBAR_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SEARCHBAR_SECTIONS.sizes.icon} />
          <Label size="lg" as="h2">
            {SEARCHBAR_SECTIONS.sizes.label}
          </Label>
        </div>

        <Stage code={SEARCHBAR_SIZES_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            {sizes.map((item) => (
              <Searchbar
                key={item.size}
                size={item.size}
                placeholder={item.placeholder}
                shortcut={item.shortcut}
              />
            ))}
          </div>
        </Stage>
      </section>

      {/* Loading Section */}
      <section
        id={SEARCHBAR_SECTIONS.loading.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SEARCHBAR_SECTIONS.loading.icon} />
          <Label size="lg" as="h2">
            {SEARCHBAR_SECTIONS.loading.label}
          </Label>
        </div>

        <Stage code={SEARCHBAR_LOADING_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            <Searchbar
              loading
              defaultValue="Homonoid design tokens"
              placeholder="Querying components..."
            />
            <Searchbar
              loading
              size="sm"
              placeholder="Resolving records..."
            />
          </div>
        </Stage>
      </section>

      {/* Radius Section */}
      <section
        id={SEARCHBAR_SECTIONS.radius.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SEARCHBAR_SECTIONS.radius.icon} />
          <Label size="lg" as="h2">
            {SEARCHBAR_SECTIONS.radius.label}
          </Label>
        </div>

        <Stage code={SEARCHBAR_RADII_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            {radii.map((item) => (
              <Searchbar
                key={item.radius}
                radius={item.radius}
                placeholder={item.placeholder}
                shortcut="⌘K"
              />
            ))}
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={SEARCHBAR_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {SEARCHBAR_SECTIONS.continuity.label}
        </Label>

        <Description>
          Searchbars preserve dimensional stability across query state transitions. The loading spinner inherits the exact dimensions of the leading icon, preventing layout jitter or content shift when asynchronous operations commence.
        </Description>

        <Description>
          Focus rings expand outward smoothly without displacing adjacent controls or altering internal container heights.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={SEARCHBAR_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {SEARCHBAR_SECTIONS.accessibility.label}
        </Label>

        <Description>
          Searchbars provide native searchbox semantics through explicit role searchbox and native type search attributes.
        </Description>

        <Description>
          During asynchronous query operations, the container communicates activity to assistive technology through dynamic aria busy states.
        </Description>

        <Description>
          Native keyboard navigation allows quick focus management and intuitive Escape key clearing behaviors.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={SEARCHBAR_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {SEARCHBAR_SECTIONS.tokens.label}
        </Label>

        <Description>
          Searchbars consume spatial control heights and semantic surface tokens directly from the design system.
        </Description>

        <Description>
          Container padding, typography sizes, and border treatments scale systematically across small, medium, and large tiers.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={SEARCHBAR_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {SEARCHBAR_SECTIONS.styleReference.label}
        </Label>

        <Description>
          Searchbars integrate cleanly within navigation headers, hero discovery bars, modal command palettes, and table toolbars.
        </Description>

        <Description>
          Curvature options from sharp corners to rounded full pills harmonize with surrounding card surfaces and button shapes.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
