"use client";

import { Separator, Button, Description, Heading } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
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
  const sections = SEPARATOR_SECTIONS;

  return (
    <Exhibit
      title="Separator"
      summary="A separator visually or semantically partitions collections of content, controls, or sections within a layout."
      description="Homonoid separators provide crisp hairline boundaries across horizontal and vertical axes, preserving visual hierarchy and subpixel clarity without structural layout shift."
      component="separator"
      importCode='import { Separator } from "@homonoid/react";'
      defaultCode={SEPARATOR_DEFAULT_CODE_SAMPLE}
      defaultStage={
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
      }
      sections={SEPARATOR_SECTIONS_LIST}
    >
      {/* Horizontal Section */}
      <Exhibit.Stage section={sections.horizontal} code={SEPARATOR_HORIZONTAL_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Vertical Section */}
      <Exhibit.Stage section={sections.vertical} code={SEPARATOR_VERTICAL_CODE_SAMPLE}>
        <div className="flex items-center gap-2 p-1.5 border border-border rounded-xl bg-surface">
          <Button variant="plain" layout="icon" size="sm" leading={<Bold className="size-4" />} />
          <Button variant="plain" layout="icon" size="sm" leading={<Italic className="size-4" />} />
          <Button variant="plain" layout="icon" size="sm" leading={<Underline className="size-4" />} />
          <Separator orientation="vertical" className="mx-1 h-5" />
          <Button variant="plain" layout="icon" size="sm" leading={<AlignLeft className="size-4" />} />
          <Button variant="plain" layout="icon" size="sm" leading={<AlignCenter className="size-4" />} />
        </div>
      </Exhibit.Stage>

      {/* Semantics Section */}
      <Exhibit.Stage section={sections.semantics} code={SEPARATOR_SEMANTICS_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Separators retain constant dimensions across viewport shifts and layout reconfigurations. The hairline stroke preserves exact pixel density without subpixel blur or visual jitter.
        </Description>

        <Description>
          Theme switches transition stroke colors smoothly between light and dark tokens without flickering or abrupt illumination jumps.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Separators support both purely decorative modes and semantic divider roles.
        </Description>

        <Description>
          When decorative is enabled, the element applies role none and aria hidden, keeping assistive technology focused entirely on meaningful content.
        </Description>

        <Description>
          When decorative is disabled, the element exposes role separator alongside explicit aria orientation attributes matching the layout axis.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Separators consume semantic border tokens exclusively, harmonizing with adjacent container borders and surfaces.
        </Description>

        <Description>
          Hairline strokes evaluate to half a pixel on high density displays for ultra fine aesthetic precision.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Separators integrate cleanly within complex compound components including Select, Dropdown, Menu, and Card primitives.
        </Description>

        <Description>
          Orientation classes adapt seamlessly to standard flex and grid layout flows without custom container wrappers.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
