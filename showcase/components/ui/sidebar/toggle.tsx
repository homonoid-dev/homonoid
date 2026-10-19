"use client";

import { Button } from "@homonoid/react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { cn } from "@homonoid/react/cn";
import { useSidebar } from "./context";
import type { SidebarToggleProps } from "./types";

export function SidebarToggle({
  className,
  children,
  onClick,
  ...props
}: SidebarToggleProps) {
  const { collapsible, collapsed, toggleCollapse, side } = useSidebar();

  if (!collapsible) return null;

  const defaultIcon =
    side === "right" ? (
      collapsed ? (
        <PanelRightOpen className="size-4" />
      ) : (
        <PanelRightClose className="size-4" />
      )
    ) : collapsed ? (
      <PanelLeftOpen className="size-4" />
    ) : (
      <PanelLeftClose className="size-4" />
    );

  return (
    <Button
      layout="icon"
      variant="plain"
      color="subtle"
      onClick={(e) => {
        toggleCollapse();
        onClick?.(e);
      }}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={cn("shrink-0", className)}
      {...props}
    >
      {children ?? defaultIcon}
    </Button>
  );
}
