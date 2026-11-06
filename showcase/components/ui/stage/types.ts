import type { ReactNode } from "react";
import type { ComponentItem } from "@/config/components";

export type StageViewMode = "preview" | "code";
export type StageViewport = "desktop" | "tablet" | "mobile";

export interface StageProps {
  /** The name of the selected component (e.g. "Button") */
  title: string;
  /** Descriptive overview of the component */
  description?: ReactNode;
  /** Component identifier for GitHub link, e.g. "button" */
  component?: string;
  /** Custom GitHub repository URL */
  githubUrl?: string;
  /** Custom Figma URL */
  figmaUrl?: string;
  /** Active code string displayed in Code mode */
  code?: string;
  /** Related component items or names */
  related?: (string | ComponentItem)[];
  /** Active view mode (controlled) */
  viewMode?: StageViewMode;
  /** Default view mode (uncontrolled) */
  defaultViewMode?: StageViewMode;
  /** Callback fired when view mode changes */
  onViewModeChange?: (mode: StageViewMode) => void;
  /** Active viewport width (controlled) */
  viewport?: StageViewport;
  /** Default viewport width (uncontrolled) */
  defaultViewport?: StageViewport;
  /** Callback fired when viewport width changes */
  onViewportChange?: (viewport: StageViewport) => void;
  /** The live interactive component to render in the center of the stage */
  children?: ReactNode;
  className?: string;
}

