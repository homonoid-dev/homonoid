"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { Component, List, type LucideIcon } from "lucide-react";
import { Heading, Description, Card, Tile, Button } from "@homonoid/react";
import { cn } from "@homonoid/react/cn";
import { any, cond, when } from "@homonoid/react";
import { highlighter } from "./code";
import { Stage } from "./stage";
import { Frame } from "./frame";
import { Resource } from "./resource";
import { Pagination } from "./pagination";
import { useToc, type TocItem } from "./toc";
import { SHOWCASE_COMPONENTS, type ShowcaseComponentItem } from "@/config/components";

export interface ExhibitSectionItem {
  id: string;
  label?: string;
  title?: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
}

export interface ExhibitStageProps {
  id?: string;
  title?: string;
  label?: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  section?: ExhibitSectionItem;
  code?: string;
  onReset?: () => void;
  children: ReactNode;
  className?: string;
}

export function ExhibitStage({
  id: explicitId,
  title: explicitTitle,
  label: explicitLabel,
  icon: explicitIcon,
  section,
  code,
  onReset,
  children,
  className,
}: ExhibitStageProps) {
  const resolvedId = explicitId ?? section?.id ?? "";
  const resolvedTitle = explicitTitle ?? explicitLabel ?? section?.title ?? section?.label ?? "";
  const resolvedIcon = explicitIcon ?? section?.icon;

  return (
    <section
      id={resolvedId}
      className={cn("flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y", className)}
    >
      <Frame text={resolvedTitle} icon={resolvedIcon} />
      <Stage code={code ?? ""} onReset={onReset}>
        {children}
      </Stage>
    </section>
  );
}

export interface ExhibitSectionProps {
  id?: string;
  title?: string;
  label?: string;
  section?: ExhibitSectionItem;
  children: ReactNode;
  className?: string;
}

export function ExhibitSection({
  id: explicitId,
  title: explicitTitle,
  label: explicitLabel,
  section,
  children,
  className,
}: ExhibitSectionProps) {
  const resolvedId = explicitId ?? section?.id ?? "";
  const resolvedTitle = explicitTitle ?? explicitLabel ?? section?.title ?? section?.label ?? "";

  return (
    <section
      id={resolvedId}
      className={cn("flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y", className)}
    >
      {when(
        resolvedTitle,
        <Heading size="md" as="h2">
          {resolvedTitle}
        </Heading>
      )}
      {children}
    </section>
  );
}

export interface ExhibitProps {
  title: string;
  summary: ReactNode;
  description?: ReactNode;
  component?: string;
  githubUrl?: string;
  figmaUrl?: string;
  importCode?: string;
  defaultCode?: string;
  defaultStage?: ReactNode;
  sections?: TocItem[];
  related?: (string | ShowcaseComponentItem)[];
  relatedDescription?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Exhibit({
  title,
  summary,
  description,
  component,
  githubUrl,
  figmaUrl = "https://www.figma.com/@lumunar",
  importCode,
  defaultCode,
  defaultStage,
  sections,
  related,
  relatedDescription = "Explore complementary primitives and companion controls designed to pair naturally within unified interface layouts.",
  children,
  className,
}: ExhibitProps) {
  useToc(sections);

  const resolvedImport = importCode ?? cond(Boolean(component), `import { ${title} } from "@homonoid/react";`, undefined);

  const configItem = SHOWCASE_COMPONENTS.find(
    (item) =>
      (component && item.href === `/${component}`) ||
      item.name.toLowerCase() === title.toLowerCase()
  );

  const rawRelated = related ?? configItem?.related;

  const resolvedRelated: ShowcaseComponentItem[] = (rawRelated ?? [])
    .map((entry) => {
      if (typeof entry !== "string") return entry;
      const match = SHOWCASE_COMPONENTS.find(
        (c) =>
          c.name.toLowerCase() === entry.toLowerCase() ||
          c.href.replace("/", "").toLowerCase() === entry.toLowerCase()
      );
      return match ?? { name: entry, href: `/${entry.toLowerCase()}` };
    })
    .filter(Boolean);

  return (
    <div className={cn("flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0", className)}>
      {/* View Header */}
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">{title}</Heading>
          {when(
            summary,
            <Description>{summary}</Description>
          )}
        </div>
        {when(
          description,
          <Description>{description}</Description>
        )}
      </div>

      {/* Resource Badges */}
      <div className="flex items-center gap-surface-gap">
        {when(
          component,
          <Resource type="github" component={component} />
        )}
        {when(
          githubUrl,
          <Resource type="github" href={githubUrl} />
        )}
        {when(
          figmaUrl,
          <Resource type="figma" href={figmaUrl} />
        )}
      </div>

      {/* Default Stage & Import Code Area */}
      {when(
        any(Boolean(resolvedImport), Boolean(defaultStage)),
        <section className="flex flex-col gap-surface-gap pb-layout-y">
          {when(
            resolvedImport,
            <Card
              color="subtle"
              variant="filled"
              className="font-mono text-xs"
            >
              <code>{highlighter(resolvedImport as string)}</code>
            </Card>
          )}
          {when(
            defaultStage,
            <Stage code={defaultCode ?? ""}>
              {defaultStage}
            </Stage>
          )}
        </section>
      )}

      {/* Main Content & Interactive Stages */}
      {children}

      {/* Related Components Outlined Tiles */}
      {when(
        resolvedRelated.length > 0,
        <section className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
          <Frame text="Related" icon={Component} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-surface-gap">
            {resolvedRelated.map((item) => (
              <Tile
                key={item.href}
                as={Link}
                href={item.href}
                variant="outlined"
                size="lg"
                className="rounded-3xl"
              >
                <Tile.Content>
                  <Tile.Label size="md">{item.name}</Tile.Label>
                  <Tile.Description size="sm">{item.description}</Tile.Description>
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

Exhibit.Stage = ExhibitStage;
Exhibit.Section = ExhibitSection;
