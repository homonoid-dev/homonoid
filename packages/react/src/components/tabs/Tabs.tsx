"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useMemo,
  useId,
  isValidElement,
  type KeyboardEvent,
} from "react";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { TabsContext, type TabsContextValue } from "./TabsContext";
import { TabsList } from "./TabsList";
import { TabsTab } from "./TabsTab";
import { TabsPanel } from "./TabsPanel";
import type { TabsProps } from "./types";

export interface TabsComponent
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Panel: typeof TabsPanel;
  Trigger: typeof TabsTab;
  Content: typeof TabsPanel;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    variant = "contained",
    color = "surface",
    size = "md",
    radius = "full",
    orientation = "horizontal",
    disabled = false,
    rovingFocus = true,
    items,
    children,
    className,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const baseId = `homonoid-tabs-${generatedId}`;

  const isControlled = controlledValue !== undefined;
  const initialValue = defaultValue ?? items?.[0]?.value ?? "";
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(initialValue);

  const activeValue = cond(isControlled, controlledValue ?? "", uncontrolledValue);

  const handleValueChange = useCallback(
    (nextValue: string) => {
      if (disabled) return;
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [disabled, isControlled, onValueChange]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (!rovingFocus) return;
      const target = event.currentTarget;
      const tablist = target.closest('[role="tablist"]');
      if (!tablist) return;

      const tabs = Array.from(
        tablist.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]:not([disabled]):not([aria-disabled="true"])'
        )
      );

      if (tabs.length === 0) return;
      const currentIndex = tabs.indexOf(target);
      if (currentIndex === -1) return;

      let targetIndex = -1;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        targetIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        event.preventDefault();
        targetIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        targetIndex = tabs.length - 1;
      }

      if (targetIndex >= 0 && tabs[targetIndex]) {
        tabs[targetIndex].focus();
        tabs[targetIndex].click();
      }
    },
    [rovingFocus]
  );

  const contextValue: TabsContextValue = useMemo(
    () => ({
      value: activeValue,
      onValueChange: handleValueChange,
      variant,
      color,
      size,
      radius,
      orientation,
      disabled,
      baseId,
      rovingFocus,
      handleKeyDown,
    }),
    [
      activeValue,
      handleValueChange,
      variant,
      color,
      size,
      radius,
      orientation,
      disabled,
      baseId,
      rovingFocus,
      handleKeyDown,
    ]
  );

  const isAtomic = Boolean(items && items.length > 0);

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-slot="tabs"
        data-variant={variant}
        data-orientation={orientation}
        className={cn(
          "flex flex-col gap-surface-sm",
          cond(orientation === "vertical", "flex-row", "flex-col"),
          className
        )}
        {...props}
      >
        {cond(
          isAtomic,
          <>
            <TabsList>
              {items?.map((item) => {
                const isIconOnly = !item.label && Boolean(item.icon);
                const renderIcon = () => {
                  if (!item.icon) return null;
                  if (isValidElement(item.icon)) return item.icon;
                  const IconComp = item.icon as React.ComponentType<{ className?: string }>;
                  return <IconComp className="size-3.5 shrink-0" />;
                };

                return (
                  <TabsTab
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    aria-label={item.ariaLabel}
                    layout={cond(isIconOnly, "icon", "inline")}
                    leading={when(!isIconOnly && Boolean(item.icon), renderIcon())}
                  >
                    {item.label ?? when(isIconOnly, renderIcon())}
                  </TabsTab>
                );
              })}
            </TabsList>
            {items?.map((item) =>
              when(
                Boolean(item.content),
                <TabsPanel key={item.value} value={item.value}>
                  {item.content}
                </TabsPanel>
              )
            )}
          </>,
          children
        )}
      </div>
    </TabsContext.Provider>
  );
}) as TabsComponent;

Tabs.displayName = "Tabs";
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.Trigger = TabsTab;
Tabs.Content = TabsPanel;

