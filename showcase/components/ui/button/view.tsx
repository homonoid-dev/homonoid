"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Label, Description, Card } from "@harmonia/react";
import { Circle, Plus, ArrowRight, Layers, Loader2 } from "lucide-react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { Sidebar } from "@/components/ui/sidebar";
import { ButtonProvider } from "./provider";
import { useButton } from "./use-button";

const SECTIONS = [
  { id: "variants", label: "Variants", icon: <Layers className="size-4" /> },
  { id: "outlined", label: "Outlined", icon: <Circle className="size-4" /> },
  { id: "with-icon", label: "With Icon", icon: <ArrowRight className="size-4" /> },
  { id: "icon-only", label: "Icon Only", icon: <Plus className="size-4" /> },
  { id: "loading", label: "Loading", icon: <Loader2 className="size-4" /> },
];

export function ButtonViewContent() {
  const {
    containedCodeSample,
    variantsCodeSample,
    outlinedCodeSample,
    withIconCodeSample,
    iconOnlyCodeSample,
    loadingCodeSample,
    isLoading,
    triggerLoading,
    resetLoading,
  } = useButton();

  const [activeId, setActiveId] = useState<string>("variants");

  useEffect(() => {
    const container = document.querySelector("main");
    if (!container) return;

    const ids = SECTIONS.map((s) => s.id);

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      let bestId = "";
      let maxVisible = -1;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = Math.max(rect.top, containerRect.top);
        const bottom = Math.min(rect.bottom, containerRect.bottom);
        const visibleHeight = Math.max(0, bottom - top);

        if (visibleHeight > maxVisible) {
          maxVisible = visibleHeight;
          bestId = id;
        }
      }

      if (bestId) {
        setActiveId(bestId);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }, []);

  return (
    <div className="flex justify-between w-full min-h-full">
      {/* Content Column */}
      <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl flex-1 min-w-0">
        {/* View Header */}
        <div className="flex flex-col gap-control-gap">
          <Label size="lg">Button</Label>
          <Description>
            A button communicates an action and allows users to trigger that action with a single interaction.
          </Description>

          <Description>
            Harmonia structures button hierarchy through three deliberate tiers contained for primary focus, outlined for secondary choices, and plain for utilities while maintaining strict object continuity by preserving fixed dimensions and fluid micro-transitions across hover, press, and loading states.
          </Description>

        </div>

        <div className="flex items-center gap-surface-gap">
          <Resource type="github" component="button" />
          <Resource type="figma" href="https://www.figma.com/@lumunar" />
        </div>

        {/* Component Area */}
        <section className="flex flex-col gap-surface-gap pb-layout-y">
          {/* Subtle Import Card */}
          <Card
            color="subtle"
            variant="filled"
            className="flex items-center justify-between font-mono text-xs select-text"
          >
            <code>{highlighter('import { Button } from "@harmonia/react";')}</code>
          </Card>

          {/* Contained Stage */}
          <Stage code={containedCodeSample}>
            <Button variant="contained" shape="circle">
              Click me
            </Button>
          </Stage>
        </section>

        {/* Variants Section */}
        <section id="variants" className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
          <div className="flex flex-row gap-surface-gap items-center">
            <Frame>
              <Layers className="size-4" />
            </Frame>
            <Label size="lg" as="h2">Variants</Label>
          </div>

          {/* Variants Stage */}
          <Stage code={variantsCodeSample}>
            <div className="flex flex-row flex-wrap items-center gap-surface-gap">
              <Button variant="contained" color="primary" shape="circle">
                Primary
              </Button>
              <Button variant="contained" color="subtle" shape="circle">
                Subtle
              </Button>
              <Button variant="outlined" shape="circle">
                Outline
              </Button>
              <Button variant="plain" shape="circle">
                Ghost
              </Button>
              <Button variant="contained" color="destructive" shape="circle">
                Destructive
              </Button>
            </div>
          </Stage>
        </section>

        {/* Outlined Section */}
        <section id="outlined" className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
          <div className="flex flex-row gap-surface-gap items-center">
            <Frame>
              <Circle className="size-4" />
            </Frame>
            <Label size="lg" as="h2">Outlined</Label>
          </div>

          {/* Outlined Stage */}
          <Stage code={outlinedCodeSample}>
            <Button variant="outlined" shape="circle">
              Click me
            </Button>
          </Stage>
        </section>

        {/* With Icon Section */}
        <section id="with-icon" className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
          <div className="flex flex-row gap-surface-gap items-center">
            <Frame>
              <ArrowRight className="size-4" />
            </Frame>
            <Label size="lg" as="h2">With Icon</Label>
          </div>

          {/* With Icon Stage */}
          <Stage code={withIconCodeSample}>
            <Button
              variant="contained"
              shape="circle"
              leading={<ArrowRight className="size-4" />}
            >
              Click me
            </Button>
          </Stage>
        </section>

        {/* Icon Only Section */}
        <section id="icon-only" className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
          <div className="flex flex-row gap-surface-gap items-center">
            <Frame>
              <Plus className="size-4" />
            </Frame>
            <Label size="lg" as="h2">Icon Only</Label>
          </div>

          {/* Icon Only Stage */}
          <Stage code={iconOnlyCodeSample}>
            <Button
              layout="icon"
              variant="contained"
              shape="circle"
              aria-label="Add item"
            >
              <Plus className="size-4" />
            </Button>
          </Stage>
        </section>

        {/* Loading Section */}
        <section id="loading" className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
          <div className="flex flex-row gap-surface-gap items-center">
            <Frame>
              <Loader2 className="size-4" />
            </Frame>
            <Label size="lg" as="h2">Loading</Label>
          </div>

          {/* Loading Stage */}
          <Stage code={loadingCodeSample} onReset={resetLoading}>
            <Button
              variant="contained"
              shape="circle"
              loading={isLoading}
              onClick={triggerLoading}
            >
              Click me
            </Button>
          </Stage>
        </section>
      </div>

      {/* Table of Contents Right Sidebar */}
      <Sidebar side="right" className="sticky top-0 self-start h-screen">
        <div className="flex flex-col gap-surface-gap px-layout-x py-surface">
          {SECTIONS.map((section) => (
            <Sidebar.Destination
              key={section.id}
              href={`#${section.id}`}
              icon={section.icon}
              active={activeId === section.id}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </Sidebar.Destination>
          ))}
        </div>
      </Sidebar>
    </div>
  );
}

export function ButtonView() {
  return (
    <ButtonProvider>
      <ButtonViewContent />
    </ButtonProvider>
  );
}
