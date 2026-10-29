"use client";

import { Tooltip, Button, Description } from "@homonoid/react";
import {
  Plus,
  Bookmark,
  Settings,
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Copy,
} from "lucide-react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  TOOLTIP_SECTIONS,
  TOOLTIP_SECTIONS_LIST,
  TOOLTIP_DEFAULT_CODE_SAMPLE,
  TOOLTIP_VARIANTS_CODE_SAMPLE,
  TOOLTIP_PLACEMENTS_CODE_SAMPLE,
  TOOLTIP_SHORTCUTS_CODE_SAMPLE,
} from "./model";

const VARIANTS = [
  {
    variant: "inverted" as const,
    content: "Bookmark item",
    icon: Bookmark,
    buttonVariant: "contained" as const,
  },
  {
    variant: "surface" as const,
    content: "Settings panel",
    icon: Settings,
    buttonVariant: "outlined" as const,
  },
  {
    variant: "primary" as const,
    content: "Quick actions",
    icon: Zap,
    buttonVariant: "contained" as const,
    buttonColor: "primary" as const,
  },
];

const PLACEMENTS = [
  { side: "top" as const, label: "Top", icon: ArrowUp },
  { side: "bottom" as const, label: "Bottom", icon: ArrowDown },
  { side: "left" as const, label: "Left", icon: ArrowLeft },
  { side: "right" as const, label: "Right", icon: ArrowRight },
];

export function TooltipView() {
  const sections = TOOLTIP_SECTIONS;

  return (
    <Exhibit
      title="Tooltip"
      summary="A tooltip presents contextual descriptions or auxiliary keyboard accelerators when users hover over or focus an interactive element."
      description="Tooltips clarify circular icon controls, reveal keyboard shortcuts, and offer guidance without crowding the primary interface canvas."
      component="tooltip"
      importCode='import { Tooltip } from "@homonoid/react";'
      defaultCode={TOOLTIP_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <div className="flex items-center justify-center p-6">
          <Tooltip content="Add new element">
            <Button layout="icon" variant="contained">
              <Plus className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      }
      sections={TOOLTIP_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={TOOLTIP_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center justify-center gap-6 p-6">
          {VARIANTS.map((item) => (
            <Tooltip key={item.variant} variant={item.variant} content={item.content}>
              <Button layout="icon" variant={item.buttonVariant} color={item.buttonColor}>
                <item.icon className="w-4 h-4" />
              </Button>
            </Tooltip>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Placements Section */}
      <Exhibit.Stage section={sections.placements} code={TOOLTIP_PLACEMENTS_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center justify-center gap-6 p-6">
          {PLACEMENTS.map((item) => (
            <Tooltip key={item.side} side={item.side} content={`${item.label} positioning`}>
              <Button layout="icon" variant="outlined">
                <item.icon className="w-4 h-4" />
              </Button>
            </Tooltip>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Shortcuts Section */}
      <Exhibit.Stage section={sections.shortcuts} code={TOOLTIP_SHORTCUTS_CODE_SAMPLE}>
        <div className="flex items-center justify-center p-6">
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button layout="icon" variant="contained">
                <Copy className="w-4 h-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              Copy to clipboard
              <Tooltip.Shortcut keyValue="command" content="C" />
            </Tooltip.Content>
          </Tooltip>
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          State transitions preserve spatial stability and component identity without abrupt dimensional jumps or visual flashes.
        </Description>

        <Description>
          Transitions apply subtle scale motion from 0.96 to 1.0 alongside opacity dissolves, maintaining visual anchor points during rapid cursor movement.
        </Description>

        <Description>
          Enter and exit delay timers prevent visual noise during sweeping pointer movements across adjacent interface controls.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility guarantees assistive technology compatibility across keyboard and screen reader workflows.
        </Description>

        <Description>
          The tooltip content container exposes the standard tooltip role, while trigger elements associate programmatically through ARIA descriptions.
        </Description>

        <Description>
          Keyboard navigation displays tooltips immediately on focus, and pressing Escape dismisses active overlays without moving focus.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Surface colors consume foreground, surface, and primary tokens dynamically across light and dark modes.
        </Description>

        <Description>
          Spatial padding maps to consistent token scales, balancing text legibility with compact geometry.
        </Description>

        <Description>
          Animation parameters consume fast motion durations and standard motion curves from Homonoid tokens.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Tooltips support both concise prop based composition and flexible compound structures for custom content requirements.
        </Description>

        <Description>
          Collision detection automatically flips and shifts positioning to maintain full viewport visibility under restrictive boundaries.
        </Description>

        <Description>
          Portal mounting isolates tooltip surfaces from parent overflow clipping, guaranteeing consistent rendering above all stacking contexts.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
