"use client";

import { Separator, Button, Card, Description, Heading } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import { Bold, Italic, Underline, AlignLeft, AlignCenter } from "lucide-react";
import {
  SEPARATOR_SECTIONS,
  SEPARATOR_SECTIONS_LIST,
  SEPARATOR_DEFAULT_CODE_SAMPLE,
  SEPARATOR_HORIZONTAL_CODE_SAMPLE,
  SEPARATOR_VERTICAL_CODE_SAMPLE,
  SEPARATOR_SEMANTICS_CODE_SAMPLE,
} from "./model";

export function SeparatorView() {
  useToc(SEPARATOR_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">Separator</Heading>
        <Description>
          A separator visually or semantically partitions collections of content, controls, or sections within a layout.
        </Description>
        <Description>
          Homonoid separators provide crisp hairline boundaries across horizontal and vertical axes, preserving visual hierarchy and subpixel clarity without structural layout shift.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="separator" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Separator } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={SEPARATOR_DEFAULT_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Heading size="md">Workspace Overview</Heading>
              <Description size="sm">Central control hub for team projects</Description>
            </div>
            <Separator />
            <div className="flex justify-between text-xs text-muted">
              <span>Active Repositories</span>
              <span className="font-medium text-foreground">14</span>
            </div>
          </div>
        </Stage>
      </section>

      {/* Horizontal Section */}
      <section
        id={SEPARATOR_SECTIONS.horizontal.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SEPARATOR_SECTIONS.horizontal.icon} />
          <Heading size="md" as="h2">
            {SEPARATOR_SECTIONS.horizontal.label}
          </Heading>
        </div>

        <Stage code={SEPARATOR_HORIZONTAL_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Heading size="sm">Account Details</Heading>
              <Description size="sm">Manage personal login settings</Description>
            </div>
            <Separator orientation="horizontal" />
            <div className="flex flex-col gap-1">
              <Heading size="sm">Security Keys</Heading>
              <Description size="sm">Configure hardware tokens and credentials</Description>
            </div>
          </div>
        </Stage>
      </section>

      {/* Vertical Section */}
      <section
        id={SEPARATOR_SECTIONS.vertical.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SEPARATOR_SECTIONS.vertical.icon} />
          <Heading size="md" as="h2">
            {SEPARATOR_SECTIONS.vertical.label}
          </Heading>
        </div>

        <Stage code={SEPARATOR_VERTICAL_CODE_SAMPLE}>
          <div className="flex items-center gap-2 p-1.5 border border-border rounded-xl bg-surface">
            <Button variant="plain" layout="icon" size="sm" leading={<Bold className="size-4" />} />
            <Button variant="plain" layout="icon" size="sm" leading={<Italic className="size-4" />} />
            <Button variant="plain" layout="icon" size="sm" leading={<Underline className="size-4" />} />
            <Separator orientation="vertical" className="mx-1 h-5" />
            <Button variant="plain" layout="icon" size="sm" leading={<AlignLeft className="size-4" />} />
            <Button variant="plain" layout="icon" size="sm" leading={<AlignCenter className="size-4" />} />
          </div>
        </Stage>
      </section>

      {/* Semantics Section */}
      <section
        id={SEPARATOR_SECTIONS.semantics.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SEPARATOR_SECTIONS.semantics.icon} />
          <Heading size="md" as="h2">
            {SEPARATOR_SECTIONS.semantics.label}
          </Heading>
        </div>

        <Stage code={SEPARATOR_SEMANTICS_CODE_SAMPLE}>
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Description size="sm" className="font-medium text-foreground">
                Decorative Divider with role none
              </Description>
              <Separator decorative />
            </div>

            <div className="flex flex-col gap-2">
              <Description size="sm" className="font-medium text-foreground">
                Semantic Divider with role separator
              </Description>
              <Separator decorative={false} />
            </div>
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={SEPARATOR_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {SEPARATOR_SECTIONS.continuity.label}
        </Heading>

        <Description>
          Separators retain constant dimensions across viewport shifts and layout reconfigurations. The hairline stroke preserves exact pixel density without subpixel blur or visual jitter.
        </Description>

        <Description>
          Theme switches transition stroke colors smoothly between light and dark tokens without flickering or abrupt illumination jumps.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={SEPARATOR_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {SEPARATOR_SECTIONS.accessibility.label}
        </Heading>

        <Description>
          Separators support both purely decorative modes and semantic divider roles.
        </Description>

        <Description>
          When decorative is enabled, the element applies role none and aria hidden, keeping assistive technology focused entirely on meaningful content.
        </Description>

        <Description>
          When decorative is disabled, the element exposes role separator alongside explicit aria orientation attributes matching the layout axis.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={SEPARATOR_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {SEPARATOR_SECTIONS.tokens.label}
        </Heading>

        <Description>
          Separators consume semantic border tokens exclusively, harmonizing with adjacent container borders and surfaces.
        </Description>

        <Description>
          Hairline strokes evaluate to half a pixel on high density displays for ultra fine aesthetic precision.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={SEPARATOR_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {SEPARATOR_SECTIONS.styleReference.label}
        </Heading>

        <Description>
          Separators integrate cleanly within complex compound components including Select, Dropdown, Menu, and Card primitives.
        </Description>

        <Description>
          Orientation classes adapt seamlessly to standard flex and grid layout flows without custom container wrappers.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
