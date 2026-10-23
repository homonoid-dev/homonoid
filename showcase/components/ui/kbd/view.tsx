"use client";

import { Kbd, Card, Heading, Description } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
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
  useToc(KBD_SECTIONS_LIST);

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

  const specialKeys = [
    { key: "enter" as const, label: "Enter" },
    { key: "escape" as const, label: "Escape" },
    { key: "tab" as const, label: "Tab" },
    { key: "space" as const, label: "Space" },
    { key: "backspace" as const, label: "Delete" },
    { key: "capslock" as const, label: "Caps Lock" },
    { key: "shift" as const, label: "Shift" },
    { key: "option" as const, label: "Option" },
    { key: "control" as const, label: "Control" },
    { key: "command" as const, label: "Command" },
  ];

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Kbd</Heading>
          <Description>
            A keyboard badge displays key combinations and input triggers for shortcuts and hotkeys.
          </Description>
        </div>
        <Description>
          Homonoid keyboard badges render semantic key indicators using standardized platform modifier symbols, calibrated typography metrics, and consistent surface palettes.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="kbd" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="font-mono text-xs"
        >
          <code>{highlighter('import { Kbd } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={KBD_DEFAULT_CODE_SAMPLE}>
          <Kbd keyValue="command" content="K" />
        </Stage>
      </section>

      {/* Shortcuts Section */}
      <section id={KBD_SECTIONS.shortcuts.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={KBD_SECTIONS.shortcuts.label} icon={KBD_SECTIONS.shortcuts.icon} />

        <Stage code={KBD_SHORTCUTS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center gap-4">
            {shortcuts.map((shortcut) => (
              <Kbd key={shortcut.label} keyValue={shortcut.keys} content={shortcut.content} />
            ))}
          </div>
        </Stage>
      </section>

      {/* Variants Section */}
      <section id={KBD_SECTIONS.variants.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={KBD_SECTIONS.variants.label} icon={KBD_SECTIONS.variants.icon} />

        <Stage code={KBD_VARIANTS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center gap-6">
            {variants.map((item) => (
              <div key={item.variant} className="flex flex-col items-center gap-2">
                <Kbd variant={item.variant} keyValue="command" content="K" />
                <span className="text-xs text-muted font-sans">{item.label}</span>
              </div>
            ))}
          </div>
        </Stage>
      </section>

      {/* Colors Section */}
      <section id={KBD_SECTIONS.colors.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={KBD_SECTIONS.colors.label} icon={KBD_SECTIONS.colors.icon} />

        <Stage code={KBD_COLORS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center gap-6">
            {colors.map((item) => (
              <div key={item.color} className="flex flex-col items-center gap-2">
                <Kbd color={item.color} keyValue="command" content="K" />
                <span className="text-xs text-muted font-sans">{item.label}</span>
              </div>
            ))}
          </div>
        </Stage>
      </section>

      {/* Navigation Section */}
      <section id={KBD_SECTIONS.navigation.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={KBD_SECTIONS.navigation.label} icon={KBD_SECTIONS.navigation.icon} />

        <Stage code={KBD_NAVIGATION_CODE_SAMPLE}>
          <div className="flex items-center gap-4">
            {navigation.map((item) => (
              <div key={item.key} className="flex flex-col items-center gap-2">
                <Kbd keyValue={item.key} />
                <span className="text-xs text-muted font-sans">{item.label}</span>
              </div>
            ))}
          </div>
        </Stage>
      </section>

      {/* Inline Usage Section */}
      <section id={KBD_SECTIONS.inline.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={KBD_SECTIONS.inline.label} icon={KBD_SECTIONS.inline.icon} />

        <Stage code={KBD_INLINE_CODE_SAMPLE}>
          <p className="text-sm text-foreground leading-relaxed max-w-lg">
            Press <Kbd keyValue="command" content="K" /> to open search, press{" "}
            <Kbd keyValue="escape" /> to dismiss overlays, or hit{" "}
            <Kbd keyValue="enter" /> to confirm changes.
          </p>
        </Stage>
      </section>


      {/* Object Continuity Section */}
      <section id={KBD_SECTIONS.continuity.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{KBD_SECTIONS.continuity.label}</Heading>

        <Description>
          Keyboard badges preserve dimensional stability across variant transitions and visual color shifts without displacing adjacent text or inline layout elements.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section id={KBD_SECTIONS.accessibility.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{KBD_SECTIONS.accessibility.label}</Heading>

        <Description>
          Keyboard badges render using the semantic HTML kbd element with abbr tags that expose descriptive full title attributes to screen readers.
        </Description>

        <Description>
          Screen reader technologies announce modifier combinations sequentially while visually presenting concise platform symbols.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section id={KBD_SECTIONS.tokens.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{KBD_SECTIONS.tokens.label}</Heading>

        <Description>
          Keyboard badges draw background fills, border strokes, and typography tokens directly from the design system across light and dark modes.
        </Description>

        <Description>
          Proportional control heights scale across small, medium, and large density presets with uniform padding and baseline metrics.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section id={KBD_SECTIONS.styleReference.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{KBD_SECTIONS.styleReference.label}</Heading>

        <Description>
          Keyboard badges support atomic shorthand properties through keyValue and content attributes or compound composition via Kbd.Abbr and Kbd.Content.
        </Description>

        <Description>
          The component accommodates individual keys, arrays of modifier sequences, and custom symbol children without rigid markup constraints.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
