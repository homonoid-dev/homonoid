"use client";

import { Searchbar, Kbd, Card, Description, Heading } from "@homonoid/react";
import { Search } from "lucide-react";
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
  SEARCHBAR_LABEL_AND_DESCRIPTION_CODE_SAMPLE,
} from "./model";

export function SearchbarView() {
  useToc(SEARCHBAR_SECTIONS_LIST);

  const variants = [
    { variant: "outlined", placeholder: "Outlined searchbar" },
    { variant: "contained", placeholder: "Contained searchbar" },
    { variant: "plain", placeholder: "Plain searchbar" },
  ] as const;

  const sizes = [
    {
      size: "sm" as const,
      placeholder: "Small search",
    },
    {
      size: "md" as const,
      placeholder: "Medium search",
    },
    {
      size: "lg" as const,
      placeholder: "Large search",
    },
  ];

  const radii = [
    { radius: "none" as const, placeholder: "Square radius..." },
    { radius: "sm" as const, placeholder: "Small radius..." },
    { radius: "md" as const, placeholder: "Medium radius..." },
    { radius: "lg" as const, placeholder: "Large radius..." },
    { radius: "full" as const, placeholder: "Pill searchbar..." },
  ];

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Searchbar</Heading>
          <Description>
            A searchbar allows users to enter, preview, and submit search queries across collections of data and application views.
          </Description>
        </div>
        <Description>
          Searchbars combine immediate text entry with contextual search actions including leading query icons, asynchronous loading states, and trailing keyboard shortcut keys.
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
          className="font-mono text-xs"
        >
          <code>{highlighter('import { Searchbar } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={SEARCHBAR_DEFAULT_CODE_SAMPLE}>
          <div className="w-full max-w-sm">
            <Searchbar
              leading={<Search className="size-4 text-muted" />}
              placeholder="Search documentation..."
            />
          </div>
        </Stage>
      </section>

      {/* Variants Section */}
      <section id={SEARCHBAR_SECTIONS.variants.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SEARCHBAR_SECTIONS.variants.label} icon={SEARCHBAR_SECTIONS.variants.icon} />

        <Stage code={SEARCHBAR_VARIANTS_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            {variants.map((item) => (
              <Searchbar
                key={item.variant}
                leading={<Search className="size-4 text-muted" />}
                variant={item.variant}
                placeholder={item.placeholder}
              />
            ))}
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section id={SEARCHBAR_SECTIONS.sizes.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SEARCHBAR_SECTIONS.sizes.label} icon={SEARCHBAR_SECTIONS.sizes.icon} />

        <Stage code={SEARCHBAR_SIZES_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            {sizes.map((item) => (
              <Searchbar
                key={item.size}
                leading={<Search className="size-4 text-muted" />}
                size={item.size}
                placeholder={item.placeholder}
              />
            ))}
          </div>
        </Stage>
      </section>

      {/* Loading Section */}
      <section id={SEARCHBAR_SECTIONS.loading.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SEARCHBAR_SECTIONS.loading.label} icon={SEARCHBAR_SECTIONS.loading.icon} />

        <Stage code={SEARCHBAR_LOADING_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            <Searchbar
              leading={<Search className="size-4 text-muted" />}
              loading
              defaultValue="Homonoid design tokens"
              placeholder="Querying components..."
            />
            <Searchbar
              leading={<Search className="size-4 text-muted" />}
              loading
              size="sm"
              placeholder="Resolving records..."
            />
          </div>
        </Stage>
      </section>

      {/* Radius Section */}
      <section id={SEARCHBAR_SECTIONS.radius.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SEARCHBAR_SECTIONS.radius.label} icon={SEARCHBAR_SECTIONS.radius.icon} />

        <Stage code={SEARCHBAR_RADII_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            {radii.map((item) => (
              <Searchbar
                key={item.radius}
                leading={<Search className="size-4 text-muted" />}
                radius={item.radius}
                placeholder={item.placeholder}
              />
            ))}
          </div>
        </Stage>
      </section>

      {/* Label & Description Section */}
      <section id={SEARCHBAR_SECTIONS.labelAndDescription.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SEARCHBAR_SECTIONS.labelAndDescription.label} icon={SEARCHBAR_SECTIONS.labelAndDescription.icon} />

        <Stage code={SEARCHBAR_LABEL_AND_DESCRIPTION_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-surface-gap">
            <Searchbar
              leading={<Search className="size-4 text-muted" />}
              label="Repository Search"
              description="Query public and private repositories across your organization."
              placeholder="Search repositories..."
            />
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section id={SEARCHBAR_SECTIONS.continuity.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2"> {SEARCHBAR_SECTIONS.continuity.label} </Heading>

        <Description>
          Searchbars preserve dimensional stability across query state transitions. Focus rings expand outward smoothly without displacing adjacent controls or altering internal container heights.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section id={SEARCHBAR_SECTIONS.accessibility.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2"> {SEARCHBAR_SECTIONS.accessibility.label} </Heading>

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
      <section id={SEARCHBAR_SECTIONS.tokens.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2"> {SEARCHBAR_SECTIONS.tokens.label} </Heading>

        <Description>
          Searchbars consume spatial control heights and semantic surface tokens directly from the design system.
        </Description>

        <Description>
          Container padding, typography sizes, and border treatments scale systematically across small, medium, and large tiers.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section id={SEARCHBAR_SECTIONS.styleReference.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2"> {SEARCHBAR_SECTIONS.styleReference.label} </Heading>

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
