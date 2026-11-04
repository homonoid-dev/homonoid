"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useId,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { all, cond, when } from "../../utils/condition";
import { SidebarContext, type SidebarContextValue } from "./SidebarContext";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarContent } from "./SidebarContent";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarItem } from "./SidebarItem";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarSeparator } from "./SidebarSeparator";
import { SidebarTrigger } from "./SidebarTrigger";
import { SidebarRail } from "./SidebarRail";
import type { SidebarProps } from "./types";

export const variants = cva(
  "group/sidebar relative h-full shrink-0 select-none flex flex-col bg-background transition-[width] duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] motion-reduce:transition-none",
  {
    variants: {
      variant: {
        bordered: "border-r-[0.5px] border-border/60",
        fixed: "border-r border-border bg-background shadow-xs",
        floating: "m-2 rounded-2xl border-[0.5px] border-border bg-surface/90 shadow-md backdrop-blur-md h-[calc(100%-1rem)]",
      },
      side: {
        left: "left-0",
        right: "right-0 border-r-0 border-l-[0.5px]",
      },
    },
    defaultVariants: {
      variant: "bordered",
      side: "left",
    },
  }
);

export interface SidebarComponent
  extends React.ForwardRefExoticComponent<
    SidebarProps & React.RefAttributes<HTMLElement>
  > {
  Header: typeof SidebarHeader;
  Content: typeof SidebarContent;
  Group: typeof SidebarGroup;
  Item: typeof SidebarItem;
  Footer: typeof SidebarFooter;
  Separator: typeof SidebarSeparator;
  Trigger: typeof SidebarTrigger;
  Rail: typeof SidebarRail;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    collapsible = "icon",
    variant = "bordered",
    side = "left",
    width = "w-60",
    collapsedWidth = "w-16",
    header,
    footer,
    groups,
    items,
    children,
    className,
    ...props
  },
  ref
) {
  const isControlled = controlledCollapsed !== undefined;
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(
    Boolean(defaultCollapsed)
  );
  const collapsed = cond(isControlled, Boolean(controlledCollapsed), uncontrolledCollapsed);

  const rawId = useId();
  const sidebarId = `sidebar-${rawId}`;

  const setCollapsed = useCallback(
    (action: boolean | ((prev: boolean) => boolean)) => {
      const nextCollapsed = typeof action === "function" ? action(collapsed) : action;
      if (!isControlled) {
        setUncontrolledCollapsed(nextCollapsed);
      }
      onCollapsedChange?.(nextCollapsed);
    },
    [collapsed, isControlled, onCollapsedChange]
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, [setCollapsed]);

  const contextValue: SidebarContextValue = {
    collapsed,
    setCollapsed,
    toggleCollapsed,
    collapsible,
    variant,
    side,
    sidebarId,
  };

  const isIconCollapsible = collapsible === "icon";
  const activeWidthClass = cond(
    all(collapsed, isIconCollapsible),
    collapsedWidth,
    width
  );

  const isAtomic = Boolean(groups || items || header || footer);

  return (
    <SidebarContext.Provider value={contextValue}>
      <aside
        ref={ref}
        id={sidebarId}
        data-slot="sidebar"
        data-state={cond(collapsed, "collapsed", "expanded")}
        data-collapsible={collapsible}
        data-variant={variant}
        data-side={side}
        className={cn(
          variants({ variant, side }),
          activeWidthClass,
          cond(all(collapsed, collapsible === "offcanvas"), "hidden", undefined),
          className
        )}
        {...props}
      >
        <nav
          aria-label={props["aria-label"] || "Sidebar navigation"}
          className="relative flex flex-col h-full w-full overflow-y-auto overflow-x-hidden"
        >
          {cond(
            isAtomic,
            <>
              {when(header, <SidebarHeader sticky>{header}</SidebarHeader>)}
              <SidebarContent>
                {groups?.map((group, groupIdx) => (
                  <SidebarGroup key={group.id || groupIdx} label={group.label}>
                    {group.items?.map((item, itemIdx) => (
                      <SidebarItem
                        key={item.value || itemIdx}
                        href={item.href}
                        active={item.active}
                        disabled={item.disabled}
                        leading={item.leading}
                        trailing={item.trailing}
                        badge={item.badge}
                        onClick={item.onClick}
                      >
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarGroup>
                ))}
                {items?.map((item, itemIdx) => (
                  <SidebarItem
                    key={item.value || itemIdx}
                    href={item.href}
                    active={item.active}
                    disabled={item.disabled}
                    leading={item.leading}
                    trailing={item.trailing}
                    badge={item.badge}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </SidebarItem>
                ))}
                {children}
              </SidebarContent>
              {when(footer, <SidebarFooter sticky>{footer}</SidebarFooter>)}
            </>,
            children
          )}
        </nav>
        {when(isIconCollapsible, <SidebarRail />)}
      </aside>
    </SidebarContext.Provider>
  );
}) as SidebarComponent;

Sidebar.displayName = "Sidebar";
Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Group = SidebarGroup;
Sidebar.Item = SidebarItem;
Sidebar.Footer = SidebarFooter;
Sidebar.Separator = SidebarSeparator;
Sidebar.Trigger = SidebarTrigger;
Sidebar.Rail = SidebarRail;
