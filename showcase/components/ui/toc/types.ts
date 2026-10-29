import type { ReactNode, ComponentType, MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";

export interface TocItemModel {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }> | ReactNode;
}

export interface TocProps {
  items?: TocItemModel[];
  className?: string;
  defaultActiveId?: string;
  collapsed?: boolean;
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
  items: TocItemModel[];
  setItems: (items: TocItemModel[]) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}
