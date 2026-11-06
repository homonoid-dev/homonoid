"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import Link from "next/link";
import {
  Heading,
  Description,
  Card,
  Tile,
  Button,
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
  Copy,
  Check,
  Component,
} from "lucide-react";
import { Code } from "@/components/ui/code";
import { Resource } from "@/components/ui/resource";
import { Pagination } from "@/components/ui/pagination";
import { COMPONENTS, type ComponentItem } from "@/config/components";
import type { StageProps, StageViewMode, StageViewport } from "./types";

export function Stage({
  title,
  description,
  component,
  githubUrl,
  figmaUrl = "https://www.figma.com/@homonoid",
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

  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [code]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

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
        "flex flex-col px-layout-x pt-layout-y pb-28 lg:pb-layout-y gap-layout-gap max-w-4xl min-w-0 w-full",
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

      {/* Source Buttons */}
      <div className="flex items-center gap-surface-gap">
        {when(
          Boolean(component),
          <Resource type="github" component={component} />
        )}
        {when(
          Boolean(githubUrl),
          <Resource type="github" href={githubUrl} />
        )}
        <Resource type="npm" />
        {when(
          Boolean(figmaUrl),
          <Resource type="figma" href={figmaUrl} />
        )}
      </div>

      {/* Toolbar Row */}
      <div className="flex items-center justify-between w-full gap-surface-gap pt-2">
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
            leading={<Eye className="size-3.5 shrink-0" />}
          >
            Preview
          </Toggle>
          <Toggle
            value="code"
            leading={<Code2 className="size-3.5 shrink-0" />}
          >
            Code
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
          <Toggle value="desktop" aria-label="Desktop viewport" title="Desktop">
            <Monitor className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">Desktop</span>
          </Toggle>
          <Toggle value="tablet" aria-label="Tablet viewport" title="Tablet">
            <Tablet className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">Tablet</span>
          </Toggle>
          <Toggle value="mobile" aria-label="Mobile viewport" title="Mobile">
            <Smartphone className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">Mobile</span>
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
            <Card
              variant="filled"
              color="subtle"
              className="relative min-h-[380px] w-full rounded-3xl border border-border/60 flex items-center justify-center p-8 overflow-hidden"
            >
              <div className="flex items-center justify-center w-full">
                {children}
              </div>
            </Card>,
            <div className="relative w-full rounded-3xl border border-border/60 bg-surface overflow-hidden">
              <div className="flex items-center justify-end p-surface-xs border-b border-border/40">
                <Button
                  size="sm"
                  variant="plain"
                  color="surface"
                  onClick={handleCopy}
                  leading={cond(
                    copied,
                    <Check className="size-3.5 text-primary shrink-0" />,
                    <Copy className="size-3.5 shrink-0" />
                  )}
                >
                  {cond(copied, "Copied", "Copy")}
                </Button>
              </div>
              <div className="p-surface-sm overflow-x-auto font-mono text-xs">
                <Code code={code ?? ""} />
              </div>
            </div>
          )}
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
                size="sm"
                className="w-52 shrink-0 snap-start rounded-2xl"
              >
                <Tile.Content>
                  <Tile.Label size="sm" className="truncate">
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
