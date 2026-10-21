"use client";

import { Tooltip, Button, Label, Description, Heading, Card } from "@homonoid/react";
import {
  Plus,
  Bookmark,
  Settings,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Copy,
} from "lucide-react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  TOOLTIP_SECTIONS,
  TOOLTIP_SECTIONS_LIST,
  TOOLTIP_DEFAULT_CODE_SAMPLE,
  TOOLTIP_VARIANTS_CODE_SAMPLE,
  TOOLTIP_PLACEMENTS_CODE_SAMPLE,
  TOOLTIP_SHORTCUTS_CODE_SAMPLE,
} from "./model";

export function TooltipView() {
  useToc(TOOLTIP_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">Tooltip</Heading>
        <Description size="md">
          A tooltip presents contextual descriptions or auxiliary keyboard accelerators when users hover over or focus an interactive element.
        </Description>
        <Description size="md">
          Tooltips clarify circular icon controls, reveal keyboard shortcuts, and offer guidance without crowding the primary interface canvas.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="tooltip" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Tooltip } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={TOOLTIP_DEFAULT_CODE_SAMPLE}>
          <div className="flex items-center justify-center p-6">
            <Tooltip content="Add new element">
              <Button layout="icon" variant="contained">
                <Plus className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </Stage>
      </section>

      {/* Variants Section */}
      <section
        id={TOOLTIP_SECTIONS.variants.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={TOOLTIP_SECTIONS.variants.icon} />
          <Label size="lg" as="h2">
            {TOOLTIP_SECTIONS.variants.label}
          </Label>
        </div>

        <Stage code={TOOLTIP_VARIANTS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-6 p-6">
            <Tooltip variant="inverted" content="Bookmark item">
              <Button layout="icon" variant="contained">
                <Bookmark className="w-4 h-4" />
              </Button>
            </Tooltip>

            <Tooltip variant="surface" content="Settings panel">
              <Button layout="icon" variant="outlined">
                <Settings className="w-4 h-4" />
              </Button>
            </Tooltip>

            <Tooltip variant="primary" content="AI Assistant">
              <Button layout="icon" color="primary" variant="contained">
                <Sparkles className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </Stage>
      </section>

      {/* Placements Section */}
      <section
        id={TOOLTIP_SECTIONS.placements.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={TOOLTIP_SECTIONS.placements.icon} />
          <Label size="lg" as="h2">
            {TOOLTIP_SECTIONS.placements.label}
          </Label>
        </div>

        <Stage code={TOOLTIP_PLACEMENTS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-6 p-6">
            <Tooltip side="top" content="North positioning">
              <Button layout="icon" variant="outlined">
                <ArrowUp className="w-4 h-4" />
              </Button>
            </Tooltip>

            <Tooltip side="bottom" content="South positioning">
              <Button layout="icon" variant="outlined">
                <ArrowDown className="w-4 h-4" />
              </Button>
            </Tooltip>

            <Tooltip side="left" content="West positioning">
              <Button layout="icon" variant="outlined">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Tooltip>

            <Tooltip side="right" content="East positioning">
              <Button layout="icon" variant="outlined">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </Stage>
      </section>

      {/* Shortcuts Section */}
      <section
        id={TOOLTIP_SECTIONS.shortcuts.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={TOOLTIP_SECTIONS.shortcuts.icon} />
          <Label size="lg" as="h2">
            {TOOLTIP_SECTIONS.shortcuts.label}
          </Label>
        </div>

        <Stage code={TOOLTIP_SHORTCUTS_CODE_SAMPLE}>
          <div className="flex items-center justify-center p-6">
            <Tooltip>
              <Tooltip.Trigger asChild>
                <Button layout="icon" variant="contained">
                  <Copy className="w-4 h-4" />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                Copy to clipboard
                <Tooltip.Shortcut>⌘C</Tooltip.Shortcut>
              </Tooltip.Content>
            </Tooltip>
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={TOOLTIP_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {TOOLTIP_SECTIONS.continuity.label}
        </Label>

        <Description>
          State transitions preserve spatial stability and component identity without abrupt dimensional jumps or visual flashes.
        </Description>

        <Description>
          Transitions apply subtle scale motion from 0.96 to 1.0 alongside opacity dissolves, maintaining visual anchor points during rapid cursor movement.
        </Description>

        <Description>
          Enter and exit delay timers prevent visual noise during sweeping pointer movements across adjacent interface controls.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={TOOLTIP_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {TOOLTIP_SECTIONS.accessibility.label}
        </Label>

        <Description>
          Accessibility guarantees assistive technology compatibility across keyboard and screen reader workflows.
        </Description>

        <Description>
          The tooltip content container exposes the standard tooltip role, while trigger elements associate programmatically through ARIA descriptions.
        </Description>

        <Description>
          Keyboard navigation displays tooltips immediately on focus, and pressing Escape dismisses active overlays without moving focus.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={TOOLTIP_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {TOOLTIP_SECTIONS.tokens.label}
        </Label>

        <Description>
          Surface colors consume foreground, surface, and primary tokens dynamically across light and dark modes.
        </Description>

        <Description>
          Spatial padding maps to consistent token scales, balancing text legibility with compact geometry.
        </Description>

        <Description>
          Animation parameters consume fast motion durations and standard motion curves from Homonoid tokens.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={TOOLTIP_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {TOOLTIP_SECTIONS.styleReference.label}
        </Label>

        <Description>
          Tooltips support both concise prop based composition and flexible compound structures for custom content requirements.
        </Description>

        <Description>
          Collision detection automatically flips and shifts positioning to maintain full viewport visibility under restrictive boundaries.
        </Description>

        <Description>
          Portal mounting isolates tooltip surfaces from parent overflow clipping, guaranteeing consistent rendering above all stacking contexts.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
