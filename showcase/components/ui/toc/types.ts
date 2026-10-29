import type { ReactNode, ComponentType, MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }> | ReactNode;
}

export interface TocProps {
  items?: TocItem[];
  className?: string;
  defaultActiveId?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  collapseBreakpoint?: number;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export interface TocItemProps {
  href: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  collapsed?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
}

export interface TocContextValue {
  items: TocItem[];
  setItems: (items: TocItem[]) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}
