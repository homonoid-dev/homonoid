"use client";

import { Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import { ArrowLeft } from "lucide-react";
import {
  SIDEBAR_SECTIONS,
  SIDEBAR_SECTIONS_LIST,
  SIDEBAR_DEFAULT_CODE_SAMPLE,
} from "./model";

export function SidebarView() {
  const sections = SIDEBAR_SECTIONS;

  const livePreviewCard = (
    <div className="flex flex-col items-center justify-center text-center p-8 gap-3 max-w-md mx-auto">
      <div className="size-10 rounded-xl bg-surface border-[0.5px] border-border flex items-center justify-center text-foreground">
        <ArrowLeft className="size-5 text-muted animate-pulse" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-sm">Active Navigation Column</span>
        <span className="text-xs text-muted leading-relaxed">
          The living instance of Sidebar is active on the left of this viewport, providing real time component routing, instant query filtering, and sticky search pinning.
        </span>
      </div>
    </div>
  );

  return (
    <Exhibit
      title="Sidebar"
      summary="A sidebar anchors core application routing, category grouping, and contextual actions along the primary viewport boundary."
      description="Homonoid sidebars provide stable column positioning, smooth collapse transitions into miniature icon rails, and clean token integration with zero layout disruption."
      component="sidebar"
      importCode='import { Sidebar } from "@homonoid/react";'
      defaultCode={SIDEBAR_DEFAULT_CODE_SAMPLE}
      defaultStage={livePreviewCard}
      sections={SIDEBAR_SECTIONS_LIST}
    >
      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Leading icons maintain strict physical spatial stability during collapse transitions. Text labels cross fade out while icons remain centered in their slots without unexpected horizontal shifts.
        </Description>
        <Description>
          Transitioning between expanded and icon rail states scales width along hardware accelerated axes, preventing layout jumps across adjacent application content.
        </Description>
        <Description>
          Hovering over miniature items in collapsed mode projects tooltips outward smoothly without disturbing DOM focus or causing page reflows.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          The component outputs standard HTML5 aside and nav landmark elements paired with explicit aria label attributes for screen reader orientation.
        </Description>
        <Description>
          Active navigation links expose aria current page semantics, communicating destination position transparently across assistive browsing tools.
        </Description>
        <Description>
          Section groupings declare semantic role group definitions bound to group title labels via programmatic id references.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Width definitions utilize proportional control sizing scales with zero hardcoded pixel widths.
        </Description>
        <Description>
          Background fills and active indicator states pull directly from surface and subtle semantic color scales.
        </Description>
        <Description>
          Dividers and boundary borders consume hairline border tokens to deliver sharp visual boundaries across varying device pixel densities.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Data state attributes reflect expanded and collapsed conditions to enable custom consumer animations or layout adjustments.
        </Description>
        <Description>
          Sticky header and footer slots consume backdrop blur utility tokens, maintaining elevated legibility when content scrolls beneath them.
        </Description>
        <Description>
          Item components inherit interactive press states and focus rings directly from Tile primitives.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

