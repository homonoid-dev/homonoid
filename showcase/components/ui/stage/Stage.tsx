"use client";

import {
  useState,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import {
  Heading,
  Description,
  Tile,
  Breadcrumb,
  Label,
  Toggle,
  ToggleGroup,
  cond,
  when,
} from "@homonoid/react";
import { cn } from "@homonoid/react/cn";
import {
  Eye,
  Code2,
  Monitor,
  Tablet,
  Smartphone,
  Component,
} from "lucide-react";
import { Code } from "@/components/ui/code";
import { Pagination } from "@/components/ui/pagination";
import { COMPONENTS, type ComponentItem } from "@/config/components";
import type { StageProps, StageViewMode, StageViewport } from "./types";

export function Stage({
  title,
  description,
  component,
  code,
  related,
  viewMode: controlledViewMode,
  defaultViewMode = "preview",
  onViewModeChange,
  viewport: controlledViewport,
  defaultViewport = "desktop",
  onViewportChange,
  children,
  className,
}: StageProps) {
  const [internalViewMode, setInternalViewMode] =
    useState<StageViewMode>(defaultViewMode);
  const [internalViewport, setInternalViewport] =
    useState<StageViewport>(defaultViewport);

  const viewMode = controlledViewMode ?? internalViewMode;
  const viewport = controlledViewport ?? internalViewport;

  const handleViewModeChange = useCallback(
    (mode: StageViewMode) => {
      setInternalViewMode(mode);
      onViewModeChange?.(mode);
    },
    [onViewModeChange]
  );

  const handleViewportChange = useCallback(
    (nextViewport: StageViewport) => {
      setInternalViewport(nextViewport);
      onViewportChange?.(nextViewport);
    },
    [onViewportChange]
  );

  const configItem = useMemo(
    () =>
      COMPONENTS.find(
        (item) =>
          (component && item.href === `/components/${component}`) ||
          item.name.toLowerCase() === title.toLowerCase()
      ),
    [component, title]
  );

  const rawRelated = related ?? configItem?.related;

  const resolvedRelated: ComponentItem[] = useMemo(() => {
    return (rawRelated ?? [])
      .map((entry) => {
        if (typeof entry !== "string") return entry;
        const match = COMPONENTS.find(
          (c) =>
            c.name.toLowerCase() === entry.toLowerCase() ||
            c.href.replace("/components/", "").toLowerCase() ===
            entry.toLowerCase()
        );
        return (
          match ?? {
            name: entry,
            href: `/components/${entry.toLowerCase()}`,
          }
        );
      })
      .filter(Boolean);
  }, [rawRelated]);

  const viewportWidthClass = {
    desktop: "w-full",
    tablet: "max-w-2xl w-full",
    mobile: "max-w-sm w-full",
  }[viewport];

  return (
    <div
      className={cn(
        "flex flex-col px-layout-x pt-layout-y pb-28 lg:pb-layout-y gap-layout-gap min-w-0 w-full",
        className
      )}
    >
      {/* Header Block */}
      <div className="flex flex-col gap-layout-gap">
        <Breadcrumb
          size="sm"
          items={[
            { label: "Components", href: "/components" },
            { label: title },
          ]}
        />
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">{title}</Heading>
          {when(
            Boolean(description),
            <Description>{description}</Description>
          )}
        </div>
      </div>

      {/* Stage Workbench Section */}
      <div className="flex flex-col gap-control-gap w-full min-w-0">
        {/* Toolbar Row */}
        <div className="flex items-center justify-between w-full gap-surface-gap">
          <ToggleGroup
            type="single"
            variant="contained"
            radius="full"
            size="sm"
            value={viewMode}
            onValueChange={(val) => {
              if (!val) return;
              handleViewModeChange(val as StageViewMode);
            }}
          >
            <Toggle
              value="preview"
              layout="icon"
              aria-label="Preview"
              title="Preview"
            >
              <Eye className="size-3.5 shrink-0" />
            </Toggle>
            <Toggle
              value="code"
              layout="icon"
              aria-label="Code"
              title="Code"
            >
              <Code2 className="size-3.5 shrink-0" />
            </Toggle>
          </ToggleGroup>

          <ToggleGroup
            type="single"
            variant="contained"
            radius="full"
            size="sm"
            value={viewport}
            onValueChange={(val) => {
              if (!val) return;
              handleViewportChange(val as StageViewport);
            }}
          >
            <Toggle
              value="desktop"
              layout="icon"
              aria-label="Desktop viewport"
              title="Desktop"
            >
              <Monitor className="size-3.5 shrink-0" />
            </Toggle>
            <Toggle
              value="tablet"
              layout="icon"
              aria-label="Tablet viewport"
              title="Tablet"
            >
              <Tablet className="size-3.5 shrink-0" />
            </Toggle>
            <Toggle
              value="mobile"
              layout="icon"
              aria-label="Mobile viewport"
              title="Mobile"
            >
              <Smartphone className="size-3.5 shrink-0" />
            </Toggle>
          </ToggleGroup>
        </div>

        {/* Stage Canvas */}
        <div className="flex flex-col items-center w-full min-w-0">
          <div
            className={cn(
              "transition-all duration-300 ease-out mx-auto w-full",
              viewportWidthClass
            )}
          >
            {cond(
              viewMode === "preview",
              <div className="relative aspect-[4/3] w-full rounded-3xl border border-border/60 bg-transparent flex items-center justify-center p-8 overflow-hidden">
                <div className="flex items-center justify-center w-full">
                  {children}
                </div>
              </div>,
              <div className="relative aspect-[4/3] w-full rounded-3xl border border-border/60 bg-transparent overflow-auto p-surface-sm font-mono text-xs">
                <Code code={code ?? ""} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Components Rail */}
      {when(
        resolvedRelated.length > 0,
        <section className="flex flex-col gap-surface-gap pt-surface-xs">
          <div className="flex items-center gap-control-gap">
            <Component className="size-4 text-muted shrink-0" />
            <Label
              size="sm"
              className="text-muted uppercase tracking-wider font-semibold"
            >
              Related Components
            </Label>
          </div>

          <div className="flex gap-surface-gap overflow-x-auto pb-2 scrollbar-none snap-x">
            {resolvedRelated.map((item) => (
              <Tile
                key={item.href}
                as={Link}
                href={item.href}
                variant="outlined"
                size="lg"
                className="w-72 shrink-0 snap-start rounded-3xl"
              >
                <Tile.Content>
                  <Tile.Label size="md" className="truncate">
                    {item.name}
                  </Tile.Label>
                  {when(
                    Boolean(item.description),
                    <Tile.Description
                      size="sm"
                      className="truncate line-clamp-1"
                    >
                      {item.description}
                    </Tile.Description>
                  )}
                </Tile.Content>
              </Tile>
            ))}
          </div>
        </section>
      )}

      {/* Terminal Pagination Navigation */}
      <Pagination />
    </div>
  );
}
