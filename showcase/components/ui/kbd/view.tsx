"use client";

import { Kbd, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  KBD_SECTIONS,
  KBD_SECTIONS_LIST,
  KBD_DEFAULT_CODE_SAMPLE,
  KBD_SHORTCUTS_CODE_SAMPLE,
  KBD_VARIANTS_CODE_SAMPLE,
  KBD_COLORS_CODE_SAMPLE,
  KBD_NAVIGATION_CODE_SAMPLE,
  KBD_INLINE_CODE_SAMPLE,
} from "./model";

export function KbdView() {
  const sections = KBD_SECTIONS;

  const shortcuts = [
    { label: "Cut", keys: "command" as const, content: "X" },
    { label: "Undo", keys: "command" as const, content: "Z" },
    { label: "Command Palette", keys: ["shift", "command"] as const, content: "P" },
    { label: "Inspect Element", keys: ["option", "command"] as const, content: "I" },
  ];

  const variants = [
    { variant: "contained" as const, label: "Contained" },
    { variant: "outlined" as const, label: "Outlined" },
    { variant: "plain" as const, label: "Plain" },
  ];

  const colors = [
    { color: "surface" as const, label: "Surface" },
    { color: "subtle" as const, label: "Subtle" },
    { color: "primary" as const, label: "Primary" },
    { color: "destructive" as const, label: "Destructive" },
  ];

  const navigation = [
    { key: "arrowup" as const, label: "Up" },
    { key: "arrowdown" as const, label: "Down" },
    { key: "arrowleft" as const, label: "Left" },
    { key: "arrowright" as const, label: "Right" },
  ];

  return (
    <Exhibit
      title="Kbd"
      summary="A keyboard badge displays key combinations and input triggers for shortcuts and hotkeys."
      description="Homonoid keyboard badges render semantic key indicators using standardized platform modifier symbols, calibrated typography metrics, and consistent surface palettes."
      component="kbd"
      importCode='import { Kbd } from "@homonoid/react";'
      defaultCode={KBD_DEFAULT_CODE_SAMPLE}
      defaultStage={<Kbd keyValue="command" content="K" />}
      sections={KBD_SECTIONS_LIST}
    >
      {/* Shortcuts Section */}
      <Exhibit.Stage section={sections.shortcuts} code={KBD_SHORTCUTS_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center gap-4">
          {shortcuts.map((shortcut) => (
            <Kbd key={shortcut.label} keyValue={shortcut.keys} content={shortcut.content} />
          ))}
        </div>
      </Exhibit.Stage>

      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={KBD_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center gap-6">
          {variants.map((item) => (
            <div key={item.variant} className="flex flex-col items-center gap-2">
              <Kbd variant={item.variant} keyValue="command" content="K" />
              <span className="text-xs text-muted font-sans">{item.label}</span>
            </div>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Colors Section */}
      <Exhibit.Stage section={sections.colors} code={KBD_COLORS_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center gap-6">
          {colors.map((item) => (
            <div key={item.color} className="flex flex-col items-center gap-2">
              <Kbd color={item.color} keyValue="command" content="K" />
              <span className="text-xs text-muted font-sans">{item.label}</span>
            </div>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Navigation Section */}
      <Exhibit.Stage section={sections.navigation} code={KBD_NAVIGATION_CODE_SAMPLE}>
        <div className="flex items-center gap-4">
          {navigation.map((item) => (
            <div key={item.key} className="flex flex-col items-center gap-2">
              <Kbd keyValue={item.key} />
              <span className="text-xs text-muted font-sans">{item.label}</span>
            </div>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Inline Usage Section */}
      <Exhibit.Stage section={sections.inline} code={KBD_INLINE_CODE_SAMPLE}>
        <p className="text-sm text-foreground leading-relaxed max-w-lg">
          Press <Kbd size="sm" keyValue="command" content="K" /> to open search, press{" "}
          <Kbd size="sm" keyValue="escape" /> to dismiss overlays, or hit{" "}
          <Kbd size="sm" keyValue="enter" /> to confirm changes.
        </p>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Keyboard badges preserve dimensional stability across variant transitions and visual color shifts without displacing adjacent text or inline layout elements.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Keyboard badges render using the semantic HTML kbd element with abbr tags that expose descriptive full title attributes to screen readers.
        </Description>

        <Description>
          Screen reader technologies announce modifier combinations sequentially while visually presenting concise platform symbols.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Keyboard badges draw background fills, border strokes, and typography tokens directly from the design system across light and dark modes.
        </Description>

        <Description>
          Proportional control heights scale across small, medium, and large density presets with uniform padding and baseline metrics.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Keyboard badges support atomic shorthand properties through keyValue and content attributes or compound composition via Kbd.Abbr and Kbd.Content.
        </Description>

        <Description>
          The component accommodates individual keys, arrays of modifier sequences, and custom symbol children without rigid markup constraints.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
