"use client";

import type { ComponentType, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Stage } from "./stage";
import type { TocItemModel } from "./toc";
import type { ComponentItem } from "@/config/components";

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
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function ExhibitStage(_props: ExhibitStageProps) {
  return null;
}

export interface ExhibitSectionProps {
  id?: string;
  title?: string;
  label?: string;
  section?: ExhibitSectionItem;
  children?: ReactNode;
  className?: string;
}

export function ExhibitSection(_props: ExhibitSectionProps) {
  return null;
}

export interface ExhibitProps {
  title: string;
  summary?: ReactNode;
  description?: ReactNode;
  component?: string;
  githubUrl?: string;
  figmaUrl?: string;
  importCode?: string;
  defaultCode?: string;
  defaultStage?: ReactNode;
  sections?: TocItemModel[];
  related?: (string | ComponentItem)[];
  children?: ReactNode;
  className?: string;
}

export function Exhibit({
  title,
  summary,
  description,
  component,
  githubUrl,
  figmaUrl = "https://www.figma.com/@homonoid",
  defaultCode,
  defaultStage,
  related,
  className,
}: ExhibitProps) {
  return (
    <Stage
      title={title}
      description={description ?? summary}
      component={component}
      githubUrl={githubUrl}
      figmaUrl={figmaUrl}
      code={defaultCode}
      related={related}
      className={className}
    >
      {defaultStage}
    </Stage>
  );
}

Exhibit.Stage = ExhibitStage;
Exhibit.Section = ExhibitSection;
